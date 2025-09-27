// file: components/carousel/ImageCarousel.tsx

"use client"
import * as React from "react"
import Image from "next/image"
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselNext,
    CarouselPrevious,
} from "@/app/components/home/carousel/carousel"

// Import the autoplay plugin
import Autoplay from "embla-carousel-autoplay"

// Define the type for the componenet's props
interface ImageCarouselProps {
    imageUrls: string[];
    className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls, className }) => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    )
    return (
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className={`w-full h-full ${className || ""}`}
        // Stop autoplay on mouse enter
        onMouseEnter={plugin.current.stop}
        // Start autoplay on mouse leave
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={url}
                  alt={`Slide ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover object-position-center"
                ></Image>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-15 top-15 z-30 hidden sm:flex" />
        <CarouselNext className="absolute left-50 top-15 z-30 hidden sm:flex" />
      </Carousel>
    );
}