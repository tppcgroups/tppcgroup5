import type { FooterLink } from "./FooterQuickLinks";
import { FooterQuickLinks } from "./FooterQuickLinks";
import FooterBottom from "./FooterBottom";
import FooterConnect from "./FooterConnect";
import FooterLeasingOffice from "./FooterLeasingOffice";
import type { VisitingHour } from "./FooterVisitingHours";
import { FooterVisitingHours } from "./FooterVisitingHours";

const quickLinks: FooterLink[] = [
  { label: "Home", href: "/pages/Home" },
  { label: "Availability", href: "/pages/Availability" },
  { label: "Features & Amenities", href: "/pages/Features" },
  { label: "Maintenance Request", href: "/pages/Maintenance" },
  { label: "Rental Application", href: "/pages/Apply" },
  { label: "Contact", href: "/pages/Contact" },
];

const visitingHours: VisitingHour[] = [
  { label: "Mon – Thu", value: "9:00 am – 5:00 pm" },
  { label: "Fri", value: "9:00 am – 3:00 pm" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Dark-themed footer ties together leasing info, navigation, and CTAs.
    <footer className="relative overflow-hidden border-t border-[#3d342a] bg-[#1f1a16] text-[#fdf8f3]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1b1713] via-[#110f0c] to-[#120f0c]"
        aria-hidden
      />

      {/* Fading Color */}
      <div
        className="pointer-events-none absolute top-[-8rem] left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-[999px] bg-[#7a6754]/25 blur-3xl"
        aria-hidden
      />

      {/* Leasing Office Section */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 lg:grid-cols-4 sm:text-left">
            <FooterLeasingOffice />
            <FooterQuickLinks links={quickLinks} />
            <FooterVisitingHours visitingHours={visitingHours} />
            <FooterConnect />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <FooterBottom year={currentYear} />
    </footer>
  );
}

export default Footer;
