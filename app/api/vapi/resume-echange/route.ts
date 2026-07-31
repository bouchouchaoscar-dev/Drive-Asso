// ============================================================================
// Tool call Vapi `resume_echange` (agent vocal WEB de DriveAsso).
// À chaque fin de conversation, l'agent compose LUI-MÊME un résumé et appelle
// cet outil → un mail de récap part vers contact@drive-asso.fr.
//
// DÉDUPLICATION (Vapi déclenche souvent le tool DEUX fois par conversation :
// un appel vide + un rempli). Sans base de données :
//  - Clé d'idempotence Resend = identifiant de conversation → 1 seul envoi par
//    conversation (~24 h), y compris entre instances serverless.
//  - Biais « la version remplie gagne » : un appel VIDE attend quelques secondes
//    avant d'envoyer ; un appel REMPLI envoie tout de suite.
//  - FILET WEB : si AUCUN identifiant de conversation fiable n'est trouvé (cas
//    des appels web), on n'envoie PAS un appel tout vide → impossible d'avoir le
//    doublon (vide + rempli), seul le rempli part.
//  - Réponse à Vapi immédiate ; l'envoi se fait après via after().
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
  structurePayload,
} from "@/lib/vapi";
import { sendResumeEchange } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 15;

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
  const convId = identifiantConversation(body);

  // DIAGNOSTIC (clés uniquement, pas de valeurs métier) : révèle où se trouve
  // l'id de conversation en appel WEB, pour resserrer l'extraction si besoin.
  console.log(
    "resume-echange DIAG",
    structurePayload(body),
    `convId=${convId || "∅"}`,
    `rempli=${rempli}`,
  );

  const empreinte = createHash("sha1")
    .update(JSON.stringify(champs))
    .digest("hex")
    .slice(0, 16);
  const idempotencyKey = convId
    ? `resume-echange:${convId}`
    : `resume-echange:cnt:${empreinte}`;

  after(async () => {
    try {
      if (!rempli) {
        // Appel tout vide.
        if (!convId) {
          // Pas d'identifiant de conversation fiable (cas web) → on n'envoie PAS :
          // évite le doublon « vide + rempli ». Seul le rempli partira.
          return;
        }
        // Id fiable présent : on attend un peu que la version REMPLIE de la même
        // conversation envoie en premier et remporte la clé d'idempotence ; ce
        // vide devient alors un no-op. Si seul un vide arrive, il part quand même.
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
