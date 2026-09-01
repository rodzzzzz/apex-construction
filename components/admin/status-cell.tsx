"use client";

import { useState } from "react";
import { toast, useListQuery } from "@payloadcms/ui";

const LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  new: "New",
  reviewing: "Reviewing",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
  "in-progress": "In progress",
  done: "Done",
  unread: "Unread",
  seen: "Seen",
};

const FALLBACK_OPTIONS: Record<string, { label: string; value: string }[]> = {
  consultations: [
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Cancelled", value: "cancelled" },
  ],
  "quote-requests": [
    { label: "New", value: "new" },
    { label: "Reviewing", value: "reviewing" },
    { label: "Quoted", value: "quoted" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
  ],
  "project-inquiries": [
    { label: "New", value: "new" },
    { label: "In progress", value: "in-progress" },
    { label: "Done", value: "done" },
  ],
  "contact-messages": [
    { label: "Unread", value: "unread" },
    { label: "Seen", value: "seen" },
  ],
};

type StatusCellProps = {
  cellData?: string | null;
  collectionSlug?: string;
  rowData?: { id?: number | string };
  field?: { options?: { label: string; value: string }[] };
};

export function StatusCell({
  cellData,
  collectionSlug,
  rowData,
  field,
}: StatusCellProps) {
  const { refineListData, query } = useListQuery();
  const [value, setValue] = useState(cellData ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const options =
    field?.options && field.options.length > 0
      ? field.options
      : (FALLBACK_OPTIONS[collectionSlug ?? ""] ?? []);

  if (!value || !collectionSlug || rowData?.id == null) {
    return value ? (
      <span className={`apex-status apex-status--${value}`}>
        {LABELS[value] ?? value}
      </span>
    ) : null;
  }

  const onChange = async (next: string) => {
    const previous = value;
    setValue(next);
    setIsSaving(true);
    try {
      const response = await fetch(`/api/${collectionSlug}/${rowData.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!response.ok) {
        throw new Error("Could not update status.");
      }
      toast.success("Status updated");
      await refineListData({ ...query });
    } catch {
      setValue(previous);
      toast.error("Could not update status.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <span
      className={`apex-status-wrap apex-status--${value}`}
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <select
        className="apex-status-select"
        value={value}
        disabled={isSaving}
        aria-label="Update status"
        onChange={(event) => {
          void onChange(event.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  );
}
