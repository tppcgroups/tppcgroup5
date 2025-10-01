"use client";
import Badge from "./Badge";

export default function TextField({
  label, type = "text", name, placeholder,
}: { label: string; type?: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <div className="relative">
        <div className="-mb-3 pl-3"><Badge>{label}</Badge></div>
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 pt-7 shadow-sm shadow-slate-900/5">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full bg-transparent text-[15px] !text-slate-900 outline-none placeholder:text-slate-400"
          />
          <div className="mt-4 border-t border-dashed border-slate-200" />
        </div>
      </div>
    </label>
  );
}
