"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/ornament";
import { cn } from "@/lib/utils";

type Photo = {
  id: number;
  src: string;
  caption: string;
};

const FRAMES = [
  "md:col-span-8 aspect-[4/5] md:aspect-[3/2]",
  "md:col-span-4 aspect-[4/5] md:aspect-[3/4]",
  "md:col-span-4 aspect-[4/5] md:aspect-[3/4]",
  "md:col-span-8 aspect-[4/5] md:aspect-[3/2]",
  "md:col-span-6 aspect-[4/5] md:aspect-[4/3]",
  "md:col-span-6 aspect-[4/5] md:aspect-[4/3]",
] as const;

function frameClass(index: number) {
  if (index === 0) {
    return "sm:col-span-2 md:col-span-12 aspect-[4/5] md:aspect-[16/9]";
  }
  return FRAMES[(index - 1) % FRAMES.length];
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const STAGE_MS = 700;

function LightboxPhoto({
  photo,
  className,
}: {
  photo: Photo;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={photo.src}
        alt={photo.caption}
        fill
        className="object-contain"
        sizes="90vw"
        priority
      />
    </div>
  );
}

export function GalleryGrid({
  album,
  description,
  index,
  photos,
}: {
  album: string;
  description: string;
  index: number;
  photos: Photo[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [leaving, setLeaving] = useState<Photo | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const stageTimer = useRef<number>(0);
  const active = activeIndex === null ? null : photos[activeIndex];

  function closeLightbox() {
    window.clearTimeout(stageTimer.current);
    setActiveIndex(null);
    setLeaving(null);
    setIsBusy(false);
  }

  function step(delta: 1 | -1) {
    if (isBusy || photos.length < 2 || activeIndex === null) return;
    setIsBusy(true);
    setDirection(delta);
    setLeaving(photos[activeIndex]);
    setActiveIndex((current) =>
      current === null
        ? current
        : (current + delta + photos.length) % photos.length,
    );
    window.clearTimeout(stageTimer.current);
    stageTimer.current = window.setTimeout(() => {
      setLeaving(null);
      setIsBusy(false);
    }, STAGE_MS);
  }

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, isBusy, photos, photos.length]);

  return (
    <section>
      <Reveal>
        <header className="flex flex-col gap-6 pt-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionKicker>{pad(index)}</SectionKicker>
            <h2 className="mt-7 font-serif text-3xl leading-[1.12] sm:mt-8 sm:text-4xl md:text-5xl">
              {album}
            </h2>
            <p className="mt-4 max-w-lg font-serif text-lg text-muted-foreground italic">
              {description}
            </p>
          </div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            {pad(photos.length)} photographs
          </p>
        </header>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:grid-cols-12 md:gap-5">
        {photos.map((item, photoIndex) => (
          <Reveal
            key={item.id}
            delay={Math.min(photoIndex, 5) * 70}
            className={cn("relative", frameClass(photoIndex))}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(photoIndex)}
              className="group absolute inset-0 overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
              aria-label={`View ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 720px"
              />
              <span className="absolute inset-0 bg-graphite/0 transition-colors duration-500 group-hover:bg-graphite/25" />
              <span className="pointer-events-none absolute inset-3 border border-chalk/0 transition-colors duration-500 group-hover:border-chalk/40" />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-graphite/80 via-graphite/30 to-transparent p-5 pt-16 text-left opacity-100 transition-opacity duration-500 md:p-6 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                <span className="mb-3 block h-px w-8 bg-amber" />
                <span className="font-serif text-lg leading-snug text-chalk md:text-xl">
                  {item.caption}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="animate-in fade-in fixed inset-0 z-80 flex flex-col bg-graphite/95 duration-300"
          onClick={closeLightbox}
        >
          <div className="flex items-center justify-between px-5 py-5 md:px-8">
            <p
              key={active.id}
              className="animate-in fade-in duration-700 fill-mode-both text-[11px] tracking-[0.22em] text-amber uppercase"
            >
              {album}
              <span className="mx-3 text-chalk/30">/</span>
              <span className="text-chalk/70">
                {pad((activeIndex ?? 0) + 1)} — {pad(photos.length)}
              </span>
            </p>
            <button
              type="button"
              className="text-chalk/70 transition-colors duration-500 hover:text-chalk"
              aria-label="Close photograph"
              onClick={closeLightbox}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-4 md:px-20">
            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-3 z-10 text-chalk/60 transition-colors duration-500 hover:text-chalk disabled:opacity-40 md:left-8"
                  aria-label="Previous photograph"
                  disabled={isBusy}
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                >
                  <ChevronLeft className="size-8" strokeWidth={1.25} />
                </button>
                <button
                  type="button"
                  className="absolute right-3 z-10 text-chalk/60 transition-colors duration-500 hover:text-chalk disabled:opacity-40 md:right-8"
                  aria-label="Next photograph"
                  disabled={isBusy}
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                >
                  <ChevronRight className="size-8" strokeWidth={1.25} />
                </button>
              </>
            ) : null}

            <div
              className="relative h-full w-full max-w-5xl overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              {leaving ? (
                <LightboxPhoto
                  key={`out-${leaving.id}`}
                  photo={leaving}
                  className={cn(
                    "animate-out fade-out duration-700 fill-mode-forwards ease-[cubic-bezier(0.22,1,0.36,1)]",
                    direction === 1
                      ? "slide-out-to-left-8"
                      : "slide-out-to-right-8",
                  )}
                />
              ) : null}
              <LightboxPhoto
                key={`in-${active.id}`}
                photo={active}
                className={cn(
                  "animate-in fade-in duration-700 fill-mode-both ease-[cubic-bezier(0.22,1,0.36,1)]",
                  leaving
                    ? direction === 1
                      ? "slide-in-from-right-8"
                      : "slide-in-from-left-8"
                    : undefined,
                )}
              />
            </div>
          </div>

          <div
            className="px-5 py-6 text-center md:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="mx-auto mb-4 block h-px w-8 bg-amber" />
            <p
              key={active.id}
              className="animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both font-serif text-xl text-chalk md:text-2xl"
            >
              {active.caption}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
