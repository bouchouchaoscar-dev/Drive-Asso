/**
 * Aperçu stylisé d'une fiche adhérent dans l'espace administrateur DriveAsso.
 * Données fictives neutres. Aucune donnée réelle d'adhérent.
 */
import Image from "next/image";
import { Mail, CreditCard, Ban } from "lucide-react";

const infos = [
  { label: "Date de naissance", value: "14/03/1998" },
  { label: "Téléphone", value: "06 12 34 56 78" },
  { label: "Email", value: "lucas.martin@email.fr" },
  { label: "Foyer", value: "1 membre rattaché" },
];

const docs = [
  { label: "Fiche d'inscription", ok: true },
  { label: "Règlement intérieur", ok: true },
  { label: "Photo d'identité", ok: true },
  { label: "Certificat médical", ok: true },
];

export function FicheAdherentMock() {
  return (
    <div className="bg-paper-2 text-ink">
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-ink-900">
          <span className="text-smoke">←</span> Fiche adhérent
        </div>
        <span className="rounded-full bg-[#22c55e]/12 px-2.5 py-1 text-[10px] font-semibold text-[#15803d]">
          Dossier validé
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* Identité */}
        <div className="flex items-center gap-3">
          {/* Photo de profil de l'adhérent, cadrée dans le cercle */}
          <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
            <Image
              src="/images/avatar-demo.png"
              alt="Photo de profil adhérent"
              fill
              sizes="56px"
              className="object-cover object-[50%_30%]"
            />
          </span>
          <div className="min-w-0">
            <div className="font-display text-base font-extrabold text-ink-900">
              Lucas Martin
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-smoke">
              <span className="rounded-full bg-gold-soft px-2 py-0.5 font-semibold text-ink-800">
                Adulte
              </span>
              <span>Formule Adulte · Saison 2025/2026</span>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {infos.map((i) => (
            <div
              key={i.label}
              className="rounded-xl border border-line bg-white p-2.5"
            >
              <div className="text-[9px] font-medium uppercase tracking-wide text-smoke">
                {i.label}
              </div>
              <div className="mt-0.5 truncate text-[11px] font-semibold text-ink-900">
                {i.value}
              </div>
            </div>
          ))}
        </div>

        {/* Documents */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-ink-800">
              Documents
            </span>
            <span className="text-[10px] font-semibold text-gold-600">4/4</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {docs.map((d) => (
              <div
                key={d.label}
                className="rounded-lg border border-line bg-white p-2"
              >
                <div className="relative mx-auto h-9 w-7 rounded-[3px] border border-line bg-paper-2">
                  <span className="absolute left-1 right-1 top-1.5 h-[2px] rounded bg-line" />
                  <span className="absolute left-1 right-2 top-3 h-[2px] rounded bg-line" />
                  <span className="absolute left-1 right-1.5 top-[18px] h-[2px] rounded bg-line" />
                  <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[#22c55e] text-white">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="mt-1.5 text-center text-[8px] font-medium leading-tight text-smoke">
                  {d.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paiement */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-white p-3">
          <div className="leading-tight">
            <div className="text-[11px] font-semibold text-ink-900">
              Paiement
            </div>
            <div className="text-[9px] text-smoke">Carte · 3 échéances</div>
          </div>
          <span className="rounded-full bg-[#22c55e]/12 px-2.5 py-1 text-[10px] font-semibold text-[#15803d]">
            À jour
          </span>
        </div>

        {/* Actions pilotables depuis la fiche (illustratif) */}
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[10px] font-semibold text-ink-800">
            <Mail size={12} className="text-gold-600" />
            Envoyer un email
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[10px] font-semibold text-ink-800">
            <CreditCard size={12} className="text-gold-600" />
            Gérer le paiement
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#ef4444]/25 bg-[#ef4444]/5 px-2.5 py-1.5 text-[10px] font-semibold text-[#dc2626]">
            <Ban size={12} />
            Arrêter l'inscription
          </div>
        </div>
      </div>
    </div>
  );
}
