import Image from "next/image";
import ProjectInquiryForm from "@/components/project-inquiry-form";
import { FormPanel } from "@/components/form-panel";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { Ornament, SectionKicker } from "@/components/ornament";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { StatsBand } from "@/components/stats-band";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import { getCustomHomes } from "@/lib/content";
import { cn, mediaUrl } from "@/lib/utils";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";
import { buttonVariants } from "@/components/ui/button";
import type { Media } from "@/payload-types";

export const metadata = createMetadata({
  title: "Custom Homes in Austin, TX — Design-Build Home Builder",
  description:
    "Apex Custom Homes builds design-build homes across Central Texas — fixed-price contracts, weekly reporting, and 120+ delivered homes. Start your project inquiry.",
  path: "/custom-homes",
  keywords: [
    "custom home builder Austin",
    "design-build homes Texas",
    "build a custom home Austin TX",
    "hill country custom home builder",
  ],
});

const INQUIRY_STEPS = [
  {
    title: "Share the vision",
    body: "Timeline, approximate square footage, and the part of town you love — that is enough to begin.",
  },
  {
    title: "A reply within a day",
    body: "We confirm availability, send recent comparables, and propose a budget framework.",
  },
  {
    title: "The lot & the number",
    body: "A site evaluation and a pre-construction agreement lock the program before design spending begins.",
  },
] as const;

const FAQS = [
  {
    question: "How much does a custom home cost to build in Austin?",
    answer:
      "Our custom homes typically start around $375 per square foot for simpler programs and run upward from there for hillside, green-built, or high-finish homes. A pre-construction agreement produces a real number for your lot and program.",
  },
  {
    question: "Do you build on my lot or only on yours?",
    answer:
      "Both. Most clients bring their own lot, and our site evaluation covers slope, access, utilities, and tree coverage before you commit to design spending.",
  },
  {
    question: "How long does a custom home take?",
    answer:
      "Design and permitting typically run four to seven months; construction runs ten to fourteen months for most programs. Your baseline schedule is fixed before groundbreaking.",
  },
  {
    question: "Is a fixed-price contract really fixed?",
    answer:
      "Yes. Allowances are itemized to the fixture level, and the only way the price changes is a change order you sign. That is the whole point of the program.",
  },
] as const;

const STATS = [
  {
    value: 120,
    suffix: "+",
    label: "Custom homes delivered",
    note: "Since 2004.",
  },
  {
    value: 14,
    suffix: "mo",
    label: "Average build time",
    note: "From groundbreaking to keys.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Fixed-price contracts",
    note: "No cost-plus drift.",
  },
  {
    value: 12,
    suffix: "mo",
    label: "Workmanship warranty",
    note: "Plus an 11-month check-in.",
  },
] as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default async function CustomHomesPage() {
  const homes = await getCustomHomes();
  const image =
    mediaUrl(homes.photo as Media | number | null, homes.imageUrl) ||
    PLACEHOLDER_IMAGES.customHome;
  const features = (homes.facilities ?? []).filter(
    (
      feature,
    ): feature is { title: string; description: string; id?: string | null } =>
      Boolean(feature),
  );

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Custom Homes", path: "/custom-homes" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <section className="relative min-h-svh overflow-hidden">
        <Image
          src={image}
          alt={homes.title}
          fill
          priority
          className="animate-ken-burns object-cover"
          sizes="100vw"
        />
        <HeroAtmosphere />
        <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="animate-hero flex w-fit max-w-full flex-col">
            <p className="font-mono text-[10px] tracking-[0.36em] text-amber uppercase sm:text-[11px] sm:tracking-[0.42em]">
              <span className="tabular-nums text-amber/55">
                02
                <span className="mx-1.5 text-amber/35">/</span>
              </span>
              Custom homes
            </p>
            <Ornament light className="mt-5 sm:mt-7" />
          </div>
          <h1 className="line-rise-mask mt-6 max-w-3xl">
            <span className="animate-hero-rise animate-hero-delay-1 block text-balance font-serif text-5xl font-bold leading-[1.05] text-chalk md:text-7xl lg:text-[5.25rem]">
              {homes.title}
            </span>
          </h1>
          <p className="animate-hero animate-hero-delay-3 mt-5 max-w-xl text-lg leading-relaxed text-chalk/80 sm:mt-8 sm:text-xl">
            {homes.intro}
          </p>
          <div className="animate-hero animate-hero-delay-4 mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md font-mono text-[11px] tracking-[0.16em] text-chalk/70 uppercase">
              {homes.capacity}
            </p>
            <a
              href="#inquire"
              className={cn(
                buttonVariants({ variant: "amber", size: "lg" }),
                "w-fit",
              )}
            >
              Start your project
            </a>
          </div>
        </div>
      </section>

      <StatsBand stats={STATS} />

      {features.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionKicker index="01">The program</SectionKicker>
            <h2 className="mt-7 max-w-2xl text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              Built around one promise
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <li key={feature.title}>
                <Reveal delay={Math.min(index, 5) * 80}>
                  <div className="border-t border-amber/35 pt-7">
                    <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
                      {pad(index + 1)}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl font-bold md:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-3xl px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <SectionKicker align="center">Good to know</SectionKicker>
          <h2 className="mt-7 text-center text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
            Questions we are often asked
          </h2>
        </Reveal>
        <div className="mt-14">
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      <section id="inquire" className="scroll-mt-24 bg-secondary">
        <div className="mx-auto grid max-w-7xl md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="relative overflow-hidden flex flex-col justify-center bg-graphite px-5 py-16 text-chalk md:px-10 md:py-20 lg:px-16 lg:py-24">
            <div
              aria-hidden
              className="blueprint-grid absolute inset-0 opacity-50"
            />
            <Reveal>
              <SectionKicker light index="02">
                Inquire
              </SectionKicker>
              <h2 className="mt-7 font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
                Tell us about your land and your plans
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-chalk/75">
                This is a conversation, not a commitment. Nothing is booked
                until you have a real number for your project.
              </p>
              {homes.bookingNotes ? (
                <p className="mt-6 max-w-md border-l border-amber/50 pl-5 text-sm leading-relaxed text-chalk/70">
                  {homes.bookingNotes}
                </p>
              ) : null}
              <ol className="mt-12 grid gap-8">
                {INQUIRY_STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[auto_1fr] gap-5"
                  >
                    <span className="font-mono text-2xl text-amber">
                      {pad(index + 1)}
                    </span>
                    <div>
                      <p className="font-serif text-xl font-bold">
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-chalk/65">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <div className="px-5 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
            <Reveal delay={120}>
              <FormPanel
                kicker="Inquiry"
                title="Project basics"
                description="We will write to you within one business day with next steps."
              >
                <ProjectInquiryForm />
              </FormPanel>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
