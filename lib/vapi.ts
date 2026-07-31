// ============================================================================
// MÉCANIQUE VAPI PARTAGÉE (socle générique, réutilisable).
// ----------------------------------------------------------------------------
// Parsing défensif du format Vapi (tool calls), vérification du secret partagé,
// format de réponse tool call. Aucune donnée métier ici.
// Repris de la logique éprouvée des standards IA (Beach Paddle / TCSM).
// ============================================================================
import { NextResponse } from "next/server";

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

/** Réponse au format tool call attendu par Vapi. */
export function reponseToolCall(toolCallId: string, result: string) {
  return NextResponse.json({ results: [{ toolCallId, result }] });
}

function safeJson(s: string): Record<string, unknown> {
  try {
    const v = JSON.parse(s);
    return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

type ToolCall = {
  id?: string;
  toolCallId?: string;
  name?: string;
  arguments?: unknown;
  function?: { name?: string; arguments?: unknown };
};

/**
 * Extrait la 1re tool call portant le nom donné, quel que soit le nid exact du
 * payload Vapi (message.toolCalls[] | message.tool_calls[] | message.toolCallList[]
 * | racine PLATE). Les arguments peuvent arriver en objet OU en chaîne JSON →
 * normalisés en objet. Renvoie null si absente.
 */
export function extraireToolCall(
  body: unknown,
  nom: string,
): { id: string; args: Record<string, unknown> } | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const message = (b.message ?? b) as Record<string, unknown>;
  // Vapi range les tool calls sous des clés qui varient selon la version.
  const calls = ((message.toolCalls ??
    message.tool_calls ??
    message.toolCallList ??
    []) as ToolCall[]) || [];

  const nonVide = (a: Record<string, unknown>) => !!a && Object.keys(a).length > 0;
  const extraire = (c: ToolCall) => {
    const raw = c?.function?.arguments ?? c?.arguments ?? {};
    const args =
      typeof raw === "string" ? safeJson(raw) : ((raw as Record<string, unknown>) ?? {});
    const id = (c?.id ?? c?.toolCallId ?? "") as string;
    return { id, args };
  };

  // 1) Tool calls : préférer celle dont le NOM matche (args non vides), sinon la
  //    1re tool call avec des args non vides.
  let parNom: { id: string; args: Record<string, unknown> } | null = null;
  let premiere: { id: string; args: Record<string, unknown> } | null = null;
  for (const c of calls) {
    const r = extraire(c);
    if (!nonVide(r.args)) continue;
    const name = c?.function?.name ?? c?.name;
    if (name === nom) {
      parNom = r;
      break;
    }
    if (!premiere) premiere = r;
  }
  if (parNom) return parNom;
  if (premiere) return premiere;

  // 2) FORMAT PLAT : Vapi (notamment l'agent WEB) envoie parfois les champs
  //    DIRECTEMENT à la racine du body (sans toolCalls). Fallback uniquement si
  //    l'extraction ci-dessus est vide, et seulement sur les clés « métier » (on
  //    ignore les clés d'ENVELOPPE Vapi pour ne pas confondre des métadonnées).
  const CLES_ENVELOPPE = new Set([
    "message", "toolCalls", "tool_calls", "toolCallList", "toolWithToolCallList",
    "type", "call", "customer", "timestamp", "artifact", "assistant",
    "phoneNumber", "id", "toolCallId",
  ]);
  const clesMetier = (o: Record<string, unknown>) => {
    const r: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(o ?? {})) if (!CLES_ENVELOPPE.has(k)) r[k] = v;
    return r;
  };
  let racine = clesMetier(b);
  if (!nonVide(racine)) racine = clesMetier(message);
  if (nonVide(racine)) return { id: (b.id ?? message.id ?? "") as string, args: racine };
  return null;
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
  const candidats: unknown[] = [
    mCall.id,
    bCall.id,
    m.callId,
    b.callId,
    (m as Record<string, unknown>).callSid,
    (b as Record<string, unknown>).callSid,
  ];
  for (const c of candidats) {
    const s = (c ?? "").toString().trim();
    if (s) return s;
  }
  return "";
}

/**
 * Id de la 1re tool call, MÊME si ses arguments sont vides (extraireToolCall
 * ignore les args vides). Sert à toujours répondre avec le bon toolCallId. "" si absent.
 */
export function premierToolCallId(body: unknown): string {
  const b = (body ?? {}) as Record<string, unknown>;
  const m = (b.message ?? b) as Record<string, unknown>;
  const calls = (m.toolCalls ?? m.tool_calls ?? m.toolCallList ?? []) as Array<{
    id?: string;
    toolCallId?: string;
  }>;
  const first = Array.isArray(calls) ? calls[0] : undefined;
  return ((first?.id ?? first?.toolCallId ?? "") as string).toString().trim();
}

/** Horodatage lisible en fuseau France (Europe/Paris). */
export function horodatageParis(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "full",
    timeStyle: "short",
  }).format(d);
}
