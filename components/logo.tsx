import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-serif text-lg font-bold tracking-[0.14em] uppercase text-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative inline-flex size-7 items-center justify-center"
      >
        <svg viewBox="0 0 32 32" fill="none" className="size-7">
          <path
            d="M16 3 L26 27 L21.5 27 L16 14.5 L10.5 27 L6 27 Z"
            className="fill-amber transition-colors duration-500"
          />
          <path
            d="M12.8 21.5 L19.2 21.5 L20.6 25 L11.4 25 Z"
            className="fill-foreground"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="block">Apex</span>
        <span className="block text-[8px] font-normal tracking-[0.34em] text-muted-foreground transition-colors duration-500 group-hover:text-amber">
          {compact ? "AC" : "Construction"}
        </span>
      </span>
    </Link>
  );
}
