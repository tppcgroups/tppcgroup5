// file: components/carousel/ImageCarousel.tsx

"use client"
import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/app/components/home/carousel/card"
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
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
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
        className="w-full max-w-4xl mx-auto"
        // Stop autoplay on mouse enter
        onMouseEnter={plugin.current.stop}
        // Start autoplay on mouse leave
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                    <Image
                      src={url}
                      alt={`Slide ${index + 1}`}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    ></Image>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    );
}