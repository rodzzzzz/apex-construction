"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({
  id,
  value,
  min = 1,
  max = 20,
  step = 1,
  onChange,
  disabled,
  labelledBy,
}: {
  id: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  labelledBy?: string;
}) {
  return (
    <div
      id={id}
      role="group"
      aria-labelledby={labelledBy}
      className="flex h-11 items-stretch border border-border"
    >
      <button
        type="button"
        disabled={disabled || value <= min}
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - step))}
        className="flex w-11 items-center justify-center text-muted-foreground transition-colors duration-500 hover:text-foreground disabled:opacity-30"
      >
        <Minus className="size-4" />
      </button>
      <span className="flex flex-1 items-center justify-center text-sm tabular-nums">
        {value.toLocaleString()}
      </span>
      <button
        type="button"
        disabled={disabled || value >= max}
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + step))}
        className="flex w-11 items-center justify-center text-muted-foreground transition-colors duration-500 hover:text-foreground disabled:opacity-30"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  onRemove,
  disabled,
  className,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className="flex size-9 items-center justify-center border border-border transition-colors duration-500 hover:border-amber disabled:opacity-50"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-6 text-center text-sm tabular-nums">{quantity}</span>
      <button
        type="button"
        disabled={disabled}
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="flex size-9 items-center justify-center border border-border transition-colors duration-500 hover:border-amber disabled:opacity-50"
      >
        <Plus className="size-3.5" />
      </button>
      {onRemove ? (
        <button
          type="button"
          disabled={disabled}
          aria-label="Remove"
          onClick={onRemove}
          className="ml-1 text-[11px] tracking-[0.14em] uppercase text-muted-foreground transition-colors duration-500 hover:text-destructive"
        >
          Remove
        </button>
      ) : null}
    </div>
  );
}
