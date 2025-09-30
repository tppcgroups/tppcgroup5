import React from "react";

interface Perk {
    defaultText: string;
    hoverText: string;
}

const perks: Perk[] = [
    { defaultText: "Great Location", hoverText: "24/7 Access" },
    { defaultText: "Support On Demand", hoverText: "Free Parking" },
    { defaultText: "Secure Office Space", hoverText: "High-speed WiFi" },
];

const Perks: React.FC = () => {
    return (
        <div className="flex gap-8 flex-wrap justify-center">
            {perks.map((perk, index) => (
                <div
                    key={index}
                    className="relative bg-foreground text-background rounded-full w-32 h-32 flex items-center justify-center text-center cursor-pointer transition-all duration-300 hover:rounded-xl hover:opacity-80"
                    style={{
                        boxShadow: "0 0 20px 4px rgba(128, 128, 128, 0.4)", // subtle brown glow
                    }}
                >
                    {/* Default text */}
                    <span className="absolute opacity-100 hover:opacity-0 transition-opacity duration-300">
            {perk.defaultText}
          </span>
                    {/* Hover text */}
                    <span className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300">
            {perk.hoverText}
          </span>
                </div>
            ))}
        </div>
    );
};

export default Perks;



