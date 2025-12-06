import type { AvailabilityStatus } from "./type";

// Central lookup for availability status labels and their badge styling.
export const statusMap: Record<AvailabilityStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-emerald-100 text-emerald-700" },
  comingSoon: { label: "Coming Soon", className: "bg-[#f4ece1] text-[#4a4034]" },
  occupied: { label: "Available Soon", className: "bg-[#f4ece1] text-[#7a6754]" },
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