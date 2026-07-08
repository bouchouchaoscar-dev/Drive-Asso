import { Resend } from "resend";

/* ============================================================
   Envoi d'emails via Resend (domaine drive-asso.fr vérifié).
   La clé API n'est lue que côté serveur (jamais exposée au client).
   ============================================================ */

let resend: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("Email non envoyé : RESEND_API_KEY manquant.");
    return null;
  }
  if (!resend) resend = new Resend(key);
  return resend;
}

// Expéditeur : adresse @drive-asso.fr (domaine vérifié dans Resend).
// Surchargeable via RESEND_FROM si besoin.
const FROM =
  process.env.RESEND_FROM || "DriveAsso <formulaire@drive-asso.fr>";

// Destinataire des demandes de démo.
const CONTACT_TO = process.env.CONTACT_TO || "contact@drive-asso.fr";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrap(inner: string): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:8px;color:#1F2937">${inner}<p style="color:#9ca3af;font-size:12px;margin-top:20px">Envoyé automatiquement depuis le formulaire de contact de www.drive-asso.fr</p></div>`;
}

/** Notifie l'équipe DriveAsso d'une nouvelle demande de démo. */
export async function sendDemandeDemo(d: {
  nom: string;
  club: string;
  email: string;
  telephone: string;
  message?: string;
}) {
  const client = getResend();
  if (!client) return { skipped: true };

  const messageHtml = d.message?.trim()
    ? escapeHtml(d.message).replace(/\n/g, "<br>")
    : "<em style='color:#9ca3af'>(aucun message)</em>";

  const html = wrap(`
    <h1 style="font-size:20px;margin:0 0 4px">Nouvelle demande de démo</h1>
    <p style="color:#6B7280;margin:0 0 14px">Reçue via le formulaire de contact du site.</p>
    <div style="border:1px solid #E5E7EB;border-radius:12px;padding:16px">
      <p style="margin:4px 0"><strong>Nom :</strong> ${escapeHtml(d.nom)}</p>
      <p style="margin:4px 0"><strong>Club / association :</strong> ${escapeHtml(d.club)}</p>
      <p style="margin:4px 0"><strong>Email :</strong> ${escapeHtml(d.email)}</p>
      <p style="margin:4px 0"><strong>Téléphone :</strong> ${escapeHtml(d.telephone)}</p>
      <p style="margin:10px 0 4px"><strong>Message :</strong></p>
      <p style="margin:4px 0;line-height:1.6;color:#374151">${messageHtml}</p>
    </div>
  `);

  const { data, error } = await client.emails.send({
    from: FROM,
    to: CONTACT_TO,
    replyTo: d.email,
    subject: `Nouvelle demande de démo - ${d.club}`,
    html,
  });

  // Resend ne lève pas d'exception en cas de refus (domaine/from invalide,
  // quota…) : il renvoie un champ `error`. On le transforme en exception
  // pour que la route renvoie un vrai 500 (et non un faux succès).
  if (error) {
    throw new Error(`Resend: ${error.message || "envoi refusé"}`);
  }
  return { id: data?.id };
}
