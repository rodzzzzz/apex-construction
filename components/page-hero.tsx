import Image from "next/image";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { Ornament } from "@/components/ornament";
import { cn } from "@/lib/utils";

export default function PageHero({
  label,
  title,
  description,
  image,
  imageAlt,
  compact = false,
}: {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
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
          "relative mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-28 text-center sm:px-8 sm:py-36",
          compact ? "min-h-[58svh]" : "min-h-[78svh]",
        )}
      >
        <div className="animate-hero flex w-fit max-w-full flex-col items-center">
          <p className="font-mono text-[10px] tracking-[0.36em] text-amber uppercase sm:text-[11px] sm:tracking-[0.42em]">
            {label}
          </p>
          <Ornament light className="mt-5 sm:mt-7" />
        </div>
        <h1 className="animate-hero animate-hero-delay-2 mt-6 max-w-[22ch] text-balance font-serif text-5xl font-bold leading-[1.05] text-chalk [text-shadow:0_8px_40px_oklch(0.2_0.008_250/0.55)] sm:mt-8 md:text-7xl">
          {title}
        </h1>
        <p className="animate-hero animate-hero-delay-3 mt-5 max-w-xl text-lg leading-relaxed text-chalk/80 sm:mt-8 sm:text-xl md:text-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
