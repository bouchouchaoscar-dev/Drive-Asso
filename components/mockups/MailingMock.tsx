import { Clock, Users, Mail } from "lucide-react";

/**
 * Aperçu stylisé de l'outil de mailing / reconquête DriveAsso :
 * listes intelligentes + campagnes planifiées + aperçu d'un modèle de mail
 * générique aux couleurs DriveAsso (anthracite + doré).
 * 100 % CSS, données fictives neutres.
 */

const segments = [
  { label: "Adhérents actuels", count: 248, active: true },
  { label: "Non-réinscrits", count: 64, active: false },
  { label: "Anciens tièdes", count: 112, active: false },
];

const planifiees = [
  { titre: "Vacances de la Toussaint", date: "12 oct.", famille: "Informatif" },
  { titre: "Vacances de Noël", date: "10 déc.", famille: "Informatif" },
  { titre: "Lancement réinscriptions", date: "02 juin", famille: "Réinscription" },
];

export function MailingMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      {/* Barre d'outil */}
      <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-3 sm:px-5">
        <span className="font-display text-sm font-bold text-ink-900">
          Nouvelle campagne
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-gold-soft px-2.5 py-1 text-[10px] font-semibold text-gold-600">
          <Clock size={11} />
          Campagne planifiée · 320 destinataires
        </span>
      </div>

      {/* Listes intelligentes + campagnes planifiées */}
      <div className="grid gap-5 border-b border-line p-4 sm:grid-cols-2 sm:p-5">
        {/* Listes intelligentes */}
        <div>
          <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-ink-800">
            <Users size={13} className="text-gold-600" />
            Listes intelligentes
          </div>
          <div className="space-y-2">
            {segments.map((s) => (
              <div
                key={s.label}
                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
                  s.active ? "border-gold bg-gold-soft" : "border-line bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-4 w-4 place-items-center rounded border ${
                      s.active
                        ? "border-gold bg-gold text-ink-900"
                        : "border-line"
                    }`}
                  >
                    {s.active && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-[11px] text-ink-900">{s.label}</span>
                </div>
                <span className="text-[10px] font-semibold tabular-nums text-smoke">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Campagnes planifiées */}
        <div>
          <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-ink-800">
            <Clock size={13} className="text-gold-600" />
            Planifiées pour l'année
          </div>
          <div className="space-y-2">
            {planifiees.map((c) => (
              <div
                key={c.titre}
                className="flex items-center justify-between rounded-lg bg-paper-2 px-3 py-2.5"
              >
                <div className="min-w-0 leading-tight">
                  <div className="truncate text-[11px] font-semibold text-ink-900">
                    {c.titre}
                  </div>
                  <div className="text-[9px] text-smoke">{c.famille}</div>
                </div>
                <span className="ml-2 flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-ink-700 ring-1 ring-line">
                  <Clock size={9} />
                  {c.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aperçu d'un modèle de mail (générique, couleurs DriveAsso) */}
      <div className="p-4 sm:p-5">
        <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-ink-800">
          <Mail size={13} className="text-gold-600" />
          Modèle de mail de relance
        </div>

        <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-line bg-white shadow-sm">
          {/* En-tête du mail : logo placeholder + nom du club */}
          <div className="flex items-center gap-2.5 bg-ink-900 px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[8px] font-bold uppercase tracking-wide text-white/70 ring-1 ring-white/15">
              Logo
            </span>
            <span className="font-display text-[13px] font-extrabold tracking-tight text-white">
              Votre club
            </span>
          </div>

          {/* Corps du mail */}
          <div className="px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-wide text-smoke">
              Objet
            </div>
            <div className="mt-0.5 font-display text-[13px] font-bold leading-snug text-ink-900">
              On vous attend pour la nouvelle saison !
            </div>

            <div className="mt-3 space-y-1.5">
              <span className="block h-1.5 w-full rounded bg-mist" />
              <span className="block h-1.5 w-[92%] rounded bg-mist" />
              <span className="block h-1.5 w-[78%] rounded bg-mist" />
              <span className="block h-1.5 w-[55%] rounded bg-mist" />
            </div>

            <div className="mt-4 inline-flex rounded-full bg-gold px-4 py-2 text-[11px] font-bold text-ink-900">
              Je me réinscris
            </div>

            {/* Pied discret */}
            <div className="mt-4 border-t border-line pt-2.5 text-[8px] text-smoke">
              Envoyé avec DriveAsso · Se désinscrire
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
