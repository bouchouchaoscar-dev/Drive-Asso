import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { COMPARATIF } from "@/lib/content";
import { Check, Minus } from "lucide-react";

export function Comparatif() {
  return (
    <Section id="comparatif" tone="paper">
      <SectionHeading
        align="center"
        eyebrow="La différence DriveAsso"
        title="Une plateforme qui vous appartient vraiment."
      />

      {/* ---- Version mobile : une carte par critère (bordures alignées) ---- */}
      <div className="mt-10 space-y-3 sm:hidden">
        {COMPARATIF.rows.map((row, i) => (
          <div
            key={row.axis}
            data-reveal
            data-reveal-delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            className="rounded-2xl border border-line bg-white p-4 shadow-sm"
          >
            <div className="font-display text-sm font-bold text-ink-900">
              {row.axis}
            </div>
            <div className="mt-3 space-y-3">
              <div className="flex gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-600">
                  <Check size={13} strokeWidth={3} />
                </span>
                <div>
                  <div className="font-display text-[10px] font-bold uppercase tracking-wide text-gold-600">
                    DriveAsso
                  </div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-ink-800">
                    {row.driveasso}
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 border-t border-line pt-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mist text-smoke">
                  <Minus size={13} strokeWidth={3} />
                </span>
                <div>
                  <div className="font-display text-[10px] font-bold uppercase tracking-wide text-smoke">
                    Plateforme mutualisée
                  </div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-smoke">
                    {row.autres}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Version desktop : tableau (inchangé) ---- */}
      <div
        data-reveal
        className="mt-14 hidden overflow-hidden rounded-2xl border border-line shadow-sm sm:block"
      >
        {/* En-têtes */}
        <div className="grid grid-cols-[1.2fr_1.4fr_1.4fr] bg-white text-sm">
          <div className="px-4 py-4 sm:px-6" />
          <div className="flex items-center justify-center border-l border-line px-4 py-4 sm:px-6">
            <Image
              src="/images/driveasso-horizontal.png"
              alt="DriveAsso"
              width={260}
              height={68}
              className="h-auto w-32 max-w-full sm:w-40"
            />
          </div>
          <div className="flex items-center justify-center border-l border-line px-4 py-4 text-center sm:px-6">
            <span className="font-display text-base font-semibold text-smoke">
              Plateforme mutualisée
            </span>
          </div>
        </div>

        {/* Lignes */}
        {COMPARATIF.rows.map((row, i) => (
          <div
            key={row.axis}
            data-reveal
            data-reveal-delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            className="grid grid-cols-[1.2fr_1.4fr_1.4fr] border-t border-line bg-white text-sm"
          >
            <div className="flex items-center px-4 py-4 font-display text-[13px] font-bold text-ink-900 sm:px-6 sm:text-sm">
              {row.axis}
            </div>
            <div className="flex items-start gap-2.5 border-l border-line px-4 py-4 sm:px-6">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-600">
                <Check size={13} strokeWidth={3} />
              </span>
              <span className="leading-relaxed text-ink-800">
                {row.driveasso}
              </span>
            </div>
            <div className="flex items-start gap-2.5 border-l border-line px-4 py-4 sm:px-6">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mist text-smoke">
                <Minus size={13} strokeWidth={3} />
              </span>
              <span className="leading-relaxed text-smoke">{row.autres}</span>
            </div>
          </div>
        ))}
      </div>

      <p
        data-reveal
        className="mx-auto mt-6 max-w-xl text-center text-sm text-smoke"
      >
        Comparatif indicatif face à une plateforme de gestion mutualisée
        générique.
      </p>
    </Section>
  );
}
