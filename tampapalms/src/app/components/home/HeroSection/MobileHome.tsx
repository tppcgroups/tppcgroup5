// file:components/home/HeroSection/MobileHome.tsx

"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/app/components/home/carousel/carousel";
import Autoplay from "embla-carousel-autoplay"

interface MobileHomeProps {
  imageUrls: string[];
}

export const MobileHome: React.FC<MobileHomeProps> = ({ imageUrls }) => {

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false})
    );

    return (
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
            {imageUrls.map((url, index) => (
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
    );
}
