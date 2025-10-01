"use client";
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-sm ring-1 ring-slate-200">
      {children}
    </span>
  );
}
