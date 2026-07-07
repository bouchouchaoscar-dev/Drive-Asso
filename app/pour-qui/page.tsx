import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealInit } from "@/components/ui/RevealInit";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  Dumbbell,
  GraduationCap,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pour qui ? Logiciel pour clubs et associations sportives",
  description:
    "DriveAsso est le logiciel de gestion pensé pour les clubs sportifs et les associations loi 1901 : inscription en ligne des adhérents, paiements, suivi des dossiers et communication automatisée. Fini la paperasse.",
  keywords: [
    "logiciel club sportif",
    "gestion association sportive",
    "logiciel association loi 1901",
    "association loi 1901",
    "inscription en ligne club",
    "logiciel gestion adhérents sport",
  ],
  alternates: { canonical: "/pour-qui" },
  openGraph: {
    title: "Pour qui ? Logiciel pour clubs et associations sportives",
    description:
      "La solution de gestion pensée pour les clubs sportifs et associations : inscription en ligne, paiements, dossiers et communication automatisée.",
    url: "https://www.drive-asso.fr/pour-qui",
  },
};

const profils = [
  {
    icon: Dumbbell,
    title: "Clubs de sport",
    text: "Boxe, judo, football, tennis, danse, arts martiaux… quelle que soit votre discipline.",
  },
  {
    icon: GraduationCap,
    title: "Associations et écoles de sport",
    text: "Les structures qui forment, encadrent et font grandir leurs adhérents saison après saison.",
  },
  {
    icon: Users,
    title: "Clubs à forte affluence",
    text: "Des dizaines ou des centaines d'adhérents à inscrire et à suivre chaque saison, sans y passer vos soirées.",
  },
];

const benefices = [
  {
    title: "Gestion simplifiée",
    text: "Tout votre club piloté depuis un seul espace.",
  },
  {
    title: "Inscriptions et paiements en ligne",
    text: "Vos adhérents s'inscrivent et paient seuls.",
  },
  {
    title: "Communication automatisée",
    text: "Relances et campagnes envoyées sans effort.",
  },
  {
    title: "Image professionnelle",
    text: "Un site à vos couleurs qui inspire confiance.",
  },
];

export default function PourQuiPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero de page */}
        <section className="relative overflow-hidden bg-paper pt-28 sm:pt-36 section-y-b">
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-rise eyebrow mb-4">Pour qui ?</div>
              <h1
                className="animate-rise text-4xl font-extrabold leading-[1.08] text-ink-900 sm:text-5xl md:text-[3.25rem]"
                style={{ animationDelay: "0.08s" }}
              >
                Pensé pour les clubs et{" "}
                <span className="relative inline-block">
                  associations sportives
                  <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-gold/70" />
                </span>
                .
              </h1>
              <p
                className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-smoke"
                style={{ animationDelay: "0.16s" }}
              >
                Fini les feuilles d'inscription volantes, les chèques égarés, les
                relances à la main et les dossiers papier incomplets. Fini les
                heures perdues en gestion administrative. Avec DriveAsso, tout
                est digitalisé, automatisé, centralisé.
              </p>
              <div
                className="animate-rise mt-8 flex justify-center"
                style={{ animationDelay: "0.24s" }}
              >
                <Button href="/#contact" size="lg">
                  Demandez votre démo gratuite
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Profils cibles */}
        <Section tone="paper">
          <SectionHeading
            align="center"
            eyebrow="À qui ça s'adresse"
            title={
              <>
                Vous allez vous{" "}
                <span className="text-ink-700">reconnaître.</span>
              </>
            }
            intro="DriveAsso s'adresse à toutes les structures sportives (clubs, associations sportives, associations loi 1901) qui gèrent des adhérents, des inscriptions et des paiements chaque saison."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {profils.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                data-reveal-delay={(i + 1) as 1 | 2 | 3}
                className="group rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-ink-900 text-white transition-colors group-hover:bg-gold group-hover:text-ink-900">
                  <p.icon size={22} />
                </span>
                <h3 className="text-lg font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-smoke">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Bénéfices clés */}
        <Section tone="paper-2">
          <SectionHeading
            align="center"
            eyebrow="Ce que vous y gagnez"
            title={
              <>
                Moins de paperasse.{" "}
                <span className="text-ink-700">Plus de club.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {benefices.map((b, i) => (
              <div
                key={b.title}
                data-reveal
                data-reveal-delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="flex gap-4 rounded-2xl border border-line bg-white p-6"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-600">
                  <Check size={18} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink-900">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-smoke">
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Ouverture légère (secondaire) */}
        <Section tone="paper">
          <div
            data-reveal
            className="mx-auto max-w-3xl rounded-2xl border border-line bg-paper-2 p-7 text-center sm:p-8"
          >
            <div className="eyebrow mb-3 flex items-center justify-center">
              Et au-delà du sport ?
            </div>
            <p className="text-[15px] leading-relaxed text-smoke sm:text-base">
              Le cœur de DriveAsso, c'est le sport. Mais la solution s'adapte
              aussi à d'autres associations : culturelles, de loisir, ou qui
              collectent des dons. Chaque déploiement se personnalise selon les
              besoins de votre structure. Une question ? Parlons-en.
            </p>
          </div>
        </Section>

        {/* CTA final */}
        <Section tone="paper-2">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
              Découvrez DriveAsso sur{" "}
              <span className="relative inline-block">
                votre club
                <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-gold/70" />
              </span>
              .
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-smoke">
              On vous montre concrètement à quoi ressemblerait votre site et
              votre plateforme. Sans engagement.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/#contact" size="lg">
                Demandez votre démo personnalisée gratuite
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <RevealInit />
    </>
  );
}
