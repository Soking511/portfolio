"use client";

import { useId, useState } from "react";
import { useT } from "@/components/lang/provider";

type FormState = { name: string; email: string; msg: string };
type SendState = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function Contact() {
  const { t, lang } = useT();
  const C = t.contact;
  const isAR = lang === "ar";

  const [form, setForm] = useState<FormState>({ name: "", email: "", msg: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [send, setSend] = useState<SendState>("idle");
  const [sentName, setSentName] = useState("");

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = C.e_required;
    if (!EMAIL_RE.test(form.email)) e.email = C.e_email;
    if (form.msg.trim().length < 10) e.msg = C.e_msg;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSend("sending");
    try {
      const [{ db }, { collection, addDoc }] = await Promise.all([
        import("@/lib/firebase"),
        import("firebase/firestore"),
      ]);
      if (!db) throw new Error("Firestore not initialized");
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        message: form.msg,
        lang,
        createdAt: new Date().toISOString(),
        status: "unread",
        emailNotified: false,
      });
      setSentName(form.name.split(" ")[0] || (isAR ? "صديقي" : "friend"));
      setSend("sent");
    } catch (err) {
      console.error("Contact submit failed:", err);
      setSend("error");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", msg: "" });
    setErrors({});
    setSend("idle");
    setSentName("");
  };

  return (
    <section id="contact" className="band section-open">
      <div className="container-edge">
        <header
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
        >
          <span className="eyebrow">{C.eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </header>

        <h2 className="d2" data-reveal style={{ maxWidth: "16ch", marginBottom: 48 }}>
          {C.headline_a}
          <span className="em">{C.headline_em}</span>
          {C.headline_b}
        </h2>

        <div className="r-contact">
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <p className="lead" style={{ maxWidth: "46ch" }}>
              {C.lead}
            </p>

            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                {C.details_label}
              </div>
              <dl className="r-contact-rows">
                {C.rows.map(([k, v, href]) => (
                  <Row key={k} label={k} value={v} href={href} />
                ))}
              </dl>
            </div>

            <p
              className="mono"
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                color: "var(--fg-dim)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 99,
                  background: "var(--accent)",
                  flex: "none",
                }}
              />
              {C.availability}
            </p>
          </div>

          <form
            onSubmit={submit}
            data-reveal
            data-reveal-delay="1"
            style={{
              padding: 28,
              background: "var(--bg)",
              border: "1px solid var(--rule)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {send === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "24px 0" }}>
                <span className="eyebrow" style={{ color: "var(--accent)" }}>
                  {C.sent_label}
                </span>
                <h3 className="d3">{C.sent_title(sentName)}</h3>
                <p className="body dim">{C.sent_body}</p>
                <button type="button" onClick={reset} className="btn btn-ghost" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  {C.sent_again}
                </button>
              </div>
            ) : (
              <>
                <div className="eyebrow">{C.form_label}</div>

                <Field
                  kind="text"
                  label={C.f_name}
                  placeholder={C.f_name_p}
                  value={form.name}
                  error={errors.name}
                  autoComplete="name"
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  kind="email"
                  label={C.f_email}
                  placeholder={C.f_email_p}
                  value={form.email}
                  error={errors.email}
                  autoComplete="email"
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
                <Field
                  kind="textarea"
                  label={C.f_msg}
                  placeholder={C.f_msg_p}
                  value={form.msg}
                  error={errors.msg}
                  onChange={(v) => setForm((f) => ({ ...f, msg: v }))}
                />

                {send === "error" && (
                  <p className="mono" role="alert" style={{ margin: 0, fontSize: 12.5, color: "#d93a4a" }}>
                    {C.e_submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={send === "sending"}
                  className="btn btn-primary"
                  style={{
                    alignSelf: "flex-start",
                    marginTop: 4,
                    opacity: send === "sending" ? 0.7 : 1,
                    cursor: send === "sending" ? "not-allowed" : "pointer",
                  }}
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

function Row({ label, value, href }: { label: string; value: string; href: string | null }) {
  const isLatin = /^[\x00-\x7F+\-.,/@\s]+$/.test(value);
  return (
    <>
      <dt className="eyebrow">{label}</dt>
      <dd style={{ margin: 0 }}>
        {href ? (
          <a
            href={href}
            className={isLatin ? "latin tap" : "tap"}
            style={{
              fontSize: 16.5,
              textDecoration: "underline",
              textDecorationColor: "var(--rule)",
              textUnderlineOffset: 4,
            }}
          >
            {value}
          </a>
        ) : (
          <span className={isLatin ? "latin" : undefined} style={{ fontSize: 16.5 }}>
            {value}
          </span>
        )}
      </dd>
    </>
  );
}

function Field({
  kind,
  label,
  placeholder,
  value,
  error,
  autoComplete,
  onChange,
}: {
  kind: "text" | "email" | "textarea";
  label: string;
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
    value,
    placeholder,
    autoComplete,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    style: {
      width: "100%",
      background: "transparent",
      border: 0,
      outline: "none",
      color: "var(--fg)",
      font: "inherit",
      fontSize: 16.5,
      padding: "10px 0",
      borderBottom: `1px solid ${error ? "#d93a4a" : "var(--rule)"}`,
      direction: "inherit" as const,
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <label htmlFor={id} className="eyebrow">
          {label}
        </label>
        {error && (
          <span id={errorId} role="alert" className="mono" style={{ fontSize: 11, color: "#d93a4a" }}>
            {error}
          </span>
        )}
      </div>
      {kind === "textarea" ? (
        <textarea {...shared} rows={4} style={{ ...shared.style, resize: "vertical" }} />
      ) : (
        <input {...shared} type={kind} />
      )}
    </div>
  );
}
