import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PiMapPinBold,
  PiPhoneBold,
} from "react-icons/pi";

const quickLinks = [
  { label: "Home", href: "/pages/Home" },
  { label: "Availability", href: "/pages/Availability" },
  { label: "Features & Amenities", href: "/pages/Features" },
  { label: "Maintenance Request", href: "/pages/Maintenance" },
  { label: "Rental Application", href: "/pages/Apply" },
  { label: "Contact", href: "/pages/Contact" },
];

const visitingHours = [
  { label: "Mon – Thu", value: "9:00 am – 5:00 pm" },
  { label: "Fri", value: "9:00 am – 3:00 pm" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-stone-900 bg-neutral-950 text-stone-200">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-black"
        aria-hidden
      />

      {/* Fading Color */}
      <div
        className="pointer-events-none absolute top-[-8rem] left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-[999px] bg-slate-400/10 blur-3xl"
        aria-hidden
      />

      {/* Leasing Office Section */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 lg:grid-cols-4 sm:text-left">
            <div className="space-y-6">
              <div className="space-y-2 border-white/10 text-sm text-stone-300 md:border-l md:pl-4">
                <p className="font-semibold uppercase tracking-[0.25em] text-white">
                  Leasing Office
                </p>
                <p>17427 Bridge Hill Ct STE C</p>
                <p>Tampa, FL 33647</p>

                <Link href="/pages/Home" className="inline-flex items-center">
                  <Image
                    src="/images/TampaPalmsLogo.png"
                    alt="Tampa Palms Professional Center Logo"
                    width={120}
                    height={60}
                    className="h-auto w-48 md:w-56"
                  />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Quick Links
              </h3>
              <nav className="mt-6 grid justify-items-center gap-3 text-sm text-center sm:justify-items-start sm:text-left">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:font-bold">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Visiting Hours
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-stone-300">
                {visitingHours.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-6">
                    <span className="font-medium text-white">{item.label}</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-stone-300">
                Walk-ins are welcome during visiting hours. To view available suites after hours, please
                contact our leasing team.
              </p>
            </div>

            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Connect With Us
              </h3>
              <div className="mt-6 flex w-full flex-col items-center gap-4 text-sm text-stone-300 sm:items-start">
                <a
                  href="tel:8138767697"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white sm:justify-start"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300/20 text-white">
                    <PiPhoneBold aria-hidden="true" className="text-xl" />
                  </span>
                  <span className="flex-1 text-center font-medium text-white sm:flex-none sm:text-left">
                    (813) 876-7697
                    <span className="block text-xs font-normal text-stone-300">
                      Call our leasing specialists
                    </span>
                  </span>
                </a>
                <a
                  href="https://maps.google.com/?q=17427+Bridge+Hill+Ct+STE+C,+Tampa,+FL+33647"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white sm:justify-start"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300/20 text-white">
                    <PiMapPinBold aria-hidden="true" className="text-xl" />
                  </span>
                  <span className="flex-1 text-center font-medium text-white sm:flex-none sm:text-left">
                    Get Directions
                    <span className="block text-xs font-normal text-stone-300">
                      Open in Google Maps
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-white/10 bg-black/50 py-6 text-sm text-stone-400">
        <div className="container mx-auto flex items-center justify-center text-center">
          <p className="mx-auto">
            &copy; {currentYear} Tampa Palms Professional Center. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
