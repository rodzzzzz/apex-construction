import type { GlobalConfig } from "payload";
import { authenticated } from "../collections/access";

export const CustomHomes: GlobalConfig = {
  slug: "custom-homes",
  label: "Custom homes",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website",
    hideAPIURL: true,
    description: "Custom home program stats, features, and process notes.",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Apex Custom Homes",
    },
    {
      name: "intro",
      type: "textarea",
      required: true,
    },
    {
      name: "capacity",
      type: "text",
      required: true,
      label: "Headline stat",
      defaultValue: "120+ custom homes delivered across Central Texas",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageUrl",
      type: "text",
    },
    {
      name: "facilities",
      type: "array",
      label: "Program features",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "bookingNotes",
      type: "textarea",
      label: "Process notes",
    },
  ],
};
