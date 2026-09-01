import type {
  CustomHome,
  Project,
  Service,
  ServiceCategory,
  SiteSetting,
} from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";

const emptySettings: SiteSetting = {
  id: 0,
  name: "Apex Construction",
  tagline: "Built right. Built to last.",
  welcome:
    "A general contractor in Austin, Texas — commercial builds, custom homes, and remodels delivered with precision, straight answers, and schedules that hold.",
  phone: "+1 (512) 555-0148",
  email: "build@apexconstruction.com",
  address: "4700 Cullen Drive, Building B, Austin, TX 78744",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Austin%20TX&t=&z=12&ie=UTF8&iwloc=&output=embed",
  hours: [
    { label: "Monday – Friday", value: "7:00 AM – 5:00 PM" },
    { label: "Saturday", value: "8:00 AM – 12:00 PM (by appointment)" },
    { label: "Sunday", value: "Closed" },
  ],
  instagram: "https://instagram.com/apexconstruction",
  facebook: "https://facebook.com/apexconstruction",
  twitter: "https://x.com/apexconstruction",
  heroImageUrl: PLACEHOLDER_IMAGES.hero,
  updatedAt: "",
  createdAt: "",
};

const emptyCustomHomes: CustomHome = {
  id: 0,
  title: "Apex Custom Homes",
  intro:
    "A custom home program built around one promise: your home is finished the way it was drawn, on the date we committed to, with numbers that do not drift.",
  capacity: "120+ custom homes delivered across Central Texas",
  imageUrl: PLACEHOLDER_IMAGES.customHome,
  facilities: [
    {
      title: "Design-build delivery",
      description:
        "Architect, interior designer, and builder under one roof — one contract, one schedule, one accountable team.",
    },
    {
      title: "Fixed-price contracts",
      description:
        "Detailed allowances and a locked price before dirt moves. No allowances left vague, no surprises mid-build.",
    },
    {
      title: "Weekly site reports",
      description:
        "Photos, schedule updates, and budget status every Friday, plus a dedicated project portal for selections.",
    },
  ],
  bookingNotes:
    "Custom home projects are booked by appointment. Share your timeline and we will follow up within one business day.",
  updatedAt: "",
  createdAt: "",
};

export async function getSiteSettings(): Promise<SiteSetting> {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    return { ...emptySettings, ...settings };
  } catch {
    return emptySettings;
  }
}

export async function getCustomHomes(): Promise<CustomHome> {
  try {
    const payload = await getPayloadClient();
    const homes = await payload.findGlobal({ slug: "custom-homes", depth: 1 });
    return { ...emptyCustomHomes, ...homes };
  } catch {
    return emptyCustomHomes;
  }
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "service-categories",
      depth: 0,
      limit: 50,
      sort: "order",
      where: { _status: { equals: "published" } },
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      depth: 1,
      limit: 200,
      sort: "name",
      where: { _status: { equals: "published" } },
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      depth: 1,
      limit: 1,
      where: {
        and: [{ _status: { equals: "published" } }, { slug: { equals: slug } }],
      },
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      depth: 1,
      limit: 4,
      where: {
        and: [
          { _status: { equals: "published" } },
          { featured: { equals: true } },
          { acceptingProjects: { equals: true } },
        ],
      },
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      depth: 1,
      limit: 60,
      sort: "-createdAt",
      where: { _status: { equals: "published" } },
    });
    return result.docs;
  } catch {
    return [];
  }
}

export function socialLinks(settings: SiteSetting) {
  return [settings.instagram, settings.facebook, settings.twitter].filter(
    (url): url is string => Boolean(url),
  );
}
