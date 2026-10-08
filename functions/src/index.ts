import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/** Escapes values before they are interpolated into the notification HTML. */
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Codes the form stores (lib/contact.ts) → what the notification should say.
const INTENT_LABEL: Record<string, string> = {
  project: "Project",
  role: "Role",
  other: "Other",
};
const BUDGET_LABEL: Record<string, string> = {
  lt1k: "Under $1k",
  "1-3k": "$1k – 3k",
  "3-8k": "$3k – 8k",
  "8k+": "$8k +",
  unsure: "Not sure yet",
};
const TIMELINE_LABEL: Record<string, string> = {
  asap: "As soon as possible",
  "1-3m": "1 – 3 months",
  flexible: "Flexible",
};

export const onContactFormSubmission = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap: functions.firestore.QueryDocumentSnapshot) => {
    const data = snap.data();

    // The form writes name/email/message/lang/intent, plus budget and
    // timeline for a project or company for a role — each only when given.
    // There is no `subject` field, and the flag it sets is `emailNotified`.
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const message = escapeHtml(data.message);
    const lang = escapeHtml(data.lang);
    const intent = INTENT_LABEL[data.intent] ?? null;

    const details: Array<[string, string | undefined]> = [
      ["Language", lang],
      ["About", intent ?? undefined],
      ["Budget", BUDGET_LABEL[data.budget]],
      ["Timeline", TIMELINE_LABEL[data.timeline]],
      ["Company", data.company ? escapeHtml(data.company) : undefined],
    ];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: typeof data.email === "string" ? data.email : undefined,
      subject: `${intent ? `[${intent}] ` : ""}Portfolio enquiry from ${name}`,
      html: `
        <h2>New message from the portfolio contact form</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        ${details
          .filter(([, value]) => value)
          .map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`)
          .join("\n        ")}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      await snap.ref.update({ emailNotified: true });
    } catch (error) {
      console.error("Error sending email:", error);
      await snap.ref.update({
        emailNotified: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });
