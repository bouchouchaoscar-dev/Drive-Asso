// ============================================================================
// Tool call Vapi `resume_echange` (agent vocal WEB de DriveAsso).
// À chaque fin de conversation, l'agent compose LUI-MÊME un résumé et appelle
// cet outil → un mail de récap part vers contact@drive-asso.fr.
// PAS de clé Anthropic, PAS de résumé côté serveur : l'agent remplit les champs.
// Répond TOUJOURS 200 au format tool call (sauf secret invalide) pour ne jamais
// faire boucler Vapi, même si un champ manque ou si le mail échoue.
// ============================================================================
import { NextResponse } from "next/server";
import {
  secretVapiValide,
  extraireToolCall,
  reponseToolCall,
  horodatageParis,
} from "@/lib/vapi";
import { sendResumeEchange } from "@/lib/email";

export const runtime = "nodejs";

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
  const toolCallId = call?.id ?? "";
  const a = call?.args ?? {};
  const str = (v: unknown) => (v ?? "").toString().trim();

  try {
    await sendResumeEchange({
      type_structure: str(a.type_structure),
      taille: str(a.taille),
      gestion_actuelle: str(a.gestion_actuelle),
      sujets: str(a.sujets),
      interet_demo: str(a.interet_demo),
      recuLe: horodatageParis(),
    });
  } catch (e) {
    // On ne bloque JAMAIS la réponse à l'agent, même si l'envoi échoue.
    console.error("resume-echange mail error:", e);
  }

  return reponseToolCall(toolCallId, "Résumé transmis.");
}
