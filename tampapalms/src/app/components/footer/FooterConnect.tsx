import { PiMapPinBold, PiPhoneBold } from "react-icons/pi";

// Call-to-action tiles for reaching the leasing team or launching maps.
export function FooterConnect() {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Connect With Us</h3>
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
            <span className="block text-xs font-normal text-stone-300">Call our leasing specialists</span>
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
            <span className="block text-xs font-normal text-stone-300">Open in Google Maps</span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default FooterConnect;
