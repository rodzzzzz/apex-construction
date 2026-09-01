import type { CollectionConfig } from "payload";
import {
  authenticated,
  authenticatedOrPublished,
  ensurePublishedStatus,
} from "./access";
import { websiteAdmin } from "./admin";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project photo",
    plural: "Projects",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: "caption",
    ...websiteAdmin,
    description:
      "Residential, commercial, and industrial work shown on the projects page.",
    defaultColumns: ["caption", "photo", "album", "_status"],
  },
  fields: [
    {
      name: "caption",
      type: "text",
      required: true,
    },
    {
      name: "album",
      type: "select",
      required: true,
      defaultValue: "residential",
      options: [
        { label: "Residential", value: "residential" },
        { label: "Commercial", value: "commercial" },
        { label: "Industrial & Civil", value: "industrial" },
      ],
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
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [ensurePublishedStatus],
  },
};
