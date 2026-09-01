import type { CollectionConfig } from "payload";
import { accountAdmin } from "./admin";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Image",
    plural: "Images",
  },
  admin: {
    ...accountAdmin,
    description: "Photographs of projects, sites, and finished spaces.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
