import { formatClockTime, formatAustinDay } from "@/lib/dates";

export function DatetimeCell({
  cellData,
  rowData,
}: {
  cellData?: string | null;
  rowData?: { time?: string | null };
}) {
  if (!cellData) return null;

  const time = rowData?.time;

  return (
    <span className="apex-datetime">
      <span>{formatAustinDay(cellData)}</span>
      {time ? (
        <span className="apex-datetime__time">{formatClockTime(time)}</span>
      ) : null}
    </span>
  );
}
