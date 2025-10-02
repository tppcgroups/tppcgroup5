import Link from "next/link";
import { statusMap } from "./statusMap";
import type { Suite } from "./type";

type SuiteDetailsProps = {
  suite: Suite;
};

export function SuiteDetails({ suite }: SuiteDetailsProps) {
  // Primary suite overview card with stats and actions.
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Details</p>
        <h2 className="text-2xl font-semibold text-slate-900">{suite.label}</h2>
        <p className="text-sm text-slate-600">{suite.description}</p>
      </div>

      {/* Key specifications pulled from the suite record. */}
      <dl className="mt-6 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-slate-900">Building</dt>
          <dd>{suite.building}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-slate-900">Size</dt>
          <dd>{suite.size}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-slate-900">Type</dt>
          <dd>{suite.type}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-slate-900">Rate</dt>
          <dd>{suite.rate}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-slate-900">Status</dt>
          <dd>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusMap[suite.status].className
              }`}
            >
              {statusMap[suite.status].label}
            </span>
          </dd>
        </div>
      </dl>

      {/* Contextual actions for prospects. */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/pages/Contact"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800"
        >
          Request Tour
        </Link>
        <Link
          href={suite.brochureHref ?? "/pages/Apply"}
          className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
        >
          View Brochure
        </Link>
        {suite.floorplanHref && (
          <Link
            href={suite.floorplanHref}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            View Floorplan
          </Link>
        )}
      </div>
    </div>
  );
}
