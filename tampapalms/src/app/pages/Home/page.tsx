// file: tampapalms/src/app/pages/Home/page.tsx

"use client"

// Import necessary components and libraries
import SpacesCard from "@/app/components/home/explore_spaces/SpacesCard"
import TitleCard from "@/app/components/TitleCard"
import { MobileHome } from "@/app/components/home/HeroSection/MobileHome"
import { DesktopHome } from "@/app/components/home/HeroSection/DesktopHome"
import Spacer from "@/app/components/Spacer"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay";
import AboutUs from "@/app/components/home/HeroSection/AboutUs"
import LocationInsights from "@/app/components/home/LocationsInsights/Location"

export default function Home(){
    const images = [
        "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png",
        "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
        "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-9-LargeHighDefinition.jpg",
        "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Aerial-13-LargeHighDefinition.jpg",
    ];  

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false})
    )

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
      <div>
        {/* Mobile Home Component */}
        <MobileHome imageUrls={images} plugin={plugin}/>
        {/* Desktop Home Component */}
        <DesktopHome imageUrls={images} plugin={plugin}/>
        {/* About Us Component */}
        <AboutUs />
        {/* Explore Spaces container */}
        <div className="rounded-xl my-16 md:my-24 mx-8">
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
              imageUrl="/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-10-LargeHighDefinition.jpg"
              href="https://www.loopnet.com/Listing/17425-Bridge-Hill-Ct-Tampa-FL/31448652/"
              features={officeFeatures}
            />
            <SpacesCard
              title="Executive Suites"
              imageUrl="/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg"
              href="https://www.loopnet.com/Listing/5331-Primrose-Lake-Cir-Tampa-FL/4151894/"
              features={executiveFeatures}
            />
          </div>
          {/* White space below the LoopNet locations */}
          <Spacer />
        </div>
        <div></div>
        {/* <LocationInsights /> */}
      </div>
    );
}