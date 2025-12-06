import Image from "next/image";
import Link from "next/link";

// AvailabilityHero renders the introductory banner for the availability page with CTAs and total suite count.
type AvailabilityHeroProps = {
  availableCount: number;
};

export function AvailabilityHero({ availableCount }: AvailabilityHeroProps) {
  return (
    <section className="bg-[#f9f7f3] px-4 sm:px-6">
      <header className="relative -mx-4 overflow-hidden rounded-none shadow-[0_35px_90px_-70px_rgba(31,26,22,0.8)] sm:-mx-6">
        <Image
          src="/images/TPPC-Entry-004.jpg"
          alt="Tampa Palms Professional Center entry"
          fill
          className="object-cover object-[center_60%]"
          sizes="(max-width: 768px) 100vw, 1400px"
          priority
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-4xl bg-gradient-to-r from-[#1f1a16]/90 via-[#1f1a16]/45 to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col gap-8 px-6 py-16 text-white md:px-14 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Availability
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-end">
            <div className="space-y-5">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Find the right suite for your team
              </h1>
              <p className="max-w-3xl text-base text-white/80">
                Browse current availability across the Tampa Palms campus. Each
                listing includes imagery, specs, and highlights so you can
                compare options before touring in person.
              </p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
                <Link
                  href="/pages/Contact"
                  className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-3 font-semibold text-[#1f1a16] shadow-lg shadow-black/10 transition hover:bg-white"
                >
                  Talk with Our Team
                </Link>
                <Link
                  href="#availability"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  View spaces below
                </Link>
              </div>
            </div>
            <div className="justify-self-start lg:justify-self-end">
              <div className="rounded-2xl border border-white/30 bg-white/10 px-6 py-5 text-center shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                  Available Spaces
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {availableCount}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Ready for tours and applications today
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
