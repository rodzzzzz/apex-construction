"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrief } from "@/lib/brief";

export function AddToBriefButton({
  id,
  name,
  startingAt,
}: {
  id: number;
  name: string;
  startingAt: number;
}) {
  const addItem = useBrief((state) => state.addItem);
  const openBrief = useBrief((state) => state.openBrief);

  return (
    <Button
      variant="amber"
      className="text-xs tracking-[0.2em] uppercase"
      onClick={() => {
        addItem({ id, name, unitPrice: startingAt });
        openBrief();
      }}
    >
      <Plus className="size-3.5" />
      Add to brief
    </Button>
  );
}
