import type { Suite } from "./type";

type SuiteHighlightsProps = {
  suite: Suite;
};

export function SuiteHighlights({ suite }: SuiteHighlightsProps) {
  // Companion card that expands on headlines and supporting info for the active suite.
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Highlights</p>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {suite.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Supporting context tiles for timing and service expectations. */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Timing</p>
          <p className="mt-2 text-sm text-slate-600">
            Share your preferred move-in date and we’ll coordinate tours and tailored space plans.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Support</p>
          <p className="mt-2 text-sm text-slate-600">
            On-site ownership and maintenance ensure quick responses for tenants & prospects.
          </p>
        </div>
      </div>
    </div>
  );
}
