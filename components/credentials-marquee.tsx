import { cn } from "@/lib/utils";

/**
 * Infinite credentials ticker. Content duplicates once for the seamless
 * -50% loop; pauses on hover/focus; static (no motion) under reduced-motion
 * via the .animate-marquee rules in globals.css.
 */
export function CredentialsMarquee({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  if (items.length === 0) return null;
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className="px-6 font-mono text-[11px] tracking-[0.22em] whitespace-nowrap text-chalk/60 uppercase md:text-xs">
            {item}
          </span>
          <span aria-hidden className="size-1 shrink-0 bg-amber/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-chalk/10 bg-graphite py-3.5 select-none",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-graphite to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-graphite to-transparent"
      />
      <div className="marquee-track flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
