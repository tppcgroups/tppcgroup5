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
    label: "Coming Soon",
    className:
      "bg-[#f4ece1] text-[#4a4034] dark:bg-[#3f3f3f] dark:text-white",
  },
  occupied: {
    label: "Available Soon",
    className:
      "bg-[#f4ece1] text-[#7a6754] dark:bg-[#3f3f3f] dark:text-white",
  },
};

export const normalizeAvailabilityStatus = (
  rawStatus: string | null | undefined
): AvailabilityStatus => {
  if (!rawStatus) {
    return "occupied";
  }

  const normalized = rawStatus.toLowerCase().trim();
  if (normalized === 'available') {
    return "available";
  }

  return "occupied";
}
