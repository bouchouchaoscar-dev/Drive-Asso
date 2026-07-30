import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneCall, ArrowRight } from "lucide-react";

/**
 * Teaser home : présente le standard téléphonique intelligent comme le
 * couronnement de la plateforme et renvoie vers /standard-telephonique.
 * Panneau anthracite pour trancher entre deux sections claires (signal « nouveau »).
 */
export function StandardTeaser() {
  return (
    <section className="bg-paper section-y">
      <Container>
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-ink-900 px-7 py-10 text-white sm:px-10 sm:py-12"
        >
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_auto] lg:gap-12">
            <div className="max-w-xl">
              <div className="eyebrow mb-4 !text-gold">
                Nouveau — Standard téléphonique intelligent
              </div>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-[2.1rem]">
                Et si votre club répondait au téléphone, même la nuit ?
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/70 sm:text-base">
                En plus de gérer les inscriptions et les réservations, votre
                plateforme peut désormais accueillir vos appelants. Un standard
                téléphonique intelligent qui répond à votre place, 24h/24,
                comprend chaque demande et oriente vers votre site. Vos bénévoles
                soufflent, votre club ne rate plus un appel.
              </p>
              <Link
                href="/standard-telephonique"
                className="link-underline mt-7 inline-flex items-center gap-2 font-display text-sm font-semibold text-white"
              >
                Découvrir le standard intelligent
                <ArrowRight size={16} className="text-gold" />
              </Link>
            </div>

            {/* Accent visuel : combiné dans un halo doré */}
            <div className="hidden shrink-0 lg:block" aria-hidden>
              <div className="grid h-28 w-28 place-items-center rounded-3xl bg-gold text-ink-900 shadow-[0_20px_50px_-15px_rgba(212,160,23,0.6)]">
                <PhoneCall size={48} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
