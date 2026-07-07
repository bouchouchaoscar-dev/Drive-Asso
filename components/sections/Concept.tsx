import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Globe, LayoutDashboard, UserPlus, Link2, ArrowRight } from "lucide-react";

const piliers = [
  {
    icon: Globe,
    title: "La vitrine publique",
    text: "Un site pro à l'identité forte de votre club : activités, équipe, horaires. La première impression qui inspire confiance.",
  },
  {
    icon: LayoutDashboard,
    title: "L'espace administrateur",
    text: "Le poste de pilotage du club : gestion des adhérents, paiements, documents, mailing. Tout y est centralisé.",
  },
  {
    icon: UserPlus,
    title: "L'espace adhérent",
    text: "Là où vos membres s'inscrivent, paient et suivent leur dossier, en toute autonomie.",
  },
];

export function Concept() {
  return (
    <Section id="concept" tone="paper">
      <SectionHeading
        align="center"
        eyebrow="Le concept"
        title={
          <>
            Une vitrine devant.
            <br />
            <span className="text-ink-700">Une plateforme derrière.</span>
          </>
        }
        intro="Bien plus qu'un logiciel de gestion : votre vitrine publique est aussi la plateforme sur-mesure où tout se gère et où vos adhérents s'inscrivent en ligne. Un seul système, cohérent et fluide dès le premier clic."
      />

      {/* Indicateur d'unité : une seule adresse */}
      <div
        data-reveal
        className="mx-auto mt-12 flex w-fit items-center gap-2 rounded-full border border-line bg-white px-4 py-2 shadow-xs"
      >
        <Link2 size={15} className="text-gold-600" />
        <span className="font-display text-sm font-semibold text-ink-800">
          votre-club.fr
        </span>
      </div>

      {/* Connecteur vertical : simple filet gris neutre */}
      <div aria-hidden className="mx-auto h-10 w-px bg-line" />

      {/* Les 3 piliers */}
      <div className="grid gap-5 md:grid-cols-3">
        {piliers.map((p, i) => (
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

      {/* Lien contextuel vers la page cible (maillage interne) */}
      <div data-reveal className="mt-10 text-center">
        <Link
          href="/pour-qui"
          className="link-underline inline-flex items-center gap-1.5 font-display text-sm font-semibold text-ink-800"
        >
          Un outil pensé pour les clubs et associations sportives
          <ArrowRight size={16} className="text-gold-600" />
        </Link>
      </div>
    </Section>
  );
}
