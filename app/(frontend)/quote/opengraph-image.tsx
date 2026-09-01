import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt("Free consultation and itemized quotes", "Quote");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Start with a\nstraight answer.",
    eyebrow: "Quote",
    subtitle: "Free consultation · response within one business day",
  });
}
