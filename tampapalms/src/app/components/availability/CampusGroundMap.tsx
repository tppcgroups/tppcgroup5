import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";

type CampusGroundMapProps = {
  imageSrc?: string;
};

export function CampusGroundMap({
  imageSrc = "/images/Floor-plans/SiteplanEast&West.png",
}: CampusGroundMapProps) {
  const [scale, setScale] = useState(1.35);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const dragOffset = useRef({ x: 0, y: 0 });
  const pointerIdRef = useRef<number | null>(null);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const adjustScale = useCallback((direction: "in" | "out") => {
    setScale((prev) =>
      clamp(prev + (direction === "in" ? 0.25 : -0.25), 1, 3)
    );
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerIdRef.current = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragOffset.current = {
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      };
      setIsDragging(true);
    },
    [position.x, position.y]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      });
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== null) {
        event.currentTarget.releasePointerCapture(pointerIdRef.current);
      }
      pointerIdRef.current = null;
      setIsDragging(false);
    },
    []
  );

  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setScale(1.35);
    setPosition({ x: 0, y: 0 });
  }, []);

  const interactionHandlers = useMemo(
    () => ({
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
      onDoubleClick: handleDoubleClick,
    }),
    [
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      handleDoubleClick,
    ]
  );

  return (
    <section className="flex h-full max-h-[520px] flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-100 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Campus Overview
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          Select a building to preview suites, then explore the map to see how everything connects.
        </h2>
      </div>

      <div
        className="relative mx-auto flex-1 overflow-hidden bg-slate-50"
        style={{
          aspectRatio,
          minHeight: "420px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <div
          className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          {...interactionHandlers}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center",
              transition: isDragging ? "none" : "transform 120ms ease-out",
            }}
          >
            <Image
              src={imageSrc}
              alt="Tampa Palms Professional Center campus site plan"
              fill
              sizes="(max-width: 1024px) 90vw, 60vw"
              className="object-contain"
              priority={false}
              draggable={false}
              onLoad={(event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget;
                if (naturalWidth && naturalHeight) {
                  setAspectRatio(naturalWidth / naturalHeight);
                }
              }}
              useMap="#image-map"
            />
            <map name="image-map">
              <area target="_blank" alt="building_5" title="building_5" href="https://github.com/jrsussner18" coords="2784,2081,2978,2135,2879,2451,2690,2401" shape="poly" />
          </map>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
          <span className="rounded-full bg-white/90 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm shadow-slate-900/10">
            Drag to explore · Double-click to reset
          </span>
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-slate-700 shadow-md shadow-slate-900/10">
            <button
              type="button"
              onClick={() => adjustScale("out")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-base font-semibold transition hover:bg-slate-100"
              aria-label="Zoom out"
            >
              –
            </button>
            <button
              type="button"
              onClick={() => adjustScale("in")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-base font-semibold transition hover:bg-slate-100"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setScale(1.35);
                setPosition({ x: 0, y: 0 });
              }}
              className="ml-1 rounded-full border border-slate-200 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-6 py-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-slate-900">
          Need a static copy?
        </p>
        <a
          href="/images/Floor-plans/TPPCSITEPLAN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow shadow-slate-900/20 transition hover:bg-slate-800"
        >
          Download the high-resolution map
        </a>
      </div>
    </section>
  );
}

export default CampusGroundMap;
