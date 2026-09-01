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

export function ProcessSteps({
  steps,
  kicker = "How we work",
  title,
  light = false,
  vertical = false,
  className,
}: {
  steps: readonly ProcessStep[];
  kicker?: string;
  title?: string;
  light?: boolean;
  vertical?: boolean;
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
          vertical
            ? "mt-12 grid gap-0"
            : "mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              vertical
                ? "grid grid-cols-[auto_1fr] gap-6 border-t py-8"
                : "border-t border-amber/30 pt-7",
              light ? "border-chalk/15" : undefined,
            )}
          >
            <Reveal delay={Math.min(index, 4) * 80}>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
                  {pad(index + 1)}
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
