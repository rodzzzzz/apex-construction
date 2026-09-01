import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = ogAlt(
  "How Apex Construction looks after your details",
  "Privacy",
);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return generateOgImage({
    title: "How we look\nafter your details.",
    eyebrow: "Privacy",
    subtitle: "Collected with care, used to build",
  });
}
