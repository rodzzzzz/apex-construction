"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type FaqEntry = {
  question: string;
  answer: string;
};

/**
 * Accessible FAQ accordion. Answers stay in the DOM (visible to crawlers,
 * matching the FAQPage JSON-LD) and expand via grid-template-rows 0fr→1fr.
 */
export function FaqAccordion({
  faqs,
  light = false,
  numbered = true,
}: {
  faqs: readonly FaqEntry[];
  light?: boolean;
  numbered?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-0">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <Reveal
            key={faq.question}
            delay={Math.min(index, 4) * 60}
            className={cn(
              "border-t",
              light ? "border-chalk/15" : "border-amber/30",
              index === faqs.length - 1 && "border-b",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "group flex w-full items-start gap-5 py-7 text-left",
                  light ? "text-chalk" : "text-foreground",
                )}
              >
                {numbered ? (
                  <span
                    className={cn(
                      "pt-1 font-mono text-[11px] tracking-[0.22em] text-amber uppercase",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "flex-1 font-serif text-xl font-bold leading-snug transition-colors duration-300 md:text-2xl",
                    !isOpen &&
                      (light
                        ? "group-hover:text-amber"
                        : "group-hover:text-amber"),
                  )}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex size-9 shrink-0 items-center justify-center border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-amber bg-amber text-graphite"
                      : light
                        ? "border-chalk/25 text-chalk/70 group-hover:border-amber group-hover:text-amber"
                        : "border-border text-muted-foreground group-hover:border-amber group-hover:text-amber",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "pb-8 text-base leading-[1.8] md:text-lg",
                    numbered && "pl-0 md:pl-[3.4rem]",
                    light ? "text-chalk/65" : "text-muted-foreground",
                  )}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
