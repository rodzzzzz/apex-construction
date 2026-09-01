import type { CollectionConfig } from "payload";
import { authenticated } from "./access";
import {
  guestRequestAdmin,
  inquiryStatusOptions,
  statusCellAdmin,
} from "./admin";

export const ProjectInquiries: CollectionConfig = {
  slug: "project-inquiries",
  labels: {
    singular: "Project inquiry",
    plural: "Project inquiries",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
    ...guestRequestAdmin,
    description:
      "Custom home and specialty project inquiries from the website.",
    defaultColumns: ["name", "targetDate", "approxSqFt", "status", "createdAt"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "targetDate",
      type: "date",
      required: true,
      label: "Target start",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "approxSqFt",
      type: "number",
      required: true,
      min: 100,
      admin: {
        description: "Approximate square footage.",
      },
    },
    {
      name: "homeType",
      type: "text",
      label: "Project type",
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [...inquiryStatusOptions],
      admin: statusCellAdmin,
    },
  ],
};
