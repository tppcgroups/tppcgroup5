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

        const settings = {
            textScale, highContrast, darkMode, highlightLinks, reduceMotion
        };
        localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
    }, [textScale, highContrast, darkMode, highlightLinks, reduceMotion]);

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
                    <div className = "fixed bottom-24 right-5 z-[9999] w-72 bg-white border border-gray-300 rounded-2xl shadow-2xl p-5">
                        <span className="text-gray-800">
                        Text Size
                        </span>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setTextScale(prev => Math.max(0.8, prev - 0.1))}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                A-
                            </button>
                            <button
                                onClick={() => setTextScale(prev => Math.min(1.6, prev + 0.1))}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                A+
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-800">
                            High Contrast
                        </span>
                        <input type="checkbox" checked={highContrast} onChange={() => setHighContrast(!highContrast)} className="w-5 h-5" />
                    </div>


                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-800">
                            Dark Mode
                        </span>
                        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-800">
                            Highlight Links
                        </span>
                        <input type="checkbox" checked={highlightLinks} onChange={() => setHighlightLinks(!highlightLinks)} className="w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-800">
                            Reduce Motion
                        </span>
                        <input type="checkbox" checked={reduceMotion} onChange={() => setReduceMotion(!reduceMotion)} className="w-5 h-5" />
                    </div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        Accessibility
                    </h2>
                </div>
            )}
        </>
    );
};


export default AccessibilityWidget;
