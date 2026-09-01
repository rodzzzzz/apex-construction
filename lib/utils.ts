import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function mediaUrl(
  media: { url?: string | null } | number | null | undefined,
  fallback?: string | null,
) {
  if (media && typeof media === "object" && media.url) {
    return media.url;
  }
  return fallback || null;
}
