import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealInit } from "@/components/ui/RevealInit";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FaqAccordion, type FaqItem } from "@/components/sections/FaqAccordion";
import { ArrowRight } from "lucide-react";

const SITE_URL = "https://www.drive-asso.fr";

export const metadata: Metadata = {
  title: "FAQ : logiciel de gestion et site pour club et association",
  description:
    "Toutes les réponses sur DriveAsso : inscription en ligne des adhérents, paiement des cotisations, documents et gestion de votre club ou association sportive.",
  keywords: [
    "FAQ logiciel gestion association",
    "comment gérer les inscriptions d'un club",
    "logiciel gestion club sportif",
    "inscription en ligne association",
    "paiement cotisation en ligne",
    "logiciel association loi 1901",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ : logiciel de gestion et site pour club et association",
    description:
      "Les réponses aux questions les plus fréquentes sur DriveAsso : inscription en ligne, paiement des cotisations, gestion des adhérents et mise en place.",
    url: `${SITE_URL}/faq`,
  },
};

/* ---- Les 17 questions, en 4 blocs thématiques ---- */
type FaqBlock = { title: string; items: FaqItem[] };

const FAQ_BLOCKS: FaqBlock[] = [
  {
    title: "Comprendre DriveAsso",
    items: [
      {
        q: "Qu'est-ce que DriveAsso ?",
        a: "DriveAsso, c'est la gestion associative nouvelle génération : un site vitrine sur-mesure aux couleurs de votre club, doublé d'une plateforme complète où tout se pilote. Vos adhérents s'inscrivent et paient en ligne en autonomie, et vous gérez l'ensemble depuis un seul espace administrateur. Bien plus qu'un logiciel de gestion : une plateforme qui vous appartient.",
      },
      {
        q: "En quoi DriveAsso est-il différent d'un logiciel de gestion classique ou d'une plateforme mutualisée ?",
        a: "Une plateforme mutualisée loge votre club sur un outil partagé avec des milliers d'autres structures : vous n'êtes qu'une page parmi d'autres, sur la plateforme de quelqu'un d'autre. DriveAsso prend le chemin inverse : nous concevons votre propre site sur-mesure, à votre nom de domaine et à vos couleurs, qui devient votre propriété. Vous avez une plateforme rien qu'à vous, pensée pour vos formules et vos règles.",
      },
      {
        q: "À qui s'adresse DriveAsso ?",
        a: "DriveAsso est pensé pour les clubs et associations sportives (boxe, judo, football, tennis, danse, arts martiaux…) et plus largement pour les associations loi 1901 qui gèrent des adhérents, des inscriptions et des paiements chaque saison. Que vous ayez quelques dizaines ou plusieurs centaines de membres, la solution s'adapte à votre structure.",
      },
      {
        q: "DriveAsso, est-ce un site internet ou un logiciel de gestion ?",
        a: "Les deux, réunis. Votre site vitrine public et votre plateforme de gestion ne font qu'un : la même adresse sert à présenter le club et à tout gérer en coulisses. Bien plus qu'un logiciel de gestion : votre site vitrine et votre outil d'administration vivent au même endroit, cohérents dès le premier clic.",
      },
    ],
  },
  {
    title: "Fonctionnement",
    items: [
      {
        q: "Comment fonctionne l'inscription en ligne des adhérents ?",
        a: "Vos adhérents s'inscrivent en quelques minutes depuis un ordinateur ou un smartphone, via un parcours guidé étape par étape. Ils choisissent leur formule, remplissent leurs informations, déposent leurs documents et règlent leur cotisation en ligne. Tout se déroule en autonomie totale, sans aucune intervention de votre part.",
      },
      {
        q: "Peut-on gérer les paiements, cotisations et adhésions en ligne ?",
        a: "Oui. Le paiement en ligne des cotisations et adhésions se fait par carte, Apple Pay, Google Pay ou en espèces si vous le souhaitez. Vos adhérents peuvent régler en une fois ou de façon fractionnée en 2, 3 ou 4×, et les échéances sont prélevées automatiquement aux dates prévues. Les tarifs (jeunes/adultes, réductions familiales, options) se calculent tout seuls au moment du paiement.",
      },
      {
        q: "Comment sont gérés les documents comme le certificat médical ou l'autorisation parentale ?",
        a: "La fiche d'inscription et le règlement intérieur sont générés automatiquement, lus puis signés directement à l'écran. L'adhérent dépose son certificat médical, sa photo et, pour les mineurs, l'autorisation parentale. Côté club, vous validez ou refusez chaque pièce avec un motif, et l'adhérent est prévenu automatiquement.",
      },
      {
        q: "Peut-on gérer plusieurs membres d'une même famille ?",
        a: "Oui. Depuis un seul compte, un parent inscrit et gère plusieurs membres de sa famille. Dossiers, documents, paiements et messages sont regroupés au même endroit, ce qui simplifie la vie des familles comme celle du club.",
      },
      {
        q: "Que peut-on faire depuis l'espace administrateur ?",
        a: "L'espace administrateur est le poste de pilotage du club : tableau de bord des effectifs et des encaissements, suivi des paiements en temps réel, fiches adhérents détaillées, listes intelligentes filtrées automatiquement, validation des pièces, remboursements et clôtures, export Excel ou CSV. Toute la gestion des adhérents est centralisée en un seul endroit.",
      },
      {
        q: "Peut-on communiquer avec ses adhérents et relancer les anciens ?",
        a: "Oui, un outil de mailing est intégré à la plateforme. Vous envoyez des campagnes à vos adhérents, programmez vos annonces à l'avance et relancez vos anciens membres à partir de listes classées intelligemment, avec des modèles de mails déjà prêts. De quoi entretenir le lien et récupérer du chiffre d'affaires sans effort.",
      },
      {
        q: "Le site est-il adapté au mobile ?",
        a: "Entièrement. Le site et le parcours d'inscription sont conçus en mobile-first : vos adhérents s'inscrivent et paient confortablement depuis leur téléphone, et vous pilotez votre club où que vous soyez. L'affichage s'adapte à tous les écrans.",
      },
    ],
  },
  {
    title: "Standard téléphonique",
    items: [
      {
        q: "Qu'est-ce que le standard téléphonique intelligent ?",
        a: "C'est un accueil téléphonique automatisé qui répond aux appels de votre club à votre place, 24h/24 et 7j/7. Plutôt qu'un serveur vocal à touches, il tient une vraie conversation : il comprend la demande de l'appelant, présente vos formules, cherche des disponibilités, oriente vers votre site. L'objectif est simple : que vos appelants soient toujours bien accueillis, même quand personne n'est disponible pour décrocher.",
      },
      {
        q: "Est-ce que c'est une intelligence artificielle ? Est-ce qu'on entend que c'est un robot ?",
        a: "Oui, il s'appuie sur des modèles d'intelligence artificielle avancés, et c'est précisément ce qui lui permet de comprendre, de raisonner et de répondre naturellement, au cas par cas, plutôt que de réciter un script figé. La voix est fluide, le ton chaleureux, et l'assistant s'adapte à chaque échange pour se rapprocher au maximum d'une conversation humaine. La plupart des appelants ont simplement l'impression d'être bien renseignés, rapidement. Par transparence, l'assistant se présente comme un assistant automatique en début d'appel.",
      },
      {
        q: "Que peut-il faire concrètement ?",
        a: "Il gère l'accueil courant de votre club : renseigner sur les horaires, les formules et les tarifs, expliquer comment s'inscrire ou réserver, orienter l'appelant vers votre site pour agir. Pour un club avec réservation de créneaux, il peut consulter les disponibilités en temps réel et indiquer ce qui est libre. Et lorsqu'une demande dépasse son champ, il ne s'arrête pas là : il prend le message et le transmet au club (voir plus bas).",
      },
      {
        q: "Qu'est-ce qu'il ne fait pas ?",
        a: "Il informe et oriente, mais il ne prend jamais de décision à la place d'un humain et n'encaisse aucun paiement au téléphone. Sur les sujets sensibles (une réclamation, une demande qui engage le club, une situation particulière), il ne cherche pas à trancher de lui-même. C'est un choix volontaire : l'assistant soulage vos bénévoles de l'accueil courant, il ne se substitue pas à eux sur ce qui compte vraiment.",
      },
      {
        q: "Que se passe-t-il s'il ne sait pas répondre à une question ?",
        a: "Il n'invente jamais de réponse. S'il ne dispose pas de l'information, ou si la demande relève d'une personne du club, il prend les coordonnées de l'appelant et le motif de son appel, puis transmet le tout au club par e-mail, accompagné d'un résumé de la conversation. Un bénévole peut ainsi rappeler la personne, déjà informé du contexte, au moment qui lui convient. Vous n'êtes sollicité que pour les appels qui le méritent vraiment.",
      },
      {
        q: "Est-ce que ça remplace nos bénévoles ?",
        a: "Non. L'idée n'est pas de remplacer l'humain, mais de le libérer. Vos bénévoles ne peuvent pas être au téléphone en permanence, et ce n'est pas leur rôle. L'assistant prend en charge les appels courants et répétitifs (horaires, tarifs, « comment s'inscrire »), à toute heure, y compris quand le club est fermé. Vos bénévoles se concentrent alors sur ce qui a vraiment de la valeur : la vie du club, l'accueil sur place, la relation avec les adhérents.",
      },
      {
        q: "Faut-il changer de numéro de téléphone ?",
        a: "Non, pas nécessairement. Nous pouvons mettre en place un nouveau numéro dédié, ou travailler avec votre numéro actuel selon votre configuration. Nous voyons ensemble la solution la plus adaptée à votre club au moment de la mise en place.",
      },
      {
        q: "Fonctionne-t-il vraiment à toute heure et pour plusieurs appels à la fois ?",
        a: "Oui. L'assistant répond 24h/24, 7j/7, y compris les soirs, week-ends et jours fériés. Et il peut prendre plusieurs appels simultanément : même un jour de forte affluence où tout le monde appelle en même temps, chacun obtient une réponse immédiate, sans ligne occupée ni file d'attente.",
      },
      {
        q: "Le standard est-il inclus dans l'offre, ou faut-il le prendre en plus ?",
        a: "C'est une option libre. Votre plateforme DriveAsso (votre site, l'espace adhérent, l'espace administrateur, les inscriptions et paiements en ligne, la réservation, l'outil de mailing) constitue déjà un socle complet pour gérer votre club au quotidien, et fonctionne parfaitement sans le standard. Le standard téléphonique intelligent vient se greffer par-dessus, pour les clubs qui veulent aller plus loin et passer véritablement en pilote automatique jusqu'aux appels entrants. Vous êtes libre de l'inclure ou non, selon les besoins de votre club.",
      },
    ],
  },
  {
    title: "Budget & engagement",
    items: [
      {
        q: "Combien coûte DriveAsso ?",
        a: "DriveAsso se règle en deux temps : un investissement unique au départ pour la conception de votre site sur-mesure, qui devient la propriété du club, puis un abonnement mensuel qui fait vivre la plateforme toute l'année (hébergement, paiements, base de données, outil de mailing, mises à jour, sécurité et accompagnement). Le budget s'adapte à la taille de votre structure. Le plus simple : demandez une démo gratuite pour un devis personnalisé.",
      },
      {
        q: "Le site m'appartient-il vraiment ?",
        a: "Oui, et c'est un différenciant fort. Le site conçu pour votre club devient votre propriété, à votre nom de domaine et à vos couleurs. Vous n'êtes pas locataire d'une plateforme partagée : vous possédez la vôtre. L'abonnement sert uniquement à la faire vivre (hébergement, paiements, maintenance, accompagnement).",
      },
    ],
  },
  {
    title: "Se lancer",
    items: [
      {
        q: "Combien de temps faut-il pour mettre en place mon site et ma plateforme ?",
        a: "Le déploiement dépend de votre projet, mais l'objectif est toujours d'être prêt pour votre période d'inscriptions. Nous prenons en charge la conception du site et la mise en place de la plateforme ; de votre côté, il suffit de nous transmettre vos informations (formules, tarifs, contenus) et nous nous occupons du reste.",
      },
      {
        q: "Dois-je être à l'aise avec la technique pour utiliser DriveAsso ?",
        a: "Pas du tout. Nous concevons et paramétrons tout pour vous, et l'espace administrateur est pensé pour être simple à prendre en main. Pour une annonce, un changement de tarif ou une question, il suffit de nous écrire : l'accompagnement fait partie de l'abonnement.",
      },
      {
        q: "Comment obtenir une démo ?",
        a: "Rien de plus simple : remplissez le formulaire de contact et nous revenons vers vous rapidement pour organiser une démo gratuite et personnalisée. Nous vous montrons concrètement à quoi ressembleraient votre site et votre plateforme, sans engagement.",
      },
    ],
  },
];

/* Données structurées — FAQPage (fort impact SERP) */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_BLOCKS.flatMap((block) =>
    block.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

/* Fil d'Ariane — BreadcrumbList (Accueil › FAQ) */
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
  ],
};

const TONES = ["paper", "paper-2"] as const;

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero de page */}
        <section className="relative overflow-hidden bg-paper pt-28 sm:pt-36 section-y-b">
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-rise eyebrow mb-4">FAQ</div>
              <h1
                className="animate-rise text-4xl font-extrabold leading-[1.1] text-ink-900 sm:text-5xl"
                style={{ animationDelay: "0.08s" }}
              >
                Questions fréquentes sur{" "}
                <span className="relative inline-block">
                  DriveAsso
                  <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-gold/70" />
                </span>
                .
              </h1>
              <p
                className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-smoke"
                style={{ animationDelay: "0.16s" }}
              >
                Tout ce qu'un dirigeant de club ou d'association se demande avant
                de se lancer : le fonctionnement, les inscriptions en ligne, les
                paiements, le budget et la mise en place. Une réponse manque ?
                Écrivez-nous.
              </p>
            </div>
          </Container>
        </section>

        {/* Les 4 blocs de questions */}
        {FAQ_BLOCKS.map((block, i) => (
          <Section key={block.title} tone={TONES[i % 2]}>
            <div className="mx-auto max-w-3xl">
              <h2
                data-reveal
                className="text-2xl font-extrabold leading-tight text-ink-900 sm:text-3xl"
              >
                {block.title}
              </h2>
              <div data-reveal data-reveal-delay="1" className="gold-rule mt-5" />
              <FaqAccordion
                items={block.items}
                idPrefix={`faq-${i}`}
              />
            </div>
          </Section>
        ))}

        {/* CTA final */}
        <Section tone="paper-2">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
              Vous avez d'autres{" "}
              <span className="relative inline-block">
                questions
                <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-gold/70" />
              </span>{" "}
              ?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-smoke">
              Posez-les-nous directement. On vous répond et on vous montre
              concrètement à quoi ressemblerait votre club sur DriveAsso.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/#contact" size="lg">
                Demandez votre démo gratuite
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
