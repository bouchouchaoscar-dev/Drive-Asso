"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/content";

type FormState = {
  nom: string;
  club: string;
  email: string;
  telephone: string;
  message: string;
};

const empty: FormState = {
  nom: "",
  club: "",
  email: "",
  telephone: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // ────────────────────────────────────────────────────────────
    // TODO : brancher ici l'envoi réel de la demande de démo.
    // Recommandation : un Route Handler POST /api/contact qui utilise
    // Resend (cf. le produit DriveAsso) pour envoyer le mail à contact@drive-asso.fr.
    //   await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    // Pour l'instant : pas d'envoi réel, on simule la confirmation.
    // ────────────────────────────────────────────────────────────

    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
    setForm(empty);
  }

  return (
    <section id="contact" className="relative scroll-mt-24 bg-paper py-20 sm:py-28">
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Accroche */}
          <div className="lg:pt-4">
            <div data-reveal className="eyebrow mb-4">
              Contact
            </div>
            <h2
              data-reveal
              data-reveal-delay="1"
              className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl"
            >
              Demandez votre démo gratuite.
            </h2>
            <div data-reveal data-reveal-delay="1" className="gold-rule mt-6" />
            <p
              data-reveal
              data-reveal-delay="2"
              className="mt-6 max-w-md text-lg leading-relaxed text-smoke"
            >
              Dites-nous quelques mots sur votre club. On vous montre,
              concrètement, à quoi ressemblerait votre site et votre plateforme
              DriveAsso. Sans engagement.
            </p>

            <a
              data-reveal
              data-reveal-delay="3"
              href={`mailto:${SITE.email}`}
              className="link-underline mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-ink-800"
            >
              <Mail size={16} className="text-gold-600" />
              {SITE.email}
            </a>
          </div>

          {/* Formulaire */}
          <div data-reveal data-reveal-delay="2">
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-line bg-white p-10 text-center shadow-sm">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-soft text-gold-600">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink-900">
                  Demande bien reçue !
                </h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-smoke">
                  Merci pour votre message. Nous revenons vers vous très vite
                  pour organiser votre démo personnalisée.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="link-underline mt-6 font-display text-sm font-semibold text-ink-700"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="nom"
                    label="Votre nom"
                    value={form.nom}
                    onChange={update("nom")}
                    required
                    autoComplete="name"
                  />
                  <Field
                    id="club"
                    label="Nom du club / association"
                    value={form.club}
                    onChange={update("club")}
                    required
                    autoComplete="organization"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    required
                    autoComplete="email"
                  />
                  <Field
                    id="telephone"
                    label="Téléphone"
                    type="tel"
                    value={form.telephone}
                    onChange={update("telephone")}
                    autoComplete="tel"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-display text-[13px] font-semibold text-ink-800"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Parlez-nous de votre club, vos besoins, vos questions…"
                    className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-all placeholder:text-smoke/60 focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    "Envoi en cours…"
                  ) : (
                    <>
                      Demander ma démo gratuite
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>

                <p className="mt-4 text-center text-xs text-smoke">
                  Réponse rapide. Aucune carte bancaire, aucun engagement.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  ...props
}: {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-display text-[13px] font-semibold text-ink-800"
      >
        {label}
        {props.required && <span className="ml-0.5 text-gold-600">*</span>}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-all placeholder:text-smoke/60 focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}
