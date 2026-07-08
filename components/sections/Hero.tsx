import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import { Check, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-paper pt-24 sm:pt-32 section-y-b"
    >
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Colonne texte */}
          <div className="max-w-xl">
            <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Déjà en production
            </div>

            <h1
              className="animate-rise mt-6 text-4xl font-extrabold leading-[1.05] text-ink-900 sm:text-5xl md:text-6xl"
              style={{ animationDelay: "0.08s" }}
            >
              Un site à votre image.{" "}
              <span className="relative inline-block">
                Une plateforme rien qu'à vous.
                <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-gold/70" />
              </span>
            </h1>

            <p
              className="animate-rise mt-6 text-lg leading-relaxed text-smoke"
              style={{ animationDelay: "0.16s" }}
            >
              La gestion associative nouvelle génération pour votre club ou
              association sportive : un site premium aux couleurs de votre club,
              où vous pilotez tout depuis un seul espace. Vos adhérents, eux,
              s'inscrivent en ligne et paient seuls en quelques minutes.
            </p>

            <div
              className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.24s" }}
            >
              <Button href="#contact" size="lg">
                Demander une démo
                <ArrowRight size={18} />
              </Button>
              <Button href="#solution" variant="ghost" size="lg">
                Découvrir la solution
              </Button>
            </div>

            {/* Baseline de marque */}
            <div
              className="animate-rise mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{ animationDelay: "0.32s" }}
            >
              {SITE.baseline.split(" ").map((mot) => (
                <span
                  key={mot}
                  className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink-800"
                >
                  {mot.replace(".", "")}
                  <span className="ml-3 text-gold">/</span>
                </span>
              ))}
            </div>
          </div>

          {/* Colonne visuel */}
          <div className="relative">
            <div
              className="animate-rise relative z-10"
              style={{ animationDelay: "0.2s" }}
            >
              <BrowserFrame url="votre-club.fr/admin">
                <DashboardMock />
              </BrowserFrame>
            </div>

            {/* Carte flottante — confirmation de paiement adhérent */}
            <div
              className="animate-rise absolute -bottom-7 -left-5 z-20 hidden w-60 rounded-2xl border border-line bg-white p-4 shadow-lg sm:block"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#22c55e]/12 text-[#15803d]">
                  <Check size={18} />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-ink-900">
                    Inscription validée
                  </div>
                  <div className="text-xs text-smoke">Paiement encaissé en ligne</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-mist">
                <div className="h-full w-full rounded-full bg-gold" />
              </div>
              <div className="mt-2 text-[11px] text-smoke">
                Sans aucune intervention du club
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
