import { statusMap } from "./statusMap";
import type { Suite } from "./type";

type SuiteListProps = {
  suites: Suite[];
  activeSuiteId: string;
  onSelectSuite: (id: string) => void;
};

export function SuiteList({ suites, activeSuiteId, onSelectSuite }: SuiteListProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Suites</p>
      <p className="mt-2 text-sm text-slate-600">
        Select a suite to preview imagery and key details. The list updates as spaces become available
        across the campus.
      </p>
      <div className="mt-6 grid gap-3">
        {suites.map((suite) => {
          const isActive = suite.id === activeSuiteId;
          const status = statusMap[suite.status];

          return (
            <button
              key={suite.id}
              type="button"
              onClick={() => onSelectSuite(suite.id)}
              className={`flex w-full flex-col gap-2 rounded-2xl border px-5 py-5 text-left transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">{suite.label}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isActive ? "bg-white/15 text-white" : status.className
                  }`}
                >
                  {status.label}
                </span>
              </div>
              <p className={`text-xs ${isActive ? "text-white/70" : "text-slate-500"}`}>
                {suite.building} • {suite.size}
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

