// file:components/home/HeroSection/DesktopHome.tsx

"use client";
import * as React from "react";
import Link from "next/link";
import { ImageCarousel } from "@/app/components/home/carousel/ImageCarousel";
import HighlightedLocation from "./HighlightedLocation";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/app/components/home/carousel/carousel";
import Autoplay from "embla-carousel-autoplay";

interface DesktopHomeProps {
  imageUrls: string[];
}

export const DesktopHome: React.FC<DesktopHomeProps> = ({ imageUrls }) => {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  if (imageUrls.length === 0) {
    return null;
  }

  const totalSlides = imageUrls.length;

  return (
    <Carousel
      plugins={[autoplayPlugin.current]}
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="relative hidden h-[80dvh] overflow-hidden rounded-3xl mx-8 my-4 min-[900]:block"
      onMouseEnter={() => autoplayPlugin.current.stop()}
      onMouseLeave={() => autoplayPlugin.current.play()}
  >
      <ImageCarousel
        imageUrls={imageUrls}
        className="absolute inset-0 z-10"
      />

      <div className="relative z-30 flex h-full flex-col justify-between px-6 py-6">
        <div className="flex items-start justify-between gap-8">
          <div className="relative max-w-lg">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gray/20 backdrop-blur-xl"
              aria-hidden="true"
            />
            <div className="relative space-y-5 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                Flexible workspace in New Tampa
              </p>
              <h1 className="text-4xl font-semibold leading-snug">
                Tampa Palms
                <span className="block text-white">Professional Center</span>
              </h1>
              <p className="text-base text-white/80">
                Discover full-floor suites and executive offices designed to keep
                teams connected, productive, and close to Tampa Palms amenities.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/pages/Availability"
                  className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View Availability
                </Link>
                <Link
                  href="/pages/Contact"
                  className="rounded-full border border-white/70 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Schedule a Tour
                </Link>
              </div>
            </div>
          </div>

          <HighlightedLocation />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CarouselPrevious
              className=" flex h-12 w-20 translate-y-0 items-center justify-center rounded-full border border-transparent bg-white/5 text-white transition hover:border-white hover:bg-white/10"
              iconClassName="h-6 w-8"
            />
            <CarouselNext
              className=" flex h-12 w-20 translate-y-0 items-center justify-center rounded-full border border-transparent bg-white/5 text-white transition hover:border-white hover:bg-white/10"
              iconClassName="h-6 w-8"
            />
          </div>

          {totalSlides > 1 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <span
                  key={`desktop-hero-slide-${index}`}
                  className={`h-1.5 w-10 rounded-full transition ${
                    index === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Carousel>
  );
};
