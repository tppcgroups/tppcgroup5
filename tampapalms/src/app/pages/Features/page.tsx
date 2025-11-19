// file: src/app/pages/Features/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { PiCheckCircleBold } from "react-icons/pi";
import type { LucideIcon } from "lucide-react";
import { DoorOpen, Maximize2, PencilRuler, VolumeX } from "lucide-react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
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

type FeatureTile = { heading: string; blurb: string; icon: LucideIcon };

const featureTiles: FeatureTile[] = [
  {
    heading: "Ten-Foot Ceilings",
    blurb:
      "Open atmosphere that adds a sense of space and sophistication to every room.",
    icon: Maximize2,
  },
  {
    heading: "Custom Wrought-Iron Entry Doors and Beautifully Landscaped Entries",
    blurb:
      "Custom craftsmanship and lush landscaping come together to create a warm, inviting, and memorable entrance.",
    icon: DoorOpen,
  },
  {
    heading: "Elegant Architectural Design With Professional Appeal",
    blurb:
      "Sophisticated architecture combines elegance with a strong, professional presence.",
    icon: PencilRuler,
  },
  {
    heading: "Sound Insulated Walls and Solid Core Doors",
    blurb:
      "Thick, insulated walls and solid core doors ensure a quiet, private, and comfortable environment.",
    icon: VolumeX,
  },
];

const amenityColumns = [
  {
    title: "Buildings/Suites",
    description:
      "Modern, suites in a prime location, combining convenience, comfort, and style.",
    items: [
      "Two shared break rooms and eight private bathrooms",
      "Professional business address with private mailbox",
      "Fiber high speed optic internet",
      "24/7 access with access cards and keys",
      "Assigned mailboxes with USPS delivery directly to the building",
      "On-site management and maintenance team for tenant support",
      "Peaceful, scenic surroundings near lakeside walkways",
      "Convenient access to top-rated schools, restaurants, parks, and the Tampa Palms Country Club featuring an Arthur Hills–designed golf course",
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
      "Fiber high speed optic internet",
      "Assigned mailboxes with USPS delivery directly to the building",
      "Professional business address with private mailbox",
      "Peaceful, scenic surroundings near lakeside walkways",
      "Located within a premier, multi-use business park for office, medical, and professional tenants",
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
      "Interior signage",
      "Assigned mailboxes with USPS delivery directly to the building",
      "Ample on-site parking for tenants and visitors",
      "Convenient access to top-rated schools, restaurants, parks, and the Tampa Palms Country Club featuring an Arthur Hills–designed golf course",
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

const AmenityCard = ({ column }: { column: (typeof amenityColumns)[number] }) => {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const collapsedHeight = 220;
  const [maxHeight, setMaxHeight] = useState(collapsedHeight);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    if (!listRef.current) return;
    const fullHeight = listRef.current.scrollHeight;
    setHasOverflow(fullHeight > collapsedHeight);
    setMaxHeight(expanded ? fullHeight : collapsedHeight);
  }, [expanded, column.items, collapsedHeight]);

  return (
    <div className="rounded-3xl border border-[#e1d9cf]/60 bg-[#fdf8f3] p-8 shadow-lg shadow-[#1f1a16]/10 transition-all ease-in-out duration-200">
      <h3 className="text-2xl font-semibold text-[#1f1a16]">{column.title}</h3>
      <p className="mt-3 text-sm text-[#7a6754] md:text-base">
        {column.description}
      </p>
      <div className="relative mt-6">
        <ul
          ref={listRef}
          className="space-y-3 list-none overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ maxHeight }}
        >
          {column.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-[#7a6754] md:text-base"
            >
              <PiCheckCircleBold className="mt-1 h-5 w-5 flex-shrink-0 text-[#a49382]" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
        {!expanded && hasOverflow && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fdf8f3] to-transparent" />
        )}
      </div>
      {hasOverflow && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7a6754] hover:text-[#4a4034]"
        >
          {expanded ? "Show fewer amenities" : "View full list"}
        </button>
      )}
    </div>
  );
};

export default function Features() {
  return (
    <main className="min-h-screen bg-[#f9f7f3] text-[#1f1a16] pb-20">
      <header className="relative -mx-4 overflow-hidden rounded-none shadow-[0_35px_90px_-70px_rgba(31,26,22,0.8)] sm:-mx-6">
        <Image
          src="/images/Bldg5-019.jpg"
          alt="Lobby and seating area at Tampa Palms Professional Center"
          fill
          className="object-cover object-[center_70%]"
          sizes="(max-width: 768px) 200vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a16]/90 via-[#1f1a16]/45 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center text-white md:items-start md:px-14 md:py-20 md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em]">
            Features
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Amenities that balance productivity, wellness, and growth.
            </h1>
            <p className="max-w-3xl text-base text-white/85">
              Tampa Palms Professional Center was designed as a campus—multiple buildings that work as one. Explore the
              on-site advantages that keep operations effortless for teams of every size.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/pages/Availability"
              className="inline-flex w-full items-center justify-center rounded-full bg-white/95 px-8 py-3 font-semibold text-[#1f1a16] shadow-lg shadow-black/20 transition hover:bg-white sm:w-auto"
            >
              View Availability
            </Link>
            <Link
              href="/pages/Contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/60 px-8 py-3 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Schedule a Tour
            </Link>
          </div>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="space-y-6 text-center md:space-y-8">
          <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">What sets the campus apart</h2>
          <p className="mx-auto max-w-3xl text-sm text-[#7a6754] md:text-base">
            Each building is tuned for everyday use—welcoming clients, supporting focused work, and scaling with
            your team. Here are just a few ways Tampa Palms Professional Center stands out.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featureTiles.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.heading}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-[#c8b79f] bg-white p-6 shadow-lg shadow-black/5 transition hover:border-[#5a4b3c]"
              >
                <div className="relative flex h-full flex-col gap-3 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#ddd0bd] text-[#5a4b3c]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="block text-right text-xs font-semibold uppercase tracking-[0.35em] text-[#7a6754]">
                      Feature
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#1f1a16] md:text-xl">{feature.heading}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600 md:text-base">{feature.blurb}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Amenity Columns */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-[65%] -translate-x-1/2 bg-gradient-to-b from-[#efe7dd]/50 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-10">
          <div className="space-y-6 text-center md:space-y-8">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
              Amenities & Setting
            </span>
            <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">
              Designed to elevate every workday experience
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-[#7a6754] md:text-base">
              From tailored interiors to surroundings that encourage balance, the campus blends convenience with
              comfort.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {amenityColumns.map((column) => (
              <AmenityCard key={column.title} column={column} />
            ))}
          </div>
        </div>
      </section>

      {/* Support Journey */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="space-y-6 text-center md:space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
            Tenant Experience
          </span>
          <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">
            Support that stays with you beyond move-in
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-[#7a6754] md:text-base">
            The same ownership and maintenance teams who welcome you on day one remain on campus every day,
            ensuring your suite performs the way it should.
          </p>
          <div className="flex justify-center gap-6 ">
            <Image
                src="/images/Bldg5-Suite202-002.jpg"
                alt="Lobby and seating area at Tampa Palms Professional Center"
                width={500}
                height={100}
                className="rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportHighlights.map((support) => (
            <div
              key={support.step}
              className="rounded-3xl bg-white p-8 shadow-xl shadow-[#1f1a16]/10 ring-1 ring-[#e1d9cf]"
            >
              <div className="text-left text-xs font-semibold uppercase tracking-[0.4em] text-[#c8b79f]">
                {support.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#1f1a16]">{support.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#7a6754] md:text-base">{support.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
