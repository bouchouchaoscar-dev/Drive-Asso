"use client";

import { useEffect } from "react";

/**
 * Active les animations d'apparition au scroll.
 * Observe tous les [data-reveal] et ajoute .is-visible quand ils entrent dans le viewport.
 * Composant client unique, monté une fois — les sections restent des Server Components.
 * Respecte prefers-reduced-motion (le CSS force déjà l'état visible).
 */
export function RevealInit() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
