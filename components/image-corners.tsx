import { cn } from "@/lib/utils";

/**
 * Amber crosshair corner ticks that appear on hover — the single consistent
 * image treatment used across the site (parent must carry `group`).
 */
export function ImageCorners({ className }: { className?: string }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-3 left-3 z-10 size-5 border-t-2 border-l-2 border-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          className,
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-3 bottom-3 z-10 size-5 border-r-2 border-b-2 border-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          className,
        )}
      />
    </>
  );
}
