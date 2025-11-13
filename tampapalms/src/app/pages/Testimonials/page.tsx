"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiStar, HiChevronDown } from "react-icons/hi";

type Testimonial = {
  id?: number;
  description: string;
  name: string;
  company?: string | null;
};

const StarRating = () => (
  <div className="flex items-center gap-1 text-amber-400" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, index) => (
      <HiStar key={index} className="h-5 w-5" />
    ))}
  </div>
);

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) {
          throw new Error("Failed to load testimonials");
        }
        const data = (await response.json()) as Testimonial[] | null;
        setTestimonials(data ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load testimonials"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const toggleExpanded = (idKey: string) => {
    setExpanded((prev) => ({
      ...prev,
      [idKey]: !prev[idKey],
    }));
  };

  const getExcerpt = (text: string, length = 220) => {
    if (text.length <= length) return text;
    return `${text.slice(0, length).trim()}…`;
  };

  return (
    <section className="bg-[#f9f7f3] px-4 sm:px-6">
      <div className="space-y-12">
        <header className="relative -mx-4 overflow-hidden rounded-none shadow-[0_35px_90px_-70px_rgba(31,26,22,0.8)] sm:-mx-6">
          <Image
            src="/images/Bldg6-007.jpg"
            alt="Tenants collaborating at Tampa Palms Professional Center"
            fill
            className="object-cover object-[center_60%]"
            sizes="(max-width: 1000px) 200vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a16]/85 via-[#1f1a16]/40 to-transparent" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center text-white md:items-start md:px-14 md:py-20 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Tenant stories
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Minimal words, meaningful proof.
              </h1>
              <p className="max-w-2xl text-base text-white/80">
                Leaders across healthcare, advisory, and technology trust Tampa Palms for polished spaces,
                attentive service, and a calm campus energy that lets their work speak louder.
              </p>
            </div>
          </div>
        </header>

        <div className="-mx-4 space-y-6 bg-white/95 py-12 shadow-[0_35px_90px_-70px_rgba(31,26,22,0.35)] sm:-mx-6">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
              tenant voices
            </p>
            <p className="mt-3 text-2xl font-semibold text-[#1f1a16] sm:text-3xl">
              Insights from the tenants and partners who help make Tampa Palms a thriving professional community.
            </p>
            <p className="mt-3 text-sm text-[#7a6754]">
              Collected from healthcare, legal, advisory, and growth-stage teams throughout the campus.
            </p>
          </div>
          <div className="space-y-5">
            {loading && (
              <p className="text-center text-sm text-[#7a6754]">Loading testimonials...</p>
            )}

            {!loading && error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}

            {!loading && !error && testimonials.length === 0 && (
              <p className="text-center text-sm text-[#7a6754]">No testimonials yet.</p>
            )}

            {!loading && !error && testimonials.length > 0 && (
              <div className="space-y-5 px-6 pb-6 md:px-12 md:pb-12">
                {testimonials.map((testimonial) => {
                  const key = testimonial.id?.toString() ?? testimonial.name;
                  const isExpanded = expanded[key];

                  return (
                    <figure
                      key={key}
                      className="rounded-[28px] border border-[#e1d9cf] bg-white p-6 shadow-[0_25px_45px_-35px_rgba(31,26,22,0.5)]"
                    >
                    <div className="flex items-center justify-between gap-4">
                      <StarRating />
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#a49382]">
                        Verified tenant
                      </span>
                    </div>
                      <blockquote className="mt-4 text-lg font-medium leading-relaxed text-[#1f1a16]">
                        <span
                          key={`${key}-${isExpanded ? "open" : "closed"}`}
                          className={`inline-block w-full transition-all duration-300 ${
                            isExpanded ? "fade-in-text" : "opacity-100"
                          }`}
                        >
                          “{isExpanded ? testimonial.description : getExcerpt(testimonial.description)}”
                        </span>
                      </blockquote>
                    {testimonial.description.length > 220 && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(key)}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#7a6754] transition hover:text-[#4a4034]"
                      >
                        {isExpanded ? "Show less" : "Read full story"}
                        <HiChevronDown className={`h-4 w-4 transition ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                      <figcaption className="mt-5 text-sm text-[#7a6754]">
                        <p className="font-semibold text-[#1f1a16]">{testimonial.name}</p>
                        {testimonial.company && <p>{testimonial.company}</p>}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
