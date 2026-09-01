import { Resend } from "resend";

export async function sendStaffEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { skipped: true as const };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "build@apexconstruction.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Apex Construction <onboarding@resend.dev>";
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo,
    subject,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { skipped: false as const };
}
