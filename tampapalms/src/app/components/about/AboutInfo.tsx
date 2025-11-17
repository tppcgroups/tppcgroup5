import Image from "next/image";

export default function AboutInfo() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f9f7f3]">
      <div className="relative h-[340px] w-full sm:h-[420px]">
        <Image
          src="/images/Bldg5-008.jpg"
          alt="Tampa Palms Professional Center aerial"
          fill
          className="object-cover object-[center_60%]"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a16]/85 via-[#1f1a16]/55 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center gap-4 px-6 py-10 text-white sm:px-10 md:px-16">
          <div className="max-w-5xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
              About Us
            </span>
            <div className="mt-4 space-y-3 max-w-2xl">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Tampa Palms Professional Center
              </h1>
              <p className="text-base text-white/80 sm:text-lg">
                Modern workspaces, polished amenities, and easy access—so your team can focus on progress while
                clients experience a welcoming, professional atmosphere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
