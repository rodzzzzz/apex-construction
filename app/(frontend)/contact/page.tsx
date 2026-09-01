import PageHero from "@/components/page-hero";
import ContactForm from "@/components/contact-form";
import { FormPanel } from "@/components/form-panel";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { QuoteInvite } from "@/components/quote-invite";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getSiteSettings } from "@/lib/content";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { SITE_LICENSE, SITE_REGION, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact — Austin, TX General Contractor Office",
  description:
    "Contact Apex Construction in Austin, Texas — phone, email, office hours, and location map. Answers within one business day for projects and questions.",
  path: "/contact",
  keywords: [
    "Apex Construction contact",
    "general contractor Austin phone",
    "construction company Austin address",
    "contractor Central Texas contact",
  ],
});

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const hours = (settings.hours ?? []).filter(
    (row): row is { label: string; value: string } =>
      Boolean(row?.label && row.value),
  );

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        index="07"
        label="Contact"
        title="Talk to a builder today"
        description="Questions about a project, a bid, or working with us — write, call, or visit the office."
        image={PLACEHOLDER_IMAGES.blueprint}
        imageAlt="The Apex Construction office"
      />
      <section className="grid min-w-0 lg:grid-cols-2">
        <div className="relative overflow-hidden flex min-w-0 flex-col justify-center bg-graphite px-5 py-16 text-chalk sm:px-8 sm:py-20 md:px-16 lg:px-20 lg:py-24">
          <div
            aria-hidden
            className="blueprint-grid absolute inset-0 opacity-50"
          />
          <Reveal>
            <SectionKicker light index="01">
              Visit
            </SectionKicker>
            <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              Austin, Texas
            </h2>
            <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-chalk/75">
              {settings.address}
            </p>
            <p className="mt-8">
              <a
                href={`tel:${settings.phone}`}
                className="font-mono text-[11px] tracking-[0.2em] text-amber uppercase transition-colors duration-500 hover:text-chalk"
              >
                {settings.phone}
              </a>
            </p>
            <p className="mt-2">
              <a
                href={`mailto:${settings.email}`}
                className="font-mono text-[11px] tracking-[0.2em] text-chalk/70 uppercase transition-colors duration-500 hover:text-amber"
              >
                {settings.email}
              </a>
            </p>
            {hours.length > 0 ? (
              <ul className="mt-12 grid gap-6 border-t border-chalk/10 pt-10">
                {hours.map((row) => (
                  <li key={row.label} className="flex min-w-0 flex-col gap-1">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-amber uppercase">
                      {row.label}
                    </span>
                    <span className="text-sm text-pretty text-chalk/70">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            <dl className="mt-12 grid gap-4 border-t border-chalk/10 pt-10 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] tracking-[0.2em] text-amber uppercase">
                  License
                </dt>
                <dd className="mt-1.5 text-sm text-chalk/70">{SITE_LICENSE}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.2em] text-amber uppercase">
                  Service area
                </dt>
                <dd className="mt-1.5 text-sm text-chalk/70">{SITE_REGION}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.2em] text-amber uppercase">
                  Consultations
                </dt>
                <dd className="mt-1.5 text-sm text-chalk/70">
                  Free, by appointment
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.2em] text-amber uppercase">
                  Response time
                </dt>
                <dd className="mt-1.5 text-sm text-chalk/70">
                  Within one business day
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="bg-secondary px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24">
          <Reveal delay={120}>
            <FormPanel
              kicker="Write to us"
              title="Send a message"
              description="We reply within one business day — usually faster."
            >
              <ContactForm />
            </FormPanel>
          </Reveal>
        </div>
      </section>
      {settings.mapEmbedUrl ? (
        <div className="h-[420px] w-full">
          <iframe
            title="Apex Construction location map"
            src={settings.mapEmbedUrl}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      ) : null}
      <QuoteInvite />
    </main>
  );
}
