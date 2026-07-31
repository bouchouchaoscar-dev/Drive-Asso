// ============================================================================
// Webhook Vapi `end-of-call-report` (agent vocal WEB de DriveAsso).
// Déclenché par Vapi à la fin de CHAQUE appel, quoi qu'il arrive (y compris si
// le visiteur raccroche brutalement) → capte les conversations que le tool
// resume_echange ratait. Récupère la transcription, la fait résumer par Claude
// (Haiku), et envoie le mail via le MÊME template que resume_echange.
//
// Le tool resume_echange reste EN PARALLÈLE pour l'instant (on retirera l'un des
// deux une fois le webhook validé). Ne bloque jamais ; répond toujours 200.
// ============================================================================
import { NextResponse, after } from "next/server";
import { createHash } from "crypto";
import {
  secretVapiValide,
  typeMessageVapi,
  transcriptionVapi,
  raisonFinVapi,
  dureeSecondesVapi,
  identifiantConversation,
  horodatageParis,
} from "@/lib/vapi";
import { resumerConversation } from "@/lib/anthropic";
import { sendResumeEchange } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Repli si Claude est indisponible : déduit une interruption depuis la raison de fin. */
function interruptionHeuristique(raison: string): boolean {
  return /error|timed-out|timeout|no-microphone|did-not|disconnect|failed|abandon|exception/.test(
    raison.toLowerCase(),
  );
}

export async function POST(request: Request) {
  if (!secretVapiValide(request)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    /* corps illisible : on répond proprement */
  }

  const type = typeMessageVapi(body);
  // Le Server URL peut recevoir d'AUTRES events : on ne traite QUE le rapport de fin.
  if (type && type !== "end-of-call-report") {
    return NextResponse.json({ ok: true, ignored: type });
  }

  const transcript = transcriptionVapi(body);
  const raisonFin = raisonFinVapi(body);
  const duree = dureeSecondesVapi(body);
  const convId = identifiantConversation(body);

  console.log(
    "fin-appel DIAG",
    `type=${type || "∅"}`,
    `convId=${convId || "∅"}`,
    `duree=${Math.round(duree)}s`,
    `transcriptLen=${transcript.length}`,
    `raison=${raisonFin || "∅"}`,
  );

  // Appel très court / sans contenu exploitable : pas de mail.
  if (transcript.length < 30) {
    return NextResponse.json({ ok: true, skipped: "transcript-court" });
  }

  // Idempotence (contre un éventuel renvoi du webhook) : 1 mail par conversation.
  const empreinte = createHash("sha1")
    .update(transcript)
    .digest("hex")
    .slice(0, 16);
  const idempotencyKey = `resume-fin-appel:${convId || empreinte}`;

  after(async () => {
    try {
      const r = await resumerConversation(transcript, raisonFin);
      if (r) {
        await sendResumeEchange(
          {
            type_structure: r.type_structure,
            taille: r.taille,
            gestion_actuelle: r.gestion_actuelle,
            sujets: r.sujets,
            interet_demo: r.interet_demo,
            appelInterrompu: r.appel_interrompu,
            recuLe: horodatageParis(),
          },
          { idempotencyKey },
        );
      } else {
        // Repli : le résumé auto a échoué, mais une conversation a bien eu lieu.
        await sendResumeEchange(
          {
            type_structure: "",
            taille: "",
            gestion_actuelle: "",
            sujets:
              "Résumé automatique indisponible pour cet appel (une conversation a bien eu lieu).",
            interet_demo: "",
            appelInterrompu: interruptionHeuristique(raisonFin),
            recuLe: horodatageParis(),
          },
          { idempotencyKey },
        );
      }
    } catch (e) {
      console.error("fin-appel mail error:", e);
    }
  });

  return NextResponse.json({ ok: true });
}
