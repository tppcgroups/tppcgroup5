import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

type CampusGroundMapProps = {
  imageSrc?: string;
};

export function CampusGroundMap({
  imageSrc = "/images/Floor-plans/SiteplanEast&West.png",
}: CampusGroundMapProps) {

  const router = useRouter();
  const [naturalWidth, setNaturalWidth] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(1);
  const [scale, setScale] = useState(0.85);
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

  const handleAreaClick = (
    event: React.MouseEvent<SVGPolygonElement>,
    path: string
  ) => {
    // Prevent default navigation 
    event.preventDefault();

    // Check if the user was dragging right before the click
    // This is a common pattern to prevent clicks on drag events
    // Since isDragging is reset on pointerUp, checking pointerId is a quick proxy
    if (pointerIdRef.current !== null) {
      // If a pointer ID is still set, it might have been a drag
      return;
    }

    // Navigate using the Next.js router
    router.push(path);
  }

  // Define building data including corrdinates and routes
  const buildingAreas = [
    {
      id: "building_5",
      coords: "2784,2081,2978,2135,2879,2451,2690,2401",
      route: '/pages/Contact'
    },
  ];

  const areaCoordsToSvgPoints = (coords: string): string => {
    return coords.replace(/,/g, ' ');
  }

  return (
    <section className="flex w-full flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-100 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Campus Overview
        </p>
      </div>

      <div
        className="relative mx-auto w-full overflow-hidden bg-slate-50"
        style={{
          aspectRatio,
          width: "100%",
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
            <div className="relative h-full w-full">
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
                    setNaturalHeight(naturalHeight);
                    setNaturalWidth(naturalWidth);
                  }
                }}
              />
              <svg
                className="absolute inset-0"
                viewBox={`0 0 ${naturalWidth} ${naturalHeight}`} // need to get these variables here
                style={{
                  objectFit: "contain",
                  height: "100%",
                  width: "100%",
                }}
              >
                {buildingAreas.map((area) => (
                  <polygon
                    key={area.id}
                    points={areaCoordsToSvgPoints(area.coords)}
                    onClick={(e) => handleAreaClick(e, area.route)}
                    className="fill-blue-500/30 stroke-blue-700/80 stroke-[10] transition-all duration-200 pointer-events-auto cursor-pointer hover:fill-blue-400/50"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="ml-auto pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-slate-700 shadow-md shadow-slate-900/10">
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
                setScale(0.85);
                setPosition({ x: 0, y: 0 });
              }}
              className="ml-1 rounded-full border border-slate-200 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-5">
          <a
            href="/images/Floor-plans/SiteplanEast&West.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow shadow-slate-900/30 transition hover:bg-slate-800"
          >
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}

export default CampusGroundMap;
