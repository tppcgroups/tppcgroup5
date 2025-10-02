import Card from "@/app/components/maintenance/Cards"
import Hero from "@/app/components/maintenance/Hero"

export default function Maintenance(){
    return(
        // Maintenance hub with light background treatment.
        <main className="min-h-screen bg-gray-50">
            {/* Hero introduces the maintenance offering. */}
            <Hero />

            {/* Three-step maintenance process cards. */}
            <Card/>
        </main>
    );
}
