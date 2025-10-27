import Image from "next/image";

export function SuiteFloorPlan() {
    return (
        <div className="flex h-full min-h-[480px] flex-col rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/10">
            <Image 
                src="/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinition.JPG"
                alt="Placeholder"
                width={1920}
                height={1080}
                className="object-cover rounded-2xl"
            />
        </div>
    );
}

