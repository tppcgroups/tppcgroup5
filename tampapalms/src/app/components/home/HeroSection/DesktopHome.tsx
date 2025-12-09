// file:components/home/HeroSection/DesktopHome.tsx


"use client";
import * as React from "react";
import Link from "next/link";
import { ImageCarousel } from "@/app/components/home/carousel/ImageCarousel";
import HighlightedLocation from "./HighlightedLocation";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { getFontSize } from "@/lib/theme/typography";


import {
  Carousel,
  type CarouselApi,
} from "@/app/components/home/carousel/carousel";

import Autoplay from "embla-carousel-autoplay";


function useHtmlReduceMotion() {
    const [reduceMotion, setReduceMotion] = React.useState(false);

    React.useEffect(() => {
        if (typeof window === "undefined") return;

        const html = document.documentElement;

        const update = () => {
            setReduceMotion(html.classList.contains("reduce-motion"));
        };

        // Run once on mount
        update();

        // Watch for class changes on <html>
        const observer = new MutationObserver(update);
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return reduceMotion;
}

interface DesktopHomeProps {
    imageUrls: string[];
}

export const DesktopHome: React.FC<DesktopHomeProps> = ({ imageUrls }) => {

  const reduceMotion = useHtmlReduceMotion();
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const handleScrollDown = React.useCallback(() => {
    const target = document.getElementById("home-sections");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (typeof window !== "undefined") {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
    }
  }, []);


  const autoplayPlugin = React.useRef(
      reduceMotion ? null : Autoplay({ delay: 7000, stopOnInteraction: false }),
  );

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
      plugins={reduceMotion ? [] : [autoplayPlugin.current!]}
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="relative hidden h-[80dvh] overflow-hidden rounded-3xl mx-8 my-4 md:block"
  >
      <ImageCarousel
        imageUrls={imageUrls}
        className="absolute inset-0 z-10"
      />
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/40 via-black/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-30 flex h-full flex-col justify-between px-4 py-4">
        <div className="flex items-start justify-between gap-8">
          <div className="relative max-w-lg">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl bg-black/10 backdrop-blur-[2px]"
              aria-hidden="true"
            />
            <div className="relative space-y-5 p-5 text-[#fdf8f3]">
              <p
                className="font-semibold uppercase tracking-[0.35em] text-[#f0d4a6]"
                style={{ fontSize: getFontSize("small") }}
              >
                Flexible workspace in New Tampa
              </p>
              <h1
                className="font-semibold leading-snug text-[#fdf8f3]"
                style={{ fontSize: getFontSize("h1") }}
              >
                Tampa Palms
                <span className="block text-white">Professional Center</span>
              </h1>
              <p
                className="text-white"
                style={{ fontSize: getFontSize("body") }}
              >
                Featuring Class A office suites designed to meet the needs of today&apos;s businesses. With customizable spaces, scenic surroundings, and attentive on-site management.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/pages/Availability"
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#1f1a16] bg-white/95 shadow-lg hover:bg-white "
                >
                  View Availability
                </Link>
                <Link
                  href="/pages/Contact"
                  className="rounded-full border border-322b23  px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/10 hover:white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0d4a6]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <HighlightedLocation />
        </div>
        <div className="flex flex-col items-center justify-center pb-2 relative">
          {totalSlides > 1 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={`desktop-hero-slide-${index}`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 w-12 rounded-full transition ${
                    index === currentSlide
                      ? "bg-white"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
            <button
            type="button"
            onClick={handleScrollDown}
            className="z-20 mb-3 inline-flex h-12 w-12 items-center justify-center text-white shadow-2xl shadow-black/25 transition text-7xl cursor-pointer pt-10"
            aria-label="Scroll to next section"
          >
            <HiOutlineArrowSmDown className="h-10 w-10 animate-bounce" />
          </button>
        </div>
      </div>
    </Carousel>
  );
};
