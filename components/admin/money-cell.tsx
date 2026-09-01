import { formatUsd } from "@/lib/staff";

export function MoneyCell({ cellData }: { cellData?: number | null }) {
  if (cellData == null || Number.isNaN(cellData)) return null;

  return <span className="apex-money">{formatUsd(cellData)}</span>;
}
