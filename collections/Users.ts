import type { CollectionConfig } from "payload";
import { accountAdmin } from "./admin";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Team member",
    plural: "Team",
  },
  admin: {
    useAsTitle: "email",
    ...accountAdmin,
    description:
      "People who can sign in to update the Apex Construction website.",
    defaultColumns: ["email", "updatedAt"],
  },
  auth: true,
  fields: [],
};
