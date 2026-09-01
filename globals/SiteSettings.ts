import type { GlobalConfig } from "payload";
import { authenticated } from "../collections/access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website",
    hideAPIURL: true,
    description:
      "Company name, hours, address, and social links shown across the site.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      defaultValue: "Apex Construction",
    },
    {
      name: "tagline",
      type: "text",
      required: true,
      defaultValue: "Built right. Built to last.",
    },
    {
      name: "welcome",
      type: "textarea",
      required: true,
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "heroImageUrl",
      type: "text",
    },
    {
      type: "row",
      fields: [
        {
          name: "phone",
          type: "text",
          required: true,
        },
        {
          name: "email",
          type: "email",
          required: true,
        },
      ],
    },
    {
      name: "address",
      type: "textarea",
      required: true,
    },
    {
      name: "mapEmbedUrl",
      type: "text",
      admin: {
        description: "Google Maps embed URL for the contact page.",
      },
    },
    {
      name: "hours",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "instagram",
      type: "text",
    },
    {
      name: "facebook",
      type: "text",
    },
    {
      name: "twitter",
      type: "text",
    },
  ],
};
