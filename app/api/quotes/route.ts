import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/quotes";
import { sendStaffEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid quote request." },
        { status: 400 },
      );
    }

    const total = parsed.data.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    const payload = await getPayloadClient();
    await payload.create({
      collection: "quote-requests",
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        projectStage: parsed.data.projectStage,
        address: parsed.data.address,
        notes: parsed.data.notes,
        items: parsed.data.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        total,
        status: "new",
      },
      overrideAccess: true,
    });

    try {
      await sendStaffEmail({
        subject: `Quote request from ${parsed.data.name}`,
        replyTo: parsed.data.email,
        text: [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Phone: ${parsed.data.phone}`,
          `Stage: ${parsed.data.projectStage}`,
          `Address: ${parsed.data.address || "N/A"}`,
          "",
          ...parsed.data.items.map(
            (item) =>
              `${item.quantity} × ${item.name} (from $${item.unitPrice})`,
          ),
          "",
          `Estimate: $${total}`,
          parsed.data.notes || "",
        ].join("\n"),
      });
    } catch (error) {
      console.error("Resend error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
