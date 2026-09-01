import PageHero from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { AnchorNav } from "@/components/anchor-nav";
import { QuoteInvite } from "@/components/quote-invite";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/json-ld";
import { getServiceCategories, getServices } from "@/lib/content";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";
import type { ServiceCategory } from "@/payload-types";

export const metadata = createMetadata({
  title:
    "Construction Services in Austin, TX — Commercial, Custom Homes & More",
  description:
    "Explore Apex Construction services — general contracting, design-build, custom homes, commercial construction, and remodeling across Austin and Central Texas. Request a quote online.",
  path: "/services",
  keywords: [
    "construction services Austin",
    "general contractor Austin TX",
    "design-build Austin",
    "commercial contractor Texas",
    "home remodeling Austin",
    "custom home builder cost",
  ],
});

export default async function ServicesPage() {
  const [categories, items] = await Promise.all([
    getServiceCategories(),
    getServices(),
  ]);
  const withServices = categories.filter((category) =>
    items.some((item) => categoryId(item.category) === category.id),
  );

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd data={servicesJsonLd({ categories, items })} />
      <PageHero
        label="Services"
        title="Every scope, priced straight"
        description="A transparent catalog of services with honest starting prices — add what you need to a brief and request a firm quote."
        image={PLACEHOLDER_IMAGES.site}
        imageAlt="An active construction site managed by Apex"
      />
      <div className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <AnchorNav
          label="Service categories"
          sections={withServices.map((category) => ({
            slug: category.slug,
            name: category.name,
          }))}
        />
        {categories.length === 0 ? (
          <p className="text-center font-serif text-xl text-muted-foreground">
            The catalog is being assembled. Please check back soon.
          </p>
        ) : (
          withServices.map((category, categoryIndex) => {
            const services = items.filter(
              (item) => categoryId(item.category) === category.id,
            );
            return (
              <section
                key={category.id}
                id={category.slug}
                className="scroll-mt-36"
              >
                <Reveal>
                  <SectionKicker
                    index={String(categoryIndex + 1).padStart(2, "0")}
                  >
                    {category.name}
                  </SectionKicker>
                  <h2 className="mt-7 text-balance font-serif text-3xl font-bold leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
                    {category.name}
                  </h2>
                  {category.description ? (
                    <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted-foreground">
                      {category.description}
                    </p>
                  ) : null}
                </Reveal>
                <div className="mt-10 grid auto-rows-fr items-stretch gap-10 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((service, index) => (
                    <Reveal
                      key={service.id}
                      delay={index * 70}
                      className="h-full min-w-0"
                    >
                      <ServiceCard item={service} linked />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
      <QuoteInvite
        title="Know what you need?"
        description="Add services to your brief and request a firm, itemized quote — we respond within one business day."
      />
    </main>
  );
}

function categoryId(category: ServiceCategory | number) {
  return typeof category === "object" ? category.id : category;
}
