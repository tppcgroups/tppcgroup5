import { HiOutlineArrowSmDown } from "react-icons/hi";

// Hero banner for the contact page with background imagery and headline copy.
export default function ContactHeader() {
  return (
    <header className="relative">
      <div className="relative h-[260px] md:h-[420px]">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              'url("/images/Bldg6-006.jpg")',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40" />
        {/* Centered greeting layered above the image and gradient. */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="bg-black/10 backdrop-blur-[2px] p-6 rounded-2xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow">
              Contact
            </h1>
            <div className="flex mt-4 h-1 w-36 rounded-full bg-white/50 mx-auto" />
            <p className="mt-3 max-w-2xl text-white/85">
              We’re here to help, reach out and we’ll get back to you quickly.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <a
            href="#contact-details"
            className="inline-flex h-10 w-10 items-center justify-center text-white"
            aria-label="Scroll to contact details"
          >
            <HiOutlineArrowSmDown className="h-8 w-8 animate-bounce drop-shadow-lg" />
          </a>
        </div>
      </div>
    </header>
  );
}
