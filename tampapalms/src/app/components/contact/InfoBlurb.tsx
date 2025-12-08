// Map card that anchors the contact page and links to the full Google Maps listing.
export default function InfoBlurb() {
  const mapSrc =
    "https://www.google.com/maps?q=17427+Bridge+Hill+Ct+STE+C,+Tampa,+FL+33647&output=embed";
  const mapLink =
    "https://www.google.com/maps?q=17427+Bridge+Hill+Ct+STE+C,+Tampa,+FL+33647";

  return (
    <div className="flex md:justify-center my-auto">
      {/* Glassmorphism container wrapping the embedded map. */}
      <div className="w-full max-w-xl md:max-w-2xl overflow-hidden rounded-xl shadow-sm border border-white/50 bg-white/10 backdrop-blur">
        <iframe
          title="Tampa Palms Professional Center Map"
          src={mapSrc}
          className="w-full h-[340px] md:h-[460px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="p-3 text-sm text-neutral-800/90">
          <a
            href={mapLink}
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
