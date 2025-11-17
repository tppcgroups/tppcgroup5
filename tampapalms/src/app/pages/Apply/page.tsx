import Image from "next/image";
import ApplicationTitle from "@/app/components/RentalApplication/ApplicationTitle";
import Perks from "@/app/components/RentalApplication/Perks";
import ApplicationLink from "@/app/components/RentalApplication/ApplicationLink";

const heroImage =
    "/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinition.JPG";

export default function Apply() {
    return (
        <main className="min-h-screen bg-[#f9f7f3] text-[#1f1a16]">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
                {/* Header */}
                <header className="px-4 pb-8 pt-12 text-center sm:px-6 md:pb-10 md:pt-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
                        Rental Application
                    </p>
                    <h1 className="mt-4 text-2xl font-semibold text-[#1f1a16] sm:text-3xl md:text-4xl">
                        Submit your application to secure the right workspace
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm text-[#7a6754] sm:text-base md:max-w-2xl">
                        Share your team&apos;s requirements and timeline so we can prepare
                        tailored availability and keep the leasing process moving quickly.
                    </p>
                    <div
                        className="mx-auto mt-6 h-0.5 w-16 bg-[#c8b79f] sm:w-24"
                        aria-hidden="true"
                    />
                </header>

                {/* Main Content */}
                <div className="flex flex-1 flex-col-reverse gap-12 md:flex-row md:items-start md:gap-16">
                    {/* Left info column */}
                    <div className="flex w-full flex-col items-center gap-8 px-4 pb-12 pt-6 sm:px-6 md:w-1/2 md:max-w-lg md:items-start md:justify-start md:px-10 md:pt-10 md:gap-10">
                        <ApplicationTitle />
                        <Perks />
                        <ApplicationLink />
                    </div>

                    {/* Right image column */}
                    <div className="relative w-full px-4 pb-8 pt-4 sm:px-6 md:flex-1 md:self-start md:px-10 md:pb-12 md:pt-10">
                        <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72 md:aspect-[4/3] md:h-auto md:max-w-xl md:rounded-3xl">
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
