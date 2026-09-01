import type { CollectionConfig } from "payload";
import {
  authenticated,
  authenticatedOrPublished,
  ensurePublishedStatus,
  slugify,
} from "./access";
import { websiteAdmin } from "./admin";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
    ...websiteAdmin,
    description:
      "Construction services clients can browse and add to a quote brief.",
    defaultColumns: [
      "name",
      "photo",
      "category",
      "startingAt",
      "acceptingProjects",
      "featured",
      "_status",
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (typeof value === "string" && value.length > 0) {
              return slugify(value);
            }
            if (data?.name && typeof data.name === "string") {
              return slugify(data.name);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "startingAt",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description:
          "Starting price in US dollars, shown as \u201cfrom $X\u201d.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "service-categories",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: {
        components: {
          Cell: "/components/admin/thumbnail-cell#ThumbnailCell",
        },
      },
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description:
          "Optional Unsplash or CDN URL used when no photo is uploaded.",
      },
    },
    {
      name: "tags",
      type: "select",
      hasMany: true,
      options: [
        { label: "Licensed", value: "licensed" },
        { label: "Insured", value: "insured" },
        { label: "Permit handling", value: "permits" },
        { label: "Warranty", value: "warranty" },
        { label: "Sustainable", value: "sustainable" },
        { label: "Fast-track", value: "fast-track" },
      ],
    },
    {
      name: "acceptingProjects",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Currently accepting new projects for this service.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show on the home page.",
      },
    },
    {
      name: "quoteable",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Allow this service in online quote briefs.",
      },
    },
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [ensurePublishedStatus],
  },
};
