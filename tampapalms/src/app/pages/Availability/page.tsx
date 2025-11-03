"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SpacesCard from "@/app/components/availability/explore_spaces/SpacesCard";
import TitleCard from "@/app/components/TitleCard";
import Spacer from "@/app/components/Spacer";

import { AvailabilityHero } from "@/app/components/availability/AvailabilityHero";
import { SuiteDetails } from "@/app/components/availability/SuiteDetails";
import { SuiteGallery } from "@/app/components/availability/SuiteGallery";
import { SuiteFloorPlan } from "@/app/components/availability/SuiteFloorPlan";
import { SuiteList } from "@/app/components/availability/SuiteList";
import { BuildingList } from "@/app/components/availability/BuildingList";
import type { Suite, Building } from "@/app/components/availability/type";
import axios from "axios";

type AvailabilityStatus = "available" | "comingSoon" | "occupied";

// 1. Status Normalization
const normalizeStatus = (
  rawStatus: string | null | undefined
): AvailabilityStatus => {
  if (!rawStatus) return "occupied";
  const status = rawStatus.toLowerCase().trim();
  if (status === "available") return "available";
  return "occupied"; // Default to occupied/waitlisted for all other values
};

// 2. Status Map (Needs to be defined or imported for the status badge logic)
const statusMap: Record<
  AvailabilityStatus,
  { label: string; className: string }
> = {
  available: {
    label: "Available",
    className: "bg-emerald-100 text-emerald-700",
  },
  comingSoon: {
    label: "Coming Soon",
    className: "bg-slate-100 text-slate-700",
  },
  occupied: { label: "Waitlisted", className: "bg-slate-100 text-slate-600" },
};

// Suite catalog used to drive the availability page content.
// const suites: Suite[] = [
//   {
//     id: "ste-105",
//     label: "Suite 105",
//     building: "Primrose Lake Circle",
//     size: "354 SF",
//     status: "available",
//     type: "Executive Suite",
//     rate: "By Request",
//     description:
//       "Corner suite with floor-to-ceiling windows, reception area, four private offices, and a conference room ready for hybrid teams.",
//     features: [
//       "Fully wired for Frontier Smart Park/Fios",
//       "Dedicated break area with sink and cabinetry",
//       "Near main lobby and visitor parking",
//     ],
//     images: [
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-5-LargeHighDefinition.jpg",
//         alt: "Executive desk with natural light",
//       },
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-4-LargeHighDefinition.jpg",
//         alt: "Shared breakout seating",
//       },
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
//         alt: "Exterior of Primrose Lake Circle",
//       },
//     ],
//     category: "Exec",
//     brochureHref: "/documents/tppc-suite-101.pdf",
//   },
//   {
//     id: "ste-107",
//     label: "Suite 107",
//     building: "Primrose Lake Circle",
//     size: "274 SF",
//     status: "available",
//     type: "Executive Suite",
//     rate: "By Request",
//     description:
//       "Corner suite with floor-to-ceiling windows, reception area, four private offices, and a conference room ready for hybrid teams.",
//     features: [
//       "Fully wired for Frontier Smart Park/Fios",
//       "Dedicated break area with sink and cabinetry",
//       "Near main lobby and visitor parking",
//     ],
//     images: [
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-11-LargeHighDefinition.jpg",
//         alt: "Executive desk with natural light",
//       },
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-4-LargeHighDefinition.jpg",
//         alt: "Shared breakout seating",
//       },
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
//         alt: "Exterior of Primrose Lake Circle",
//       },
//     ],
//     category: "Exec",
//     brochureHref: "/documents/tppc-suite-101.pdf",
//   },
//   {
//     id: "ste-119",
//     label: "Suite 119",
//     building: "Primrose Lake Circle",
//     size: "323 SF",
//     status: "available",
//     type: "Executive Suite",
//     rate: "By Request",
//     description:
//       "Bright second-floor suite ideal for professional services. Includes a reception zone, two private offices, and generous storage.",
//     features: [
//       "Glass sidelights for natural light",
//       "Shared conference room access on floor",
//       "Steps from the elevator core",
//     ],
//     images: [
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-6-LargeHighDefinition.jpg",
//         alt: "Executive desk with natural light",
//       },
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-4-LargeHighDefinition.jpg",
//         alt: "Shared breakout seating",
//       },
//       {
//         src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
//         alt: "Exterior of Primrose Lake Circle",
//       },
//     ],
//     category: "Exec",
//     brochureHref: "/documents/tppc-suite-220.pdf",
//   },
//   {
//     id: "ste-101",
//     label: "Suite 101",
//     building: "Bridge Hill Court",
//     size: "1974 SF",
//     status: "occupied",
//     type: "Building/Suites",
//     rate: "Join Waitlist",
//     description:
//       "Functional flex office currently committed. Join the waitlist for the next availability in this configuration.",
//     features: [
//       "Private office with open work bay",
//       "Shared lounge & kitchenette access",
//       "Proximity to wellness trail and campus amenities",
//     ],
//     images: [
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-14-LargeHighDefinition.jpg",
//         alt: "Indoor Office Picture",
//       },
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-15-LargeHighDefinition.jpg",
//         alt: "Workstations inside Suite 305",
//       },
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-16-LargeHighDefinition.jpg",
//         alt: "Kitchenette inside suite",
//       },
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-10-LargeHighDefinition.jpg",
//         alt: "Bridge Hill Court exterior angle",
//       },
//     ],
//     category: "Office",
//   },
//   {
//     id: "ste-111",
//     label: "Suite 111",
//     building: "Cublicle 111",
//     size: "100 SF",
//     status: "available",
//     type: "SOAR",
//     rate: "Upon Request",
//     description:
//       "Functional flex office currently committed. Join the waitlist for the next availability in this configuration.",
//     features: [
//       "Private office with open work bay",
//       "Shared lounge & kitchenette access",
//       "Proximity to wellness trail and campus amenities",
//     ],
//     images: [
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-14-LargeHighDefinition.jpg",
//         alt: "Indoor Office Picture",
//       },
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-15-LargeHighDefinition.jpg",
//         alt: "Workstations inside Suite 305",
//       },
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-16-LargeHighDefinition.jpg",
//         alt: "Kitchenette inside suite",
//       },
//       {
//         src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-10-LargeHighDefinition.jpg",
//         alt: "Bridge Hill Court exterior angle",
//       },
//     ],
//     category: "SOAR",
//   },
// ];

const buildingFilterOptions: Array<{ label: string; value: "Office" | "Exec" | "SOAR" }> = [
  { label: "Buildings/Suites", value: "Office" },
  { label: "Executive Suites", value: "Exec" },
  { label: "SOAR", value: "SOAR"}
];

// // Marketing blurbs featured near the bottom of the page.
// const campusHighlights = [
//   {
//     title: "Executive Offices",
//     description: "Private, move-in-ready suites for professionals seeking a polished home base.",
//   },
//   {
//     title: "Team Suites",
//     description: "Flexible layouts with space for collaboration, branding, and visitors.",
//   },
//   {
//     title: "Campus Amenities",
//     description: "Complimentary parking, fiber connectivity, and responsive on-site ownership.",
//   },
// ];

const defaultImages = [
  { src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-10-LargeHighDefinition.jpg", alt: "Modern executive office interior" },
  { src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-5-LargeHighDefinition.jpg", alt: "Executive desk with natural light" },
];
  

export default function AvailabilityPage() {
  // UI state for the currently active suite, gallery image, and category filter.
  const [activeBuildingId, setActiveBuildingId] = useState<Building["building_id"]>("");
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<"Office" | "Exec" | "SOAR">("Office");

  useEffect(() => {
    async function fetchBuildings() {
      try {
        const response = await axios.get('/api/buildings');
        const rawBuildings = response.data || [];
        const normalizedBuildings: Building[] = rawBuildings.map((b: any) => ({
          ...b,
          // Add ID/Label fields required by the old component structure
          id: b.building_id,
          label: b.street_address,
          size: `${b.rental_sq_ft} SF`,
          status: normalizeStatus(b.availability_status),

          // Placeholder/Default fields for UI
          images: defaultImages,
          features:
            b.office_type === "Exec" ? executiveFeatures : officeFeatures,
          description: "Placeholder description for " + b.street_address,
          category:
            b.office_type === "Exec"
              ? "Exec"
              : b.office_type === "SOAR"
              ? "SOAR"
              : "Office",
          brochureHref: undefined,
          floorplanHref: undefined,
        }));
        setBuildings(normalizedBuildings);

        // if normalize buildings exist, set the active building to the first one
        if (normalizedBuildings.length > 0) {
          setActiveBuildingId(normalizedBuildings[0].building_id);
        }
      } catch (error) {
        console.error("Error loading buildings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBuildings();
  }, []);

  // Grab the suites that match the selected tab.
  const filteredBuildings = useMemo(
    () => buildings.filter((building) => building.category === selectedCategory),
    [selectedCategory, buildings]
  );

  // Fall back to the full list if a category has no entries yet.
  const visibleBuildings = filteredBuildings.length ? filteredBuildings : buildings;

  // Resolve the full suite record backing the current selection.
  const activeBuilding = useMemo(
    () => visibleBuildings.find((building) => building.building_id === activeBuildingId) ?? visibleBuildings[0],
    [activeBuildingId, visibleBuildings],
  );

  const images = activeBuilding?.images ?? defaultImages;

  // Keep selections in sync when the visible suites set changes (e.g., new filter).
  useEffect(() => {
    if (!visibleBuildings.some((building) => building.building_id === activeBuildingId)) {
      const fallback = visibleBuildings[0]?.building_id ?? "";
      setActiveBuildingId(fallback);
      setActiveImageIndex(0);
    }
  }, [visibleBuildings, activeBuildingId]);

  // User interactions that update the active category or suite.
  const handleCategoryChange = (category: "Office" | "Exec" | "SOAR") => {
    setSelectedCategory(category);
  };

  const handleBuildingSelect = (id: string) => {
    setActiveBuildingId(id);
    setActiveImageIndex(0);
  };

  const officeFeatures = [
    "Ideal for teams and businesses",
    "Multiple office configurations",
    "Entire suites available for lease",
  ];

  const executiveFeatures = [
    "Perfect for individual professionals",
    "Single, private office spaces",
    "Flexible agreements available",
  ];


  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* Introduces the page and reports total availability. */}
      <AvailabilityHero
        availableCount={
          buildings.filter(
            (building) =>
              building.availability_status?.trim().toLowerCase() === "available"
          ).length
        }
      />

      <section className="mx-auto max-w-6xl px-4 pb-20">
        {/* Category toggle pills. */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex rounded-full border border-slate-200 bg-white p-1">
            {buildingFilterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleCategoryChange(option.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  selectedCategory === option.value
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Core layout: list + gallery + supporting details. */}
        <div className="grid auto-rows-fr items-stretch gap-8 lg:grid-cols-3">
          <div className="h-full">
            < BuildingList loading={loading} visibleBuildings={visibleBuildings} activeBuildingId={activeBuildingId} normalizeStatus={normalizeStatus} onSelectBuilding={handleBuildingSelect}/>
          </div>
          {/* <div className="h-full">
            {activeSuite && <SuiteDetails suite={activeSuite} />}
          </div> */}
          {/* <div className="h-full">
            <SuiteGallery
              images={images}
              activeImageIndex={activeImageIndex}
              onPrev={() => {
                if (!images.length) return;
                setActiveImageIndex(
                  (prev) => (prev - 1 + images.length) % images.length
                );
              }}
              onNext={() => {
                if (!images.length) return;
                setActiveImageIndex((prev) => (prev + 1) % images.length);
              }}
              onSelectImage={setActiveImageIndex}
              suiteLabel={activeSuite?.label}
            />
          </div> */}
        </div>

        {/* Detail panels for the selected suite. */}
        {/* <div className="mt-12 w-full">
          
        </div> */}
        <div className="mt-12 w-[80dvw] mx-auto">
          <SuiteFloorPlan />
        </div>
      </section>

      {/* Explore Spaces container */}
      <div className="rounded-xl my-16 md:my-24 mx-8 bg-gray-50">
        <div className="text-center my-16 md:my-24">
          {/* The "eyebrow" text adds a touch of color and context */}
          <p className="text-sm font-semibold  uppercase tracking-wider">
            Our Properties
          </p>
          <TitleCard title="Explore Spaces" />
        </div>
        <div className="w-full flex md:flex-row flex-col justify-center gap-8">
          <SpacesCard
            title="Buildings/Suites"
            imageUrl="/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-11-LargeHighDefinition.jpg"
            href="https://www.loopnet.com/Listing/17425-Bridge-Hill-Ct-Tampa-FL/31448652/"
            features={officeFeatures}
          />
          <SpacesCard
            title="Executive Suites"
            imageUrl="/images/5331/5331-ExploreSpacesCardImage.jpg"
            href="https://www.loopnet.com/Listing/5331-Primrose-Lake-Cir-Tampa-FL/4151894/"
            features={executiveFeatures}
          />
        </div>
      </div>
    </main>
  );
}
