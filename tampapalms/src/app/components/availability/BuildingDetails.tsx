import React, {useState} from 'react'
import Link from 'next/link';
import { statusMap } from './statusMap';
import { Building, AvailabilityStatus } from './type';
import { useRouter } from 'next/navigation';
import NotifyPopUp from './NotifyPopUp';

type BuildingProps = {
    activeBuilding: Building;
    normalizeStatus: (raw: string | null | undefined) => AvailabilityStatus;
}

export function BuildingDetails({activeBuilding, normalizeStatus}: BuildingProps) {
  const statusClass = statusMap[normalizeStatus(activeBuilding.availability_status)].className;
  const statusLabel = statusMap[normalizeStatus(activeBuilding.availability_status)].label;

  const [notify, setNotify] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
    const togglePopUp = () => {
        setIsOpen(!isOpen);
    }
  const router = useRouter();

  const handleTourRequest = () => {
    router.push("/pages/Contact");
  }
  console.log(statusLabel);
  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Details
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          {`Building ${activeBuilding.building_number} ${
            activeBuilding.suite_number
              ? `- Suite ${activeBuilding.suite_number}`
              : ""
          }`}
        </h2>
        {/* <p className="text-sm text-slate-600 font-bold">
          Built For Your Next Era.
        </p> */}
      </div>

      {/* Key specifications pulled from the suite record. */}
      <div className="my-auto">
        <dl className="mt-6 grid gap-3 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-slate-900">Building</dt>
            <dd>{activeBuilding.building_number}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-slate-900">Size</dt>
            <dd>
              {activeBuilding.rental_sq_ft
                ? `${activeBuilding.rental_sq_ft} SF`
                : "N/A"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-slate-900">Type</dt>
            <dd>{activeBuilding.category}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-slate-900">Rate</dt>
            <dd>{activeBuilding.price ? activeBuilding.price : "N/A"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-slate-900">Lease Term</dt>
            <dd>
              {activeBuilding.lease_term ? activeBuilding.lease_term : "N/A"}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-slate-900">Status</dt>
            <dd>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
              >
                {statusLabel}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Contextual actions for prospects. */}
      <div className="mt-auto flex items-center justify-center pt-6">
        <button
          onClick={statusLabel === "Available" ? handleTourRequest : () => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800 cursor-pointer"
        >
          {statusLabel === "Available"
            ? "Request Tour"
            : "Notify Me When Available"}
        </button>
      </div>
      {isOpen && (
        <NotifyPopUp onClose={togglePopUp} buildingId={activeBuilding.building_id} />
      )}
    </div>
  );
}

