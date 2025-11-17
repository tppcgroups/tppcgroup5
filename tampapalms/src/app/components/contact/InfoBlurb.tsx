// Map card that anchors the contact page and links to the full Google Maps listing.
export default function InfoBlurb() {
  const mapSrc =
    "https://www.google.com/maps?q=17427+Bridge+Hill+Court,+Suite+C,+Tampa,+FL+33647&output=embed";

  return (
    <div className="flex md:justify-center my-auto">
      {/* Glassmorphism container wrapping the embedded map. */}
      <div className="w-full max-w-md overflow-hidden rounded-xl shadow-sm border border-white/50 bg-white/10 backdrop-blur">
        <iframe
          title="Tampa Palms Professional Center Map"
          src={mapSrc}
          className="w-full h-[280px] md:h-[320px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="p-3 text-sm text-neutral-800/90">
          <a
            href="https://www.google.com/maps?q=17427+Bridge+Hill+Court,+Suite+C,+Tampa,+FL+33647"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#a49382]/50 hover:decoration-[#7a6754]"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
