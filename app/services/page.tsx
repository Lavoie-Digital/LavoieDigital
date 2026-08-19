import type { Metadata } from "next";
import PageNav from "../_components/PageNav";
import Services from "../_components/Services";

const DESCRIPTION =
  "Applications full-stack, sites web premium, automatisation IA et référencement Google pour les PME du Québec. Du concept à la mise en marché.";

export const metadata: Metadata = {
  title: "Services — sites web et applications",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  keywords: [
    "services développement web Québec",
    "création application full-stack",
    "site web sur mesure PME",
    "agence web Québec services",
    "développement SaaS Québec",
    "automatisation IA Québec",
    "intégration intelligence artificielle PME",
    "plateforme B2B Québec",
  ],
  openGraph: {
    title: "Services — Lavoie Digital",
    description: DESCRIPTION,
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Lavoie Digital",
    description: DESCRIPTION,
  },
};

export default function ServicesPage() {
  return (
    <>
      <div className="h-24" />
      <Services />
      <PageNav
        prev={{ href: "/", label: "Accueil", eyebrow: "Retour" }}
        next={{ href: "/travaux", label: "Travaux", eyebrow: "Suivant — 02" }}
      />
    </>
  );
}
