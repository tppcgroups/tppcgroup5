import React from "react";
import Link from "next/link";
import Image from "next/image";

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
        className="pointer-events-none absolute top-[-8rem] left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-[999px] bg-amber-400/10 blur-3xl"
        aria-hidden
      />

      {/* Leasing Office Section */}
      <div className="relative">
        <div className="container mx-auto px-6 py-16 md:px-10 lg:px-16">
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6">
              <div className="space-y-2 border-l border-white/10 pl-4 text-sm text-stone-300">
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

            {/* Quick Links Section */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Quick Links
              </h3>
              <nav className="mt-6 grid gap-3 text-sm">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className=" hover:text-amber-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Visiting Hours Section */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Visiting Hours
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-stone-300">
                {visitingHours.map((item) => (
                  <li key={item.label} className="flex justify-between gap-6">
                    <span className="font-medium text-white">{item.label}</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-stone-300">
                Walk-ins are welcome during visiting hours. To view available
                suites after hours, please contact our leasing team.
              </p>
            </div>

            {/* Connect With us Section */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Connect With Us
              </h3>
              <div className="mt-6 space-y-4 text-sm text-stone-300">
                <a
                  href="tel:8138767697"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-amber-200/40 hover:text-amber-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/20 text-amber-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.065a1.125 1.125 0 0 0-.852-1.09l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.39 12.035 12.035 0 0 1-7.04-7.04 1.125 1.125 0 0 1 .39-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L7.655 3.102a1.125 1.125 0 0 0-1.09-.852H5.5A2.25 2.25 0 0 0 3.25 4.5v2.25Z"
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-white">
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
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-amber-200/40 hover:text-amber-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/20 text-amber-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-white">
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
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:px-10 md:text-left">
          <p>&copy; {currentYear} Tampa Palms Professional Center. All rights reserved.</p>
          <p className="text-xs">
            Terms and Conditions
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;