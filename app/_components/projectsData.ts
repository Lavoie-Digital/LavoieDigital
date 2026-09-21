/**
 * Real client projects. Single source of truth for the /travaux grid, the
 * /travaux/[slug] case studies and the JSON-LD emitted on both.
 *
 * Rules for this file:
 *  - Never state a metric that hasn't been measured. Describe what was built,
 *    not invented conversion lifts.
 *  - Every project here is publicly credited "Lavoie Digital" in its own footer,
 *    so the relationship is already public — but confirm with the client before
 *    adding a new entry.
 */

export type Project = {
  slug: string;
  client: string;
  /** Live site, used for the outbound link. */
  url: string;
  domain: string;
  sector: string;
  location: string;
  year: string;
  /** Short label shown on the grid card. */
  tag: string;
  /** One-liner for the grid card. */
  teaser: string;
  /** Screenshot in /public/travaux. */
  image: string;
  imageAlt: string;
  /** Case-study page. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** "Le mandat" / "La réponse" / "Le résultat" narrative. */
  sections: { heading: string; paragraphs: string[] }[];
  /** Shown as a spec table on the case study. */
  specs: { label: string; value: string }[];
  /** Feature bullets. */
  delivered: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "saga-consultants",
    client: "SAGA Consultants",
    url: "https://sagaconsultants.ca/",
    domain: "sagaconsultants.ca",
    sector: "Génie-conseil en structures",
    location: "Saguenay et Lévis",
    year: "2026",
    tag: "Site corporatif · Portfolio administrable",
    teaser:
      "Site corporatif, portfolio de projets filtrable et espace d'administration pour une firme de génie-conseil en structures.",
    image: "/travaux/saga.jpg",
    imageAlt:
      "Page d'accueil du site SAGA Consultants, firme de génie-conseil en structures à Saguenay et Lévis",
    title: "SAGA Consultants — site corporatif et portfolio administrable",
    metaTitle: "SAGA Consultants — étude de cas site de génie-conseil",
    metaDescription:
      "Étude de cas : site corporatif, portfolio de projets filtrable et espace d'administration pour SAGA Consultants, firme de génie-conseil en structures à Saguenay et Lévis.",
    intro:
      "SAGA Consultants est une firme de génie-conseil spécialisée en structures, avec des bureaux à Jonquière et à Lévis. Elle travaille pour des donneurs d'ouvrage publics et privés, du multilogement à l'institutionnel, au Québec comme au Nunavut. Une firme technique qui devait se présenter sans se réduire à une liste de services.",
    sections: [
      {
        heading: "Le mandat",
        paragraphs: [
          "Les sites de firmes de génie se ressemblent tous : une page de services, une page d'équipe, un formulaire. Le problème n'est pas l'information manquante — c'est que rien ne distingue une firme de la suivante. Or SAGA se vend précisément sur ce qui ne se met pas en liste : le jugement, la compréhension du financement et des contraintes de chantier, la capacité à prendre les projets qui n'entrent dans aucune case.",
          "Deuxième enjeu, concret celui-là : les projets livrés sont la meilleure preuve que la firme possède, et ils s'accumulent. Un portfolio figé dans le code aurait vieilli en trois mois. Il fallait que l'équipe puisse ajouter un projet, un membre ou une offre d'emploi elle-même.",
        ],
      },
      {
        heading: "La réponse",
        paragraphs: [
          "La page d'accueil est construite comme une démonstration plutôt qu'un dépliant : la vision de la firme, les quatre familles de services, puis les dix types de structures maîtrisées — ossature légère de bois, rétrofit structural, lamellé-collé, modulaire volumétrique, hors-normes. C'est cette grille qui fait la différence entre « on fait du génie de structure » et « on sait faire exactement ce que votre projet demande ».",
          "Le portfolio est filtrable par marché, par expertise et par service, et chaque projet a sa propre page indexable — Projet Laforest, Bibliothèque Georges-Henri-Lévesque, Centre de santé l'Équilibre. Ces pages captent les recherches par type d'ouvrage, celles que fait un donneur d'ouvrage qui cherche quelqu'un ayant déjà réalisé le même genre de bâtiment.",
          "La page équipe présente les gens par leur prénom et leur rôle, et les carrières sont traitées comme un vrai canal de recrutement plutôt qu'une page morte : offres affichées quand il y en a, candidature spontanée invitée quand il n'y en a pas.",
        ],
      },
      {
        heading: "L'administration",
        paragraphs: [
          "Un espace privé protégé par authentification permet à l'équipe de gérer elle-même le contenu vivant du site : projets, membres de l'équipe, offres d'emploi. Aucun appel au développeur pour publier un mandat qui vient de se terminer.",
          "C'est la partie invisible du mandat, et souvent celle qui décide si un site reste à jour deux ans plus tard. Un portfolio qu'on ne peut pas alimenter cesse d'être une preuve et devient une archive.",
          "Le formulaire de contact segmente les demandes par type de projet dès la première saisie — institutionnel, multilogement, scolaire, communautés autochtones — ce qui permet de router la demande vers la bonne personne au lieu de la trier après coup.",
        ],
      },
    ],
    specs: [
      { label: "Type", value: "Site corporatif + espace d'administration" },
      { label: "Secteur", value: "Génie-conseil · Ingénierie des structures" },
      { label: "Territoire", value: "Saguenay, Lévis et le reste du Canada" },
      { label: "Année", value: "2026" },
    ],
    delivered: [
      "Site corporatif : vision, services et types de structures",
      "Portfolio filtrable par marché, expertise et service",
      "Fiche de projet indexable individuellement",
      "Page équipe et section carrières",
      "Espace d'administration authentifié pour projets, équipe et offres d'emploi",
      "Formulaire de contact segmenté par type de projet",
      "Deux bureaux référencés avec cartes et itinéraires",
    ],
  },
  {
    slug: "amethyste",
    client: "Améthyste",
    url: "https://amethystehairproductscanada.ca/",
    domain: "amethystehairproductscanada.ca",
    sector: "Soins capillaires professionnels",
    location: "Québec",
    year: "2026",
    tag: "Boutique en ligne · Espace pro",
    teaser:
      "Boutique en ligne et portail professionnel pour une marque de soins capillaires fabriquée au Québec.",
    image: "/travaux/amethyste.jpg",
    imageAlt:
      "Page d'accueil du site Améthyste, marque de soins capillaires professionnels au Québec",
    title: "Améthyste — boutique en ligne et portail professionnel",
    metaTitle: "Améthyste — étude de cas boutique en ligne",
    metaDescription:
      "Étude de cas : boutique en ligne bilingue et portail professionnel pour Améthyste, marque de soins capillaires fabriquée au Québec.",
    intro:
      "Améthyste conçoit et fabrique au Québec des soins capillaires professionnels haut de gamme. La marque vend à la fois au grand public et aux salons, deux clientèles avec des besoins complètement différents — et un seul site à construire.",
    sections: [
      {
        heading: "Le mandat",
        paragraphs: [
          "Améthyste avait besoin d'une boutique en ligne capable de soutenir un positionnement premium, sans ressembler à un gabarit de plateforme e-commerce reconnaissable au premier coup d'œil. Le produit se vend par la sensation qu'il dégage : la présentation devait être à la hauteur de la formule.",
          "Deuxième contrainte, plus structurante : la marque distribue aussi ses produits à des salons professionnels. Ces clients-là n'achètent pas au même prix, ni dans les mêmes quantités, ni avec le même parcours que le grand public. Il fallait deux expériences distinctes dans un seul site cohérent.",
        ],
      },
      {
        heading: "La réponse",
        paragraphs: [
          "Le site public est une boutique complète : catalogue, fiches produits détaillées, panier et paiement sécurisé. Chaque produit a sa propre page indexable, avec son contenu propre — la base pour être trouvé sur des recherches précises comme un nom de formule ou un type de soin.",
          "En parallèle, un espace professionnel protégé par authentification donne aux salons partenaires leur propre accès. À côté, une section formation et un guide d'entretien, parce qu'une marque de soins professionnels vend autant son expertise que ses bouteilles.",
          "Le tout est bilingue français-anglais, avec une section indiquant où trouver Améthyste en points de vente physiques.",
        ],
      },
    ],
    specs: [
      { label: "Type", value: "Boutique en ligne + portail B2B" },
      { label: "Secteur", value: "Cosmétique · Soins capillaires" },
      { label: "Langues", value: "Français, anglais" },
      { label: "Année", value: "2026" },
    ],
    delivered: [
      "Catalogue et fiches produits indexables individuellement",
      "Panier et paiement sécurisé",
      "Espace professionnel avec authentification",
      "Section formation et guide d'entretien",
      "Localisateur de points de vente",
      "Site bilingue français-anglais",
    ],
  },
  {
    slug: "lm-gestion-immobiliere",
    client: "LM Gestion Immobilière",
    url: "https://lmgestionimmobiliere.ca/",
    domain: "lmgestionimmobiliere.ca",
    sector: "Gestion immobilière",
    location: "Saguenay–Lac-Saint-Jean",
    year: "2026",
    tag: "Site + application de gestion",
    teaser:
      "Site corporatif, espace client et automatisation des opérations pour une maison de gestion immobilière privée au Saguenay.",
    image: "/travaux/lmgestion.jpg",
    imageAlt:
      "Page d'accueil du site LM Gestion Immobilière, gestion immobilière au Saguenay–Lac-Saint-Jean",
    title: "LM Gestion Immobilière — site corporatif et application de gestion",
    metaTitle: "LM Gestion Immobilière — étude de cas",
    metaDescription:
      "Étude de cas : site corporatif, espace client et automatisation des opérations pour LM Gestion Immobilière, maison de gestion immobilière privée au Saguenay–Lac-Saint-Jean.",
    intro:
      "LM Gestion Immobilière gère des immeubles pour des propriétaires du Saguenay–Lac-Saint-Jean — Chicoutimi, Jonquière, La Baie, Alma et la région. Le mandat visait trois fronts à la fois : les propriétaires à convaincre, les clients existants à outiller, et les opérations de la maison de gestion elle-même à décharger.",
    sections: [
      {
        heading: "Le mandat",
        paragraphs: [
          "Confier la gestion de son immeuble, c'est confier un patrimoine. La décision se prend sur la confiance, pas sur une liste de services. Le site devait donc porter une image de sérieux et de permanence — plus proche d'une maison de gestion privée que d'un fournisseur de services.",
          "Mais un site vitrine ne suffisait pas. Les propriétaires déjà clients avaient besoin de voir l'état de leur parc immobilier sans avoir à téléphoner ou attendre un rapport mensuel par courriel.",
        ],
      },
      {
        heading: "La réponse",
        paragraphs: [
          "La partie publique présente l'approche, les services et le portefeuille géré, dans un registre volontairement sobre. C'est un cas où retirer des éléments valait mieux qu'en ajouter : le silence visuel communique la solidité mieux qu'une page chargée.",
          "Derrière, un espace client donne aux propriétaires une vue sur leur parc immobilier, avec une assistance par intelligence artificielle pour interroger l'information plutôt que de fouiller dans des tableaux. C'est la partie qui fait basculer le projet d'un site vers une application — et c'est celle qui change le quotidien du client.",
        ],
      },
      {
        heading: "Les opérations",
        paragraphs: [
          "L'espace client n'aurait réglé que la moitié du problème : la charge restait entière du côté de LM, où chaque rapport, chaque avis et chaque suivi se montait à la main. L'application a donc pris en charge le travail répétitif de la maison de gestion elle-même.",
          "Les rapports aux propriétaires se génèrent à partir des données déjà saisies. Les avis de renouvellement de bail partent sans que personne y pense. Les demandes de réparation se suivent de la réception à la clôture, au même endroit. Les états de compte, la facturation récurrente et la relance des retards de paiement suivent la même logique.",
          "L'assistance par intelligence artificielle sert les deux publics avec le même principe : poser une question en français plutôt que de chercher la bonne colonne dans le bon tableau. Le temps ainsi rendu — au propriétaire comme au gestionnaire — est du temps qui retourne à l'entreprise plutôt qu'à la saisie.",
        ],
      },
    ],
    specs: [
      { label: "Type", value: "Site corporatif + application de gestion" },
      { label: "Secteur", value: "Immobilier · Gestion locative" },
      { label: "Territoire", value: "Saguenay–Lac-Saint-Jean" },
      { label: "Année", value: "2026" },
    ],
    delivered: [
      "Site corporatif : services, approche, portefeuille",
      "Espace client authentifié pour les propriétaires",
      "Vue du parc immobilier assistée par IA",
      "Rapports aux propriétaires générés automatiquement",
      "Avis de renouvellement de bail envoyés sans intervention",
      "Suivi des demandes de réparation, de la réception à la clôture",
      "États de compte, facturation récurrente et relance des retards",
      "Référencement local sur la région du Saguenay",
      "Pages légales et politique de confidentialité",
    ],
  },
  {
    slug: "josee-ann-jomphe",
    client: "Josée-Ann Jomphe",
    url: "https://jajomphe.ca/",
    domain: "jajomphe.ca",
    sector: "Courtage immobilier",
    location: "Saguenay–Lac-Saint-Jean",
    year: "2026",
    tag: "Site vitrine · Fiches de propriétés",
    teaser:
      "Site personnel et fiches de propriétés pour une courtière immobilière résidentielle et commerciale.",
    image: "/travaux/jajomphe.jpg",
    imageAlt:
      "Page d'accueil du site de Josée-Ann Jomphe, courtier immobilier au Saguenay",
    title: "Josée-Ann Jomphe — site de courtage et fiches de propriétés",
    metaTitle: "Josée-Ann Jomphe — courtier immobilier",
    metaDescription:
      "Étude de cas : site personnel, fiches de propriétés et section conseils pour Josée-Ann Jomphe, courtier immobilier au Saguenay–Lac-Saint-Jean.",
    intro:
      "Josée-Ann Jomphe est courtier immobilier résidentiel et commercial au Saguenay–Lac-Saint-Jean. Dans un marché où tous les courtiers partagent les mêmes inscriptions, la différence ne se fait pas sur les propriétés — elle se fait sur la personne.",
    sections: [
      {
        heading: "Le mandat",
        paragraphs: [
          "Le défi du courtage immobilier en ligne est structurel : les inscriptions sont les mêmes pour tout le monde, disponibles sur les grands portails. Un site de courtier qui ne fait que reproduire ces fiches n'a aucune raison d'exister.",
          "Le site devait donc être un site de personne avant d'être un catalogue — et en même temps rester utile pour quelqu'un qui cherche activement une propriété dans la région.",
        ],
      },
      {
        heading: "La réponse",
        paragraphs: [
          "L'accueil met la courtière au premier plan : son approche, son parcours, la confiance qu'elle a bâtie. Les avis Google sont mis en évidence dès le haut de la page, parce que c'est la preuve la plus crédible qu'un visiteur peut recevoir en trois secondes.",
          "Chaque propriété a ensuite sa propre fiche, avec sa propre adresse web indexable — un duplex à Jonquière, une unifamiliale à Saint-Honoré, une autre à Saint-David-de-Falardeau. Ces pages captent les recherches très précises que les grands portails traitent mal.",
          "Une section conseils alimente le site en contenu au fil du temps, et un parcours dédié permet de demander une évaluation de propriété — la demande qui transforme un visiteur en client.",
        ],
      },
    ],
    specs: [
      { label: "Type", value: "Site vitrine + fiches de propriétés" },
      { label: "Secteur", value: "Immobilier · Courtage" },
      { label: "Territoire", value: "Saguenay–Lac-Saint-Jean" },
      { label: "Année", value: "2026" },
    ],
    delivered: [
      "Fiches de propriétés avec adresse web indexable",
      "Parcours de demande d'évaluation de propriété",
      "Section conseils pour le contenu en continu",
      "Mise en avant des avis Google",
      "Référencement local par secteur et par ville",
    ],
  },
  {
    slug: "amelia-ruby",
    client: "Amélia Ruby",
    url: "https://ameliaruby.com/",
    domain: "ameliaruby.com",
    sector: "Maroquinerie artisanale",
    location: "Montréal",
    year: "2026",
    tag: "Site de marque · Boutique",
    teaser:
      "Site de marque et boutique pour une maison de haute maroquinerie artisanale de Montréal.",
    image: "/travaux/ameliaruby.jpg",
    imageAlt:
      "Page d'accueil du site Amélia Ruby, maison de haute maroquinerie artisanale à Montréal",
    title: "Amélia Ruby — site de marque et boutique",
    metaTitle: "Amélia Ruby — étude de cas site de marque",
    metaDescription:
      "Étude de cas : site de marque éditorial et boutique en ligne pour Amélia Ruby, maison de haute maroquinerie artisanale à Montréal.",
    intro:
      "Amélia Ruby est une maison de haute maroquinerie artisanale basée à Montréal : sacs à main, pochettes et créations sur mesure en cuir, façonnés à la main. Sur ce type de produit, le site n'est pas un catalogue — c'est le premier contact avec l'objet.",
    sections: [
      {
        heading: "Le mandat",
        paragraphs: [
          "Quand une pièce est faite à la main dans des matériaux nobles, le visiteur ne peut ni la toucher ni la soupeser. Tout ce qui lui reste pour juger, c'est la page. Un site mal fait ne fait pas juste mal paraître : il fait douter du produit.",
          "Le mandat était donc autant une question de retenue que de fonctionnalité. Il fallait une boutique qui fonctionne, sans jamais donner l'impression d'être une boutique générique.",
        ],
      },
      {
        heading: "La réponse",
        paragraphs: [
          "Un traitement éditorial plutôt que commercial : typographie sérif large, beaucoup de vide, une photographie qui occupe la moitié de l'écran, et une palette réduite au noir, au crème et à un or discret. Le produit est le seul élément coloré à l'écran.",
          "La collection et les créations sur mesure sont présentées comme des chapitres, avec un panier et un parcours d'achat complets. Le site est bilingue français-anglais, un choix évident pour une maison montréalaise qui vise aussi l'international.",
        ],
      },
    ],
    specs: [
      { label: "Type", value: "Site de marque + boutique" },
      { label: "Secteur", value: "Mode · Maroquinerie" },
      { label: "Langues", value: "Français, anglais" },
      { label: "Année", value: "2026" },
    ],
    delivered: [
      "Direction éditoriale et mise en page sur mesure",
      "Présentation de la collection et du sur-mesure",
      "Panier et parcours d'achat",
      "Site bilingue français-anglais",
      "Optimisation des images pour un affichage rapide",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
