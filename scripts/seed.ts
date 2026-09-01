#!/usr/bin/env tsx
process.loadEnvFile(".env");

import {
  CATEGORY_SEED,
  CUSTOM_HOMES,
  PROJECT_SEED,
  SERVICE_SEED,
  SITE_SETTINGS,
} from "./seed-data";

function austinDate(offsetDays = 0) {
  const now = new Date(Date.now() - 5 * 60 * 60 * 1000);
  const date = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + offsetDays,
    ),
  );
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function payloadDay(offsetDays = 0) {
  return `${austinDate(offsetDays)}T09:00:00-05:00`;
}

async function seed() {
  const [{ getPayload }, { default: config }, { PLACEHOLDER_IMAGES }] =
    await Promise.all([
      import("payload"),
      import("../payload.config"),
      import("../lib/brand"),
    ]);

  const payload = await getPayload({ config });

  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "team@apexconstruction.com",
        password: "apex-admin",
      },
    });
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      ...SITE_SETTINGS,
      heroImageUrl: PLACEHOLDER_IMAGES.hero,
    },
  });

  await payload.updateGlobal({
    slug: "custom-homes",
    data: {
      ...CUSTOM_HOMES,
      imageUrl: PLACEHOLDER_IMAGES.customHome,
    },
  });

  const categories: Record<string, number> = {};
  for (const category of CATEGORY_SEED) {
    const existing = await payload.find({
      collection: "service-categories",
      where: { slug: { equals: category.slug } },
      limit: 1,
    });
    const data = { ...category, _status: "published" as const };
    const doc = existing.docs[0]
      ? await payload.update({
          collection: "service-categories",
          id: existing.docs[0].id,
          data,
          draft: false,
        })
      : await payload.create({
          collection: "service-categories",
          data,
          draft: false,
        });
    categories[category.slug] = doc.id;
  }

  for (const service of SERVICE_SEED) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: service.slug } },
      limit: 1,
    });
    const data = {
      name: service.name,
      slug: service.slug,
      description: service.description,
      startingAt: service.startingAt,
      category: categories[service.category],
      imageUrl: service.imageUrl,
      tags: service.tags,
      featured: service.featured ?? false,
      acceptingProjects: service.acceptingProjects ?? true,
      quoteable: service.quoteable ?? true,
      _status: "published" as const,
    };
    if (existing.docs[0]) {
      await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data,
        draft: false,
      });
    } else {
      await payload.create({
        collection: "services",
        data,
        draft: false,
      });
    }
  }

  for (const item of PROJECT_SEED) {
    const existing = await payload.find({
      collection: "projects",
      where: { caption: { equals: item.caption } },
      limit: 1,
    });
    const data = { ...item, _status: "published" as const };
    if (existing.docs[0]) {
      await payload.update({
        collection: "projects",
        id: existing.docs[0].id,
        data,
        draft: false,
      });
    } else {
      await payload.create({
        collection: "projects",
        data,
        draft: false,
      });
    }
  }

  const existingConsultations = await payload.find({
    collection: "consultations",
    limit: 1,
  });
  if (existingConsultations.totalDocs === 0) {
    const consultations = [
      {
        name: "Sarah Mitchell",
        email: "sarah.mitchell@gmail.com",
        phone: "+1 (512) 555-0192",
        date: payloadDay(0),
        time: "09:00",
        projectType: "remodel" as const,
        notes:
          "Kitchen and living room — 1978 ranch on Bull Creek. Want to open the wall between them.",
        status: "confirmed" as const,
      },
      {
        name: "James Park",
        email: "jpark@loomlab.io",
        phone: "+1 (512) 555-0143",
        date: payloadDay(0),
        time: "10:00",
        projectType: "commercial" as const,
        notes:
          "3,200 sq ft office build-out on East 6th. Lease starts in ninety days.",
        status: "confirmed" as const,
      },
      {
        name: "Rebecca Torres",
        email: "becca.torres@outlook.com",
        phone: "+1 (737) 555-0110",
        date: payloadDay(0),
        time: "13:00",
        projectType: "custom-home" as const,
        notes:
          "Have a lot under contract in Dripping Springs. Need a budget before design.",
        status: "confirmed" as const,
      },
      {
        name: "The Nguyen family",
        email: "mark.nguyen@gmail.com",
        phone: "+1 (512) 555-0177",
        date: payloadDay(0),
        time: "15:00",
        projectType: "addition" as const,
        notes:
          "Second story over the garage — two bedrooms and a bath for the kids.",
        status: "pending" as const,
      },
      {
        name: "David Okafor",
        email: "d.okafor@sunbelt-realty.com",
        phone: "+1 (512) 555-0164",
        date: payloadDay(0),
        time: "16:00",
        projectType: "other" as const,
        notes:
          "Investor rehabs — three to four homes a year, looking for a GC partner.",
        status: "pending" as const,
      },
      {
        name: "Amelia Stone",
        email: "amelia.stone@gmail.com",
        phone: "+1 (512) 555-0108",
        date: payloadDay(2),
        time: "09:00",
        projectType: "repair" as const,
        notes:
          "Foundation movement on a pier-and-beam in Travis Heights. Cracks above two doors.",
        status: "confirmed" as const,
      },
      {
        name: "Luis Hernandez",
        email: "luis.hernandez@atxmedcare.com",
        phone: "+1 (512) 555-0131",
        date: payloadDay(3),
        time: "11:00",
        projectType: "commercial" as const,
        notes:
          "Dental clinic expansion — two new operatories into adjacent suite.",
        status: "pending" as const,
      },
      {
        name: "Katie Brand",
        email: "katie.brand@gmail.com",
        phone: "+1 (737) 555-0155",
        date: payloadDay(5),
        time: "14:00",
        projectType: "none" as const,
        notes: "Just getting pricing — ADU in the backyard for my mother.",
        status: "pending" as const,
      },
      {
        name: "Ryan Coleman",
        email: "ryancoleman@me.com",
        phone: "+1 (512) 555-0126",
        date: payloadDay(1),
        time: "08:00",
        projectType: "remodel" as const,
        notes: "Rescheduled — had a work conflict.",
        status: "cancelled" as const,
      },
    ];

    for (const consultation of consultations) {
      await payload.create({ collection: "consultations", data: consultation });
    }
  }

  const existingQuotes = await payload.find({
    collection: "quote-requests",
    limit: 1,
  });
  if (existingQuotes.totalDocs === 0) {
    const quotes = [
      {
        name: "Sarah Mitchell",
        email: "sarah.mitchell@gmail.com",
        phone: "+1 (512) 555-0192",
        projectStage: "design" as const,
        address: "4308 Bull Creek Rd, Austin, TX 78756",
        notes:
          "Engineer said the wall is load-bearing — need the beam option priced.",
        items: [
          { name: "Kitchen Remodel", quantity: 1, unitPrice: 48000 },
          { name: "Bathroom Remodel", quantity: 1, unitPrice: 18500 },
        ],
        total: 66500,
        status: "new" as const,
      },
      {
        name: "James Park",
        email: "jpark@loomlab.io",
        phone: "+1 (512) 555-0143",
        projectStage: "ready" as const,
        address: "2101 E 6th St, Suite 200, Austin, TX 78702",
        notes:
          "Fixture package is on its way — glass conference rooms, open desk rows.",
        items: [{ name: "Office Build-Out", quantity: 1, unitPrice: 52 }],
        total: 52,
        status: "reviewing" as const,
      },
      {
        name: "Northstar Retail Group",
        email: "projects@northstar-retail.com",
        phone: "+1 (214) 555-0187",
        projectStage: "planning" as const,
        address: "9900 Research Blvd, Austin, TX 78759",
        notes:
          "Two-suite combination for a national tenant. Rollout drawings attached in follow-up email.",
        items: [
          { name: "Retail Construction", quantity: 1, unitPrice: 65 },
          { name: "Permitting & Entitlements", quantity: 1, unitPrice: 4800 },
        ],
        total: 4865,
        status: "quoted" as const,
      },
      {
        name: "Rebecca Torres",
        email: "becca.torres@outlook.com",
        phone: "+1 (737) 555-0110",
        projectStage: "planning" as const,
        address: "Lot 12, Hideout Loop, Dripping Springs, TX 78620",
        notes: "Hill Country lot with a view west. 2,800 sq ft target.",
        items: [
          { name: "Full Custom Home", quantity: 1, unitPrice: 1150000 },
          { name: "Driveways & Flatwork", quantity: 1, unitPrice: 7800 },
        ],
        total: 1157800,
        status: "quoted" as const,
      },
      {
        name: "Tom Weaver",
        email: "tom.weaver@gmail.com",
        phone: "+1 (512) 555-0173",
        projectStage: "ready" as const,
        address: "1408 Willow Creek Dr, Cedar Park, TX 78613",
        notes:
          "Went with another builder on price. Keep us in mind for the pool house.",
        items: [
          { name: "ADU & Garage Apartment", quantity: 1, unitPrice: 125000 },
        ],
        total: 125000,
        status: "lost" as const,
      },
    ];

    for (const quote of quotes) {
      await payload.create({ collection: "quote-requests", data: quote });
    }
  }

  const existingMessages = await payload.find({
    collection: "contact-messages",
    limit: 1,
  });
  if (existingMessages.totalDocs === 0) {
    const messages = [
      {
        name: "Patricia Gomez",
        email: "pgomez@texascapitalins.com",
        phone: "+1 (512) 555-0114",
        message:
          "We are renovating our lobby and need a certificate of insurance for our board. Can you send your COI and references from similar work?",
        status: "unread" as const,
      },
      {
        name: "Daniel Kim",
        email: "dkim@buildsource.atx",
        phone: "+1 (512) 555-0152",
        message:
          "I run a small framing crew and heard Apex subs out to vetted trades. Who handles your sub packages, and are you taking new bids this quarter?",
        status: "unread" as const,
      },
      {
        name: "Monica Reyes",
        email: "monicareyes@mac.com",
        phone: "+1 (512) 555-0138",
        message:
          "You built the Hartmans' house on Mountain View last year — it is beautiful. We have a lot two streets over and would like to start a conversation.",
        status: "seen" as const,
      },
      {
        name: "Eric Nordstrom",
        email: "eric.nordstrom@gmail.com",
        phone: "+1 (512) 555-0121",
        message:
          "Quick question — do you do small jobs? I have a retaining wall that is leaning and nobody will call me back about it.",
        status: "seen" as const,
      },
    ];

    for (const message of messages) {
      await payload.create({ collection: "contact-messages", data: message });
    }
  }

  const existingInquiries = await payload.find({
    collection: "project-inquiries",
    limit: 1,
  });
  if (existingInquiries.totalDocs === 0) {
    const inquiries = [
      {
        name: "Rebecca Torres",
        email: "becca.torres@outlook.com",
        phone: "+1 (737) 555-0110",
        targetDate: payloadDay(180),
        approxSqFt: 2800,
        homeType: "Hill Country modern",
        message:
          "We have a lot under contract in Dripping Springs with a west-facing view. We want a three-bedroom, two-and-a-half-bath around 2,800 sq ft with a covered porch facing the sunset.",
        status: "new" as const,
      },
      {
        name: "Andrew and Julia Fields",
        email: "andrew.fields@gmail.com",
        phone: "+1 (512) 555-0119",
        targetDate: payloadDay(270),
        approxSqFt: 3600,
        homeType: "Modern farmhouse",
        message:
          "Second-time builders. Our first build went badly with a cost-plus contract — this time we want fixed pricing and weekly reporting. Lot is in Georgetown.",
        status: "in-progress" as const,
      },
      {
        name: "Whitney Hardy",
        email: "whitney.hardy@hillside.dev",
        phone: "+1 (512) 555-0103",
        targetDate: payloadDay(120),
        approxSqFt: 2200,
        homeType: "Green-built home",
        message:
          "Solar-ready and HERS-rated, please. I work in energy and want the envelope right. Lot is walkable to a greenbelt in South Austin.",
        status: "in-progress" as const,
      },
      {
        name: "The Carver family",
        email: "mike.carver@gmail.com",
        phone: "+1 (512) 555-0146",
        targetDate: payloadDay(-90),
        approxSqFt: 3100,
        homeType: "Full custom home",
        message:
          "Thank you — the build on Wood Hollow was everything you promised. The eleven-month walkthrough caught two small items and both were fixed within a week.",
        status: "done" as const,
      },
    ];

    for (const inquiry of inquiries) {
      await payload.create({ collection: "project-inquiries", data: inquiry });
    }
  }

  console.log(
    "Seed complete. Team login: team@apexconstruction.com / apex-admin",
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
