"use client";
import accessibilityLogo from "../accessibility.png";
import { translations } from "./Translations";
import { announce } from "./screenReader";

import { setScreenReaderEnabled } from "@/app/components/RentalApplication/screenReader";



import React, { useEffect, useState} from "react";
import Image from "next/image";



type Language = "English" | "Spanish" | "French" | "Swahili";



type AccessibilityWidget = {
    highContrast: boolean;
    largeText: boolean;
};
const AccessibilityWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [textScale, setTextScale] = useState(1);
    const [highContrast, setHighContrast] = useState(false);
    const [language, setLanguage] = useState<Language>("English");

    const highlightOptions = ["default", "links", "buttons", "headers"] as const;
    const [highlightIndex, setHighlightIndex] = useState(0);
    const nextHighlight = () =>
        setHighlightIndex(prev => (prev + 1) % highlightOptions.length);
    const prevHighlight = () =>
        setHighlightIndex(prev => (prev === 0 ? highlightOptions.length - 1 : prev - 1));

    const [reduceMotion, setReduceMotion] = useState(false);

    const contrastModes = ["default", "invert", "grayscale"];
    const [contrastIndex, setContrastIndex] = useState(0);

    const nextContrast = () => {
        setContrastIndex((prev) => (prev + 1) % contrastModes.length);
    };

    const prevContrast = () => {
        setContrastIndex((prev) =>
            prev === 0 ? contrastModes.length - 1 : prev - 1
        );
    };


    const languages: Language[] = ["English", "Spanish", "French", "Swahili"];


    const [languageIndex, setLanguageIndex] = useState(0);
    const t = translations[languages[languageIndex] as Language];

    const nextLanguage = () => {
        setLanguageIndex((prev) => (prev + 1) % languages.length);
    };

    const prevLanguage = () => {
        setLanguageIndex((prev) =>
            prev === 0 ? languages.length - 1 : prev - 1
        );
    };


    const [screenReaderMode, setScreenReaderMode] = useState(false);

    const [optionsPanelOpen, setOptionsPanelOpen] = useState(false);

    const backgroundThemeModes = ["light", "dark"] as const;
    type backgroundThemeMode = typeof backgroundThemeModes[number];
    const [backgroundThemeIndex, setBackgroundThemeIndex] = useState(0);

    const nextBackgroundTheme = () => {
        setBackgroundThemeIndex((prev) => (prev + 1) % backgroundThemeModes.length);
    };
    const prevBackgroundTheme = () => {
        setBackgroundThemeIndex((prev) => prev === 0 ? backgroundThemeModes.length - 1 : prev - 1);
    };



    useEffect(() => {
        const saved = localStorage.getItem("accessibilitySettings");
        if (!saved) return;

        try {
            const settings = JSON.parse(saved);

            setTextScale(settings.textScale ?? 1);
            setHighContrast(settings.highContrast ?? false);
            setHighlightIndex(settings.highlightIndex ?? 0);
            setReduceMotion(settings.reduceMotion ?? false);
            setContrastIndex(settings.contrastIndex ?? 0);
            setLanguageIndex(settings.languageIndex ?? 0);
            setScreenReaderMode(settings.screenReaderMode ?? false);
            setBackgroundThemeIndex(settings.backgroundThemeIndex ?? 0);


        } catch (err) {
            console.error("Failed to load saved settings", err);
        }
    }, []);



    useEffect(() => {
        if (!screenReaderMode) return;

        const timeout = setTimeout(() => {
            announce("VoiceOver is now activated");
            announce(document.title);
        }, 600);

        return () => clearTimeout(timeout);
    }, [screenReaderMode]);



    useEffect(() => {
        const html = document.documentElement;

        html.classList.remove( "contrast-invert", "contrast-grayscale");

        const currentMode = contrastModes[contrastIndex];

        if (currentMode === "invert") {
            html.classList.add("contrast-invert");
        }
        else if (currentMode === "grayscale") {
            html.classList.add("contrast-grayscale");
        }

        html.setAttribute("lang", languages[languageIndex]);

        html.style.setProperty("--text-scale", textScale.toString());
        html.classList.toggle("high-contrast", highContrast);
        html.classList.toggle("reduce-motion", reduceMotion);

        html.classList.remove("highlight-links", "highlight-buttons", "highlight-headers");

        const currentHighlight = highlightOptions[highlightIndex];

        if (currentHighlight === "links") html.classList.add("highlight-links");
        if (currentHighlight === "buttons") html.classList.add("highlight-buttons");
        if (currentHighlight === "headers") html.classList.add("highlight-headers");

        html.classList.toggle("screen-reader-mode", screenReaderMode);

        const currentBackgroundTheme: backgroundThemeMode = backgroundThemeModes[backgroundThemeIndex];
        document.documentElement.classList.toggle("dark", currentBackgroundTheme === "dark");
        document.documentElement.classList.toggle("light", currentBackgroundTheme === "light");
        const body = document.body

        if (currentBackgroundTheme === "dark") {
            body.classList.add("dark");
        }
        else {
            body.classList.remove("dark");
        }




    }, [textScale, highContrast, highlightIndex, reduceMotion, contrastIndex, languageIndex, backgroundThemeIndex, screenReaderMode]);

    useEffect(() => {
        const html = document.documentElement;

        // Remove any previous theme classes
        html.classList.remove("dark");

        const currentTheme = backgroundThemeModes[backgroundThemeIndex];

        if (currentTheme === "dark") {
            html.classList.add("dark");
        }

    }, [backgroundThemeIndex]);




    useEffect(() => {
        const timeout = setTimeout(() => {
            const settings = {
                textScale,
                highContrast,
                highlightIndex,
                reduceMotion,
                contrastIndex,
                languageIndex,
                backgroundThemeIndex,
                screenReaderMode
            };
            localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
        }, 300);

        return () => clearTimeout(timeout);
    }, [textScale, highContrast, highlightIndex, reduceMotion, contrastIndex, languageIndex, backgroundThemeIndex, screenReaderMode]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);



    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (!event) {
                return;
            }

            const isShift = e.shiftKey;
            const isCtrl = e.ctrlKey || e.metaKey;
            let handled = false;


            if (isShift && (e.code === 'Equal' || e.code === 'NumpadAdd')) {
                setTextScale(prev => Math.min(1.6, prev + 0.1));
                handled = true;
            } else if (isShift && (e.code === 'Minus' || e.code === 'NumpadSubtract')) {

                setTextScale(prev => Math.max(0.8, prev - 0.1));
                handled = true;
            }


            else if (isShift && e.code === 'KeyC') {
                nextContrast();
                handled = true;
            } else if (isShift && e.code === 'KeyZ') {
                prevContrast();
                handled = true;
            }


            else if (isShift && e.code === 'KeyF') {
                nextLanguage();
                handled = true;
            } else if (isShift && e.code === 'KeyP') {
                prevLanguage();
                handled = true;
            }

            else if (isShift && e.code === 'KeyT') {
                nextBackgroundTheme();
                handled = true;
            } else if (isShift && e.code === 'KeyB') {
                prevBackgroundTheme();
                handled = true;
            }

            else if (isShift && e.code === 'KeyH') {
                nextHighlight();
                handled = true;
            } else if (isShift && e.code === 'KeyL') {
                prevHighlight();
                handled = true;
            }
            else if (isShift && e.code === 'KeyM') {
                event.preventDefault();
                setReduceMotion(prev => !prev);
                handled = true;
            }

            else if (isShift && e.code === 'KeyV') {
                const newValue = !screenReaderMode;
                setScreenReaderMode(newValue);
                setScreenReaderEnabled(newValue); // Update global state

                if (newValue) {
                    announce("VoiceOver is now activated");
                } else {
                    announce("VoiceOver is now turned off");
                }
                handled = true;
            }


            else if (isCtrl && isShift && e.code === 'KeyO') {
                setOpen(prev => !prev);
                handled = true;
            }


            if (handled) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // Attach the listener
        window.addEventListener("keydown", handleGlobalKeyDown);

        // Cleanup function (Destructor)
        return () => {
            // Ensure the correct spelling for cleanup
            window.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [
        textScale, screenReaderMode, setScreenReaderMode, setOpen,
        nextContrast, prevContrast, nextLanguage, prevLanguage, setTextScale
    ]);





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
                    bg-white border border-gray-300 shadow-xl
                    rounded-full w-14 h-14
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

                        max-h-[80vh]     /* Prevents panel from going off-screen */
                        overflow-y-auto  /* Enables scrolling */
                        overscroll-contain
                    "
                >

                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h2
                            id="accessibility-panel-title"
                            className="text-lg font-semibold text-gray-800">
                            {t.header}
                        </h2>

                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close accessibility panel"
                            className="text-gray-600 hover:text-gray-900 text-xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* LANGUAGE SELECTOR  (SLIDER) */}
                    <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">

                        <span className="font-medium text-gray-800">{t.language}</span>


                        <div className="flex items-center gap-4 mt-3">

                            {/* PREV BUTTON */}
                            <button
                                onClick={prevLanguage}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                ←
                            </button>

                            <span className="text-sm font-medium text-gray-900 min-w-[90px] text-center">
                                {languages[languageIndex]}
                            </span>

                            {/* NEXT BUTTON */}
                            <button
                                onClick={nextLanguage}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                →
                            </button>
                        </div>
                    </div>




                    {/* GRID LAYOUT */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* TEXT SIZE */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">{t.textSize}</span>

                            <div className="flex items-center gap-4 mt-3">
                                <button
                                    onClick={() => setTextScale(prev => Math.max(0.8, prev - 0.1))}
                                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                                >
                                    –
                                </button>

                                <span className="text-sm font-medium text-gray-900 min-w-[90px] text-center">
                                    {textScale.toFixed(1)}x
                                 </span>

                                <button
                                    onClick={() => setTextScale(prev => Math.min(1.6, prev + 0.1))}
                                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>



                        {/* HIGH CONTRAST */}
                        {/* CONTRAST MODE CAROUSEL */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">{t.contrastMode}</span>

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
                                    {contrastModes[contrastIndex].charAt(0).toUpperCase() + contrastModes[contrastIndex].slice(1)}
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

                        {/* LIGHT / DARK THEME */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">Theme</span>

                            <div className="flex items-center gap-4 mt-3">

                                {/* Prev Button */}
                                <button
                                    onClick={prevBackgroundTheme}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    ←
                                </button>

                                {/* Current Theme Display */}
                                <span className="text-sm font-medium text-gray-900 min-w-[90px] text-center capitalize">
                                    {backgroundThemeModes[backgroundThemeIndex]}
                                </span>

                                {/* Next Button */}
                                <button
                                    onClick={nextBackgroundTheme}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    →
                                </button>
                            </div>
                        </div>


                        {/* HIGHLIGHTS SECTION */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">{t.highlights}</span>

                            <div className="flex items-center gap-4 mt-3">

                                {/* Prev Button */}
                                <button
                                    onClick={prevHighlight}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    ←
                                </button>

                                {/* Display Current Highlight Mode */}
                                <span className="text-sm font-medium text-gray-900 min-w-[90px] text-center">
                                    {t[`highlight_${highlightOptions[highlightIndex]}`]}
                                </span>

                                {/* Next Button */}
                                <button
                                    onClick={nextHighlight}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    →
                                </button>
                            </div>
                        </div>



                        {/* REDUCE MOTION */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">{t.reduceMotion}</span>
                            <input
                                type="checkbox"
                                checked={reduceMotion}
                                onChange={() => setReduceMotion(!reduceMotion)}
                                className="mt-3 w-5 h-5"
                            />
                        </div>

                        {/* SCREEN READER */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">{t.screenReader}</span>

                            <input
                                type="checkbox"
                                checked={screenReaderMode}
                                onChange={() => {
                                    const newValue = !screenReaderMode;
                                    setScreenReaderMode(newValue);
                                    setScreenReaderEnabled(newValue);

                                    if (newValue) {
                                        announce("VoiceOver is now activated");
                                    } else {
                                        announce("VoiceOver is now turned off");
                                    }
                                }}
                                className="mt-3 w-5 h-5"
                            />
                        </div>



                    </div>
                    {/* Navigation Button */}
                        <button
                            onClick={() => setOptionsPanelOpen(true)}
                            className="w-full py-2 mt-4 rounded-lg text-white font-semibold"
                            style={{ backgroundColor: "rgb(18,25,43" }} // Reusing the same style as reset
                        >
                            {t.keyboardNavigation}
                        </button>
                    {/* RESET BUTTON */}
                    <button
                        onClick={() => {
                            // Reset state values
                            setTextScale(1);
                            setHighContrast(false);
                            setHighlightIndex(0);
                            setReduceMotion(false);
                            setContrastIndex(0);
                            setLanguageIndex(0);
                            setScreenReaderMode(false);
                            setScreenReaderEnabled(false);
                            announce("VoiceOver is now turned off");
                            setBackgroundThemeIndex(0);

                            // Clear localStorage
                            localStorage.removeItem("accessibilitySettings");
                        }}
                        className="w-full py-2 mt-4 rounded-lg text-white font-semibold"
                        style={{ backgroundColor: "rgb(18,25,43" }}
                    >
                        {t.reset || "Reset Settings"}
                    </button>


                    <div className="text-center text-xs text-gray-500 mt-2">
                        {t.footer}
                    </div>

                    {/* --- NEW CODE: OPTIONS DETAILS PANEL --- */}
                    {optionsPanelOpen && (
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="options-panel-title"
                            className="
                                fixed bottom-20 right-[350px] z-[9999]
                                bg-white border border-gray-300 shadow-2xl
                                rounded-2xl w-96 p-5
                                flex flex-col gap-4 max-h-[80vh] overflow-y-auto
                            "
                            // Add Escape key listener to close the new panel
                            tabIndex={-1}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setOptionsPanelOpen(false);
                                }
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <h2 id="options-panel-title" className="text-lg font-bold text-gray-800">
                                    {t.shortcutsHeader}
                                </h2>
                                <button
                                    onClick={() => setOptionsPanelOpen(false)}
                                    aria-label="Close options panel"
                                    className="text-gray-600 hover:text-gray-900 text-xl"
                                >
                                    ×
                                </button>
                            </div>

                            <p className="text-sm text-gray-600">
                                {t.shortcutsIntro}
                            </p>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-gray-800 mt-2">{t.keyboardNavigation}</h3>

                                {/* List the Shortcuts */}
                                <div className="grid grid-cols-2 gap-y-2 text-sm">

                                    <span className="font-mono bg-gray-100 p-1 rounded">Ctrl + Shift + O</span>
                                    <span>Toggle Accessibility Panel</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + F</span>
                                    <span>Next Language</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + P</span>
                                    <span>Previous Language</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift +</span>
                                    <span>Increase Text Size</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift -</span>
                                    <span>Decrease Text Size</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + C</span>
                                    <span>Next Contrast Mode</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + Z</span>
                                    <span>Previous Contrast Mode</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + T</span>
                                    <span>Next Theme Mode</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + B</span>
                                    <span>Previous Theme Mode</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + H</span>
                                    <span>Next Highlight</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + L</span>
                                    <span>Previous Highlight</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + M</span>
                                    <span>Toggle Reduce Motion</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + V</span>
                                    <span>Toggle Screen Reader</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};


export default AccessibilityWidget;
