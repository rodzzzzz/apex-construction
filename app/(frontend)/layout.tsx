import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/site-chrome";
import { getSiteSettings, socialLinks } from "@/lib/content";
import { contractorJsonLd } from "@/lib/json-ld";
import { JsonLd } from "@/components/json-ld";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  googleSiteVerification,
} from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `${SITE_NAME} | %s`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "general contractor Austin",
    "construction company Austin TX",
    "custom home builder Austin",
    "commercial construction Austin",
    "design-build contractor Texas",
    "home remodeling Austin",
    "Apex Construction",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  ...googleSiteVerification(),
  robots: {
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
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_OG_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_OG_DESCRIPTION,
  },
};

export function generateViewport(): Viewport {
  return {
    themeColor: "#1F2229",
  };
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${archivo.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.className} antialiased`}
      >
        <JsonLd
          data={contractorJsonLd({
            name: settings.name,
            email: settings.email,
            phone: settings.phone,
            address: settings.address,
            sameAs: socialLinks(settings),
            hours: settings.hours ?? [],
            image: settings.heroImageUrl ?? undefined,
          })}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteChrome settings={settings}>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
