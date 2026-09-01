import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "Phone, email, hours, and the Austin office",
  "Contact",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Talk to a\nbuilder today.",
    eyebrow: "Contact",
    subtitle: "Austin, TX · Mon–Fri 7AM–5PM",
  });
}
