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
                "relative flex flex-col gap-2 px-6 py-10 md:px-8 lg:py-12",
                index % 2 === 1 && "border-l border-chalk/10",
                index >= 2 && "border-t border-chalk/10 lg:border-t-0",
                index === 1 && "lg:border-l",
                index === 3 && "lg:border-l",
              )}
            >
              {/* ruler ticks along the top edge */}
              <span
                aria-hidden
                className="absolute inset-x-6 top-0 flex h-2 items-start justify-between md:inset-x-8"
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
                <dd className="font-mono text-4xl font-medium tracking-tight text-amber md:text-5xl">
                  <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
                  {stat.suffix ? (
                    <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                  ) : null}
                </dd>
                <dt className="mt-3 font-mono text-[11px] tracking-[0.2em] text-chalk/70 uppercase">
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
