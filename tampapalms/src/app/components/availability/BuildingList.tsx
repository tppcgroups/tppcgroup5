import { statusMap } from "./statusMap";
import type { Building, AvailabilityStatus } from "./type";

type BuildingeListProps = {
  loading: boolean;
  visibleBuildings: Building[];
  activeBuildingId: string;
  normalizeStatus: (raw: string | null | undefined) => AvailabilityStatus;
  onSelectBuilding: (id: string) => void;
};

export function BuildingList({ loading, visibleBuildings, activeBuildingId, normalizeStatus, onSelectBuilding }: BuildingeListProps) {
    return (
      <aside className="flex h-full w-full flex-col rounded-[32px] border border-[#e1d9cf] bg-white/95 p-6 shadow-xl shadow-[#1f1a16]/5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a49382]">
            Suites
          </p>
          <p className="mt-2 text-sm text-[#7a6754]">
            Select a suite to preview imagery and key details. The list updates as
            spaces become available across the campus.
          </p>
          <p className="mt-2 rounded-2xl border border-[#e1d9cf] bg-[#fdf8f3] px-4 py-3 text-xs font-medium text-[#a49382]">
            After choosing a suite, scroll down to explore the gallery and space
            details.
          </p>
        </div>
        <div className="mt-6 grid flex-1 content-start items-start gap-3 overflow-y-auto pr-1">
          {loading && <p>Loading buildings...</p>}
          {visibleBuildings.map((building) => {
            const isActive = activeBuildingId === building.building_id;
            const normalizedStatusKey = normalizeStatus(
              building.availability_status
            );
            const status = statusMap[normalizedStatusKey];
            return (
              <button
                key={building.building_id}
                type="button"
                onClick={() => onSelectBuilding(building.building_id)}
                className={`flex w-full flex-col gap-2 rounded-2xl border px-5 py-5 text-left transition ${
                  isActive
                    ? "border-[#4a4034] bg-[#1f1a16] text-white shadow-lg shadow-[#1f1a16]/20"
                    : "border-[#e1d9cf] bg-white hover:border-[#d4c7b7] hover:bg-[#fdf8f3]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">
                    {`Building ${building.building_number} ${
                      building.suite_number
                        ? `- Suite ${building.suite_number}`
                        : ""
                    }`}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isActive ? "bg-white/15 text-white" : status.className
                    }`}
                  >
                    {status.label}
                  </span>
                </div>
                <p
                  className={`text-xs ${
                    isActive ? "text-white/70" : "text-[#a49382]"
                  }`}
                >
                  {building.street_address} •{" "}
                  {`${
                    building.rental_sq_ft
                      ? `${building.rental_sq_ft} SF`
                      : "Size N/A"
                  }`}
                </p>
              </button>
            );
          })}
        </div>
      </aside>
    );
}
