"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Topology links, drawn once as static data. */
const LINKS = [
  "M60 120 L200 90",
  "M200 90 L340 150",
  "M340 150 L500 96",
  "M500 96 L660 140",
  "M60 120 L140 300",
  "M140 300 L280 360",
  "M280 360 L420 300",
  "M420 300 L560 370",
  "M560 370 L700 320",
  "M340 150 L420 300",
  "M200 90 L280 360",
];

/** Links that carry an animated packet trace. */
const TRACED_LINKS = [0, 6, 9];

const NODES = [
  { cx: 60, cy: 120, r: 4, pulse: false },
  { cx: 200, cy: 90, r: 5, pulse: true },
  { cx: 340, cy: 150, r: 4, pulse: false },
  { cx: 500, cy: 96, r: 4, pulse: false },
  { cx: 660, cy: 140, r: 5, pulse: true },
  { cx: 140, cy: 300, r: 4, pulse: false },
  { cx: 280, cy: 360, r: 4, pulse: false },
  { cx: 420, cy: 300, r: 5, pulse: true },
  { cx: 560, cy: 370, r: 4, pulse: false },
  { cx: 700, cy: 320, r: 4, pulse: false },
];

/**
 * Decorative network topology used behind the hero.
 *
 * It is a plain SVG with CSS-driven pulses rather than a WebGL scene: the
 * network-infrastructure subject is conveyed at a fraction of the weight, stays
 * legible on low-powered devices, and needs no canvas fallback. Pointer
 * movement only shifts the transform of this single layer, so no React state
 * updates occur while moving the mouse.
 */
export default function NetworkBackdrop({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || reduceMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      wrapper.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      frame =
        Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1
          ? window.requestAnimationFrame(render)
          : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      targetX = x * -26;
      targetY = y * -18;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={style}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 will-change-transform [mask-image:radial-gradient(ellipse_75%_70%_at_62%_38%,#000_20%,transparent_78%)]",
        className
      )}
    >
      <svg
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g stroke="rgba(147,164,198,0.22)" strokeWidth="1">
          {LINKS.map((d) => (
            <path key={d} d={d} fill="none" />
          ))}
        </g>

        <g
          stroke="var(--accent)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        >
          {TRACED_LINKS.map((index, order) => (
            <path
              key={index}
              d={LINKS[index]}
              strokeDasharray="14 320"
              className="packet-trace"
              style={{ animationDelay: `${order * 1.6}s` }}
            />
          ))}
        </g>

        <g>
          {NODES.map((node) => (
            <g key={`${node.cx}-${node.cy}`}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="var(--primary-light)"
                className={node.pulse ? "node-pulse" : undefined}
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 3.4}
                fill="none"
                stroke="rgba(123,167,255,0.28)"
                strokeWidth="0.8"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
