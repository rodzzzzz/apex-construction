import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Closing CTA band — left-aligned asymmetric drafting-sheet layout with
 * corner brackets on the statement block.
 */
export function QuoteInvite({
  title = "Let's talk about your build",
  description = "Tell us what you are planning and we will come back within one business day with straight answers and next steps.",
  href = "/quote",
  cta = "Request a consultation",
}: {
  title?: string;
  description?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-graphite text-chalk">
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <SectionKicker light>Get started</SectionKicker>
            <h2 className="mt-7 max-w-xl text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-6xl">
              {title}
            </h2>
            <div className="relative mt-8 max-w-lg border-l-2 border-amber pl-6">
              <p className="text-base leading-[1.8] text-chalk/75 md:text-lg">
                {description}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href={href}
              className={cn(
                buttonVariants({ variant: "amber", size: "lg" }),
                "group w-full text-xs tracking-[0.22em] uppercase sm:w-auto",
              )}
            >
              {cta}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
