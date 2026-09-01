import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  body: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * Process timeline. Horizontal grid on wide screens; on vertical mode a
 * connecting line draws downward (scaleY) with the steps, each marked by
 * a square plan-annotation marker.
 */
export function ProcessSteps({
  steps,
  kicker = "How we work",
  title,
  light = false,
  vertical = false,
  numbered = false,
  className,
}: {
  steps: readonly ProcessStep[];
  kicker?: string;
  title?: string;
  light?: boolean;
  vertical?: boolean;
  numbered?: boolean;
  className?: string;
}) {
  if (steps.length === 0) return null;

  return (
    <div className={className}>
      {title ? (
        <Reveal>
          <SectionKicker light={light}>{kicker}</SectionKicker>
          <h2
            className={cn(
              "mt-7 max-w-2xl text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl",
              light && "text-chalk",
            )}
          >
            {title}
          </h2>
        </Reveal>
      ) : null}
      <ol
        className={cn(
          "relative",
          vertical
            ? "mt-14 grid"
            : "mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {/* vertical timeline spine that draws downward — centered on the
            marker column (14px wide on mobile, 16px from sm+) */}
        {vertical ? (
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-0 w-3.5 sm:w-4"
          >
            <Reveal
              variant="draw-y"
              className="absolute inset-y-0 left-1/2 ml-[-0.5px] w-px bg-amber/45"
            />
          </span>
        ) : null}
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              vertical
                ? "relative grid grid-cols-[auto_1fr] gap-x-6 border-t pb-10 pt-8 first:border-t-0 first:pt-0 sm:gap-x-8"
                : "border-t border-amber/30 pt-7",
              light && !vertical && "border-chalk/15",
              light && vertical && "border-chalk/10",
            )}
          >
            {/* square plan marker sitting on the vertical spine */}
            {vertical ? (
              <span
                aria-hidden
                className="relative z-10 mt-1.5 size-3.5 shrink-0 bg-amber sm:size-4"
              />
            ) : null}
            <Reveal delay={Math.min(index, 4) * 90} variant="rise">
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
                  {numbered ? `Step ${pad(index + 1)}` : pad(index + 1)}
                </p>
                <h3
                  className={cn(
                    "font-serif text-2xl font-bold md:text-3xl",
                    light && "text-chalk",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-[1.8] text-muted-foreground md:text-base",
                    light && "text-chalk/65",
                  )}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
