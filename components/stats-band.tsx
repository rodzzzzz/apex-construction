"use client";

import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  note?: string;
};

/**
 * Stats band with count-up numbers and drafting-scale ruler tick separators.
 */
export function StatsBand({
  stats,
  className,
}: {
  stats: readonly Stat[];
  className?: string;
}) {
  if (stats.length === 0) return null;

  return (
    <section
      className={cn(
        "relative border-y border-amber/25 bg-graphite text-chalk",
        className,
      )}
    >
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "relative flex flex-col gap-2 px-5 py-9 sm:px-8 md:py-10 lg:py-12",
                // 2-col mobile: right column gets left border, second row gets top border
                index % 2 === 1 && "border-l border-chalk/10",
                index >= 2 && "border-t border-chalk/10 lg:border-t-0",
                // 4-col desktop: every column except the first gets left border
                index > 0 && "lg:border-l lg:border-chalk/10",
              )}
            >
              {/* ruler ticks along the top edge */}
              <span
                aria-hidden
                className="absolute inset-x-5 top-0 flex h-2 items-start justify-between sm:inset-x-8"
              >
                {Array.from({ length: 11 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-px bg-chalk/20",
                      i % 5 === 0 ? "h-2" : "h-1",
                    )}
                  />
                ))}
              </span>
              <Reveal delay={index * 90}>
                <dd className="font-mono text-3xl font-medium tracking-tight text-amber sm:text-4xl md:text-5xl">
                  <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
                  {stat.suffix ? (
                    <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                  ) : null}
                </dd>
                <dt className="mt-3 font-mono text-[10px] tracking-[0.2em] text-chalk/70 uppercase sm:text-[11px]">
                  {stat.label}
                </dt>
                {stat.note ? (
                  <p className="mt-1 text-xs leading-relaxed text-chalk/45">
                    {stat.note}
                  </p>
                ) : null}
              </Reveal>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
