import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealInit } from "@/components/ui/RevealInit";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  VoiceAssistantButton,
  HeroDemoButton,
} from "@/components/standard/VoiceAssistantButton";
import {
  ArrowRight,
  PhoneCall,
  PhoneOff,
  Clock,
  Moon,
  MessagesSquare,
  Repeat,
  Users,
  Wallet,
  CalendarClock,
  PhoneForwarded,
  ShieldCheck,
  Headphones,
  Sparkles,
} from "lucide-react";

const SITE_URL = "https://www.drive-asso.fr";

export const metadata: Metadata = {
  title: "Standard téléphonique intelligent pour club sportif",
  description:
    "Un standard téléphonique intelligent qui répond aux appels de votre club 24h/24, comprend chaque demande et oriente vos appelants vers votre plateforme DriveAsso.",
  keywords: [
    "standard téléphonique intelligent",
    "accueil téléphonique club sportif",
    "répondeur intelligent association",
    "standard automatisé club",
    "assistant téléphonique association sportive",
  ],
  alternates: { canonical: "/standard-telephonique" },
  openGraph: {
    title: "Standard téléphonique intelligent pour club sportif · DriveAsso",
    description:
      "Un accueil téléphonique qui répond à votre place, jour et nuit, comprend chaque demande et oriente vers votre plateforme. Intégré à DriveAsso.",
    url: `${SITE_URL}/standard-telephonique`,
  },
};

const pains = [
  {
    icon: Moon,
    title: "Les appels hors horaires.",
    text: "La moitié des demandes arrivent quand le bureau est fermé. Elles restent sans réponse.",
  },
  {
    icon: Repeat,
    title: "Les mêmes questions, cent fois.",
    text: "Horaires, tarifs, formules, comment s'inscrire : vos bénévoles répètent les mêmes réponses au lieu de gérer le club.",
  },
  {
    icon: PhoneOff,
    title: "Les lignes occupées en pleine affluence.",
    text: "Quand tout le monde appelle en même temps, la plupart n'obtiennent personne.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Toujours disponible, 24h/24, 7j/7.",
    text: "Il décroche à chaque appel, y compris le soir, le week-end et les jours fériés. Votre club reste joignable même quand personne n'est là.",
  },
  {
    icon: PhoneCall,
    title: "Plusieurs appels à la fois, jamais de ligne occupée.",
    text: "Dix personnes appellent en même temps un jour d'affluence ? Chacune obtient une réponse immédiate. Plus aucune ligne occupée.",
  },
  {
    icon: MessagesSquare,
    title: "Une vraie conversation, pas un menu à touches.",
    text: "Pas de « tapez 1, tapez 2 ». L'appelant parle naturellement, l'assistant comprend sa demande et lui répond comme le ferait un membre du club.",
  },
  {
    icon: Users,
    title: "Vos bénévoles enfin libérés.",
    text: "L'assistant gère l'accueil courant. Vos bénévoles ne sont sollicités que pour ce qui compte vraiment, et toujours avec le contexte de l'appel en main.",
  },
];

const proofs = [
  {
    icon: Wallet,
    title: "Il maîtrise vos formules et vos tarifs.",
    text: "Un parent demande le prix pour son enfant de dix ans ? L'assistant identifie la bonne formule et donne le tarif exact, sans jamais inventer.",
  },
  {
    icon: CalendarClock,
    title: "Il consulte vos disponibilités en direct.",
    text: "Pour un club avec réservation de créneaux, il sait ce qui est libre à l'instant même où l'appelant le demande, la même information que votre site, à la seconde près.",
  },
  {
    icon: PhoneForwarded,
    title: "Il oriente vers votre plateforme.",
    text: "Il explique comment s'inscrire ou réserver, puis renvoie l'appelant vers votre site, où tout se fait en ligne. Un club qui appelle repart avec sa réponse et le chemin pour agir.",
  },
];

const steps = [
  {
    title: "L'appelant compose votre numéro.",
    text: "Le vôtre, ou un nouveau numéro dédié. L'assistant décroche en une sonnerie, se présente au nom de votre club.",
  },
  {
    title: "Il comprend et répond.",
    text: "Formules, tarifs, horaires, disponibilités, inscription : l'assistant puise dans votre plateforme pour donner la bonne réponse, dans une conversation naturelle.",
  },
  {
    title: "Il oriente, ou transmet.",
    text: "Il guide vers votre site pour agir. Et si la demande sort de son champ (un dirigeant, un cas particulier), il prend le message et transmet au club un récapitulatif clair, avec de quoi rappeler en connaissance de cause.",
  },
];

export default function StandardTelephoniquePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ---------- BLOC 1 — HERO ---------- */}
        <section className="relative overflow-hidden bg-paper pt-28 sm:pt-36 section-y-b">
          <Container className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="max-w-xl">
                <div className="animate-rise eyebrow mb-4">
                  Standard téléphonique intelligent
                </div>
                <h1
                  className="animate-rise text-4xl font-extrabold leading-[1.08] text-ink-900 sm:text-5xl"
                  style={{ animationDelay: "0.08s" }}
                >
                  Votre club ne rate{" "}
                  <span className="relative inline-block">
                    plus jamais
                    <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-gold/70" />
                  </span>{" "}
                  un appel.
                </h1>
                <p
                  className="animate-rise mt-6 text-lg leading-relaxed text-smoke"
                  style={{ animationDelay: "0.16s" }}
                >
                  Un accueil téléphonique qui répond à votre place, jour et nuit,
                  comprend chaque demande et oriente vos appelants, sans qu'un
                  bénévole ait à décrocher.
                </p>
                <div
                  className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                  style={{ animationDelay: "0.24s" }}
                >
                  <HeroDemoButton className="w-full sm:w-auto" />
                  <VoiceAssistantButton
                    label="Écouter l'assistant"
                    fullWidthMobile
                  />
                </div>
              </div>

              {/* Visuel : carte d'appel en cours gérée par l'assistant */}
              <div
                className="animate-rise relative mx-auto w-full max-w-sm lg:max-w-none"
                style={{ animationDelay: "0.2s" }}
              >
                <CallCard />
              </div>
            </div>
          </Container>
        </section>

        {/* ---------- BLOC 2 — LA DOULEUR ---------- */}
        <Section tone="paper-2">
          <div className="mx-auto max-w-3xl text-center">
            <div data-reveal className="eyebrow mb-4">
              Le problème
            </div>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
            >
              Combien d'appels votre club laisse-t-il sonner dans le vide ?
            </h2>
            <div
              data-reveal
              data-reveal-delay="2"
              className="gold-rule mx-auto mt-6"
            />
            <div
              data-reveal
              data-reveal-delay="2"
              className="mt-6 space-y-4 text-lg leading-relaxed text-smoke"
            >
              <p>
                Un samedi de tournoi, un soir de reprise, une période
                d'inscriptions : le téléphone sonne, et personne n'est disponible
                pour répondre. Chaque appel manqué, c'est une famille qui hésite,
                un futur adhérent qui appelle ailleurs, une question simple qui se
                transforme en mail sans réponse.
              </p>
              <p className="font-medium text-ink-800">
                Vos bénévoles ne peuvent pas être au téléphone en permanence, et
                ce n'est pas leur rôle.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pains.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                data-reveal-delay={(i + 1) as 1 | 2 | 3}
                className="rounded-2xl border border-line bg-white p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-ink-700">
                    <p.icon size={22} />
                  </span>
                  <h3 className="text-base font-bold leading-snug text-ink-900">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-smoke">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- BLOC 3 — LA SOLUTION ---------- */}
        <Section tone="paper">
          <div className="mx-auto max-w-3xl text-center">
            <div data-reveal className="eyebrow mb-4">
              La solution
            </div>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
            >
              Un standard qui ne dort jamais.
            </h2>
            <div
              data-reveal
              data-reveal-delay="2"
              className="gold-rule mx-auto mt-6"
            />
            <p
              data-reveal
              data-reveal-delay="2"
              className="mt-6 text-lg leading-relaxed text-smoke"
            >
              Intégré à votre plateforme DriveAsso, il répond intelligemment à
              chaque appel et libère vos bénévoles de l'accueil téléphonique.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                data-reveal
                data-reveal-delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="group flex gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-7"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink-900 text-white transition-colors group-hover:bg-gold group-hover:text-ink-900">
                  <b.icon size={22} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-smoke">
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- BLOC 4 — CE QUI NOUS REND UNIQUES (moat) ---------- */}
        <Section tone="paper-2">
          <div className="mx-auto max-w-3xl text-center">
            <div data-reveal className="eyebrow mb-4">
              La différence DriveAsso
            </div>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
            >
              Il ne se contente pas de répondre.{" "}
              <span className="text-ink-700">Il connaît votre club.</span>
            </h2>
            <div
              data-reveal
              data-reveal-delay="2"
              className="gold-rule mx-auto mt-6"
            />
            <p
              data-reveal
              data-reveal-delay="2"
              className="mt-6 text-lg leading-relaxed text-smoke"
            >
              La plupart des assistants téléphoniques sont des robots génériques,
              débranchés de la réalité de votre structure. Le nôtre est différent :
              il fait partie de la plateforme que nous construisons pour vous. Il
              connaît vos vraies formules, vos vrais tarifs, vos vrais créneaux, en
              temps réel.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {proofs.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                data-reveal-delay={(i + 1) as 1 | 2 | 3}
                className="rounded-2xl border border-line bg-white p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-600">
                    <p.icon size={22} />
                  </span>
                  <h3 className="text-base font-bold leading-snug text-ink-900">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-smoke">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Accent de clôture du bloc */}
          <div
            data-reveal
            className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-gold/60 bg-white p-6 sm:p-8"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-ink-900">
              <Sparkles size={18} />
            </span>
            <p className="font-display text-base font-semibold leading-relaxed text-ink-900 sm:text-lg">
              Aucun assistant générique ne peut faire ça : il faudrait qu'il soit
              relié à votre système. Le nôtre l'est nativement, parce que c'est
              nous qui l'avons construit.
            </p>
          </div>
        </Section>

        {/* ---------- BLOC 5 — LE SCÉNARIO ---------- */}
        <Section tone="paper">
          <div className="mx-auto max-w-3xl">
            <div data-reveal className="eyebrow mb-4 flex items-center gap-3">
              Le scénario
            </div>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
            >
              Un nouvel adhérent, pendant que le club dort.
            </h2>
            <div data-reveal data-reveal-delay="1" className="gold-rule mt-6" />

            <div
              data-reveal
              data-reveal-delay="2"
              className="mt-8 space-y-5 text-lg leading-relaxed text-smoke"
            >
              <p>
                <span className="mr-2 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-2.5 py-1 align-middle font-display text-xs font-semibold text-white">
                  <Moon size={13} className="text-gold" /> 22:00
                </span>
                Une mère veut inscrire sa fille au tennis et appelle le club.
                Personne au bureau, évidemment, mais l'assistant décroche.
              </p>
              <p>
                Il lui présente les formules adaptées à l'âge de sa fille, lui
                donne le tarif, lui explique en deux phrases comment se passe
                l'inscription : créer son espace, ouvrir un dossier, signer en
                ligne, payer. Il la rassure, l'oriente vers le site.
              </p>
              <p>
                Elle raccroche, va sur le site, et inscrit sa fille dans la
                foulée. Le lendemain matin, le club découvre une nouvelle
                adhérente, sans qu'aucun bénévole n'ait eu à lever le petit doigt.
              </p>
            </div>

            <p
              data-reveal
              className="mt-8 border-l-[3px] border-gold pl-4 font-display text-xl font-semibold italic text-ink-900"
            >
              C'est ça, un club en pilote automatique.
            </p>
          </div>
        </Section>

        {/* ---------- BLOC 6 — COMMENT ÇA MARCHE ---------- */}
        <Section tone="paper-2">
          <div className="mx-auto max-w-3xl text-center">
            <div data-reveal className="eyebrow mb-4">
              Comment ça marche
            </div>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
            >
              Simple pour vos appelants.{" "}
              <span className="text-ink-700">Puissant en coulisses.</span>
            </h2>
            <div
              data-reveal
              data-reveal-delay="2"
              className="gold-rule mx-auto mt-6"
            />
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                data-reveal-delay={(i + 1) as 1 | 2 | 3}
                className="relative rounded-2xl border border-line bg-white p-7"
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-display text-4xl font-extrabold leading-none text-line">
                    0{i + 1}
                  </span>
                  <h3 className="text-base font-bold leading-snug text-ink-900">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-smoke">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-white p-5 sm:p-6"
          >
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-gold-600" />
            <p className="text-[15px] leading-relaxed text-smoke">
              L'assistant informe et oriente. Il ne prend jamais de paiement et ne
              remplace pas une décision humaine : sur les sujets sensibles, il
              transmet toujours à une personne du club.
            </p>
          </div>
        </Section>

        {/* ---------- BLOC 7 — TESTEZ-MOI (non actif) ---------- */}
        <Section tone="paper">
          <div
            data-reveal
            className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border border-line bg-paper-2 p-8 text-center sm:p-10"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-soft text-gold-600">
              <Headphones size={26} />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold text-ink-900 sm:text-3xl">
              Envie de l'entendre ?
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-smoke sm:text-base">
              Découvrez par vous-même à quoi ressemble une conversation avec notre
              standard intelligent.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-700">
              Cliquez, et laissez notre assistant vocal vous présenter DriveAsso :
              comment ça marche, en quoi ça simplifierait la gestion de votre club.
              Posez-lui toutes vos questions. Et au passage, vous découvrirez à quoi
              ressemblerait votre propre standard téléphonique intelligent.
            </p>
            <div className="mt-6">
              <VoiceAssistantButton label="Testez l'assistant" />
            </div>
          </div>
        </Section>

        {/* ---------- BLOC 8 — CTA FINAL (fond blanc, sans aplat) ---------- */}
        <Section tone="paper">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
              Offrez à votre club un accueil à la hauteur.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-smoke">
              Le standard téléphonique intelligent est inclus dans votre
              plateforme DriveAsso. Parlons de votre club.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/#contact" size="lg">
                Demander une démo gratuite
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

/* ============================================================
   Carte visuelle : un appel en cours pris en charge par l'assistant.
   100 % CSS, anthracite + doré, cohérent avec les mockups du site.
   ============================================================ */
function CallCard() {
  return (
    <div className="relative">
      <div className="relative z-10 overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-lg ring-1 ring-black/[0.03] sm:p-7">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="text-[13px] font-semibold text-ink-800">
              Appel en cours
            </span>
          </div>
          <span className="font-display text-[11px] font-semibold uppercase tracking-wide text-smoke">
            votre-club.fr
          </span>
        </div>

        {/* Identité de l'assistant */}
        <div className="mt-6 flex items-center gap-3.5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-ink-900 shadow-sm">
            <PhoneCall size={22} />
          </span>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-ink-900">
              Standard intelligent
            </div>
            <div className="text-[13px] text-smoke">
              répond au nom de votre club
            </div>
          </div>
        </div>

        {/* Bulles de conversation */}
        <div className="mt-6 space-y-2.5">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-mist px-3.5 py-2 text-[13px] leading-relaxed text-ink-800">
            « Bonjour, quel tarif pour ma fille de 10 ans ? »
          </div>
          <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-gold/25 bg-gold-soft px-3.5 py-2 text-[13px] font-medium leading-relaxed text-ink-900">
            Pour les 8-11 ans, la formule Loisir est à 240 € l'année. Je vous
            explique l'inscription ?
          </div>
        </div>

        {/* Onde vocale + minuteur */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <div className="flex items-end gap-1" aria-hidden>
            {[10, 18, 26, 14, 22, 12, 20, 28, 16].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-gold"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <span className="font-display text-[13px] font-semibold tabular-nums text-smoke">
            00:41
          </span>
        </div>
      </div>
    </div>
  );
}
