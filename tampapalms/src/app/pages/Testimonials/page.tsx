"use client";

import React, { useEffect, useState } from "react";

type Testimonial = {
  id?: number;
  description: string;
  name: string;
  company?: string | null;
};

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

  return (
    <div className="my-20 mx-5 space-y-6 rounded-[32px] border border-neutral-200 bg-white p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7a6754]">
            Tenant stories
          </p>
          <h3 className="text-2xl font-bold text-[#1f1a16] md:text-3xl">
            Trusted by leaders across Tampa Palms.
          </h3>
        </div>
      </div>

      {loading && (
        <p className="text-center text-neutral-500">Loading testimonials...</p>
      )}

      {!loading && error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {!loading && !error && testimonials.length === 0 && (
        <p className="text-center text-neutral-500">No testimonials yet.</p>
      )}

      {!loading && !error && testimonials.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id ?? testimonial.name}
              className="rounded-[28px] border border-neutral-200 bg-[#f9f7f3] p-6 shadow-lg shadow-black/5 transition hover:-translate-y-1"
            >
              <p className="text-lg italic text-neutral-700">
                “{testimonial.description}”
              </p>
              <figcaption className="mt-5 text-sm text-neutral-500">
                <p className="font-semibold text-neutral-800">
                  {testimonial.name}
                </p>
                {testimonial.company && <p>{testimonial.company}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
