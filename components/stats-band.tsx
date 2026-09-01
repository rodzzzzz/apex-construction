import { Reveal } from "@/components/reveal";

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
  note?: string;
};

export function StatsBand({
  stats,
  light = false,
}: {
  stats: readonly Stat[];
  light?: boolean;
}) {
  if (stats.length === 0) return null;

  return (
    <section
      className={
        light
          ? "relative border-y border-amber/25 bg-graphite text-chalk"
          : "relative border-y border-amber/25 bg-graphite text-chalk"
      }
    >
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <dl className="grid grid-cols-2 divide-x divide-chalk/10 border-x border-chalk/10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 border-b border-chalk/10 px-6 py-10 lg:border-b-0"
            >
              <Reveal delay={index * 90}>
                <dd className="font-mono text-4xl font-medium tracking-tight text-amber md:text-5xl">
                  {stat.value}
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
