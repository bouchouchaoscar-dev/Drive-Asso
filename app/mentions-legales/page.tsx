import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/Legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site DriveAsso : éditeur, directeur de la publication, hébergeur et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: "Mentions légales · DriveAsso",
    description: "Informations légales relatives au site www.drive-asso.fr.",
    url: "https://www.drive-asso.fr/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      updated="8 juillet 2026"
    >
      <LegalSection title="Éditeur du site">
        <p>
          Le site <strong>www.drive-asso.fr</strong> et la marque{" "}
          <strong>DriveAsso</strong> sont édités par{" "}
          <strong>Oscar Bouchoucha</strong>.
        </p>
        <p>
          Contact :{" "}
          <a
            href="mailto:contact@drive-asso.fr"
            className="link-underline font-semibold text-ink-800"
          >
            contact@drive-asso.fr
          </a>
          .
        </p>
        {/*
          À COMPLÉTER APRÈS IMMATRICULATION (ne pas afficher de placeholder visible) :
          réinsérer ici, en liste, les informations légales de la structure DriveAsso :
            - statut juridique exact (ex. entrepreneur individuel / EURL / SAS…)
            - numéro SIRET
            - adresse postale du siège
            - numéro de TVA intracommunautaire
              (ou « TVA non applicable, article 293 B du CGI » si franchise en base)
        */}
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>
          Le directeur de la publication du site est{" "}
          <strong>Oscar Bouchoucha</strong>, en qualité d&apos;éditeur.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>Le site est hébergé par :</p>
        <ul className="list-none space-y-1.5">
          <li>
            <strong>Vercel Inc.</strong>
          </li>
          <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
          <li>
            Site :{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-semibold text-ink-800"
            >
              vercel.com
            </a>
          </li>
        </ul>
        <p>
          Le nom de domaine <strong>drive-asso.fr</strong> est géré via :
        </p>
        <ul className="list-none space-y-1.5">
          <li>
            <strong>OVH SAS</strong>
          </li>
          <li>2 rue Kellermann, 59100 Roubaix, France</li>
          <li>
            Site :{" "}
            <a
              href="https://www.ovhcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-semibold text-ink-800"
            >
              ovhcloud.com
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des éléments composant le site DriveAsso (structure,
          textes, visuels, logos, charte graphique, maquettes, code) est la
          propriété exclusive de son éditeur, sauf mention contraire, et est
          protégé par le droit de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication ou
          adaptation de tout ou partie de ces éléments, quel que soit le moyen
          ou le procédé utilisé, est interdite sans l&apos;autorisation écrite
          préalable de l&apos;éditeur. Toute exploitation non autorisée est
          susceptible de constituer une contrefaçon au sens des articles L.335-2
          et suivants du Code de la propriété intellectuelle.
        </p>
        <p>
          Les marques et logos de tiers éventuellement présentés à titre
          d&apos;illustration (par exemple ceux de clubs partenaires) restent la
          propriété de leurs détenteurs respectifs et sont utilisés avec leur
          accord.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la
          mise à jour des informations diffusées sur le site, mais ne peut en
          garantir l&apos;exhaustivité ou l&apos;absence totale d&apos;erreur.
          Le site peut contenir des liens vers des sites tiers, sur le contenu
          desquels l&apos;éditeur n&apos;exerce aucun contrôle et décline toute
          responsabilité.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Le traitement des données personnelles collectées via le site est
          détaillé dans notre{" "}
          <a
            href="/confidentialite"
            className="link-underline font-semibold text-ink-800"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative au site ou à ces mentions légales, vous
          pouvez nous écrire à{" "}
          <a
            href="mailto:contact@drive-asso.fr"
            className="link-underline font-semibold text-ink-800"
          >
            contact@drive-asso.fr
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
