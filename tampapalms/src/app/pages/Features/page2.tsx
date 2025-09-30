import React from "react";

export default function Features() {
    return (
        <div className="flex min-h-screen flex-row bg-[#f5f5f5] gap-4">
            {/* Left Panel */}
            <aside className="flex-1 bg-[#e0e0e0] flex flex-col justify-start p-12">
                <h2 className="text-5xl font-bold text-center mb-6">Amenities</h2>
                <h3 className="text-center text-base font-bold mb-4">
                    Strategic office location ~ Affluent demographics ~ Comprehensive
                    amenities
                </h3>

                <p className="flex flex-col text-center text-sm mb-8">
                    With its ideal location, comprehensive amenities, and responsive
                    on-site ownership team, Tampa Palms Professional Center provides a
                    prestigious business address where success comes naturally.
                </p>

                {/* Suites-select-buttons */}
                <div className="flex justify-center w-full gap-4">
                    <button className="flex-1 rounded-[20px] px-4 py-4 bg-white font-bold cursor-pointer mb-4 transition-colors duration-200">
                        Office Suites
                    </button>
                    <button className="flex-1 rounded-[20px] px-4 py-4 bg-[#444] text-white font-bold cursor-pointer mb-4 transition-colors duration-200">
                        Executive Suites
                    </button>
                </div>

                {/* Feature-list */}
                <div className="max-w-[400px] max-h-[300px] flex-grow overflow-y-auto border border-[#ccc] p-4 rounded-[12px] bg-white">
                    <ul className="list-disc pl-6">
                        <li className="mb-2">Free parking</li>
                        <li className="mb-2">Full time on-sight maintenance and ownership</li>
                        <li className="mb-2">Mail handling</li>
                        <li className="mb-2">Parking availability</li>
                    </ul>
                </div>
            </aside>

            {/* Right Panel */}
            <section className="flex-[2] flex justify-center items-center p-2">
                <img
                    src="5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-11-LargeHighDefinition.jpg"
                    alt="Office Suite"
                    className="max-w-full max-h-[80vh] rounded-[12px] object-cover"
                />
            </section>
        </div>
    );
}