/**
 * FAQ content — single source of truth for both the visible accordion (Faq.tsx,
 * a client component) and the FAQPage JSON-LD emitted server-side (app/page.tsx).
 * Kept in a plain (non-"use client") module so the server component receives the
 * real array rather than a client reference proxy.
 *
 * Keep answers plain-text so answer engines (ChatGPT, Perplexity, Google AI
 * Overviews) can quote them verbatim.
 */
export const FAQ_ITEMS = [
  {
    q: "Combien coûte un site web ou une application au Québec ?",
    a: "Chaque projet est unique, donc on établit un devis clair et sans surprise dès l'appel découverte gratuit. Nos sites web premium démarrent autour de 3 000 $. Mais l'essentiel, c'est ce que vous obtenez : un site rapide, sur mesure et conçu pour être retrouvé sur Google et les moteurs de réponse par IA — pas un simple template.",
  },
  {
    q: "Combien de temps faut-il pour créer un site web ou une application ?",
    a: "Pour un site web premium, on prévoit environ 2 semaines jusqu'au lancement officiel. Pour une application, comptez environ 4 semaines. Dans tous les cas, l'échéancier est fixé et transparent dès le départ, sans mauvaise surprise.",
  },
  {
    q: "Servez-vous les PME partout au Québec ?",
    a: "Oui. Lavoie Digital est un studio de développement web basé à Québec qui accompagne les PME de la ville de Québec, de Montréal et de partout au Québec et au Canada. On travaille en français comme en anglais, à distance ou en personne.",
  },
  {
    q: "Vos sites web sont-ils optimisés pour être trouvés sur Google et les IA ?",
    a: "Oui, c'est au cœur de notre travail. On conçoit chaque site web et application pour être retrouvé : optimisation pour le référencement Google (SEO), mais aussi pour les moteurs de réponse par IA comme ChatGPT, Perplexity et les aperçus IA de Google (AEO et GEO). Structure claire, données structurées, contenu pertinent et performance : tout est pensé pour que vos clients vous trouvent.",
  },
  {
    q: "Qu'est-ce que le suivi client illimité ?",
    a: "Après le lancement de votre site web ou application, on ne vous laisse pas seul. Questions, ajustements, nouvelles fonctions, optimisations : on répond et on agit, avec un délai de réponse maximum de 24 heures et des itérations incluses en continu.",
  },
];
