import Image from "next/image";
import Link from "next/link";
import type { AvailabilityStats } from "./type";

type AvailabilityHeroProps = {
  stats: AvailabilityStats[];
};

export function AvailabilityHero({ stats }: AvailabilityHeroProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Available Spaces
            </p>
            <div className="mt-6 space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
                Find the right suite for your team
              </h1>
              <p className="text-sm text-slate-600 md:text-base">
                Browse current availability across the Tampa Palms campus. Each listing includes imagery,
                specs, and highlights so you can compare options before touring in person.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href="/pages/Apply"
                className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800"
              >
                Begin Application
              </Link>
              <Link
                href="/pages/Contact"
                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Talk with Our Team
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Interior-Photo-10-LargeHighDefinition.jpg"
              alt="Modern executive office interior"
              width={1000}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-slate-900/20 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  Campus Snapshot
                </p>
                <h2 className="text-2xl font-semibold">Designed for productivity</h2>
                <p className="text-sm text-white/80 max-w-sm">
                  Natural light, fiber connectivity, and on-site hospitality create a turnkey workspace
                  experience for teams of all sizes.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/40 bg-white/10 px-4 py-3 text-center shadow-sm backdrop-blur"
                  >
                    <p className="text-xl font-semibold text-white">{stat.value}</p>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

