"use client";
import React from "react";
import TextField from "./TextField";
import Badge from "./Badge";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  // Tracks async submission state and feedback messaging.
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot check catches simple bots without blocking real users.
    if ((fd.get("company") as string)?.trim()) {
      setStatus("success");
      setMessage("Thanks! We’ll be in touch soon.");
      form.reset();
      return;
    }

    setStatus("loading");
    setMessage("");

    // Submit the form fields to the contact API route.
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setMessage("Thanks! We’ve received your message and will reply soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or email admin@tampapalmscenter.com.");
    }
  }

  const disabled = status === "loading";

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-6">
        <TextField label="Name" name="name" placeholder="Jane Doe" />
        <TextField label="Email" type="email" name="email" placeholder="jane@example.com" />
        <TextField label="Phone Number" type="tel" name="phone-number" placeholder="(123) 456-7890" />
        <TextField label="Subject" name="subject" placeholder="Inquiry" />
        <label className="block">
          <div className="relative">
            <div className="rounded-2xl bg-white p-4 pt-7 shadow-inner border border-neutral-300 focus-within:ring-2 focus-within:ring-[#7a6754] relative">
              <span className="pointer-events-none absolute -top-3 left-4">
                <Badge>Interest</Badge>
              </span>
              <select
                name="interest"
                className="w-full bg-transparent text-[15px] !text-[#1f1a16] outline-none appearance-none leading-6 py-1 pr-9"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Private office">Private office</option>
                <option value="Executive suites">Executive suites</option>
                <option value="SOAR">SOAR</option>
                <option value="SOAR">Meeting Room Rental</option>
                <option value="SOAR">Schedule a Tour</option>
                <option value="SOAR">Contact Leasing Team</option>
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs bg-white px-1 rounded"
              >
                ▼
              </span>
              <div className="mt-3 border-t border-dashed border-neutral-300" />
            </div>
          </div>
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <label className="block">
          <div className="relative">
            <div className="-mb-3 pl-3"><Badge>Your Message</Badge></div>
            <div className="rounded-2xl bg-white p-4 pt-6 shadow-inner border border-neutral-300
                            focus-within:ring-2 focus-within:ring-[#7a6754] min-h-[500px] flex flex-col">
              <textarea
                name="message"
                placeholder="Tell us how we can help…"
                className="min-h-[340px] grow w-full resize-vertical bg-transparent outline-none text-[15px] !text-black placeholder:text-neutral-500"
                required
              />
              <div className="mt-3 border-t border-dashed border-neutral-300" />
            </div>
          </div>
        </label>

        <div className="flex items-start gap-3 text-sm text-neutral-700">
          <input id="consent" name="consent" type="checkbox" required className="mt-1" />
          <label htmlFor="consent">
            I consent to be contacted about my inquiry and agree to the{" "}
            <a href="/privacy" className="underline decoration-[#a49382]/60 hover:decoration-[#4a4034]">Privacy Policy</a>.
          </label>
          {/* Hidden field serves as a spam trap for automated submissions. */}
          <input type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Live submission feedback to keep ADA screen readers informed. */}
          <p role="status" aria-live="polite" className={`text-sm ${status === "error" ? "text-red-600" : "text-neutral-600"}`}>
            {status === "loading" ? "Sending…" : message}
          </p>
          <button
            type="submit"
            disabled={disabled}
            className={`rounded-full px-6 py-3 text-base font-medium text-white shadow-md
                        bg-gradient-to-b from-[#7a6754] to-[#5a4b3c] hover:from-[#5a4b3c] hover:to-[#3a3127]
                        focus:outline-none focus:ring-2 focus:ring-[#7a6754]
                        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {disabled ? "Sending…" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
