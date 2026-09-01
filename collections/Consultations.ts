import type { CollectionConfig } from "payload";
import { authenticated } from "./access";
import { guestRequestAdmin, statusCellAdmin } from "./admin";

export const Consultations: CollectionConfig = {
  slug: "consultations",
  labels: {
    singular: "Consultation",
    plural: "Consultations",
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
      "Consultation requests from the website. Confirm or cancel here.",
    defaultColumns: ["name", "date", "projectType", "status", "createdAt"],
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
      name: "date",
      type: "date",
      required: true,
      label: "When",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
        components: {
          Cell: "/components/admin/datetime-cell#DatetimeCell",
        },
      },
    },
    {
      name: "time",
      type: "text",
      required: true,
    },
    {
      name: "projectType",
      type: "select",
      defaultValue: "none",
      options: [
        { label: "General inquiry", value: "none" },
        { label: "Custom home", value: "custom-home" },
        { label: "Remodel", value: "remodel" },
        { label: "Commercial build", value: "commercial" },
        { label: "Addition or ADU", value: "addition" },
        { label: "Repair or restoration", value: "repair" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      admin: statusCellAdmin,
    },
  ],
};
