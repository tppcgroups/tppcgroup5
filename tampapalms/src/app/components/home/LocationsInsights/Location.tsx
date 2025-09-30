"use client";
import Image from "next/image";
import TitleCard from "@/app/components/TitleCard";

type Stat = {label: string; value: string | number; };
type Props = {
    images?: string[];
    mapEmbedSrc?: string;
    stats?: Stat[];
};

export default function LocationInsights({
  images = ["/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinitionEdit.png"],
  mapEmbedSrc = "https://www.google.com/maps/embed?pb=",
  stats = [
    { label: "Website Visitors", value: "12,540" },
    { label: "Occupancy Rate", value: "86%" },
  ],
}: Props) {
  return (
    <section className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <TitleCard title={"Location Instights"} />
        {/* Main grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_1fr] w-full">
          {/* Left: Pictures card */}
          <div>
            <div className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-black/5">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Big image (left) */}
                <div className="relative col-span-1 md:col-span-2 rounded-2xl bg-gray-200 aspect-[4/3] overflow-hidden">
                  <Image
                    src={images[0] ?? "/images/5331/5331-Primrose-Lake-Cir-Tampa-FL-Building-Photo-2-LargeHighDefinition.jpg"}
                    alt="Property"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {stats.slice(0, 2).map((s, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-black/5"
                >
                  <div className="text-sm text-gray-600">{s.label}</div>
                  <div className="mt-2 text-2xl font-extrabold text-gray-900">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Google Map card */}
          <div className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-black/5">
            <div className="rounded-3xl border-2 border-violet-500/70 overflow-hidden">
              <iframe
                title="Property Location"
                src={mapEmbedSrc}
                className="h-[560px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

