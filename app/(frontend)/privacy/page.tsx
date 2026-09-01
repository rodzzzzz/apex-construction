import PageHero from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata, SITE_EMAIL } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy",
  description:
    "How Apex Construction collects and uses information from consultation requests, quote briefs, and contact forms.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "What we keep",
    body: "Consultation, quote, project inquiry, and contact submissions are stored so our team can serve you, and are emailed to the Apex Construction office. We do not sell this information.",
  },
  {
    title: "Who may see it",
    body: "Apex team members access these records through a password-protected admin. Payment is not processed on this website.",
  },
  {
    title: "A change of details",
    body: `To update or remove a request, email ${SITE_EMAIL} with the name and project address you used.`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <PageHero
        index="08"
        label="Privacy"
        title="How we look after your details"
        description="We collect only what we need to schedule consultations, prepare quotes, and answer messages."
        image={PLACEHOLDER_IMAGES.site}
        imageAlt="An Apex Construction site office"
        compact
      />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionKicker>The company</SectionKicker>
          <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl">
            Collected with care
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-12">
          {SECTIONS.map((section, index) => (
            <li key={section.title}>
              <Reveal delay={index * 80}>
                <div className="border-t border-amber/35 pt-7">
                  <p className="font-mono text-[11px] tracking-[0.22em] text-amber uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl font-bold md:text-3xl">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-base leading-[1.8] text-muted-foreground">
                    {section.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
