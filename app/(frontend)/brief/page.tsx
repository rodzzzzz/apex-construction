import PageHero from "@/components/page-hero";
import BriefCheckout from "@/components/brief-checkout";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Request Quote",
  description:
    "Review your project brief and request an itemized construction quote from Apex Construction. We respond within one business day.",
  path: "/brief",
  noindex: true,
});

export default function BriefPage() {
  return (
    <main>
      <PageHero
        index="QB"
        label="Quote builder"
        title="Your brief, itemized"
        description="Review the services you staged, tell us about the site, and our estimating team comes back with firm numbers."
        image={PLACEHOLDER_IMAGES.blueprint}
        imageAlt="Plans and scopes staged for estimating"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        <BriefCheckout />
      </div>
    </main>
  );
}
