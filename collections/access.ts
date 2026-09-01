import type { Access, CollectionBeforeChangeHook } from "payload";

export const authenticated: Access = ({ req: { user } }) => Boolean(user);

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;

  return {
    _status: {
      equals: "published",
    },
  };
};

export const ensurePublishedStatus: CollectionBeforeChangeHook = async ({
  data,
}) => {
  if (data._status !== "draft") {
    data._status = "published";
  }
  return data;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
