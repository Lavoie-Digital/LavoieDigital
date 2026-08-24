/**
 * Jeu d'icônes en ligne, dessiné à la main plutôt qu'importé.
 *
 * Le projet n'a aucune dépendance d'icônes et n'en veut pas : une librairie
 * complète pour seize glyphes, c'est du poids envoyé au navigateur sur les
 * pages qu'on paie au clic. Même grille que les SVG déjà présents dans le
 * projet — viewBox 24, trait de 1.5, extrémités arrondies, `currentColor`.
 *
 * Ajouter une icône : une entrée dans PATHS, et le nom devient utilisable.
 */

const PATHS = {
  /* --- Familles de projets ------------------------------------------- */
  /** Site vitrine — fenêtre de navigateur. */
  window: "M3 9h18M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  /** Boutique en ligne — sac. */
  bag: "M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2",
  /** Page de vente — cible, un seul objectif. */
  target: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z",
  /** Refonte — reprise depuis une base existante. */
  refresh: "M20 12a8 8 0 1 1-2.4-5.7M20.5 3.5V8h-4.5",
  /** Outil interne — réglages calqués sur vos règles. */
  sliders: "M4 7h9M19 7h1M4 17h3M13 17h7",
  /** Portail client — un espace où l'on entre. */
  portal: "M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8M11 12h10m0 0-3.5-3.5M21 12l-3.5 3.5",
  /** Tableau de bord — indicateurs. */
  chart: "M3 20h18M7 20v-5.5M12 20V7M17 20v-9",

  /* --- Ce qu'on peut greffer ---------------------------------------- */
  /** Automatisation. */
  bolt: "M13.5 3 6 14h4.5L9.5 21 17 10h-4.5l1-7Z",
  /** Intelligence artificielle. */
  sparkle:
    "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Zm6.6 11 .8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z",
  /** Référencement et découvrabilité. */
  search: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM20 20l-4.6-4.6",
  /** Intégrations aux systèmes existants. */
  link: "M10.5 13.5a5 5 0 0 0 7 0l2.5-2.5a5 5 0 0 0-7-7l-1 1M13.5 10.5a5 5 0 0 0-7 0L4 13a5 5 0 0 0 7 7l1-1",
  /** Paiements. */
  card: "M3 10h18M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  /** Comptes, rôles, sécurité. */
  lock: "M7 11h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Zm1 0V8a4 4 0 0 1 8 0v3",
  /** Données et rapports. */
  database:
    "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  /** Hébergement et mise en ligne. */
  cloud: "M7.5 19h9.5a4 4 0 0 0 .6-8 6.2 6.2 0 0 0-11.8 1.7A3.6 3.6 0 0 0 7.5 19Z",
} as const;

export type IconName = keyof typeof PATHS;

/**
 * `aria-hidden` sans exception : une icône ne porte jamais l'information ici,
 * elle accompagne un titre qui la dit déjà. L'annoncer serait du bruit pour un
 * lecteur d'écran.
 */
export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
