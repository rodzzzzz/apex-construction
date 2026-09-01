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
      className="sticky top-18 z-40 -mx-5 border-y border-border bg-background/95 backdrop-blur-md md:mx-0"
    >
      <div className="flex gap-6 overflow-x-auto px-5 py-3.5 md:px-0">
        {sections.map((section, index) => (
          <a
            key={section.slug}
            href={`#${section.slug}`}
            className={cn(
              "group relative shrink-0 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300",
              "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="mr-1.5 tabular-nums text-[9px] text-amber/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.name}
            <span
              aria-hidden
              className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
