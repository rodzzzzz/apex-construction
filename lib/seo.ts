import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://apexconstruction.com";
export const SITE_NAME = "Apex Construction";
export const SITE_EMAIL = "build@apexconstruction.com";
export const SITE_PHONE = "+1 (512) 555-0148";
export const SITE_ADDRESS = "4700 Cullen Drive, Building B, Austin, TX 78744";
export const SITE_REGION = "Central Texas";
export const SITE_LICENSE = "TX GC Lic. #42-8137";
export const SITE_PRICE_RANGE = "$$–$$$";

export const DEFAULT_TITLE =
  "Apex Construction | General Contractor & Custom Home Builder in Austin, TX";
export const DEFAULT_DESCRIPTION =
  "Apex Construction is a general contractor in Austin, Texas — commercial construction, custom homes, remodeling, and design-build delivered with precision, transparency, and 25+ years on the ground.";
export const DEFAULT_OG_DESCRIPTION =
  "Commercial, custom residential, and design-build construction across Central Texas — built on precision, schedules, and straight answers.";

const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: readonly string[];
  noindex?: boolean;
};

function absoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

function socialTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${SITE_NAME} | ${title}`;
}

export function createMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
  noindex = false,
}: CreateMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = socialTitle(title);

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords: [...keywords] } : {}),
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: ogTitle,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export function googleSiteVerification(): Pick<Metadata, "verification"> {
  if (!GOOGLE_VERIFICATION) return {};
  return {
    verification: {
      google: GOOGLE_VERIFICATION,
    },
  };
}
