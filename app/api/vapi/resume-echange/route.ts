// ============================================================================
// Tool call Vapi `resume_echange` (agent vocal WEB de DriveAsso).
// À chaque fin de conversation, l'agent compose LUI-MÊME un résumé et appelle
// cet outil → un mail de récap part vers contact@drive-asso.fr.
//
// DÉDUPLICATION (Vapi déclenche souvent le tool DEUX fois par conversation, dont
// un appel vide puis un rempli). Approche sans base de données :
//  - Clé d'idempotence Resend = identifiant de conversation → Resend garantit UN
//    seul envoi par conversation (~24 h), y compris entre instances serverless.
//  - Biais « la version remplie gagne » : un appel VIDE attend quelques secondes
//    avant d'envoyer ; un appel REMPLI envoie tout de suite → le rempli remporte
//    la clé, le vide devient un no-op. Si SEUL un vide arrive (conversation sans
//    infos), il finit par envoyer après le délai (garde-fou).
//  - Réponse à Vapi immédiate ; l'envoi se fait après via after() (l'agent
//    n'attend jamais).
//
// PAS de clé Anthropic, PAS de résumé côté serveur, rien de sensible en dur.
// Répond TOUJOURS 200 au format tool call (sauf secret invalide).
// ============================================================================
import { NextResponse, after } from "next/server";
import { createHash } from "crypto";
import {
  secretVapiValide,
  extraireToolCall,
  reponseToolCall,
  horodatageParis,
  identifiantConversation,
  premierToolCallId,
} from "@/lib/vapi";
import { sendResumeEchange } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 15;

// Délai d'attente d'un appel VIDE avant envoi : laisse le temps à une éventuelle
// version REMPLIE de la même conversation d'envoyer en premier (elles arrivent à
// quelques secondes d'intervalle).
const DELAI_APPEL_VIDE_MS = 5000;

export async function POST(request: Request) {
  if (!secretVapiValide(request)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // Corps illisible : on répond quand même proprement à Vapi.
  }

  const call = extraireToolCall(body, "resume_echange");
  // toolCallId robuste : même si les arguments sont vides (extraireToolCall les ignore).
  const toolCallId = call?.id || premierToolCallId(body);
  const a = call?.args ?? {};
  const str = (v: unknown) => (v ?? "").toString().trim();

  const champs = {
    type_structure: str(a.type_structure),
    taille: str(a.taille),
    gestion_actuelle: str(a.gestion_actuelle),
    sujets: str(a.sujets),
    interet_demo: str(a.interet_demo),
  };
  const rempli = Object.values(champs).some((v) => v !== "");

  // Clé de déduplication : identifiant de conversation (stable pour les 2 appels).
  // Fallback (payload sans id de conv) : empreinte du contenu → dédupe au moins
  // les doublons identiques. On journalise l'absence d'id pour pouvoir l'ajuster.
  const convId = identifiantConversation(body);
  if (!convId) {
    console.warn(
      "resume-echange: aucun identifiant de conversation dans le payload (dédup limitée à l'empreinte de contenu).",
    );
  }
  const empreinte = createHash("sha1")
    .update(JSON.stringify(champs))
    .digest("hex")
    .slice(0, 16);
  const idempotencyKey = convId
    ? `resume-echange:${convId}`
    : `resume-echange:cnt:${empreinte}`;

  // Envoi APRÈS la réponse (l'agent n'attend jamais). Ne bloque jamais.
  after(async () => {
    try {
      if (!rempli) {
        await new Promise((r) => setTimeout(r, DELAI_APPEL_VIDE_MS));
      }
      await sendResumeEchange(
        { ...champs, recuLe: horodatageParis() },
        { idempotencyKey },
      );
    } catch (e) {
      console.error("resume-echange mail error:", e);
    }
  });

  return reponseToolCall(toolCallId, "Résumé transmis.");
}
