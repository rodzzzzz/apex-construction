import PageHero from "@/components/page-hero";
import { GalleryGrid } from "@/components/gallery-grid";
import { AnchorNav } from "@/components/anchor-nav";
import { QuoteInvite } from "@/components/quote-invite";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getProjects } from "@/lib/content";
import { mediaUrl } from "@/lib/utils";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";
import type { Media } from "@/payload-types";

export const metadata = createMetadata({
  title: "Projects — Commercial, Residential & Industrial Work in Austin",
  description:
    "See Apex Construction projects across Central Texas — custom homes, commercial build-outs, and industrial work delivered by a licensed Austin general contractor.",
  path: "/projects",
  keywords: [
    "construction portfolio Austin",
    "commercial projects Central Texas",
    "custom home projects Austin",
    "general contractor portfolio",
  ],
});

const ALBUMS = [
  {
    value: "residential",
    slug: "residential",
    label: "Residential",
    description:
      "Custom homes and whole-house remodels across Austin and the Hill Country.",
  },
  {
    value: "commercial",
    slug: "commercial",
    label: "Commercial",
    description:
      "Retail, office, and mixed-use build-outs delivered on retail schedules.",
  },
  {
    value: "industrial",
    slug: "industrial",
    label: "Industrial & Civil",
    description:
      "Warehouses, sitework, and structures built for the long haul.",
  },
] as const;

export default async function ProjectsPage() {
  const items = await getProjects();
  const albums = ALBUMS.map((album) => ({
    ...album,
    photos: items
      .filter((item) => item.album === album.value)
      .map((item) => ({
        id: item.id,
        caption: item.caption,
        src:
          mediaUrl(item.photo as Media | number | null, item.imageUrl) ||
          PLACEHOLDER_IMAGES.project,
      })),
  })).filter((album) => album.photos.length > 0);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <PageHero
        index="03"
        label="Projects"
        title="Work we can point to"
        description="Recent sites, finished builds, and the details in between — photographed as delivered."
        image={PLACEHOLDER_IMAGES.project}
        imageAlt="A finished Apex Construction project"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-28">
        {albums.length > 0 ? (
          <>
            <AnchorNav
              label="Project albums"
              sections={albums.map((album) => ({
                slug: album.slug,
                name: album.label,
              }))}
            />
            <div className="mt-8 space-y-16 md:mt-14 md:space-y-24">
              {albums.map((album, index) => (
                <div key={album.value} id={album.slug} className="scroll-mt-36">
                  <GalleryGrid
                    album={album.label}
                    description={album.description}
                    index={index + 1}
                    photos={album.photos}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center font-serif text-xl text-muted-foreground">
            Project photographs will appear here once published.
          </p>
        )}
      </div>
      <QuoteInvite
        title="Your project, this standard"
        description="Every build gets the same superintendent discipline and weekly reporting. Bring us yours."
      />
    </main>
  );
}
