import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealInit } from "@/components/ui/RevealInit";
import { Container } from "@/components/ui/Container";

/** Gabarit commun des pages légales : hero sobre + colonne de texte lisible. */
export function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-paper pt-28 sm:pt-36">
          <Container className="relative">
            <div className="mx-auto max-w-3xl">
              <div className="animate-rise eyebrow mb-4">{eyebrow}</div>
              <h1
                className="animate-rise text-4xl font-extrabold leading-[1.1] text-ink-900 sm:text-5xl"
                style={{ animationDelay: "0.08s" }}
              >
                {title}
              </h1>
              {updated && (
                <p
                  className="animate-rise mt-5 text-sm text-smoke"
                  style={{ animationDelay: "0.16s" }}
                >
                  Dernière mise à jour : {updated}
                </p>
              )}
              <div
                className="animate-rise gold-rule mt-6"
                style={{ animationDelay: "0.16s" }}
              />
            </div>
          </Container>
        </section>

        <section className="bg-paper section-y">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10">{children}</div>
          </Container>
        </section>
      </main>
      <Footer />
      <RevealInit />
    </>
  );
}

/** Bloc de section légale : titre H2 + contenu. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section data-reveal>
      <h2 className="font-display text-xl font-bold text-ink-900 sm:text-[1.35rem]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-smoke">
        {children}
      </div>
    </section>
  );
}
