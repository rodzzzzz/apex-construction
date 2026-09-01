export function HeroAtmosphere({
  framed = true,
  tone = "home",
}: {
  framed?: boolean;
  tone?: "home" | "deep";
}) {
  return (
    <>
      <div
        className={
          tone === "deep"
            ? "absolute inset-0 bg-graphite/45"
            : "absolute inset-0 bg-graphite/35"
        }
      />
      <div className="absolute inset-0 bg-linear-to-t from-graphite via-graphite/55 to-graphite/15" />
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,oklch(0.2_0.008_250/0.5)_100%)]" />
      {framed ? (
        <div className="pointer-events-none absolute inset-2 top-16 border border-amber/30 sm:inset-5 sm:top-16 md:inset-8 md:top-20" />
      ) : null}
    </>
  );
}
