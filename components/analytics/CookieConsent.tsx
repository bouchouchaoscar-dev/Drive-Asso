"use client";

import { useCallback, useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/cn";

/* ============================================================
   Consentement cookies RGPD + Google Analytics 4 (Consent Mode v2).
   Principe CNIL : gtag n'est JAMAIS chargé avant un clic explicite
   sur « Accepter ». Refus = aucun script, aucun cookie de tracking.
   ============================================================ */

const GA_ID = "G-QJH4BKZWV6";
const STORAGE_KEY = "da-cookie-consent";
// Le consentement est redemandé au-delà de ~13 mois (recommandation CNIL).
const CONSENT_MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000;

type ConsentStatus = "granted" | "denied";
type Stored = { v: 1; status: ConsentStatus; ts: number };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

function readConsent(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed?.status || !parsed.ts) return null;
    // Consentement expiré → on redemande.
    if (Date.now() - parsed.ts > CONSENT_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(status: ConsentStatus) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: 1, status, ts: Date.now() } as Stored)
    );
  } catch {
    /* stockage indisponible : on ne bloque pas la navigation */
  }
}

/** Charge GA UNIQUEMENT après consentement explicite (Consent Mode v2). */
function loadGA() {
  if (typeof window === "undefined") return;
  if (window.__gaLoaded) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag as Window["gtag"];

  // Consent Mode v2 : tout refusé par défaut, puis analytics accordé
  // (l'utilisateur vient d'accepter). Aucune donnée publicitaire.
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", GA_ID, {
    anonymize_ip: true,
    // Cookies _ga limités à ~13 mois (conformité CNIL).
    cookie_expires: Math.floor(CONSENT_MAX_AGE_MS / 1000),
  });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored?.status === "granted") {
      // Consentement déjà donné → GA se charge sans réafficher le bandeau.
      loadGA();
    } else if (!stored) {
      // Aucun choix (ou consentement expiré) → on affiche le bandeau.
      // Init client-only (dépend de localStorage, indisponible au SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
    // (si "denied" : on ne fait rien, aucun script chargé)
    // Réouverture depuis le footer (« Gérer les cookies »).
    const open = () => {
      const s = readConsent();
      setAnalytics(s?.status === "granted");
      setDetails(false);
      setVisible(true);
    };
    window.addEventListener("da:open-cookie-consent", open);
    return () => window.removeEventListener("da:open-cookie-consent", open);
  }, []);

  const accept = useCallback(() => {
    writeConsent("granted");
    loadGA();
    setVisible(false);
  }, []);

  const refuse = useCallback(() => {
    writeConsent("denied");
    setVisible(false);
  }, []);

  const savePrefs = useCallback(() => {
    if (analytics) {
      writeConsent("granted");
      loadGA();
    } else {
      writeConsent("denied");
    }
    setVisible(false);
  }, [analytics]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 sm:justify-start sm:pl-6">
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Consentement aux cookies"
        className="animate-rise w-full max-w-md rounded-2xl border border-white/10 bg-ink-900 p-5 text-white shadow-2xl sm:p-6"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-soft text-gold-600">
            <Cookie size={17} />
          </span>
          <h2 className="font-display text-sm font-bold">Cookies &amp; confidentialité</h2>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-white/70">
          Nous utilisons des cookies de mesure d&apos;audience (Google Analytics)
          pour comprendre comment le site est utilisé et l&apos;améliorer. Ils ne
          sont déposés qu&apos;avec votre accord. Détails dans notre{" "}
          <a
            href="/confidentialite"
            className="font-medium text-white underline decoration-gold/60 underline-offset-2 hover:decoration-gold"
          >
            politique de confidentialité
          </a>
          .
        </p>

        {details && (
          <div className="mt-4 space-y-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-white">
                  Cookies strictement nécessaires
                </span>
                <span className="text-[11px] font-semibold text-white/50">
                  Toujours actifs
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-white/50">
                Indispensables au fonctionnement du site. Aucun suivi.
              </p>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-gold"
              />
              <span>
                <span className="block text-[13px] font-semibold text-white">
                  Mesure d&apos;audience (Google Analytics)
                </span>
                <span className="mt-0.5 block text-[12px] leading-relaxed text-white/50">
                  Cookies <code className="text-white/70">_ga</code> comptant les
                  visites de façon anonymisée. Désactivés par défaut.
                </span>
              </span>
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {details ? (
            <button
              type="button"
              onClick={savePrefs}
              className={btnGold}
            >
              Enregistrer mes choix
            </button>
          ) : (
            <>
              <button type="button" onClick={accept} className={btnGold}>
                Accepter
              </button>
              <button type="button" onClick={refuse} className={btnGhost}>
                Refuser
              </button>
              <button
                type="button"
                onClick={() => setDetails(true)}
                className="ml-auto text-[12px] font-medium text-white/60 underline underline-offset-2 transition-colors hover:text-white"
              >
                Personnaliser
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const btnGold = cn(
  "rounded-full bg-gold px-4 py-2 font-display text-[13px] font-semibold text-ink-900",
  "transition-colors hover:bg-gold-600"
);
const btnGhost = cn(
  "rounded-full border border-white/25 px-4 py-2 font-display text-[13px] font-semibold text-white",
  "transition-colors hover:bg-white/10"
);
