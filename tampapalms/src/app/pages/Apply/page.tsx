import Image from "next/image";
import ApplicationTitle from "@/app/components/RentalApplication/ApplicationTitle";
import Perks from "@/app/components/RentalApplication/Perks";
import ApplicationLink from "@/app/components/RentalApplication/ApplicationLink";

const heroImage = "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinition.jpg";

export default function Apply() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        <header className="px-6 pb-10 pt-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
            Rental Application
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
            Submit your application to secure the right workspace
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
            Share your team's requirements and timeline so we can prepare
            tailored availability and keep the leasing process moving quickly.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-24 bg-amber-400" aria-hidden="true" />
        </header>

        <div className="flex flex-1 flex-col md:h-[calc(100vh-220px)] md:flex-row">
          {/* Left info column */}
          <div className="flex w-full flex-col items-center gap-10 px-6 pb-16 pt-6 md:w-2/5 md:items-start md:justify-start md:px-10 md:pt-10">
            <ApplicationTitle />
            <Perks />
            <ApplicationLink />
          </div>

          {/* Right image column */}
          <div className="relative flex flex-1 items-start justify-end px-6 pb-10 pt-6 md:px-10 md:pt-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl md:h-[85%]">
              <Image
                src={heroImage}
                alt="Aerial view of Tampa Palms Professional Center"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
