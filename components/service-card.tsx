"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatUsd, mediaUrl, cn } from "@/lib/utils";
import { useBrief } from "@/lib/brief";
import type { Media, Service } from "@/payload-types";
import { PLACEHOLDER_IMAGES } from "@/lib/brand";

const TAG_LABELS: Record<NonNullable<Service["tags"]>[number], string> = {
  licensed: "Licensed",
  insured: "Insured",
  permits: "Permit handling",
  warranty: "Warranty",
  sustainable: "Sustainable",
  "fast-track": "Fast-track",
};

export function ServiceCard({
  item,
  showBrief = true,
  editorial = false,
  linked = false,
}: {
  item: Service;
  showBrief?: boolean;
  editorial?: boolean;
  linked?: boolean;
}) {
  const addItem = useBrief((state) => state.addItem);
  const openBrief = useBrief((state) => state.openBrief);
  const photo =
    mediaUrl(item.photo as Media | number | null, item.imageUrl) ||
    PLACEHOLDER_IMAGES.service;
  const tags = item.tags ?? [];
  const canQuote = showBrief && item.quoteable && item.acceptingProjects;
  const isUnavailable = showBrief && item.quoteable && !item.acceptingProjects;
  const serviceHref = `/services/${item.slug}`;

  const body = (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden bg-card",
        editorial
          ? "bg-transparent"
          : "border border-border/80 bg-transparent transition-colors duration-500 hover:border-amber/40",
      )}
    >
      <div className="relative aspect-4/3 shrink-0 overflow-hidden">
        <Image
          src={photo}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-graphite/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-3 border border-chalk/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {linked ? (
          <span className="absolute top-3 right-3 inline-flex size-8 items-center justify-center bg-graphite/80 text-chalk opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        ) : null}
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          editorial ? "gap-2 pt-5" : "gap-3 p-5",
        )}
      >
        <header className="flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 font-serif text-2xl font-bold leading-tight text-foreground">
            {item.name}
          </h3>
          <p className="shrink-0 pt-1.5 text-sm tabular-nums tracking-wide text-amber">
            from {formatUsd(item.startingAt)}
          </p>
        </header>

        <p
          className={cn(
            "line-clamp-3 flex-1 leading-relaxed text-muted-foreground",
            editorial ? "text-[15px]" : "text-sm",
          )}
        >
          {item.description}
        </p>

        {editorial ? null : (
          <div className="mt-auto flex flex-col justify-end gap-3">
            <div className="flex min-h-6 flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
                >
                  {TAG_LABELS[tag]}
                </span>
              ))}
            </div>

            {canQuote ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-amber/40 text-foreground hover:border-amber hover:bg-amber hover:text-graphite"
                  onClick={() => {
                    addItem({
                      id: item.id,
                      name: item.name,
                      unitPrice: item.startingAt,
                    });
                    openBrief();
                  }}
                >
                  <Plus className="size-3.5" />
                  Add to brief
                </Button>
                {linked ? (
                  <Button asChild variant="ghost" size="sm" className="flex-1">
                    <Link href={serviceHref}>Details</Link>
                  </Button>
                ) : null}
              </div>
            ) : isUnavailable ? (
              <p className="flex h-9 items-center border-t border-border font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                Currently booked out
              </p>
            ) : linked ? (
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href={serviceHref}>View details</Link>
              </Button>
            ) : (
              <div className="h-9" aria-hidden />
            )}
          </div>
        )}
      </div>
    </article>
  );

  if (editorial) {
    return body;
  }

  return body;
}
