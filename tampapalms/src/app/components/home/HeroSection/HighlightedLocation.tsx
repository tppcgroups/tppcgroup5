// file app/components/home/HeroSection/HighlightedLocation.tsx

"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight,FaArrowLeft } from "react-icons/fa6";


export default function HighlightedLocation() {
    const highlightedSpaceID = "5-226";
    return (
      /* Highlighted Location Card */
      <Link href={{
        pathname: "/pages/Availability",
        query: {spaceId: highlightedSpaceID}}} 
        className="hidden md:block flex-shrink-0">
        <div className="w-60 h-auto bg-black/10 backdrop-blur-[2px] rounded-xl p-4 transition-all duration-300 hover:bg-black/10 hover:border-black/30">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-5-LargeHighDefinition.jpg"
              alt="Highlighted Suite"
              width={2000}
              height={4000}
              className="object-cover"
            />
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-white">Highlighted Space</h3>
            <p className="text-sm text-white/80 mt-1">
              Premium office with lake view.
            </p>
            <div className="mt-3 text-sm text-white font-bold">
              View Details →
            </div>
          </div>
        </div>
      </Link>
    );
}