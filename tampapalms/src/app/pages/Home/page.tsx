// file: tampapalms/src/app/pages/Home/page.tsx

"use client"

// Import necessary components and libraries
import { MobileHome } from "@/app/components/home/HeroSection/MobileHome"
import { DesktopHome } from "@/app/components/home/HeroSection/DesktopHome"
import React, {useEffect, useState} from "react"
import HomeSections from "@/app/components/home/HeroSection/HomeSections"
import axios from "axios"

export default function Home(){
  const [totalSize, setTotalSize] = useState(0);
  const [flexibleSuites, setFlexibleSuites] = useState(0);
  const [buildingAvailable, setBuildingAvailable] = useState(0);
    const images = [
      "/images/TPPC-Entry-002.jpg",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png",
      "/images/Bldg5-003.jpg",
      // "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-9-LargeHighDefinition.jpg",
      "/images/Bldg6-001.jpg",
      // "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Aerial-13-LargeHighDefinition.jpg",
      "/images/TPPC-002.jpg",
    ];  

    useEffect(() => {
      async function fetchBuildingStats() {
        try {
          // 1. Fetch ALL building data (assuming your API returns the full objects)
          const response = await axios.get("/api/buildings");

          const rawBuildings = Array.isArray(response.data) ? response.data : [];

          const toNumeric = (value: unknown): number => {
            if (typeof value === "number" && Number.isFinite(value)) {
              return value;
            }

            if (typeof value === "string") {
              const numericPortion = value.replace(/[^0-9.]/g, "");
              if (!numericPortion) return 0;
              const parsed = Number(numericPortion);
              return Number.isFinite(parsed) ? parsed : 0;
            }

            return 0;
          };

          // 2. Extract only the rental_sq_ft from each building object
          const buildingSizes = rawBuildings
            .map((b: any) => toNumeric(b.rental_sq_ft))
            .filter((size: number) => size > 0);

          console.log("Building sizes data:", buildingSizes);

          const total = buildingSizes.reduce((acc: number, size: number) => acc + size, 0);

          setTotalSize(total);
          console.log("Total building size:", total);


          // Suite Count Data
          const suiteCount = rawBuildings.reduce((acc: number, building: any) => {
            const officesCount = toNumeric(building.offices_count);
            if (officesCount) {
              return acc + officesCount;
            }

            const officeTypeAsNumber = toNumeric(building.offices_type);
            if (officeTypeAsNumber) {
              return acc + officeTypeAsNumber;
            }

            return typeof building.offices_type === "string" && building.office_type.trim() ? acc + 1 : acc;
          }, 0);
          setFlexibleSuites(suiteCount);
          console.log("Total flexible suites:", suiteCount);

          
          // Number of buildings Available, taking the highest number from the database (that means the amount of buildings available) 
          const buildingAvailable = rawBuildings.reduce((max: number, building: any) => {
            const buildingValue =
              toNumeric(building.building_number);
            return buildingValue > max ? buildingValue : max;
          }, 26);

          setBuildingAvailable(buildingAvailable);
          console.log("Total meeting rooms:", buildingAvailable);

        } catch (error) {
          console.error("Error fetching building sizes:", error);
        } finally {
        }
      }
      fetchBuildingStats();
    }, []);

    return (
      <div>
        {/* Mobile Home Component */}
        <MobileHome imageUrls={images} />
        {/* Desktop Home Component */}
        <DesktopHome imageUrls={images} />

        {/* Uncomment this to see HomeSection */}
        <HomeSections totalSize={totalSize} flexibleSuites={flexibleSuites} buildingAvailable={buildingAvailable} />
        
        <div></div>
        {/* <LocationInsights /> */}
      </div>
    );
}
