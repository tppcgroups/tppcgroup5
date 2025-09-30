// file: tampapalms/src/app/pages/Home/page.tsx

"use client"
import { ImageCarousel } from "@/app/components/home/carousel/ImageCarousel"
import SpacesCard from "@/app/components/home/explore_spaces/SpacesCard"
import TitleCard from "@/app/components/home/explore_spaces/TitleCard"
import Link from "next/link"
import Image from "next/image"
import * as React from "react"

import {
    Carousel,
    CarouselNext,
    CarouselPrevious,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from "@/app/components/home/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";
import AboutUs from "@/app/components/home/HeroSection/AboutUs"

export default function Home(){
    const images = [
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png",
      "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-9-LargeHighDefinition.jpg",
      "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Aerial-13-LargeHighDefinition.jpg",
    ];

    const [api, setApi] = React.useState<CarouselApi>();

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
        {/* --- MOBILE HERO --- */}
        <div className="md:hidden my-4 mx-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Tampa Palms
              <br />
              Professional Center
            </h1>
          </div>
          <Carousel
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
            className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg"
          >
            <CarouselContent>
              {images.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-full w-full">
                    <Image
                      src={url}
                      alt={`Slide ${index + 1}`}
                      // Provide width and height for optimization
                      width={1920}
                      height={1080}
                      // These classes control the "zoom-in" effect
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10"
              iconClassName="w-8 h-4"
            />
            <CarouselNext
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10"
              iconClassName="w-8 h-4"
            />
          </Carousel>
        </div>
        {/* Highlighted Images container */}
        <Carousel
          plugins={[plugin.current]}
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="hidden md:block relative h-[80dvh] rounded-xl my-2 mx-8 overflow-hidden"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          {/* Carousel (Layer 1) */}
          <ImageCarousel imageUrls={images} className="absolute inset-0 z-10" />

          {/* Gradient Overlay for Text Readability (Layer 2) */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* All Text and UI Elements Go Here (Layer 3, on top of everything) */}
          <div className="relative w-full h-full p-8 flex flex-col justify-end z-30">
            <div className="absolute top-15 flex justify-start gap-6">
              <CarouselPrevious />
              <CarouselNext />
            </div>

            {/* Bottom content container */}
            <div className="flex items-end justify-between gap-8">
              {/* Main Title (Now a sibling of the card) */}
              <h1 className="text-white text-5xl font-bold">
                Tampa Palms
                <br />
                Professional Center
              </h1>

              {/* Featured Suite Card (Now a sibling of the title) */}
              <Link href="/pages/Availability" className="block flex-shrink-0">
                <div className="w-60 h-auto bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 transition-all duration-300 hover:bg-white/20 hover:border-white/30">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="/images/TampaPalmsLogo.png" // Placeholder - use an actual suite image
                      alt="Highlighted Suite"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-white">
                      Highlighted Space
                    </h3>
                    <p className="text-sm text-white/80 mt-1">
                      Premium office with lake view.
                    </p>
                    <div className="mt-3 text-sm text-white font-bold">
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Carousel>
        <AboutUs />
        {/* Explore Spaces container */}
        <div className="rounded-xl my-16 md:my-24 mx-8">
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
        <div></div>
      </div>
    );
}