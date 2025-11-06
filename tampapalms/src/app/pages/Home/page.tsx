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
  const [loading, setLoading] = useState(true);
    const images = [
      "/images/TPPC-Entry-002.jpg",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png",
      "/images/Bldg5-003.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-9-LargeHighDefinition.jpg",
      "/images/Bldg6-001.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Aerial-13-LargeHighDefinition.jpg",
      "/images/TPPC-002.jpg",
    ];  

    useEffect(() => {
      async function fetchBuildingsSizes() {
        try {
          // 1. Fetch ALL building data (assuming your API returns the full objects)
          const response = await axios.get("/api/buildings");

          const rawBuildings = response.data || [];

          // 2. Extract only the rental_sq_ft from each building object
          const buildingSizes = rawBuildings
            .map((b: any) => b.rental_sq_ft)
            // Optional: Filter out any null or undefined values
            .filter((size: any) => size !== null && size !== undefined);

          console.log("Building sizes data:", buildingSizes);

          let total = 0;
          for (let i = 0; i < buildingSizes.length; i++) {
            total += buildingSizes[i];
          }

          setTotalSize(total);
          console.log("Total building size:", total);

          // You would typically set this to a new state, e.g., setBuildingSizes(buildingSizes);
        } catch (error) {
          console.error("Error fetching building sizes:", error);
        } finally {
          // Note: You must ensure setLoading is part of the state management for this component
          // setLoading(false);
        }
      }
      fetchBuildingsSizes();
    }, []);

    return (
      <div>
        {/* Mobile Home Component */}
        <MobileHome imageUrls={images} />
        {/* Desktop Home Component */}
        <DesktopHome imageUrls={images} />

        {/* Uncomment this to see HomeSection */}
        <HomeSections totalSize={totalSize}/>
        
        <div></div>
        {/* <LocationInsights /> */}
      </div>
    );
}