import Image from "next/image";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { cn } from "@/lib/utils";

/**
 * Interior page hero: left-aligned drafting-sheet layout with numbered mono
 * label, line-rising title, drawn amber rule, and a ghost index numeral
 * anchored to the frame. A directional scrim keeps the copy legible over
 * any background photograph.
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
        compact ? "min-h-[64svh]" : "min-h-[82svh]",
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
      {/* directional scrim: darker behind the left-aligned copy */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-graphite/75 via-graphite/30 to-transparent md:from-graphite/80 md:via-graphite/20"
      />

      {/* ghost index numeral, anchored to the frame's top-left */}
      {index ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-24 right-6 font-mono text-[26vw] leading-none font-bold tracking-tighter text-chalk/6 select-none sm:text-[18vw] md:top-28 md:right-10 md:text-[13vw] lg:text-[10rem]"
        >
          {index}
        </span>
      ) : null}

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-7xl flex-col justify-end px-7 pb-16 pt-32 sm:px-10 md:px-14 md:pb-24",
          compact ? "min-h-[64svh]" : "min-h-[82svh]",
        )}
      >
        <div className="max-w-3xl">
          <p className="animate-hero flex items-center gap-3 font-mono text-[10px] tracking-[0.32em] text-amber uppercase sm:text-[11px] sm:tracking-[0.36em]">
            <span aria-hidden className="inline-block h-px w-8 bg-amber/80" />
            {index ? (
              <span className="tabular-nums text-amber/55">
                {index}
                <span className="mx-1.5 text-amber/35">/</span>
              </span>
            ) : null}
            {label}
          </p>

          <h1 className="line-rise-mask mt-6">
            <span className="animate-hero-rise animate-hero-delay-1 block max-w-[16ch] text-balance font-serif text-[11vw] leading-[1.0] font-bold text-chalk [text-shadow:0_8px_40px_oklch(0.2_0.008_250/0.55)] sm:text-6xl md:text-7xl lg:text-8xl">
              {title}
            </span>
          </h1>

          <div
            aria-hidden
            className="animate-hero-draw animate-hero-delay-2 mt-7 h-1 w-16 bg-amber sm:w-24"
          />

          <p className="animate-hero animate-hero-delay-2 mt-6 max-w-xl text-base leading-relaxed text-chalk/80 sm:text-lg md:text-xl">
            {description}
          </p>
        </div>

        {/* bottom meta strip: coordinates + brand, drafting-sheet footer */}
        <div className="animate-hero animate-hero-delay-3 mt-12 hidden items-center gap-6 border-t border-chalk/15 pt-5 font-mono text-[10px] tracking-[0.26em] text-chalk/45 uppercase sm:flex md:gap-10">
          <span>Austin, TX</span>
          <span aria-hidden className="h-px w-10 bg-chalk/20" />
          <span>30.2672° N / 97.7431° W</span>
          <span
            aria-hidden
            className="ml-auto hidden h-px flex-1 bg-chalk/10 md:block"
          />
          <span className="hidden md:block">Apex Construction</span>
        </div>
      </div>
    </section>
  );
}
