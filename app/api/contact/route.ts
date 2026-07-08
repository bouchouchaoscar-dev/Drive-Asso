import { NextResponse } from "next/server";
import { sendDemandeDemo } from "@/lib/email";

export const runtime = "nodejs";

// Anti-bot : durée minimale de remplissage attendue d'un humain (time-trap).
const MIN_FILL_TIME_MS = 3000;

export async function POST(request: Request) {
  let body: {
    nom?: string;
    club?: string;
    email?: string;
    telephone?: string;
    message?: string;
    // Champs anti-bot (invisibles pour l'humain).
    website?: string; // honeypot : rempli uniquement par les bots
    formLoadedAt?: number; // horodatage de montage du formulaire (time-trap)
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // ---------- Anti-bot (double couche, CÔTÉ SERVEUR) ----------
  // On renvoie un faux succès (ok:true) en cas de détection, pour ne pas
  // signaler au bot qu'il a été repéré. Aucun email n'est envoyé.
  const website = (body.website || "").trim();
  const formLoadedAt = body.formLoadedAt;

  if (website !== "") {
    return NextResponse.json({ ok: true });
  }
  const elapsed = Date.now() - Number(formLoadedAt);
  if (!formLoadedAt || Number.isNaN(elapsed) || elapsed < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }
  // ------------------------------------------------------------

  const nom = (body.nom || "").trim();
  const club = (body.club || "").trim();
  const email = (body.email || "").trim();
  const telephone = (body.telephone || "").trim();
  const message = (body.message || "").trim();

  // Champs requis (miroir de la validation client).
  if (!nom || !club || !email || !telephone) {
    return NextResponse.json(
      { error: "Merci de remplir tous les champs obligatoires." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  try {
    await sendDemandeDemo({ nom, club, email, telephone, message });
  } catch (e) {
    console.error("Contact email error:", e);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez dans un instant." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
