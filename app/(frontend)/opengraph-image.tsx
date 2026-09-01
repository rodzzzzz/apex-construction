import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "General contractor and custom home builder in Austin, Texas",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Built right. Built to last.",
    footer: "Austin, TX · General Contractor",
  });
}
