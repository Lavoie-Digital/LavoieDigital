import type { Metadata } from "next";
import About from "../_components/About";
import PageNav from "../_components/PageNav";

const SITE_URL = "https://lavoiedigital.ca";

const DESCRIPTION =
  "Xavier Lavoie, fondateur du studio. Il conçoit et code lui-même chaque site web et application, de A à Z, pour les PME du Québec.";

export const metadata: Metadata = {
  // No brand name here — the root template already appends " — Lavoie Digital".
  title: "À propos — Xavier Lavoie, fondateur",
  description: DESCRIPTION,
  alternates: { canonical: "/a-propos" },
  keywords: [
    "Xavier Lavoie",
    "fondateur Lavoie Digital",
    "développeur web Québec",
    "studio développement web Québec",
    "agence web fondateur Québec",
  ],
  openGraph: {
    title: "À propos — Xavier Lavoie, fondateur de Lavoie Digital",
    description: DESCRIPTION,
    url: "/a-propos",
    type: "profile",
    images: [
      {
        url: "/Fondateur.jpg",
        width: 896,
        height: 896,
        alt: "Xavier Lavoie, fondateur de Lavoie Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos — Xavier Lavoie, fondateur de Lavoie Digital",
    description: DESCRIPTION,
    images: ["/Fondateur.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}#xavier-lavoie`,
    name: "Xavier Lavoie",
    jobTitle: "Fondateur & développeur",
    image: `${SITE_URL}/Fondateur.jpg`,
    url: `${SITE_URL}/a-propos`,
    worksFor: { "@id": `${SITE_URL}#studio` },
    knowsLanguage: ["fr-CA", "en-CA"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Québec",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    sameAs: [
      "https://www.linkedin.com/company/lavoie-digital/",
      "https://www.instagram.com/lavoie_digital/",
      "https://www.facebook.com/profile.php?id=61590179200262",
    ],
  },
};

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="h-24" />
      <About />
      <PageNav
        prev={{ href: "/difference", label: "Différence", eyebrow: "Précédent — 04" }}
        next={{ href: "/booking", label: "Réserver un appel", eyebrow: "Prêt à démarrer ?" }}
      />
    </>
  );
}
