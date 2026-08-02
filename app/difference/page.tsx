import type { Metadata } from "next";
import Edge from "../_components/Edge";
import PageNav from "../_components/PageNav";

const DESCRIPTION =
  "Suivi client illimité, esthétique hors du commun, code production : ce qu'on apporte que les autres agences web du Québec n'apportent pas.";

export const metadata: Metadata = {
  // No brand name here — the root template already appends " — Lavoie Digital".
  title: "Différence — pourquoi nous choisir",
  description: DESCRIPTION,
  alternates: { canonical: "/difference" },
  keywords: [
    "agence web premium Québec",
    "studio développement haut de gamme",
    "suivi client agence web",
    "code production Québec",
    "design web sur mesure Québec",
    "alternative agence digitale",
  ],
  openGraph: {
    title: "Différence — Lavoie Digital",
    description: DESCRIPTION,
    url: "/difference",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Différence — Lavoie Digital",
    description: DESCRIPTION,
  },
};

export default function DifferencePage() {
  return (
    <>
      <div className="h-24" />
      <Edge />
      <PageNav
        prev={{
          href: "/approche",
          label: "Approche",
          eyebrow: "Précédent — 03",
        }}
        next={{
          href: "/a-propos",
          label: "À propos",
          eyebrow: "Suivant — 05",
        }}
      />
    </>
  );
}
