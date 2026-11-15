"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useT } from "@/components/lang/provider";
import { useContactIntent } from "@/components/contact-intent";
import { BOOKING_URL, EMAIL } from "@/lib/site";
import { BUDGETS, INTENTS, TIMELINES, isIntent, type Budget, type Timeline } from "@/lib/contact";
import { track, trackAttrs } from "@/lib/analytics";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

type FormState = {
  name: string;
  email: string;
  msg: string;
  budget: Budget | "";
  timeline: Timeline | "";
  company: string;
};
type SendState = "idle" | "sending" | "sent" | "error" | "offline";
type Errors = Partial<Record<"name" | "email" | "msg", "required" | "email" | "msg">>;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const EMPTY: FormState = { name: "", email: "", msg: "", budget: "", timeline: "", company: "" };

/** What is wrong with the form as it stands, if anything. */
function check(form: FormState): Errors {
  const e: Errors = {};
  if (!form.name.trim()) e.name = "required";
  if (!EMAIL_RE.test(form.email)) e.email = "email";
  if (form.msg.trim().length < 10) e.msg = "msg";
  return e;
}

// What is being written is kept in this browser until it is sent, so a
// refresh, a closed tab or a detour through a case study does not cost the
// visitor their message. It never leaves the device this way.
const DRAFT_KEY = "portfolio:contact-draft";
const SEND_TIMEOUT = 15000;

function readDraft(): { form: FormState; intent: unknown } | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Record<string, unknown>;
    const text = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
    const oneOf = <T extends string>(v: unknown, list: readonly T[]) =>
      (list as readonly unknown[]).includes(v) ? (v as T) : "";
    const form: FormState = {
      name: text(d.name, 200),
      email: text(d.email, 320),
      msg: text(d.msg, 5000),
      company: text(d.company, 200),
      budget: oneOf(d.budget, BUDGETS),
      timeline: oneOf(d.timeline, TIMELINES),
    };
    if (!form.name && !form.email && !form.msg && !form.company) return null;
    return { form, intent: d.intent };
  } catch {
    return null; // private mode, or a draft this version cannot read
  }
}

function writeDraft(form: FormState, intent: string) {
  try {
    if (!form.name && !form.email && !form.msg && !form.company) window.localStorage.removeItem(DRAFT_KEY);
    else window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form, intent }));
  } catch {
    /* storage unavailable: the form still works, it just does not remember */
  }
}

/**
 * One form for both audiences. The first question — a project, a role, or
 * something else — decides the rest: a client is asked for budget and
 * timeline (one tap each, both optional), a recruiter for the company. Every
 * extra field is optional so qualifying a lead never costs the lead — and the
 * optional ones come after the message, so nobody has to answer them before
 * they can start typing.
 *
 * The form is built not to lose anyone's words or leave them waiting: what
 * is typed is kept on the device until it is sent; an error goes away the
 * moment its field is right; a send that gets no answer gives up after
 * fifteen seconds and says so, with the same message offered as an email;
 * and the confirmation is brought into view and given focus, because on a
 * phone the form it replaces is several screens taller.
 *
 * This is the page's one dark band: the end of the page, where it asks for
 * something. The form sits on the band itself, not on a panel inside it.
 *
 * The band comes up as a sheet: it starts a little narrower than the screen,
 * with round top corners, and widens to the full screen as it is scrolled
 * into place. Only its outline moves (a clip), so the form inside never does.
 */
export function Contact() {
  const { t, lang } = useT();
  const { intent, setIntent } = useContactIntent();
  const C = t.contact;
  const isAR = lang === "ar";

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  // Nothing is marked wrong until the visitor has tried to send. From then
  // on each field is checked as it changes, so a fixed field clears at once.
  const [attempted, setAttempted] = useState(false);
  const [send, setSend] = useState<SendState>("idle");
  const [sentName, setSentName] = useState("");
  const [restored, setRestored] = useState(false);
  const sentRef = useRef<HTMLDivElement>(null);
  const errorText = { required: C.e_required, email: C.e_email, msg: C.e_msg };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (attempted) setErrors(check(next));
  };

  // Bring back a draft from an earlier visit. After mount, since the server
  // rendered an empty form. A call to action that names an intent, on this
  // page or in the URL, is applied after this and so still wins.
  useEffect(() => {
    const draft = readDraft();
    if (!draft) return;
    setForm(draft.form);
    if (isIntent(draft.intent)) setIntent(draft.intent);
    setRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the draft as it is typed, a moment after the last keystroke.
  useEffect(() => {
    if (send === "sent") return;
    const id = window.setTimeout(() => writeDraft(form, intent), 400);
    return () => window.clearTimeout(id);
  }, [form, intent, send]);

  // The confirmation replaces a form that is far taller than it is, so on a
  // phone the visitor would be left looking at the footer. Bring it to them.
  useEffect(() => {
    if (send !== "sent") return;
    const el = sentRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const box = el.getBoundingClientRect();
    if (box.top < 80 || box.bottom > window.innerHeight) el.scrollIntoView({ block: "center" });
  }, [send]);

  const validate = () => {
    const e = check(form);
    setAttempted(true);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      // Take the visitor to the first field that needs attention.
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>("#contact [aria-invalid='true']")?.focus(),
      );
      return;
    }
    // No connection: say so now, not after a wait.
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setSend("offline");
      return;
    }
    setSend("sending");

    // Only the fields that belong to the chosen intent are sent; the rest are
    // left out rather than sent empty, which is what firestore.rules expects.
    const doc: Record<string, string | boolean> = {
      name: form.name,
      email: form.email,
      message: form.msg,
      lang,
      intent,
      createdAt: new Date().toISOString(),
      status: "unread",
      emailNotified: false,
    };
    if (intent === "project" && form.budget) doc.budget = form.budget;
    if (intent === "project" && form.timeline) doc.timeline = form.timeline;
    if (intent === "role" && form.company.trim()) doc.company = form.company.trim();

    try {
      const [{ db }, { collection, addDoc }] = await Promise.all([
        import("@/lib/firebase"),
        import("firebase/firestore"),
      ]);
      if (!db) throw new Error("Firestore not initialized");
      // Firestore queues a write it cannot deliver and waits for the network
      // without ever failing, which would leave "Sending…" up for good.
      let timer = 0;
      await Promise.race([
        addDoc(collection(db, "messages"), doc),
        new Promise<never>((_, reject) => {
          timer = window.setTimeout(() => reject(new Error("timed out")), SEND_TIMEOUT);
        }),
      ]).finally(() => window.clearTimeout(timer));
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* nothing was stored */
      }
      track("contact_sent", { intent });
      setSentName(form.name.split(" ")[0] || (isAR ? "صديقي" : "friend"));
      setSend("sent");
    } catch (err) {
      console.error("Contact submit failed:", err);
      setSend("error");
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setAttempted(false);
    setRestored(false);
    setSend("idle");
    setSentName("");
  };

  // The same message as an email, for when the form cannot deliver it.
  const asEmail = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `${C.intents[intent]}${form.name.trim() ? `: ${form.name.trim()}` : ""}`,
  )}&body=${encodeURIComponent(form.msg)}`;

  const [msgLabel, msgPlaceholder] = C.f_msg[intent];

  const bandRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    const band = bandRef.current;
    if (!band) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      // How far in the sheet starts: as far as it can while its text keeps
      // room inside it. Measured from where the text sits, and again on
      // resize, since that changes with the width.
      const text = band.querySelector<HTMLElement>(".contact");
      const inset = () => {
        const room = text ? text.getBoundingClientRect().left - band.getBoundingClientRect().left : 20;
        return gsap.utils.clamp(8, 64, Math.round(room - 20));
      };
      // The sheet's corners are the panel radius, from the stylesheet, so
      // this is not a second radius kept in a script.
      const radius = () => parseFloat(getComputedStyle(band).getPropertyValue("--r-panel")) || 20;
      gsap.fromTo(
        band,
        {
          clipPath: () =>
            `inset(0px ${inset()}px 0px ${inset()}px round ${radius()}px ${radius()}px 0px 0px)`,
        },
        {
          clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: band,
            start: "top bottom",
            end: "top 38%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }, []);

  return (
    <section id="contact" className="section section--band" aria-labelledby="contact-title" ref={bandRef}>
      <div className="container">
        <div className="contact">
          <div className="contact__aside">
            <header className="section-head">
              <h2 className="h2" id="contact-title">
                {C.title}
              </h2>
              <p className="lead">{C.lead}</p>
            </header>

            <div className="actions">
              <a
                href={C.whatsapp_href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                {...trackAttrs("whatsapp_click", { from: "contact" })}
              >
                <WhatsAppIcon />
                {C.whatsapp_cta}
              </a>
              {BOOKING_URL && (
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                  {...trackAttrs("booking_click")}
                >
                  {C.booking_cta}
                </a>
              )}
            </div>

            <div>
              <h3 className="label">
                {C.details_label}
              </h3>
              <dl className="direct">
                {C.rows.map(([k, v, href]) => (
                  <Row
                    key={k}
                    label={k}
                    value={v}
                    href={href}
                    copy={href?.startsWith("mailto:") ? [C.copy, C.copied] : undefined}
                  />
                ))}
              </dl>
            </div>

            <p className="availability">{C.availability}</p>
          </div>

          <form onSubmit={submit} noValidate aria-label={C.form_label} className="form">
            {send === "sent" ? (
              <div role="status" className="form-sent" ref={sentRef} tabIndex={-1}>
                <p className="label">{C.sent_label}</p>
                <h3 className="h3">{C.sent_title(sentName)}</h3>
                <p className="soft">{C.sent_body}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="btn btn--secondary"
                >
                  {C.sent_again}
                </button>
              </div>
            ) : (
              <>
                {restored && (
                  <p className="form-note">
                    <span>{C.draft_restored}</span>
                    <button type="button" className="link" onClick={reset}>
                      {C.draft_clear}
                    </button>
                  </p>
                )}
                <Choices
                  legend={C.intent_label}
                  options={INTENTS.map((v) => [v, C.intents[v]] as const)}
                  value={intent}
                  onChange={setIntent}
                />

                <Field
                  kind="text"
                  name="name"
                  label={C.f_name}
                  placeholder={C.f_name_p}
                  value={form.name}
                  error={errors.name && errorText[errors.name]}
                  autoComplete="name"
                  onChange={(v) => set("name", v)}
                />
                <Field
                  kind="email"
                  name="email"
                  label={C.f_email}
                  placeholder={C.f_email_p}
                  value={form.email}
                  error={errors.email && errorText[errors.email]}
                  autoComplete="email"
                  onChange={(v) => set("email", v)}
                />
                {intent === "role" && (
                  <Field
                    kind="text"
                    name="company"
                    label={C.f_company}
                    optional={C.optional}
                    placeholder={C.f_company_p}
                    value={form.company}
                    autoComplete="organization"
                    onChange={(v) => set("company", v)}
                  />
                )}
                <Field
                  kind="textarea"
                  name="message"
                  label={msgLabel}
                  placeholder={msgPlaceholder}
                  value={form.msg}
                  error={errors.msg && errorText[errors.msg]}
                  onChange={(v) => set("msg", v)}
                />

                {intent === "project" && (
                  <>
                    <Choices
                      legend={C.budget_label}
                      optional={C.optional}
                      options={BUDGETS.map((v) => [v, C.budgets[v]] as const)}
                      value={form.budget}
                      onChange={(v) => set("budget", v)}
                    />
                    <Choices
                      legend={C.timeline_label}
                      optional={C.optional}
                      options={TIMELINES.map((v) => [v, C.timelines[v]] as const)}
                      value={form.timeline}
                      onChange={(v) => set("timeline", v)}
                    />
                  </>
                )}

                {(send === "error" || send === "offline") && (
                  <p className="form-error" role="alert">
                    {send === "offline" ? C.e_offline : C.e_submit}{" "}
                    <a href={asEmail} className="link" {...trackAttrs("contact_email_fallback")}>
                      {C.e_fallback}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={send === "sending"}
                  className="btn btn--primary"
                  style={{ alignSelf: "flex-start" }}
                >
                  {send === "sending" ? C.sending : C.f_send}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  href,
  copy,
}: {
  label: string;
  value: string;
  href: string | null;
  /** [label, confirmation] — offers a copy button beside the value. */
  copy?: [string, string];
}) {
  const isLatin = /^[\x00-\x7F+\-.,/@\s]+$/.test(value);
  const external = href?.startsWith("http");
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={isLatin ? "latin tap" : "tap"}
          >
            {value}
          </a>
        ) : (
          <span className={isLatin ? "latin" : undefined}>{value}</span>
        )}
        {copy && <CopyButton text={value} label={copy[0]} done={copy[1]} />}
      </dd>
    </div>
  );
}

/**
 * A mailto link does nothing on a computer with no mail app set up, which is
 * most work laptops — so the address can also be copied. If the clipboard is
 * unavailable the button stays as it was; the link beside it still works.
 */
function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      track("copy_email");
    } catch {
      /* no clipboard access: nothing to undo */
    }
  };

  return (
    <button type="button" onClick={copy} className="copy-btn" aria-live="polite">
      {copied ? done : label}
    </button>
  );
}

/** A row of one-tap options backed by real radio inputs, so arrow keys work. */
function Choices<T extends string>({
  legend,
  optional,
  options,
  value,
  onChange,
}: {
  legend: string;
  optional?: string;
  options: ReadonlyArray<readonly [T, string]>;
  value: T | "";
  onChange: (v: T) => void;
}) {
  const name = useId();
  return (
    <fieldset className="choices">
      <legend className="field__label">
        {legend}
        {optional && <span className="field__optional"> ({optional})</span>}
      </legend>
      <div className="choices-row">
        {options.map(([v, label]) => (
          <label key={v} className="choice">
            <input
              type="radio"
              name={name}
              value={v}
              checked={value === v}
              onChange={() => onChange(v)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  kind,
  name,
  label,
  optional,
  placeholder,
  value,
  error,
  autoComplete,
  onChange,
}: {
  kind: "text" | "email" | "textarea";
  name: string;
  label: string;
  optional?: string;
  placeholder: string;
  value: string;
  error?: string;
  autoComplete?: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  const shared = {
    id,
    name,
    className: "field-input",
    value,
    placeholder,
    autoComplete,
    spellCheck: kind === "email" ? false : undefined,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
  };

  return (
    <div className="field">
      <div className="field__top">
        <label htmlFor={id} className="field__label">
          {label}
          {optional && <span className="field__optional"> ({optional})</span>}
        </label>
        {error && (
          <span id={errorId} role="alert" className="field__error">
            {error}
          </span>
        )}
      </div>
      {kind === "textarea" ? (
        <textarea {...shared} rows={4} />
      ) : (
        // An email address reads left to right even on the Arabic page.
        <input {...shared} type={kind} dir={kind === "email" ? "ltr" : undefined} />
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.2a6.8 6.8 0 00-5.86 10.25L1.2 14.8l3.44-.9A6.8 6.8 0 108 1.2zm0 12.3a5.5 5.5 0 01-2.8-.77l-.2-.12-2.04.53.55-1.99-.13-.2A5.5 5.5 0 118 13.5zm3.02-4.12c-.17-.08-.98-.48-1.13-.54-.15-.05-.26-.08-.37.09-.11.16-.43.54-.52.65-.1.1-.2.12-.36.04a4.5 4.5 0 01-2.24-1.96c-.17-.29.17-.27.48-.9.05-.11.03-.2-.01-.29-.04-.08-.37-.9-.51-1.23-.13-.32-.27-.28-.37-.28h-.32a.6.6 0 00-.44.2c-.15.17-.58.57-.58 1.38s.6 1.6.68 1.71c.08.11 1.17 1.79 2.84 2.51 1.05.45 1.46.49 1.99.41.32-.05.98-.4 1.12-.79.14-.39.14-.72.1-.79-.04-.07-.15-.11-.32-.19z"
        fill="currentColor"
      />
    </svg>
  );
}
