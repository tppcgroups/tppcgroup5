"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ReducedMotionContextType = {
    reduceMotion: boolean;
    setReduceMotion: (value: boolean) => void;
};

const ReducedMotionContext = createContext<ReducedMotionContextType | undefined>(undefined);

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("accessibilitySettings");
        if (saved) {
            const parsed = JSON.parse(saved);
            setReduceMotion(parsed.reduceMotion ?? false);
        }
    }, []);

    return (
        <ReducedMotionContext.Provider value={{ reduceMotion, setReduceMotion }}>
            {children}
        </ReducedMotionContext.Provider>
    );
}

export function useReducedMotion() {
    const ctx = useContext(ReducedMotionContext);
    if (!ctx) throw new Error("useReducedMotion must be used inside ReducedMotionProvider");
    return ctx;
}
