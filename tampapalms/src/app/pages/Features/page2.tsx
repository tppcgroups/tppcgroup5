import React from "react";
import Image from "next/image";
import Spacer from "@/app/components/Spacer"

export default function Features() {
    return (
        <div>
            {/* Desktop Version */}
            <div className="hidden md:flex min-h-screen bg-[#f5f5f5]">
                {/* Left Panel */}
                <aside className="flex-1 bg-[#e0e0e0] flex flex-col justify-start p-12">
                    <h2 className="text-5xl font-bold text-center mb-6">Amenities</h2>
                    <h3 className="text-center text-base font-bold mb-4">
                        Strategic office location ~ Affluent demographics ~ Comprehensive amenities
                    </h3>
                    <p className="text-center text-sm mb-8">
                        With its ideal location, comprehensive amenities, and responsive
                        on-site ownership team, Tampa Palms Professional Center provides a
                        prestigious business address where success comes naturally.
                    </p>

                    {/* Suites-select-buttons */}
                    <div className="flex justify-center w-full gap-4 mb-4">
                        <button className="flex-1 rounded-[20px] px-4 py-4 bg-[#444] text-white font-bold cursor-pointer transition-colors duration-200">
                            Office Suites
                        </button>
                        <button className="flex-1 rounded-[20px] px-4 py-4 bg-white font-bold cursor-pointer transition-colors duration-200">
                            Executive Suites
                        </button>
                    </div>

                    {/* Feature-list */}
                    <div className="w-[400px] h-[200px] overflow-y-auto border border-[#ccc] p-4 rounded-[12px] bg-white">
                        <ul className="list-disc pl-6">
                            <li className="mb-2">Free parking</li>
                            <li className="mb-2">Frontier Smart Park/Fios</li>
                            <li className="mb-2">Private Restroom and Breakrooms</li>
                            <li className="mb-2">Responsive on-site property maintenance, management, and ownership.</li>
                            <li className="mb-2">Fronting I-75 & Bruce B. Downs Blvd. commercial corridor</li>
                            <li className="mb-2">High-quality, energy-efficient design and construction</li>
                            <li className="mb-2">Full time on-site maintenance and ownership</li>
                            <li className="mb-2">Extensive lake and woodland conservation area</li>
                        </ul>
                    </div>
                    <div className="h-5"></div>
                </aside>

                {/* Right Panel */}
                <section className="flex-[2] flex justify-center items-center">
                    <Image
                        src="/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-14-LargeHighDefinition.jpg"
                        alt="Office Suite"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                    />
                </section>
            </div>

            {/* Mobile Version */}
            <div className="block md:hidden bg-[#f5f5f5] min-h-screen p-4">
                <h2 className="text-4xl font-bold text-center mb-4">Amenities</h2>
                <h3 className="text-center text-base font-bold mb-2">
                    Strategic office location ~ Affluent demographics ~ Comprehensive amenities
                </h3>
                <p className="text-center text-sm mb-4">
                    With its ideal location, comprehensive amenities, and responsive on-site ownership team, Tampa Palms Professional Center provides a prestigious business address where success comes naturally.
                </p>

                {/* Image */}
                <div className="w-full mb-4">
                    <Image
                        src="/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-11-LargeHighDefinition.jpg"
                        alt="Office Suite"
                        width={1920}
                        height={1080}
                        className="w-full h-auto rounded-[12px] object-cover"
                    />
                </div>

                {/* Suites-select-buttons */}
                <div className="flex flex-col gap-4 mb-4">
                    <button className="w-full rounded-[20px] px-4 py-4 bg-[#444] text-white font-bold cursor-pointer transition-colors duration-200">
                        Office Suites
                    </button>
                    <button className="w-full rounded-[20px] px-4 py-4 bg-white font-bold cursor-pointer transition-colors duration-200">
                        Executive Suites
                    </button>
                </div>

                {/* Feature-list */}
                <div className="w-full h-[200px] overflow-y-auto border border-[#ccc] p-4 rounded-[12px] bg-white">
                    <ul className="list-disc pl-6">
                        <li className="mb-2">Free parking</li>
                        <li className="mb-2">Frontier Smart Park/Fios</li>
                        <li className="mb-2">extra</li>
                        <li className="mb-2">extra</li>
                        <li className="mb-2">extra</li>
                        <li className="mb-2">Fronting I-75 & Bruce B. Downs Blvd. commercial corridor</li>
                        <li className="mb-2">High-quality, energy-efficient design and construction</li>
                        <li className="mb-2">Extra item 3</li>
                        <li className="mb-2">Full time on-site maintenance and ownership</li>
                        <li className="mb-2">Extensive lake and woodland conservation area</li>
                    </ul>
                </div>
            </div>
            <div className="h-5"></div>
        </div>
    );
}