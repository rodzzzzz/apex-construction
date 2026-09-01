import { cn } from "@/lib/utils";

export function Ornament({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const line = light ? "bg-amber/50" : "bg-amber/70";
  const mark = light ? "bg-amber/90" : "bg-amber";

  return (
    <div
      className={cn("flex w-full items-center gap-3", className)}
      aria-hidden
    >
      <span className={cn("h-px min-w-6 flex-1", line)} />
      <span className={cn("size-1.5 shrink-0", mark)} />
      <span className={cn("h-px min-w-6 flex-1", line)} />
    </div>
  );
}

/**
 * Drafting-sheet section label: `03 / THE APEX METHOD` with an amber tick rule
 * that draws in (scaleX) on scroll when `draw` is set.
 */
export function SectionKicker({
  children,
  align = "start",
  light = false,
  className,
  index,
  draw = true,
}: {
  children: React.ReactNode;
  align?: "start" | "center";
  light?: boolean;
  className?: string;
  index?: string;
  draw?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-fit max-w-full flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-amber uppercase">
        {index ? (
          <span className="tabular-nums text-amber/55">
            {index}
            <span className="mx-1.5 text-amber/35">/</span>
          </span>
        ) : null}
        <span
          aria-hidden
          className={cn(
            "inline-block h-px w-7",
            light ? "bg-amber/50" : "bg-amber/70",
            draw && "animate-hero-draw animate-hero-delay-1",
          )}
        />
        <span className="shrink-0">{children}</span>
      </p>
    </div>
  );
}
