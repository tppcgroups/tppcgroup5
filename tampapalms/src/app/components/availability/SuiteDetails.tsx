import Link from "next/link";
import { statusMap } from "./statusMap";
import type { Suite } from "./type";

type SuiteDetailsProps = {
  suite: Suite;
};

export function SuiteDetails({ suite }: SuiteDetailsProps) {
  // Primary suite overview card with stats and actions.
  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/10">
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
      <div className="mt-auto flex items-center justify-center pt-6">
        <Link
          href="/pages/Contact"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800"
        >
          Request Tour
        </Link>
      </div>
    </div>
  );
}
