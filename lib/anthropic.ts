/* ============================================================
   Résumé de conversation via Claude (API Anthropic, modèle léger Haiku).
   Clé lue côté serveur uniquement (ANTHROPIC_API_KEY). Appel via fetch, pas de
   SDK. Ne jette jamais : renvoie null en cas d'échec (la route gère le repli).
   ============================================================ */

const MODEL = "claude-haiku-4-5-20251001"; // Haiku 4.5 (léger, économique)

export type ResumeConversation = {
  type_structure: string;
  taille: string;
  gestion_actuelle: string;
  sujets: string;
  interet_demo: string;
  appel_interrompu: boolean;
};

const SYSTEME = `Tu analyses la transcription d'un appel entre un VISITEUR (dirigeant d'un club ou d'une association) et l'ASSISTANT vocal de DriveAsso (agence qui crée des sites + plateformes de gestion pour clubs sportifs).
Tu produis un résumé structuré pour l'équipe DriveAsso.
Réponds UNIQUEMENT avec un objet JSON valide (aucun texte autour), avec EXACTEMENT ces clés :
- "type_structure" : type de structure du visiteur (club de tennis, association loi 1901, etc.). "" si non mentionné.
- "taille" : nombre d'adhérents / taille. "" si non mentionné.
- "gestion_actuelle" : comment ils gèrent aujourd'hui les inscriptions/paiements (papier, Excel, HelloAsso, rien…). "" si non mentionné.
- "sujets" : les sujets abordés / besoins exprimés, en une ou deux phrases concises. "" si rien.
- "interet_demo" : niveau d'intérêt pour une démo (ex. "chaud, a demandé une démo", "curieux", "peu intéressé", "à recontacter"). "" si non exprimé.
- "appel_interrompu" : true si la conversation semble avoir été coupée en plein milieu (le visiteur a raccroché brutalement, échange incomplet, pas de conclusion naturelle), false sinon.
N'invente jamais : si une info n'est pas dans la transcription, mets "". Écris en français.`;

function s(v: unknown): string {
  return (v ?? "").toString().trim();
}

export async function resumerConversation(
  transcript: string,
  raisonFin: string,
): Promise<ResumeConversation | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    console.warn("Résumé non généré : ANTHROPIC_API_KEY manquant.");
    return null;
  }
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        system: SYSTEME,
        messages: [
          {
            role: "user",
            content: `Indice technique sur la fin d'appel (peut aider pour "appel_interrompu") : ${raisonFin || "inconnue"}.\n\nTranscription :\n${transcript}\n\nRéponds avec le JSON demandé.`,
          },
        ],
      }),
    });
    if (!res.ok) {
      console.error("Anthropic API error", res.status, await res.text());
      return null;
    }
    const data = (await res.json()) as {
      content?: Array<{ text?: string }>;
    };
    const text = (data?.content?.[0]?.text ?? "").toString();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    const parsed = JSON.parse(text.slice(start, end + 1)) as Record<
      string,
      unknown
    >;
    return {
      type_structure: s(parsed.type_structure),
      taille: s(parsed.taille),
      gestion_actuelle: s(parsed.gestion_actuelle),
      sujets: s(parsed.sujets),
      interet_demo: s(parsed.interet_demo),
      appel_interrompu: parsed.appel_interrompu === true,
    };
  } catch (e) {
    console.error("resumerConversation error:", e);
    return null;
  }
}
