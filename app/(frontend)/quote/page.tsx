import PageHero from "@/components/page-hero";
import ConsultationForm from "@/components/consultation-form";
import { FormPanel } from "@/components/form-panel";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionKicker } from "@/components/ornament";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/json-ld";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Get a Quote — Free Construction Consultation in Austin, TX",
  description:
    "Request a free construction consultation with Apex Construction. Site walks, budget framing, and honest numbers for commercial and residential projects in Austin and Central Texas.",
  path: "/quote",
  keywords: [
    "construction quote Austin",
    "free contractor consultation Austin TX",
    "construction estimate Texas",
    "talk to a general contractor",
  ],
});

const NOTES = [
  {
    title: "Consultation hours",
    body: "Weekdays 7:00 AM to 5:00 PM, Saturdays by appointment. Site walks are typically scheduled within one week.",
  },
  {
    title: "A request, not a hold",
    body: "This is not an instant confirmation. You will hear from us within one business day to confirm the slot.",
  },
  {
    title: "Full service briefs",
    body: "Already know what you need? Add services to a brief from the services catalog and request an itemized quote.",
  },
] as const;

const FAQS = [
  {
    question: "How do I get a quote from Apex Construction?",
    answer:
      "Request a consultation on this page with your preferred date and project type. We confirm by email, walk the site, and follow with an itemized estimate — usually within one business day of the walk.",
  },
  {
    question: "What are your office hours?",
    answer:
      "Monday through Friday, 7:00 AM to 5:00 PM, and Saturdays 8:00 AM to 12:00 PM by appointment. Active project sites run their own hours.",
  },
  {
    question: "Is the consultation really free?",
    answer:
      "Yes — the site walk and budget framing are free for any serious project. Custom home programs move to a paid pre-construction agreement before design work begins.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Austin and Central Texas — Travis, Williamson, Hays, and Bastrop counties. Commercial work is accepted statewide by arrangement.",
  },
] as const;

export default function QuotePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Quote", path: "/quote" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        index="06"
        label="Get a quote"
        title="Start with a straight answer"
        description="Book a consultation and we will walk the site, frame the budget, and tell you what your project really takes."
        image={PLACEHOLDER_IMAGES.hero}
        imageAlt="An Apex Construction site prepared for a walkthrough"
      />
      <section className="grid min-w-0 lg:grid-cols-2">
        <div className="relative overflow-hidden flex min-w-0 flex-col justify-center bg-graphite px-5 py-16 text-chalk sm:px-8 sm:py-20 md:px-16 lg:px-20 lg:py-24">
          <div
            aria-hidden
            className="blueprint-grid absolute inset-0 opacity-50"
          />
          <Reveal>
            <SectionKicker light index="01">
              How it works
            </SectionKicker>
            <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              What happens after you write
            </h2>
            <ol className="mt-10 grid gap-8">
              {NOTES.map((note, index) => (
                <li
                  key={note.title}
                  className="grid grid-cols-[auto_1fr] gap-5"
                >
                  <span className="font-mono text-2xl text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-serif text-xl font-bold">{note.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-chalk/65">
                      {note.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div className="bg-secondary px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24">
          <Reveal delay={120}>
            <FormPanel
              kicker="Request"
              title="Book a consultation"
              description="We will confirm by email within one business day."
            >
              <ConsultationForm />
            </FormPanel>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
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
    </main>
  );
}
