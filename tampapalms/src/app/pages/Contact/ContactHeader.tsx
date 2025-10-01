export default function ContactHeader() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
          Get In Touch
        </p>
        <div className="mt-6 space-y-4">
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Contact Tampa Palms Professional Center
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            Our on-site ownership team is here to help with leasing, maintenance, and general campus
            questions. Send us a note and we will respond within one business day.
          </p>
        </div>
        <div className="mt-8 h-0.5 w-24 bg-slate-400" aria-hidden="true" />
      </div>
    </section>
  );
}
