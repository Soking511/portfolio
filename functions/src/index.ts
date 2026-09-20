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

export const onContactFormSubmission = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap: functions.firestore.QueryDocumentSnapshot) => {
    const data = snap.data();

    // The form writes name/email/message/lang — there is no `subject` field,
    // and the flag it sets is `emailNotified`, so both are matched here.
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const message = escapeHtml(data.message);
    const lang = escapeHtml(data.lang);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: typeof data.email === "string" ? data.email : undefined,
      subject: `Portfolio enquiry from ${name}`,
      html: `
        <h2>New message from the portfolio contact form</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Language:</strong> ${lang}</p>
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
