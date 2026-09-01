import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";
import {
  getCustomHomes,
  getServiceCategories,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS = [
  "/",
  "/services",
  "/custom-homes",
  "/projects",
  "/process",
  "/about",
  "/quote",
  "/contact",
  "/privacy",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let lastModifiedByPath: Record<string, Date> = {};
  let servicePaths: { slug: string; lastModified: Date }[] = [];

  try {
    const payload = await getPayloadClient();

    const [settings, customHomes, services, categories, projects] =
      await Promise.all([
        getSiteSettings(),
        getCustomHomes(),
        payload.find({
          collection: "services",
          limit: 1,
          sort: "-updatedAt",
          where: { _status: { equals: "published" } },
        }),
        getServiceCategories(),
        payload.find({
          collection: "projects",
          limit: 1,
          sort: "-createdAt",
          where: { _status: { equals: "published" } },
        }),
      ]);

    const home = toDate(settings.updatedAt) ?? new Date();
    const servicesDate = toDate(services.docs[0]?.updatedAt) ?? new Date();
    const projectsDate = toDate(projects.docs[0]?.createdAt) ?? new Date();
    const customHomesDate = toDate(customHomes.updatedAt) ?? new Date();

    lastModifiedByPath = {
      "/": latest(home, customHomesDate, servicesDate),
      "/services": latest(servicesDate, toDate(categories[0]?.updatedAt)),
      "/custom-homes": customHomesDate,
      "/projects": projectsDate,
      "/process": home,
      "/about": home,
      "/contact": home,
      "/quote": home,
      "/privacy": new Date(),
    };

    const allServices = await getServices();
    servicePaths = allServices.map((service) => ({
      slug: service.slug,
      lastModified: toDate(service.updatedAt) ?? servicesDate,
    }));
  } catch {
    lastModifiedByPath = {};
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: lastModifiedByPath[path] ?? new Date(),
    changeFrequency:
      path === "/" || path === "/services" || path === "/projects"
        ? "weekly"
        : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/services" || path === "/quote" || path === "/custom-homes"
          ? 0.9
          : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = servicePaths.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: service.lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...serviceEntries];
}

function toDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function latest(...dates: (Date | null | undefined)[]) {
  const valid = dates.filter((date): date is Date => date instanceof Date);
  if (valid.length === 0) return new Date();
  return new Date(Math.max(...valid.map((date) => date.getTime())));
}
