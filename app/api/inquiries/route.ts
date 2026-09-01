import { NextResponse } from "next/server";
import { projectInquirySchema } from "@/lib/inquiries";
import { sendStaffEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = projectInquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid inquiry." },
        { status: 400 },
      );
    }

    const payload = await getPayloadClient();
    await payload.create({
      collection: "project-inquiries",
      data: { ...parsed.data, status: "new" },
      overrideAccess: true,
    });

    try {
      await sendStaffEmail({
        subject: `Project inquiry from ${parsed.data.name}`,
        replyTo: parsed.data.email,
        text: [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Phone: ${parsed.data.phone}`,
          `Target start: ${parsed.data.targetDate}`,
          `Approx. sq ft: ${parsed.data.approxSqFt}`,
          `Type: ${parsed.data.homeType || "N/A"}`,
          "",
          parsed.data.message || "",
        ].join("\n"),
      });
    } catch (error) {
      console.error("Resend error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
