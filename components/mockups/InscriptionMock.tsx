import { Check } from "lucide-react";

/**
 * Aperçu stylisé du parcours d'inscription adhérent (vue mobile).
 * 100 % CSS, données fictives neutres.
 */

const steps = ["Infos", "Options", "Documents", "Paiement"];

const paiements = [
  { label: "Carte bancaire", sub: "1×, 2×, 3× ou 4×", active: true },
  { label: "Apple Pay / Google Pay", sub: "en un geste", active: false },
  { label: "Espèces", sub: "au club", active: false },
];

export function InscriptionMock() {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2rem] border-[6px] border-ink-900 bg-white p-4 shadow-lg">
      {/* Encoche */}
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-line" />

      {/* Stepper */}
      <div className="mb-4 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${
                  i < 3
                    ? "bg-gold text-ink-900"
                    : "bg-mist text-smoke ring-1 ring-line"
                }`}
              >
                {i < 3 ? <Check size={12} /> : i + 1}
              </span>
              <span className="text-[8px] text-smoke">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`mx-1 mb-3 h-[2px] flex-1 ${
                  i < 2 ? "bg-gold" : "bg-line"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Titre étape */}
      <div className="mb-3 font-display text-sm font-bold text-ink-900">
        Paiement
      </div>

      {/* Récap prix */}
      <div className="mb-3 rounded-xl bg-paper-2 p-3 text-[11px]">
        <div className="flex justify-between text-smoke">
          <span>Cotisation</span>
          <span className="text-ink-800">290 €</span>
        </div>
        <div className="mt-1 flex justify-between text-smoke">
          <span>Remise famille</span>
          <span className="font-semibold text-gold-600">−10 %</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-line pt-2 font-display font-bold text-ink-900">
          <span>Total</span>
          <span>261 €</span>
        </div>
      </div>

      {/* Options paiement */}
      <div className="space-y-2">
        {paiements.map((p) => (
          <div
            key={p.label}
            className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${
              p.active
                ? "border-gold bg-gold-soft"
                : "border-line bg-white"
            }`}
          >
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border-2 ${
                p.active ? "border-gold" : "border-line"
              }`}
            >
              {p.active && <span className="h-2 w-2 rounded-full bg-gold" />}
            </span>
            <div className="leading-tight">
              <div className="text-[11px] font-semibold text-ink-900">
                {p.label}
              </div>
              <div className="text-[9px] text-smoke">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton */}
      <div className="mt-3 grid h-9 place-items-center rounded-full bg-gold font-display text-[11px] font-bold text-ink-900">
        Valider et payer
      </div>
    </div>
  );
}
