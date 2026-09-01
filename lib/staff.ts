export const LEAD_LINKS = [
  {
    slug: "consultations" as const,
    status: "pending",
    label: "Consultations",
    noun: "pending consultation",
    path: "/collections/consultations",
    letter: "C",
  },
  {
    slug: "quote-requests" as const,
    status: "new",
    label: "Quotes",
    noun: "new quote request",
    path: "/collections/quote-requests",
    letter: "Q",
  },
  {
    slug: "contact-messages" as const,
    status: "unread",
    label: "Messages",
    noun: "unread message",
    path: "/collections/contact-messages",
    letter: "M",
  },
  {
    slug: "project-inquiries" as const,
    status: "new",
    label: "Inquiries",
    noun: "new project inquiry",
    path: "/collections/project-inquiries",
    letter: "I",
  },
] as const;

export const WEBSITE_LINKS = [
  { path: "/collections/services", label: "Services", letter: "S" },
  { path: "/collections/service-categories", label: "Categories", letter: "C" },
  { path: "/collections/projects", label: "Projects", letter: "P" },
  { path: "/globals/custom-homes", label: "Custom homes", letter: "H" },
  { path: "/globals/site-settings", label: "Site settings", letter: "T" },
] as const;

export const ACCOUNT_LINKS = [
  { path: "/collections/users", label: "Team", letter: "A" },
  { path: "/collections/media", label: "Images", letter: "I" },
] as const;

export type LeadSlug = (typeof LEAD_LINKS)[number]["slug"];
export type LeadCounts = Record<LeadSlug, number>;

export function emptyLeadCounts(): LeadCounts {
  return {
    consultations: 0,
    "quote-requests": 0,
    "contact-messages": 0,
    "project-inquiries": 0,
  };
}

export function pendingListHref(slug: string, status: string) {
  return `/admin/collections/${slug}?where[status][equals]=${status}`;
}

export function staffGivenName(email?: string | null) {
  if (!email) return null;
  const local = email.split("@")[0]?.trim() ?? "";
  const token = local.split(/[._+\-]/)[0] ?? "";
  if (!token) return null;
  return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
