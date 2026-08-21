/**
 * Consentement aux traceurs — configuration, stockage et pont vers gtag.
 *
 * Conçu pour la Loi 25 (RLRQ c. P-39.1, art. 8.1 et 14) :
 *
 *   1. Rien n'est chargé avant le choix. `gtag/js` n'est injecté dans la page
 *      qu'une fois une catégorie acceptée — pas « chargé puis bridé », pas
 *      d'envoi sans témoin. Un refus signifie zéro requête vers Google.
 *   2. Le consentement est granulaire. Mesure d'audience et publicité sont deux
 *      finalités distinctes, acceptables séparément (art. 14, al. 2 : le
 *      consentement est demandé « pour chacune de ces fins »).
 *   3. Le refus est aussi simple que l'acceptation — un seul clic, au même
 *      niveau de visibilité dans la bannière.
 *   4. La décision est révocable en tout temps et sa preuve est horodatée.
 *
 * Les identifiants ci-dessous sont publics par nature (ils apparaissent dans le
 * HTML livré au navigateur) : `NEXT_PUBLIC_` est donc le bon préfixe, et une
 * valeur par défaut en clair n'est pas une fuite.
 */

/** Mesure d'audience GA4 — format `G-XXXXXXXXXX`. Vide = GA4 désactivé. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** Google Ads — format `AW-XXXXXXXXX`. Vide = balise publicitaire désactivée. */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-18397742027";

/**
 * Étiquette de la conversion « demande de soumission » dans Google Ads
 * (Objectifs → la conversion → Configurer avec la balise Google : la valeur
 * après la barre oblique dans `send_to`). Vide = aucune conversion envoyée,
 * l'événement GA4 `generate_lead` part quand même.
 */
export const GOOGLE_ADS_LEAD_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "";

/**
 * Étiquettes des deux conversions secondaires « clic de contact ». Se
 * configurent comme celle du dessus, mais à déclarer en **objectif secondaire**
 * dans Google Ads : un clic sur un numéro n'est pas une demande, on peut
 * raccrocher aussitôt. Les compter gonflerait le signal d'enchère avec du
 * bruit. Elles servent à ne plus être aveugle sur les mots-clés qui produisent
 * des appels plutôt que des formulaires. Vides = rien n'est envoyé à Ads.
 */
export const GOOGLE_ADS_PHONE_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL ?? "";

export const GOOGLE_ADS_EMAIL_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_EMAIL_LABEL ?? "";

/* ------------------------------- Décision ------------------------------- */

/** Finalités soumises au consentement. Le strict nécessaire n'en fait pas partie. */
export type ConsentChoices = {
  /** GA4 : fréquentation, pages vues, provenance du trafic. */
  analytics: boolean;
  /** Google Ads : mesure des conversions et remarketing. */
  marketing: boolean;
};

/** Ce qu'on conserve comme preuve de consentement. */
export type ConsentRecord = ConsentChoices & {
  /** Version des finalités présentées. Un changement force une nouvelle demande. */
  version: number;
  /** Horodatage ISO du choix — exigé pour démontrer un consentement valide. */
  date: string;
};

export const CONSENT_COOKIE = "ld_consent";

/**
 * À incrémenter dès qu'une finalité est ajoutée, retirée ou redéfinie : le
 * consentement porte sur des fins précises, un choix donné pour d'anciennes
 * fins ne vaut pas pour les nouvelles.
 */
export const CONSENT_VERSION = 1;

/**
 * 6 mois. La Commission d'accès à l'information recommande de redemander le
 * consentement périodiquement plutôt que de le présumer acquis indéfiniment.
 */
export const CONSENT_MAX_AGE_DAYS = 180;

export const DENY_ALL: ConsentChoices = { analytics: false, marketing: false };
export const GRANT_ALL: ConsentChoices = { analytics: true, marketing: true };

/* -------------------------------- Stockage ------------------------------ */

/**
 * Témoin strictement nécessaire au sens de la Loi : il ne sert qu'à mémoriser
 * le choix de la personne. Première partie, sans identifiant unique, lisible
 * par le script parce que c'est lui qui décide de charger les balises.
 */
export function readConsent(): ConsentRecord | null {
  if (typeof document === "undefined") return null;

  const entry = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;

  try {
    const parsed: unknown = JSON.parse(
      decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1)),
    );
    if (typeof parsed !== "object" || parsed === null) return null;

    const r = parsed as Partial<ConsentRecord>;
    // Un témoin d'une version antérieure est ignoré : la bannière réapparaît.
    if (r.version !== CONSENT_VERSION) return null;
    if (typeof r.analytics !== "boolean" || typeof r.marketing !== "boolean") {
      return null;
    }

    return {
      analytics: r.analytics,
      marketing: r.marketing,
      version: CONSENT_VERSION,
      date: typeof r.date === "string" ? r.date : "",
    };
  } catch {
    // Témoin corrompu ou tronqué : on redemande plutôt que de deviner.
    return null;
  }
}

export function writeConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = {
    ...choices,
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
  };

  const value = encodeURIComponent(JSON.stringify(record));
  const attrs = [
    `${CONSENT_COOKIE}=${value}`,
    "path=/",
    `max-age=${CONSENT_MAX_AGE_DAYS * 24 * 60 * 60}`,
    "SameSite=Lax",
  ];
  // `Secure` casserait l'écriture en développement sur http://localhost.
  if (typeof location !== "undefined" && location.protocol === "https:") {
    attrs.push("Secure");
  }
  document.cookie = attrs.join("; ");

  publish({ read: true, record });
  return record;
}

/* --------------------------- Store React externe -------------------------- */

/**
 * Le témoin est une source de vérité extérieure à React, et illisible pendant
 * le rendu serveur. On l'expose donc en store `useSyncExternalStore` : c'est ce
 * qui permet à l'hydratation de produire exactement le HTML du serveur (aucune
 * décision connue) puis de basculer sur la valeur réelle au rendu suivant, sans
 * dépareillement d'hydratation ni `setState` dans un effet.
 *
 * Le drapeau `read` est ce qui distingue « pas encore lu » de « aucune décision
 * prise ». Sans lui, la bannière clignoterait chez les personnes qui ont déjà
 * répondu.
 */
export type ConsentSnapshot =
  | { read: false; record: null }
  | { read: true; record: ConsentRecord | null };

const SERVER_SNAPSHOT: ConsentSnapshot = { read: false, record: null };

let snapshot: ConsentSnapshot | null = null;
const listeners = new Set<() => void>();

function publish(next: ConsentSnapshot) {
  snapshot = next;
  for (const listener of listeners) listener();
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Doit retourner une référence stable entre deux appels, sinon React boucle :
 * le témoin n'est relu qu'une fois, puis à chaque écriture.
 */
export function getConsentSnapshot(): ConsentSnapshot {
  snapshot ??= { read: true, record: readConsent() };
  return snapshot;
}

export function getServerConsentSnapshot(): ConsentSnapshot {
  return SERVER_SNAPSHOT;
}

/** Témoins déposés par les balises Google, à effacer lors d'un retrait. */
const GOOGLE_COOKIE_PREFIXES = ["_ga", "_gid", "_gcl", "_gac", "_gat"];

/**
 * `consent update: denied` empêche les nouveaux dépôts mais laisse en place les
 * témoins déjà écrits. Le retrait du consentement doit faire cesser
 * l'identification : on les supprime donc explicitement.
 */
export function clearGoogleCookies() {
  if (typeof document === "undefined") return;

  // Le témoin `_ga` est posé sur le domaine racine : il faut viser chaque
  // suffixe du host, sinon la suppression échoue silencieusement.
  const host = location.hostname;
  const parts = host.split(".");
  const domains = [
    undefined,
    ...parts.map((_, i) => `.${parts.slice(i).join(".")}`),
  ];

  for (const entry of document.cookie.split("; ")) {
    const name = entry.split("=")[0];
    if (!GOOGLE_COOKIE_PREFIXES.some((p) => name.startsWith(p))) continue;

    for (const domain of domains) {
      document.cookie = [
        `${name}=`,
        "path=/",
        "max-age=0",
        domain ? `domain=${domain}` : "",
      ]
        .filter(Boolean)
        .join("; ");
    }
  }
}

/* --------------------------------- gtag --------------------------------- */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Installe la file `dataLayer` et la fonction `gtag` officielle.
 *
 * Volontairement fait en JavaScript de module plutôt que dans une balise
 * `<script>` en ligne : toutes les commandes partent alors d'un seul endroit,
 * dans un ordre garanti (`default` avant `update` avant `config`). `gtag/js`
 * rejoue la file dans l'ordre à son chargement, donc l'ordre d'insertion du
 * script externe n'a aucune importance. Rien ici ne touche le réseau.
 */
export function ensureGtag() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag ??= function gtagShim() {
    // `arguments` est ici volontaire, et non un oubli de paramètres nommés :
    // gtag/js identifie une commande à la forme exacte de l'objet poussé dans
    // la file. Un tableau ordinaire n'est pas reconnu de la même façon, donc on
    // reproduit à l'identique l'amorce officielle de Google.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
}

export function gtag(...args: unknown[]) {
  ensureGtag();
  window.gtag?.(...args);
}

/** Traduit nos deux catégories vers les signaux du mode Consentement v2. */
export function consentSignals(choices: ConsentChoices) {
  const analytics = choices.analytics ? "granted" : "denied";
  const marketing = choices.marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    // Aucune fonctionnalité du site ne dépend d'un témoin tiers ni d'une
    // personnalisation : ces deux signaux restent refusés en permanence.
    functionality_storage: "denied",
    personalization_storage: "denied",
    // Anti-fraude et intégrité : jamais utilisé pour du profilage.
    security_storage: "granted",
  } as const;
}
