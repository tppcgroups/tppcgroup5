import Image from "next/image";
import type { Suite } from "./type";

type SuiteGalleryProps = {
  images: Suite["images"];
  activeImageIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
  suiteLabel?: string;
};

export function SuiteGallery({
  images,
  activeImageIndex,
  onPrev,
  onNext,
  onSelectImage,
  suiteLabel,
}: SuiteGalleryProps) {
  // Carousel showing the selected suite imagery alongside thumbnail navigation.
  return (
    <div className="flex h-full min-h-[480px] flex-col gap-6 rounded-3xl border border-[#e1d9cf] bg-white/95 p-6 shadow-lg shadow-[#1f1a16]/10">
      {/* Primary image viewport with next/prev controls. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e1d9cf] bg-[#1f1a16]/5">
        {images.length ? (
          <Image
            src={images[activeImageIndex]?.src ?? null}
            alt={images[activeImageIndex]?.alt ?? suiteLabel ?? "Suite image"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#a49382]">
            Image coming soon
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#1f1a16]/80 via-[#1f1a16]/30 to-transparent px-6 pb-5 pt-12">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-full border border-white/50 bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/40"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full border border-white/50 bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Thumbnail strip for quickly swapping images. */}
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onSelectImage(index)}
              className={`relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border transition ${
                index === activeImageIndex
                  ? "border-[#4a4034] shadow-md shadow-[#1f1a16]/25"
                  : "border-[#e1d9cf] hover:border-[#d4c7b7]"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
