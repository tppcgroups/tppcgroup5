import React from 'react'
import Image from "next/image";

type ImageType = {
    src: string;
    alt: string;
}

type BuildingGalleryProps = {
  images: ImageType[];
  activeImageIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
  suiteLabel?: string;
};

export function BuildingPhotos({images, activeImageIndex, onPrev, onNext, onSelectImage, suiteLabel}: BuildingGalleryProps){

  // Variables and logic for thumbnail wrapping
  const imageIndices = [];
  const numThumbnails = 4;
  const totalImages = images.length;

  for (let i = 0; i < numThumbnails; i++) {
    const index = (activeImageIndex + i) % totalImages;
    imageIndices.push(index);
  }

  return (
    <section className="flex h-full min-h-[520px] flex-col rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-900/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Gallery
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {suiteLabel ?? "Current suite"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Browse the latest imagery for this selection.
          </p>
        </div>
        {images.length > 1 && (
          <div className="hidden text-xs font-medium uppercase tracking-[0.3em] text-slate-400 sm:block">
            {activeImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      <div className="relative mt-6 flex-1 overflow-hidden rounded-3xl border border-slate-100 bg-slate-900/5">
        {images.length ? (
          <Image
            src={images[activeImageIndex]?.src ?? null}
            alt={images[activeImageIndex]?.alt ?? suiteLabel ?? "Suite image"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Image coming soon
          </div>
        )}

        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
        )}

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 pb-6 pt-10">
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
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {imageIndices.map((index, i) => (
            <button
              key={images[index].src}
              type="button"
              onClick={() => onSelectImage(index)}
              className={`relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border transition ${
                i === 0
                  ? "border-slate-900 shadow-md shadow-slate-900/25"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default BuildingPhotos
