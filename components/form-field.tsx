import { Ornament } from "@/components/ornament";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Field({
  id,
  label,
  error,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-amber"> *</span> : null}
        {optional ? (
          <span className="ml-1 font-mono text-[10px] font-normal tracking-normal text-muted-foreground/70 normal-case">
            optional
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function fieldControlProps(id: string, error?: string) {
  return {
    id,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

export function FormSuccess({
  title,
  children,
  onReset,
  resetLabel,
}: {
  title: string;
  children: React.ReactNode;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 border border-amber/40 bg-card p-8 duration-700",
      )}
      role="status"
    >
      <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-amber">
        Received
      </p>
      <Ornament className="mt-5 max-w-24" />
      <h2 className="mt-5 font-serif text-3xl font-bold">{title}</h2>
      <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex h-11 items-center border border-border px-5 text-sm tracking-wide transition-colors duration-500 hover:border-amber"
      >
        {resetLabel}
      </button>
    </div>
  );
}
