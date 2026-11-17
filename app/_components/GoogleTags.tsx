"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "./ConsentProvider";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, gtag } from "./consent";

const GTAG_LIBRARY = "https://www.googletagmanager.com/gtag/js";

/**
 * Balises Google : GA4 (mesure d'audience) et Google Ads (publicité), chacune
 * soumise à sa propre finalité.
 *
 * Ce composant ne rend rien : charger une balise est une écriture dans un
 * système extérieur (le DOM et la file `dataLayer`), pas un morceau
 * d'interface. `gtag/js` est donc injecté à la main, une seule fois, et
 * seulement après un consentement explicite à au moins une des deux
 * finalités — refuser signifie zéro requête vers googletagmanager.com.
 *
 * Une seule librairie sert les deux balises : `gtag/js` traite toutes les
 * commandes `config` de la file, quel que soit l'identifiant passé dans l'URL.
 *
 * `config` Google Ads active le lien de conversion : le `gclid` de l'annonce
 * cliquée est conservé (témoin `_gcl_aw`) pour que la conversion envoyée plus
 * tard depuis le formulaire soit rattachée au bon clic, au bon mot-clé.
 */
export default function GoogleTags() {
  const { decision } = useConsent();
  const pathname = usePathname();

  const analytics = Boolean(decision?.analytics) && Boolean(GA_MEASUREMENT_ID);
  const ads = Boolean(decision?.marketing) && Boolean(GOOGLE_ADS_ID);

  /** Chaque `config` n'est passé qu'une fois par chargement de page. */
  const gaConfigured = useRef(false);
  const adsConfigured = useRef(false);
  const libraryLoaded = useRef(false);

  useEffect(() => {
    if (analytics && !gaConfigured.current) {
      gaConfigured.current = true;
      // `config` déclenche déjà la première page vue.
      gtag("config", GA_MEASUREMENT_ID, {
        // Le témoin `_ga` hérite des mêmes garde-fous que le nôtre.
        cookie_flags: "SameSite=Lax;Secure",
      });
    }

    if (ads && !adsConfigured.current) {
      adsConfigured.current = true;
      gtag("config", GOOGLE_ADS_ID, {
        cookie_flags: "SameSite=Lax;Secure",
      });
    }

    if ((analytics || ads) && !libraryLoaded.current) {
      libraryLoaded.current = true;
      const id = analytics ? GA_MEASUREMENT_ID : GOOGLE_ADS_ID;
      const el = document.createElement("script");
      el.async = true;
      el.src = `${GTAG_LIBRARY}?id=${encodeURIComponent(id)}`;
      document.head.appendChild(el);
    }
  }, [analytics, ads]);

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
