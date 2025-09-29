// file: tampapalms/src/app/pages/Home/page.tsx

import { ImageCarousel } from "@/app/components/home/carousel/ImageCarousel"
import SpacesCard from "@/app/components/home/explore_spaces/SpacesCard"
import TitleCard from "@/app/components/home/explore_spaces/TitleCard"
import Link from "next/link"
import Image from "next/image"

export default function Home(){
    const images = [
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-9-LargeHighDefinition.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Aerial-13-LargeHighDefinition.jpg",
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

    return (
      <div>
        {/* Highlighted Images container */}
        <div className="relative h-[80dvh] rounded-xl bg-gray-200 my-2 mx-8 overflow-hidden">
          {/* <h1 className="text-black">Highlighted Images</h1> */}
          <ImageCarousel imageUrls={images} />
          <h1 className="absolute bottom-0 left-0 m-8 text-white text-5xl z-20">
            Tampa Palms<br></br>Professional Center
          </h1>
          <div className="absolute h-50 w-50 bottom-8 right-8 bg-neutral-100/80 backdrop-blur-sm rounded-xl z-20 px-5 py-3">
            <p className="text-black text-center font-semibold">
              Highlighted Space
            </p>
          </div>
        </div>
        {/* Explore Spaces container */}
        <div className="h-[80dvh] rounded-xl mt-8 mx-8 p-6">
          <TitleCard title="Explore Spaces" />
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
          <div className="h-20"></div>
        </div>
      </div>
    );
}