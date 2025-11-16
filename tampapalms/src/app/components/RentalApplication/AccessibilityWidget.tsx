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
    const [language, setLanguage] = useState("English");
    const [highlightLinks, setHighlightLinks] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    const contrastModes = ["normal", "dark", "invert", "grayscale"];
    const [contrastIndex, setContrastIndex] = useState(0);

    const nextContrast = () => {
        setContrastIndex((prev) => (prev + 1) % contrastModes.length);
    };

    const prevContrast = () => {
        setContrastIndex((prev) =>
            prev === 0 ? contrastModes.length - 1 : prev - 1
        );
    };


    useEffect(() => {
        const saved = localStorage.getItem("accessibilitySettings");
        if (!saved) return;

        try {
            const settings = JSON.parse(saved);

            setTextScale(settings.textScale ?? 1);
            setHighContrast(settings.highContrast ?? false);
            setHighlightLinks(settings.highlightLinks ?? false);
            setReduceMotion(settings.reduceMotion ?? false);
            setContrastIndex(settings.contrastIndex ?? 0);

        } catch (err) {
            console.error("Failed to load saved settings", err);
        }
    }, []);



    useEffect(() => {
        const html = document.documentElement;

        html.classList.remove("contrast-dark", "contrast-invert", "contrast-grayscale");

        const currentMode = contrastModes[contrastIndex];

        if (currentMode === "dark") {
            html.classList.add("contrast-dark");
        }
        else if (currentMode === "invert") {
            html.classList.add("contrast-invert");
        }
        else if (currentMode === "grayscale") {
            html.classList.add("contrast-grayscale");
        }

        html.style.setProperty("--text-scale", textScale.toString());
        html.classList.toggle("high-contrast", highContrast);
        html.classList.toggle("reduce-motion", reduceMotion);
        html.classList.toggle("highlight-links", highlightLinks);

    }, [textScale, highContrast, highlightLinks, reduceMotion, contrastIndex]); // ⭐ FIXED



    useEffect(() => {
        const timeout = setTimeout(() => {
            const settings = {
                textScale,
                highContrast,
                highlightLinks,
                reduceMotion,
                contrastIndex
            };
            localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
        }, 300);

        return () => clearTimeout(timeout);
    }, [textScale, highContrast, highlightLinks, reduceMotion, contrastIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);


    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Accessibility options"
                tabIndex = {0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpen((prev) => !prev);
                    }
                }}
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
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="accessibility-panel-title"
                    className="
                              fixed bottom-20 right-5 z-[9999]
                              bg-white border border-gray-300 shadow-xl
                              rounded-2xl w-80 p-5
                              flex flex-col gap-4
                          ">

                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h2
                            id="accessibility-panel-title"
                            className="text-lg font-semibold text-gray-800">
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

                    <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50">
                        <span className="font-medium text-gray-800">Language</span>

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="mt-2 border rounded-lg p-1 text-sm"
                        >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>Arabic</option>
                            <option>Chinese</option>
                        </select>
                    </div>


                    {/* GRID LAYOUT */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* TEXT SIZE */}
                        <div className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 col-span-2">

                            {/* Minus Button */}
                            <button
                                onClick={() => setTextScale(prev => Math.max(0.8, prev - 0.1))}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                                aria-label="Decrease text size"
                            >
                                –
                            </button>

                            {/* Label */}
                            <span className="font-medium text-gray-800 text-center">
                                Text Size
                            </span>

                            {/* Plus Button */}
                            <button
                                onClick={() => setTextScale(prev => Math.min(1.6, prev + 0.1))}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                                aria-label="Increase text size"
                            >
                                +
                            </button>
                        </div>


                        {/* HIGH CONTRAST */}
                        {/* CONTRAST MODE CAROUSEL */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">Contrast Mode</span>

                            <div className="flex items-center gap-4 mt-3">

                                {/* Prev Button */}
                                <button
                                    onClick={prevContrast}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    ←
                                </button>

                                {/* Mode Display */}
                                <span className="text-sm font-medium text-gray-900 min-w-[90px] text-center">
                                    {contrastModes[contrastIndex]}
                                </span>

                                {/* Next Button */}
                                <button
                                    onClick={nextContrast}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    →
                                </button>
                            </div>
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
