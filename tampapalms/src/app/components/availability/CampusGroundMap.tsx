"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

// Define the actual base dimensions of the image file (SiteplanEast&West.jpg)
const BASE_IMAGE_WIDTH = 4928;
const BASE_IMAGE_HEIGHT = 5758;

// Define the original dimensions the polygons were mapped to (from SitePlan.tsx [cite: 1])
const OLD_BASE_WIDTH = 1700;
const OLD_BASE_HEIGHT = 2200;

// Scaling factors
const K_X = BASE_IMAGE_WIDTH / OLD_BASE_WIDTH; // ~2.8988
const K_Y = BASE_IMAGE_HEIGHT / OLD_BASE_HEIGHT; // ~2.6173

// Original coordinates from code.zip/BuildingMap.tsx.txt [cite: 11]
const ORIGINAL_BUILDING_POLYGONS = [
  [1054, 299, 1101, 314, 1085, 371, 1036, 358], // 1
  [1017, 434, 1085, 457, 1058, 567, 987, 549], // 2
  [990, 562, 1040, 580, 1024, 640, 972, 625], // 3
  [978, 639, 948, 752, 1002, 768, 1034, 658], // 4
  [930, 762, 899, 891, 966, 915, 1001, 786], // 5
  [675, 1228, 731, 1294, 641, 1381, 583, 1314], // 6
  [588, 1339, 627, 1393, 544, 1472, 501, 1410], // 7
  [499, 1432, 522, 1478, 474, 1515, 447, 1470], // 8
  [651, 1497, 683, 1552, 592, 1617, 561, 1562], // 9
  [650, 1594, 708, 1690, 655, 1727, 603, 1625], // 10
  [768, 1743, 804, 1795, 770, 1820, 741, 1767], // 11
  [672, 1845, 671, 1887, 729, 1895, 731, 1855], // 12
  [604, 1840, 599, 1880, 655, 1887, 660, 1847], // 13
  [534, 1832, 523, 1946, 581, 1956, 591, 1840], // 14
  [611, 1897, 719, 1910, 710, 1970, 603, 1960], // 15
  [734, 1912, 731, 1955, 789, 1961, 794, 1923], // 16
  [810, 1921, 809, 1985, 915, 1981, 917, 1920], // 17
  [1421, 702, 1466, 747, 1393, 836, 1351, 790], // 18
  [1465, 650, 1503, 659, 1486, 723, 1447, 709], // 19
  [1348, 542, 1360, 592, 1427, 572, 1414, 520], // 20
  [1324, 599, 1360, 611, 1346, 676, 1307, 663], // 21
  [1265, 581, 1313, 595, 1294, 667, 1249, 654], // 22
  [1271, 491, 1319, 492, 1318, 567, 1270, 565], // 23
  [1330, 477, 1343, 525, 1410, 505, 1396, 456], // 24
  [1333, 250, 1396, 227, 1429, 342, 1361, 362], // 25
  [1264, 274, 1319, 253, 1349, 366, 1295, 382], // 26
];

// Function to scale and round coordinates
const scalePolygon = (points: number[]) => {
  const scaledPoints: number[] = [];
  for (let i = 0; i < points.length; i += 2) {
    // X-coordinate
    scaledPoints.push(Math.round(points[i] * K_X));
    // Y-coordinate
    scaledPoints.push(Math.round(points[i + 1] * K_Y));
  }
  return scaledPoints;
};

// Apply scaling to the entire array
const SCALED_BUILDING_POLYGONS = ORIGINAL_BUILDING_POLYGONS.map(scalePolygon);

// Array for mapping building numbers to their floorplans
const FLOOR_PLANS = [
  {
    building_number: 5,
    floor_plans: [
      "/images/Floor-plans/BUILDING5FIRSTFLOOR1.png",
      "/images/Floor-plans/BUILDING5SECONDFLOOR.png",
    ],
  },
  {
    building_number: 6,
    floor_plans: [
      "/images/Floor-plans/BUILDING6FIRSTFLOOR1025.png",
      "/images/Floor-plans/BUILDING6SECONDFLOOR.png",
    ], 
  },
  {
    building_number: 25,
    floor_plans: [
      "/images/Floor-plans/BUILDING251025.png",
    ],
  },
];

type CampusGroundMapProps = {
  imageSrc?: string;
  onBuildingSelect?: (buildingId: number | null) => void;
  availableBuildings?: number[];
};

export function CampusGroundMap({
  imageSrc = "/images/Floor-plans/SiteplanEast&West.png",
  onBuildingSelect,
  availableBuildings,
}: CampusGroundMapProps) {
  const [scale, setScale] = useState(0.85);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(
    BASE_IMAGE_WIDTH / BASE_IMAGE_HEIGHT
  );
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null
  );
  const [seeBuildingPopUp, setSeeBuildingPopUp] = useState(false);
  const [buildingFloorPlan, setBuildingFloorPlan] = useState(false);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
  const dragOffset = useRef({ x: 0, y: 0 });
  const pointerIdRef = useRef<number | null>(null);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const adjustScale = useCallback((direction: "in" | "out") => {
    setScale((prev) =>
      clamp(prev + (direction === "in" ? 0.25 : -0.25), 0.5, 3)
    );
  }, []);

  const firstFloorPlanSrc = useMemo(() => {
    if (selectedBuildingId === null) {
      return null;
    }

    // Find the matching building object
    const buildingPlan = FLOOR_PLANS.find(
      (plan) => plan.building_number === selectedBuildingId
    );

    if (!buildingPlan) {
      return null;
    }

    // get the total number of floors for building
    const totalFloors = buildingPlan.floor_plans.length;

    // reset the index if the selected building changes and has fewer floors
    if (selectedFloorIndex >= totalFloors) {
      setSelectedFloorIndex(0);
    }
    // If found, return the first floor plan image path (index 0)
    // Otherwise, return a default/fallback path or null
    return buildingPlan?.floor_plans[selectedFloorIndex] || null;
  }, [selectedBuildingId, selectedFloorIndex]);

  // function to handle next click on floor plans
  const handleNextFloor = useCallback(() => {
    const buildingPlan = FLOOR_PLANS.find(
      (plan) => plan.building_number === selectedBuildingId
    );

    if (!buildingPlan) return;

    const totalFloors = buildingPlan.floor_plans.length;

    setSelectedFloorIndex((prevIndex) => (prevIndex + 1) % totalFloors);
  }, [selectedBuildingId]);

  // function to handle previous click on floor plans
  const handlePrevFloor = useCallback(() => {
    const buildingPlan = FLOOR_PLANS.find(
      (plan) => plan.building_number === selectedBuildingId
    );

    if (!buildingPlan) return;

    const totalFloors = buildingPlan.floor_plans.length;

    setSelectedFloorIndex((prevIndex) => (prevIndex - 1 + totalFloors) % totalFloors);
  }, [selectedBuildingId]);

  const handlePolygonClick = (buildingId: number) => {
      setSelectedBuildingId(buildingId);
      onBuildingSelect?.(buildingId);
      console.log("you have selected: ", buildingId);

      // Make sure the building has an available suite
      const isAvailable = availableBuildings?.includes(buildingId);

      // If its available, let the user see the floor plan
      if (isAvailable) {
        setSeeBuildingPopUp(true);
        setBuildingFloorPlan(false);
      } else {
        setSeeBuildingPopUp(false);
        setBuildingFloorPlan(false);
        toast.warning("Building must have available spaces to see floor plan", { autoClose: 2000 });
      }
      console.log("See building pop up: ", seeBuildingPopUp);
    };

  // function for showing the floor plan once yes is clicked for the building floor plan
  const toggleBuildingFloorPlan = () => {
    setBuildingFloorPlan(!buildingFloorPlan);
  };

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).tagName.toUpperCase() === "POLYGON") {
        return;
      }
      pointerIdRef.current = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragOffset.current = {
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      };
      setIsDragging(true);
    },
    [position.x, position.y]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      });
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== null) {
        event.currentTarget.releasePointerCapture(pointerIdRef.current);
      }
      pointerIdRef.current = null;
      setIsDragging(false);
    },
    []
  );

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setScale(1.35);
      setPosition({ x: 0, y: 0 });
      setSelectedBuildingId(null);
      onBuildingSelect?.(null);
    },
    [onBuildingSelect]
  );

  const interactionHandlers = useMemo(
    () => ({
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
      onDoubleClick: handleDoubleClick,
    }),
    [handlePointerDown, handlePointerMove, handlePointerUp, handleDoubleClick]
  );

  return (
    <section className="flex w-full flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-100 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Campus Overview
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mt-1">
          Select Green Buildings for Floor Plans
        </p>
      </div>

      <div
        className="relative mx-auto w-full overflow-hidden bg-slate-50"
        style={{
          aspectRatio,
          width: "100%",
        }}
      >
        <div
          className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          {...interactionHandlers}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center",
              transition: isDragging ? "none" : "transform 120ms ease-out",
            }}
          >
            <div className="relative h-full w-full">
              {/* The Base Map Image */}
              <Image
                src={imageSrc}
                alt="Tampa Palms Professional Center campus site plan"
                fill
                sizes="(max-width: 1024px) 90vw, 60vw"
                className="object-contain"
                priority={false}
                draggable={false}
                onLoad={(event) => {
                  const {
                    naturalWidth: actualWidth,
                    naturalHeight: actualHeight,
                  } = event.currentTarget;
                  if (actualWidth && actualHeight) {
                    setAspectRatio(actualWidth / actualHeight);
                  }
                }}
              />

              {/* The Interactive SVG Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  // CRITICAL FIX: The viewBox is set to the actual image dimensions (4928x5758)
                  // and the polygons now use coordinates scaled to this viewBox.
                  width={BASE_IMAGE_WIDTH}
                  height={BASE_IMAGE_HEIGHT}
                  viewBox={`0 0 ${BASE_IMAGE_WIDTH} ${BASE_IMAGE_HEIGHT}`}
                  className="w-full h-full"
                  style={{
                    objectFit: "contain",
                    position: "absolute",
                  }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {SCALED_BUILDING_POLYGONS.map((points, i) => {
                    const buildingId = i + 1;
                    const pointsStr = points.join(" ");
                    const hasAvailableSuite =
                      availableBuildings?.includes(buildingId);

                    return (
                      <polygon
                        key={i}
                        points={pointsStr}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePolygonClick(buildingId);
                        }}
                        fill={
                          // Change to check for available suite first
                          hasAvailableSuite
                            ? selectedBuildingId === buildingId // Available, make green
                              ? "rgba(0, 150, 0, 0.6)"
                              : "rgba(0, 150, 0, 0.3)"
                            : selectedBuildingId === buildingId // Not available, make red
                            ? "rgba(255, 0, 0, 0.4)"
                            : "rgba(255, 0, 0, 0.15)"
                        }
                        stroke={
                          hasAvailableSuite
                            ? selectedBuildingId === buildingId
                              ? "#006600"
                              : "#009900"
                            : selectedBuildingId === buildingId
                            ? "#cc0000"
                            : "#ff0000"
                        }
                        strokeWidth="15" // Adjusted stroke width for better visibility on a 4928x5758 map
                        className={`cursor-pointer transition-all ${
                          hasAvailableSuite
                            ? "hover:fill-green-300/80"
                            : "hover:fill-red-300/80"
                        }`}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Zoom and Download Controls */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
          {seeBuildingPopUp && (
            <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-md shadow-slate-900/10">
              <span className="text-xs font-semibold tracking-[0.35em] text-slate-500">
                View Building?
              </span>
              <button
                type="button"
                onClick={() => toggleBuildingFloorPlan()}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-base font-semibold transition hover:bg-slate-100"
              >
                Y
              </button>
              <button
                type="button"
                onClick={() => {
                  setSeeBuildingPopUp(false);
                  setBuildingFloorPlan(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-base font-semibold transition hover:bg-slate-100"
              >
                N
              </button>
            </div>
          )}
          <div className="ml-auto pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-slate-700 shadow-md shadow-slate-900/10">
            <button
              type="button"
              onClick={() => adjustScale("out")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-base font-semibold transition hover:bg-slate-100"
              aria-label="Zoom out"
            >
              –
            </button>
            <button
              type="button"
              onClick={() => adjustScale("in")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-base font-semibold transition hover:bg-slate-100"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setScale(0.85);
                setPosition({ x: 0, y: 0 });
                setSelectedBuildingId(null);
                onBuildingSelect?.(null);
              }}
              className="ml-1 rounded-full border border-slate-200 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </div>

        {buildingFloorPlan && (
          <div
            className="pointer-events-auto absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 items-center justify-center px-5"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl rounded-[32px] border border-slate-200 bg-white/95 p-6 text-slate-700 shadow-xl shadow-slate-900/20">
              <button
                type="button"
                aria-label="Close building floor plan"
                onClick={() => {
                  toggleBuildingFloorPlan();
                  setSeeBuildingPopUp(false);
                }}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                ×
              </button>
              <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
                Building {selectedBuildingId ?? ""} Floor Plan
              </h3>
              <div className="mt-4 relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src={firstFloorPlanSrc ? firstFloorPlanSrc : ""}
                  alt="Building floor plan"
                  className="w-full object-contain"
                />

                {(FLOOR_PLANS.find(
                  (plan) => plan.building_number === selectedBuildingId
                )?.floor_plans.length ?? 0) > 1 && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
                    <button
                      type="button"
                      onClick={handlePrevFloor}
                      className="pointer-events-auto z-10 rounded-full bg-white/80 p-2 text-lg font-bold text-slate-700 shadow-lg transition hover:bg-white"
                      aria-label="Previous Floor"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFloor}
                      className="pointer-events-auto z-10 rounded-full bg-white/80 p-2 text-lg font-bold text-slate-700 shadow-lg transition hover:bg-white"
                      aria-label="Next Floor"
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-5">
          <a
            href="/images/Floor-plans/SiteplanEast&West.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow shadow-slate-900/30 transition hover:bg-slate-800"
          >
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}

export default CampusGroundMap;
