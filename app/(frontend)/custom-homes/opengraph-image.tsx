import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "Design-build custom homes across Central Texas",
  "Custom Homes",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Apex Custom Homes",
    eyebrow: "Custom Homes",
    footer: "Austin, TX · General Contractor",
  });
}
