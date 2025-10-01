"use client";

import Link from "next/link";
import TitleCard from "@/app/components/TitleCard";
import { Building2, Clock3, MapPin, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Detail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

type CallToAction = {
  label: string;
  href: string;
};

type Props = {
  images?: string[];
  mapEmbedSrc?: string;
  title?: string;
  description?: string;
  details?: Detail[];
};

const DEFAULT_DETAILS: Detail[] = [
  {
    icon: MapPin,
    label: "Address",
    value: "17427 Bridge Hill Court, Suite C,Tampa, FL 33647",
  },
  {
    icon: Clock3,
    label: "Lobby Hours",
    value: "Mon – Fri · 9:00 AM – 5:00 PM",
  },
  {
    icon: PhoneCall,
    label: "Contact",
    value: "(813) 555-1234",
    href: "tel:+18135551234",
  },
  {
    icon: Building2,
    label: "Available Suites",
    value: "Suite 210 · 1,450 sq ft",
  },
];

export default function LocationInsights({

  // Map Location 
  mapEmbedSrc = "https://www.google.com/maps?q=28.1285165,-82.3810778&z=17&output=embed",
  title = "Location Insights",
  description = "Located in the heart of New Tampa, Tampa Palms Professional Center keeps you close to upscale dining, shopping, and I-75 access while remaining surrounded by lush nature preserves.",
  details = DEFAULT_DETAILS,
}: Props) {
  return (

    // Wrapper for the content
    <section className="bg-gray-50 py-12 ">
      <div className="mx-auto max-w-7xl px-4">

        {/* Header Section */}
        <TitleCard title={title} />
        <p className="mt-4 max-w-3xl text-base text-slate-600">{description}</p>
        <div className="mt-10 gap-8">

          {/* Map and Details Card */}
          <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5">
            <div>

              {/* Header Section in the Card */}
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Plan Your Visit</h3>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Primary Location</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Discover nearby amenities, logistics, and accessibility highlights that make this
                address a standout choice for professionals across Tampa Bay.
              </p>

              {/* Mapping through all the Details from DEFAULT_DETAILS */}
              {details.length > 0 && (
                <ul className="mt-6 space-y-4">
                  {details.map((detail) => {
                    const Icon = detail.icon;

                    // If the detail has href make it clickable
                    const content = detail.href ? (
                      <a
                        href={detail.href}
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-500"
                        target={detail.href.startsWith("http") ? "_blank" : undefined}
                        rel={detail.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-900">
                        {detail.value}
                      </span>
                    );

                    // Creating a list item for each detail Icon and content label
                    return (
                      <li className="flex gap-3">
                        <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Icon size={18} strokeWidth={1.75} /></span>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{detail.label}</p>
                          {content}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Map Information and Output */}
            <div className="overflow-hidden rounded-2xl border border-emerald-100 shadow-inner">
              <iframe
                title="Property Location"
                src={mapEmbedSrc}
                className="h-[380px] w-full md:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
