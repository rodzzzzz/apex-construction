import Image from "next/image";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { cn } from "@/lib/utils";

/**
 * Interior page hero: left-aligned drafting-sheet layout with numbered mono
 * label, line-rising title, and an amber rule that draws in.
 */
export default function PageHero({
  label,
  index,
  title,
  description,
  image,
  imageAlt,
  compact = false,
}: {
  label: string;
  index?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex overflow-hidden",
        compact ? "min-h-[58svh]" : "min-h-[78svh]",
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="animate-ken-burns object-cover"
        sizes="100vw"
      />
      <HeroAtmosphere tone="deep" />

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-32 sm:px-8 md:pb-20",
          compact ? "min-h-[58svh]" : "min-h-[78svh]",
        )}
      >
        <p className="animate-hero font-mono text-[10px] tracking-[0.32em] text-amber uppercase sm:text-[11px] sm:tracking-[0.36em]">
          {index ? (
            <span className="tabular-nums text-amber/55">
              {index}
              <span className="mx-1.5 text-amber/35">/</span>
            </span>
          ) : null}
          {label}
        </p>

        <h1 className="line-rise-mask mt-6">
          <span className="animate-hero-rise animate-hero-delay-1 block max-w-[20ch] text-balance font-serif text-4xl font-bold leading-[1.02] text-chalk [text-shadow:0_8px_40px_oklch(0.2_0.008_250/0.55)] sm:text-6xl md:text-7xl">
            {title}
          </span>
        </h1>

        <div
          aria-hidden
          className="animate-hero-draw animate-hero-delay-2 mt-7 h-px w-24 bg-amber sm:w-32"
        />

        <p className="animate-hero animate-hero-delay-2 mt-6 max-w-xl text-base leading-relaxed text-chalk/75 sm:text-lg md:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
