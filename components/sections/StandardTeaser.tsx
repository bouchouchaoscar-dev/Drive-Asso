import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneCall, ArrowRight } from "lucide-react";

/**
 * Teaser home : présente le standard téléphonique intelligent comme le
 * couronnement de la plateforme et renvoie vers /standard-telephonique.
 * Panneau BLANC (cohérent avec le reste de la home) + accents dorés discrets
 * (eyebrow doré, liseré doré en haut, icône dorée) comme signal « nouveau ».
 */
export function StandardTeaser() {
  return (
    <section className="bg-paper section-y">
      <Container>
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-line bg-white px-7 py-10 shadow-sm ring-1 ring-gold/10 sm:px-10 sm:py-12"
        >
          {/* fin liseré doré en haut (accent discret « nouveau ») */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold to-gold-600"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_auto] lg:gap-12">
            <div className="max-w-xl">
              <div className="eyebrow mb-4">
                Nouveau — Standard téléphonique intelligent
              </div>
              <h2 className="text-2xl font-extrabold leading-tight text-ink-900 sm:text-3xl md:text-[2.1rem]">
                Et si votre club répondait au téléphone, même la nuit ?
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-smoke sm:text-base">
                En plus de gérer les inscriptions et les réservations, votre
                plateforme peut désormais accueillir vos appelants. Un standard
                téléphonique intelligent qui répond à votre place, 24h/24,
                comprend chaque demande et oriente vers votre site. Vos bénévoles
                soufflent, votre club ne rate plus un appel.
              </p>
              <Link
                href="/standard-telephonique"
                className="link-underline mt-7 inline-flex items-center gap-2 font-display text-sm font-semibold text-ink-800"
              >
                Découvrir le standard intelligent
                <ArrowRight size={16} className="text-gold-600" />
              </Link>
            </div>

            {/* Accent visuel : combiné doré, cohérent avec les puces du site */}
            <div className="hidden shrink-0 lg:block" aria-hidden>
              <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gold-soft text-gold-600 ring-1 ring-gold/20">
                <PhoneCall size={44} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
