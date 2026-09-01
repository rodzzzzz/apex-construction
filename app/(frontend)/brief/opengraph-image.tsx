import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "Review your brief and request a quote",
  "Quote builder",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Your brief, itemized",
    eyebrow: "Quote builder",
    footer: "Austin, TX · General Contractor",
  });
}
