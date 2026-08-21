import Image from "next/image";

/**
 * Portrait du fondateur.
 *
 * Recadrage circulaire volontaire : la source a un fond blanc, et sur la palette
 * sombre du site un disque blanc se lit comme un choix, là où un carré blanc
 * aurait l'air d'une image mal détourée. Le liseré reprend le traitement de
 * verre des cartes.
 *
 * Sur les pages publicitaires, ce visage porte l'argument que la copie affirme
 * déjà — « vous parlez directement à la personne qui construit votre site ».
 * Une affirmation devient une preuve. Il est donc placé près des moments
 * d'engagement (formulaire, appel à l'action), jamais dans le hero, où il
 * pousserait la bande de réassurance hors de l'écran.
 */
export default function Portrait({
  size,
  shape = "circle",
  className = "",
  priority = false,
}: {
  /** Côté rendu, en pixels. L'image source est carrée. */
  size: number;
  /**
   * `circle` pour une signature en marge d'un texte. `rounded` pour la section
   * qui présente la personne : à grande taille, un disque lit « avatar » et
   * fait vendeur, alors qu'un rectangle arrondi lit « portrait » et fait
   * éditorial.
   */
  shape?: "circle" | "rounded";
  className?: string;
  /** À activer seulement si le portrait est visible sans défiler. */
  priority?: boolean;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ring-1 ring-white/15 ${
        shape === "circle" ? "rounded-full" : "rounded-3xl"
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/*
        On demande le double du rendu, et le conteneur réduit. Mesuré : en
        passant `size` tel quel, le navigateur ne retenait qu'un candidat à
        ~1,4–1,9× la taille CSS, ce qui suffit à faire baver un visage sur un
        écran à densité 2× ou 3×. En doublant, même le candidat le plus petit du
        jeu de sources couvre un écran haute densité. Pas de `sizes` : il ferait
        repasser la sélection en mode responsive, donc au plus juste.

        `quality` à 95 : sur un visage, les artéfacts de compression se voient
        autour des yeux et du menton bien avant de se voir ailleurs. Attention,
        Next 16 n'accepte que les valeurs listées dans `images.qualities`
        (next.config.ts) et ramène silencieusement les autres à la plus proche.
      */}
      <Image
        src="/Fondateur.jpg"
        alt="Xavier Lavoie, fondateur de Lavoie Digital"
        width={size * 2}
        height={size * 2}
        quality={95}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
