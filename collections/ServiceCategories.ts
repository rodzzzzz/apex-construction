import type { CollectionConfig } from "payload";
import {
  authenticated,
  authenticatedOrPublished,
  ensurePublishedStatus,
  slugify,
} from "./access";
import { websiteAdmin } from "./admin";

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  labels: {
    singular: "Service category",
    plural: "Service categories",
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
      "General contracting, design-build, remodeling, and other service groups.",
    defaultColumns: ["name", "order", "_status"],
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
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
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
