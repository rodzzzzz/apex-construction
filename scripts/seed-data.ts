export function unsplash(photo: string, width = 1200) {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=80`;
}

export type ServiceTag =
  | "licensed"
  | "insured"
  | "permits"
  | "warranty"
  | "sustainable"
  | "fast-track";

export const SITE_SETTINGS = {
  name: "Apex Construction",
  tagline: "Built right. Built to last.",
  welcome:
    "Apex Construction is a general contractor in Austin, Texas — commercial builds, custom homes, and remodels delivered with precision, straight answers, and schedules that hold. We run our own sites, employ our own crews, and answer our own phone.",
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
};

export const CUSTOM_HOMES = {
  title: "Apex Custom Homes",
  intro:
    "A custom home program built around one promise: your home is finished the way it was drawn, on the date we committed to, with numbers that do not drift. Design, engineering, and construction under one contract.",
  capacity: "120+ custom homes delivered across Central Texas",
  facilities: [
    {
      title: "Design-build delivery",
      description:
        "Architect, interior designer, and builder under one roof — one contract, one schedule, one accountable team from first sketch to keys.",
    },
    {
      title: "Fixed-price contracts",
      description:
        "Detailed allowances and a locked price before dirt moves. Allowances are itemized to the fixture level — no vague numbers, no mid-build surprises.",
    },
    {
      title: "Weekly site reports",
      description:
        "Photos, schedule updates, and budget status every Friday, plus a dedicated project portal for selections and documents throughout the build.",
    },
    {
      title: "Lot evaluation",
      description:
        "Before you buy land, we walk it — slope, access, utilities, and tree coverage — so your budget starts from reality, not hope.",
    },
    {
      title: "Green building",
      description:
        "HERS-rated envelopes, solar-ready electrical, and water-wise systems as standard options. Build to Austin Energy Green Building levels 1–4.",
    },
    {
      title: "Warranty & closeout",
      description:
        "A 12-month workmanship warranty, a complete O&M binder, and an 11-month check-in before your warranty window closes.",
    },
  ],
  bookingNotes:
    "Custom home projects begin with a paid pre-construction agreement — a site evaluation, budget framework, and program calendar. Most programs break ground within six to nine months of design start.",
};

export const CATEGORY_SEED = [
  {
    name: "General Contracting",
    slug: "general-contracting",
    order: 1,
    description:
      "Full-scope project delivery — our own superintendents, vetted subcontractors, and schedules that hold.",
  },
  {
    name: "Design-Build",
    slug: "design-build",
    order: 2,
    description:
      "Architecture, engineering, and construction under one contract — one team accountable from sketch to keys.",
  },
  {
    name: "Custom Homes",
    slug: "custom-homes",
    order: 3,
    description:
      "Ground-up residences across Austin and the Hill Country, built to fixed prices and published schedules.",
  },
  {
    name: "Commercial",
    slug: "commercial",
    order: 4,
    description:
      "Retail, office, medical, and mixed-use spaces delivered on retail timelines.",
  },
  {
    name: "Remodeling",
    slug: "remodeling",
    order: 5,
    description:
      "Whole-house remodels, kitchens, baths, and additions — lived-in renovations planned around real life.",
  },
  {
    name: "Civil & Sitework",
    slug: "civil-sitework",
    order: 6,
    description:
      "Grading, utilities, foundations, and site infrastructure — the ground everything else stands on.",
  },
] as const;

export type ServiceSeed = {
  name: string;
  slug: string;
  description: string;
  startingAt: number;
  category: (typeof CATEGORY_SEED)[number]["slug"];
  imageUrl: string;
  tags?: ServiceTag[];
  featured?: boolean;
  acceptingProjects?: boolean;
  quoteable?: boolean;
};

export const SERVICE_SEED: ServiceSeed[] = [
  // ——— General Contracting ———
  {
    name: "Ground-Up Construction",
    slug: "ground-up-construction",
    description:
      "Full delivery of new structures from excavation to certificate of occupancy — our superintendents on site daily, vetted trades, and milestone-based draw schedules.",
    startingAt: 185,
    category: "general-contracting",
    imageUrl: unsplash("photo-1541888946425-d81bb19240f5"),
    tags: ["licensed", "insured", "permits"],
    featured: true,
  },
  {
    name: "Construction Management",
    slug: "construction-management",
    description:
      "Owner's-representation style delivery where we manage budget, schedule, and quality on your behalf — open-book pricing with your interests at the table.",
    startingAt: 12000,
    category: "general-contracting",
    imageUrl: unsplash("photo-1581094794329-c8112a89af12"),
    tags: ["licensed", "insured"],
  },
  {
    name: "Tenant Finish-Out",
    slug: "tenant-finish-out",
    description:
      "Retail, office, and medical build-outs delivered around occupancy deadlines — permitting, build, and inspection sequenced so your doors open on the lease date.",
    startingAt: 48,
    category: "general-contracting",
    imageUrl: unsplash("photo-1449824913935-59a10b8d2000"),
    tags: ["fast-track", "permits"],
    quoteable: true,
  },
  {
    name: "Structural Repairs",
    slug: "structural-repairs",
    description:
      "Foundation, framing, and load-path repairs engineered and stamped — from under-slab plumbing leaks to full pier-and-beam re-piling.",
    startingAt: 8500,
    category: "general-contracting",
    imageUrl: unsplash("photo-1581094794329-c8112a89af12"),
    tags: ["licensed", "warranty"],
  },

  // ——— Design-Build ———
  {
    name: "Design-Build Delivery",
    slug: "design-build-delivery",
    description:
      "One contract for architecture, engineering, and construction. Drawings are value-engineered against your budget continuously — not at the end.",
    startingAt: 42000,
    category: "design-build",
    imageUrl: unsplash("photo-1503387762-592deb58ef4e"),
    tags: ["licensed", "insured", "warranty"],
    featured: true,
  },
  {
    name: "Architectural Design",
    slug: "architectural-design",
    description:
      "Schematic through permit-ready construction documents by licensed architects, coordinated with structural and MEP from day one.",
    startingAt: 28000,
    category: "design-build",
    imageUrl: unsplash("photo-1581094794329-c8112a89af12"),
    tags: ["permits"],
  },
  {
    name: "Permitting & Entitlements",
    slug: "permitting-entitlements",
    description:
      "Permit sets, submittals, and plan-review management through the city and county — you never stand in a plan-review line.",
    startingAt: 4800,
    category: "design-build",
    imageUrl: unsplash("photo-1454165804606-c3d57bc86b40"),
    tags: ["permits", "fast-track"],
  },

  // ——— Custom Homes ———
  {
    name: "Full Custom Home",
    slug: "full-custom-home",
    description:
      "Ground-up custom residences built to fixed-price contracts — from lot evaluation through design, build, and a 12-month workmanship warranty.",
    startingAt: 1150000,
    category: "custom-homes",
    imageUrl: unsplash("photo-1600607687920-4e2a09cf159d"),
    tags: ["licensed", "insured", "warranty"],
    featured: true,
  },
  {
    name: "Hill Country Estate",
    slug: "hill-country-estate",
    description:
      "Slope-adapted, view-oriented estates with driveways, water systems, and wildfire-smart detailing engineered for Texas terrain.",
    startingAt: 1850000,
    category: "custom-homes",
    imageUrl: unsplash("photo-1431576901776-e539bd916ba2"),
    tags: ["licensed", "insured", "sustainable"],
  },
  {
    name: "Modern Farmhouse",
    slug: "modern-farmhouse",
    description:
      "The Austin modern farmhouse done properly — board-and-batten, standing-seam metal, and a porch deep enough to actually use.",
    startingAt: 890000,
    category: "custom-homes",
    imageUrl: unsplash("photo-1564013799919-ab600027ffc6"),
    tags: ["warranty", "fast-track"],
  },
  {
    name: "Green-Built Home",
    slug: "green-built-home",
    description:
      "HERS-rated envelopes, solar-ready electrical, and water-wise systems — built to Austin Energy Green Building standards.",
    startingAt: 980000,
    category: "custom-homes",
    imageUrl: unsplash("photo-1567016432779-094069958ea5"),
    tags: ["sustainable", "warranty"],
    acceptingProjects: true,
  },

  // ——— Commercial ———
  {
    name: "Office Build-Out",
    slug: "office-build-out",
    description:
      "Workspace construction from shell to move-in — HVAC, power, data, and finishes sequenced around your move date.",
    startingAt: 52,
    category: "commercial",
    imageUrl: unsplash("photo-1497366216548-37526070297c"),
    tags: ["fast-track", "permits"],
  },
  {
    name: "Retail Construction",
    slug: "retail-construction",
    description:
      "Storefronts, restaurants, and showrooms delivered on retail timelines — brand-standard finishes, health permits, and ADA compliance handled.",
    startingAt: 65,
    category: "commercial",
    imageUrl: unsplash("photo-1486406146926-c627a92ad1ab"),
    tags: ["licensed", "fast-track"],
  },
  {
    name: "Medical & Dental",
    slug: "medical-dental",
    description:
      "Clinic and practice build-outs with med-gas, lead-lined rooms, and exam-ready mechanical systems coordinated with your equipment vendors.",
    startingAt: 110,
    category: "commercial",
    imageUrl: unsplash("photo-1519494026892-80bbd2d6fd0d"),
    tags: ["licensed", "insured"],
    acceptingProjects: false,
  },
  {
    name: "Warehouse & Industrial",
    slug: "warehouse-industrial",
    description:
      "Tilt-wall and steel-frame industrial space — clear heights, dock packages, and heavy power distribution built for operations, not just storage.",
    startingAt: 95,
    category: "commercial",
    imageUrl: unsplash("photo-1581094794329-c8112a89af12"),
    tags: ["licensed", "insured", "warranty"],
  },

  // ——— Remodeling ———
  {
    name: "Whole-House Remodel",
    slug: "whole-house-remodel",
    description:
      "Full-gut renovations of Austin homes — layout, systems, and finishes rebuilt for how you live now, with a livable-phase plan if you stay in place.",
    startingAt: 145000,
    category: "remodeling",
    imageUrl: unsplash("photo-1503387762-592deb58ef4e"),
    tags: ["licensed", "warranty"],
  },
  {
    name: "Kitchen Remodel",
    slug: "kitchen-remodel",
    description:
      "Cabinetry, stone, plumbing, and lighting — from single-wall updates to full expansions into adjacent space.",
    startingAt: 48000,
    category: "remodeling",
    imageUrl: unsplash("photo-1556911220-bff31c812dba"),
    tags: ["warranty", "fast-track"],
  },
  {
    name: "Bathroom Remodel",
    slug: "bathroom-remodel",
    description:
      "Wet-area rebuilds with waterproofing to spec — curbless showers, heated floors, and finishes chosen to last.",
    startingAt: 18500,
    category: "remodeling",
    imageUrl: unsplash("photo-1584622650111-993a426fbf0a"),
    tags: ["warranty"],
  },
  {
    name: "Home Addition",
    slug: "home-addition",
    description:
      "Second stories, family-room extensions, and primary-suite additions engineered to disappear into the existing structure.",
    startingAt: 92000,
    category: "remodeling",
    imageUrl: unsplash("photo-1600566753086-00f18fb6b3ea"),
    tags: ["licensed", "permits", "warranty"],
  },
  {
    name: "ADU & Garage Apartment",
    slug: "adu-garage-apartment",
    description:
      "Accessory dwelling units built to Austin's HOME initiative rules — rental income or family space, permitted and delivered turnkey.",
    startingAt: 125000,
    category: "remodeling",
    imageUrl: unsplash("photo-1600585154340-be6161a56a0c"),
    tags: ["permits", "fast-track"],
  },

  // ——— Civil & Sitework ———
  {
    name: "Site Development",
    slug: "site-development",
    description:
      "Grading, drainage, and site preparation — mass excavation to final grade, engineered for stormwater compliance from the first dozer pass.",
    startingAt: 4.5,
    category: "civil-sitework",
    imageUrl: unsplash("photo-1621905251918-48416bd8575a"),
    tags: ["licensed", "insured"],
    quoteable: false,
  },
  {
    name: "Driveways & Flatwork",
    slug: "driveways-flatwork",
    description:
      "Concrete driveways, aprons, and hardscape — reinforced, jointed, and finished for Central Texas clay, not against it.",
    startingAt: 7800,
    category: "civil-sitework",
    imageUrl: unsplash("photo-1516979187457-637abb4f9353"),
    tags: ["warranty"],
  },
  {
    name: "Retaining Walls",
    slug: "retaining-walls",
    description:
      "Engineered retaining walls in segmental block, cast stone, and timber — drainage behind the wall done right, sized for the slope.",
    startingAt: 6500,
    category: "civil-sitework",
    imageUrl: unsplash("photo-1573348722427-f1d6819fdf98"),
    tags: ["licensed", "warranty"],
    acceptingProjects: true,
  },
  {
    name: "Foundation Work",
    slug: "foundation-work",
    description:
      "Slab, pier-and-beam, and post-tension foundations engineered for Texas soils — soil reports, design, and pour under one accountable crew.",
    startingAt: 12,
    category: "civil-sitework",
    imageUrl: unsplash("photo-1581094794329-c8112a89af12"),
    tags: ["licensed", "insured"],
    quoteable: false,
  },
];

export const PROJECT_SEED: Array<{
  caption: string;
  album: "residential" | "commercial" | "industrial";
  imageUrl: string;
}> = [
  // ——— Residential ———
  {
    caption: "The Ridgeline Residence — Westlake",
    album: "residential",
    imageUrl: unsplash("photo-1600607687939-ce8a6c25118c", 1600),
  },
  {
    caption: "A modern farmhouse at golden hour",
    album: "residential",
    imageUrl: unsplash("photo-1564013799919-ab600027ffc6", 1600),
  },
  {
    caption: "Hill Country estate, stone and steel",
    album: "residential",
    imageUrl: unsplash("photo-1431576901776-e539bd916ba2", 1600),
  },
  {
    caption: "Clarksville whole-house remodel",
    album: "residential",
    imageUrl: unsplash("photo-1600566753086-00f18fb6b3ea", 1600),
  },
  {
    caption: "A Hyde Park kitchen, rebuilt",
    album: "residential",
    imageUrl: unsplash("photo-1556911220-bff31c812dba", 1600),
  },
  {
    caption: "Primary suite addition, Tarrytown",
    album: "residential",
    imageUrl: unsplash("photo-1600585154340-be6161a56a0c", 1600),
  },
  {
    caption: "ADU over a detached garage",
    album: "residential",
    imageUrl: unsplash("photo-1518684079-3c830dcef090", 1600),
  },
  // ——— Commercial ———
  {
    caption: "South Congress retail build-out",
    album: "commercial",
    imageUrl: unsplash("photo-1486406146926-c627a92ad1ab", 1600),
  },
  {
    caption: "Downtown office floor, shell to move-in",
    album: "commercial",
    imageUrl: unsplash("photo-1497366216548-37526070297c", 1600),
  },
  {
    caption: "A medical clinic ready for day one",
    album: "commercial",
    imageUrl: unsplash("photo-1519494026892-80bbd2d6fd0d", 1600),
  },
  {
    caption: "East Austin restaurant, delivered on the lease date",
    album: "commercial",
    imageUrl: unsplash("photo-1517248135467-4c7edcad34c4", 1600),
  },
  {
    caption: "Showroom finishes, brand standard",
    album: "commercial",
    imageUrl: unsplash("photo-1441986300917-64674bd600d8", 1600),
  },
  {
    caption: "Mixed-use lobby and common areas",
    album: "commercial",
    imageUrl: unsplash("photo-1497366811353-6870744d04b2", 1600),
  },
  // ——— Industrial ———
  {
    caption: "Tilt-wall warehouse, 40-foot clear",
    album: "industrial",
    imageUrl: unsplash("photo-1581094794329-c8112a89af12", 1600),
  },
  {
    caption: "Site grading and stormwater infrastructure",
    album: "industrial",
    imageUrl: unsplash("photo-1621905251918-48416bd8575a", 1600),
  },
  {
    caption: "Dock package and heavy power distribution",
    album: "industrial",
    imageUrl: unsplash("photo-1516979187457-637abb4f9353", 1600),
  },
  {
    caption: "Foundation pour, post-tension slab",
    album: "industrial",
    imageUrl: unsplash("photo-1541888946425-d81bb19240f5", 1600),
  },
  {
    caption: "Retaining walls engineered for the slope",
    album: "industrial",
    imageUrl: unsplash("photo-1581094794329-c8112a89af12", 1600),
  },
  {
    caption: "Structural steel going up on Cullen Drive",
    album: "industrial",
    imageUrl: unsplash("photo-1503387762-592deb58ef4e", 1600),
  },
];
