"use client";

import React, { useState } from "react";

type Perk = {
    title: string;
    details: string[];
};

const perks: Perk[] = [
    {
        title: "Great Location",
        details: [
            "Great Lunch and Dining Locations",
            "Close Proximity to Downtown Tampa",
            "Professional Environment",
        ],
    },
    {
        title: "Onsite Support ",
        details: [
            "On-site Maintenance Team",
            "On-site Management Team",
            "Professional Reception and Mail Handling",
        ],
    },
    {
        title: "Secure Office Space",
        details: [
            "Video Surveillance",
            "Private, Lockable Office Suites",
            "Monitored Security",
        ],
    },
];

const Perks: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleDetails = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex w-full max-w-md flex-wrap justify-center items-center gap-5 md:flex-nowrap">
            {perks.map((perk, index) => {
                const isOpen = openIndex === index;
                return (
                    <article
                        key={perk.title}
                        className={`flex flex-col items-center rounded-2xl bg-white px-5 py-4 text-center shadow-md shadow-slate-900/5 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                            isOpen ? "scale-110 p-6" : "scale-100"
                        }`}
                        style={{
                            width: "12rem",
                            boxShadow: "0 0 20px 4px rgba(128, 128, 128, 0.4)",
                        }}
                    >
                        {/* Title always visible */}
                        <h3 className="text-sm font-semibold text-slate-900 text-center">
                            {perk.title}
                        </h3>

                        {/* Toggle button */}
                        <button
                            onClick={() => toggleDetails(index)}
                            className="mt-1 text-lg font-bold text-slate-600 hover:text-slate-900 transition"
                        >
                            {isOpen ? "−" : "+"}
                        </button>

                        {/* Expandable details */}
                        {isOpen && (
                            <div className="mt-2">
                                <ul className="list-disc list-inside text-xs text-slate-500 text-left">
                                    {perk.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
};

export default Perks;




