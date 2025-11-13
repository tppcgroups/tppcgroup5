import { PiMapPinBold, PiPhoneBold } from "react-icons/pi";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";

// Call-to-action tiles for reaching the leasing team or launching maps.
export function FooterConnect() {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f0d4a6]">
        Connect With Us
      </h3>
      <div className="mt-6 flex w-full flex-col items-center gap-4 text-sm text-[#e7ded2] sm:items-start">
        <a
          href="tel:8138767697"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#fdf8f3]/15 bg-white/5 px-4 py-3 transition hover:border-[#fdf8f3]/40 sm:justify-start"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0d4a6]/20 text-white">
            <PiPhoneBold aria-hidden="true" className="text-xl" />
          </span>
          <span className="flex-1 text-center font-medium text-white sm:flex-none sm:text-left">
            (813) 876-7697
            <span className="block text-xs font-normal text-[#e7ded2]">
              Call our leasing specialists
            </span>
          </span>
        </a>
        <a
          href="https://maps.google.com/?q=17427+Bridge+Hill+Ct+STE+C,+Tampa,+FL+33647"
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#fdf8f3]/15 bg-white/5 px-4 py-3 transition hover:border-[#fdf8f3]/40 sm:justify-start"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0d4a6]/20 text-white">
            <PiMapPinBold aria-hidden="true" className="text-xl" />
          </span>
          <span className="flex-1 text-center font-medium text-white sm:flex-none sm:text-left">
            Get Directions
            <span className="block text-xs font-normal text-[#e7ded2]">
              Open in Google Maps
            </span>
          </span>
        </a>
        <div className="flex flex-row gap-2 w-full">
          <a
            href="https://www.linkedin.com/company/soarco-working/"
            target="_blank"
            rel="noreferrer"
            className="flex w-1/3 items-center justify-center gap-3 rounded-xl border border-[#fdf8f3]/15 bg-white/5 px-4 py-3 transition hover:border-[#fdf8f3]/40 sm:justify-start"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0d4a6]/20 text-white">
            <FaLinkedinIn className="text-xl"/>
            </span>
          </a>
          <a
            href="https://www.facebook.com/TampaPalmsProfessionalCenter"
            target="_blank"
            rel="noreferrer"
            className="flex w-1/3 items-center justify-center gap-3 rounded-xl border border-[#fdf8f3]/15 bg-white/5 px-4 py-3 transition hover:border-[#fdf8f3]/40 sm:justify-start"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0d4a6]/20 text-white">
              <FaFacebookF className="text-xl"/>
            </span>
          </a>
          <a
            href="https://www.instagram.com/tampapalmsprofessionalcenter/"
            target="_blank"
            rel="noreferrer"
            className="flex w-1/3 items-center justify-center gap-3 rounded-xl border border-[#fdf8f3]/15 bg-white/5 px-4 py-3 transition hover:border-[#fdf8f3]/40 sm:justify-start"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0d4a6]/20 text-white">
            <FaInstagram className="text-2xl"/>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterConnect;
