"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import ConsentBanner from "./ConsentBanner";
import GoogleTags from "./GoogleTags";
import {
  clearGoogleCookies,
  consentSignals,
  DENY_ALL,
  ensureGtag,
  getConsentSnapshot,
  getServerConsentSnapshot,
  GRANT_ALL,
  gtag,
  subscribeConsent,
  writeConsent,
  type ConsentChoices,
  type ConsentRecord,
} from "./consent";

type ConsentContextValue = {
  /** Décision en vigueur, ou `null` si la personne n'a pas encore répondu. */
  decision: ConsentRecord | null;
  /** Vrai une fois le témoin lu côté navigateur. Faux pendant l'hydratation. */
  ready: boolean;
  /** Le panneau de préférences est ouvert. */
  panelOpen: boolean;
  save: (choices: ConsentChoices) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openPanel: () => void;
  closePanel: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent doit être utilisé sous <ConsentProvider>.");
  }
  return ctx;
}

/**
 * Autorité unique sur le consentement : c'est d'ici que partent toutes les
 * commandes du mode Consentement, dans un ordre garanti (`default` refusant
 * tout, puis `update` avec la décision réelle). `gtag/js` rejoue la file
 * `dataLayer` dans l'ordre à son chargement, donc le moment où la librairie
 * arrive — si elle arrive — n'a aucune incidence sur le respect du choix.
 */
export default function ConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const snapshot = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const decision = snapshot.record;
  const ready = snapshot.read;

  const [panelOpen, setPanelOpen] = useState(false);

  // Les commandes `default` ne doivent partir qu'une fois, et avant tout le
  // reste. Le garde survit au double appel des effets en mode strict.
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    ensureGtag();

    // Tout est refusé avant même de connaître la décision : si une balise se
    // chargeait pour une raison quelconque, elle n'aurait le droit de rien.
    gtag("consent", "default", {
      ...consentSignals(DENY_ALL),
      // Laisse 500 ms au choix mémorisé pour arriver avant le premier envoi.
      wait_for_update: 500,
    });
    // Retire les identifiants publicitaires des requêtes tant que `ad_storage`
    // est refusé, et fait circuler le clic Ads par l'URL plutôt qu'un témoin.
    gtag("set", "ads_data_redaction", true);
    gtag("set", "url_passthrough", true);
    gtag("js", new Date());
  }, []);

  // Applique la décision dès qu'elle est connue, et à chaque changement. Le
  // premier passage (hydratation) sort tôt : `decision` est encore nul.
  useEffect(() => {
    if (!decision) return;
    // Aucun signal Google au-delà de la mesure de base sans accord publicitaire.
    gtag("set", "allow_google_signals", decision.marketing);
    gtag("set", "allow_ad_personalization_signals", decision.marketing);
    gtag("consent", "update", consentSignals(decision));
  }, [decision]);

  const save = useCallback((choices: ConsentChoices) => {
    writeConsent(choices);
    // Retrait total : `consent update` empêche les nouveaux dépôts, encore
    // faut-il effacer ceux qui existent déjà.
    if (!choices.analytics && !choices.marketing) clearGoogleCookies();
    setPanelOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      decision,
      ready,
      panelOpen,
      save,
      acceptAll: () => save(GRANT_ALL),
      rejectAll: () => save(DENY_ALL),
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
    }),
    [decision, ready, panelOpen, save],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <GoogleTags />
      <ConsentBanner />
    </ConsentContext.Provider>
  );
}
