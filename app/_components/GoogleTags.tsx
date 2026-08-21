"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "./ConsentProvider";
import { GA_MEASUREMENT_ID, gtag } from "./consent";

const GTAG_LIBRARY = "https://www.googletagmanager.com/gtag/js";

/**
 * Balise Google Analytics 4 — la seule du site. Aucune balise Google Ads : les
 * conversions publicitaires passent par un événement clé GA4 importé dans
 * Google Ads.
 *
 * Ce composant ne rend rien : charger une balise est une écriture dans un
 * système extérieur (le DOM et la file `dataLayer`), pas un morceau
 * d'interface. `gtag/js` est donc injecté à la main, et seulement après un
 * consentement explicite à la mesure d'audience — refuser signifie zéro requête
 * vers googletagmanager.com, pas une balise chargée puis bridée.
 *
 * La catégorie « publicité » ne charge rien par elle-même : elle pilote les
 * signaux `ad_storage` / `ad_user_data` du mode Consentement, poussés par
 * ConsentProvider, dont dépend l'attribution d'une conversion GA4 à la campagne
 * Google Ads qui l'a précédée.
 */
export default function GoogleTags() {
  const { decision } = useConsent();
  const pathname = usePathname();

  const analytics = Boolean(decision?.analytics) && Boolean(GA_MEASUREMENT_ID);

  /** `config` n'est passé qu'une fois par chargement de page. */
  const configured = useRef(false);

  useEffect(() => {
    if (!analytics || configured.current) return;
    configured.current = true;

    // `config` déclenche déjà la première page vue.
    gtag("config", GA_MEASUREMENT_ID, {
      // Le témoin `_ga` hérite des mêmes garde-fous que le nôtre.
      cookie_flags: "SameSite=Lax;Secure",
    });

    const el = document.createElement("script");
    el.async = true;
    el.src = `${GTAG_LIBRARY}?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(el);
  }, [analytics]);

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
