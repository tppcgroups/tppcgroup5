// src/app/components/home/HeroSection/HomeSections.tsx

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Building2,
  Car,
  CheckCircle2,
  Clock4,
  Coffee,
  Handshake,
  KeyRound,
  LayoutDashboard,
  Mail,
  MapPin,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Users2,
  Wifi,
} from "lucide-react";

type Highlight = { title: string; desc: string; href?: string };

type Props = {
  highlights?: Highlight[];
  amenities?: string[];
  neighborhood?: { title: string; blurb: string; imageSrc: string; ctaHref?: string };
  gallery?: string[];
};

const highlightIcons = [Sparkles, Building2, Users2, ShieldCheck];

const insightStats = [
  { value: "38K+", label: "Rentable sq. ft.", helper: "Across premier Tampa Palms office campus" },
  { value: "24", label: "Flexible Suites", helper: "Ready for 1-15 professionals" },
  { value: "4", label: "Meeting rooms", helper: "AV-ready & reservable" },
  { value: "24/7", label: "Secure access", helper: "Key fob & on-site surveillance" },
];

const amenityIconMap: Record<string, LucideIcon> = {
  conference: Users2,
  meeting: Users2,
  internet: Wifi,
  wifi: Wifi,
  access: Clock4,
  coffee: Coffee,
  lounge: Coffee,
  mail: Mail,
  parking: Car,
};

const neighborhoodPerks = [
  "2 minutes to I-75",
  "Walkable dining & retail",
  "Near Moffitt & USF",
  "Prestigious Tampa Palms address",
];

const experiencePillars: Array<{
  title: string;
  desc: string;
  highlights: string[];
  icon: LucideIcon;
}> = [
  {
    title: "Arrival & Hospitality",
    desc: "Hosted lobby experience, on-site ownership, and client-ready presentation every day.",
    highlights: ["Staffed reception", "Brandable signage", "Curated refreshments"],
    icon: Handshake,
  },
  {
    title: "Infrastructure & IT",
    desc: "Enterprise-ready connectivity with dedicated bandwidth options and rapid support.",
    highlights: ["Redundant fiber", "Private VLAN capability", "On-call tech partner"],
    icon: LayoutDashboard,
  },
  {
    title: "Security & Access",
    desc: "Key-fob access, CCTV coverage, and after-hours protocols designed for executives.",
    highlights: ["24/7 monitoring", "Visitor management", "Secure mail suite"],
    icon: ShieldCheck,
  },
];

const onboardingSteps = [
  { title: "Tour & Vision Sync", detail: "Walk available suites, define tech + layout requirements.", meta: "Day 1" },
  {
    title: "Proposal & Customization",
    detail: "Finalize square footage, furniture, and term flexibility.",
    meta: "Within 48 hrs",
  },
  { title: "IT & Branding Prep", detail: "Provision network, signage, and access credentials.", meta: "1-2 weeks" },
  { title: "Move-in Day", detail: "Concierge welcome with ready-to-work suites and support.", meta: "Your timeline" },
];

const testimonials = [
  {
    quote:
      "The ownership team moves fast and treats our clients like their own—it's the boutique experience we wanted without sacrificing infrastructure.",
    author: "Dana, Principal Broker",
    role: "Tampa Palms-based advisory firm",
  },
  {
    quote:
      "We scaled from three offices to an entire floor and never skipped a beat. Technology, parking, and amenities were already dialed in.",
    author: "Marcus, Managing Partner",
    role: "Emerging healthcare group",
  },
];

export default function HomeSections({
  highlights = [
    {
      title: "Private Executive Suites",
      desc: "Glass-front suites with natural light, signage, and enterprise-grade connectivity.",
      href: "/pages/Features",
    },
    {
      title: "Turnkey Full Floors",
      desc: "Secure, customizable floors for growing teams that need a quick Tampa Palms landing spot.",
      href: "/pages/Availability",
    },
    {
      title: "Hospitality-Level Service",
      desc: "On-site support, curated amenities, and all-inclusive operating costs.",
      href: "/pages/Contact",
    },
  ],
  amenities = [
    "Conference Rooms",
    "24/7 Access",
    "High-Speed Internet",
    "Coffee & Lounge",
    "Mail Handling",
    "Free Parking",
  ],
  neighborhood = {
    title: "In the heart of Tampa Palms",
    blurb:
      "Minutes from dining, retail, and major corridors. Easy access for clients and staff with a calm, professional vibe.",
    imageSrc: "/images/neighborhood.jpg",
    ctaHref: "/pages/Contact",
  },
  gallery = ["/images/g1.jpg", "/images/g2.jpg", "/images/g3.jpg", "/images/g4.jpg"],
}: Props) {
  const galleryImages = gallery.length ? gallery.slice(0, 4) : [];

  const getAmenityIcon = (label: string): LucideIcon => {
    const key = Object.keys(amenityIconMap).find((mapKey) =>
      label.toLowerCase().includes(mapKey)
    );
    return (key && amenityIconMap[key]) || CheckCircle2;
  };

  return (
    <section className="mx-8 my-12  text-slate-900 md:space-y-20">
        
      {/* Overview */}
      <div className="overflow-hidden rounded-[32px] border border-neutral-200 bg-gradient-to-br from-[#faf8f5] via-white to-[#f0ebe3] shadow-[0_30px_80px_rgba(15,14,13,0.12)]">
        <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
              Tampa Palms Professional Center
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Purpose-built offices for teams that want New Tampa convenience without compromise.
            </h2>
            <p className="text-base text-slate-600 md:text-lg">
              Boutique hospitality meets enterprise infrastructure across secured suites, flexible floorplates, and
              curated amenity spaces that keep clients impressed and teams productive.
            </p>
            <div className="flex flex-wrap gap-3 text-sm ttext-slate-600">
              {["Flexible lease terms", "Plug-and-play IT", "On-site property team"].map((tag) => (
                <span key={tag} className="rounded-full border border-slate-600 bg-white px-4 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pages/Contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#322b23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4a4034]"
              >
                Schedule a tour
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/pages/Availability"
                className="inline-flex items-center gap-2 rounded-full border border-[#4a4034] px-5 py-3 text-sm font-semibold text-[#4a4034] transition hover:bg-[#4a4034] hover:text-white"
              >
                View availability
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {insightStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-neutral-100 bg-white/80 p-6 text-neutral-800 shadow-sm"
              >
                <p className="text-3xl font-semibold text-[#1f1a16]">{stat.value}</p>
                <p className="mt-1 text-sm uppercase tracking-wide text-neutral-500">{stat.label}</p>
                <p className="mt-3 text-sm text-neutral-600">{stat.helper}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-6 rounded-[32px] border border-neutral-200 bg-gradient-to-br from-[#faf8f5] via-white to-[#f6f3ef] p-8 shadow-inner">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7a6754]">Why Tampa Palms</p>
            <h3 className="text-2xl font-bold text-[#1f1a16] md:text-3xl">Designed around operators, not cubicles.</h3>
          </div>
          <Link href="/pages/Features" className="text-sm font-semibold text-[#4a4034] hover:underline">
            Explore features
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = highlightIcons[index % highlightIcons.length];

            return (
              <Link
                key={`${highlight.title}-${index}`}
                href={highlight.href ?? "#"}
                className="group relative flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:border-[#c8b79f]"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#ddd0bd] text-[#5a4b3c]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-[#1f1a16]">{highlight.title}</p>
                  <p className="text-sm text-neutral-600">{highlight.desc}</p>
                </div>
                <span className="mt-auto inline-flex items-center text-sm font-semibold text-[#675948]">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Neighborhood */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[32px] border border-neutral-200">
          <Image
            src={"/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png"}
            alt={neighborhood.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute bottom-0 w-full space-y-2 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-[#f0d4a6]/90">Location</p>
            <h3 className="text-2xl font-semibold">{neighborhood.title}</h3>
            <p className="text-sm text-stone-200">{neighborhood.blurb}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 rounded-[32px] border border-neutral-200 bg-white p-8 shadow-xl">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7a6754]">Neighborhood</p>
            <h3 className="text-2xl font-bold text-[#1f1a16]">Where North Tampa lives, works, and meets.</h3>
            <p className="text-neutral-600">
              Short drives to Moffitt, USF, I-75, and Bruce B. Downs keep clients close while providing a calm, upscale
              setting inside Tampa Palms.
            </p>
          </div>

          <ul className="space-y-3">
            {neighborhoodPerks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-neutral-600">
                <MapPin className="h-4 w-4 text-[#5a4b3c]" aria-hidden />
                {perk}
              </li>
            ))}
          </ul>

          {neighborhood.ctaHref && (
            <Link
              href={neighborhood.ctaHref}
              className="inline-flex items-center justify-center rounded-full border border-[#4a4034] px-6 py-3 font-semibold text-[#4a4034] transition hover:bg-[#4a4034] hover:text-white"
            >
              Visit the property
            </Link>
          )}
        </div>
      </div>


      {/* Testimonials */}
      <div className="space-y-6 rounded-[32px] border border-neutral-200 bg-white p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7a6754]">Tenant stories</p>
            <h3 className="text-2xl font-bold text-[#1f1a16] md:text-3xl">Trusted by leaders across Tampa Palms.</h3>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="rounded-[28px] border border-neutral-200 bg-[#f9f7f3] p-6 shadow-lg shadow-black/5 transition hover:-translate-y-1"
            >
              <p className="text-lg italic text-neutral-700">“{testimonial.quote}”</p>
              <figcaption className="mt-5 text-sm text-neutral-500">
                <p className="font-semibold text-neutral-800">{testimonial.author}</p>
                <p>{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

    </section>
  );
}
