"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

type FadeInProps = PropsWithChildren<{
  delay?: number;
  className?: string;
}>;

export default function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 translate-y-8 transition-all duration-[900ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
