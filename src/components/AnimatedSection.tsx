"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in seconds, applied to the reveal transition. */
  delay?: number;
}

/**
 * Scroll-triggered reveal.
 *
 * The hidden state lives in CSS and only applies when the bootstrap script has
 * confirmed JavaScript is available (`html.js-enhanced`). Server-rendered markup
 * therefore contains fully visible content: crawlers and visitors without
 * JavaScript see everything, and `prefers-reduced-motion` switches the effect
 * off in CSS without shipping extra JavaScript.
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Also reveal anything already scrolled past, so jumping straight to a
        // deep anchor (or the end of the page) never leaves a hidden section
        // above the reader.
        const shouldReveal = entries.some(
          (entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0
        );
        if (shouldReveal) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(className, revealed && "is-revealed")}
    >
      {children}
    </div>
  );
}
