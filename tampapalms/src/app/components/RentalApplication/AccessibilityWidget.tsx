"use client";
import accessibilityLogo from "../accessibility.png";
import { announce } from "./screenReader";

import { setScreenReaderEnabled } from "@/app/components/RentalApplication/screenReader";



import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronUp } from "react-icons/hi";
import Image from "next/image";




type AccessibilityWidget = {
    highContrast: boolean;
    largeText: boolean;
};

type AccessibilitySettingsSnapshot = {
    textScale: number;
    highContrast: boolean;
    highlightIndex: number;
    reduceMotion: boolean;
    contrastIndex: number;
    backgroundThemeIndex: number;
};

const AccessibilityWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [textScale, setTextScale] = useState(1);
    const [highContrast, setHighContrast] = useState(false);

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

    const logAccessibilityEvent = useCallback(
        async (
            eventType: "ACCESSIBILITY_ICON_CLICK" | "ACCESSIBILITY_SETTING_CHANGE",
            metadata: Record<string, unknown> = {}
        ) => {
            try {
                await fetch("/api/accessibility-events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventType,
                        metadata,
                    }),
                });
            } catch (error) {
                console.error("Failed to log accessibility event:", error);
            }
        },
        []
    );

    const toggleWidgetVisibility = useCallback(
        (trigger: "button" | "keyboard" | "shortcut" = "button") => {
            setOpen((prev) => {
                const next = !prev;
                void logAccessibilityEvent("ACCESSIBILITY_ICON_CLICK", {
                    trigger,
                    opened: next,
                });
                return next;
            });
        },
        [logAccessibilityEvent]
    );

    const previousSettingsRef = useRef<AccessibilitySettingsSnapshot>({
        textScale,
        highContrast,
        highlightIndex,
        reduceMotion,
        contrastIndex,
        backgroundThemeIndex,
    });
    const settingsLogInitializedRef = useRef(false);



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
            setBackgroundThemeIndex(settings.backgroundThemeIndex ?? 0);


        } catch (err) {
            console.error("Failed to load saved settings", err);
        }
    }, []);



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

        html.style.setProperty("--text-scale", textScale.toString());
        html.classList.toggle("high-contrast", highContrast);
        html.classList.toggle("reduce-motion", reduceMotion);

        html.classList.remove("highlight-links", "highlight-buttons", "highlight-headers");

        const currentHighlight = highlightOptions[highlightIndex];

        if (currentHighlight === "links") html.classList.add("highlight-links");
        if (currentHighlight === "buttons") html.classList.add("highlight-buttons");
        if (currentHighlight === "headers") html.classList.add("highlight-headers");

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




    }, [textScale, highContrast, highlightIndex, reduceMotion, contrastIndex, backgroundThemeIndex]);

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
                backgroundThemeIndex,
            };
            localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
        }, 300);

        return () => clearTimeout(timeout);
    }, [textScale, highContrast, highlightIndex, reduceMotion, contrastIndex, backgroundThemeIndex]);

    useEffect(() => {
        const currentSettings: AccessibilitySettingsSnapshot = {
            textScale,
            highContrast,
            highlightIndex,
            reduceMotion,
            contrastIndex,
            backgroundThemeIndex,
        };

        if (!settingsLogInitializedRef.current) {
            previousSettingsRef.current = currentSettings;
            settingsLogInitializedRef.current = true;
            return;
        }

        const previousSettings = previousSettingsRef.current;
        const changes: Partial<Record<keyof AccessibilitySettingsSnapshot, { previous: unknown; current: unknown }>> = {};

        (Object.keys(currentSettings) as Array<keyof AccessibilitySettingsSnapshot>).forEach((key) => {
            if (previousSettings[key] !== currentSettings[key]) {
                changes[key] = {
                    previous: previousSettings[key],
                    current: currentSettings[key],
                };
            }
        });

        if (Object.keys(changes).length > 0) {
            void logAccessibilityEvent("ACCESSIBILITY_SETTING_CHANGE", {
                changes,
                currentSettings,
            });
        }

        previousSettingsRef.current = currentSettings;
    }, [
        textScale,
        highContrast,
        highlightIndex,
        reduceMotion,
        contrastIndex,
        backgroundThemeIndex,
        logAccessibilityEvent,
    ]);


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
        if (!open) {
            return;
        }

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

            else if (isCtrl && isShift && e.code === 'KeyO') {
                toggleWidgetVisibility("shortcut");
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
        open,
        textScale, nextContrast, prevContrast, setTextScale, toggleWidgetVisibility
    ]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };





    return (
        <>
            <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
                <button
                    onClick={() => toggleWidgetVisibility("button")}
                    aria-label="Accessibility options"
                    tabIndex = {0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleWidgetVisibility("keyboard");
                        }
                    }}
                    className="
                        bg-white border border-[#c8b79f] shadow-xl
                        rounded-full w-12 h-12
                        flex items-center justify-center
                        hover:scale-[1.03] transition-transform
                        cursor-pointer
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

                <button
                    aria-label="Back to top"
                    onClick={scrollToTop}
                    aria-hidden={!showScrollTop}
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1a16] text-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.35)] transition-all duration-200 ease-in-out hover:shadow-[0_18px_32px_-12px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-4 focus:ring-black/10 cursor-pointer hover:scale-[1.03] transition-transform ${
                        showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                >
                    <HiChevronUp className="h-6 w-6" aria-hidden />
                </button>
            </div>




            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="accessibility-panel-title"
                    className="
                        accessibility-panel
                        fixed bottom-20 right-5 z-[9999]
                        bg-white border border-gray-300 shadow-xl
                        rounded-2xl w-80 p-5
                        flex flex-col gap-4
                        max-h-[80vh]
                        overflow-y-auto
                        overscroll-contain
                    "
                >

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
                            className="text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
                        >
                            ×
                        </button>
                    </div>




                    {/* GRID LAYOUT */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* TEXT SIZE */}
                        <div className="flex flex-col items-center p-3 border rounded-xl bg-gray-50 col-span-2">
                            <span className="font-medium text-gray-800">Text Size</span>

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
                            <span className="font-medium text-gray-800">Highlights</span>

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
                                    {{
                                        default: "Default",
                                        links: "Highlight Links",
                                        buttons: "Highlight Buttons",
                                        headers: "Highlight Headers"
                                    }[highlightOptions[highlightIndex]]}
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
                            <span className="font-medium text-gray-800">Reduce Motion</span>
                            <input
                                type="checkbox"
                                checked={reduceMotion}
                                onChange={() => setReduceMotion(!reduceMotion)}
                                className="mt-3 w-5 h-5"
                            />
                        </div>




                    </div>
                    {/* Navigation Button */}
                        <button
                            onClick={() => setOptionsPanelOpen(true)}
                            className="w-full py-2 mt-4 rounded-lg font-semibold text-white border border-[#3d342a] bg-[#120f0c] hover:bg-[#1b1815]"
                        >
                            Keyboard Navigation
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
                            setScreenReaderEnabled(false);
                            announce("VoiceOver is now turned off");
                            setBackgroundThemeIndex(0);

                            // Clear localStorage
                            localStorage.removeItem("accessibilitySettings");
                        }}
                        className="w-full py-2 mt-4 rounded-lg font-semibold text-white border border-[#3d342a] bg-[#120f0c] hover:bg-[#1b1815]"
                    >
                        Reset Settings
                    </button>


                    <div className="text-center text-xs text-gray-500 mt-2">
                        Accessibility tools for the Tampa palms Professional Center website.
                    </div>

                    {/* --- NEW CODE: OPTIONS DETAILS PANEL --- */}
                    {optionsPanelOpen && (
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="options-panel-title"
                            className="
                                accessibility-panel
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
                                    Accessibility Options & Shortcuts
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
                                Use these shortcuts anywhere on the site for quick adjustments.
                            </p>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-gray-800 mt-2">Keyboard Navigation</h3>

                                {/* List the Shortcuts */}
                                <div className="grid grid-cols-2 gap-y-2 text-sm">

                                    <span className="font-mono bg-gray-100 p-1 rounded">Ctrl + Shift + O</span>
                                    <span>Shortcuts Panel</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + F</span>
                                    <span>Shortcuts Next Language</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + P</span>
                                    <span>Shortcuts Previous Language</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift +</span>
                                    <span>Shortcuts Increase Text</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift -</span>
                                    <span>Shortcuts Decrease Text</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + C</span>
                                    <span>Shortcuts Next Contrast</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + Z</span>
                                    <span>Shortcuts Previous Contrast</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + T</span>
                                    <span>Shortcuts Next Theme</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + B</span>
                                    <span>Shortcuts Previous Theme</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + H</span>
                                    <span>Shortcuts Next Highlight</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + L</span>
                                    <span>Shortcuts Previous Highlight</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + M</span>
                                    <span>Shortcuts Toggle Reduce Motion</span>

                                    <span className="font-mono bg-gray-100 p-1 rounded">Shift + V</span>
                                    <span>Shortcuts Toggle Screen Reader</span>
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
