import React from 'react'

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

const page = () => {
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

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="rounded-[28px] border border-neutral-200 bg-[#f9f7f3] p-6 shadow-lg shadow-black/5 transition hover:-translate-y-1"
          >
            <p className="text-lg italic text-neutral-700">
              “{testimonial.quote}”
            </p>
            <figcaption className="mt-5 text-sm text-neutral-500">
              <p className="font-semibold text-neutral-800">
                {testimonial.author}
              </p>
              <p>{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default page
