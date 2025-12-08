"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "tppc-privacy-consent";

export default function ConsentNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = localStorage.getItem(CONSENT_KEY);
    setVisible(!accepted);
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CONSENT_KEY, "true");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9300] px-4 pb-4 md:px-8 md:pb-6 w-full">
      <div className="mx-auto flex flex-col gap-4 rounded-2xl border border-[#c8b79f] bg-[#f9f6f1]/95 px-5 py-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] backdrop-blur md:max-w-6xl md:flex-row md:items-center md:justify-between md:gap-6 md:px-7 md:py-5">
        <div className="space-y-2 text-sm text-[#1f1a16] md:max-w-3xl">
          <p className="font-semibold text-[#1f1a16]">We do not use cookies to track your activity.</p>
          <p className="text-[#4a4034]">
            The only personal information we collect is your email address, used exclusively to contact you regarding
            inquiries, notifications, or any communication related to the contact form.
          </p>
          <p className="text-[#4a4034]">
            You can unsubscribe at any time, and your email will be promptly removed from our system.
          </p>
          <p className="text-[#4a4034]">
            For more details, please see our{" "}
            <Link href="/pages/Contact" className="font-semibold text-[#7a6754] underline underline-offset-2">
              Privacy Policy / Terms of Service
            </Link>
            .
          </p>
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="self-start rounded-xl bg-[#7a6754] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.15em] text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)] transition hover:bg-[#5a4b3c] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-4 focus:ring-[#c8b79f]/60 md:self-center cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
