"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "./ConsentProvider";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, gtag } from "./consent";

const GTAG_LIBRARY = "https://www.googletagmanager.com/gtag/js";

/**
 * Balises Google — Google Analytics 4 et Google Ads.
 *
 * Ce composant ne rend rien : charger une balise est une écriture dans un
 * système extérieur (le DOM et la file `dataLayer`), pas un morceau
 * d'interface. `gtag/js` est donc injecté à la main, et seulement après un
 * consentement explicite — refuser signifie zéro requête vers
 * googletagmanager.com, pas une balise chargée puis bridée.
 *
 * Chaque identifiant est configuré séparément : accepter la mesure d'audience
 * ne fait pas démarrer la balise publicitaire, et inversement. Les commandes
 * `consent default` / `consent update` sont poussées en amont par
 * ConsentProvider.
 */
export default function GoogleTags() {
  const { decision } = useConsent();
  const pathname = usePathname();

  const analytics = Boolean(decision?.analytics) && Boolean(GA_MEASUREMENT_ID);
  const marketing = Boolean(decision?.marketing) && Boolean(GOOGLE_ADS_ID);

  /** Identifiants déjà passés à `config` — une seule fois chacun par page. */
  const configured = useRef(new Set<string>());
  /** La librairie est injectée une fois pour toutes, jamais retirée ni remplacée. */
  const libraryInjected = useRef(false);

  useEffect(() => {
    const pending: string[] = [];
    if (analytics && !configured.current.has(GA_MEASUREMENT_ID)) {
      pending.push(GA_MEASUREMENT_ID);
    }
    if (marketing && !configured.current.has(GOOGLE_ADS_ID)) {
      pending.push(GOOGLE_ADS_ID);
    }
    if (pending.length === 0) return;

    for (const id of pending) {
      configured.current.add(id);
      if (id === GA_MEASUREMENT_ID) {
        // `config` déclenche déjà la première page vue.
        gtag("config", id, {
          // Le témoin `_ga` hérite des mêmes garde-fous que le nôtre.
          cookie_flags: "SameSite=Lax;Secure",
        });
      } else {
        gtag("config", id);
      }
    }

    if (libraryInjected.current) return;
    libraryInjected.current = true;

    const el = document.createElement("script");
    el.async = true;
    el.src = `${GTAG_LIBRARY}?id=${encodeURIComponent(pending[0])}`;
    document.head.appendChild(el);
  }, [analytics, marketing]);

  /**
   * Navigations côté client : Next.js ne recharge pas la page, donc `config` ne
   * repasse pas et il faut envoyer la page vue à la main. `null` signale la
   * première exécution, déjà couverte par `config`.
   *
   * Seul le chemin est surveillé. gtag lit `document.location` au moment de
   * l'envoi, la chaîne de requête (gclid, utm…) est donc bien transmise au
   * chargement initial ; une navigation qui ne changerait que cette chaîne
   * n'existe pas sur ce site.
   */
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!analytics) return;
    if (lastPath.current === null || lastPath.current === pathname) {
      lastPath.current = pathname;
      return;
    }
    lastPath.current = pathname;
    gtag("event", "page_view", {
      // Sans `send_to`, gtag diffuse l'événement à toutes les balises
      // configurées : Google Ads recevrait un ping de remarketing en double, en
      // plus de celui qu'il envoie déjà de lui-même sur changement d'historique.
      send_to: GA_MEASUREMENT_ID,
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [analytics, pathname]);

  return null;
}
