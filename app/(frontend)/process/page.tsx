import PageHero from "@/components/page-hero";
import Image from "next/image";
import { ProcessSteps } from "@/components/process-steps";
import { QuoteInvite } from "@/components/quote-invite";
import { StatsBand } from "@/components/stats-band";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Process — How Apex Construction Builds in Austin, TX",
  description:
    "From first site walk to final handover — see how Apex Construction runs pre-construction, design, permitting, and build phases with weekly reporting and fixed schedules.",
  path: "/process",
  keywords: [
    "construction process Austin",
    "design-build process Texas",
    "pre-construction Austin",
    "how to hire a general contractor",
  ],
});

const PHASES = [
  {
    title: "Pre-construction",
    body: "We walk the site with you, review feasibility, and frame a realistic budget range before any contract is signed. You leave the first meeting knowing whether your project pencils.",
  },
  {
    title: "Design & engineering",
    body: "Architects, structural engineers, and interior designers are coordinated under one roof. Drawings are value-engineered against the budget continuously — not at the end.",
  },
  {
    title: "Permitting",
    body: "We prepare, submit, and shepherd permits through the city and county so you never stand in a plan-review line. Typical residential entitlement runs 4–8 weeks.",
  },
  {
    title: "Construction",
    body: "A dedicated superintendent runs your site daily. Subcontractors are vetted, badged, and safety-briefed. Materials are staged to keep the schedule honest.",
  },
  {
    title: "Closeout & handover",
    body: "Punch list walked together, every item closed, warranties in writing, and a maintenance calendar for your first year of ownership.",
  },
  {
    title: "Post-build support",
    body: "A 12-month workmanship warranty, a 24-hour callback line, and a scheduled 11-month check-in before your warranty window closes.",
  },
] as const;

const EXPECT = [
  {
    title: "Weekly reports, every Friday",
    body: "Photos, schedule status, and budget position — in your inbox and in the project portal, every single week.",
  },
  {
    title: "One point of contact",
    body: "Your project manager owns the schedule, the budget, and the answer to every question. No chasing subcontractors.",
  },
  {
    title: "Change orders in writing",
    body: "Nothing changes without your signature on scope, price, and schedule impact. No verbal surprises.",
  },
] as const;

const FAQS = [
  {
    question: "How long does pre-construction take?",
    answer:
      "Typically two to four weeks for remodels and small commercial work; four to eight weeks for custom homes, depending on design readiness and survey requirements.",
  },
  {
    question: "Who handles permits?",
    answer:
      "We do. Apex prepares the permit set, submits it, and manages plan-review comments through the city or county having jurisdiction. Permit costs are carried as a pass-through allowance.",
  },
  {
    question: "How are payments structured?",
    answer:
      "Milestone-based draw schedules tied to completed, inspected work — never deposits for future work. Every draw is backed by an inspection record.",
  },
  {
    question: "What happens if the schedule slips?",
    answer:
      "You hear it from us first, with the recovery plan in the same conversation. Weekly reporting means schedule risk is visible before it becomes schedule slip.",
  },
] as const;

const STATS = [
  {
    value: "96",
    suffix: "%",
    label: "On-time completions",
    note: "Last five fiscal years.",
  },
  {
    value: "0",
    label: "Litigated change disputes",
    note: "In 25 years of business.",
  },
  {
    value: "52",
    label: "Weekly reports / year",
    note: "For every active project.",
  },
  {
    value: "12",
    suffix: "mo",
    label: "Workmanship warranty",
    note: "In writing, on every job.",
  },
] as const;

export default function ProcessPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        label="Process"
        title="How an Apex build runs"
        description="Fixed prices, weekly reporting, and a schedule you can hold us to — here is exactly how a project moves through our shop."
        image={PLACEHOLDER_IMAGES.blueprint}
        imageAlt="Blueprints and plans on a site table"
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionKicker>Phases of a project</SectionKicker>
          <h2 className="mt-7 max-w-2xl text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
            From first call to year-one check-in
          </h2>
        </Reveal>
        <ProcessSteps steps={PHASES} vertical className="mt-14" />
      </section>

      <StatsBand stats={STATS} />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionKicker>What to expect</SectionKicker>
              <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl">
                Communication, engineered
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-10">
              {EXPECT.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <li className="border-t border-amber/30 pt-7">
                    <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl font-bold md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-[1.8] text-muted-foreground">
                      {item.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative min-w-0">
            <div className="relative sticky top-28 aspect-4/5 overflow-hidden">
              <Image
                src={PLACEHOLDER_IMAGES.service}
                alt="Superintendent reviewing plans on an active site"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-3 border border-chalk/35" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionKicker align="center">Good to know</SectionKicker>
          <h2 className="mt-7 text-center text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
            Questions we are often asked
          </h2>
        </Reveal>
        <dl className="mt-14 grid gap-12">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={Math.min(index, 3) * 80}>
              <div className="border-t border-amber/35 pt-7">
                <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <dt className="mt-4 font-serif text-2xl font-bold md:text-3xl">
                  {faq.question}
                </dt>
                <dd className="mt-3 text-base leading-[1.8] text-muted-foreground">
                  {faq.answer}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <QuoteInvite />
    </main>
  );
}
