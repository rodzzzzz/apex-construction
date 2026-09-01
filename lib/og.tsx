import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { readFile } from "node:fs/promises";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT =
  "Apex Construction — general contractor and custom home builder in Austin, Texas.";

type OgImageOptions = {
  title: string;
  eyebrow?: string;
  footer?: string;
};

export function ogAlt(title: string, eyebrow?: string) {
  const prefix =
    eyebrow && eyebrow !== SITE_NAME
      ? `Apex Construction ${eyebrow} — `
      : "Apex Construction — ";
  return `${prefix}${title}`;
}

const host = SITE_URL.replace(/^https?:\/\//, "");

async function loadOgFonts() {
  const [archivo, grotesk, mono] = await Promise.all([
    readFile(new URL("./fonts/Archivo-700.ttf", import.meta.url)),
    readFile(new URL("./fonts/SpaceGrotesk-400.ttf", import.meta.url)),
    readFile(new URL("./fonts/IBMPlexMono-400.ttf", import.meta.url)),
  ]);

  return [
    {
      name: "Archivo",
      data: archivo,
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "Space Grotesk",
      data: grotesk,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "IBM Plex Mono",
      data: mono,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

function titleFontSize(title: string) {
  if (title.length > 50) return 52;
  if (title.length > 35) return 62;
  return 74;
}

export async function generateOgImage({
  title,
  eyebrow = SITE_NAME,
  footer,
}: OgImageOptions) {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: BRAND.graphite,
        color: BRAND.chalk,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(122,127,138,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(122,127,138,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgba(232,163,61,0.10) 0%, transparent 45%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Archivo, system-ui, sans-serif",
            fontSize: 380,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "rgba(232,163,61,0.05)",
            lineHeight: 1,
          }}
        >
          A
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: 44,
          flexGrow: 1,
          border: "1px solid rgba(232,163,61,0.40)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            width: 48,
            height: 48,
            borderTop: "4px solid #E8A33D",
            borderLeft: "4px solid #E8A33D",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: 48,
            height: 48,
            borderBottom: "4px solid #E8A33D",
            borderRight: "4px solid #E8A33D",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 38,
            paddingRight: 52,
            paddingBottom: 0,
            paddingLeft: 52,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 26,
              textTransform: "uppercase",
              color: BRAND.amber,
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 16,
            }}
          >
            <span
              style={{
                height: 1,
                flex: 1,
                background: "rgba(232,163,61,0.5)",
              }}
            />
            <span
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#E8A33D",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                height: 1,
                flex: 1,
                background: "rgba(232,163,61,0.5)",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingLeft: 52,
            paddingRight: 52,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Archivo, system-ui, sans-serif",
              fontSize: titleFontSize(title),
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: BRAND.chalk,
              textAlign: "center",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            paddingRight: 52,
            paddingBottom: 38,
            paddingLeft: 52,
            borderTop: "1px solid rgba(232,163,61,0.22)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: 14,
              textTransform: "uppercase",
              color: BRAND.amber,
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            {footer ?? "Austin, TX · General Contractor"}
          </span>
          <span
            style={{
              fontSize: 11,
              letterSpacing: 14,
              color: "rgba(242,243,245,0.6)",
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            {host}
          </span>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts,
    },
  );
}
