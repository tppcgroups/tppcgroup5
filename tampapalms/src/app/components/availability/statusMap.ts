import type { AvailabilityStatus } from "./type";

// Central lookup for availability status labels and their badge styling.
// Dark-mode variants ensure badges stay readable against light pill backgrounds.
export const statusMap: Record<AvailabilityStatus, { label: string; className: string }> = {
  available: {
    label: "Available",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-[#3f3f3f] dark:text-white",
  },
  comingSoon: {
    label: "Available Soon",
    className:
      "bg-[#f4ece1] text-[#4a4034] dark:bg-[#3f3f3f] dark:text-white",
  },
  occupied: {
    label: "Occupied",
    className:
      "bg-neutral-200 text-neutral-700 dark:bg-[#3f3f3f] dark:text-white",
  },
};

export const normalizeAvailabilityStatus = (
  rawStatus: string | null | undefined
): AvailabilityStatus => {
  if (!rawStatus) {
    return "comingSoon";
  }

  const normalized = rawStatus.toLowerCase().trim().replace(/\s+/g, "_");
  if (normalized === "available") {
    return "available";
  }

  // Treat any non-available value as "Available Soon" for the UI.
  return "comingSoon";
}
