import Card from "@/app/components/maintenance/Cards"
import Hero from "@/app/components/maintenance/Hero"
import EmergencyCard from "@/app/components/maintenance/BottomCard";

export default function Maintenance(){
    return(
        <main className="min-h-screen bg-gray-50">
            <Hero />
            <Card/>
            <EmergencyCard/>

        </main>
    );
}