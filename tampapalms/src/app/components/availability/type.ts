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
  category: "Office" | "Exec" | "SOAR";
  brochureHref?: string;
  floorplanHref?: string;
};


export type Building = {
  building_id: string,
  building_number: number,
  street_address: string,
  suite_number: string,
  floor_count: number,
  office_type: string,
  rental_sq_ft: number,
  lease_term: string,
  space_use: string,
  price: string,
  availability_status: string | null,
  owned_leased: string,
  offices_count: number,
  bathrooms_count: string,

  // NEED PLACEHOLDER DATA FOR THESE FIELDS
  images: Array<{ src: string; alt: string }>;
  features: string[];
  description: string;
  category: "buildings" | "executive" | "soar";
  brochureHref?: string;
};

export type AvailabilityStats = {
  label: string;
  value: string;
};
