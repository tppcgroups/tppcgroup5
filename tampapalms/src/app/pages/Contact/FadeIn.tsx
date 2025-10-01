"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;      // ms
  y?: number;          // translateY distance in px
  duration?: number;   // ms
};

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
  duration = 700,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShow(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect(); // fire once
        }
      },
      // Trigger a hair early so the motion starts as the section touches view
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={cx(
        "transform-gpu will-change-transform transition-all ease-out",
        show ? "opacity-100 translate-y-0" : `opacity-0 translate-y-[${y}px]`,
        className
      )}
    >
      {children}
    </div>
  );
}
