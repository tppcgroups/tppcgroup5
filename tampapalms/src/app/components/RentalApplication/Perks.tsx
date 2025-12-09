"use client";

import React, { useState } from "react";
import { PiMapPin, PiHeadphones, PiShieldCheck } from "react-icons/pi";

type Perk = {
  title: string;
  details: string[];
  icon: React.ElementType;
};

const perks: Perk[] = [
  {
    title: "Location Advantages",
    details: [
        "Heart of Tampa",
        "Near major neighborhoods",
        "Easy commute",
        "Free parking",
        "Lakeside views",
        "Nature surroundings",
        "Strong business community",
        "Nearby dining options"
    ],
    icon: PiMapPin,
  },
  {
    title: "Dedicated On-Site Service",
    details: [
        "On-site maintenance",
        "On-site management",
        "Reception and mail handling",
        "Quick support response",
        "Visitor check-in assistance",
        "Clean common areas"
    ],
    icon: PiHeadphones,
  },
  {
    title: "Office Safety & Security",
    details: [
        "24/7 video surveillance",
        "Lockable private suites",
        "Monitored security",
        "Controlled access",
        "Secure package area",
        "Well-lit parking"
    ],
    icon: PiShieldCheck,
  },
];

const Perks: React.FC = () => {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggleDetails = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      {perks.map((perk, index) => {
        const isOpen = openSet.has(index);
        const Icon = perk.icon;
        return (
          <article
            key={perk.title}
            className={`flex w-full max-w-2xl flex-col rounded-xl border px-6 py-4 transition-all duration-300 ease-out ${
              isOpen
                ? "border-[#4a4034] bg-[#1f1a16] text-white shadow-xl shadow-[#1f1a16]/20"
                : "border-[#e1d9cf] bg-white text-[#1f1a16] shadow-md shadow-[#1f1a16]/10 hover:-translate-y-1 hover:shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isOpen ? "bg-white/10 text-white" : "bg-[#f4ece1] text-[#4a4034]"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-base font-semibold text-current">{perk.title}</h3>
              </div>

              <button
                onClick={() => toggleDetails(index)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-base font-semibold transition ${
                  isOpen
                    ? "border-white/70 bg-white/15 text-white hover:bg-white/20"
                    : "border-[#d4c7b7] text-[#4a4034] hover:border-[#b6a895] hover:bg-[#f4ece1]"
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

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden text-left">
                <ul className={`list-disc list-inside text-sm ${isOpen ? "text-white/80" : "text-[#a49382]"}`}>
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





