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
            <div className="flex min-h-[300px] flex-col rounded-2xl border border-slate-200 bg-white/90 p-5 pt-7 shadow-sm shadow-slate-900/5">
              <textarea
                name="message"
                placeholder="Tell us how we can help…"
                className="min-h-[220px] w-full grow resize-vertical bg-transparent text-[15px] !text-slate-900 outline-none placeholder:text-slate-400"
              />
              <div className="mt-4 border-t border-dashed border-slate-200" />
            </div>
          </div>
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
