"use client";

import React, { useEffect, useState} from "react";

type AccessibilityWidget = {
    highContrast: boolean;
    largeText: boolean;
};
const AccessibilityWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [textScale, setTextScale] = useState(1);
    const [highContrast, setHighContrast] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [highlightLinks, setHighlightLinks] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const html = document.documentElement;

        html.style.setProperty("--text-scale", textScale.toString());
        html.classList.toggle("high-contrast", highContrast);
        html.classList.toggle("dark", darkMode);
        html.classList.toggle("reduce-motion", reduceMotion);

    })
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Open accessibility settings"
                className="fixed bottom-5 right-5 z-[9999] bg-blue-600 hover:bg-blue-700
             text-white rounded-full w-12 h-12 text-2xl shadow-lg transition
             flex items-center justify-center"
            >
                ♿
            </button>




            {open && (
                <div className="fixed bottom-20 right-5 z-[9999] bg-white border border-gray-300
                rounded-2xl shadow-xl w-64 p-4 animate-fade-in">

                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        Accessibility
                    </h2>
                </div>
            )}
        </>
    );
};


export default AccessibilityWidget;
