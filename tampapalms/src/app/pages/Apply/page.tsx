"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ApplicationTitle from "@/app/components/RentalApplication/ApplicationTitle";
import Perks from "@/app/components/RentalApplication/Perks";
import ApplicationLink from "@/app/components/RentalApplication/ApplicationLink";

const heroImage = "/images/Bldg6-019.jpg";
const carouselImages = [
  "/images/Bldg6-003.jpg",
  "/images/Bldg5-019.jpg",
  "/images/Bldg6-012.jpg",
];

export default function Apply() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-[#f9f7f3] text-[#1f1a16]">
      <section className="bg-[#f9f7f3] px-4 sm:px-6">
        <header className="relative -mx-4 overflow-hidden rounded-none shadow-[0_35px_90px_-70px_rgba(31,26,22,0.8)] sm:-mx-6 bg-[#1f1a16]/5 dark:bg-transparent">
          <Image
            src={heroImage}
            alt="Apply for workspace at Tampa Palms"
            fill
            className="object-cover object-[center_50%]"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a16]/85 via-[#1f1a16]/40 to-transparent" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center text-white md:items-start md:px-14 md:py-20 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Rental Application
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Secure your workspace with a clear, quick application.
              </h1>
              <p className="max-w-xl text-base text-white/80">
                Submit essentials and we’ll verify availability, outline costs, and guide you to move-in without slowing momentum.
              </p>
            </div>
              <div className="flex w-full flex-row items-center gap-8 pb-0 pt-6 md:max-w-lg md:gap-10 md:justify-start">
              <Link
                href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/rental-application/new/apply"
                className="inline-flex w-full items-center justify-center rounded-full bg-white/95 px-8 py-3 font-semibold text-[#1f1a16] shadow-lg shadow-black/20 transition hover:bg-white sm:w-auto"
              >
                Apply
              </Link>
              <Link
                href="/pages/Contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/60 px-8 py-3 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </header>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col pb-20">
        <header className="px-4 pb-8 pt-12 text-center sm:px-6 md:pb-10 md:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">Rental Application</p>
          <h2 className="mt-4 text-2xl font-semibold text-[#1f1a16] sm:text-3xl md:text-4xl">
            Submit your application to secure the right workspace
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#7a6754] sm:text-base">
            Share your team&apos;s requirements and timeline so we can prepare tailored availability and keep the leasing process moving quickly.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#c8b79f] sm:w-24 dark:bg-[#f5f2ec]" aria-hidden="true" />
        </header>

        <div className="flex flex-1 flex-col-reverse gap-12 px-4 sm:px-6 md:flex-row md:items-stretch md:gap-16 md:px-10">
          {/* Left info column */}
            <div className="flex w-full flex-col items-center pb-12 pt-6 md:w-1/2 md:max-w-lg md:pt-10">
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="text-center">
                        <ApplicationTitle />
                    </div>

                    <Perks />

                    <div className="flex justify-center">
                        <ApplicationLink />
                    </div>
                </div>
            </div>


            {/* Right image column */}
          <div className="relative w-full pb-12 pt-6 md:flex-1 md:self-stretch md:pt-10">
            <div className="relative mx-auto flex h-64 w-full overflow-hidden rounded-2xl sm:h-72 md:h-full md:max-w-xl md:rounded-3xl">
              {/* {carouselImages.map((src, idx) => ( */}
                <div
                  // key={src}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    "opacity-100"
                  }`}
                >
                  <Image
                    src="/images/Bldg6-012.jpg"
                    alt="Workspace imagery at Tampa Palms"
                    fill
                    className="object-cover object-center"
                    // priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden />
                </div>
              {/* ))} */}
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {/* {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      idx === activeImage ? "bg-white" : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Show slide ${idx + 1}`}
                  />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
