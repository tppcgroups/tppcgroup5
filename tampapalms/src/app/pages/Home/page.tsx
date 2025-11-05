// file: tampapalms/src/app/pages/Home/page.tsx

"use client"

// Import necessary components and libraries
import { MobileHome } from "@/app/components/home/HeroSection/MobileHome"
import { DesktopHome } from "@/app/components/home/HeroSection/DesktopHome"
import * as React from "react"
import HomeSections from "@/app/components/home/HeroSection/HomeSections"

export default function Home(){
    const images = [
      "/images/TPPC-Entry-002.jpg",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png",
      "/images/Bldg5-003.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-9-LargeHighDefinition.jpg",
      "/images/Bldg6-001.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Aerial-13-LargeHighDefinition.jpg",
      "/images/TPPC-002.jpg",
    ];  



    return (
      <div>
        {/* Mobile Home Component */}
        <MobileHome imageUrls={images} />
        {/* Desktop Home Component */}
        <DesktopHome imageUrls={images} />

        {/* Uncomment this to see HomeSection */}
        <HomeSections/>
        
        <div></div>
        {/* <LocationInsights /> */}
      </div>
    );
}