"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given sections currently occupies the middle band of the
 * viewport, so navigation can highlight the section being read. The observer is
 * disconnected on unmount and uses a narrow root margin, which keeps it cheap.
 *
 * @param ids Section element ids to watch. Pass a module-level constant so the
 * effect is not re-created on every render.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
