import Image from "next/image";
import PageHero from "@/components/page-hero";
import { QuoteInvite } from "@/components/quote-invite";
import { StatsBand } from "@/components/stats-band";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getSiteSettings } from "@/lib/content";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";
import { SITE_LICENSE } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Apex Construction — 25 Years of Building in Austin, TX",
  description:
    "Apex Construction is a licensed general contractor in Austin, Texas with 25+ years of commercial, custom residential, and design-build work across Central Texas.",
  path: "/about",
  keywords: [
    "about Apex Construction",
    "Austin general contractor history",
    "licensed builder Austin TX",
    "construction company Central Texas",
  ],
});

const VALUES = [
  {
    title: "Say the number",
    body: "We would rather lose a job on an honest price than win it on a number we cannot hold. Estimates are itemized so you can check our math.",
  },
  {
    title: "The schedule is a promise",
    body: "A build is hundreds of small commitments. We track every one, and when something risks the date, you hear it before it happens.",
  },
  {
    title: "Safety is not a poster",
    body: "An EMR of 0.98 comes from daily briefings, stopped-work authority for every hand on site, and a superintendent who walks it every morning.",
  },
  {
    title: "Leave it better",
    body: "Better drawings, better buildings, better tradespeople. Every project should raise the standard for the next one.",
  },
] as const;

const AFFILIATIONS = [
  "AGC of Texas — General Contractor Member",
  "Austin Home Builders Association — Builder Member",
  "OSHA VPP Star Site Program Participant",
  "U.S. Green Building Council — Member",
  "BBB A+ Accredited Business",
] as const;

const STATS = [
  {
    value: "2001",
    label: "Founded in Austin",
    note: "Family-owned, Texas-built.",
  },
  {
    value: "65",
    label: "Team members",
    note: "Superintendents, PMs, carpenters.",
  },
  {
    value: "400",
    suffix: "+",
    label: "Projects delivered",
    note: "Across Central Texas.",
  },
  {
    value: "0.98",
    label: "EMR safety rating",
    note: "Below the 1.0 industry standard.",
  },
] as const;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        label="About"
        title="Builders, not brokers"
        description="A general contractor that runs its own sites, employs its own crews, and answers its own phone."
        image={PLACEHOLDER_IMAGES.site}
        imageAlt="Apex Construction crew on an active site"
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionKicker>The company</SectionKicker>
            <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              Twenty-five years on Texas ground
            </h2>
            <p className="mt-5 max-w-lg text-base leading-[1.8] text-muted-foreground sm:mt-7 md:text-lg">
              {settings.welcome}
            </p>
            <p className="mt-5 max-w-lg text-base leading-[1.8] text-muted-foreground">
              Apex started in 2001 with two pickup trucks and a framing crew.
              Today we run commercial, custom residential, and design-build
              projects across Central Texas with a team of sixty-five — most of
              whom have been with us for more than five years.
            </p>
            <p className="mt-6 text-lg text-foreground sm:mt-8">
              {SITE_LICENSE} · Licensed, bonded, and insured.
            </p>
          </Reveal>

          <Reveal delay={120} className="relative min-w-0">
            <div className="relative mx-auto aspect-4/5 w-full max-h-[min(32rem,80vh)] overflow-hidden lg:max-h-none">
              <Image
                src={PLACEHOLDER_IMAGES.project}
                alt="A finished Apex Construction project"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-3 border border-chalk/35 sm:inset-4" />
            </div>
            <p className="mt-4 text-center font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              The Cullen Drive yard, 2024
            </p>
          </Reveal>
        </div>
      </section>

      <StatsBand stats={STATS} />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionKicker align="center">What we stand on</SectionKicker>
          <h2 className="mt-7 text-center text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
            Four non-negotiables
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {VALUES.map((value, index) => (
            <li key={value.title}>
              <Reveal delay={Math.min(index, 3) * 80}>
                <div className="border-t border-amber/30 pt-7">
                  <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-bold md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-[1.8] text-muted-foreground">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-graphite py-16 text-chalk sm:py-20 md:py-28">
        <div
          aria-hidden
          className="blueprint-grid absolute inset-0 opacity-50"
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionKicker light>Licenses & affiliations</SectionKicker>
              <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
                Paperwork you can verify
              </h2>
              <p className="mt-5 max-w-md text-base leading-[1.8] text-chalk/70">
                Every license, bond, and insurance certificate is available on
                request — before you sign anything.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="grid gap-0 border-t border-chalk/15">
                {AFFILIATIONS.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-5 border-b border-chalk/15 py-5"
                  >
                    <span className="font-mono text-[11px] tracking-[0.22em] text-amber">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-chalk/85">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <QuoteInvite
        title="Put our numbers to the test"
        description="Bring us a project — finished drawings or a napkin sketch. We will tell you what it really takes to build it."
      />
    </main>
  );
}
