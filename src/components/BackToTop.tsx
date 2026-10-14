"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/LocaleProvider";

export default function BackToTop() {
  const { messages } = useI18n();
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const evaluate = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 1.25);
    };
    const onScroll = () => {
      // Coalesce scroll events into one state update per animation frame.
      if (frame) return;
      frame = window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: reduceMotion ? "auto" : "smooth",
            });
          }}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-border-strong bg-card/85 text-muted-foreground shadow-panel backdrop-blur-md transition-colors hover:border-primary/50 hover:text-foreground sm:bottom-8 sm:right-8"
          aria-label={messages.a11y.backToTop}
        >
          <ArrowUp
            size={17}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
