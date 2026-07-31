"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Headphones, PhoneOff, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/* ============================================================
   Bouton « appeler l'assistant vocal DriveAsso » (Web SDK Vapi).
   Au clic : demande micro (gérée par le SDK) + appel WebRTC vers l'assistant.
   Store module partagé → les 2 boutons de la page restent synchronisés
   (un seul appel à la fois).
   Quota anti-abus dissuasif : 6 MINUTES cumulées / jour (localStorage), peu
   importe le nombre d'appels. Un essai très court ne pénalise quasiment pas.
   Contournable en navigation privée, et c'est assumé.
   Clés PUBLIQUES (front) via NEXT_PUBLIC_*.
   ============================================================ */

type Status = "idle" | "connecting" | "active" | "limited" | "error";
type State = { status: Status; error: string };
type VapiLike = {
  start: (assistantId: string) => Promise<unknown>;
  stop: () => void;
  on: (event: string, cb: (payload?: unknown) => void) => void;
};

const USAGE_KEY = "da-voice-usage"; // { date: "YYYY-M-D", ms: number }
const QUOTA_MS = 6 * 60 * 1000; // 6 minutes / jour

let state: State = { status: "idle", error: "" };
let vapi: VapiLike | null = null;
let callStart = 0; // horodatage de début d'appel (pour mesurer la durée réelle)
let autoStop: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

function setState(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function getSnapshot() {
  return state;
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function usageDuJour(): number {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (!raw) return 0;
    const o = JSON.parse(raw) as { date?: string; ms?: number };
    if (o?.date !== today()) return 0; // nouveau jour → remise à zéro
    return typeof o.ms === "number" && o.ms > 0 ? o.ms : 0;
  } catch {
    return 0;
  }
}
function ajouterUsage(ms: number) {
  try {
    const total = usageDuJour() + Math.max(0, ms);
    localStorage.setItem(USAGE_KEY, JSON.stringify({ date: today(), ms: total }));
  } catch {
    /* stockage indisponible : quota dissuasif, on ne bloque pas */
  }
}
function restantMs(): number {
  return Math.max(0, QUOTA_MS - usageDuJour());
}
function quotaAtteint(): boolean {
  return restantMs() <= 0;
}

function messageErreur(raw: unknown): string {
  const p = raw as { error?: { message?: string }; message?: string } | undefined;
  const m = (p?.error?.message ?? p?.message ?? "").toString().toLowerCase();
  const micro =
    m.includes("permission") ||
    m.includes("not allowed") ||
    m.includes("notallowed") ||
    m.includes("microphone") ||
    m.includes("denied") ||
    m.includes("dismiss");
  return micro
    ? "Autorisez votre micro pour parler à l'assistant."
    : "La connexion a échoué. Réessayez dans un instant.";
}

/** Fin d'appel (raccrochage utilisateur, agent, quota, ou erreur) : cumule la
 *  durée réelle une seule fois (garde callStart), nettoie le timer, remet l'état. */
function finaliser() {
  if (autoStop) {
    clearTimeout(autoStop);
    autoStop = null;
  }
  if (callStart > 0) {
    ajouterUsage(Date.now() - callStart);
    callStart = 0;
  }
  setState({ status: quotaAtteint() ? "limited" : "idle", error: "" });
}

async function demarrer() {
  if (state.status === "connecting" || state.status === "active") return;
  if (quotaAtteint()) {
    setState({ status: "limited", error: "" });
    return;
  }
  const cle = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistant = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  if (!cle || !assistant) {
    setState({
      status: "error",
      error: "L'assistant vocal n'est pas disponible pour le moment.",
    });
    return;
  }
  setState({ status: "connecting", error: "" });
  try {
    const mod = await import("@vapi-ai/web");
    const Vapi = mod.default;
    if (!vapi) {
      vapi = new Vapi(cle) as unknown as VapiLike;
      vapi.on("call-start", () => {
        callStart = Date.now();
        // Coupe automatiquement l'appel quand le quota du jour est épuisé.
        if (autoStop) clearTimeout(autoStop);
        autoStop = setTimeout(() => {
          try {
            vapi?.stop();
          } catch {
            /* ignore */
          }
          finaliser();
        }, restantMs());
        setState({ status: "active", error: "" });
      });
      vapi.on("call-end", () => finaliser());
      vapi.on("error", (p) => {
        if (autoStop) {
          clearTimeout(autoStop);
          autoStop = null;
        }
        if (callStart > 0) {
          ajouterUsage(Date.now() - callStart);
          callStart = 0;
        }
        setState({ status: "error", error: messageErreur(p) });
      });
    }
    await vapi.start(assistant);
  } catch (e) {
    setState({ status: "error", error: messageErreur(e) });
  }
}

function raccrocher() {
  finaliser(); // cumule d'abord la durée (garde callStart) …
  try {
    vapi?.stop(); // … puis l'event call-end sera un no-op (callStart déjà à 0)
  } catch {
    /* ignore */
  }
}

const btnBase =
  "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-base font-semibold transition-colors select-none";
const btnGhost = "bg-white text-ink-900 ring-1 ring-line hover:bg-mist";

export function VoiceAssistantButton({
  label,
  fullWidthMobile = false,
}: {
  label: string;
  fullWidthMobile?: boolean;
}) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    if (state.status === "idle" && quotaAtteint())
      setState({ status: "limited", error: "" });
  }, []);

  const wFull = fullWidthMobile ? "w-full sm:w-auto" : "";

  if (snap.status === "active") {
    return (
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <span className="inline-flex items-center gap-2.5 rounded-full bg-gold-soft px-4 py-2.5 font-display text-sm font-semibold text-ink-900">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
          </span>
          Assistant en ligne…
        </span>
        <button
          type="button"
          onClick={raccrocher}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-red-300 px-5 font-display text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          <PhoneOff size={16} />
          Raccrocher
        </button>
      </div>
    );
  }

  if (snap.status === "connecting") {
    return (
      <span className={cn(btnBase, btnGhost, "cursor-wait opacity-80", wFull)}>
        <Loader2 size={18} className="animate-spin text-gold-600" />
        Connexion…
      </span>
    );
  }

  if (snap.status === "limited") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="max-w-xs text-[13px] leading-relaxed text-smoke">
          Vous avez atteint votre temps d&apos;essai du jour. Pour aller plus
          loin, demandez une démo.
        </p>
        <Link
          href="/#contact"
          className={cn(btnBase, "bg-gold text-ink-900 hover:bg-gold-600")}
        >
          Demander une démo
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  if (snap.status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="max-w-xs text-[13px] font-medium leading-relaxed text-red-600">
          {snap.error}
        </p>
        <button
          type="button"
          onClick={demarrer}
          className={cn(btnBase, btnGhost, wFull)}
        >
          <Headphones size={18} className="text-gold-600" />
          Réessayer
        </button>
      </div>
    );
  }

  // idle
  return (
    <button
      type="button"
      onClick={demarrer}
      className={cn(btnBase, btnGhost, wFull)}
    >
      <Headphones size={18} className="text-gold-600" />
      {label}
    </button>
  );
}

/**
 * Bouton « Demander une démo » du hero, qui DISPARAÎT quand l'état « quota
 * atteint » s'affiche (le bloc quota a déjà son propre bouton démo → un seul à
 * l'écran). En état normal, il reste comme avant.
 */
export function HeroDemoButton({ className }: { className?: string }) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  if (snap.status === "limited") return null;
  return (
    <Button href="/#contact" size="lg" className={className}>
      Demander une démo
      <ArrowRight size={18} />
    </Button>
  );
}
