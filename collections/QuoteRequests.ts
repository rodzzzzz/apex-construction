import type { CollectionConfig } from "payload";
import { authenticated } from "./access";
import { guestRequestAdmin, statusCellAdmin } from "./admin";

export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",
  labels: {
    singular: "Quote request",
    plural: "Quote requests",
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
    description: "Service briefs submitted from the quote builder.",
    defaultColumns: ["name", "projectStage", "total", "status", "createdAt"],
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
      name: "projectStage",
      type: "select",
      required: true,
      options: [
        { label: "Planning & budgeting", value: "planning" },
        { label: "Ready to build", value: "ready" },
        { label: "Design in progress", value: "design" },
      ],
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
        },
        {
          name: "unitPrice",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "total",
      type: "number",
      required: true,
      min: 0,
      admin: {
        components: {
          Cell: "/components/admin/money-cell#MoneyCell",
        },
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Reviewing", value: "reviewing" },
        { label: "Quoted", value: "quoted" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
      ],
      admin: statusCellAdmin,
    },
  ],
};
