"use client";
import Badge from "./Badge";

// Floating-label text input styled to match the message textarea.
export default function TextField({
  label, type = "text", name, placeholder,
}: { label: string; type?: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <div className="relative">
        <div className="-mb-3 pl-3"><Badge>{label}</Badge></div>
        {/* Shared form chrome for text inputs. */}
        <div className="rounded-2xl bg-white p-4 pt-6 shadow-inner border border-neutral-300
                        focus-within:ring-2 focus-within:ring-[#7a6754]">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full bg-transparent text-[15px] !text-[#1f1a16] outline-none placeholder:text-[#c8b79f]"
          />
          <div className="mt-3 border-t border-dashed border-neutral-300" />
        </div>
      </div>
    </label>
  );
}
