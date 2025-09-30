// file: components/carousel/ImageCarousel.tsx

"use client";
import * as React from "react";
import Image from "next/image";
import {
  CarouselContent,
  CarouselItem,
} from "@/app/components/home/carousel/carousel";

// This component is now much simpler.
interface ImageCarouselProps {
  imageUrls: string[];
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  imageUrls,
  className,
}) => {
  return (
    <div className={`w-full h-full ${className || ""}`}>
      <CarouselContent className="h-full">
        {imageUrls.map((url, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="relative w-full h-full">
              <Image
                src={url}
                alt={`Slide ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </div>
  );
};
