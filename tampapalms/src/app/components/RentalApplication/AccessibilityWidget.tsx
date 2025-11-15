"use client";
import accessibilityLogo from "../accessibility.png";


import React, { useEffect, useState} from "react";
import Image from "next/image";

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
    const contrastModes = ["normal", "dark", "inverted", "grayscale"];
    const [contrastIndex, setContrastIndex] = useState(0);


    useEffect(() => {
        const saved = localStorage.getItem("accessibilitySettings");
        if (!saved) return;

        try {
            const settings = JSON.parse(saved);

            setTextScale(settings.textScale ?? 1);
            setHighContrast(settings.highContrast ?? false);
            setDarkMode(settings.darkMode ?? false);
            setHighlightLinks(settings.highlightLinks ?? false);
            setReduceMotion(settings.reduceMotion ?? false);

        } catch (err) {
            console.error("Failed to load saved settings", err);
        }
    }, []);


    useEffect(() => {
        const html = document.documentElement;

        html.style.setProperty("--text-scale", textScale.toString());
        html.classList.toggle("high-contrast", highContrast);
        html.classList.toggle("dark", darkMode);
        html.classList.toggle("reduce-motion", reduceMotion);
        html.classList.toggle("highlight-links", highlightLinks);
    }, [textScale, highContrast, darkMode, highlightLinks, reduceMotion]);



    useEffect(() => {
        const timeout = setTimeout(() => {
            const settings = {
                textScale,
                highContrast,
                darkMode,
                highlightLinks,
                reduceMotion
            };
            localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
        }, 300);

        return () => clearTimeout(timeout);
    }, [textScale, highContrast, darkMode, highlightLinks, reduceMotion]);


    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Open accessibility settings"
                className="
                            fixed bottom-5 right-5 z-[9999]
                            bg-white hover:bg-gray-100
                            rounded-full w-14 h-14 shadow-xl transition-all
                            flex items-center justify-center
                          "
            >
                <Image
                    src={accessibilityLogo}
                    alt="Accessibility icon"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </button>




            {open && (
                <div className="
                              fixed bottom-20 right-5 z-[9999]
                              bg-white border border-gray-300 shadow-xl
                              rounded-2xl w-80 p-5
                              flex flex-col gap-4
                          ">

                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Accessibility Options
                        </h2>

                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close accessibility panel"
                            className="text-gray-600 hover:text-gray-900 text-xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* GRID LAYOUT */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* TEXT SIZE */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50">
                            <span className="font-medium text-gray-800">Text Size</span>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => setTextScale(prev => Math.max(0.8, prev - 0.1))}
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    A-
                                </button>
                                <button
                                    onClick={() => setTextScale(prev => Math.min(1.6, prev + 0.1))}
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    A+
                                </button>
                            </div>
                        </div>

                        {/* HIGH CONTRAST */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50">
                            <span className="font-medium text-gray-800">High Contrast</span>
                            <input
                                type="checkbox"
                                checked={highContrast}
                                onChange={() => setHighContrast(!highContrast)}
                                className="mt-3 w-5 h-5"
                            />
                        </div>

                        {/* DARK MODE */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50">
                            <span className="font-medium text-gray-800">Dark Mode</span>
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                                className="mt-3 w-5 h-5"
                            />
                        </div>

                        {/* HIGHLIGHT LINKS */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50">
                            <span className="font-medium text-gray-800">Highlight Links</span>
                            <input
                                type="checkbox"
                                checked={highlightLinks}
                                onChange={() => setHighlightLinks(!highlightLinks)}
                                className="mt-3 w-5 h-5"
                            />
                        </div>

                        {/* REDUCE MOTION */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">Reduce Motion</span>
                            <input
                                type="checkbox"
                                checked={reduceMotion}
                                onChange={() => setReduceMotion(!reduceMotion)}
                                className="mt-3 w-5 h-5"
                            />
                        </div>

                    </div>


                    <div className="text-center text-xs text-gray-500 mt-2">
                        Accessibility tools for the Tampa Palms Professional Center website
                    </div>
                </div>
            )}
        </>
    );
};


export default AccessibilityWidget;
