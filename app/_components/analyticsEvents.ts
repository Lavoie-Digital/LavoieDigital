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
  GOOGLE_ADS_EMAIL_LABEL,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_LEAD_LABEL,
  GOOGLE_ADS_PHONE_LABEL,
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
      // `send_to` cible GA4 seulement : sans lui, gtag diffuse aussi à Google
      // Ads, qui compte déjà la conversion étiquetée juste en dessous.
      send_to: GA_MEASUREMENT_ID,
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

/**
 * Clic sur le numéro de téléphone ou l'adresse courriel.
 *
 * Sans ça, une demande qui arrive par appel est invisible côté publicité : les
 * campagnes paraissent moins rentables qu'elles ne le sont, et les enchères
 * n'apprennent jamais quels mots-clés produisent des appels. À déclarer en
 * objectif **secondaire** dans Google Ads — voir GOOGLE_ADS_PHONE_LABEL.
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

  const label = channel === "phone" ? GOOGLE_ADS_PHONE_LABEL : GOOGLE_ADS_EMAIL_LABEL;
  if (consent.marketing && GOOGLE_ADS_ID && label) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}` });
  }
}
