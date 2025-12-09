"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { normalizeSuiteToken } from "@/lib/utils";

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

const makeSuite = (id: string, points: number[]): SuitePolygon => ({
  id,
  points,
});

// polygon coordinates for the floorplans
const FLOOR_PLAN_POLYGONS: BuildingFloorPlanPolygons[] = [
  {
    building_number: 1,
    floor_maps: {
      "/images/Floor-plans/BUILDING1-1025.png": [
        makeSuite("", [42, 136, 1960, 140, 1962, 1423, 36, 1418]),
      ],
    },
  },
  {
    building_number: 2,
    floor_maps: {
      "/images/Floor-plans/BUILDING2A1025.png": [
        makeSuite("A", [261, 210, 1250, 209, 1252, 1872, 261, 1863]),
      ],
      "/images/Floor-plans/BUILDING2B1025.png": [
        makeSuite(
          "B",
          [30, 244, 1480, 240, 1496, 1432, 860, 1432, 860, 1385, 32, 1388]
        ),
      ],
    },
  },
  {
    building_number: 5,

    floor_maps: {
      "/images/Floor-plans/BUILDING5FIRSTFLOOR1.png": [
        makeSuite("101", [57, 1054, 133, 1055, 248, 1158, 245, 1391, 52, 1395]),
        makeSuite("102", [257, 1190, 416, 1186, 418, 1391, 250, 1391]),
        makeSuite("103", [416, 1188, 595, 1188, 596, 1389, 413, 1397]),
        makeSuite("104", [598, 1190, 596, 1393, 773, 1393, 773, 1188]),
        makeSuite(
          "105",
          [564, 864, 561, 987, 460, 989, 458, 1113, 718, 1115, 720, 865]
        ),
        makeSuite(
          "106",
          [775, 1191, 914, 1190, 950, 1216, 946, 1393, 773, 1393]
        ),
        makeSuite("107", [723, 865, 883, 865, 883, 1118, 720, 1118]),
        makeSuite(
          "108",
          [888, 867, 1045, 865, 1042, 1069, 976, 1069, 974, 1109, 886, 1111]
        ),
        makeSuite(
          "109",
          [1047, 864, 1204, 867, 1202, 1116, 1117, 1116, 1117, 1074, 1043, 1070]
        ),
        makeSuite(
          "110",
          [1063, 1216, 1091, 1186, 1285, 1190, 1282, 1395, 1061, 1395]
        ),
        makeSuite("111", [1202, 865, 1365, 867, 1363, 1116, 1202, 1116]),
        makeSuite("112", [1285, 1191, 1506, 1191, 1503, 1391, 1284, 1395]),
        makeSuite("113", [1368, 867, 1531, 869, 1526, 1116, 1367, 1115]),
        makeSuite("114", [1508, 1191, 1731, 1191, 1731, 1397, 1504, 1393]),
        makeSuite(
          "115",
          [
            1794, 1096, 1750, 1184, 1731, 1190, 1727, 1388, 1950, 1398, 1948,
            1089,
          ]
        ),
        makeSuite("116", [1715, 444, 1958, 444, 1953, 642, 1716, 640]),
        makeSuite("117", [1584, 198, 1958, 200, 1962, 440, 1591, 440]),
        makeSuite("118", [1407, 202, 1580, 200, 1584, 438, 1404, 440]),
        makeSuite("119", [1197, 204, 1405, 199, 1402, 439, 1193, 438]),
        makeSuite("120", [1052, 201, 1192, 199, 1193, 438, 1047, 434]),
        makeSuite("121", [799, 201, 966, 197, 969, 436, 798, 438]),
        makeSuite("122", [596, 201, 794, 199, 794, 441, 595, 439]),
        makeSuite("123", [351, 198, 589, 203, 589, 445, 349, 440]),
        makeSuite("124", [52, 197, 347, 199, 342, 438, 52, 434]),
        makeSuite(
          "125",
          [49, 444, 47, 619, 201, 619, 208, 560, 250, 557, 246, 442]
        ),
        makeSuite("126", [720, 561, 883, 563, 875, 697, 718, 703]),
        makeSuite("127", [874, 707, 874, 854, 720, 859, 722, 711]),
        makeSuite("128", [1026, 567, 1125, 567, 1125, 742, 1027, 746]),
        makeSuite("129", [1130, 572, 1287, 570, 1287, 745, 1130, 743]),
        makeSuite("130", [1423, 533, 1421, 658, 1610, 655, 1612, 526]),
      ],
      "/images/Floor-plans/BUILDING5SECONDFLOOR.png": [
        makeSuite(
          "202",
          [
            577, 521, 575, 391, 605, 387, 605, 182, 93, 186, 91, 608, 254, 619,
            259, 529,
          ]
        ),
        makeSuite("207", [607, 182, 743, 187, 741, 394, 607, 387]),
        makeSuite("208", [748, 191, 957, 189, 958, 387, 743, 389]),
        makeSuite("209", [960, 189, 1172, 194, 1172, 392, 960, 392]),
        makeSuite("210", [1172, 192, 1390, 190, 1386, 386, 1174, 390]),
        makeSuite("211", [1393, 189, 1580, 189, 1584, 389, 1390, 389]),
        makeSuite(
          "212",
          [
            1582, 188, 1934, 186, 1936, 630, 1722, 634, 1720, 706, 1542, 704,
            1545, 392, 1586, 390,
          ]
        ),
        makeSuite(
          "219",
          [
            1547, 809, 1780, 807, 1782, 1046, 1934, 1047, 1939, 1350, 1731,
            1346, 1526, 1351, 1522, 1143, 1542, 1143,
          ]
        ),
        makeSuite("223", [1322, 1145, 1321, 1351, 1524, 1349, 1519, 1144]),
        makeSuite("224", [1123, 1140, 1126, 1347, 1321, 1347, 1321, 1144]),
        makeSuite("225", [927, 1145, 1123, 1141, 1121, 1346, 925, 1343]),
        makeSuite("226", [927, 1144, 732, 1142, 727, 1349, 923, 1347]),
        makeSuite("227", [529, 1144, 527, 1349, 725, 1349, 725, 1140]),
        makeSuite(
          "228",
          [
            405, 830, 593, 832, 593, 1136, 527, 1143, 527, 1348, 91, 1348, 89,
            878, 255, 878, 255, 980, 405, 980,
          ]
        ),
        makeSuite("235", [1142, 478, 1144, 660, 950, 660, 948, 476]),
        makeSuite("236", [1148, 479, 1337, 479, 1337, 665, 1144, 659]),
        makeSuite("243", [1144, 874, 1335, 876, 1333, 1056, 1144, 1056]),
        makeSuite("244", [948, 871, 1142, 873, 1140, 1054, 951, 1055]),
        makeSuite("245", [944, 894, 681, 893, 681, 1059, 946, 1055]),
        makeSuite("246", [681, 698, 946, 700, 948, 891, 679, 887]),
      ],
    },
  },
  {
    building_number: 6,

    floor_maps: {
      "/images/Floor-plans/BUILDING6FIRSTFLOOR1025.png": [
        makeSuite(
          "100",
          [
            1904, 185, 1907, 618, 1856, 620, 1856, 579, 1715, 572, 1711, 618,
            1667, 627, 1660, 678, 951, 677, 950, 509, 444, 510, 441, 774, 264,
            774, 266, 689, 112, 684, 114, 184,
          ]
        ),
        makeSuite(
          "101",
          [
            951, 797, 948, 915, 448, 908, 443, 779, 262, 777, 264, 1019, 110,
            1019, 116, 1307, 1905, 1304, 1905, 862, 1861, 858, 1856, 901, 1713,
            903, 1708, 864, 1663, 862, 1663, 945, 1330, 952, 1335, 927, 1211,
            920, 1204, 802,
          ]
        ),
      ],
      "/images/Floor-plans/BUILDING6SECONDFLOOR.png": [
        makeSuite(
          "200",
          [787, 247, 1784, 247, 1785, 844, 1345, 828, 1351, 722, 789, 726]
        ),
        makeSuite("201", [787, 244, 787, 728, 338, 727, 338, 249]),
        makeSuite(
          "202",
          [66, 242, 335, 246, 337, 649, 248, 654, 252, 622, 66, 615]
        ),
        makeSuite(
          "203",
          [
            522, 849, 632, 855, 635, 812, 785, 811, 789, 1316, 70, 1320, 68,
            1049, 232, 1046, 236, 1017, 519, 1017,
          ]
        ),
        makeSuite(
          "204",
          [
            791, 806, 978, 806, 978, 939, 1117, 937, 1119, 834, 1238, 833, 1232,
            981, 1552, 983, 1559, 838, 1785, 834, 1785, 1326, 787, 1315,
          ]
        ),
      ],
    },
  },
  {
    building_number: 7,
    floor_maps: {
      "/images/Floor-plans/BUILDING7A1025.png": [
        makeSuite("A", [186, 108, 1307, 108, 1312, 1904, 185, 1903]),
      ],
      "/images/Floor-plans/BUILDING7B1025.png": [
        makeSuite("B", [89, 662, 469, 661, 471, 108, 87, 108]),
      ],
      "/images/Floor-plans/BUILDING7C1025.png": [
        makeSuite("C", [105, 691, 464, 691, 464, 34, 108, 34]),
      ],
    },
  },
  {
    building_number: 11,
    floor_maps: {
      "/images/Floor-plans/BUILDING11-1025.png": [
        makeSuite("", [1916, 1374, 186, 1373, 185, 204, 1909, 213]),
      ],
    },
  },
  {
    building_number: 14,
    floor_maps: {
      "/images/Floor-plans/BUILDING14BC1025.png": [
        makeSuite(
          "BC",
          [95, 1462, 950, 1462, 953, 1412, 1868, 1414, 1877, 88, 93, 84]
        ),
      ],
    },
  },
  {
    building_number: 15,
    floor_maps: {
      "/images/Floor-plans/BUILDING15C1025.png": [
        makeSuite(
          "C",
          [
            174, 1866, 596, 1870, 594, 1813, 959, 1817, 963, 1870, 1375, 1874,
            1381, 169, 178, 160,
          ]
        ),
      ],
    },
  },
  {
    building_number: 20,
    floor_maps: {
      "/images/Floor-plans/BUILDING20-1025.png": [
        makeSuite(
          "",
          [
            153, 1345, 898, 1351, 900, 1303, 1114, 1299, 1123, 1345, 1856, 1351,
            1860, 132, 156, 128,
          ]
        ),
      ],
    },
  },
  {
    building_number: 24,
    floor_maps: {
      "/images/Floor-plans/BUILDING24A1025.png": [
        makeSuite(
          "A",
          [
            53, 583, 80, 583, 80, 563, 182, 564, 183, 585, 515, 587, 515, 46,
            53, 48,
          ]
        ),
      ],
      "/images/Floor-plans/BUILDING24B1025.png": [
        makeSuite("B", [71, 941, 564, 942, 566, 38, 68, 37]),
      ],
    },
  },
  {
    building_number: 25,

    floor_maps: {
      "/images/Floor-plans/BUILDING251025.png": [
        makeSuite(
          "A",
          [82, 817, 314, 818, 321, 780, 428, 778, 430, 1319, 80, 1313]
        ),
        makeSuite(
          "B",
          [658, 151, 1001, 151, 999, 650, 769, 648, 766, 687, 658, 683]
        ),
        makeSuite(
          "C",
          [
            1003, 150, 1466, 154, 1466, 688, 1354, 681, 1358, 638, 1231, 635,
            1234, 649, 1001, 643,
          ]
        ),
        makeSuite(
          "D",
          [1467, 153, 1920, 156, 1920, 646, 1681, 648, 1681, 687, 1466, 685]
        ),
        makeSuite(
          "E",
          [
            1913, 818, 1918, 1313, 1460, 1309, 1457, 1053, 1538, 1047, 1538,
            908, 1409, 908, 1409, 782, 1679, 784, 1679, 816,
          ]
        ),
        makeSuite(
          "F",
          [
            1109, 814, 1234, 812, 1234, 780, 1407, 780, 1405, 904, 1538, 909,
            1536, 1047, 1457, 1051, 1455, 1311, 1109, 1313,
          ]
        ),
        makeSuite("G", [773, 811, 1109, 816, 1105, 1309, 768, 1309]),
        makeSuite(
          "H",
          [434, 777, 626, 779, 630, 830, 768, 833, 768, 1311, 430, 1313]
        ),
        makeSuite(
          "I",
          [80, 151, 656, 153, 656, 685, 321, 690, 326, 648, 87, 650]
        ),
      ],
    },
  },
  {
    building_number: 26,
    floor_maps: {
      "/images/Floor-plans/BUILDING26C1025.png": [
        makeSuite(
          "C",
          [
            218, 1887, 544, 1887, 543, 1799, 907, 1801, 911, 1888, 1225, 1884,
            1225, 110, 220, 107,
          ]
        ),
      ],
    },
  },
];

// Type for floor plan data
type SuitePolygon = {
  id: string;
  points: number[];
};

interface FloorMapData {
  [imagePath: string]: SuitePolygon[];
}

// Type for polygons
interface BuildingFloorPlanPolygons {
  building_number: number;
  floor_maps: FloorMapData;
}



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
    building_number: 1,
    floor_plans: ["/images/Floor-plans/BUILDING1-1025.png"],
  },
  {
    building_number: 2,
    floor_plans: [
      "/images/Floor-plans/BUILDING2A1025.png",
      "/images/Floor-plans/BUILDING2B1025.png",
    ],
  },
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
    building_number: 7,
    floor_plans: [
      "/images/Floor-plans/BUILDING7A1025.png",
      "/images/Floor-plans/BUILDING7B1025.png",
      "/images/Floor-plans/BUILDING7C1025.png",
    ],
  },
  {
    building_number: 11,
    floor_plans: ["/images/Floor-plans/BUILDING11-1025.png"],
  },
  {
    building_number: 14,
    floor_plans: ["/images/Floor-plans/BUILDING14BC1025.png"],
  },
  {
    building_number: 15,
    floor_plans: ["/images/Floor-plans/BUILDING15C1025.png"],
  },
  {
    building_number: 20,
    floor_plans: ["/images/Floor-plans/BUILDING20-1025.png"],
  },
  {
    building_number: 24,
    floor_plans: [
      "/images/Floor-plans/BUILDING24A1025.png",
      "/images/Floor-plans/BUILDING24B1025.png",
    ],
  },
  {
    building_number: 25,
    floor_plans: ["/images/Floor-plans/BUILDING251025.png"],
  },
  {
    building_number: 26,
    floor_plans: ["/images/Floor-plans/BUILDING26C1025.png"],
  },
];

type CampusGroundMapProps = {
  imageSrc?: string;
  onBuildingSelect?: (buildingId: number | null) => void;
  availableBuildings?: number[];
  onSuiteSelect?: (payload: {
    buildingNumber: number;
    suiteId: string;
    suiteLabel: string;
  }) => void;
  suiteAvailability?: Record<number, string[]>;
};

export function CampusGroundMap({
  imageSrc = "/images/Floor-plans/SiteplanEast&West.png",
  onBuildingSelect,
  availableBuildings,
  onSuiteSelect,
  suiteAvailability,
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
  const [selectedHasAvailability, setSelectedHasAvailability] = useState<
    boolean | null
  >(null);
  const [buildingFloorPlan, setBuildingFloorPlan] = useState(false);
  const [noPlanAvailable, setNoPlanAvailable] = useState(false);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
  const [floorPlanDimesions, setFloorPlanDimensions] = useState({ width: 0, height: 0});
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

  const floorPlanCount = useMemo(() => {
    if (selectedBuildingId === null) return 0;
    return (
      FLOOR_PLANS.find((plan) => plan.building_number === selectedBuildingId)
        ?.floor_plans.length ?? 0
    );
  }, [selectedBuildingId]);

  const hasMultipleFloors = floorPlanCount > 1;

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

  const currentFloorPolygons = useMemo((): SuitePolygon[] => {
    if (!selectedBuildingId || !firstFloorPlanSrc) {
      return [];
    }

    // Get the buildings polygon data
    const buildingData = FLOOR_PLAN_POLYGONS.find(
      (plan) => plan.building_number === selectedBuildingId
    );

    if (!buildingData) {
      return [];
    }

    // Look up the polygons using the current image source as the key
    return buildingData.floor_maps[firstFloorPlanSrc] ?? [];
  }, [selectedBuildingId, firstFloorPlanSrc]);

  const availableSuiteSet = useMemo(() => {
    if (!suiteAvailability || !selectedBuildingId) return null;
    const suites = suiteAvailability[selectedBuildingId];
    if (!suites || suites.length === 0) return null;
    return new Set(
      suites.map((suite) => normalizeSuiteToken(suite))
    );
  }, [suiteAvailability, selectedBuildingId]);

  const handlePolygonClick = (buildingId: number) => {
      setSelectedBuildingId(buildingId);
      onBuildingSelect?.(buildingId);
      setNoPlanAvailable(false);
      console.log("you have selected: ", buildingId);

      // Make sure the building has an available suite
      const isAvailable = availableBuildings?.includes(buildingId) ?? false;

      setSelectedHasAvailability(isAvailable);
      setSeeBuildingPopUp(true);
      setBuildingFloorPlan(false);
      console.log("See building pop up: ", seeBuildingPopUp);
    };

  // function for showing the floor plan once yes is clicked for the building floor plan
  const toggleBuildingFloorPlan = () => {
    if (!selectedBuildingId) return;
    const buildingPlan = FLOOR_PLANS.find(
      (plan) => plan.building_number === selectedBuildingId
    );
    if (!buildingPlan || buildingPlan.floor_plans.length === 0) {
      setNoPlanAvailable(true);
      setBuildingFloorPlan(false);
      setSeeBuildingPopUp(false);
      return;
    }
    setNoPlanAvailable(false);
    setSeeBuildingPopUp(false);
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
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-white">
          Professional Park Overview
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-white mt-1">
          Select Green Buildings for Floor Plans
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-white mt-1">
          Click and Hold to Drag, Use + - to Zoom
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

        {/* View Building Prompt */}
        {seeBuildingPopUp && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-5">
            <div
              className={`pointer-events-auto flex w-full max-w-md flex-col items-center gap-4 rounded-[28px] border bg-white/95 px-5 py-4 text-center text-slate-700 shadow-2xl ${
                selectedHasAvailability
                  ? "border-emerald-200 shadow-emerald-200/60"
                  : "border-red-200 shadow-red-200/60"
              }`}
            >
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.4em] ${
                  selectedHasAvailability ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {selectedHasAvailability ? "Suites Available" : "No Suites Available"}
              </span>
              <p className="text-sm text-slate-600">
                {selectedHasAvailability
                  ? "This building has available suites. Would you like to review the floor plan now?"
                  : "This building currently has no available suites. You can still review the floor plan for details."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleBuildingFloorPlan()}
                  className={`rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition ${
                    selectedHasAvailability
                      ? "border-emerald-200 bg-emerald-500 hover:bg-emerald-400"
                      : "border-red-200 bg-red-500 hover:bg-red-400"
                  }`}
                >
                  View Floor Plan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSeeBuildingPopUp(false);
                    setBuildingFloorPlan(false);
                  }}
                  className="rounded-full border border-slate-300 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:bg-slate-100"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Missing floor plan notice */}
        {noPlanAvailable && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-5">
            <div className="pointer-events-auto flex w-full max-w-md flex-col items-center gap-4 rounded-[28px] border border-red-200 bg-white/95 px-5 py-4 text-center text-slate-700 shadow-2xl shadow-red-200/60">
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-red-700">
                Floor Plan Missing
              </span>
              <p className="text-sm text-slate-600">
                Sorry, it seems a floor plan for this building isn&apos;t available.
              </p>
              <button
                type="button"
                onClick={() => setNoPlanAvailable(false)}
                className="rounded-full border border-red-200 bg-red-500 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-red-400"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-end p-5">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-slate-700 shadow-md shadow-slate-900/10">
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
                setSelectedHasAvailability(null);
                setNoPlanAvailable(false);
                setSeeBuildingPopUp(false);
                setBuildingFloorPlan(false);
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
            className="pointer-events-auto absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 items-center justify-center px-5 py-5"
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

              <div className="mt-4 relative flex min-h-[200px] max-h-[65vh] md:max-h-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src={firstFloorPlanSrc ? firstFloorPlanSrc : ""}
                  alt="Building floor plan"
                  className="h-auto w-auto max-h-[65vh] md:max-h-[460px] max-w-full object-contain"
                  // Capture dimensions on load
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    setFloorPlanDimensions({
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    });
                  }}
                />

                {/* Only render svg if dimensions are available */}
                {floorPlanDimesions.width > 0 &&
                  floorPlanDimesions.height > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${floorPlanDimesions.width} ${floorPlanDimesions.height}`}
                        className="w-full h-full"
                        style={{ objectFit: "contain", position: "absolute" }}
                        preserveAspectRatio="xMidYMid meet"
                      >
                        {currentFloorPolygons.map(({ id, points }) => {
                          // ... suite polygon rendering logic ...
                          const pointsStr = points.join(" ");
                          const normalizedId = normalizeSuiteToken(id);
                          const isSuiteAvailable =
                            availableSuiteSet?.has(normalizedId) ?? false;
                          console.log(isSuiteAvailable);
                          const fillColor = isSuiteAvailable
                            ? "rgba(34, 197, 94, 0.45)"
                            : "rgba(239, 68, 68, 0.35)";
                          const strokeColor = isSuiteAvailable
                            ? "#16a34a"
                            : "#dc2626";

                          return (
                            <polygon
                              key={id}
                              id={`suite-${id}`}
                              data-suite={id}
                              points={pointsStr}
                              onClick={() => {
                                if (!selectedBuildingId) return;
                                onSuiteSelect?.({
                                  buildingNumber: selectedBuildingId,
                                  suiteId: normalizedId,
                                  suiteLabel: id,
                                });
                              }}
                              fill={fillColor}
                              stroke={strokeColor}
                              strokeWidth="5"
                              className={`cursor-pointer transition-all ${
                                isSuiteAvailable
                                  ? "hover:fill-green-500/70"
                                  : "hover:fill-red-500/60"
                              }`}
                            />
                          );
                        })}
                      </svg>
                    </div>
                  )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-4">
                  {hasMultipleFloors && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevFloor}
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-100 text-2xl font-bold text-slate-700 shadow-lg transition hover:bg-slate-200"
                        aria-label="Previous Floor"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={handleNextFloor}
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-100 text-2xl font-bold text-slate-700 shadow-lg transition hover:bg-slate-200"
                        aria-label="Next Floor"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                {firstFloorPlanSrc && (
                  <a
                    href={firstFloorPlanSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-lg transition hover:bg-slate-200"
                  >
                    Download PDF
                  </a>
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
