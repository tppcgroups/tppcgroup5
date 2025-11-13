"use client";

import React, { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";

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

  const headline = (
    <div className="space-y-3 text-center md:text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f0d4a6]">
        Tenant stories
      </p>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-white md:text-3xl">
          Trusted by leaders across Tampa Palms.
        </h3>
        <p className="text-sm text-white/75 md:text-base">
          Real feedback from healthcare groups, professional services, and
          scaling startups that rely on our campus every day.
        </p>
      </div>
    </div>
  );

  return (
    <section className="my-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[32px] border border-[#3d342a] bg-[#1f1a16] p-6 text-white shadow-[0_25px_70px_-45px_rgba(0,0,0,0.8)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          {headline}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-[#000]/30">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Satisfaction snapshot
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <p className="text-4xl font-semibold">4.9</p>
              <span className="text-sm text-white/70">/ 5.0</span>
            </div>
            <p className="mt-1 text-sm text-white/70">Based on tenant feedback</p>
            <div className="mt-4 space-y-3">
              <StarRating />
              <p className="text-sm text-white/70">
                Consistently praised for responsiveness, technology readiness,
                and hospitality.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {loading && (
            <p className="text-center text-sm text-white/70">
              Loading testimonials...
            </p>
          )}

          {!loading && error && (
            <p className="text-center text-sm text-[#f0d4a6]">{error}</p>
          )}

          {!loading && !error && testimonials.length === 0 && (
            <p className="text-center text-sm text-white/70">
              No testimonials yet.
            </p>
          )}

          {!loading && !error && testimonials.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.id ?? testimonial.name}
                  className="flex h-full flex-col justify-between rounded-[28px] border border-[#e1d9cf] bg-[#fdf8f3] p-5 text-[#1f1a16] shadow-[0_20px_45px_-35px_rgba(31,26,22,0.9)] transition hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <StarRating />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#7a6754]">
                      Five-star tenant
                    </span>
                  </div>
                  <blockquote className="mt-4 text-base font-medium leading-relaxed text-[#1f1a16]">
                    “{testimonial.description}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-[#e1d9cf] pt-4 text-xs text-[#7a6754]">
                    <p className="font-semibold text-[#1f1a16]">
                      {testimonial.name}
                    </p>
                    {testimonial.company && <p>{testimonial.company}</p>}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
