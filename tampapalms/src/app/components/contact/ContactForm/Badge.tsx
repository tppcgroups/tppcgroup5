"use client";
// Reusable pill-style label that highlights form field headings.
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#7a6754] text-white text-sm px-3 py-1 shadow-sm">
      {children}
    </span>
  );
}
