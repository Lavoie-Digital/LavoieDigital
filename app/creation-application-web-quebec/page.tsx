import type { Metadata } from "next";
import LandingPage from "../_components/LandingPage";
import { APPLICATION_WEB } from "../_components/landingData";

// Kept near 155 characters — Google truncates the snippet past that.
const DESCRIPTION =
  "Création d'application web au Québec : plateformes SaaS, outils internes et portails clients sur mesure pour PME. Mise en service en 4 semaines environ.";

export const metadata: Metadata = {
  // Kept short: the root template appends " — Lavoie Digital", and Google
  // truncates around 60 characters. Selling points live in the description.
  title: "Création d'application web au Québec",
  description: DESCRIPTION,
  alternates: { canonical: "/creation-application-web-quebec" },
  keywords: [
    "création application web Québec",
    "application web Québec",
    "développement application web Québec",
    "application sur mesure Québec",
    "plateforme SaaS Québec",
    "logiciel sur mesure Québec",
    "outil interne entreprise Québec",
    "portail client Québec",
    "développeur application Québec",
    "intégration intelligence artificielle Québec",
  ],
  openGraph: {
    title: "Création d'application web au Québec — Lavoie Digital",
    description: DESCRIPTION,
    url: "/creation-application-web-quebec",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création d'application web au Québec — Lavoie Digital",
    description: DESCRIPTION,
  },
};

export default function CreationApplicationWebQuebecPage() {
  return (
    <LandingPage
      data={APPLICATION_WEB}
      prev={{
        href: "/creation-site-web-quebec",
        label: "Création de site web",
        eyebrow: "Aussi au studio",
      }}
      next={{ href: "/booking", label: "Réserver un appel", eyebrow: "Prêt à démarrer ?" }}
    />
  );
}
