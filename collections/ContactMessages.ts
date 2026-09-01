import type { CollectionConfig } from "payload";
import { authenticated } from "./access";
import { guestRequestAdmin, messageStatusOptions } from "./admin";

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  labels: {
    singular: "Message",
    plural: "Messages",
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
    description: "Notes from the contact form.",
    defaultColumns: ["name", "message", "status", "createdAt"],
  },
  hooks: {
    afterRead: [
      async ({ doc, req, findMany, context }) => {
        const method = req.method?.toUpperCase();
        if (
          findMany ||
          context.markingSeen ||
          doc.status !== "unread" ||
          !req.user ||
          (method && method !== "GET")
        ) {
          return doc;
        }

        await req.payload.update({
          collection: "contact-messages",
          id: doc.id,
          data: { status: "seen" },
          overrideAccess: true,
          context: { markingSeen: true },
        });

        return { ...doc, status: "seen" };
      },
    ],
  },
  fields: [
    {
      name: "letter",
      type: "ui",
      label: "Note",
      admin: {
        disableListColumn: true,
        components: {
          Field: "/components/admin/message-letter#MessageLetter",
        },
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        components: {
          Field: "/components/admin/blank-field#BlankField",
        },
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      admin: {
        components: {
          Field: "/components/admin/blank-field#BlankField",
        },
      },
    },
    {
      name: "phone",
      type: "text",
      admin: {
        components: {
          Field: "/components/admin/blank-field#BlankField",
        },
      },
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      admin: {
        components: {
          Field: "/components/admin/blank-field#BlankField",
          Cell: "/components/admin/message-letter#MessageExcerpt",
        },
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "unread",
      options: [...messageStatusOptions],
      admin: {
        components: {
          Field: "/components/admin/blank-field#BlankField",
          Cell: "/components/admin/status-cell#StatusCell",
        },
      },
    },
  ],
};
