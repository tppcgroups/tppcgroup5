import { statusMap } from "./statusMap";
import type { Suite } from "./type";

type SuiteListProps = {
  suites: Suite[];
  activeSuiteId: string;
  onSelectSuite: (id: string) => void;
};

export function SuiteList({ suites, activeSuiteId, onSelectSuite }: SuiteListProps) {
  // Filterable list of suites that drives the detail and gallery panels.
  return (
    <aside className="flex h-full max-h-[480px] overflow-y-auto flex-col rounded-3xl border border-[#e1d9cf] bg-white/95 p-6 shadow-lg shadow-[#1f1a16]/10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a49382]">Suites</p>
      <p className="mt-2 text-sm text-[#7a6754]">
        Select a suite to preview imagery and key details. The list updates as spaces become available
        across the campus.
      </p>
      <div className="mt-6 grid flex-1 content-start items-start gap-3 overflow-y-auto pr-1">
        {suites.map((suite) => {
          // Derived flags for active state and status styling.
          const isActive = suite.id === activeSuiteId;
          const status = statusMap[suite.status];

          return (
            <button
              key={suite.id}
              type="button"
              onClick={() => onSelectSuite(suite.id)}
              className={`flex w-full flex-col gap-2 rounded-2xl border px-5 py-5 text-left transition ${
                isActive
                  ? "border-[#4a4034] bg-[#1f1a16] text-white shadow-lg shadow-[#1f1a16]/20"
                  : "border-[#e1d9cf] bg-white hover:border-[#d4c7b7] hover:bg-[#fdf8f3]"
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
              <p className={`text-xs ${isActive ? "text-white/70" : "text-[#a49382]"}`}>
                {suite.building} • {suite.size}
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
