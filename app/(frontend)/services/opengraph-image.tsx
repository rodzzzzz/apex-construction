import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "Construction services with honest starting prices",
  "Services",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Every scope, priced straight",
    eyebrow: "Services",
    footer: "Austin, TX · General Contractor",
  });
}
