// file: src/app/pages/Features/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { PiCheckCircleBold } from "react-icons/pi";

const stats = [
  { label: "Buildings Across Campus", value: "8" },
  { label: "Move-In Ready Suites", value: "40+" },
  { label: "On-Site Team Coverage", value: "7 Days" },
];

const featureTiles = [
  {
    heading: "Move-in ready interiors",
    blurb:
      "Private entries, built-out breakrooms, and glass-lined conference rooms deliver a polished first impression from day one.",
  },
  {
    heading: "Technology-forward infrastructure",
    blurb:
      "Fiber connectivity, Smart Park capabilities, and robust HVAC systems keep operations reliable and efficient.",
  },
  {
    heading: "Indoor-outdoor balance",
    blurb:
      "Tree-lined walkways, lakeside seating, and natural light across every building create a calm rhythm to the workday.",
  },
  {
    heading: "Scalable footprints",
    blurb:
      "Executive suites, full-floor options, and flexible demising plans make it easy to align space with team growth.",
  },
];

const amenityColumns = [
  {
    title: "Workspace Essentials",
    description:
      "Core amenities that anchor productive teams and support day-to-day comfort across every suite.",
    items: [
      "Private restrooms and break areas in most floor plans",
      "Generous glasslines, high ceilings, and efficient layouts",
      "Free surface parking throughout the professional campus",
      "Energy-conscious construction to moderate utility costs",
    ],
  },
  {
    title: "Campus Advantages",
    description:
      "Features beyond the front door that elevate Tampa Palms Professional Center above traditional office parks.",
    items: [
      "Extensive conservation areas with mature landscaping",
      "Direct visibility along the I-75 / Bruce B. Downs corridor",
      "Minutes to dining, retail, lodging, and medical services",
      "Daily ownership presence with rapid-response maintenance",
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
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
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

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {amenityColumns.map((column) => (
              <div
                key={column.title}
                className="rounded-3xl border border-slate-200/60 bg-slate-50/70 p-8 shadow-lg shadow-slate-900/10"
              >
                <h3 className="text-2xl font-semibold text-slate-900">{column.title}</h3>
                <p className="mt-3 text-sm text-slate-600 md:text-base">{column.description}</p>
                <ul className="mt-6 space-y-4">
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
