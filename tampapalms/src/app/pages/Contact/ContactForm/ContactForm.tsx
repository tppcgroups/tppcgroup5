"use client";
import React from "react";
import TextField from "./TextField";
import Badge from "./Badge";

export default function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    console.log("Form submit:", Object.fromEntries(fd.entries()));
    alert("Thanks! (wire this to your API or email service)");
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-6">
        <TextField label="Name" name="name" placeholder="Jane Doe" />
        <TextField label="Email" type="email" name="email" placeholder="jane@example.com" />
        <TextField label="Subject" name="subject" placeholder="Inquiry" />
      </div>

      <div className="flex flex-col gap-6">
        <label className="block">
          <div className="relative">
            <div className="-mb-3 pl-3"><Badge>Your Message</Badge></div>
            <div className="rounded-2xl bg-neutral-200/80 p-4 pt-6 shadow-inner min-h-[300px] flex flex-col">
              <textarea
                name="message"
                placeholder="Tell us how we can help…"
                className="min-h-[220px] grow w-full resize-vertical bg-transparent outline-none text-[15px] !text-black placeholder:text-neutral-500"
              />
              <div className="mt-3 border-t border-dashed border-neutral-400" />
            </div>
          </div>
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-2xl bg-neutral-800 text-white px-6 py-3 text-base font-medium shadow-sm hover:bg-neutral-900"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
