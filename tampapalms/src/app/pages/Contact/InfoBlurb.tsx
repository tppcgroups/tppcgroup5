const bullets = [
  "Same-day responses for tenants and new inquiries",
  "On-site ownership available for tours and meetings",
  "Emergency maintenance hotline available 24/7",
];

export default function InfoBlurb() {
  return (
    <div className="flex justify-center md:justify-end">
      <div className="relative w-full max-w-md">
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
          Why Reach Out
        </span>
        <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-900/10">
          <p className="text-sm text-slate-600">
            We're here to guide you through availability, applications, maintenance, and
            general campus questions. Tell us what you need and we'll route your message to
            the right member of our team.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
