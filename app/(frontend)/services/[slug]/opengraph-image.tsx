import { generateOgImage, ogAlt, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { getServiceBySlug } from "@/lib/content";
import { formatUsd } from "@/lib/utils";

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateImage({ params }: ImageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return {
    title: service
      ? `${service.name} — from ${formatUsd(service.startingAt)}`
      : "Services",
    eyebrow: "Services",
    footer: "Austin, TX · General Contractor",
    alt: ogAlt(
      service ? `${service.name} in Austin, TX` : "Construction services",
      "Services",
    ),
  };
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage(props: ImageProps) {
  const image = await generateImage(props);
  return generateOgImage(image);
}
