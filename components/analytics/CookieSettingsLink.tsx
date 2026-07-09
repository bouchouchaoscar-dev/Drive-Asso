"use client";

/** Rouvre le bandeau de consentement (permet de changer d'avis à tout moment). */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("da:open-cookie-consent"))
      }
      className={className}
    >
      Gérer les cookies
    </button>
  );
}
