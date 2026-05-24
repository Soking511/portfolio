"use client";

import { useState } from "react";
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
    <section id="contact" style={{ padding: "160px 0 100px", position: "relative" }}>
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 32 }}
        >
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".18em" }}>
            ● {C.eyebrow}
          </span>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--fg-dim)",
              letterSpacing: ".14em",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            {C.sub}
          </span>
          <span className="rule" style={{ flex: 1 }} />
        </div>

        <h2
          className="serif"
          data-reveal
          data-reveal-delay="1"
          style={{
            margin: "0 0 60px",
            fontSize: isAR ? "clamp(56px, 11vw, 168px)" : "clamp(64px, 12vw, 188px)",
            lineHeight: 0.95,
            fontWeight: 400,
            letterSpacing: "-.02em",
          }}
        >
          {C.headline_a}
          <span className="italic" style={{ color: "var(--accent)" }}>
            {C.headline_em}
          </span>
          {C.headline_b}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div
            data-reveal
            data-reveal-delay="1"
            style={{ display: "flex", flexDirection: "column", gap: 32 }}
          >
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.55 }}>{C.lead}</p>

            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: isAR ? "none" : "uppercase",
                  color: "var(--fg-dim)",
                  marginBottom: 18,
                }}
              >
                {C.details_label}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "14px 28px",
                  alignItems: "baseline",
                }}
              >
                {C.rows.map(([k, v, href], i) => (
                  <RowFragment key={i} label={k} value={v} href={href} isAR={isAR} />
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 99,
                  background: "#00E08A",
                  boxShadow: "0 0 10px #00E08A",
                }}
              />
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: ".06em", color: "var(--fg-dim)" }}>
                {C.availability}
              </span>
            </div>
          </div>

          <form
            onSubmit={submit}
            data-reveal
            data-reveal-delay="2"
            style={{
              padding: "28px 28px 26px",
              background: "var(--card)",
              border: "1px solid var(--rule)",
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {send === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "30px 0" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: ".14em", color: "var(--accent)" }}>
                  {C.sent_label}
                </span>
                <h3
                  className="serif"
                  style={{ margin: 0, fontSize: 32, fontWeight: 400, letterSpacing: "-.01em" }}
                >
                  {C.sent_title(sentName)}
                </h3>
                <p style={{ margin: 0, fontSize: 15, color: "var(--fg-dim)", lineHeight: 1.6 }}>{C.sent_body}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mono"
                  style={{
                    marginTop: 8,
                    alignSelf: "flex-start",
                    padding: "10px 16px",
                    border: "1px solid var(--rule)",
                    borderRadius: 999,
                    fontSize: 11.5,
                    letterSpacing: ".08em",
                  }}
                >
                  {C.sent_again}
                </button>
              </div>
            ) : (
              <>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: isAR ? "none" : "uppercase",
                    color: "var(--fg-dim)",
                  }}
                >
                  / {C.form_label}
                </div>

                <Field
                  name="name"
                  type="input"
                  label={C.f_name}
                  placeholder={C.f_name_p}
                  value={form.name}
                  error={errors.name}
                  isAR={isAR}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  name="email"
                  type="email"
                  label={C.f_email}
                  placeholder={C.f_email_p}
                  value={form.email}
                  error={errors.email}
                  isAR={isAR}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
                <Field
                  name="msg"
                  type="textarea"
                  label={C.f_msg}
                  placeholder={C.f_msg_p}
                  value={form.msg}
                  error={errors.msg}
                  isAR={isAR}
                  onChange={(v) => setForm((f) => ({ ...f, msg: v }))}
                />

                {send === "error" && (
                  <div className="mono" style={{ fontSize: 12, color: "#ff5b6b" }}>
                    {C.e_submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={send === "sending"}
                  style={{
                    marginTop: 6,
                    alignSelf: "flex-start",
                    padding: "14px 24px",
                    borderRadius: 999,
                    background: "var(--accent)",
                    color: "var(--accent-ink)",
                    fontWeight: 600,
                    letterSpacing: ".02em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: send === "sending" ? 0.7 : 1,
                    cursor: send === "sending" ? "not-allowed" : "pointer",
                  }}
                >
                  {send === "sending" ? C.sending : C.f_send}
                  {send !== "sending" && (
                    <svg className="arrow-x" width="14" height="14" viewBox="0 0 14 14">
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function RowFragment({
  label,
  value,
  href,
  isAR,
}: {
  label: string;
  value: string;
  href: string | null;
  isAR: boolean;
}) {
  const valIsLatin = /^[\x00-\x7F+\-.,/@]+$/.test(value);
  return (
    <>
      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: ".1em",
          textTransform: isAR ? "none" : "uppercase",
          color: "var(--fg-dim)",
        }}
      >
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className={valIsLatin ? "serif latin" : "serif"}
          style={{
            fontSize: 20,
            borderBottom: "1px solid var(--rule)",
            paddingBottom: 2,
            width: "fit-content",
          }}
        >
          {value}
        </a>
      ) : (
        <span className={valIsLatin ? "serif latin" : "serif"} style={{ fontSize: 20 }}>
          {value}
        </span>
      )}
    </>
  );
}

function Field({
  name,
  type,
  label,
  placeholder,
  value,
  error,
  isAR,
  onChange,
}: {
  name: string;
  type: "input" | "email" | "textarea";
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  isAR: boolean;
  onChange: (v: string) => void;
}) {
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: 0,
    outline: "none",
    color: "var(--fg)",
    font: "inherit",
    fontSize: type === "textarea" ? 17 : 20,
    padding: "12px 0",
    borderBottom: `1px solid ${error ? "#ff5b6b" : "var(--rule)"}`,
    resize: type === "textarea" ? "vertical" : "none",
    direction: "inherit",
    textAlign: isAR ? "right" : "left",
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: ".1em",
            textTransform: isAR ? "none" : "uppercase",
            color: "var(--fg-dim)",
          }}
        >
          {label}
        </span>
        {error && (
          <span className="mono" style={{ fontSize: 11, color: "#ff5b6b", letterSpacing: ".04em" }}>
            {error}
          </span>
        )}
      </div>
      {type === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={sharedStyle}
        />
      ) : (
        <input
          name={name}
          type={type === "email" ? "email" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={sharedStyle}
        />
      )}
    </label>
  );
}
