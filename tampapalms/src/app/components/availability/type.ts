// Shared typings for availability data consumed across the availability page.
export type AvailabilityStatus = "available" | "comingSoon" | "occupied";

export type Suite = {
  id: string;
  label: string;
  building: string;
  size: string;
  status: AvailabilityStatus;
  type: string;
  rate: string;
  description: string;
  features: string[];
  images: { src: string; alt: string }[];
  category: "buildings" | "executive" | "soar";
  brochureHref?: string;
  floorplanHref?: string;
};

export type AvailabilityStats = {
  label: string;
  value: string;
};
