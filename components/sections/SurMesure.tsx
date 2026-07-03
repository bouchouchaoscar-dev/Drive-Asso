import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Sparkles, RefreshCw, ArrowRight, Clock, TrendingUp } from "lucide-react";

const creation = [
  "Conception sur-mesure à vos couleurs et à votre identité",
  "Vitrine publique + espace administrateur + espace adhérent",
  "Le site devient votre propriété",
];

const abonnement = [
  "Hébergement, paiements et base de données",
  "Outil de mailing intégré",
  "Mises à jour et sécurité en continu",
  "Accompagnement : pour une annonce ou un changement de tarif, il suffit de nous écrire",
];

export function SurMesure() {
  return (
    <Section id="offre" tone="paper" className="overflow-hidden">
      <div className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <div data-reveal className="eyebrow mb-4">
            Une solution sur-mesure
          </div>
          <h2
            data-reveal
            data-reveal-delay="1"
            className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
          >
            Un budget léger, un impact fort.
          </h2>
          <div data-reveal data-reveal-delay="2" className="gold-rule mx-auto mt-6" />
          <p
            data-reveal
            data-reveal-delay="2"
            className="mt-6 text-lg leading-relaxed text-smoke"
          >
            Notre solution se règle en deux temps. D'abord, un paiement unique
            pour le déploiement de votre site sur-mesure, qui devient votre
            propriété. Ensuite, un abonnement mensuel qui fait vivre la
            plateforme toute l'année : hébergement, paiements, base de données,
            mises à jour, sécurité et accompagnement. Un budget vite rentabilisé
            par le temps gagné, la gestion simplifiée et les adhérents reconquis.
          </p>
        </div>

        {/* Deux volets */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {/* Création */}
          <div
            data-reveal
            data-reveal-delay="1"
            className="rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gold text-ink-900">
              <Sparkles size={22} />
            </span>
            <h3 className="text-xl font-bold text-ink-900">La création</h3>
            <p className="mt-1.5 text-sm text-smoke">Une fois, au lancement</p>
            <ul className="mt-5 space-y-3">
              {creation.map((c) => (
                <li key={c} className="flex gap-2.5 text-[15px] text-ink-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Abonnement */}
          <div
            data-reveal
            data-reveal-delay="2"
            className="rounded-2xl border border-gold/40 bg-white p-7 shadow-sm ring-1 ring-gold/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-ink-900 text-gold">
              <RefreshCw size={22} />
            </span>
            <h3 className="text-xl font-bold text-ink-900">L'abonnement</h3>
            <p className="mt-1.5 text-sm text-smoke">
              Fait vivre le système toute l'année
            </p>
            <ul className="mt-5 space-y-3">
              {abonnement.map((c) => (
                <li key={c} className="flex gap-2.5 text-[15px] text-ink-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rentabilité */}
        <div
          data-reveal
          className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-center sm:gap-8"
        >
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-gold-600" />
            <span className="text-sm text-ink-700">
              Rentabilisé par le temps gagné
            </span>
          </div>
          <span className="hidden h-5 w-px bg-line sm:block" />
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-gold-600" />
            <span className="text-sm text-ink-700">
              et par les adhérents gagnés et reconquis
            </span>
          </div>
        </div>

        {/* CTA */}
        <div data-reveal className="mx-auto mt-12 max-w-2xl text-center">
          <p className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
            Découvrez à quoi ressemblerait{" "}
            <span className="relative inline-block">
              votre club
              <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-gold/70" />
            </span>{" "}
            sur DriveAsso.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="#contact" variant="primary" size="lg">
              Demandez votre démo personnalisée gratuite
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
