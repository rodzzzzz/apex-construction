"use client";

import { Link, useConfig } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";

type ThumbnailCellProps = {
  cellData?:
    { thumbnailURL?: string | null; url?: string | null } | number | null;
  collectionSlug?: string;
  link?: boolean;
  linkURL?: string;
  rowData?: { id?: number | string; imageUrl?: string | null };
  viewType?: "trash" | string;
};

export function ThumbnailCell({
  cellData,
  collectionSlug,
  link,
  linkURL,
  rowData,
  viewType,
}: ThumbnailCellProps) {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();

  const url =
    cellData && typeof cellData === "object"
      ? (cellData.thumbnailURL ?? cellData.url)
      : (rowData?.imageUrl ?? null);

  const thumb = url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="" className="apex-thumb" />
  ) : (
    <span className="apex-thumb apex-thumb--empty" />
  );

  if (!link || (!linkURL && (rowData?.id == null || !collectionSlug))) {
    return thumb;
  }

  const href =
    linkURL ??
    formatAdminURL({
      adminRoute,
      path: `/collections/${collectionSlug}${viewType === "trash" ? "/trash" : ""}/${encodeURIComponent(String(rowData?.id))}`,
    });

  return (
    <Link className="apex-thumb-link" href={href} prefetch={false}>
      {thumb}
    </Link>
  );
}
