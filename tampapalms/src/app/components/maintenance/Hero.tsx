import Link from "next/link";

interface MaintenanceHeroProps {
  portalHref?: string;
  emergencyPhone?: string;
}

export default function Hero({
}: MaintenanceHeroProps = {}) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-[140%] w-[60%] bg-amber-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-20 text-center md:items-start md:text-left">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200/80">
            Maintenance Support
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Maintenance Services</h1>
          <p className="text-lg text-white/80 md:max-w-3xl">
            All maintenance requests are processed through our trusted partner
            portal. Every work order is timestamped, monitored, and matched with
            the right technician so tenants see faster, more transparent
            resolutions.
          </p>
        </div>

        <ul className="grid w-full gap-4 text-left text-sm text-white/80 md:max-w-4xl md:grid-cols-2 md:text-base">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden="true" />
            Submit new requests and upload supporting photos in minutes.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden="true" />
            Track real-time status updates until the job is complete.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden="true" />
            Communicate directly with the maintenance team as questions arise.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden="true" />
            Automatic records keep your service history organized for audits.
          </li>
        </ul>

        <div className="flex w-full flex-col items-center gap-5 md:max-w-4xl md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
            <Link
              href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/portal/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Access Maintenance Portal
            </Link>
            <Link
              href="/pages/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
