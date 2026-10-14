"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin reading-progress bar. Purely decorative, so it is hidden from assistive
 * technology; the scale transform is driven by framer-motion's rAF loop rather
 * than a hand-written scroll handler.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-primary via-primary-light to-accent"
    />
  );
}
