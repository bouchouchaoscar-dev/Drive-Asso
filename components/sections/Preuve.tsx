import { Section } from "@/components/ui/Section";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { ClubSiteMock } from "@/components/mockups/ClubSiteMock";
import { CLIENT_REF } from "@/lib/content";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const faits = [
  "Des adhérents inscrits et des paiements encaissés en ligne dès la mise en service.",
  "Le parcours d'inscription fonctionne en autonomie totale : les adhérents s'inscrivent et paient seuls.",
  "Aucune intervention du club nécessaire pour traiter une inscription.",
];

export function Preuve() {
  return (
    <Section id="realisations" tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Visuel */}
        <div data-reveal className="relative order-2 lg:order-1">
          <BrowserFrame url={CLIENT_REF.shortUrl}>
            <ClubSiteMock />
          </BrowserFrame>
        </div>

        {/* Texte */}
        <div className="order-1 lg:order-2">
          <div
            data-reveal
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-3.5 py-1.5 text-xs font-semibold text-white"
          >
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
            Déjà en production
          </div>

          <h2
            data-reveal
            data-reveal-delay="1"
            className="mt-5 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
          >
            Notre première réalisation,
            <br />
            en conditions réelles.
          </h2>

          <div data-reveal data-reveal-delay="1" className="gold-rule mt-6" />

          <p
            data-reveal
            data-reveal-delay="2"
            className="mt-6 text-lg leading-relaxed text-smoke"
          >
            Le club{" "}
            <span className="font-semibold text-ink-900">
              {CLIENT_REF.name}
            </span>{" "}
            est notre toute première réalisation, et notre club référent. Il
            utilise DriveAsso au quotidien. Rien ici n'est une promesse : c'est
            une plateforme déjà éprouvée.
          </p>

          <ul className="mt-7 space-y-3.5">
            {faits.map((f, i) => (
              <li
                key={i}
                data-reveal
                data-reveal-delay={((i % 3) + 2) as 2 | 3 | 4}
                className="flex gap-3"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-gold-600"
                />
                <span className="text-[15px] leading-relaxed text-ink-700">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <a
            data-reveal
            data-reveal-delay="4"
            href={CLIENT_REF.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-8 inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink-900"
          >
            Voir le site en ligne : {CLIENT_REF.shortUrl}
            <ArrowUpRight size={16} className="text-gold-600" />
          </a>
        </div>
      </div>
    </Section>
  );
}
