// file app/components/home/HeroSection/HighlightedLocation.tsx

"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"


export default function HighlightedLocation() {
    return (
        /* Highlighted Location Card */
        <Link href="/pages/Availability" className="block flex-shrink-0">
            <div className="w-60 h-auto bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 transition-all duration-300 hover:bg-white/20 hover:border-white/30">
            <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                src="/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-5-LargeHighDefinition.jpg" // Placeholder - use an actual suite image
                alt="Highlighted Suite"
                width={2000}
                height={4000}
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
    );
}