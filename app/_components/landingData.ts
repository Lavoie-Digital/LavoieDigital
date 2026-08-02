/**
 * Content for the two SEO landing pages (/creation-site-web-quebec and
 * /creation-application-web-quebec).
 *
 * Kept in a plain (non-"use client") module so the server components can read
 * the real arrays to emit JSON-LD, while the client components render them.
 * Same rationale as faqData.ts.
 *
 * Keep FAQ answers plain-text and self-contained so answer engines (ChatGPT,
 * Perplexity, Google AI Overviews) can quote them verbatim. Questions must not
 * duplicate the home-page FAQ in faqData.ts.
 */

export type Faq = { q: string; a: string };

export type Block =
  | {
      kind: "prose";
      eyebrow: string;
      heading: string;
      paragraphs: string[];
    }
  | {
      kind: "cards";
      eyebrow: string;
      heading: string;
      intro?: string;
      cards: { num: string; title: string; desc: string; bullets: string[] }[];
    }
  | {
      kind: "steps";
      eyebrow: string;
      heading: string;
      intro?: string;
      steps: { num: string; title: string; meta: string; desc: string }[];
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
  blocks: Block[];
  faqTitle: string;
  faq: Faq[];
  ctaTitle: string;
  ctaText: string;
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
  sub: "Sites vitrines, boutiques en ligne et refontes codés sur mesure pour les entrepreneurs et les PME du Québec. Environ deux semaines jusqu'au lancement, suivi illimité ensuite.",
  blocks: [
    {
      kind: "prose",
      eyebrow: "Le studio",
      heading: "Un site web codé sur mesure, pas un thème reconfiguré.",
      paragraphs: [
        "Lavoie Digital est un studio de développement web basé à Québec. On conçoit et on code des sites pour les entreprises qui ont besoin d'un vrai outil de travail : quelque chose qui charge vite, qui se retrouve sur Google, et qui donne envie de vous appeler.",
        "La différence avec un site monté sur un thème acheté, c'est le contrôle. Un thème arrive avec des dizaines de fonctions dont vous n'aurez jamais besoin, du code que personne n'a écrit pour votre projet, et un plafond de performance que vous ne pouvez pas dépasser. Ici, chaque page est construite pour ce que vous avez à dire.",
        "En pratique, ça donne des pages qui s'affichent en une fraction de seconde, une structure que les moteurs de recherche comprennent du premier coup, et aucune dépendance à une extension tierce qui casse à la prochaine mise à jour.",
        "Le fondateur conçoit et code lui-même chaque projet. Vous parlez directement à la personne qui construit votre site — pas à un gestionnaire de comptes qui relaie vos messages.",
      ],
    },
    {
      kind: "cards",
      eyebrow: "Ce qu'on construit",
      heading: "Quatre types de sites web.",
      intro:
        "La plupart des projets tombent dans une de ces catégories. Si le vôtre est à cheval sur deux, on en discute à l'appel découverte.",
      cards: [
        {
          num: "01",
          title: "Site vitrine",
          desc: "Présenter l'entreprise, établir la crédibilité et générer des appels. Le format le plus demandé, et souvent le plus rentable.",
          bullets: [
            "Pages services, à propos et contact",
            "Formulaire relié directement à vos courriels",
            "Structure pensée pour la recherche locale",
          ],
        },
        {
          num: "02",
          title: "Boutique en ligne",
          desc: "Vendre vos produits directement, sans commission de plateforme et sans limite imposée sur la présentation.",
          bullets: [
            "Catalogue, panier et paiement sécurisé",
            "Gestion des stocks et des commandes",
            "Fiches produits optimisées pour la recherche",
          ],
        },
        {
          num: "03",
          title: "Page de vente",
          desc: "Une offre, un objectif, une conversion. Idéale pour lancer un service précis ou soutenir une campagne publicitaire.",
          bullets: [
            "Un seul objectif par page",
            "Contenu structuré pour convaincre",
            "Mesure des conversions dès le lancement",
          ],
        },
        {
          num: "04",
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
      kind: "prose",
      eyebrow: "Découvrabilité",
      heading: "Conçu pour être trouvé — sur Google et dans les réponses des IA.",
      paragraphs: [
        "Un beau site que personne ne trouve ne sert à rien. Le référencement n'est pas une étape qu'on ajoute à la fin du projet : il est dans la structure du site dès le premier jour.",
        "Côté Google, ça veut dire des titres et des descriptions travaillés page par page, des données structurées qui décrivent votre entreprise et vos services dans un format que les moteurs lisent directement, un plan de site propre, et des performances qui tiennent la route sur un téléphone en réseau cellulaire.",
        "Côté intelligence artificielle, c'est un chantier plus récent que la plupart des sites ignorent encore complètement. Vos futurs clients posent maintenant leurs questions à ChatGPT, à Perplexity et aux aperçus IA de Google. Pour être cité dans ces réponses, un site doit exposer son contenu en texte clair, répondre à de vraies questions plutôt qu'empiler des slogans, et autoriser explicitement les robots de ces plateformes à le lire. C'est ce qu'on appelle l'AEO et le GEO.",
        "On applique à votre site exactement ce qu'on applique au nôtre — et on vous explique ce qui a été fait, pour que vous puissiez le vérifier.",
      ],
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
    {
      kind: "prose",
      eyebrow: "Territoire",
      heading: "À Québec, et partout au Québec.",
      paragraphs: [
        "Le studio est établi dans la région de Québec. On rencontre en personne les entreprises de la ville de Québec et de Lévis quand ça aide, et on travaille à distance avec Montréal, Trois-Rivières, Sherbrooke, Saguenay, Gatineau et le reste du Canada.",
        "Les projets se mènent aussi bien en français qu'en anglais. Les horaires sont de 8 h à 18 h, sept jours sur sept.",
      ],
    },
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
      a: "Oui. Le studio est basé à Québec et sert les PME de partout au Québec et au Canada : Montréal, Lévis, Trois-Rivières, Sherbrooke, Saguenay et Gatineau notamment. Les projets à distance se déroulent exactement de la même façon, par visioconférence et par courriel.",
    },
  ],
  ctaTitle: "Parlons de votre site web.",
  ctaText:
    "Un appel découverte gratuit de 30 minutes. On regarde votre situation, ce que font vos concurrents, et ce qui serait réellement utile pour vous. Aucune obligation à la sortie.",
};

/* ------------------------------------------------------------------ */
/* Application web                                                     */
/* ------------------------------------------------------------------ */

export const APPLICATION_WEB: Landing = {
  slug: "/creation-application-web-quebec",
  breadcrumb: "Création d'application web au Québec",
  serviceName: "Création d'application web sur mesure",
  serviceType: "Développement d'applications web et de plateformes SaaS",
  eyebrow: "Applications · Québec",
  h1: "Création d'application web au Québec",
  sub: "Plateformes SaaS, outils internes, portails clients et tableaux de bord développés sur mesure pour les entreprises du Québec. Environ quatre semaines jusqu'à la mise en service.",
  blocks: [
    {
      kind: "prose",
      eyebrow: "Le point de bascule",
      heading: "Quand un site web ne suffit plus.",
      paragraphs: [
        "Un site web présente votre entreprise. Une application web la fait fonctionner. La bascule arrive généralement le jour où vous constatez que vos opérations se gèrent dans des fichiers Excel qui s'échangent par courriel, ou dans un logiciel générique qui n'a jamais été pensé pour votre métier.",
        "Une application web, c'est un outil accessible depuis un navigateur : des comptes utilisateurs, des données qui se conservent et s'interrogent, et une logique qui reflète vos règles d'affaires plutôt que celles d'un éditeur américain. Rien à installer, rien à mettre à jour manuellement, accessible du bureau comme du chantier.",
        "Lavoie Digital conçoit et code ces outils sur mesure pour les entrepreneurs et les PME du Québec. C'est la partie du métier qu'on préfère, et celle où un développement fait main change le plus de choses.",
      ],
    },
    {
      kind: "cards",
      eyebrow: "Ce qu'on construit",
      heading: "Quatre familles d'applications.",
      intro:
        "Beaucoup de projets combinent deux de ces familles — un portail client alimenté par un outil interne, par exemple.",
      cards: [
        {
          num: "01",
          title: "Plateforme SaaS",
          desc: "Un produit que vous vendez par abonnement. Vous avez l'idée et le marché ; on construit la première version et on la fait évoluer.",
          bullets: [
            "Comptes, rôles et permissions",
            "Facturation récurrente et gestion des forfaits",
            "Espace client et tableau de bord d'administration",
          ],
        },
        {
          num: "02",
          title: "Outil interne",
          desc: "Remplacer les fichiers partagés et les processus manuels par un système unique où l'information ne se perd pas.",
          bullets: [
            "Formulaires et validations calqués sur vos règles",
            "Historique complet et traçabilité des actions",
            "Accès distincts par équipe et par fonction",
          ],
        },
        {
          num: "03",
          title: "Portail client",
          desc: "Donner à vos clients un espace à eux, et arrêter de répondre trois fois par jour aux mêmes demandes de suivi.",
          bullets: [
            "Suivi de dossiers, devis et commandes",
            "Documents, contrats et factures au même endroit",
            "Notifications automatiques aux étapes clés",
          ],
        },
        {
          num: "04",
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
      eyebrow: "Fondations",
      heading: "Sécurité, sauvegardes et évolutivité.",
      paragraphs: [
        "Une application qui gère vos données d'affaires n'a pas le droit de tomber. Authentification sérieuse, permissions par rôle, chiffrement des échanges, sauvegardes automatiques et journal des accès font partie de la base du projet, pas d'une liste d'options à cocher en supplément.",
        "L'application est construite pour grandir. Ajouter un module, un type d'utilisateur ou une intégration six mois après le lancement ne doit pas obliger à tout reprendre — et c'est le genre de décision qui se joue à l'étape d'architecture, avant le premier écran.",
        "Vous êtes propriétaire du code et de vos données, sans exception. Si un jour vous voulez changer de fournisseur ou monter votre propre équipe technique, tout vous est remis, documenté.",
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
    {
      kind: "prose",
      eyebrow: "Territoire",
      heading: "Basé à Québec, au service de tout le Québec.",
      paragraphs: [
        "Le studio est établi dans la région de Québec. Les projets d'application se mènent très bien à distance : on travaille avec des entreprises de Montréal, Lévis, Trois-Rivières, Sherbrooke, Saguenay et Gatineau par visioconférence, avec des rencontres en personne quand le contexte le justifie.",
        "Service en français et en anglais, de 8 h à 18 h, sept jours sur sept.",
      ],
    },
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
      a: "Non. Le studio est basé à Québec, mais les projets d'application se déroulent aussi bien à distance, par visioconférence et sur un environnement de test partagé. On sert des entreprises de partout au Québec et au Canada, en français comme en anglais.",
    },
  ],
  ctaTitle: "Parlons de votre application.",
  ctaText:
    "Un appel de cadrage gratuit de 30 minutes. On regarde vos processus actuels, ce qui vous coûte du temps, et à quoi ressemblerait une première version utile. Aucune obligation à la sortie.",
};
