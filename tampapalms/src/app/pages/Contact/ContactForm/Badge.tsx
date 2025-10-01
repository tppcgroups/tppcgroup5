"use client";
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-teal-600 text-white text-sm px-3 py-1 shadow-sm">
      {children}
    </span>
  );
}
