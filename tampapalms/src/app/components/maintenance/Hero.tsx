import Image from "next/image";
import Link from "next/link";

interface MaintenanceHeroProps {
  portalHref?: string;
  emergencyPhone?: string;
}

export default function Hero({}: MaintenanceHeroProps = {}) {
  return (
    <section className="bg-[#f9f7f3] px-4 sm:px-6">
      <header className="relative -mx-4 overflow-hidden rounded-none shadow-[0_35px_90px_-70px_rgba(31,26,22,0.8)] sm:-mx-6 ">
        <Image
          src="/images/Bldg5-005.jpg"
          alt="Maintenance coordination at Tampa Palms"
          fill
          className="object-cover object-[center_30%]"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a16]/85 via-[#1f1a16]/55 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center text-white md:items-start md:px-14 md:py-20 md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
            Maintenance support
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Maintenance Services
            </h1>
            <p className="max-w-xl text-base text-white/80">
              For all other maintenance requests, please use our online portal to submit your request. This ensures proper tracking and faster response times.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:flex-row">
            <Link
              href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/portal/login"
              className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-3 font-semibold text-[#1f1a16] shadow-lg shadow-black/10 transition hover:bg-white"
            >
              Access Maintenance Portal
            </Link>
            <Link
              href="/images/Maintenance-guidelines/Maintenance_request_instructions.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Guidelines
            </Link>
          </div>
        </div>
      </header>
    </section>
  );
}
