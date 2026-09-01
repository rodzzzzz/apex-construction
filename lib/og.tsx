import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { readFile } from "node:fs/promises";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT =
  "Apex Construction — general contractor and custom home builder in Austin, Texas.";

const PAD = 52;

type OgImageOptions = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
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

/** Clamp title size by length so nothing clips or overflows. */
function titleFontSize(title: string) {
  const len = title.length;
  if (len <= 18) return 88;
  if (len <= 28) return 76;
  if (len <= 40) return 64;
  if (len <= 56) return 54;
  return 46;
}

export async function generateOgImage({
  title,
  eyebrow = SITE_NAME,
  subtitle,
  footer,
}: OgImageOptions) {
  const fonts = await loadOgFonts();
  const titleSize = titleFontSize(title);
  const titleLines = title.split("\n");

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
      {/* blueprint grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(122,127,138,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(122,127,138,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* vignette + amber wash */}
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
      {/* watermark apex glyph on the right */}
      <div
        style={{
          position: "absolute",
          right: -60,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Archivo, system-ui, sans-serif",
            fontSize: 430,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "rgba(232,163,61,0.05)",
            lineHeight: 1,
          }}
        >
          A
        </span>
      </div>

      {/* frame */}
      <div
        style={{
          position: "absolute",
          top: PAD - 8,
          left: PAD - 8,
          right: PAD - 8,
          bottom: PAD - 8,
          border: "1px solid rgba(232,163,61,0.40)",
        }}
      />
      {/* corner brackets */}
      <div
        style={{
          position: "absolute",
          top: PAD - 11,
          left: PAD - 11,
          width: 48,
          height: 48,
          borderTop: "4px solid #E8A33D",
          borderLeft: "4px solid #E8A33D",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: PAD - 11,
          right: PAD - 11,
          width: 48,
          height: 48,
          borderBottom: "4px solid #E8A33D",
          borderRight: "4px solid #E8A33D",
        }}
      />

      {/* eyebrow — absolutely centered top */}
      <div
        style={{
          position: "absolute",
          top: PAD + 14,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
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
            fontSize: 12,
            letterSpacing: 26,
            textTransform: "uppercase",
            color: BRAND.amber,
            fontFamily: "IBM Plex Mono, monospace",
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#E8A33D",
            flexShrink: 0,
          }}
        />
      </div>

      {/* title block — absolutely positioned, left-aligned like a drafting sheet */}
      <div
        style={{
          position: "absolute",
          top: 168,
          left: PAD + 40,
          right: PAD + 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {titleLines.map((line, index) => (
            <span
              key={index}
              style={{
                fontFamily: "Archivo, system-ui, sans-serif",
                fontSize: titleSize,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.06,
                color: BRAND.chalk,
                textAlign: "left",
              }}
            >
              {line}
            </span>
          ))}
        </div>
        {/* amber rule under title */}
        <span
          style={{
            marginTop: 26,
            width: 120,
            height: 4,
            backgroundColor: "#E8A33D",
          }}
        />
        {subtitle ? (
          <span
            style={{
              marginTop: 22,
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 20,
              letterSpacing: 2,
              color: "rgba(242,243,245,0.72)",
            }}
          >
            {subtitle}
          </span>
        ) : null}
      </div>

      {/* footer — two absolutely pinned spans, immune to space-between drift.
          letterSpacing adds trailing space in Satori's width calc, so the
          right span is padded extra to keep the glyphs clear of the frame. */}
      <span
        style={{
          position: "absolute",
          left: PAD + 10,
          bottom: PAD + 10,
          fontSize: 12,
          letterSpacing: 12,
          textTransform: "uppercase",
          color: BRAND.amber,
          fontFamily: "IBM Plex Mono, monospace",
        }}
      >
        {footer ?? "Austin, TX · General Contractor"}
      </span>
      <span
        style={{
          position: "absolute",
          right: PAD + 10 + 12,
          bottom: PAD + 10,
          fontSize: 12,
          letterSpacing: 12,
          textTransform: "uppercase",
          color: "rgba(242,243,245,0.62)",
          fontFamily: "IBM Plex Mono, monospace",
        }}
      >
        {host}
      </span>
      {/* footer divider line */}
      <div
        style={{
          position: "absolute",
          left: PAD - 8,
          right: PAD - 8,
          bottom: PAD + 52,
          height: 1,
          backgroundColor: "rgba(232,163,61,0.22)",
        }}
      />
    </div>,
    {
      ...OG_SIZE,
      fonts,
    },
  );
}
