/**
 * Aperçu stylisé de l'espace adhérent DriveAsso (suivi de dossier d'inscription).
 * Données fictives neutres. Aucune donnée réelle d'adhérent.
 */
import Image from "next/image";
import { Check, Clock, CreditCard, Sparkles } from "lucide-react";

const documents = [
  { label: "Fiche d'inscription", statut: "Validée", ok: true },
  { label: "Règlement intérieur", statut: "Validé", ok: true },
  { label: "Photo d'identité", statut: "Validée", ok: true },
  { label: "Certificat médical", statut: "À fournir", ok: false },
];

export function EspaceAdherentMock() {
  return (
    <div className="bg-paper-2 text-ink">
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3 sm:px-5">
        <div>
          <div className="font-display text-sm font-bold text-ink-900">
            Mon inscription
          </div>
          <div className="text-[10px] text-smoke">Saison 2025 / 2026</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative block h-7 w-7 overflow-hidden rounded-full ring-1 ring-black/5">
            <Image
              src="/images/avatar-demo.png"
              alt=""
              fill
              sizes="28px"
              className="object-cover object-[50%_30%]"
            />
          </span>
          <span className="text-[11px] font-semibold text-ink-800">
            Lucas M.
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {/* Message adaptatif */}
        <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-gold-soft p-3">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-gold-600" />
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-ink-900">
              Inscription presque terminée
            </div>
            <div className="mt-0.5 text-[10px] text-smoke">
              Il ne reste que votre certificat médical à fournir.
            </div>
          </div>
        </div>

        {/* Progression */}
        <div className="mt-3 rounded-xl border border-line bg-white p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-ink-800">
              Progression du dossier
            </span>
            <span className="font-display font-bold text-ink-900">
              3/4 documents
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist">
            <div
              className="h-full rounded-full"
              style={{
                width: "75%",
                background: "linear-gradient(90deg,#d4a017,#b8860f)",
              }}
            />
          </div>
        </div>

        {/* Documents */}
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {documents.map((d) => (
            <div
              key={d.label}
              className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2"
            >
              <span className="text-[11px] font-medium text-ink-900">
                {d.label}
              </span>
              {d.ok ? (
                <span className="flex items-center gap-1 rounded-full bg-[#22c55e]/12 px-2 py-0.5 text-[9px] font-semibold text-[#15803d]">
                  <Check size={10} strokeWidth={3} />
                  {d.statut}
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-gold-soft px-2 py-0.5 text-[9px] font-semibold text-gold-600">
                  <Clock size={10} />
                  {d.statut}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Paiement */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-white p-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-ink-900">
            <CreditCard size={14} className="text-gold-600" />
            Paiement
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#22c55e]/12 px-2.5 py-1 text-[10px] font-semibold text-[#15803d]">
            <Check size={11} strokeWidth={3} />
            Confirmé
          </span>
        </div>
      </div>
    </div>
  );
}
