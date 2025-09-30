"use client";
import Badge from "./Badge";

export default function TextField({
  label, type = "text", name, placeholder,
}: { label: string; type?: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <div className="relative">
        <div className="-mb-3 pl-3"><Badge>{label}</Badge></div>
        <div className="rounded-2xl bg-neutral-200/80 p-4 pt-6 shadow-inner">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-[15px] !text-black placeholder:text-neutral-500"
          />
          <div className="mt-3 border-t border-dashed border-neutral-400" />
        </div>
      </div>
    </label>
  );
}
