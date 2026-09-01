import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact";
import { sendStaffEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message ?? "Invalid form submission.",
        },
        { status: 400 },
      );
    }

    const payload = await getPayloadClient();
    await payload.create({
      collection: "contact-messages",
      data: { ...parsed.data, status: "unread" },
      overrideAccess: true,
    });

    try {
      await sendStaffEmail({
        subject: `New message from ${parsed.data.name}`,
        replyTo: parsed.data.email,
        text: [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Phone: ${parsed.data.phone || "N/A"}`,
          "",
          parsed.data.message,
        ].join("\n"),
      });
    } catch (error) {
      console.error("Resend error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
