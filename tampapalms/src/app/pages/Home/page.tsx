// file: tampapalms/src/app/pages/Home/page.tsx

"use client"

// Import necessary components and libraries
import SpacesCard from "@/app/components/availability/explore_spaces/SpacesCard"
import TitleCard from "@/app/components/TitleCard"
import { MobileHome } from "@/app/components/home/HeroSection/MobileHome"
import { DesktopHome } from "@/app/components/home/HeroSection/DesktopHome"
import Spacer from "@/app/components/Spacer"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay";
import LocationInsights from "@/app/components/home/LocationsInsights/Location"
import HomeSections from "@/app/components/home/HeroSection/HomeSections"

export default function Home(){
    const images = [
        "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png",
        "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-9-LargeHighDefinition.jpg",
        "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Aerial-13-LargeHighDefinition.jpg",
    ];  



    return (
      <div>
        {/* Mobile Home Component */}
        <MobileHome imageUrls={images} />
        {/* Desktop Home Component */}
        <DesktopHome imageUrls={images} />

        {/* Uncomment this to see HomeSection */}
        {/* <HomeSections/> */}
        
        <div></div>
        {/* <LocationInsights /> */}
      </div>
    );
}