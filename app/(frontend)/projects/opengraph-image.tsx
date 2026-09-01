import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "Commercial, residential, and industrial projects",
  "Projects",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "Work we can\npoint to.",
    eyebrow: "Projects",
    subtitle: "400+ delivered across Central Texas",
  });
}
