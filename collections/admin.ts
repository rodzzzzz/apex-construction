export const statusCellAdmin = {
  position: "sidebar" as const,
  components: {
    Cell: "/components/admin/status-cell#StatusCell",
  },
};

export const guestRequestAdmin = {
  defaultSort: "-createdAt" as const,
  group: "Leads" as const,
  hideAPIURL: true,
  components: {
    beforeListTable: ["/components/admin/pending-banner#PendingBanner"],
  },
};

export const websiteAdmin = {
  group: "Website" as const,
  hideAPIURL: true,
};

export const accountAdmin = {
  group: "Account" as const,
  hideAPIURL: true,
};

export const inquiryStatusOptions = [
  { label: "New", value: "new" },
  { label: "In progress", value: "in-progress" },
  { label: "Done", value: "done" },
] as const;

export const messageStatusOptions = [
  { label: "Unread", value: "unread" },
  { label: "Seen", value: "seen" },
] as const;
