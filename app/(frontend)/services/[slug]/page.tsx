import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { AddToBriefButton } from "@/components/add-to-brief-button";
import { SectionKicker } from "@/components/ornament";
import { QuoteInvite } from "@/components/quote-invite";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getServiceBySlug, getServices } from "@/lib/content";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { cn, formatUsd, mediaUrl } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";
import type { Media } from "@/payload-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return createMetadata({
      title: "Service not found",
      description: "This service is not in the catalog.",
      path: `/services/${slug}`,
      noindex: true,
    });
  }
  return createMetadata({
    title: `${service.name} in Austin, TX`,
    description: `${service.description} Starting from ${formatUsd(
      service.startingAt,
    )} — Apex Construction, a licensed general contractor in Austin, Texas.`,
    path: `/services/${service.slug}`,
    keywords: [
      `${service.name.toLowerCase()} Austin`,
      "general contractor Austin TX",
      "construction quote Austin",
    ],
  });
}

const TAG_LABELS: Record<string, string> = {
  licensed: "Licensed",
  insured: "Insured",
  permits: "Permit handling",
  warranty: "Warranty",
  sustainable: "Sustainable",
  "fast-track": "Fast-track",
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const all = await getServices();
  const related = all
    .filter((item) => item.id !== service.id && item.acceptingProjects)
    .slice(0, 3);

  const photo =
    mediaUrl(service.photo as Media | number | null, service.imageUrl) ||
    PLACEHOLDER_IMAGES.service;
  const tags = service.tags ?? [];
  const categoryName =
    typeof service.category === "object" && service.category
      ? service.category.name
      : null;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />

      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <Image
          src={photo}
          alt={service.name}
          fill
          priority
          className="animate-ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-graphite via-graphite/55 to-graphite/25" />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-graphite/75 via-graphite/30 to-transparent md:from-graphite/80 md:via-graphite/20"
        />
        <div
          aria-hidden
          className="blueprint-grid absolute inset-0 opacity-50"
        />
        <div className="pointer-events-none absolute inset-2 top-16 border border-amber/30 sm:inset-5 sm:top-16 md:inset-8 md:top-20" />

        <div className="relative mx-auto w-full max-w-7xl px-7 pb-16 pt-32 sm:px-10 md:px-14 md:pb-24">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-chalk/70 uppercase transition-colors duration-300 hover:text-chalk"
          >
            <ArrowLeft className="size-3.5" />
            All services
          </Link>
          <div className="mt-6 flex flex-col items-start gap-4">
            {categoryName ? (
              <p className="animate-hero font-mono text-[11px] tracking-[0.32em] text-amber uppercase">
                {categoryName}
              </p>
            ) : null}
            <h1 className="line-rise-mask max-w-3xl">
              <span className="animate-hero-rise animate-hero-delay-1 block text-balance font-serif text-4xl font-bold leading-[1.02] text-chalk md:text-6xl lg:text-7xl">
                {service.name}
              </span>
            </h1>
            <div
              aria-hidden
              className="animate-hero-draw animate-hero-delay-2 mt-2 h-px w-24 bg-amber sm:w-32"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-20 md:px-8 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            <SectionKicker index="01">Scope of work</SectionKicker>
            <p className="mt-7 max-w-2xl text-xl leading-[1.7] text-foreground">
              {service.description}
            </p>
            {tags.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-amber/40 px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-amber uppercase"
                  >
                    {TAG_LABELS[tag] ?? tag}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-10 border-t border-amber/30 pt-8">
              <p className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                What a firm quote includes
              </p>
              <ul className="mt-5 grid gap-3 text-base leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 bg-amber" />A
                  documented site walk and existing-conditions review
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 bg-amber" />
                  Itemized scope, allowances, and exclusions — in writing
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 bg-amber" />A
                  baseline schedule with milestones and payment triggers
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative border border-amber/45 bg-card p-7 md:p-9">
              <span
                aria-hidden
                className="absolute -top-px -left-px size-5 border-t-2 border-l-2 border-amber"
              />
              <span
                aria-hidden
                className="absolute -right-px -bottom-px size-5 border-r-2 border-b-2 border-amber"
              />
              <p className="font-mono text-[11px] tracking-[0.24em] text-amber uppercase">
                Starting at
              </p>
              <p className="mt-3 font-mono text-4xl font-medium tracking-tight text-foreground">
                {formatUsd(service.startingAt)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Honest starting point — final pricing is set after a site walk
                and scope review.
              </p>
              <div className="mt-7 grid gap-2">
                {service.quoteable && service.acceptingProjects ? (
                  <AddToBriefButton
                    id={service.id}
                    name={service.name}
                    startingAt={service.startingAt}
                  />
                ) : (
                  <p className="border-t border-border pt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    Currently booked out — ask about lead times
                  </p>
                )}
                <Link
                  href="/quote"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "text-xs tracking-[0.2em] uppercase",
                  )}
                >
                  Book a consultation
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionKicker index="02">Related work</SectionKicker>
                <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:text-4xl">
                  Pairs well with
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
              >
                Full catalog
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid items-stretch gap-10 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal
                key={item.id}
                delay={index * 70}
                className="h-full min-w-0"
              >
                <ServiceCard item={item} linked />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <QuoteInvite />
    </main>
  );
}
