import type { Metadata } from "next";
import LandingPage from "../_components/LandingPage";
import { SITE_WEB } from "../_components/landingData";

// Kept near 155 characters — Google truncates the snippet past that.
const DESCRIPTION =
  "Création de site web au Québec : sites vitrines, boutiques en ligne et refontes codés sur mesure pour les PME. Livré en 2 semaines. Devis fixe, appel gratuit.";

export const metadata: Metadata = {
  // Kept short: the root template appends " — Lavoie Digital", and Google
  // truncates around 60 characters. Selling points live in the description.
  title: "Création de site web au Québec",
  description: DESCRIPTION,
  alternates: { canonical: "/creation-site-web-quebec" },
  keywords: [
    "création site web Québec",
    "site web Québec",
    "conception site web Québec",
    "faire un site web Québec",
    "site vitrine Québec",
    "site e-commerce Québec",
    "refonte site web Québec",
    "développeur site web Québec",
    "site web PME Québec",
    "site web sur mesure Québec",
  ],
  openGraph: {
    title: "Création de site web au Québec — Lavoie Digital",
    description: DESCRIPTION,
    url: "/creation-site-web-quebec",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de site web au Québec — Lavoie Digital",
    description: DESCRIPTION,
  },
};

export default function CreationSiteWebQuebecPage() {
  // Aucune navigation de fin de page : voir LandingPage.tsx. Le formulaire est
  // le dernier élément, et le pied de page conserve le maillage interne.
  return <LandingPage data={SITE_WEB} />;
}
