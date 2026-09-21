/**
 * Content for the two landing pages (/creation-site-web-quebec and
 * /creation-application-web-quebec).
 *
 * Kept in a plain (non-"use client") module so the server components can read
 * the real arrays to emit JSON-LD, while the client components render them.
 * Same rationale as faqData.ts.
 *
 * Keep FAQ answers plain-text and self-contained so answer engines (ChatGPT,
 * Perplexity, Google AI Overviews) can quote them verbatim. Questions must not
 * duplicate the home-page FAQ in faqData.ts.
 *
 * These two pages carry the Google Ads traffic, so `blocks` is ordered for a
 * stranger who has never heard of the studio: the pain, the offer, then a proof
 * chain — real projects, real Google reviews, then the person responsible for
 * both — then the breadth, then a call to action, then the process.
 *
 * Les deux pages portent la douleur au même endroit : le sous-titre du hero,
 * puis l'intro des points de départ. Aucune ne lui consacre de bloc dédié, et
 * c'est délibéré — chacune en a eu un, chacune l'a perdu pour la même raison.
 * Un bloc entier posé entre le hero et les cartes répète une douleur déjà
 * nommée deux fois, et sur du trafic payant il retarde la preuve.
 *
 * Le corollaire, à ne pas réintroduire : ne jamais consacrer de section à
 * « site ou application ? ». C'est une question d'avant-clic. Le visiteur
 * arrive d'une annonce qui l'a déjà tranchée, et lui redémontrer son propre
 * choix se lit comme du remplissage.
 *
 * Two orderings are deliberate and easy to undo by accident. The founder block
 * sits inside the proof chain, not at the end of the page: "who am I dealing
 * with" is a doubt that blocks everything downstream, so it is answered while
 * the testimonials are still on screen. And breadth comes after proof, because
 * widening the offer before showing you can deliver the basics reads as a sales
 * pitch.
 *
 * The long prose is SEO and answer-engine depth: it stays, but it sits below
 * the point where a paid visitor decides to book or leave.
 */

import type { IconName } from "./icons";

export type Faq = { q: string; a: string };

/**
 * Bloc « qui est derrière », partagé par les deux landings. Défini une seule
 * fois : deux copies divergeraient à la première correction.
 *
 * Règle de rédaction à ne pas perdre en modifiant ce bloc : **aucune
 * comparaison avec une agence**. Ni « pas de sous-traitance », ni « pas de
 * gestionnaire de comptes », ni « et si je disparaissais ». Ces formules
 * paraissent rassurantes, mais elles plaident un dossier — et argumenter « je
 * ne vaux pas moins qu'une agence », c'est déjà accepter que la question se
 * pose. Le mot « seul » ne doit apparaître nulle part.
 *
 * Ce qui installe la confiance ici, c'est l'inverse d'un plaidoyer : des faits
 * sur le travail, un avis tranché, un refus assumé. Un jugement se démontre, il
 * ne se revendique pas — et c'est précisément ce qui sépare une compétence
 * réelle d'un site généré, la vraie question que se pose le visiteur.
 *
 * Le deuxième paragraphe cite des projets réels. Toute affirmation qui y est
 * faite doit rester adossée à projectsData.ts — c'est ce qui rend la section
 * vérifiable, et donc utile. Une réalisation embellie serait pire qu'aucune.
 */
const FOUNDER: Extract<Block, { kind: "founder" }> = {
  kind: "founder",
  eyebrow: "Qui est derrière",
  heading: "Je conçois, je code, je livre.",
  name: "Xavier Lavoie",
  role: "Fondateur · Lavoie Digital, région de Québec",
  paragraphs: [
    "Je m'appelle Xavier Lavoie. Je conçois et je développe des sites et des applications web depuis la région de Québec, pour des entrepreneurs et des PME d'ici. Chaque projet passe par mes mains, du premier croquis jusqu'à la mise en ligne — c'est ce qui me permet de vous dire pendant l'appel ce qui est faisable, en combien de temps et à quel prix.",
    "Les projets présentés juste au-dessus sont récents et tous en ligne. Prenez LM Gestion Immobilière, au Saguenay : le site public n'en était que la façade. L'application derrière travaille des deux côtés. Pour les propriétaires, un espace client où chacun voit l'état de son parc quand ça lui convient, au lieu de téléphoner ou d'attendre le rapport mensuel. Pour LM, tout ce qui se montait à la main est passé à l'application : les rapports aux propriétaires, les avis de renouvellement de bail, le suivi des demandes de réparation, la relance des paiements en retard. Et une intelligence artificielle intégrée interroge les données au lieu de laisser qui que ce soit fouiller des tableaux. Du temps récupéré des deux bords, remis dans la croissance plutôt que dans la saisie.",
    "Je ne pars jamais d'un thème acheté ni d'un gabarit : chaque page est construite pour ce que vous avez à dire, et c'est ce qui donne des pages qui s'affichent en une fraction de seconde et qu'un moteur de recherche comprend du premier coup. Je vous dirai aussi franchement quand une technologie à la mode — l'intelligence artificielle comprise — n'est pas la bonne réponse à votre problème. Vendre une fonction inutile est le meilleur moyen de perdre un client pour de bon.",
    "Ce que je préfère, c'est le moment où un site devient un outil : un portail client, un tableau de bord, quelque chose qui fait rouler l'entreprise au lieu de simplement la présenter. Et quoi qu'on construise, le code et les comptes sont à votre nom dès le départ. C'est votre outil, pas une location.",
  ],
  facts: [
    { label: "Basé à", value: "Région de Québec" },
    { label: "Langues", value: "Français et anglais" },
    { label: "Disponibilité", value: "8 h à 18 h, 7 jours" },
    { label: "Réponse", value: "Moins de 24 heures" },
  ],
};

/** Chiffre de réassurance affiché sous le H1, au-dessus de la ligne de flottaison. */
export type Fact = { value: string; label: string };

export type Block =
  | {
      kind: "prose";
      eyebrow: string;
      heading: string;
      paragraphs: string[];
    }
  /**
   * Familles de projets. Volontairement présentées comme des points de départ
   * et non comme un catalogue fermé : un visiteur dont le besoin ne rentre dans
   * aucune des quatre cases ferme l'onglet. C'est le bloc `capabilities`, plus
   * bas dans la page, qui porte l'étendue réelle — ce qui laisse ces cartes
   * rester concrètes.
   */
  | {
      kind: "cards";
      eyebrow: string;
      heading: string;
      intro?: string;
      cards: {
        icon: IconName;
        title: string;
        desc: string;
        bullets: string[];
      }[];
    }
  /**
   * Ce qui se greffe sur n'importe laquelle des familles de projets. Court,
   * dense, balayable : le but n'est pas de détailler mais de retirer le plafond
   * que le bloc `cards` a posé.
   *
   * Placé après la preuve et juste avant l'appel à l'action : on élargit
   * l'offre une fois le doute levé, et la note de bas de bloc — pour le besoin
   * qui n'entre dans aucune case — tombe alors directement avant le bouton.
   */
  | {
      kind: "capabilities";
      eyebrow: string;
      heading: string;
      intro?: string;
      items: { icon: IconName; title: string; desc: string }[];
      /** Dernière ligne, pour le besoin qui n'est dans aucune case. */
      footnote?: string;
    }
  | {
      kind: "steps";
      eyebrow: string;
      heading: string;
      intro?: string;
      steps: { num: string; title: string; meta: string; desc: string }[];
    }
  /**
   * Réalisations réelles, tirées de projectsData.ts par leur slug. On ne
   * recopie ni le titre ni l'image ici : un projet n'est décrit qu'à un seul
   * endroit, et les captures affichées sont celles des sites en ligne.
   */
  | {
      kind: "work";
      eyebrow: string;
      heading: string;
      intro?: string;
      slugs: string[];
    }
  /** Avis Google réels. Le bloc disparaît si reviewsData.ts est vide. */
  | { kind: "reviews" }
  /**
   * Appel à l'action de mi-page. Une page publicitaire longue ne peut pas
   * n'avoir qu'un seul point de conversion tout en bas : le visiteur convaincu
   * à la moitié de la page doit pouvoir agir sans remonter ni descendre.
   */
  | {
      kind: "band";
      title: string;
      text: string;
      cta: string;
    }
  /**
   * Qui tient le studio. Répond à une objection devenue courante : un site
   * soigné ne prouve plus qu'il y a une compétence derrière, puisqu'il peut
   * être généré. L'antidote n'est pas une belle phrase mais du vérifiable — un
   * nom, un visage, un parcours, des projets en ligne qu'on peut ouvrir.
   *
   * Écrit à la première personne, volontairement : le « nous » d'entreprise
   * annule tout l'effet.
   */
  | {
      kind: "founder";
      eyebrow: string;
      heading: string;
      name: string;
      role: string;
      paragraphs: string[];
      /** Repères courts, affichés en colonne à côté du portrait. */
      facts: { label: string; value: string }[];
    };

export type Landing = {
  slug: string;
  breadcrumb: string;
  /** Name used for the Service JSON-LD node. */
  serviceName: string;
  serviceType: string;
  eyebrow: string;
  h1: string;
  sub: string;
  /** Réassurance immédiate sous le H1 — quatre au maximum, sinon plus rien ne ressort. */
  facts: Fact[];
  blocks: Block[];
  faqTitle: string;
  faq: Faq[];
  /** Titre et texte de l'en-tête du formulaire, rendu en bas de page. */
  ctaTitle: string;
  ctaText: string;
  /**
   * Présélection de la première étape du formulaire. Doit correspondre à une
   * valeur de `PROJECT_TYPES` dans Booking.tsx. La page d'arrivée dit déjà quel
   * est le besoin : c'est une question de moins à poser.
   */
  bookingProjectType: "site" | "app";
};

/* ------------------------------------------------------------------ */
/* Site web                                                            */
/* ------------------------------------------------------------------ */

export const SITE_WEB: Landing = {
  slug: "/creation-site-web-quebec",
  breadcrumb: "Création de site web au Québec",
  serviceName: "Création de site web",
  serviceType: "Conception et développement de sites web",
  eyebrow: "Sites web · Québec",
  h1: "Création de site web au Québec",
  // Le sous-titre ouvre sur ce que le visiteur veut, pas sur ce qu'on vend :
  // la liste des livrables est déjà portée par les quatre cartes juste en
  // dessous, la répéter ici gaspillait la seule ligne lue par tout le monde.
  //
  // L'accroche promet le résultat et peint l'échec en une image concrète. Deux
  // formulations à ne pas y remettre : « votre prochain client vous cherche sur
  // Google en ce moment », qui est l'accroche la plus usée du marketing SEO et
  // décrète une urgence invérifiable ; et toute variante qui invite à aller
  // chercher sur Google, qui revient à payer une annonce pour envoyer le
  // visiteur ailleurs.
  sub: "Un site qui vous amène des appels, pas seulement une adresse à mettre sur vos cartes. Sites vitrines, boutiques et refontes codés sur mesure pour les PME du Québec — environ deux semaines jusqu'au lancement, suivi illimité.",
  facts: [
    { value: "≈ 2 semaines", label: "du feu vert au lancement" },
    { value: "Devis fixe", label: "après un appel gratuit" },
    { value: "Sur mesure", label: "aucun thème, aucun gabarit" },
    { value: "Suivi illimité", label: "réponse en moins de 24 h" },
  ],
  blocks: [
    {
      kind: "cards",
      eyebrow: "Points de départ",
      heading: "La plupart des projets commencent par l'un des quatre.",
      // L'intro nomme la douleur avant d'ouvrir le catalogue. Sans elle, les
      // quatre cartes arrivent à froid — le même écueil que le bloc « point de
      // bascule » évite sur la page applications.
      intro:
        "La plupart des gens arrivent ici avec le même constat : le site actuel n'amène aucun appel, ou il n'y en a pas encore. Ce ne sont pas des forfaits mais des points d'entrée — beaucoup de mandats sont à cheval sur deux.",
      cards: [
        {
          icon: "window",
          title: "Site vitrine",
          desc: "Présenter l'entreprise, établir la crédibilité et générer des appels. Le format le plus demandé, et souvent le plus rentable.",
          bullets: [
            "Pages services, à propos et contact",
            "Formulaire relié directement à vos courriels",
            "Structure pensée pour la recherche locale",
          ],
        },
        {
          icon: "bag",
          title: "Boutique en ligne",
          desc: "Vendre vos produits directement, sans commission de plateforme et sans limite imposée sur la présentation.",
          bullets: [
            "Catalogue, panier et paiement sécurisé",
            "Gestion des stocks et des commandes",
            "Fiches produits optimisées pour la recherche",
          ],
        },
        {
          icon: "target",
          title: "Page de vente",
          desc: "Une offre, un objectif, une conversion. Idéale pour lancer un service précis ou soutenir une campagne publicitaire.",
          bullets: [
            "Un seul objectif par page",
            "Contenu structuré pour convaincre",
            "Mesure des conversions dès le lancement",
          ],
        },
        {
          icon: "refresh",
          title: "Refonte de site web",
          desc: "Repartir d'une base saine quand le site actuel est lent, daté, impossible à modifier ou invisible sur Google.",
          bullets: [
            "Reprise et réécriture du contenu existant",
            "Redirections pour conserver votre référencement",
            "Migration sans perte de trafic",
          ],
        },
      ],
    },
    {
      kind: "work",
      eyebrow: "Travaux",
      heading: "Des sites en ligne, pour de vrais clients.",
      intro:
        "Quatre sites livrés et publics. Chacun est en ligne en ce moment — cliquez sur le lien et jugez par vous-même.",
      slugs: [
        "saga-consultants",
        "amethyste",
        "josee-ann-jomphe",
        "amelia-ruby",
      ],
    },
    // FOUNDER suit immédiatement les travaux : son texte dit « les projets
    // présentés juste au-dessus ». Les avis viennent ensuite, où ils cautionnent
    // une personne qu'on vient de présenter plutôt qu'un studio anonyme.
    FOUNDER,
    { kind: "reviews" },
    {
      kind: "capabilities",
      eyebrow: "Ce qui se greffe",
      heading: "Un site, et tout ce qui le rend utile.",
      intro:
        "Rien de tout ça n'est un module vendu à part : ce sont les briques qu'on ajoute quand elles servent votre objectif, et qu'on laisse de côté quand elles ne servent qu'à gonfler une facture.",
      items: [
        {
          icon: "search",
          title: "Référencement",
          desc: "Structure, données structurées et performance travaillées dès le premier jour, pas ajoutées à la fin.",
        },
        {
          icon: "sparkle",
          title: "Visibilité dans l'IA",
          desc: "Être cité par ChatGPT, Perplexity et les aperçus Google. Un chantier que la plupart des sites ignorent encore.",
        },
        {
          icon: "bolt",
          title: "Automatisations",
          desc: "Formulaires qui créent une fiche, relances programmées, rapports envoyés seuls. Moins de saisie manuelle.",
        },
        {
          icon: "link",
          title: "Intégrations",
          desc: "Votre comptabilité, votre CRM, votre calendrier, vos courriels. Le site parle à ce que vous utilisez déjà.",
        },
        {
          icon: "card",
          title: "Paiements",
          desc: "Boutique, acomptes, abonnements ou prise de rendez-vous payante, encaissés sans commission de plateforme.",
        },
        {
          icon: "sliders",
          title: "Espace de gestion",
          desc: "Modifier vos textes, vos images et vos pages vous-même, sans toucher au code ni demander la permission.",
        },
        {
          icon: "chart",
          title: "Mesure",
          desc: "Savoir d'où viennent vos clients et quelles pages convertissent. Sans ça, tout budget publicitaire est aveugle.",
        },
        {
          icon: "cloud",
          title: "Mise en ligne et suivi",
          desc: "Hébergement, nom de domaine, certificat, sauvegardes. Les comptes sont à votre nom, jamais au nôtre.",
        },
      ],
      footnote:
        "Votre besoin n'est dans aucune case ? C'est souvent le signe d'un projet intéressant. Décrivez-le à l'appel, on vous dira franchement si c'est pour nous.",
    },
    {
      kind: "band",
      title: "Trente minutes suffisent pour savoir si ça vaut la peine.",
      text: "Un appel découverte gratuit, sans engagement. On regarde votre situation et vous ressortez avec un plan écrit — même si vous décidez de ne pas aller plus loin.",
      cta: "Réserver mon appel gratuit",
    },
    {
      kind: "steps",
      eyebrow: "Processus",
      heading: "Deux semaines, quatre étapes.",
      intro:
        "L'échéancier et le prix sont fixés avant qu'on commence. Vous savez à chaque instant où en est votre projet.",
      steps: [
        {
          num: "01",
          title: "Découverte",
          meta: "2–3 jours",
          desc: "On clarifie l'objectif du site, votre clientèle, les pages nécessaires et les termes de recherche qui comptent dans votre marché. Vous ressortez avec un plan écrit et un devis fixe.",
        },
        {
          num: "02",
          title: "Design",
          meta: "3–5 jours",
          desc: "Maquette de chaque page, sur mobile comme sur ordinateur. On ajuste jusqu'à ce que vous soyez satisfait — avant qu'une seule ligne de code soit écrite.",
        },
        {
          num: "03",
          title: "Développement",
          meta: "1–2 semaines",
          desc: "Intégration, mise en place du contenu, formulaires, référencement technique, tests sur les principaux navigateurs et sur téléphone.",
        },
        {
          num: "04",
          title: "Lancement et suivi",
          meta: "En continu",
          desc: "Mise en ligne, connexion à Google Search Console et à votre fiche Google, puis suivi illimité : questions, ajustements et optimisations avec une réponse en moins de 24 heures.",
        },
      ],
    },
    {
      kind: "prose",
      eyebrow: "Investissement",
      heading: "Combien coûte un site web au Québec ?",
      paragraphs: [
        "Ça dépend du nombre de pages, des fonctions requises et de la quantité de contenu à produire. N'importe qui vous donnant un chiffre avant d'avoir posé une seule question improvise.",
        "Ce qui est garanti, c'est la méthode : après l'appel découverte — gratuit et sans engagement — vous recevez un devis fixe et détaillé, ligne par ligne. Le montant ne bouge pas en cours de route, sauf si vous décidez vous-même d'ajouter quelque chose au projet.",
        "Aucun abonnement obligatoire, aucun frais caché, aucune rétention. Le site vous appartient, le nom de domaine reste à votre nom, et vous pouvez partir avec le tout si un jour vous le souhaitez.",
      ],
    },
    /* Second point de conversion. La page est longue et le premier CTA est loin
       derrière : celui-ci tombe juste après la réponse sur le prix, au moment
       où la dernière objection vient d'être levée. */
    {
      kind: "band",
      title: "Le devis est gratuit et le montant ne bouge pas.",
      text: "Trente minutes d'appel, un plan écrit, un prix ferme. Vous repartez avec les deux même si vous décidez de ne pas aller plus loin.",
      cta: "Obtenir mon devis",
    },
    {
      kind: "prose",
      eyebrow: "Découvrabilité",
      heading: "Conçu pour être trouvé — sur Google et dans les réponses des IA.",
      paragraphs: [
        // La phrase d'accroche « un beau site que personne ne trouve ne sert à
        // rien » a été retirée : le sous-titre du hero et l'intro des points de
        // départ portent déjà ce constat, ça faisait la troisième fois.
        "Le référencement n'est pas une étape qu'on ajoute à la fin du projet : il est dans la structure du site dès le premier jour.",
        "Côté Google, ça veut dire des titres et des descriptions travaillés page par page, des données structurées qui décrivent votre entreprise et vos services dans un format que les moteurs lisent directement, un plan de site propre, et des performances qui tiennent la route sur un téléphone en réseau cellulaire.",
        "Côté intelligence artificielle, c'est un chantier plus récent que la plupart des sites ignorent encore complètement. Vos futurs clients posent maintenant leurs questions à ChatGPT, à Perplexity et aux aperçus IA de Google. Pour être cité dans ces réponses, un site doit exposer son contenu en texte clair, répondre à de vraies questions plutôt qu'empiler des slogans, et autoriser explicitement les robots de ces plateformes à le lire. C'est ce qu'on appelle l'AEO et le GEO.",
        "On applique à votre site exactement ce qu'on applique au nôtre — et on vous explique ce qui a été fait, pour que vous puissiez le vérifier.",
      ],
    },
    /* Le bloc « Territoire » a été retiré : il était placé juste avant la
       question FAQ qui dit la même chose, donc le visiteur lisait deux fois de
       suite l'information. Les villes desservies et les heures ont été repliées
       dans cette réponse — le signal local est conservé, la section en moins. */
  ],
  faqTitle: "Les questions qu'on nous pose sur la création de sites web.",
  faq: [
    {
      q: "Est-ce que je pourrai modifier mon site moi-même ?",
      a: "Oui, si vous le souhaitez. On peut brancher une interface de gestion de contenu qui vous permet de modifier vos textes, vos images et vos pages sans toucher au code. Certains clients préfèrent nous envoyer leurs changements et qu'on les applique — c'est inclus dans le suivi illimité, donc les deux options fonctionnent.",
    },
    {
      q: "Est-ce que mon site sera bien affiché sur téléphone ?",
      a: "Oui, et c'est même la priorité. La majorité du trafic web au Québec vient du téléphone, et Google évalue votre site d'après sa version mobile. Chaque page est conçue et testée sur téléphone, tablette et ordinateur avant la mise en ligne.",
    },
    {
      q: "Qu'est-ce qui arrive à mon référencement si je refais mon site ?",
      a: "Il est protégé, à condition que la refonte soit faite correctement. On répertorie vos adresses actuelles, on met en place des redirections permanentes vers les nouvelles, on conserve le contenu qui performe déjà et on soumet le nouveau plan de site à Google. Une refonte mal gérée peut faire perdre des années de référencement : c'est précisément pour ça que cette étape n'est pas optionnelle chez nous.",
    },
    {
      q: "Qui s'occupe de l'hébergement et du nom de domaine ?",
      a: "On s'occupe de la configuration technique complète : hébergement, nom de domaine, certificat de sécurité et courriels si nécessaire. Les comptes sont créés à votre nom et vous en gardez la propriété — on y accède comme collaborateur, jamais comme propriétaire.",
    },
    {
      q: "Est-ce que les textes et les photos sont inclus ?",
      a: "La structure des textes et l'optimisation pour la recherche font partie du travail. Si vous avez déjà du contenu, on le reprend et on le retravaille. Si vous partez de zéro, on peut rédiger les pages avec vous à partir de l'appel découverte. Pour les photos, on utilise les vôtres quand elles sont bonnes et on suggère des solutions quand il en manque.",
    },
    {
      q: "Travaillez-vous avec des entreprises en dehors de la ville de Québec ?",
      a: "Oui. Le studio est basé dans la région de Québec et sert les PME de partout au Québec et au Canada : Montréal, Lévis, Trois-Rivières, Sherbrooke, Saguenay et Gatineau notamment. On rencontre en personne les entreprises de Québec et de Lévis quand ça aide ; ailleurs, les projets se déroulent exactement de la même façon par visioconférence et par courriel. Les mandats se mènent aussi bien en français qu'en anglais, de 8 h à 18 h, sept jours sur sept.",
    },
  ],
  ctaTitle: "Parlons de votre site web.",
  ctaText:
    "Un appel découverte gratuit de 30 minutes. On regarde votre situation, ce que font vos concurrents, et ce qui serait réellement utile pour vous. Aucune obligation à la sortie.",
  bookingProjectType: "site",
};

/* ------------------------------------------------------------------ */
/* Application web                                                     */
/* ------------------------------------------------------------------ */

export const APPLICATION_WEB: Landing = {
  slug: "/creation-application-web-quebec",
  breadcrumb: "Création d'application web au Québec",
  serviceName: "Création d'application web sur mesure",
  serviceType: "Développement d'applications web, de logiciels de gestion et de portails clients",
  eyebrow: "Applications · Québec",
  h1: "Création d'application web au Québec",
  // Même logique que la page sites : l'accroche porte le résultat, la liste des
  // livrables suit (elle reste entière, chaque terme est un mot-clé de
  // recherche). C'est désormais le seul endroit de la page qui nomme la douleur
  // avant les cartes — le bloc qui s'en chargeait a été retiré, voir la note en
  // tête du fichier.
  sub: "Ce que vous refaites à la main chaque semaine devrait se faire tout seul. Logiciels de gestion, CRM, portails clients et tableaux de bord développés sur mesure pour les entreprises du Québec — environ quatre semaines jusqu'à la mise en service.",
  facts: [
    { value: "≈ 4 semaines", label: "jusqu'à la mise en service" },
    { value: "Devis fixe", label: "après un appel de cadrage" },
    { value: "Code et données", label: "à vous, sans exception" },
    { value: "Suivi illimité", label: "réponse en moins de 24 h" },
  ],
  blocks: [
    {
      kind: "cards",
      eyebrow: "Points de départ",
      heading: "La plupart des projets commencent par l'un des quatre.",
      // Premier bloc de la page, directement après le hero.
      //
      // Un bloc « Le point de bascule » occupait cette place et argumentait
      // « site ou application ? ». Retiré : c'est une question d'avant-clic. Le
      // visiteur arrive d'une annonce sur les applications, il a déjà tranché —
      // lui redémontrer son propre choix retarde ce qu'il vient chercher. Sa
      // seule phrase qui portait, l'antithèse, ouvre maintenant cette intro.
      intro:
        "Un site web présente votre entreprise ; une application la fait fonctionner. Ce ne sont pas des forfaits mais des points d'entrée — la majorité des mandats en combinent deux, un portail client alimenté par un outil interne par exemple, et tout ce qui suit peut s'y greffer.",
      cards: [
        // L'automatisation est une porte d'entrée, pas une option : c'est elle
        // qui tient la promesse du sous-titre, et le studio ne cherche pas de
        // mandats de produit vendu par abonnement. La carte « SaaS » qui
        // occupait cette place a été retirée pour cette raison — la remettre
        // reviendrait à mettre en vitrine un mandat qu'on ne veut pas.
        //
        // À distinguer de « Outil interne », juste après : ici le travail se
        // fait sans personne, là c'est l'endroit où les gens travaillent.
        {
          icon: "bolt",
          title: "Automatisation des opérations",
          desc: "Le travail répétitif exécuté par la machine : trier les demandes qui entrent, relancer, produire les documents, envoyer les rapports. Personne n'y pense, ça se fait.",
          bullets: [
            "Tri et acheminement des demandes entrantes",
            "Relances et rappels déclenchés par vos règles",
            "Documents et rapports générés puis expédiés seuls",
          ],
        },
        {
          icon: "sliders",
          title: "Outil interne",
          desc: "Remplacer les fichiers partagés et les processus manuels par un système unique où l'information ne se perd pas.",
          bullets: [
            "Formulaires et validations calqués sur vos règles",
            "Historique complet et traçabilité des actions",
            "Accès distincts par équipe et par fonction",
          ],
        },
        {
          icon: "portal",
          title: "Portail client",
          desc: "Donner à vos clients un espace à eux, et arrêter de répondre trois fois par jour aux mêmes demandes de suivi.",
          bullets: [
            "Suivi de dossiers, devis et commandes",
            "Documents, contrats et factures au même endroit",
            "Notifications automatiques aux étapes clés",
          ],
        },
        {
          icon: "chart",
          title: "Tableau de bord",
          desc: "Rassembler des données éparpillées entre plusieurs systèmes pour enfin voir ce qui se passe dans l'entreprise.",
          bullets: [
            "Indicateurs consolidés en temps réel",
            "Rapports exportables et envois programmés",
            "Connexion à vos outils et systèmes existants",
          ],
        },
      ],
    },
    {
      kind: "work",
      eyebrow: "Travaux",
      heading: "Deux projets où le site est devenu un outil.",
      intro:
        "Dans les deux cas, la partie publique n'était que la moitié du mandat : derrière l'authentification, il y a un espace où le client travaille pour de vrai.",
      slugs: ["lm-gestion-immobiliere", "amethyste"],
    },
    // Même ordre que la page « sites » : voir la note là-bas.
    FOUNDER,
    { kind: "reviews" },
    {
      kind: "capabilities",
      eyebrow: "Ce qui se greffe",
      heading: "Les briques qui s'ajoutent, selon ce que vous avez à faire.",
      intro:
        "Aucune n'est un module vendu à part. On les met en place quand elles font gagner du temps ou de l'argent, et on les écarte quand elles ne serviraient qu'à alourdir le projet.",
      items: [
        // « Automatisations » a quitté cette liste : c'est maintenant la
        // première des quatre portes d'entrée, plus haut dans la page. La
        // laisser ici la présenterait comme un module d'appoint après l'avoir
        // annoncée comme l'offre.
        {
          icon: "sparkle",
          title: "Intelligence artificielle",
          desc: "Extraction d'un document scanné, résumé d'un dossier, questions posées en langage courant sur vos propres données.",
        },
        {
          icon: "link",
          title: "Intégrations",
          desc: "Comptabilité, CRM, paiements, courriels, calendriers. On branche l'application à vos systèmes pour éviter la double saisie.",
        },
        {
          icon: "lock",
          title: "Comptes et permissions",
          desc: "Authentification sérieuse, accès distincts par équipe et par fonction, journal des actions vérifiable.",
        },
        {
          icon: "card",
          title: "Facturation",
          desc: "Abonnements, forfaits, factures et paiements récurrents, y compris les cas de figure que les outils génériques refusent.",
        },
        {
          icon: "database",
          title: "Reprise de données",
          desc: "Vos fichiers Excel, vos anciens systèmes et vos historiques, importés proprement plutôt que ressaisis à la main.",
        },
        {
          icon: "chart",
          title: "Rapports",
          desc: "Indicateurs consolidés, exports et envois programmés. Voir ce qui se passe sans avoir à le compiler soi-même.",
        },
        {
          icon: "cloud",
          title: "Mise en service et suivi",
          desc: "Déploiement, sauvegardes automatiques, formation de votre équipe, puis itérations selon l'usage réel.",
        },
      ],
      footnote:
        "Votre besoin n'est dans aucune case ? C'est souvent le signe d'un projet intéressant. Décrivez votre processus à l'appel, on vous dira franchement si c'est pour nous.",
    },
    {
      kind: "band",
      title: "Décrivez-moi votre processus actuel. Trente minutes.",
      text: "Un appel de cadrage gratuit, sans engagement. On regarde ce qui vous coûte du temps aujourd'hui et à quoi ressemblerait une première version utile.",
      cta: "Réserver mon appel gratuit",
    },
    {
      kind: "steps",
      eyebrow: "Processus",
      heading: "Quatre semaines, quatre étapes.",
      intro:
        "Vous voyez l'application fonctionner bien avant la fin du projet. Pas de longue période d'attente suivie d'une grande révélation.",
      steps: [
        {
          num: "01",
          title: "Cadrage",
          meta: "3–5 jours",
          desc: "On cartographie vos processus actuels, on repère ce qui mérite d'être automatisé et on délimite la première version réellement utile. Vous recevez un plan fonctionnel et un devis fixe.",
        },
        {
          num: "02",
          title: "Design et architecture",
          meta: "5–7 jours",
          desc: "Écrans, parcours utilisateur, modèle de données et plan de sécurité. C'est l'étape où on évite les erreurs coûteuses à corriger plus tard.",
        },
        {
          num: "03",
          title: "Développement",
          meta: "2–3 semaines",
          desc: "Construction par tranches fonctionnelles. Vous testez au fur et à mesure sur un environnement dédié et vous donnez votre avis pendant qu'il est encore facile d'ajuster.",
        },
        {
          num: "04",
          title: "Mise en service et suivi",
          meta: "En continu",
          desc: "Déploiement, reprise de vos données existantes, formation de votre équipe, puis itérations continues selon l'usage réel. Réponse en moins de 24 heures.",
        },
      ],
    },
    {
      kind: "prose",
      eyebrow: "Investissement",
      heading: "Combien coûte une application web ?",
      paragraphs: [
        "Une application se chiffre à partir de son périmètre : le nombre d'écrans, la complexité des règles d'affaires, les intégrations avec vos systèmes actuels et le nombre de types d'utilisateurs à gérer.",
        "L'approche qu'on recommande presque toujours : commencer par une première version restreinte mais complètement fonctionnelle, la mettre en service rapidement, puis ajouter au fil de l'usage réel. Ça coûte nettement moins cher qu'un cahier de charges de quatre-vingts pages dont la moitié des fonctions ne servira jamais — et vous commencez à en tirer de la valeur des semaines plus tôt.",
        "Devis fixe après l'appel de cadrage, gratuit et sans engagement.",
      ],
    },
    /* Second point de conversion — même logique que sur la page site web : il
       suit immédiatement la réponse sur le prix. */
    {
      kind: "band",
      title: "Décrivez votre processus, on chiffre la première version.",
      text: "Trente minutes d'appel de cadrage, un plan fonctionnel et un devis fixe. Gratuit, et sans engagement à la sortie.",
      cta: "Obtenir mon devis",
    },
    {
      kind: "prose",
      eyebrow: "Intelligence artificielle",
      heading: "L'IA, quand elle sert réellement à quelque chose.",
      paragraphs: [
        "L'intelligence artificielle est utile dans une application quand elle retire du travail répétitif : trier des demandes entrantes, extraire l'information d'un document scanné, résumer l'historique d'un dossier, répondre à des questions posées en langage courant sur vos propres données.",
        "Ce qu'on évite : ajouter un module d'IA parce que ça se vend bien. Si un traitement classique fait le travail de façon plus fiable, plus rapide et moins coûteuse, c'est celui-là qu'on met en place. On vous dira franchement quand l'IA n'est pas la bonne réponse.",
        "Quand elle a sa place, on l'intègre avec les mêmes exigences que le reste du système : vos données demeurent les vôtres et ne servent pas à entraîner un modèle public, les traitements sont journalisés et vérifiables, et le comportement reste prévisible même quand le modèle se trompe.",
      ],
    },
    {
      kind: "prose",
      eyebrow: "Fondations",
      heading: "Sécurité, sauvegardes et évolutivité.",
      paragraphs: [
        "Une application qui gère vos données d'affaires n'a pas le droit de tomber. Authentification sérieuse, permissions par rôle, chiffrement des échanges, sauvegardes automatiques et journal des accès font partie de la base du projet, pas d'une liste d'options à cocher en supplément.",
        "L'application est construite pour grandir. Ajouter un module, un type d'utilisateur ou une intégration six mois après le lancement ne doit pas obliger à tout reprendre — et c'est le genre de décision qui se joue à l'étape d'architecture, avant le premier écran.",
        "Vous êtes propriétaire du code et de vos données, sans exception. Si un jour vous voulez changer de fournisseur ou monter votre propre équipe technique, tout vous est remis, documenté.",
      ],
    },
    /* « Territoire » retiré pour la même raison que sur la page site web : la
       question FAQ sur la distance le redisait intégralement, juste en dessous.
       Villes et heures repliées dans cette réponse. */
  ],
  faqTitle: "Les questions qu'on nous pose sur les applications web.",
  faq: [
    {
      q: "Quelle est la différence entre un site web et une application web ?",
      a: "Un site web sert à informer et à convaincre : on le consulte, on lit, on remplit un formulaire de contact. Une application web sert à travailler : on s'y connecte avec un compte, on y saisit et consulte des données, et elle exécute une logique qui vous appartient. En résumé, un site attire des clients, une application fait rouler l'entreprise ou constitue le produit lui-même.",
    },
    {
      q: "Peut-on connecter l'application à nos outils actuels ?",
      a: "Oui, dans la grande majorité des cas. Si vos logiciels actuels offrent une interface de programmation — la plupart des systèmes comptables, CRM, plateformes de paiement et services d'envoi de courriels en ont une — on peut y brancher l'application pour éviter la double saisie. On vérifie la faisabilité pendant l'étape de cadrage, avant de vous engager.",
    },
    {
      q: "Combien d'utilisateurs l'application peut-elle supporter ?",
      a: "L'architecture est prévue pour monter en charge bien au-delà de vos besoins de départ. Une application conçue correctement passe de dix à des milliers d'utilisateurs sans réécriture : ce qui change, c'est la capacité du serveur, un réglage qui s'ajuste sans toucher au code.",
    },
    {
      q: "Que se passe-t-il si on a besoin d'une nouvelle fonction après le lancement ?",
      a: "C'est prévu, et c'est même normal — les meilleures idées apparaissent après quelques semaines d'utilisation réelle. Le suivi illimité couvre les questions, les ajustements et les optimisations. Pour un module d'envergure, on établit un devis à part, en réutilisant les fondations déjà en place.",
    },
    {
      q: "À qui appartiennent le code et les données ?",
      a: "À vous, entièrement. Le code source vous est remis et vos données restent hébergées sur des comptes à votre nom. Il n'y a aucune clause de rétention : si vous décidez de continuer avec quelqu'un d'autre, tout est transféré avec sa documentation.",
    },
    {
      q: "Faut-il être à Québec pour travailler avec vous ?",
      a: "Non. Le studio est basé dans la région de Québec, mais les projets d'application se déroulent aussi bien à distance, par visioconférence et sur un environnement de test partagé. On travaille avec des entreprises de Montréal, Lévis, Trois-Rivières, Sherbrooke, Saguenay et Gatineau, et de partout ailleurs au Québec et au Canada, avec des rencontres en personne quand le contexte le justifie. Service en français et en anglais, de 8 h à 18 h, sept jours sur sept.",
    },
  ],
  ctaTitle: "Parlons de votre application.",
  ctaText:
    "Un appel de cadrage gratuit de 30 minutes. On regarde vos processus actuels, ce qui vous coûte du temps, et à quoi ressemblerait une première version utile. Aucune obligation à la sortie.",
  bookingProjectType: "app",
};
