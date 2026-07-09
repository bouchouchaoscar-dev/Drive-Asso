import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CookieSettingsLink } from "@/components/analytics/CookieSettingsLink";
import { NAV_LINKS, SITE } from "@/lib/content";

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];

export function Footer() {
  return (
    // Fond blanc pur + filet gris net (#E5E7EB) en haut pour marquer la fin de la page.
    <footer className="border-t border-line bg-white text-ink">
      <Container>
        {/* Haut */}
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marque */}
          <div>
            {/* Logo version normale (anthracite + doré), lisible sur fond clair */}
            <Image
              src="/images/driveasso-horizontal.png"
              alt="DriveAsso"
              width={300}
              height={78}
              className="h-17 w-auto max-w-full sm:h-20"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-smoke">
              La gestion associative nouvelle génération. Un site sur-mesure et
              une plateforme tout-en-un pour les clubs, associations sportives
              et associations loi 1901.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-smoke">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-smoke transition-colors hover:text-ink-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-smoke">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-smoke transition-colors hover:text-ink-900"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-smoke transition-colors hover:text-ink-900"
                >
                  Demander une démo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-7 sm:flex-row">
          <p className="text-xs text-smoke">
            DriveAsso, la gestion associative nouvelle génération
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-smoke transition-colors hover:text-ink-900"
              >
                {l.label}
              </Link>
            ))}
            <CookieSettingsLink className="text-xs text-smoke transition-colors hover:text-ink-900" />
            <span className="text-xs text-smoke">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
