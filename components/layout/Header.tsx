"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        // Fond blanc pur permanent, aucune transparence ni backdrop teinté.
        "fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        // Au scroll : simple filet gris fin (#E5E7EB) en bas pour détacher du contenu.
        scrolled ? "border-b border-line" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-18 items-center justify-between sm:h-22">
        {/* Logo */}
        <Link
          href="/#hero"
          aria-label="DriveAsso, accueil"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/driveasso-horizontal.png"
            alt="DriveAsso"
            width={260}
            height={68}
            priority
            className="h-16 w-auto sm:h-19"
          />
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline font-display text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Button href="/#contact" size="md">
            Demander une démo
          </Button>
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-mist md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Panneau mobile */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 font-display text-base font-semibold text-ink-800 transition-colors hover:bg-mist"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href="/#contact"
            size="lg"
            className="mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            Demander une démo
          </Button>
        </Container>
      </div>
    </header>
  );
}
