"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation, in degrees, at the card corners. */
  maxTilt?: number;
  /** Moving specular highlight; useful on glassy panels, off for portraits. */
  glare?: boolean;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  targetX: number;
  targetY: number;
  glareX: number;
  glareY: number;
  active: boolean;
}

/**
 * Pointer-driven CSS-3D tilt.
 *
 * The transform is written directly to the card's inner element inside one
 * requestAnimationFrame loop, so pointer movement never triggers a React
 * render. Touch and reduced-motion users get the untouched, static card;
 * keyboard users keep their focus outline because the wrapper is not a control.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 5,
  glare = true,
}: TiltCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const stateRef = useRef<TiltState>({
    rotateX: 0,
    rotateY: 0,
    targetX: 0,
    targetY: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  });

  useEffect(() => {
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const step = () => {
    frameRef.current = 0;
    const inner = innerRef.current;
    if (!inner) return;

    const state = stateRef.current;
    state.rotateX += (state.targetX - state.rotateX) * 0.14;
    state.rotateY += (state.targetY - state.rotateY) * 0.14;

    const settled =
      Math.abs(state.targetX - state.rotateX) < 0.01 &&
      Math.abs(state.targetY - state.rotateY) < 0.01;

    if (settled) {
      state.rotateX = state.targetX;
      state.rotateY = state.targetY;
    }

    inner.style.transform = `rotateX(${state.rotateX.toFixed(
      3
    )}deg) rotateY(${state.rotateY.toFixed(3)}deg)`;
    inner.style.setProperty("--tilt-gx", `${state.glareX.toFixed(1)}%`);
    inner.style.setProperty("--tilt-gy", `${state.glareY.toFixed(1)}%`);

    if (!settled || state.active) {
      frameRef.current = window.requestAnimationFrame(step);
      return;
    }

    inner.style.transform = "";
    inner.style.removeProperty("--tilt-gx");
    inner.style.removeProperty("--tilt-gy");
    inner.style.willChange = "";
  };

  const schedule = () => {
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(step);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    const rect = root.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

    const state = stateRef.current;
    state.targetY = (x - 0.5) * 2 * maxTilt;
    state.targetX = (0.5 - y) * 2 * maxTilt;
    state.glareX = x * 100;
    state.glareY = y * 100;
    state.active = true;
    inner.style.willChange = "transform";
    schedule();
  };

  const handlePointerLeave = () => {
    const state = stateRef.current;
    state.active = false;
    state.targetX = 0;
    state.targetY = 0;
    schedule();
  };

  return (
    <div
      ref={rootRef}
      className={cn("tilt-root min-w-0", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={innerRef} className="tilt-inner relative h-full">
        {children}
        {glare && <span aria-hidden="true" className="tilt-glare" />}
      </div>
    </div>
  );
}
