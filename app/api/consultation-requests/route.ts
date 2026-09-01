import { NextResponse } from "next/server";
import { consultationFormSchema } from "@/lib/consultations";
import { sendStaffEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = consultationFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ?? "Invalid consultation request.",
        },
        { status: 400 },
      );
    }

    const payload = await getPayloadClient();
    await payload.create({
      collection: "consultations",
      data: {
        ...parsed.data,
        status: "pending",
      },
      overrideAccess: true,
    });

    try {
      await sendStaffEmail({
        subject: `Consultation request from ${parsed.data.name}`,
        replyTo: parsed.data.email,
        text: [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Phone: ${parsed.data.phone}`,
          `Date: ${parsed.data.date}`,
          `Time: ${parsed.data.time}`,
          `Project type: ${parsed.data.projectType}`,
          "",
          parsed.data.notes || "",
        ].join("\n"),
      });
    } catch (error) {
      console.error("Resend error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
