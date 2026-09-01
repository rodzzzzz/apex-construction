import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:py-24 md:px-8 md:py-32">
        <Reveal>
          <SectionKicker align="center" light>
            Get started
          </SectionKicker>
          <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-chalk/75 sm:mt-7 sm:text-xl">
            {description}
          </p>
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "amber", size: "lg" }),
              "mt-8 text-xs tracking-[0.22em] uppercase sm:mt-10",
            )}
          >
            {cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
