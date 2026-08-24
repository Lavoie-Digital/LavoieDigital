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
    // importe comme conversion dans Google Ads.
    //
    // `send_to` a été retiré : il ne servait qu'à empêcher gtag de diffuser
    // aussi vers la balise Google Ads, laquelle n'existe plus. Avec un flux GA4
    // unique, le paramètre n'a plus rien à cibler.
    //
    // Vérifié au navigateur : sa présence ne cassait pas l'envoi. Un test qui
    // semblait le prouver ne mesurait en réalité que le tampon de GA4 — les
    // événements partent par lots, avec jusqu'à ~5 s de délai, et une
    // vérification trop hâtive conclut à une perte. À garder en tête avant de
    // diagnostiquer un événement « manquant ».
    gtag("event", "generate_lead", {
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
 * Couvre tous les liens de contact affichés sur le site : la navigation, le
 * hero des pages publicitaires, le pied de page, et les deux liens du bloc
 * « Préfère écrire directement ? » rendu en permanence à côté du formulaire.
 *
 * Seule exception assumée : les adresses de la politique de confidentialité.
 * Elles portent un sujet « Protection des renseignements personnels » et servent
 * à exercer un droit d'accès ou de rectification. Ce ne sont pas des demandes
 * commerciales — les compter gonflerait la métrique avec du bruit, et mesurer
 * l'exercice d'un droit pour en faire un signal publicitaire serait douteux.
 */
export function trackContactClick(channel: "phone" | "email") {
  const consent = readConsent();
  if (!consent) return;

  if (consent.analytics && GA_MEASUREMENT_ID) {
    // `channel` doit être déclaré comme dimension personnalisée de portée
    // « Événement » dans GA4, sinon le paramètre est bien reçu mais n'apparaît
    // dans aucun rapport et les appels ne peuvent pas être séparés des
    // courriels. Pas de `send_to` — voir la note dans trackLeadSubmitted.
    gtag("event", "contact_click", { channel });
  }
}
