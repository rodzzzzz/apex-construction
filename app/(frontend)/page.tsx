import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { Ornament, SectionKicker } from "@/components/ornament";
import { QuoteInvite } from "@/components/quote-invite";
import { StatsBand } from "@/components/stats-band";
import { ProcessSteps } from "@/components/process-steps";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/json-ld";
import {
  getCustomHomes,
  getFeaturedServices,
  getProjects,
  getSiteSettings,
} from "@/lib/content";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { cn, mediaUrl } from "@/lib/utils";
import type { Media } from "@/payload-types";

const STATS = [
  {
    value: "25",
    suffix: "+",
    label: "Years on the ground",
    note: "Serving Central Texas since 2001.",
  },
  {
    value: "400",
    suffix: "+",
    label: "Projects delivered",
    note: "Commercial, custom residential, civil.",
  },
  {
    value: "2.1",
    suffix: "M",
    label: "Square feet built",
    note: "From tenant finish-outs to campuses.",
  },
  {
    value: "0.98",
    label: "EMR safety rating",
    note: "Far below the industry average of 1.0.",
  },
] as const;

const PROCESS = [
  {
    title: "Pre-construction",
    body: "Site walk, budget framing, and a detailed scope before any contract is signed.",
  },
  {
    title: "Design & permitting",
    body: "Drawings, engineering, and permits handled in-house — one accountable team.",
  },
  {
    title: "Build",
    body: "Dedicated superintendent, weekly reports, and a schedule that holds.",
  },
  {
    title: "Handover",
    body: "Punch lists closed, warranties in writing, and a walkthrough we both sign.",
  },
] as const;

const PROJECTS_TEASER = [
  {
    caption: "The Ridgeline Residence",
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
  },
  {
    caption: "South Congress retail build-out",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-5",
  },
] as const;

const FAQS = [
  {
    question: "Where does Apex Construction work?",
    answer:
      "We are based in Austin, Texas and build across Central Texas — Travis, Williamson, Hays, and Bastrop counties. Commercial projects are accepted statewide by arrangement.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Apex Construction is a fully licensed general contractor (TX GC Lic. #42-8137), bonded, and carries general liability and workers' compensation coverage on every project.",
  },
  {
    question: "Do you offer design-build or just construction?",
    answer:
      "Both. About half of our work is design-build, where we carry a project from first sketch through handover. We also build from architect-ready plans for bid-build projects.",
  },
  {
    question: "How do I get a quote for my project?",
    answer:
      "Request a consultation through our quote page, or add services to a brief from the services catalog. We respond within one business day and schedule a site walk before any numbers are finalized.",
  },
] as const;

export default async function HomePage() {
  const [settings, services, customHomes, projects] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(),
    getCustomHomes(),
    getProjects(),
  ]);
  const hero =
    mediaUrl(
      settings.heroImage as Media | number | null,
      settings.heroImageUrl,
    ) || PLACEHOLDER_IMAGES.hero;
  const homesImage =
    mediaUrl(
      customHomes.photo as Media | number | null,
      customHomes.imageUrl,
    ) || PLACEHOLDER_IMAGES.customHome;
  const recentProjects = projects.slice(0, 2).map((project) => ({
    caption: project.caption,
    src:
      mediaUrl(project.photo as Media | number | null, project.imageUrl) ||
      PLACEHOLDER_IMAGES.project,
  }));

  return (
    <main className="overflow-x-clip">
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="relative min-h-svh overflow-hidden">
        <Image
          src={hero}
          alt="An Apex Construction site at dusk"
          fill
          priority
          className="animate-ken-burns object-cover"
          sizes="100vw"
        />
        <HeroAtmosphere />

        <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-6 py-28 text-center sm:px-8 sm:py-36">
          <div className="animate-hero flex w-fit max-w-full flex-col items-center">
            <p className="font-mono text-[10px] tracking-[0.36em] text-amber uppercase sm:text-[11px] sm:tracking-[0.42em]">
              Austin, TX · General Contractor
            </p>
            <Ornament light className="mt-5 sm:mt-7" />
          </div>
          <h1 className="animate-hero animate-hero-delay-2 mt-6 max-w-[20ch] text-balance font-serif text-5xl font-bold leading-[1.05] text-chalk sm:mt-8 md:text-7xl lg:text-[5.25rem]">
            {settings.tagline}
          </h1>
          <p className="animate-hero animate-hero-delay-3 mt-5 max-w-xl text-lg leading-relaxed text-chalk/80 sm:mt-8 sm:text-xl md:text-2xl">
            Commercial, custom residential, and design-build construction across
            Central Texas.
          </p>
          <div className="animate-hero animate-hero-delay-4 mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-12 sm:max-w-none sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link
              href="/quote"
              className={cn(
                buttonVariants({ variant: "amber", size: "lg" }),
                "text-xs tracking-[0.22em] uppercase",
              )}
            >
              Get a quote
            </Link>
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-chalk/35 text-xs tracking-[0.22em] text-chalk uppercase hover:border-amber hover:bg-transparent hover:text-chalk",
              )}
            >
              Explore services
            </Link>
          </div>
        </div>

        <p className="animate-hero animate-hero-delay-4 pointer-events-none absolute inset-x-0 bottom-5 text-center font-mono text-[10px] tracking-[0.38em] text-chalk/45 uppercase sm:bottom-8">
          Scroll
        </p>
      </section>

      <StatsBand stats={STATS} />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionKicker>The company</SectionKicker>
            <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              Built on precision, schedules, and straight answers
            </h2>
            <p className="mt-5 max-w-lg text-base leading-[1.8] text-muted-foreground sm:mt-7 md:text-lg">
              {settings.welcome}
            </p>
            <p className="mt-6 text-lg text-foreground sm:mt-8">
              One team, one contract, one accountable schedule — from dirt to
              keys.
            </p>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 text-xs tracking-[0.2em] uppercase sm:mt-10",
              )}
            >
              About Apex
            </Link>
          </Reveal>

          <Reveal delay={120} className="relative min-w-0">
            <div className="relative mx-auto aspect-4/5 w-full max-h-[min(32rem,80vh)] overflow-hidden lg:max-h-none">
              <Image
                src={PLACEHOLDER_IMAGES.site}
                alt="An active Apex Construction site"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-3 border border-chalk/35 sm:inset-4" />
            </div>
            <p className="mt-4 text-center font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              Site 47 — Cullen Drive, Austin
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionKicker align="center">Core services</SectionKicker>
            <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              What we build
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6">
              A short list from the catalog — commercial, custom residential,
              and everything between.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid auto-rows-fr items-stretch gap-10 sm:mt-16 sm:gap-8 md:grid-cols-2">
          {services.length > 0 ? (
            services.map((service, index) => (
              <Reveal
                key={service.id}
                delay={index * 80}
                className="h-full min-w-0"
              >
                <div className="flex h-full flex-col">
                  <p className="mb-3 font-mono text-sm tracking-[0.2em] text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <ServiceCard item={service} editorial showBrief={false} />
                </div>
              </Reveal>
            ))
          ) : (
            <p className="text-center text-muted-foreground md:col-span-2">
              Services will appear here once published in the admin.
            </p>
          )}
        </div>
        <Reveal>
          <div className="mt-10 flex justify-center sm:mt-14">
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-xs tracking-[0.2em] uppercase",
              )}
            >
              The full catalog
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden border-y border-amber/25 bg-graphite py-16 text-chalk sm:py-20 md:py-28">
        <div
          aria-hidden
          className="blueprint-grid absolute inset-0 opacity-50"
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <ProcessSteps
            steps={PROCESS}
            kicker="The Apex method"
            title="A process built to remove surprises"
            light
          />
          <Reveal delay={200}>
            <Link
              href="/process"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-10 border-chalk/40 text-xs tracking-[0.2em] text-chalk uppercase hover:border-amber hover:text-amber",
              )}
            >
              See the full process
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionKicker>Recent work</SectionKicker>
              <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
                On the ground and finished
              </h2>
            </div>
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-fit text-xs tracking-[0.2em] uppercase",
              )}
            >
              All projects
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-12 md:gap-5">
          {(recentProjects.length > 0
            ? recentProjects.map((p) => ({
                caption: p.caption,
                src: p.src,
                span: "md:col-span-6",
              }))
            : PROJECTS_TEASER.map((p) => ({ ...p }))
          ).map((project, index) => (
            <Reveal
              key={project.caption}
              delay={index * 90}
              className={cn("relative", project.span)}
            >
              <div className="relative aspect-4/5 overflow-hidden md:aspect-[4/3]">
                <Image
                  src={project.src}
                  alt={project.caption}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-3 border border-chalk/0 transition-colors duration-500 hover:border-chalk/40" />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-graphite/85 via-graphite/30 to-transparent p-5 pt-16 md:p-6">
                  <span className="mb-3 block h-px w-8 bg-amber" />
                  <p className="font-serif text-lg font-bold text-chalk md:text-xl">
                    {project.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid min-w-0 lg:grid-cols-2">
        <div className="relative min-h-[70vw] overflow-hidden sm:min-h-130 lg:min-h-160">
          <Image
            src={homesImage}
            alt={customHomes.title}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-graphite/50 to-transparent" />
          <div className="pointer-events-none absolute inset-4 border border-chalk/25 sm:inset-6" />
          <p className="absolute bottom-6 left-5 font-mono text-[11px] tracking-[0.28em] text-chalk uppercase sm:bottom-10 sm:left-8">
            Custom homes
          </p>
        </div>
        <div className="flex min-w-0 flex-col justify-center bg-secondary px-5 py-16 sm:px-8 sm:py-20 md:px-16 lg:px-20 lg:py-24">
          <Reveal>
            <SectionKicker>Custom homes</SectionKicker>
            <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              {customHomes.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-[1.8] text-muted-foreground sm:mt-7">
              {customHomes.intro}
            </p>
            <p className="mt-6 font-mono text-lg tracking-[0.04em] text-amber sm:mt-8 sm:text-2xl">
              {customHomes.capacity}
            </p>
            <Link
              href="/custom-homes"
              className={cn(
                buttonVariants({ variant: "amber" }),
                "mt-8 w-fit text-xs tracking-[0.2em] uppercase sm:mt-10",
              )}
            >
              Explore the program
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20 md:px-8 md:py-28 ">
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
        </div>
      </section>

      <QuoteInvite />
    </main>
  );
}
