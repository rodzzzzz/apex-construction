"use client";

import { cn } from "@/lib/utils";

export function AnchorNav({
  sections,
  label,
}: {
  sections: { slug: string; name: string }[];
  label?: string;
}) {
  if (sections.length === 0) return null;

  return (
    <nav
      aria-label={label}
      className="sticky top-[4.5rem] z-40 -mx-5 border-b border-border bg-background/90 backdrop-blur-md md:mx-0"
    >
      <div className="flex gap-6 overflow-x-auto px-5 py-3 md:px-0">
        {sections.map((section) => (
          <a
            key={section.slug}
            href={`#${section.slug}`}
            className={cn(
              "shrink-0 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground transition-colors duration-500 hover:text-foreground",
            )}
          >
            {section.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
