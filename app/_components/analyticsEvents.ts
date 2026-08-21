/**
 * Événements de conversion.
 *
 * Chaque envoi vérifie le consentement avant de toucher à `dataLayer`. Ce n'est
 * pas de la redondance : `gtag/js` rejoue la file au moment où il se charge,
 * donc un événement mis en file pendant un refus repartirait vers Google si la
 * personne acceptait plus tard. On ne met rien en file sans accord.
 *
 * Aucun renseignement identifiant ne transite ici — ni nom, ni courriel, ni
 * téléphone. Uniquement les caractéristiques non nominatives de la demande,
 * dont on a besoin pour savoir quelles annonces rapportent des mandats.
 */
import { GA_MEASUREMENT_ID, gtag, readConsent } from "./consent";

type LeadDetails = {
  /** Type de projet choisi à l'étape 1 (site, application…). */
  projectType?: string;
  /** Fourchette budgétaire déclarée. */
  budget?: string;
  /** Échéancier souhaité. */
  timeline?: string;
};

/** Formulaire de réservation envoyé avec succès. */
export function trackLeadSubmitted({
  projectType,
  budget,
  timeline,
}: LeadDetails) {
  const consent = readConsent();
  if (!consent) return;

  if (consent.analytics && GA_MEASUREMENT_ID) {
    // `generate_lead` est le nom recommandé par GA4 pour une demande entrante.
    // C'est cet événement qu'on marque « événement clé » dans GA4 puis qu'on
    // importe comme conversion dans Google Ads — il n'y a pas de second envoi
    // vers une balise publicitaire, donc rien à dédoublonner.
    //
    // `send_to` reste explicite : si une balise Ads était rebranchée un jour,
    // gtag diffuserait l'événement aux deux identifiants sans cette ligne.
    gtag("event", "generate_lead", {
      send_to: GA_MEASUREMENT_ID,
      form_id: "booking",
      project_type: projectType,
      budget_range: budget,
      timeline,
    });
  }
}

/**
 * Clic sur le numéro de téléphone ou l'adresse courriel.
 *
 * Sans ça, une demande qui arrive par appel est un angle mort complet : les
 * campagnes paraissent moins rentables qu'elles ne le sont, et on n'apprend
 * jamais quels mots-clés produisent des appels plutôt que des formulaires.
 *
 * Le paramètre `channel` sépare les deux dans GA4. Si cet événement est un jour
 * importé dans Google Ads, il doit y être déclaré en objectif **secondaire** :
 * un clic sur un numéro n'est pas une demande — on peut raccrocher aussitôt —
 * et le compter gonflerait le signal d'enchère avec du bruit.
 *
 * Les liens de contact du formulaire lui-même ne passent pas par ici : ils
 * n'apparaissent qu'après un envoi réussi ou en repli d'erreur, deux cas où le
 * clic ne dit rien sur l'annonce qui a amené la personne.
 */
export function trackContactClick(channel: "phone" | "email") {
  const consent = readConsent();
  if (!consent) return;

  if (consent.analytics && GA_MEASUREMENT_ID) {
    gtag("event", "contact_click", {
      send_to: GA_MEASUREMENT_ID,
      channel,
    });
  }
}
