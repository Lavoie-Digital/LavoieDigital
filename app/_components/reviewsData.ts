/**
 * Avis Google reçus sur la fiche d'établissement Lavoie Digital.
 *
 * Règles pour ce fichier :
 *  - Recopier l'avis mot pour mot depuis Google. Ne jamais réécrire, résumer
 *    ni « améliorer » le texte d'un client : c'est une citation, pas de la copie.
 *  - Ne jamais ajouter un avis qui n'existe pas sur la fiche Google. Le visiteur
 *    peut cliquer sur le lien et comparer.
 *  - La liste ci-dessous est un extrait : on n'affiche pas les 8 avis. Le compte
 *    montré au visiteur vient donc de `TOTAL_REVIEW_COUNT`, pas de la longueur
 *    du tableau, sinon le site annoncerait moins d'avis qu'il n'en a vraiment.
 *  - `date` est une étiquette d'affichage (« Août 2026 ») et non une date ISO :
 *    ça évite tout écart entre le rendu serveur et le rendu client.
 */

export type Review = {
  author: string;
  /** Note laissée par le client, de 1 à 5. */
  rating: number;
  /** Étiquette affichée telle quelle, ex. « Août 2026 ». */
  date: string;
  /** Texte intégral de l'avis, mot pour mot. */
  text: string;
  /** Optionnel : entreprise ou rôle, affiché sous le nom. */
  context?: string;
};

/** Fiche Google publique — lien « Voir tous les avis » et « Laisser un avis ». */
export const GOOGLE_REVIEWS_URL = "https://share.google/IdjzOyZkI1eoi8kBQ";

/**
 * Nombre total d'avis sur la fiche Google, extraits ou non. À mettre à jour
 * en même temps qu'on ajoute un avis ci-dessous : c'est ce chiffre que le
 * visiteur voit, et il doit correspondre à ce que Google affiche.
 */
export const TOTAL_REVIEW_COUNT = 8;

/** Du plus récent au plus ancien, comme sur la fiche Google. */
export const REVIEWS: Review[] = [
  {
    author: "Jocelyne Guertin",
    rating: 5,
    date: "Août 2026",
    text: "Lavoie Digital, une ressource précieuse pour tout vos projets et produits. Un immense avantage à connaître!",
  },
  {
    author: "Charbonneau Guitars",
    rating: 5,
    date: "Août 2026",
    text: "Service impeccable et hyper professionnel, je recommande 110% ! A+++ 👌",
  },
  {
    author: "Amelie Purtell",
    rating: 5,
    date: "Août 2026",
    text: "Service impeccable, très satisfaite des services proposés.",
  },
  {
    author: "Josée-Ann Jomphe",
    rating: 5,
    context: "Courtier immobilier",
    date: "Juillet 2026",
    text: "Je suis en amour avec mon site web ! ❤️ Sincèrement, c'est encore mieux que ce que j'aurais pu imaginer !",
  },
  {
    author: "Anne-Sophie Lecointre",
    rating: 5,
    date: "Juin 2026",
    text: "Pour un service sur mesure, professionnel et humain appelé Xavier ! Je suis très satisfaite :)",
  },
];

/**
 * Moyenne arrondie au dixième, calculée depuis les avis réels ci-dessus. Les
 * avis non affichés sont eux aussi à 5 étoiles, donc l'extrait donne la même
 * moyenne que la fiche complète.
 */
export function averageRating(): number {
  if (REVIEWS.length === 0) return 0;
  const sum = REVIEWS.reduce((total, r) => total + r.rating, 0);
  return Math.round((sum / REVIEWS.length) * 10) / 10;
}
