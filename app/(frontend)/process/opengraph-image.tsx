import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "How an Apex build runs, from first call to handover",
  "Process",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "How an Apex build runs",
    eyebrow: "Process",
    footer: "Austin, TX · General Contractor",
  });
}
