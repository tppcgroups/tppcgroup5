import type { AvailabilityStatus } from "./type";

export const statusMap: Record<AvailabilityStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-emerald-100 text-emerald-700" },
  comingSoon: { label: "Coming Soon", className: "bg-slate-100 text-slate-700" },
  occupied: { label: "Waitlisted", className: "bg-slate-100 text-slate-600" },
};
