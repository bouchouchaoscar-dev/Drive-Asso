/* ============================================================
   Contenu éditorial du site DriveAsso — source unique.
   Les fonctionnalités décrites sont TOUTES vérifiées dans le code
   du produit réel (repo Punching Boxe, en production).
   ============================================================ */

export const SITE = {
  name: "DriveAsso",
  baseline: "Gérer. Automatiser. Développer.",
  tagline: "La gestion associative nouvelle génération",
  email: "contact@drive-asso.fr",
  url: "https://www.drive-asso.fr",
};

export const NAV_LINKS = [
  { label: "Accueil", href: "/#hero" },
  { label: "La solution", href: "/#solution" },
  { label: "Pour qui ?", href: "/pour-qui" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Contact", href: "/#contact" },
] as const;

export const CLIENT_REF = {
  name: "Punching Boxe Nogent-Le Perreux",
  url: "https://www.punching-boxe.com",
  shortUrl: "www.punching-boxe.com",
};

/* ---- Les 3 actes (colonne narrative = baseline) ---- */

export type Acte = {
  key: "gerer" | "automatiser" | "developper";
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  message: string;
  bullets: { title: string; text: string }[];
};

export const ACTES: Acte[] = [
  {
    key: "gerer",
    index: "01",
    eyebrow: "L'espace administrateur",
    title: "Gérer",
    lead: "Tout votre club dans un seul tableau de bord.",
    message:
      "Pilotez tout votre club depuis un seul espace, même avec des centaines d'adhérents.",
    bullets: [
      {
        title: "Tableau de bord clair",
        text: "Vos chiffres clés en un coup d'œil : effectifs, encaissements, inscriptions.",
      },
      {
        title: "Suivi des paiements en temps réel",
        text: "Suivi des dossiers et des paiements en temps réel, échéance par échéance.",
      },
      {
        title: "Fiche adhérent détaillée",
        text: "Coordonnées, photo, foyer rattaché et historique des saisons. Une base qui s'enrichit année après année.",
      },
      {
        title: "Listes intelligentes",
        text: "Segmentez vos adhérents automatiquement (par formule, statut, dossier, ancienneté…).",
      },
      {
        title: "Validation des pièces",
        text: "Acceptez ou refusez chaque document avec un motif. L'adhérent est prévenu automatiquement.",
      },
      {
        title: "Remboursements & clôtures",
        text: "Remboursements partiels ou totaux, clôture d'une inscription et arrêt des échéances d'un paiement fractionné, directement depuis l'interface.",
      },
      {
        title: "Export Excel / CSV",
        text: "Récupérez vos listes filtrées en un clic, pour vos démarches ou votre comptabilité.",
      },
    ],
  },
  {
    key: "automatiser",
    index: "02",
    eyebrow: "L'espace adhérent & les automatisations",
    title: "Automatiser",
    lead: "Vos adhérents s'inscrivent et paient seuls.",
    message: "Vos adhérents s'inscrivent et paient seuls. Le système travaille pour vous.",
    bullets: [
      {
        title: "Inscription 100 % digitale",
        text: "Un parcours multi-étapes clair, réalisable depuis un téléphone en quelques minutes.",
      },
      {
        title: "Documents signés en ligne",
        text: "Fiche d'inscription et règlement intérieur générés automatiquement, lus puis signés directement à l'écran.",
      },
      {
        title: "Photo & certificat médical",
        text: "Upload et recadrage de la photo, dépôt du certificat médical et autorisation parentale pour les mineurs.",
      },
      {
        title: "Un compte, toute la famille",
        text: "Depuis un seul espace, un parent inscrit plusieurs membres de sa famille. Tout se gère au même endroit : dossiers, documents, paiements, messages.",
      },
      {
        title: "Tarifs sur-mesure",
        text: "Tarifs jeunes/adultes, dégressifs selon la date d'inscription, options, réductions familiales : votre grille est reproduite fidèlement et le prix se calcule automatiquement au moment du paiement.",
      },
      {
        title: "Paiement en autonomie",
        text: "Carte, Apple Pay, Google Pay ou espèces. Paiement en 1 fois ou fractionné 2, 3, 4×.",
      },
      {
        title: "Prélèvements",
        text: "Les échéances du paiement fractionné sont prélevées toutes seules, aux dates prévues.",
      },
      {
        title: "Relances automatiques",
        text: "Confirmation, dossier validé, relance du panier abandonné ou d'un prélèvement échoué : tout part sans que vous y pensiez.",
      },
      {
        title: "Planifiez vos campagnes",
        text: "Préparez vos campagnes d'information à l'avance : en 10 minutes, programmez les annonces de vacances de toute l'année, et vos adhérents restent informés sans que vous y repensiez.",
      },
    ],
  },
  {
    key: "developper",
    index: "03",
    eyebrow: "Le pilier croissance",
    title: "Développer",
    lead: "Ne vous contentez pas de gérer : faites grandir votre club.",
    message: "Ne vous contentez pas de gérer votre club : faites-le grandir.",
    bullets: [
      {
        title: "Un site à votre image",
        text: "Un site vitrine sur-mesure, au design soigné, du niveau de ce que seules les grandes structures peuvent habituellement s'offrir. Une image professionnelle qui inspire confiance dès le premier regard.",
      },
      {
        title: "Référencement optimisé",
        text: "Votre site est conçu selon les bonnes pratiques du référencement naturel (structure technique, balises, performance, indexation). Un travail de qualité professionnelle qui aide votre club à remonter dans les résultats Google quand un futur adhérent cherche près de chez lui.",
      },
      {
        title: "Une vitrine qui convertit",
        text: "Grâce au parcours d'inscription fluide et sans friction, les visiteurs de passage s'inscrivent immédiatement. La visibilité se transforme en adhérents.",
      },
      {
        title: "Reconquérez vos anciens",
        text: "Un outil de mailing pensé pour relancer vos anciens adhérents, classés intelligemment, avec des modèles de mails déjà prêts adaptés à chaque profil. En quelques clics, vous relancez vos anciens et récupérez du chiffre d'affaires.",
      },
    ],
  },
];

/* ---- Comparatif DriveAsso vs plateforme mutualisée ---- */

export const COMPARATIF = {
  rows: [
    {
      axis: "Ce que vous avez",
      driveasso: "Votre propre plateforme complète, à vous",
      autres: "Une simple page parmi des milliers, sur la plateforme de quelqu'un d'autre",
    },
    {
      axis: "Identité & domaine",
      driveasso: "Votre nom de domaine et vos couleurs, partout",
      autres: "Une adresse et un habillage partagés, à leur image",
    },
    {
      axis: "Parcours d'inscription",
      driveasso: "Inscription complète : documents signés, paiement, famille",
      autres: "Formulaire générique, souvent limité",
    },
    {
      axis: "Mailing",
      driveasso: "Outil de mailing intelligent intégré, à votre image",
      autres: "Mailing basique ou en option payante",
    },
    {
      axis: "Sur-mesure",
      driveasso: "Conçu pour votre club, ses formules, ses règles",
      autres: "Le même gabarit pour tous les clubs",
    },
    {
      axis: "Le prix dans le temps",
      driveasso: "Un tarif fixe, qui ne bouge jamais, quel que soit votre nombre d'adhérents",
      autres: "Un coût qui grimpe à mesure que votre club grandit",
    },
    {
      axis: "Propriété",
      driveasso: "La plateforme vous appartient",
      autres: "Vous restez locataire de la leur",
    },
  ],
};
