import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { LEAD_LINKS, pendingListHref } from "@/lib/staff";

export async function PendingBanner({
  collectionSlug,
  collectionConfig,
}: {
  collectionSlug?: string;
  collectionConfig?: { slug?: string };
}) {
  const slug = collectionSlug ?? collectionConfig?.slug;
  const queue = LEAD_LINKS.find((item) => item.slug === slug);
  if (!slug || !queue) return null;

  let count = 0;
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: queue.slug,
      limit: 1,
      where: { status: { equals: queue.status } },
    });
    count = result.totalDocs;
  } catch {
    count = 0;
  }

  if (count === 0) return null;

  const href = pendingListHref(queue.slug, queue.status);
  const label = `${count} ${queue.noun}${count === 1 ? "" : "s"}`;

  return (
    <div className="apex-pending-banner">
      <p>{label} — review these first.</p>
      <Link href={href}>Show {queue.status.replace("-", " ")} only</Link>
    </div>
  );
}
