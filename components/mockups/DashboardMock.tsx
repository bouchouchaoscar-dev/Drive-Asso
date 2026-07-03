/**
 * Aperçu stylisé de l'espace administrateur DriveAsso.
 * 100 % CSS, données fictives neutres. Aucune donnée réelle d'adhérent.
 */

/* Évolution fictive mais crédible des inscriptions sur 12 mois :
   pic à la rentrée de septembre, creux l'été. */
const bars = [45, 30, 24, 18, 15, 14, 16, 70, 100, 82, 55, 40];
const moisLabels = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];
const MOIS_PIC = 8; // Septembre (rentrée) = barre mise en valeur en doré

const kpis = [
  { label: "Adhérents actifs", value: "248", trend: "+12 ce mois", up: true },
  { label: "Encaissé (net)", value: "61 480 €", trend: "+8 %", up: true },
  { label: "Dossiers à valider", value: "7", trend: "3 nouveaux", up: false },
];

const rows = [
  { name: "Adhérent A.", formule: "Boxe Française", statut: "payé" },
  { name: "Adhérent B.", formule: "Savate & Prépa", statut: "fractionné" },
  { name: "Adhérent C.", formule: "Boxe Française", statut: "espèces" },
];

const statutStyle: Record<string, string> = {
  payé: "bg-[#22c55e]/12 text-[#15803d]",
  fractionné: "bg-gold-soft text-ink-800",
  espèces: "bg-mist text-smoke",
};

export function DashboardMock() {
  return (
    <div className="grid grid-cols-[auto_1fr] overflow-hidden bg-paper-2 text-ink">
      {/* Rail latéral */}
      <aside className="hidden w-16 flex-col items-center gap-5 border-r border-line bg-ink-900 py-5 sm:flex">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-xs font-extrabold text-ink-900">
          A
        </div>
        {["▦", "◫", "✦", "✉"].map((g, i) => (
          <span
            key={i}
            className={`grid h-9 w-9 place-items-center rounded-lg text-sm ${
              i === 0 ? "bg-white/10 text-white" : "text-white/40"
            }`}
          >
            {g}
          </span>
        ))}
      </aside>

      {/* Contenu */}
      <div className="min-w-0 p-4 sm:p-5">
        {/* En-tête */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-display text-sm font-bold text-ink-900">
              Tableau de bord
            </div>
            <div className="text-[11px] text-smoke">Saison 2025 – 2026</div>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] text-smoke ring-1 ring-line sm:flex">
            Saison en cours
            <span className="text-smoke">▾</span>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-3 gap-2.5">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-line bg-white p-3"
            >
              <div className="truncate text-[10px] font-medium uppercase tracking-wide text-smoke">
                {k.label}
              </div>
              <div className="mt-1 font-display text-lg font-extrabold leading-none text-ink-900">
                {k.value}
              </div>
              <div
                className={`mt-1.5 text-[10px] font-semibold ${
                  k.up ? "text-[#15803d]" : "text-gold-600"
                }`}
              >
                {k.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Graphe + répartition */}
        <div className="mt-2.5 grid grid-cols-[1.6fr_1fr] gap-2.5">
          {/* Histogramme inscriptions */}
          <div className="rounded-xl border border-line bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink-800">
                Inscriptions / mois
              </span>
              <span className="text-[10px] text-smoke">12 mois</span>
            </div>
            {/* Zone de tracé : hauteur fixe pour que les % des barres se voient */}
            <div className="flex h-24 items-end gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-1 origin-bottom rounded-t-[2px]"
                  style={{
                    minHeight: "3px",
                    height: `${h}%`,
                    background:
                      i === MOIS_PIC
                        ? "linear-gradient(180deg,#d4a017,#b8860f)"
                        : "#1f2937",
                    animation: `grow-bar 0.7s cubic-bezier(0.22,1,0.36,1) ${
                      i * 0.05
                    }s both`,
                  }}
                />
              ))}
            </div>
            {/* Libellés des mois, alignés sous les barres */}
            <div className="mt-1 flex gap-1">
              {moisLabels.map((m) => (
                <span
                  key={m}
                  className="min-w-0 flex-1 text-center text-[7px] leading-none text-smoke"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Donut répartition */}
          <div className="rounded-xl border border-line bg-white p-3">
            <div className="mb-2 text-[11px] font-semibold text-ink-800">
              Répartition
            </div>
            <div className="flex items-center gap-3">
              <div
                className="h-16 w-16 shrink-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(#1f2937 0 62%, #d4a017 62% 86%, #e5e7eb 86% 100%)",
                }}
              >
                <div className="m-[7px] h-[42px] w-[42px] rounded-full bg-white" />
              </div>
              <ul className="space-y-1.5 text-[10px] text-smoke">
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-ink-900" /> Boxe
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Savate
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-line" /> Autres
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mini-table paiements */}
        <div className="mt-2.5 rounded-xl border border-line bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-ink-800">
              Derniers paiements
            </span>
            <span className="text-[10px] text-gold-600">Voir tout</span>
          </div>
          <div className="space-y-1.5">
            {rows.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-lg bg-paper-2 px-2.5 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-900 text-[9px] font-bold text-white">
                    {r.name.charAt(9)}
                  </span>
                  <div className="leading-tight">
                    <div className="text-[11px] font-semibold text-ink-900">
                      {r.name}
                    </div>
                    <div className="text-[9px] text-smoke">{r.formule}</div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${statutStyle[r.statut]}`}
                >
                  {r.statut}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
