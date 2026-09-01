"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { QuantityControl } from "@/components/stepper";
import { briefCount, briefTotal, useBrief } from "@/lib/brief";
import { formatUsd } from "@/lib/utils";

export function BriefDrawer() {
  const router = useRouter();
  const { items, isOpen, closeBrief, setQuantity, removeItem } = useBrief();
  const count = briefCount(items);
  const total = briefTotal(items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? null : closeBrief())}>
      <SheetContent className="w-full border-t-2 border-amber sm:max-w-md">
        <SheetHeader>
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-amber">
            Project brief
          </p>
          <SheetTitle>Your brief</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Add services and they will be staged here for your quote request."
              : `${count} ${count === 1 ? "service" : "services"} staged for a detailed estimate.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-lg text-muted-foreground">
              Your brief is empty.
            </p>
          ) : (
            <ul className="grid gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-4 border-b border-border pb-4"
                >
                  <div>
                    <p className="font-serif text-xl font-bold leading-tight">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-amber">
                      from {formatUsd(item.unitPrice)}
                    </p>
                  </div>
                  <QuantityControl
                    quantity={item.quantity}
                    onDecrease={() => setQuantity(item.id, item.quantity - 1)}
                    onIncrease={() => setQuantity(item.id, item.quantity + 1)}
                    onRemove={() => removeItem(item.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <SheetFooter>
          {items.length > 0 ? (
            <>
              <p className="flex items-baseline justify-between font-serif text-2xl font-bold">
                <span>Estimate</span>
                <span className="text-amber">{formatUsd(total)}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                A starting point only — final pricing is set after a site walk.
              </p>
              <Button
                variant="amber"
                className="mt-2 w-full"
                onClick={() => {
                  closeBrief();
                  router.push("/brief");
                }}
              >
                Request quote
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" onClick={closeBrief}>
              <Link href="/services">Browse services</Link>
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
