import Link from "next/link";
import { statusMap } from "./statusMap";
import type { Suite } from "./type";

type SuiteDetailsProps = {
  suite: Suite;
};

export function SuiteDetails({ suite }: SuiteDetailsProps) {
  // Primary suite overview card with stats and actions.
  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-3xl border border-[#e1d9cf] bg-white/95 p-6 shadow-lg shadow-[#1f1a16]/10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a49382]">Details</p>
        <h2 className="text-2xl font-semibold text-[#1f1a16]">{suite.label}</h2>
        <p className="text-sm text-[#7a6754]">{suite.description}</p>
      </div>

      {/* Key specifications pulled from the suite record. */}
      <dl className="mt-6 grid gap-3 text-sm text-[#7a6754]">
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-[#1f1a16]">Building</dt>
          <dd>{suite.building}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-[#1f1a16]">Size</dt>
          <dd>{suite.size}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-[#1f1a16]">Type</dt>
          <dd>{suite.type}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-[#1f1a16]">Rate</dt>
          <dd>{suite.rate}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-semibold text-[#1f1a16]">Status</dt>
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
          className="inline-flex items-center justify-center rounded-full bg-[#1f1a16] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[#1f1a16]/20 transition hover:bg-[#3a3127]"
        >
          Request Tour
        </Link>
      </div>
    </div>
  );
}
