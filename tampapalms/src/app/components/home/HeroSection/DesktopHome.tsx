// file:components/home/HeroSection/DesktopHome.tsx

"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageCarousel } from "@/app/components/home/carousel/ImageCarousel";
import HighlightedLocation from "./HighlightedLocation";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/app/components/home/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";

interface DesktopHomeProps {
  imageUrls: string[];
}

export const DesktopHome: React.FC<DesktopHomeProps> = ({imageUrls}) => {

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false})
    );

    const [api, setApi] = React.useState<CarouselApi>();

    return (
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="hidden md:block relative h-[80dvh] rounded-xl my-2 mx-8 overflow-hidden"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        {/* Carousel (Layer 1) */}
        <ImageCarousel
          imageUrls={imageUrls}
          className="absolute inset-0 z-10"
        />

        {/* Gradient Overlay for Text Readability (Layer 2) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* All Text and UI Elements Go Here (Layer 3, on top of everything) */}
        <div className="relative w-full h-full p-8 flex flex-col justify-end z-30">
          <div className="absolute top-15 flex justify-start gap-6">
            <CarouselPrevious iconClassName="w-8 h-4" />
            <CarouselNext iconClassName="w-8 h-4" />
          </div>

          {/* Bottom content container */}
          <div className="flex items-end justify-between gap-8">
            {/* Main Title (Now a sibling of the card) */}
            <h1 className="text-white text-5xl font-bold">
              Tampa Palms
              <br />
              Professional Center
            </h1>
            <HighlightedLocation />
          </div>
        </div>
      </Carousel>
    );

}