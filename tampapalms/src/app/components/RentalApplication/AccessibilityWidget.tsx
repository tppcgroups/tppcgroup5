"use client";
import accessibilityLogo from "../accessibility.png";
import { translations } from "./Translations";
import { announce } from "./screenReader";



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

    const contrastModes = ["default", "dark", "invert", "grayscale"];
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

    const cursorSizes = ["small", "medium", "large"] as const;
    const [cursorIndex, setCursorIndex] = useState(0);
    const cursorSize = cursorSizes[cursorIndex];

    const nextCursor = () => {
        setCursorIndex((prev) => (prev + 1) % cursorSizes.length);
    };

    const prevCursor = () => {
        setCursorIndex((prev) =>
            prev === 0 ? cursorSizes.length - 1 : prev - 1
        );
    };

    const [screenReaderMode, setScreenReaderMode] = useState(false);

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
            setCursorIndex(settings.cursorSize ?? 0);
            setCursorIndex(settings.cursorIndex ?? 0);
            setScreenReaderMode(settings.screenReader ?? false);
            setBackgroundThemeIndex(settings.backgroundTheme ?? 0);


        } catch (err) {
            console.error("Failed to load saved settings", err);
        }
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("screenReaderMode");
        if (saved === "true") {
            setScreenReaderMode(true);
            document.documentElement.classList.add("screen-reader-mode");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("screenReaderMode", screenReaderMode.toString());

        if (screenReaderMode) {
            document.documentElement.classList.add("screen-reader-mode");
            announce("Screen reader mode enabled. Reading page.");
            announce(document.title);
        } else {
            document.documentElement.classList.remove("screen-reader-mode");
            window.speechSynthesis.cancel();
        }
    }, [screenReaderMode]);



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



    }, [textScale, highContrast, highlightIndex, reduceMotion, contrastIndex, languageIndex, cursorIndex]);



    useEffect(() => {
        const timeout = setTimeout(() => {
            const settings = {
                textScale,
                highContrast,
                highlightIndex,
                reduceMotion,
                contrastIndex,
                languageIndex,
                cursorIndex,
                backgroundThemeIndex,
            };
            localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
        }, 300);

        return () => clearTimeout(timeout);
    }, [textScale, highContrast, highlightIndex, reduceMotion, contrastIndex, languageIndex, cursorIndex, backgroundThemeIndex]);


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
        const html = document.documentElement;

        html.classList.remove("cursor-small", "cursor-medium", "cursor-large");
        html.classList.add(`cursor-${cursorSizes[cursorIndex]}`);
    }, [cursorIndex]);

    useEffect(() => {
        if (screenReaderMode) {
            announce("Screen reader mode enabled. Reading page.");
            announce(document.title);
        }
    }, [screenReaderMode]);



    const cursorLabelKey: Record<typeof cursorSizes[number], keyof typeof t> = {
        small: "cursorSmall",
        medium: "cursorMedium",
        large: "cursorLarge",
    };

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

                        {/* SCREEN READER MODE */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">Screen Reader Mode</span>

                            <input
                                type="checkbox"
                                checked={screenReaderMode}
                                onChange={() => setScreenReaderMode(!screenReaderMode)}
                                className="mt-3 w-5 h-5"
                                aria-label="Toggle screen reader mode"
                            />
                        </div>


                    </div>

                    {/* CURSOR SIZE SELECTOR */}
                    <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                        <span className="font-medium text-gray-800">{t.cursorSize}</span>

                        <div className="flex items-center gap-4 mt-3">

                            {/* Prev Button */}
                            <button
                                onClick={prevCursor}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                ←
                            </button>

                            {/* Current size */}
                            <span className="text-sm font-medium text-gray-900 min-w-[90px] text-center">
                                {t[cursorLabelKey[cursorSizes[cursorIndex]]]}
                            </span>

                            {/* Next Button */}
                            <button
                                onClick={nextCursor}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                →
                            </button>
                        </div>
                    </div>
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
                            setCursorIndex(0);

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
                </div>
            )}
        </>
    );
};


export default AccessibilityWidget;
