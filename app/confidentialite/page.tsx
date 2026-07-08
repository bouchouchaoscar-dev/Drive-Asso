import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/Legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de DriveAsso : données collectées via le formulaire de contact, finalités, base légale, durée de conservation, sous-traitants et vos droits RGPD.",
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    title: "Politique de confidentialité · DriveAsso",
    description:
      "Comment DriveAsso collecte et protège vos données personnelles, conformément au RGPD.",
    url: "https://www.drive-asso.fr/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      eyebrow="Vos données"
      title="Politique de confidentialité"
      updated="8 juillet 2026"
    >
      <LegalSection title="Préambule">
        <p>
          La présente politique décrit la manière dont DriveAsso collecte,
          utilise et protège les données personnelles des visiteurs du site{" "}
          <strong>www.drive-asso.fr</strong>, conformément au Règlement général
          sur la protection des données (RGPD) et à la loi française
          « Informatique et Libertés ».
        </p>
      </LegalSection>

      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement des données est{" "}
          <strong>Oscar Bouchoucha</strong>, éditeur du site DriveAsso. Pour
          toute question relative à vos données, vous pouvez le contacter à{" "}
          <a
            href="mailto:contact@drive-asso.fr"
            className="link-underline font-semibold text-ink-800"
          >
            contact@drive-asso.fr
          </a>
          .
        </p>
        {/*
          À COMPLÉTER APRÈS IMMATRICULATION : ajouter ici le statut juridique et
          l'adresse postale du responsable de traitement (cohérent avec la page
          Mentions légales). Ne pas afficher de placeholder visible entre-temps.
        */}
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Le site ne collecte des données que lorsque vous remplissez
          volontairement le <strong>formulaire de contact</strong>. Les données
          suivantes sont alors recueillies :
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>votre nom ;</li>
          <li>le nom de votre club ou association ;</li>
          <li>votre adresse email ;</li>
          <li>votre numéro de téléphone ;</li>
          <li>le contenu de votre message (facultatif).</li>
        </ul>
        <p>
          Aucune donnée n&apos;est collectée à votre insu et le site n&apos;a
          recours à aucun outil de suivi ou de profilage (voir la section{" "}
          <em>Cookies</em> ci-dessous).
        </p>
      </LegalSection>

      <LegalSection title="Finalités du traitement">
        <p>Vos données sont utilisées exclusivement pour :</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            répondre à votre demande de démonstration ou de contact et échanger
            avec vous à son sujet ;
          </li>
          <li>
            le cas échéant, préparer une proposition de prestation adaptée à
            votre structure.
          </li>
        </ul>
        <p>
          Vos données ne font l&apos;objet d&apos;aucune vente, location ou
          cession à des tiers à des fins commerciales.
        </p>
      </LegalSection>

      <LegalSection title="Base légale">
        <p>
          Le traitement repose sur votre <strong>consentement</strong> (envoi
          volontaire du formulaire) ainsi que sur l&apos;
          <strong>intérêt légitime</strong> de DriveAsso à répondre aux demandes
          qui lui sont adressées et, le cas échéant, sur l&apos;exécution de{" "}
          <strong>mesures précontractuelles</strong> prises à votre demande
          (article 6 du RGPD).
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Vos données sont conservées le temps nécessaire au traitement de votre
          demande, puis pendant une durée maximale de <strong>3 ans</strong> à
          compter de notre dernier contact, à des fins de suivi de la relation. À
          l&apos;issue de cette période, elles sont supprimées. Vous pouvez à tout moment demander
          leur suppression anticipée (voir « Vos droits »).
        </p>
      </LegalSection>

      <LegalSection title="Destinataires et sous-traitants">
        <p>
          Vos données sont destinées uniquement à DriveAsso (Oscar Bouchoucha).
          Pour faire fonctionner le site et traiter votre demande, nous faisons
          appel à des prestataires techniques agissant en qualité de
          sous-traitants :
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Resend</strong> (Resend, Inc.) : acheminement des emails
            issus du formulaire de contact vers notre boîte de réception ;
          </li>
          <li>
            <strong>Vercel</strong> (Vercel Inc.) : hébergement du site et
            exécution du formulaire.
          </li>
        </ul>
        <p>
          Ces prestataires étant situés aux États-Unis, un transfert de données
          hors de l&apos;Union européenne peut avoir lieu. Il est encadré par
          des garanties appropriées (clauses contractuelles types de la
          Commission européenne et/ou certification équivalente), conformément
          au RGPD.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez des droits suivants sur vos
          données : droit d&apos;<strong>accès</strong>, de{" "}
          <strong>rectification</strong>, d&apos;<strong>effacement</strong>,
          d&apos;<strong>opposition</strong>, de <strong>limitation</strong> du
          traitement et de <strong>portabilité</strong>.
        </p>
        <p>
          Pour exercer ces droits, il vous suffit de nous écrire à{" "}
          <a
            href="mailto:contact@drive-asso.fr"
            className="link-underline font-semibold text-ink-800"
          >
            contact@drive-asso.fr
          </a>
          . Nous vous répondrons dans les meilleurs délais et au plus tard dans
          un délai d&apos;un mois.
        </p>
      </LegalSection>

      <LegalSection title="Réclamation auprès de la CNIL">
        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont
          pas respectés, vous pouvez adresser une réclamation à la Commission
          nationale de l&apos;informatique et des libertés (CNIL) :{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-semibold text-ink-800"
          >
            www.cnil.fr
          </a>{" "}
          — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Le site DriveAsso <strong>n&apos;utilise aucun cookie de suivi</strong>{" "}
          (pas de Google Analytics, pas de pixel publicitaire, pas d&apos;outil
          de mesure d&apos;audience tiers) et ne procède à aucun profilage.
        </p>
        <p>
          Les polices de caractères sont hébergées directement sur notre domaine
          (aucun appel à un service tiers), et le formulaire de contact ne
          dépose pas de cookie. Aucun cookie non essentiel n&apos;étant utilisé,
          aucun bandeau de consentement n&apos;est nécessaire. Si cette
          situation venait à évoluer (par exemple l&apos;ajout d&apos;un outil de
          mesure d&apos;audience), cette politique serait mise à jour et votre
          consentement serait recueilli au préalable.
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles
          appropriées pour protéger vos données contre tout accès, altération ou
          divulgation non autorisés. Les échanges avec le site sont chiffrés
          (HTTPS).
        </p>
      </LegalSection>

      <LegalSection title="Modification de la politique">
        <p>
          La présente politique peut être mise à jour à tout moment pour refléter
          les évolutions du site ou de la réglementation. La date de dernière
          mise à jour figure en haut de cette page.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
