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
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-900/5">
        {images.length ? (
          <Image
            src={images[activeImageIndex]?.src ?? ""}
            alt={images[activeImageIndex]?.alt ?? suiteLabel ?? "Suite image"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Image coming soon
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent px-6 pb-5 pt-12">
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
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onSelectImage(index)}
              className={`relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border transition ${
                index === activeImageIndex
                  ? "border-slate-900 shadow-md shadow-slate-900/25"
                  : "border-slate-200 hover:border-slate-300"
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

