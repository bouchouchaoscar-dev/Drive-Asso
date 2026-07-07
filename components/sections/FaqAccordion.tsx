"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type FaqItem = { q: string; a: string };

/**
 * Accordéon FAQ — pattern accessible (h3 > button + région repliable).
 * Chaque question s'ouvre/se ferme indépendamment. Animation douce
 * (grid-rows 0fr→1fr) alignée sur l'easing premium du reste du site.
 */
export function FaqAccordion({
  items,
  idPrefix,
}: {
  items: FaqItem[];
  idPrefix: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      data-reveal
      className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const btnId = `${idPrefix}-btn-${i}`;
        return (
          <div
            key={item.q}
            className={cn(i > 0 && "border-t border-line")}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-paper-2 sm:px-6"
              >
                <span className="font-display text-[15px] font-bold leading-snug text-ink-900 sm:text-base">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen && "rotate-45"
                  )}
                >
                  <Plus size={16} strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-smoke sm:px-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
