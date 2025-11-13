"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SpacesCard from "@/app/components/availability/explore_spaces/SpacesCard";
import TitleCard from "@/app/components/TitleCard";
import { AvailabilityHero } from "@/app/components/availability/AvailabilityHero";
import { BuildingList } from "@/app/components/availability/BuildingList";
import type { Building } from "@/app/components/availability/type";
import axios from "axios";
import { BuildingDetails } from "@/app/components/availability/BuildingDetails";
import BuildingPhotos from "@/app/components/availability/BuildingPhotos";
import { useSearchParams } from "next/navigation";
import { CampusGroundMap } from "@/app/components/availability/CampusGroundMap";

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

const buildingFilterOptions: Array<{
  label: string;
  value: "Office" | "Exec" | "SOAR";
}> = [
  { label: "Buildings/Suites", value: "Office" },
  { label: "Executive Suites", value: "Exec" },
  { label: "SOAR", value: "SOAR" },
];

const defaultImages = [
  {
    src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-10-LargeHighDefinition.jpg",
    alt: "Modern executive office interior",
  },
  {
    src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-5-LargeHighDefinition.jpg",
    alt: "Executive desk with natural light",
  },
  { src: "/images/TPPC-002.jpg", alt: "Entry Sign" },
  {
    src: "/images/TPPC-Entry-002.jpg",
    alt: "Overhead picture of campus entry",
  },
];

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



export default function AvailabilityPage() {
  // UI state for the currently active suite, gallery image, and category filter.
  const [activeBuildingId, setActiveBuildingId] =
    useState<Building["building_id"]>("");
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    "Office" | "Exec" | "SOAR"
  >("Office");
  const [activeBuildingImages, setActiveBuildingImages] =
    useState<Array<{ src: string; alt: string }>>(defaultImages);
  const [globalImageMap, setGlobalImageMap] = useState<{
    [key: string]: string[];
  }>({});
  const detailSectionRef = useRef<HTMLDivElement | null>(null);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);
  const [mapHeight, setMapHeight] = useState<number | null>(null);
  const scrollToDetails = useCallback(() => {
    if (!detailSectionRef.current) return;
    const targetTop = detailSectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetTop - 140,
      behavior: "smooth",
    });
  }, []);

  const searchParams = useSearchParams();
  const initialSpaceId = searchParams.get("spaceId");
  // Add this helper function somewhere accessible if the direct building_id is wrong
  const createSpaceKey = (id: string) => {
    // This regex attempts to find '5-118' and map it to 'Bldg5-Suite118'
    const match = id.match(/^(\d+-\w+)$/);
    if (match) {
      // Assuming the number before the dash is the building number, and the number after is the suite number
      const parts = id.split("-");
      if (parts.length === 2) {
        // E.g., '5-118' becomes 'Bldg5-Suite118'
        return `Bldg${parts[0]}-Suite${parts[1]}`;
      }
    }
    return id; // Return the original ID if it doesn't match the pattern
  };

  // Helper to extract base building key from spaceId
  const getBaseBuildingKey = (spaceId: string): string | null => {
    // Matches 'BldgX', where X is a number, even if followed by a dash.
    const match = spaceId.match(/^(Bldg\d+)/);
    return match ? match[1] : null;
  };

  // Function to handle image resolution (moved outside of effects)
  const updateActiveImages = useCallback((
    activeBuilding: Building | undefined,
    imageMap: { [key: string]: string[] }
  ) => {
    if (!activeBuilding) {
      setActiveBuildingImages(defaultImages);
      return;
    }

    const rawSpaceId = activeBuilding.building_id;


    const specificSpacekey = createSpaceKey(rawSpaceId);
    const baseBuildKey = getBaseBuildingKey(specificSpacekey);

    const sharedSuiteKey = baseBuildKey ? `${baseBuildKey}-SS` : null;

    let newImagePaths: string[] | undefined;
    let usedKey = "";

    // Priority 1: Specific Suite Images
    if (imageMap[specificSpacekey]) {
      newImagePaths = imageMap[specificSpacekey];
      usedKey = specificSpacekey;
    }

    // Check for shared suite images
    else if (sharedSuiteKey && imageMap[sharedSuiteKey]) {
      newImagePaths = imageMap[sharedSuiteKey];
      usedKey = sharedSuiteKey;
    }

    // Check for base building images
    else if (baseBuildKey && imageMap[baseBuildKey]) {
      newImagePaths = imageMap[baseBuildKey];
      usedKey = baseBuildKey;
    }

    // Logic for always grabbing an exterior image
    const exteriorPaths =
      baseBuildKey && imageMap[baseBuildKey] ? imageMap[baseBuildKey] : [];

    const finalImages: Array<{ src: string; alt: string }> = [];

    console.log("Used image key:", usedKey);

    if (exteriorPaths.length > 0) {
      const exteriorImage = {
        src: exteriorPaths[0], // Grab ONLY the first exterior image
        alt: `${activeBuilding.street_address} exterior image`,
      };
      finalImages.push(exteriorImage);
    }

    if (newImagePaths && newImagePaths.length > 0) {
      let startIndex = 0;
      if (usedKey === baseBuildKey && finalImages.length > 0) {
        startIndex = 1;
      }
      const interiorImages = newImagePaths.slice(startIndex).map((path) => ({
        src: path,
        alt: `${activeBuilding.street_address} interior image (${usedKey})`,
      }));

      finalImages.push(...interiorImages);
      console.log("These are the final images for this suite", finalImages);
      setActiveBuildingImages(interiorImages.length > 0 ? finalImages : defaultImages);
      console.log("LOG 1: Setting new images for:", usedKey);
    } else {
      setActiveBuildingImages(defaultImages);
      console.log(
        "LOG 2: No specific images found for:",
        specificSpacekey,
        "Falling back to defaults. Checked keys:",
        {
          specific: specificSpacekey,
          shared: sharedSuiteKey,
          base: baseBuildKey,
        }
      );
    }
    setActiveImageIndex(0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof ResizeObserver === "undefined") {
      return;
    }
    if (!mapSectionRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setMapHeight(entry.contentRect.height);
    });
    observer.observe(mapSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchBuildings() {
      try {
        const response = await axios.get("/api/buildings");
        const rawBuildings = (response.data ?? []) as Building[];
        const normalizedBuildings: Building[] = rawBuildings.map((b) => ({
          ...b,
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
        }));

        // Sorting logic
        const availableSpaces = normalizedBuildings.filter(
          (b) => normalizeStatus(b.availability_status) === "available"
        );
        const occupiedSpaces = normalizedBuildings.filter(
          (b) => normalizeStatus(b.availability_status) !== "available"
        );
        const finalBuildings = [...availableSpaces, ...occupiedSpaces];

        setBuildings(finalBuildings);

        // Fetch Image Map
        const mapResponse = await axios.get("/api/image-map");
        const fetchedImageMap = mapResponse.data;
        setGlobalImageMap(fetchedImageMap); // Set map state

        let targetId = finalBuildings[0]?.building_id ?? "";

        if (initialSpaceId) {
          targetId = initialSpaceId;
        }

        // Set initial active building and trigger image update immediately
        let initialActiveBuilding: Building | undefined = undefined;

        if (targetId) {
          setActiveBuildingId(targetId);
          initialActiveBuilding = finalBuildings.find(b => b.building_id === targetId);
        }

        if (initialActiveBuilding) {
          updateActiveImages(initialActiveBuilding, fetchedImageMap);
        } else if (finalBuildings.length > 0) {
          updateActiveImages(finalBuildings[0], fetchedImageMap);
        }
      } catch (error) {
        console.error("Error loading buildings:", error);
        setGlobalImageMap({}); // Set empty map on error to prevent undefined issues
      } finally {
        setLoading(false);
      }
    }
    
    if (initialSpaceId !== null || buildings.length === 0) {
      fetchBuildings();
    }
    
  }, [initialSpaceId, buildings.length, updateActiveImages]); // Runs once on mount

  // Grab the suites that match the selected tab.
  const filteredBuildings = useMemo(
    () =>
      buildings.filter((building) => building.category === selectedCategory),
    [selectedCategory, buildings]
  );

  // Fall back to the full list if a category has no entries yet.
  const visibleBuildings = filteredBuildings.length
    ? filteredBuildings
    : buildings;

  // Resolve the full suite record backing the current selection.
  const activeBuilding = useMemo(
    () =>
      visibleBuildings.find(
        (building) => building.building_id === activeBuildingId
      ) ?? visibleBuildings[0],
    [activeBuildingId, visibleBuildings]
  );

  // Image Update useEffect (Handles initial load and filter/category changes)
  // NOTE: User clicks are now handled by handleBuildingSelect
  useEffect(() => {
    if (activeBuilding) {
      // This runs if activeBuilding changes due to category filter change
      updateActiveImages(activeBuilding, globalImageMap);
    }
    // Dependency array relies on activeBuilding and globalImageMap state
  }, [activeBuilding, globalImageMap, updateActiveImages]);

  // Keep selections in sync when the visible suites set changes (e.g., new filter).
  useEffect(() => {
    if (
      !visibleBuildings.some(
        (building) => building.building_id === activeBuildingId
      )
    ) {
      const fallback = visibleBuildings[0]?.building_id ?? "";
      setActiveBuildingId(fallback);
      setActiveImageIndex(0);
    }
  }, [visibleBuildings, activeBuildingId]);

  // User interactions that update the active category or suite.
  const handleCategoryChange = (category: "Office" | "Exec" | "SOAR") => {
    setSelectedCategory(category);
  };

  // pCRITICAL FIX: Resolve building and update images synchronously on click
  const handleBuildingSelect = (id: string) => {
    setActiveBuildingId(id);
    setActiveImageIndex(0);

    // 1. Find the selected building object using the most recent visible list
    const selectedBuilding = visibleBuildings.find((b) => b.building_id === id);

    // 2. Immediately call the image update logic with the resolved object
    if (selectedBuilding) {
      updateActiveImages(selectedBuilding, globalImageMap);
    } else {
      setActiveBuildingImages(defaultImages);
    }

    scrollToDetails();
  };

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

        <div className="flex flex-col gap-12">
          {/* Ground map + suite list */}
          <div className="grid gap-8 lg:grid-cols-6">
            <div ref={mapSectionRef} className="lg:col-span-3">
              <CampusGroundMap />
            </div>
            <div
              className="lg:col-span-3"
              style={
                mapHeight
                  ? {
                      minHeight: mapHeight,
                      height: mapHeight,
                    }
                  : undefined
              }
            >
              <BuildingList
                loading={loading}
                visibleBuildings={visibleBuildings}
                activeBuildingId={activeBuildingId}
                normalizeStatus={normalizeStatus}
                onSelectBuilding={handleBuildingSelect}
              />
            </div>
          </div>

          {/* Imagery + details */}
          <div
            ref={detailSectionRef}
            className="grid gap-8 lg:grid-cols-5"
          >
            <div className="lg:col-span-3">
              <BuildingPhotos
                images={activeBuildingImages}
                activeImageIndex={activeImageIndex}
                onPrev={() => {
                  if (!activeBuildingImages.length) return;
                  setActiveImageIndex(
                    (prev) =>
                      (prev - 1 + activeBuildingImages.length) %
                      activeBuildingImages.length
                  );
                }}
                onNext={() => {
                  if (!activeBuildingImages.length) return;
                  setActiveImageIndex(
                    (prev) => (prev + 1) % activeBuildingImages.length
                  );
                }}
                onSelectImage={setActiveImageIndex}
                suiteLabel={activeBuilding?.street_address}
              />
            </div>
            <div className="lg:col-span-2">
              {activeBuilding && (
                <BuildingDetails
                  activeBuilding={activeBuilding}
                  normalizeStatus={normalizeStatus}
                />
              )}
            </div>
          </div>
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
