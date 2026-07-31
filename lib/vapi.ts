// ============================================================================
// MÉCANIQUE VAPI PARTAGÉE (socle générique, réutilisable).
// ----------------------------------------------------------------------------
// Parsing défensif du payload Vapi (webhook fin d'appel : transcription, raison
// de fin, durée, identifiant de conversation) + vérification du secret partagé.
// Aucune donnée métier ici. Repris des standards IA (Beach Paddle / TCSM).
// ============================================================================

/**
 * Vérifie le secret partagé (header `x-vapi-secret` == VAPI_SHARED_SECRET).
 * Si la variable n'est PAS définie → autorisé (pratique pour tester en local /
 * au navigateur avant d'avoir posé le secret côté Vapi). Ne logge jamais le secret.
 */
export function secretVapiValide(request: Request): boolean {
  const secret = process.env.VAPI_SHARED_SECRET;
  if (!secret) return true;
  const recu = request.headers.get("x-vapi-secret");
  if (recu == null) return false;
  // ROBUSTESSE : Vapi peut concaténer plusieurs valeurs d'un même header en « , »
  // (secret posé à 2 niveaux : assistant + tool → header dupliqué joint en ", ").
  // On découpe sur la virgule, on trim chaque segment, et on autorise si AU MOINS
  // UN segment == le secret.
  return recu.split(",").some((segment) => segment.trim() === secret);
}

/**
 * Identifiant STABLE de la conversation Vapi : même valeur pour les DEUX tool
 * calls d'un même échange (contrairement au toolCallId, unique par appel). Sert
 * de clé de déduplication. Cherche aux emplacements connus du payload ; "" si absent.
 */
export function identifiantConversation(body: unknown): string {
  const b = (body ?? {}) as Record<string, unknown>;
  const m = (b.message ?? {}) as Record<string, unknown>;
  const mCall = (m.call ?? {}) as Record<string, unknown>;
  const bCall = (b.call ?? {}) as Record<string, unknown>;
  const artifact = (m.artifact ?? b.artifact ?? {}) as Record<string, unknown>;
  const aCall = (artifact.call ?? {}) as Record<string, unknown>;
  const g = (o: Record<string, unknown>, k: string) => o[k];
  // Emplacements connus, téléphonie ET web (le web n'a pas toujours d'objet `call`).
  const candidats: unknown[] = [
    g(mCall, "id"), g(bCall, "id"), g(aCall, "id"),
    g(mCall, "callId"), g(bCall, "callId"),
    g(mCall, "webCallId"), g(bCall, "webCallId"),
    g(m, "callId"), g(b, "callId"),
    g(m, "sessionId"), g(b, "sessionId"),
    g(mCall, "sessionId"), g(bCall, "sessionId"),
    g(m, "callSid"), g(b, "callSid"),
  ];
  for (const c of candidats) {
    const s = (c ?? "").toString().trim();
    if (s) return s;
  }
  return "";
}

/** Type d'événement Vapi (`tool-calls`, `end-of-call-report`, …). */
export function typeMessageVapi(body: unknown): string {
  const b = (body ?? {}) as Record<string, unknown>;
  const m = (b.message ?? b) as Record<string, unknown>;
  return (m.type ?? b.type ?? "").toString().trim();
}

/** Raison de fin d'appel Vapi (`customer-ended-call`, `silence-timed-out`, …). */
export function raisonFinVapi(body: unknown): string {
  const b = (body ?? {}) as Record<string, unknown>;
  const m = (b.message ?? b) as Record<string, unknown>;
  return (m.endedReason ?? m.endReason ?? "").toString().trim();
}

/** Durée de l'appel en secondes (défensif : secondes ou millisecondes selon Vapi). */
export function dureeSecondesVapi(body: unknown): number {
  const b = (body ?? {}) as Record<string, unknown>;
  const m = (b.message ?? b) as Record<string, unknown>;
  const s =
    (m.durationSeconds as number) ??
    (m.duration as number) ??
    (typeof m.durationMs === "number" ? (m.durationMs as number) / 1000 : undefined);
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * Transcription complète de la conversation depuis un end-of-call-report.
 * Cherche la chaîne `transcript` puis reconstruit depuis le tableau de messages.
 * "" si rien d'exploitable.
 */
export function transcriptionVapi(body: unknown): string {
  const b = (body ?? {}) as Record<string, unknown>;
  const m = (b.message ?? b) as Record<string, unknown>;
  const artifact = (m.artifact ?? {}) as Record<string, unknown>;

  const direct = (
    (m.transcript as string) ??
    (artifact.transcript as string) ??
    ""
  )
    .toString()
    .trim();
  if (direct) return direct;

  const msgs = ((artifact.messages ?? m.messages ?? []) as Array<{
    role?: string;
    message?: string;
    content?: string;
  }>) || [];
  if (Array.isArray(msgs) && msgs.length) {
    return msgs
      .filter((x) => x && (x.message || x.content) && x.role !== "system")
      .map((x) => {
        const who =
          x.role === "assistant" || x.role === "bot" ? "Assistant" : "Visiteur";
        return `${who}: ${(x.message ?? x.content ?? "").toString().trim()}`;
      })
      .join("\n")
      .trim();
  }
  return "";
}

/** Horodatage lisible en fuseau France (Europe/Paris). */
export function horodatageParis(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "full",
    timeStyle: "short",
  }).format(d);
}
