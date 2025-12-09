"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi";

type Testimonial = {
  id?: number;
  testimonial_text?: string | null;
  person_name?: string | null;
  company?: string | null;
};

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

  const getExcerpt = (text: string, length = 800) => {
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
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a16]/85 via-[#1f1a16]/40 to-transparent" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center text-white md:items-start md:px-14 md:py-20 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Tenant stories
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Authentic Tenants, Authentic Stories
              </h1>
              <p className="max-w-2xl text-base text-white/80">
                We offer more than professional workspace; we provide support that helps your business operate, grow, and thrive.
              </p>
            </div>
          </div>
        </header>

        <div className="-mx-4 space-y-6 bg-white/95 py-6 shadow-[0_35px_90px_-70px_rgba(31,26,22,0.35)] sm:-mx-6">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
              tenant voices
            </p>
            <p className="mt-3 text-2xl font-semibold text-[#1f1a16] sm:text-3xl">
              Insights from the tenants and partners who help make Tampa Palms a thriving professional community.
            </p>
            <p className="mt-3 text-sm text-[#7a6754]">
              Collected from healthcare, legal, advisory, and growth-stage teams across the community.
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
                  const description = testimonial.testimonial_text ?? "";
                  const name = testimonial.person_name ?? "Anonymous";

                  const key = testimonial.id?.toString() ?? name;
                  const isExpanded = expanded[key];
                  const excerpt = getExcerpt(description);
                  const isTruncated = excerpt !== description;

                  return (
                    <figure
                      key={key}
                      className="relative overflow-hidden rounded-[28px] border border-[#e1d9cf] bg-white/95 p-7 shadow-[0_25px_45px_-35px_rgba(31,26,22,0.5)]"
                    >
                      <div className="absolute inset-x-6 top-0 h-[3px] rounded-full " />
                      <div className="flex flex-wrap items-start justify-between gap-3 pt-1">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3ede5] text-base font-semibold text-[#4a4034]">
                            {name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1f1a16]">{name}</p>
                            {testimonial.company && <p className="text-xs text-[#7a6754]">{testimonial.company}</p>}
                          </div>
                        </div>
                        <span className="rounded-full bg-[#f3ede5] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#7a6754]">
                          Verified tenant
                        </span>
                      </div>
                      <blockquote className="mt-4 border-l-4 border-[#7a6754] pl-4 text-lg leading-relaxed text-[#1f1a16]">
                        <span
                          key={`${key}-${isExpanded ? "open" : "closed"}`}
                          className={`inline-block w-full transition-all duration-300 ${
                            isExpanded ? "fade-in-text" : "opacity-100"
                          }`}
                        >
                          “{isExpanded || !isTruncated ? description : excerpt}”
                        </span>
                      </blockquote>
                      {isTruncated && (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(key)}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#7a6754] transition hover:text-[#4a4034]"
                        >
                          {isExpanded ? "Show less" : "Read full story"}
                          <HiChevronDown className={`h-4 w-4 transition ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
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
