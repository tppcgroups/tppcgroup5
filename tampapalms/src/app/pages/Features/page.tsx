// file: src/app/pages/Features/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { PiCheckCircleBold } from "react-icons/pi";
import axios from "axios";
import {useEffect, useState} from "react";
import type {Building} from "@/app/components/availability/type"
type AvailabilityStatus = "available" | "comingSoon" | "occupied";


const normalizeStatus = (
    rawStatus: string | null | undefined
): AvailabilityStatus => {
  if (!rawStatus) return "occupied";
  const status = rawStatus.toLowerCase().trim();
  if (status === "available") return "available";
  return "occupied"; // Default to occupied/waitlisted for all other values
};

const featureTiles = [
  {
    heading: "Ten-Foot Ceilings",
    blurb:
      "Open atmosphere that adds a sense of space and sophistication to every room.",
  },
  {
    heading: "Custom Wrought-Iron Entry Doors and Beautifully Landscaped Entries",
    blurb:
      "Custom craftsmanship and lush landscaping come together to create a warm, inviting, and memorable entrance.",
  },
  {
    heading: "Elegant Architectural Design With Professional Appeal",
    blurb:
      "Sophisticated architecture combines elegance with a strong, professional presence.",
  },
  {
    heading: "Sound Insulated Walls and Solid Core Doors",
    blurb:
      "Thick, insulated walls and solid core doors ensure a quiet, private, and comfortable environment.",
  },
];

const amenityColumns = [
  {
    title: "Buildings/Suites",
    description:
      "Modern, suites in a prime location, combining convenience, comfort, and style.",
    items: [
      "Convenient access to top-rated schools, restaurants, parks, and the Tampa Palms Country Club featuring an Arthur Hills–designed golf course",
      "Assigned mailboxes with USPS delivery directly to the building",
      "Two shared break rooms and eight private bathrooms",
      "Professional business address with private mailbox",
      "Fiber high speed optic internet",
      "24/7 access with access cards and keys",
      "On-site management and maintenance team for tenant support",
      "Peaceful, scenic surroundings near lakeside walkways",
      "Located within a premier, multi-use business park for office, medical, and professional tenants",
      "Interior signage",
      "Ample on-site parking for tenants and visitors",
      "Conference room access with six complimentary hours per month"
    ],
  },
  {
    title: "Executive Suites",
    description:
      "Flexible office spaces designed for professionals, startups, and growing businesses.",
    items: [
      "Located within a premier, multi-use business park for office, medical, and professional tenants",
      "Fiber high speed optic internet",
      "Assigned mailboxes with USPS delivery directly to the building",
      "Professional business address with private mailbox",
      "Peaceful, scenic surroundings near lakeside walkways",
      "Convenient access to top-rated schools, restaurants, parks, and the Tampa Palms Country Club featuring an Arthur Hills–designed golf course",
      "Ample on-site parking for tenants and visitors"
    ],
  },
  {
    title: "S.O.A.R",
    description:
        "Co-working spaces that offers private offices, shared workspaces, and meeting rooms.",
    items: [
      "On-site management and maintenance team for tenant support",
      "Fiber high speed optic internet",
      "Convenient access to top-rated schools, restaurants, parks, and the Tampa Palms Country Club featuring an Arthur Hills–designed golf course",
      "Interior signage",
      "Assigned mailboxes with USPS delivery directly to the building",
      "Ample on-site parking for tenants and visitors",
      "Professional business address with private mailbox",
      "Four private bathrooms",
      "24/7 access with access cards",
      "Peaceful, scenic surroundings near lakeside walkways",
      "Located within a premier, multi-use business park for office, medical, and professional tenants"
    ],
  },
];

const supportHighlights = [
  {
    step: "01",
    title: "Guided onboarding",
    copy:
      "Our team coordinates walk-throughs, vendor introductions, and technology setup so your suite is ready the moment you arrive.",
  },
  {
    step: "02",
    title: "Responsive service",
    copy:
      "Maintenance requests route through our on-campus staff with real-time updates and priority-level tracking for quick resolutions.",
  },
  {
    step: "03",
    title: "Long-term partnership",
    copy:
      "Regular check-ins, space-planning guidance, and proactive upgrades keep your suite aligned with evolving operational needs.",
  },
];

export default function Features() {
  const [availableSuites, setAvailableSuites] = useState(0);
  const [uniqueBuildings, setUniqueBuildings] = useState(0);
  useEffect(()=>{
    async function getBuildings() {
      try {
        const response = await axios.get("/api/buildings");
        const rawBuildings = (response.data ?? []) as Building[];
        const availableSpaces = rawBuildings.filter(
          (b) => normalizeStatus(b.availability_status) === "available");
        console.log(availableSpaces.length);
        setAvailableSuites(availableSpaces.length)
        const uniqueByNumber = Array.from(
          new Map(
              rawBuildings.map((b)=>{
                const match = b.street_address?.match(/^\d+/);
                const buildingNumber = match ? match[0] : b.street_address;
                return [buildingNumber, b];
              })
          ).values()
        );
        setUniqueBuildings(uniqueByNumber.length);
        } catch (error) {
        console.error(error);
      }
    }
    getBuildings();
  },[])
  const stats = [
    { label: "Buildings Across Campus", value: `${uniqueBuildings}`},
    { label: "Move-In Ready Suites", value: `${availableSuites}`},
    { label: "On-Site Team Coverage", value: "7 Day" },
  ];
  return (
    <main className="min-h-screen bg-slate-100/70 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-0 h-[140%] w-[55%] bg-slate-200/60 blur-3xl" />
          <div className="absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-slate-200/70 via-white/60 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.2fr,0.8fr] md:px-10 lg:gap-16">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
              Features
            </span>
            <div className="space-y-5">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
                Amenities that balance productivity, wellness, and growth
              </h1>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                Tampa Palms Professional Center was designed as a campus—multiple buildings that work
                together to support companies of every size. Explore the on-site advantages that keep our
                tenants moving forward with ease.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/pages/Availability"
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-8 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 sm:w-auto"
              >
                View Availability
              </Link>
              <Link
                href="/pages/Contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-8 py-3 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100 sm:w-auto"
              >
                Schedule a Tour
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200/70">
              <Image
                src="/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-10-LargeHighDefinition.jpg"
                alt="Lobby and seating area at Tampa Palms Professional Center"
                width={1400}
                height={933}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 560px, 90vw"
                priority
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200">
              Modern interiors throughout campus
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 text-center md:grid-cols-3 md:px-10">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-slate-50/60 px-8 py-10 shadow-sm shadow-slate-900/5"
            >
              <p className="text-4xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="space-y-6 text-center md:space-y-8">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">What sets the campus apart</h2>
          <p className="mx-auto max-w-3xl text-sm text-slate-600 md:text-base">
            Each building is tuned for everyday use—welcoming clients, supporting focused work, and scaling with
            your team. Here are just a few ways Tampa Palms Professional Center stands out.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featureTiles.map((feature) => (
            <article
              key={feature.heading}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/10 ring-1 ring-transparent transition hover:-translate-y-1 hover:ring-slate-200"
            >
              <div
                className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-slate-200/70 via-slate-100 to-transparent blur-3xl transition group-hover:scale-110"
                aria-hidden="true"
              />
              <div className="relative space-y-4 text-left">
                <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Feature
                </span>
                <h3 className="text-2xl font-semibold text-slate-900">{feature.heading}</h3>
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">{feature.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Amenity Columns */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-[65%] -translate-x-1/2 bg-gradient-to-b from-slate-200/50 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-10">
          <div className="space-y-6 text-center md:space-y-8">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Amenities & Setting
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Designed to elevate every workday experience
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-slate-600 md:text-base">
              From tailored interiors to surroundings that encourage balance, the campus blends convenience with
              comfort.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {amenityColumns.map((column) => (
              <div
                key={column.title}
                className="rounded-3xl border border-slate-200/60 bg-slate-50/70 p-8 shadow-lg shadow-slate-900/10"
              >
                <h3 className="text-2xl font-semibold text-slate-900">{column.title}</h3>
                <p className="mt-3 text-sm text-slate-600 md:text-base">{column.description}</p>
                <ul className="mt-6 space-y-3 list-none">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-600 md:text-base"
                    >
                      <PiCheckCircleBold className="mt-1 h-5 w-5 flex-shrink-0 text-slate-500" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Journey */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="space-y-6 text-center md:space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Tenant Experience
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Support that stays with you beyond move-in
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-slate-600 md:text-base">
            The same ownership and maintenance teams who welcome you on day one remain on campus every day,
            ensuring your suite performs the way it should.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportHighlights.map((support) => (
            <div
              key={support.step}
              className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200"
            >
              <div className="text-left text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                {support.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{support.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{support.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-x-0 bottom-0 top-10 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_70%)]" />
        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          <div className="rounded-3xl border border-slate-200 bg-white/90 px-8 py-12 text-center shadow-2xl shadow-slate-900/20 backdrop-blur md:px-16">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              Next Steps
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
              Let&apos;s plan your visit to Tampa Palms Professional Center
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
              Reach out for current availability, arrange a tour, or connect with ownership directly to explore
              how the campus can support your work.
            </p>
            <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:justify-center">
              <Link
                href="/pages/Contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
              >
                Connect With Us
              </Link>
              <Link
                href="/pages/Availability"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-8 py-3 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Explore Availability
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
