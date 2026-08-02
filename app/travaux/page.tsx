import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Projects from "../_components/Projects";
import { PROJECTS } from "../_components/projectsData";

const SITE_URL = "https://lavoiedigital.ca";

const DESCRIPTION =
  "Réalisations de Lavoie Digital : sites web, boutiques en ligne et espaces clients livrés pour des entreprises du Québec — Montréal, Saguenay, Québec.";

export const metadata: Metadata = {
  title: "Travaux — réalisations web au Québec",
  description: DESCRIPTION,
  alternates: { canonical: "/travaux" },
  keywords: [
    "réalisations web Québec",
    "portfolio agence web Québec",
    "exemples site web PME Québec",
    "site web e-commerce Québec",
    "site web immobilier Québec",
    "études de cas développement web",
  ],
  openGraph: {
    title: "Travaux — Lavoie Digital",
    description: DESCRIPTION,
    url: "/travaux",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travaux — Lavoie Digital",
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/travaux#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Travaux",
          item: `${SITE_URL}/travaux`,
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/travaux#collection`,
      name: "Travaux — réalisations web au Québec",
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${p.client} — ${p.sector}`,
          url: `${SITE_URL}/travaux/${p.slug}`,
        })),
      },
    },
  ],
};

export default function TravauxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="h-24" />
      <Projects />
      <PageNav
        prev={{ href: "/services", label: "Services", eyebrow: "Précédent — 01" }}
        next={{ href: "/approche", label: "Approche", eyebrow: "Suivant — 03" }}
      />
    </>
  );
}
