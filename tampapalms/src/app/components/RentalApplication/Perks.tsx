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
        <div className="flex flex-col w-full items-center justify-center gap-4">
            {perks.map((perk, index) => {
                const isOpen = openIndex === index;
                return (
                    <article
                        key={perk.title}
                        className={`flex w-full max-w-2xl flex-col rounded-xl border px-6 py-4 text-center transition-all duration-300 ease-out ${
                            isOpen
                                ? "border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                                : "border-slate-200 bg-white text-slate-900 shadow-md shadow-slate-900/10 hover:-translate-y-1 hover:shadow-lg"
                        }`}
                    >
                        {/* Header Row */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-current">{perk.title}</h3>

                            <button
                                onClick={() => toggleDetails(index)}
                                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-base font-semibold transition ${
                                    isOpen
                                        ? "border-white/70 bg-white/15 text-white hover:bg-white/20"
                                        : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                                }`}
                                type="button"
                                aria-expanded={isOpen}
                            >
              <span aria-hidden="true" className="leading-none">
                {isOpen ? "−" : "+"}
              </span>
                                <span className="sr-only">{isOpen ? "Collapse" : "Expand"}</span>
                            </button>
                        </div>

                        {/* Details (expand/collapse) */}
                        <div
                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden text-left">
                                <ul
                                    className={`list-disc list-inside text-sm ${
                                        isOpen ? "text-white/80" : "text-slate-500"
                                    }`}
                                >
                                    {perk.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default Perks;





