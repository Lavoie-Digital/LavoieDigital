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
import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_LEAD_LABEL,
  gtag,
  readConsent,
} from "./consent";

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
    gtag("event", "generate_lead", {
      // Nom d'événement recommandé par GA4 pour une demande entrante.
      form_id: "booking",
      project_type: projectType,
      budget_range: budget,
      timeline,
    });
  }

  // Sans étiquette de conversion, Google Ads n'a rien à recevoir : l'événement
  // GA4 ci-dessus suffit et peut être importé côté Ads si besoin.
  if (consent.marketing && GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL) {
    gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
    });
  }
}
