/*import HomePage from "./pages/Home/page"

export default function Page() {
  return (
    <div>
      <HomePage/>
    </div>
  );
}*/

import React from "react";
import ApplicationTitle from "./components/RentalApplication/ApplicationTitle";
import Perks from "./components/RentalApplication/Perks";
import ApplicationLink from "./components/RentalApplication/ApplicationLink";

export default function Page() {
    return (
        <div className="min-h-screen bg-[#f5f5f5] text-[#171717] font-sans">
            {/* Header */}
            <header className="text-center py-4">
                <h1 className="text-3xl font-bold">Rental Application</h1>
                <div className="h-[2px] bg-[#171717] w-6/12 mx-auto mt-2"></div>
            </header>

            {/* Main container */}
            <div className="flex h-[calc(100vh-100px)]">
                {/* Left info column */}
                <div className="w-2/5 flex flex-col items-center justify-start p-8 gap-6">
                    <ApplicationTitle />
                    <Perks />
                    <ApplicationLink />
                </div>

                {/* Right fading image column */}
                <div
                    className="flex-1 bg-center bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `
              linear-gradient(to left, transparent 60%, #f5f5f5 100%),
              url('/5331-Primrose-Lake-Cir-Tampa-FL-Aerial-1-LargeHighDefinition.JPG')
            `,
                    }}
                ></div>
            </div>
        </div>
    );
}





