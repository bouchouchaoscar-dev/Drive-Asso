/**
 * Aperçu stylisé de la page d'inscription du site Punching Boxe.
 * Reprend la palette réelle du club (blanc + orange #FF6B00 + noir),
 * style premium épuré. 100 % CSS, données fictives. Aperçu illustratif.
 */

const PB = {
  orange: "#ff6b00",
  orange600: "#ea5f00",
  orange50: "#fff4ec",
  ink: "#0a0a0a",
  smoke: "#6b6b6b",
  line: "#ececec",
};

const steps = ["Infos", "Documents", "Paiement"];

export function ClubSiteMock() {
  return (
    <div className="bg-white" style={{ color: PB.ink }}>
      {/* Barre de navigation du club */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: `1px solid ${PB.line}` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 place-items-center rounded-md text-[10px] font-extrabold text-white"
            style={{ background: PB.orange }}
          >
            PB
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight">
            PUNCHING BOXE
          </span>
        </div>
        <span
          className="text-[10px] font-semibold uppercase tracking-wide"
          style={{ color: PB.smoke }}
        >
          Inscription
        </span>
      </div>

      <div className="p-5">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: PB.orange }}
        >
          Saison 2025 / 2026
        </div>
        <div className="mt-1 font-display text-xl font-extrabold leading-tight sm:text-2xl">
          Inscris-toi en ligne
        </div>

        {/* Étapes du parcours */}
        <div className="mt-4 flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <span
                  className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
                  style={{
                    background: i === 0 ? PB.orange : "#fff",
                    color: i === 0 ? "#fff" : PB.smoke,
                    border: i === 0 ? "none" : `1px solid ${PB.line}`,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-[8px]" style={{ color: PB.smoke }}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className="mx-1 mb-3 h-[2px] flex-1"
                  style={{ background: PB.line }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Carte formule sélectionnée */}
        <div
          className="mt-4 flex items-center justify-between rounded-xl p-3"
          style={{ border: `1px solid ${PB.line}`, background: "#fafafa" }}
        >
          <div className="leading-tight">
            <div className="text-[12px] font-bold">Boxe adulte</div>
            <div className="text-[10px]" style={{ color: PB.smoke }}>
              Saison 2025 / 2026
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold"
            style={{ background: PB.orange50, color: PB.orange600 }}
          >
            Sélectionné
          </span>
        </div>

        {/* Champs fictifs */}
        <div className="mt-3 space-y-2">
          {["Nom et prénom", "Adresse email"].map((ph) => (
            <div
              key={ph}
              className="flex h-8 items-center rounded-lg px-3 text-[10px]"
              style={{ border: `1px solid ${PB.line}`, color: PB.smoke }}
            >
              {ph}
            </div>
          ))}
        </div>

        {/* Bouton de paiement */}
        <div
          className="mt-4 grid h-9 place-items-center rounded-full font-display text-[11px] font-bold text-white"
          style={{ background: PB.orange }}
        >
          Payer et valider l'inscription
        </div>
      </div>
    </div>
  );
}
