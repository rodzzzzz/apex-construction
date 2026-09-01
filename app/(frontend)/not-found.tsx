import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-28 text-center">
      <p className="font-mono text-[10px] tracking-[0.36em] text-amber uppercase sm:text-[11px] sm:tracking-[0.42em]">
        404
      </p>
      <Ornament className="mt-5 max-w-40 sm:mt-7" />
      <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.1] md:text-7xl">
        Nothing built here
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted-foreground sm:text-xl">
        The page you asked for is not on the site plan.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "amber", size: "lg" }),
          "mt-10",
        )}
      >
        Return home
      </Link>
    </main>
  );
}
