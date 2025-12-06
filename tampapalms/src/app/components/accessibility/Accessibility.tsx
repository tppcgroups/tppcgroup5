'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import AccessibilityPopUp from './AccessibilityPopUp';


const Accessibility = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopUp = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className="fixed bottom-5 right-5 z-[100]">
            <button
                aria-label="Open accessibility panel"
                onClick={togglePopUp}
                className="shadow-2xl w-10 h-10 rounded-full bg-[var(--card)] text-[var(--card-foreground)] hover:scale-105 transition-transform duration-200 ease-in-out flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
            >
                <Image
                    src="/images/accessibility.png"
                    alt="Accessibility Icon"
                    width={40}
                    height={40}
                    className="p-2"
                />
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-[50]">
                    {/* overlay/backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={togglePopUp}
                        aria-hidden
                    />

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Accessibility panel"
                        className="relative bg-[var(--popover)] text-[var(--popover-foreground)] p-6 rounded-lg shadow-lg max-w-md w-full mx-4 z-[60] ring-1 ring-[var(--border)]"
                    >
                        <button
                            onClick={togglePopUp}
                            aria-label="Close accessibility panel"
                            className="absolute top-3 right-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--ring)] rounded"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Accessibility</h2>
                        <p className="leading-relaxed">This is where the accessibility content will be.</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={togglePopUp}
                                className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Accessibility
