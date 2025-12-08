"use client";

import Image from "next/image";
import Link from "next/link";
import { PiCheckCircleBold } from "react-icons/pi";
import type { LucideIcon } from "lucide-react";
import { DoorOpen, Maximize2, PencilRuler, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import config from "../../../../../config.json";
import InfoBlurb from "../../components/contact/InfoBlurb";

type FeatureTile = { heading: string; blurb: string; icon: string };
type AmenityColumn = { title: string; description: string; items: string[] };
type SupportHighlight = { step: string; title: string; copy: string };

const iconMap: Record<string, LucideIcon> = {
  DoorOpen,
  PencilRuler,
  Maximize2,
  VolumeX,
};

const AmenityCard = ({ column }: { column: AmenityColumn }) => {
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
    <div className="rounded-3xl border border-[#e1d9cf]/60 bg-white p-8 shadow-lg shadow-[#1f1a16]/10 transition-all ease-in-out duration-200">
      <h3 className="text-2xl font-semibold text-[#1f1a16]">{column.title}</h3>
      <p className="mt-3 text-sm text-[#7a6754] md:text-base">{column.description}</p>
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
  const featureTiles: FeatureTile[] = config.featuresPage.featureTiles;
  const amenityColumns: AmenityColumn[] = config.featuresPage.amenityColumns;
  const supportHighlights: SupportHighlight[] = config.featuresPage.supportHighlights;

  return (
    <main className="min-h-screen bg-white text-[#1f1a16]">
      {/* Header */}
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
              Tampa Palms Professional Center was designed as multiple buildings that work as one. Explore the
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

      {/* Feature Tiles */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="space-y-6 text-center md:space-y-8">
          <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">What sets Tampa Palms Professional Center apart</h2>
          <p className="mx-auto max-w-3xl text-sm text-[#7a6754] md:text-base">
            Each building is tuned for everyday use—welcoming clients, supporting focused work, and scaling with
            your team. Here are just a few ways Tampa Palms Professional Center stands out.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featureTiles.map((feature) => {
            const Icon = iconMap[feature.icon];
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

      {/* Amenities */}
      <section className="relative overflow-hidden bg-[#f9f7f3] py-20 md:py-24">
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
              From thoughtful interiors to balanced spaces that blend convenience with comfort.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {amenityColumns.map((column) => (
              <AmenityCard key={column.title} column={column} />
            ))}
          </div>
        </div>
      </section>

      {/* Elevate your workstyle */}
      <section className="mx-auto bg-white px-6 py-20 text-center md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
          Elevate Your Workstyle
        </p>
        <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">
          Amenities Tailored to you 
        </h2>
        
        <div className="mt-8 text-center flex flex-col  sm:flex-row sm:justify-center ">
          <p className="max-w-3xl text-sm text-[#7a6754] md:text-base">
          Tampa Palms Professional Center is a 140,000 square foot mixed use business complex along scenic Primrose Lake. 
          The property offers office, medical, retail, and hospitality spaces built to support businesses of all sizes. 
          Each of the 26 buildings features elegant entrances, high ceilings, and well kept landscaping, with convenient access to nearby coworking areas for flexible work options.
          </p>
        </div>
        
        <div className="flex justify-center pt-1">
          <Image
            src="/images/Bldg5-Suite202-007.jpg"
            alt="Office space at Tampa Palms Professional Center"
            width={600}
            height={300}
            className="rounded-3xl object-cover shadow-2xl mt-8"
          />
        </div>

        <div className="mt-8 text-center flex flex-col gap-3 sm:flex-row sm:justify-center">
          <p className="max-w-3xl text-sm text-[#7a6754] md:text-base">
          Tenants can adjust their office space as their needs change, making growth simple and convenient. 
          Located in the vibrant Tampa Palms neighborhood, the center is close to parks, schools, restaurants, 
          and the Tampa Palms Country Club with its Arthur Hills designed golf course.
          </p>
        </div>
      </section>


      {/* Convenient Access Section */}
      <section className="relative py-20 pt-5 bg-[#f9f7f3] md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="space-y-6 text-center md:space-y-8">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
              Access Made Easy
            </span>
            <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">
              Convenient Access
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-[#7a6754] md:text-base">
              Prime location with easy regional connectivity, perfect for teams and clients alike.
            </p>
          </div>

          {/* Blurry Grey Card */}
          <div className="relative mt-12"> 
            
            {/* Background image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <img
                src="/images/bldg6-006.jpg"
                alt="Tampa Palms area map"
                className="h-full w-full object-cover brightness-8-"
              />
            </div>

            {/* Actual card */}
            <div className="relative z-10 rounded-3xl border border-white/20 bg-[#f9f7f3]/40 backdrop-blur-sm p-15 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Left Text Side */}
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-6">Prime Location</h3>

                  <ul className="space-y-3 text-lg text-black">
                    <li className="flex items-start gap-3">
                      <PiCheckCircleBold className="mt-1 h-5 w-5 flex-shrink-0 text-[#a49382]" />
                      Located right off I-75 and Bruce B. Downs, one of the busiest corridors in Tampa Bay.
                    </li>
                    <li className="flex items-start gap-3">
                      <PiCheckCircleBold className="mt-1 h-5 w-5 flex-shrink-0 text-[#a49382]" />
                      Only a couple minutes from the interstate.
                    </li>
                    <li className="flex items-start gap-3">
                      <PiCheckCircleBold className="mt-1 h-5 w-5 flex-shrink-0 text-[#a49382]" />
                      Less than ten minutes from I-4 and I-275.
                    </li>
                    <li className="flex items-start gap-3">
                      <PiCheckCircleBold className="mt-1 h-5 w-5 flex-shrink-0 text-[#a49382]" />
                      Easy access to the entire region.
                    </li>
                  </ul>

                  <div className="flex justify-center md:justify-start">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=17425+Bridge+Hill+Ct,+Tampa,+FL+33647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center justify-center w-full text-center md:w-auto rounded-full bg-[#a49382] px-35 py-4 text-lg font-semibold text-white shadow-lg hover:bg-[#8b7a66] transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>

                {/* Right Map Side */}
                <div>
                  <InfoBlurb />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Support Highlights */}
      <section className="mx-auto px-6 py-20 md:px-10 pb-35">
        <div className="space-y-6 text-center md:space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
            Tenant Experience
          </span>
          <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">
            Support that stays with you beyond move-in
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-[#7a6754] md:text-base">
            The same ownership and maintenance teams who welcome you on day one stay part of the process,
            ensuring your suite performs the way it should.
          </p>
        </div>
        <div className="flex justify-center gap-6 pt-8">
            <Image
                src="/images/Bldg5-Suite202-002.jpg"
                alt="Lobby and seating area at Tampa Palms Professional Center"
                width={500}
                height={100}
                className="rounded-3xl object-cover shadow-2xl"
            />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
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
