import { cn } from "@/lib/utils";

export function FormPanel({
  kicker,
  title,
  description,
  children,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative border border-amber/45 bg-card p-7 md:p-11",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-px -left-px size-5 border-t-2 border-l-2 border-amber"
      />
      <span
        aria-hidden
        className="absolute -right-px -bottom-px size-5 border-r-2 border-b-2 border-amber"
      />
      <p className="font-mono text-[11px] tracking-[0.24em] text-amber uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold">{title}</h2>
      {description ? (
        <p className="mt-2 mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : (
        <div className="mb-8" />
      )}
      {children}
    </div>
  );
}
