import React, { useEffect, useState} from "react";

type AccessibilityWidget = {
    highContrast: boolean;
    largeText: boolean;
};
const AccessibilityWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Open accessibility settings"
                className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white
             rounded-full w-12 h-12 text-2xl shadow-lg transition"
            >
            </button>



            {open && (
                <div className="fixed bottom-20 right-5 bg-white border border-gray-300
                        rounded-2xl shadow-xl w-64 p-4 animate-fade-in">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        Accessibilityi
                    </h2>
                </div>
            )}
        </>
    );
};


export default AccessibilityWidget;
