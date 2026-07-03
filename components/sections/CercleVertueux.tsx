import { Container } from "@/components/ui/Container";

/**
 * Encart de transition « cercle vertueux ».
 * Placé après le comparatif et juste avant la section coût, comme respiration
 * positive avant l'annonce du budget. Pas de padding vertical propre : l'espace
 * provient des sections voisines (rythme homogène).
 */
export function CercleVertueux() {
  return (
    <section className="bg-paper section-y">
      <Container>
        <div
          data-reveal
          className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-8 text-center shadow-sm sm:p-10"
        >
          <div className="eyebrow mb-4 flex items-center justify-center">
            Un cercle vertueux
          </div>
          <p className="text-lg leading-relaxed text-ink-700">
            Un beau site donne envie. Un parcours fluide transforme cette envie
            en inscriptions. Et le développement attire toujours plus
            d'adhérents.
          </p>
          <p className="mt-5 font-display text-lg font-semibold text-ink-900 sm:text-xl">
            Un cercle vertueux complet pour gérer, automatiser et développer
            votre club.
          </p>
        </div>
      </Container>
    </section>
  );
}
