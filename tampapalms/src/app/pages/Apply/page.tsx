import Image from "next/image";
import ApplicationTitle from "@/app/components/RentalApplication/ApplicationTitle";
import Perks from "@/app/components/RentalApplication/Perks";
import ApplicationLink from "@/app/components/RentalApplication/ApplicationLink";

const heroImage =
    "/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinition.JPG";

export default function Apply() {
    return (
        <main className="min-h-screen bg-gray-50 text-slate-900">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
                {/* Header */}
                <header className="px-4 pb-8 pt-12 text-center sm:px-6 md:pb-10 md:pt-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Rental Application
                    </p>
                    <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
                        Submit your application to secure the right workspace
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 sm:text-base md:max-w-2xl">
                        Share your team&apos;s requirements and timeline so we can prepare
                        tailored availability and keep the leasing process moving quickly.
                    </p>
                    <div
                        className="mx-auto mt-6 h-0.5 w-16 bg-slate-400 sm:w-24"
                        aria-hidden="true"
                    />
                </header>

                {/* Main Content */}
                <div className="flex flex-1 flex-col-reverse md:flex-row md:h-[calc(100vh-220px)]">
                    {/* Left info column */}
                    <div className="flex w-full flex-col items-center gap-8 px-4 pb-12 pt-6 sm:px-6 md:w-2/5 md:items-start md:justify-start md:px-10 md:pt-10 md:gap-10">
                        <ApplicationTitle />
                        <Perks />
                        <ApplicationLink />
                    </div>

                    {/* Right image column */}
                    <div className="relative w-full h-56 sm:h-72 md:flex-1 md:h-auto px-4 sm:px-6 md:px-10 pb-8 pt-4 md:pt-10">
                        <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl">
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
