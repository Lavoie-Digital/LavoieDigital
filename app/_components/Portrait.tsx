import Image from "next/image";

/** Plan trois-quarts, du dessus de la tête aux poches. Ratio 2:3. */
const SRC = "/Fondateur-portrait.jpg";

/** Hauteur ÷ largeur de `SRC`. Doit suivre le fichier. */
const RATIO = 3 / 2;

/**
 * Portrait du fondateur, en rectangle arrondi vertical.
 *
 * La source est un portrait studio sur fond presque noir : elle se fond dans la
 * palette du site au lieu d'y trancher, donc le cadre n'a pas à rattraper un
 * fond clair. Le liseré reprend le traitement de verre des cartes.
 *
 * Le plan est volontairement large — épaule, tatouage, main dans la poche. Une
 * variante en pastille ronde et serrée sur le visage a existé pour accompagner
 * un paragraphe ; elle a été retirée parce qu'à cette taille le visage
 * n'appuyait plus aucun argument et se lisait comme un avatar décoratif. Si le
 * besoin revient, il faudra un second fichier recadré : ce plan-ci réduit à
 * 68 px ne donne qu'une tache.
 *
 * Sur les pages publicitaires, ce visage porte l'argument que la copie affirme
 * déjà — « vous parlez directement à la personne qui construit votre site ».
 * Une affirmation devient une preuve. Il est donc placé après les travaux, qui
 * lui donnent quelque chose à cautionner, et jamais dans le hero, où il
 * pousserait la bande de réassurance hors de l'écran.
 *
 * À ne pas confondre avec `/Fondateur.jpg`, le carré serré que gardent
 * l'OpenGraph et le JSON-LD : les cartes sociales rognent en paysage, un plan
 * vertical y perdrait la tête. Ce fichier n'est plus affiché sur le site, mais
 * il est toujours servi aux robots — ne pas le supprimer.
 */
export default function Portrait({
  size,
  className = "",
  priority = false,
}: {
  /** Largeur rendue, en pixels. La hauteur suit le ratio 2:3 de la source. */
  size: number;
  className?: string;
  /** À activer seulement si le portrait est visible sans défiler. */
  priority?: boolean;
}) {
  const height = Math.round(size * RATIO);

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-3xl ring-1 ring-white/15 ${className}`}
      style={{ width: size, height }}
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
        src={SRC}
        alt="Xavier Lavoie, fondateur de Lavoie Digital"
        width={size * 2}
        height={height * 2}
        quality={95}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
