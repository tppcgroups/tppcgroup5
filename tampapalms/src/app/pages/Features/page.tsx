"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PiCheckCircleBold } from "react-icons/pi";

const suiteOptions = [
  {
    label: "Office Suites",
    isPrimary: true,
  },
  {
    label: "Executive Suites",
    isPrimary: false,
  },
];

const amenities = [
  "Free parking campus-wide",
  "Frontier Smart Park/Fios connectivity",
  "Private restrooms and breakrooms",
  "Responsive on-site property maintenance, management, and ownership",
  "Frontage along I-75 & Bruce B. Downs Blvd. commercial corridor",
  "High-quality, energy-efficient design and construction",
  "Full-time on-site maintenance and ownership team",
  "Extensive lake and woodland conservation area",
];

export default function Features() {
  const [selectedOption, setSelectedOption] = useState<string>(suiteOptions[0]?.label ?? "");

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      {/* Desktop Layout */}
      <section className="relative hidden min-h-screen md:flex">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_60%)]" aria-hidden="true" />

        <aside className="relative z-10 flex w-full max-w-[520px] flex-col gap-8 rounded-r-3xl bg-white p-12 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              Amenities
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              Elevated campus experiences for every tenant
            </h1>
            <p className="text-sm text-slate-600">
              With its ideal location, tailored amenities, and a responsive ownership team on-site daily,
              Tampa Palms Professional Center delivers a polished setting where your business can thrive.
            </p>
          </div>

          <div className="flex w-full gap-4">
            {suiteOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelectedOption(option.label)}
                className={`flex-1 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  selectedOption === option.label
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800"
                    : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="h-px bg-slate-200" aria-hidden="true" />

          <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200">
            <p className="text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Included Features
            </p>
            <ul className="flex flex-col gap-3 text-left text-sm text-slate-600">
              {amenities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <PiCheckCircleBold className="mt-0.5 text-lg text-slate-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3 pt-2 text-sm md:flex-row md:justify-center">
            <Link
              href="/pages/Contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 md:w-auto"
            >
              Schedule a Tour
            </Link>
            <Link
              href="/pages/Availability"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-100 md:w-auto"
            >
              View Availability
            </Link>
          </div>
        </aside>

        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute inset-0 z-10" aria-hidden="true" />
          <Image
            src="/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-14-LargeHighDefinition.jpg"
            alt="Office Suite interior"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute bottom-8 right-8 z-20 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200">
            Interior Suite
          </div>
        </div>
      </section>

      {/* Mobile Layout */}
      <section className="block min-h-screen px-5 py-16 md:hidden">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Amenities</p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900">
              Elevated campus experiences for every tenant
            </h2>
            <p className="text-sm text-slate-600">
              With its ideal location, tailored amenities, and a responsive ownership team on-site daily,
              Tampa Palms Professional Center delivers a polished setting where your business can thrive.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10">
            <Image
              src="/images/17425/17425-Bridge-Hill-Ct-Tampa-FL-Interior-Photo-14-LargeHighDefinition.jpg"
              alt="Office Suite interior"
              width={1920}
              height={1080}
              className="w-full object-cover"
              priority
            />
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {suiteOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelectedOption(option.label)}
                className={`w-full rounded-full px-5 py-3 text-sm font-semibold transition ${
                  selectedOption === option.label
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800"
                    : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Included Features
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
              {amenities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <PiCheckCircleBold className="mt-0.5 text-lg text-slate-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm">
            <Link
              href="/pages/Contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
            >
              Schedule a Tour
            </Link>
            <Link
              href="/pages/Availability"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-100"
            >
              View Availability
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
