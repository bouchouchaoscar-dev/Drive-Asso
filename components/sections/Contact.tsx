"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/cn";

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
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Anti-bot : honeypot (champ invisible) + time-trap (durée de remplissage).
  const [website, setWebsite] = useState("");
  const formLoadedAt = useRef<number>(0);
  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [field]: value }));
      // efface l'erreur du champ dès que l'utilisateur le corrige
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  function validate(f: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!f.nom.trim()) e.nom = "Merci d'indiquer votre nom.";
    if (!f.club.trim()) e.club = "Merci d'indiquer le nom de votre club.";
    if (!f.email.trim()) e.email = "Merci d'indiquer votre email.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim()))
      e.email = "Email invalide.";
    if (!f.telephone.trim())
      e.telephone = "Merci d'indiquer votre numéro de téléphone.";
    else if (
      f.telephone.replace(/\D/g, "").length < 6 ||
      !/^[+()\d\s.\-]+$/.test(f.telephone.trim())
    )
      e.telephone = "Numéro de téléphone invalide.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    // Le formulaire refuse l'envoi tant qu'un champ requis manque
    // (dont le téléphone, désormais obligatoire).
    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website, // honeypot
          formLoadedAt: formLoadedAt.current, // time-trap
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      setSubmitting(false);
      setSent(true);
      setForm(empty);
    } catch {
      setSubmitting(false);
      setSubmitError(
        `L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous directement à ${SITE.email}.`
      );
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 bg-paper section-y">
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
                  Demande envoyée !
                </h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-smoke">
                  Votre demande a bien été envoyée, nous vous recontactons
                  rapidement pour organiser votre démo personnalisée.
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
                {/* Honeypot anti-bot : invisible pour l'humain, ignoré au clavier. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="nom"
                    label="Votre nom"
                    value={form.nom}
                    onChange={update("nom")}
                    required
                    autoComplete="name"
                    error={errors.nom}
                  />
                  <Field
                    id="club"
                    label="Nom du club / association"
                    value={form.club}
                    onChange={update("club")}
                    required
                    autoComplete="organization"
                    error={errors.club}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    required
                    autoComplete="email"
                    error={errors.email}
                  />
                  <Field
                    id="telephone"
                    label="Téléphone"
                    type="tel"
                    inputMode="tel"
                    value={form.telephone}
                    onChange={update("telephone")}
                    required
                    autoComplete="tel"
                    error={errors.telephone}
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

                {submitError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] font-medium text-red-700"
                  >
                    {submitError}
                  </p>
                )}

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
  error,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
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
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-all placeholder:text-smoke/60 focus:ring-2",
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-400/25"
            : "border-line focus:border-gold focus:ring-gold/20"
        )}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-[12px] font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
