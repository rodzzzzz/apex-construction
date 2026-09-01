import type { Service, ServiceCategory, SiteSetting } from "@/payload-types";
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_LICENSE,
  SITE_NAME,
  SITE_PHONE,
  SITE_REGION,
  SITE_URL,
} from "@/lib/seo";

type HoursRow = NonNullable<SiteSetting["hours"]>[number];

const DAY_MAP: Record<string, string> = {
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

const TIME_PATTERN = /(\d{1,2}):(\d{2})\s*(AM|PM)/gi;

function parseTimeRanges(value: string): string[] {
  const match = [...value.matchAll(TIME_PATTERN)];
  if (match.length < 2) return [];
  const toMinutes = (hour: string, minute: string, meridiem: string) => {
    const h = (Number(hour) % 12) + (meridiem.toUpperCase() === "PM" ? 12 : 0);
    return `${String(h).padStart(2, "0")}:${minute}`;
  };
  const ranges: string[] = [];
  for (let i = 0; i + 1 < match.length; i += 2) {
    const [opens, closes] = [match[i], match[i + 1]];
    ranges.push(
      `${toMinutes(opens[1], opens[2], opens[3])}-${toMinutes(closes[1], closes[2], closes[3])}`,
    );
  }
  return ranges;
}

function extractDays(label: string): string[] {
  const days: string[] = [];
  const pattern =
    /(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/gi;
  for (const match of label.matchAll(pattern)) {
    const day = DAY_MAP[match[1].toLowerCase()];
    if (day && !days.includes(day)) days.push(day);
  }
  return days;
}

function expandDayRange(label: string): string[] {
  const order = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const days = extractDays(label);
  if (days.length !== 2) return days;
  const [start, end] = days.map((day) => order.indexOf(day));
  if (start === -1 || end === -1) return days;
  const span: string[] = [];
  for (let i = start; ; i = (i + 1) % 7) {
    span.push(order[i]);
    if (i === end) break;
  }
  return span;
}

export function openingHoursSpecification(hours: readonly HoursRow[]) {
  const rows = hours.filter((row): row is { label: string; value: string } =>
    Boolean(row?.label && row?.value),
  );
  if (rows.length === 0) return [];

  const specs: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[] = [];

  for (const row of rows) {
    const days = expandDayRange(row.label);
    if (days.length === 0) continue;
    for (const range of parseTimeRanges(row.value)) {
      const [opens, closes] = range.split("-");
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens,
        closes,
      });
    }
  }

  return specs;
}

export function contractorJsonLd({
  name = SITE_NAME,
  email = SITE_EMAIL,
  phone = SITE_PHONE,
  address = SITE_ADDRESS,
  sameAs = [] as string[],
  hours = [] as HoursRow[],
  image,
}: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  sameAs?: string[];
  hours?: HoursRow[];
  image?: string;
} = {}) {
  const opening = openingHoursSpecification(hours);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name,
    alternateName: "Apex",
    url: SITE_URL,
    email,
    telephone: phone,
    description:
      "General contractor in Austin, Texas for commercial construction, custom homes, remodeling, and design-build projects.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: SITE_REGION,
    },
    knowsAbout: [
      "General contracting",
      "Design-build construction",
      "Custom home building",
      "Commercial construction",
      "Remodeling",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Austin",
      addressRegion: "TX",
      postalCode: "78744",
      addressCountry: "US",
    },
    sameAs: sameAs.filter(Boolean),
  };

  if (SITE_LICENSE) {
    schema.identifier = SITE_LICENSE;
  }

  if (image) {
    schema.image = image;
  }

  if (opening.length > 0) {
    schema.openingHoursSpecification = opening;
  }

  schema.potentialAction = {
    "@type": "RequestQuoteAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/quote`,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Quote", name: "Construction quote" },
  };

  return schema;
}

export function servicesJsonLd({
  name = "Apex Construction services",
  categories,
  items,
}: {
  name?: string;
  categories: ServiceCategory[];
  items: Service[];
}) {
  const serviceCategory = (item: Service) =>
    typeof item.category === "object" && item.category
      ? item.category.id
      : item.category;

  const sections = categories
    .map((category) => {
      const services = items.filter(
        (item) =>
          serviceCategory(item) === category.id && item.acceptingProjects,
      );
      if (services.length === 0) return null;
      return {
        "@type": "ItemList",
        name: category.name,
        ...(category.description ? { description: category.description } : {}),
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            url: `${SITE_URL}/services/${service.slug}`,
            provider: { "@type": "GeneralContractor", name: SITE_NAME },
            offers: {
              "@type": "Offer",
              price: service.startingAt,
              priceCurrency: "USD",
              description:
                "Starting price — final pricing set after site walk.",
            },
          },
        })),
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/services#services`,
    name,
    url: `${SITE_URL}/services`,
    itemListElement: sections,
  };
}

export function faqJsonLd(
  questions: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}
