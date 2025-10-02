"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AvailabilityHero } from "@/app/components/availability/AvailabilityHero";
import { SuiteDetails } from "@/app/components/availability/SuiteDetails";
import { SuiteGallery } from "@/app/components/availability/SuiteGallery";
import { SuiteHighlights } from "@/app/components/availability/SuiteHighlights";
import { SuiteList } from "@/app/components/availability/SuiteList";
import type { Suite } from "@/app/components/availability/type";

// Suite catalog used to drive the availability page content.
const suites: Suite[] = [
  {
    id: "ste-105",
    label: "Suite 105",
    building: "Primrose Lake Circle",
    size: "354 SF",
    status: "available",
    type: "Executive Suite",
    rate: "By Request",
    description:
      "Corner suite with floor-to-ceiling windows, reception area, four private offices, and a conference room ready for hybrid teams.",
    features: [
      "Fully wired for Frontier Smart Park/Fios",
      "Dedicated break area with sink and cabinetry",
      "Near main lobby and visitor parking",
    ],
    images: [
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-5-LargeHighDefinition.jpg",
        alt: "Executive desk with natural light",
      },
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-4-LargeHighDefinition.jpg",
        alt: "Shared breakout seating",
      },
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
        alt: "Exterior of Primrose Lake Circle",
      },
    ],
    category: "executive",
    brochureHref: "/documents/tppc-suite-101.pdf",
  },
  {
    id: "ste-107",
    label: "Suite 107",
    building: "Primrose Lake Circle",
    size: "274 SF",
    status: "available",
    type: "Executive Suite",
    rate: "By Request",
    description:
      "Corner suite with floor-to-ceiling windows, reception area, four private offices, and a conference room ready for hybrid teams.",
    features: [
      "Fully wired for Frontier Smart Park/Fios",
      "Dedicated break area with sink and cabinetry",
      "Near main lobby and visitor parking",
    ],
    images: [
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-11-LargeHighDefinition.jpg",
        alt: "Executive desk with natural light",
      },
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-4-LargeHighDefinition.jpg",
        alt: "Shared breakout seating",
      },
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
        alt: "Exterior of Primrose Lake Circle",
      },
    ],
    category: "executive",
    brochureHref: "/documents/tppc-suite-101.pdf",
  },
  {
    id: "ste-119",
    label: "Suite 119",
    building: "Primrose Lake Circle",
    size: "323 SF",
    status: "available",
    type: "Executive Suite",
    rate: "By Request",
    description:
      "Bright second-floor suite ideal for professional services. Includes a reception zone, two private offices, and generous storage.",
    features: [
      "Glass sidelights for natural light",
      "Shared conference room access on floor",
      "Steps from the elevator core",
    ],
    images: [
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-6-LargeHighDefinition.jpg",
        alt: "Executive desk with natural light",
      },
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-4-LargeHighDefinition.jpg",
        alt: "Shared breakout seating",
      },
      {
        src: "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg",
        alt: "Exterior of Primrose Lake Circle",
      },
    ],
    category: "executive",
    brochureHref: "/documents/tppc-suite-220.pdf",
  },
  {
    id: "ste-101",
    label: "Suite 101",
    building: "Bridge Hill Court",
    size: "1974 SF",
    status: "occupied",
    type: "Office",
    rate: "Join Waitlist",
    description:
      "Functional flex office currently committed. Join the waitlist for the next availability in this configuration.",
    features: [
      "Private office with open work bay",
      "Shared lounge & kitchenette access",
      "Proximity to wellness trail and campus amenities",
    ],
    images: [
      {
        src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-14-LargeHighDefinition.jpg",
        alt: "Indoor Office Picture",
      },
      {
        src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-15-LargeHighDefinition.jpg",
        alt: "Workstations inside Suite 305",
      },
      {
        src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-16-LargeHighDefinition.jpg",
        alt: "Kitchenette inside suite",
      },
      {
        src: "/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Building-Photo-10-LargeHighDefinition.jpg",
        alt: "Bridge Hill Court exterior angle",
      },
    ],
    category: "buildings",
  },
];

const suiteFilterOptions: Array<{ label: string; value: "buildings" | "executive" }> = [
  { label: "Buildings/Suites", value: "buildings" },
  { label: "Executive Suites", value: "executive" },
];

// Marketing blurbs featured near the bottom of the page.
const campusHighlights = [
  {
    title: "Executive Offices",
    description: "Private, move-in-ready suites for professionals seeking a polished home base.",
  },
  {
    title: "Team Suites",
    description: "Flexible layouts with space for collaboration, branding, and visitors.",
  },
  {
    title: "Campus Amenities",
    description: "Complimentary parking, fiber connectivity, and responsive on-site ownership.",
  },
];

export default function AvailabilityPage() {
  // UI state for the currently active suite, gallery image, and category filter.
  const [activeSuiteId, setActiveSuiteId] = useState<Suite["id"]>(suites[0]?.id ?? "");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<"buildings" | "executive">("buildings");

  // Grab the suites that match the selected tab.
  const filteredSuites = useMemo(
    () => suites.filter((suite) => suite.category === selectedCategory),
    [selectedCategory]
  );

  // Fall back to the full list if a category has no entries yet.
  const visibleSuites = filteredSuites.length ? filteredSuites : suites;

  // Resolve the full suite record backing the current selection.
  const activeSuite = useMemo(
    () => visibleSuites.find((suite) => suite.id === activeSuiteId) ?? visibleSuites[0],
    [activeSuiteId, visibleSuites],
  );

  const images = activeSuite?.images ?? [];

  // Keep selections in sync when the visible suites set changes (e.g., new filter).
  useEffect(() => {
    if (!visibleSuites.some((suite) => suite.id === activeSuiteId)) {
      const fallback = visibleSuites[0]?.id ?? "";
      setActiveSuiteId(fallback);
      setActiveImageIndex(0);
    }
  }, [visibleSuites, activeSuiteId]);

  // User interactions that update the active category or suite.
  const handleCategoryChange = (category: "buildings" | "executive") => {
    setSelectedCategory(category);
  };

  const handleSuiteSelect = (id: string) => {
    setActiveSuiteId(id);
    setActiveImageIndex(0);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* Introduces the page and reports total availability. */}
      <AvailabilityHero availableCount={suites.filter((suite) => suite.status === "available").length} />

      <section className="mx-auto max-w-6xl px-4 pb-20">
        {/* Category toggle pills. */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex rounded-full border border-slate-200 bg-white p-1">
            {suiteFilterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleCategoryChange(option.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  selectedCategory === option.value
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Core layout: list + gallery + supporting details. */}
        <div className="grid gap-8 lg:grid-cols-2">
          <SuiteList
            suites={visibleSuites}
            activeSuiteId={activeSuite?.id ?? ""}
            onSelectSuite={handleSuiteSelect}
          />

          <SuiteGallery
            images={images}
            activeImageIndex={activeImageIndex}
            onPrev={() => {
              if (!images.length) return;
              setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            onNext={() => {
              if (!images.length) return;
              setActiveImageIndex((prev) => (prev + 1) % images.length);
            }}
            onSelectImage={setActiveImageIndex}
            suiteLabel={activeSuite?.label}
          />
        </div>

        {/* Detail panels for the selected suite. */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          {activeSuite && <SuiteDetails suite={activeSuite} />}
          {activeSuite && <SuiteHighlights suite={activeSuite} />}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          {/* Campus highlight cards and CTAs. */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Explore the Campus
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Workspace options for every stage</h2>
            <p className="mt-4 text-sm text-slate-600">
              From executive offices to flexible suites, Tampa Palms Professional Center pairs modern
              workspace design with on-site hospitality and amenities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {campusHighlights.map((category) => (
              <article
                key={category.title}
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{category.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-sm md:flex-row md:justify-center">
            <Link
              href="/pages/Features"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800"
            >
              See Amenities
            </Link>
            <Link
              href="/pages/Apply"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
