import { Section, SectionHeading } from "@/components/ui/Section";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { FicheAdherentMock } from "@/components/mockups/FicheAdherentMock";
import { EspaceAdherentMock } from "@/components/mockups/EspaceAdherentMock";
import { InscriptionMock } from "@/components/mockups/InscriptionMock";
import { MailingMock } from "@/components/mockups/MailingMock";
import { ACTES, type Acte } from "@/lib/content";
import { cn } from "@/lib/cn";

/* Associe chaque acte à son aperçu d'interface */
function ActeVisual({ k }: { k: Acte["key"] }) {
  if (k === "gerer")
    return (
      <BrowserFrame url="votre-club.fr/admin">
        <FicheAdherentMock />
      </BrowserFrame>
    );
  if (k === "automatiser")
    return (
      <div>
        {/* Écran ordinateur : suivi du dossier côté adhérent */}
        <BrowserFrame url="votre-club.fr/mon-espace">
          <EspaceAdherentMock />
        </BrowserFrame>
        {/* Écran mobile : parcours de paiement, empilé proprement dessous */}
        <div className="mx-auto mt-5 w-[220px] sm:w-[230px]">
          <InscriptionMock />
        </div>
      </div>
    );
  return <MailingMock />;
}

function ActeBlock({ acte, reverse }: { acte: Acte; reverse: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Texte */}
      <div className={cn(reverse && "lg:order-2")}>
        <div className="flex items-center gap-4" data-reveal>
          <span className="font-display text-5xl font-extrabold text-line">
            {acte.index}
          </span>
          <div>
            <div className="eyebrow">{acte.eyebrow}</div>
            <h3 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
              {acte.title}
            </h3>
          </div>
        </div>

        <p
          data-reveal
          data-reveal-delay="1"
          className="mt-5 text-xl font-semibold leading-snug text-ink-800"
        >
          {acte.lead}
        </p>

        {/* Bullets en colonnes multiples : espacement vertical constant entre
            les items, quel que soit le nombre ou la longueur (rythme identique
            sur les 3 actes). */}
        <ul className="mt-7 gap-x-8 sm:columns-2">
          {acte.bullets.map((b, i) => (
            <li
              key={b.title}
              data-reveal
              data-reveal-delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="group mb-6 break-inside-avoid last:mb-0"
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-soft">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#b8860f"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h4 className="font-display text-[15px] font-bold leading-snug text-ink-900">
                  {b.title}
                </h4>
              </div>
              <p className="mt-1 pl-7 text-sm leading-relaxed text-smoke">
                {b.text}
              </p>
            </li>
          ))}
        </ul>

        {/* Message clé */}
        <div
          data-reveal
          className="mt-8 border-l-[3px] border-gold pl-4"
        >
          <p className="font-display text-base font-semibold italic text-ink-800">
            « {acte.message} »
          </p>
        </div>
      </div>

      {/* Visuel */}
      <div className={cn("relative", reverse && "lg:order-1")} data-reveal data-reveal-delay="2">
        <ActeVisual k={acte.key} />
      </div>
    </div>
  );
}

export function Solution() {
  return (
    <Section id="solution" tone="paper">
      <SectionHeading
        align="center"
        eyebrow="La solution complète"
        title={
          <>
            Trois piliers. <span className="text-ink-700">Un seul système.</span>
          </>
        }
        intro="De la gestion quotidienne à la croissance, DriveAsso accompagne vos adhérents du premier contact à la réinscription. Un seul outil, rien à brancher en plus."
      />

      {/* Accroche forte qui prépare le déballage des 3 actes */}
      <p
        data-reveal
        className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-bold text-ink-900 sm:text-2xl"
      >
        Bien plus qu'un site.{" "}
        <span className="text-ink-700">Toute votre gestion.</span>
      </p>

      <div className="mt-16 space-y-24 lg:space-y-32">
        {ACTES.map((acte, i) => (
          <ActeBlock key={acte.key} acte={acte} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
