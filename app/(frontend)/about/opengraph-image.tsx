import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt("25 years of building across Central Texas", "About");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Builders, not brokers",
    eyebrow: "About",
    footer: "Austin, TX · General Contractor",
  });
}
