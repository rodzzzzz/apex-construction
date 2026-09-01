"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "rise" | "rise-slow" | "draw-x" | "draw-y";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  rise: "reveal-rise",
  "rise-slow": "reveal-rise-slow",
  "draw-x": "reveal-draw-x",
  "draw-y": "reveal-draw-y",
};

/**
 * Scroll-reveal wrapper with mechanical drafting-table variants.
 * All variants respect prefers-reduced-motion (content shows immediately).
 */
export function Reveal({
  children = null,
  className,
  delay = 0,
  variant = "rise",
  as = "div",
}: {
  children?: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "span" | "li" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced motion: show immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  const typedRef = ref as React.RefObject<HTMLDivElement>;

  return (
    <Tag
      ref={typedRef}
      className={cn(
        isVisible
          ? VARIANT_CLASS[variant]
          : variant === "draw-x"
            ? "scale-x-0 motion-reduce:scale-x-100"
            : variant === "draw-y"
              ? "scale-y-0 motion-reduce:scale-y-100"
              : "opacity-0 motion-reduce:opacity-100",
        className,
      )}
      style={
        isVisible && delay
          ? ({ animationDelay: `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
