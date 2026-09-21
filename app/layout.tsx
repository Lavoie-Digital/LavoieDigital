import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AmbientBackdrop from "./_components/AmbientBackdrop";
import ConsentProvider from "./_components/ConsentProvider";
import Footer from "./_components/Footer";
import Nav from "./_components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://lavoiedigital.ca";
const SITE_NAME = "Lavoie Digital";
// Keyword first, brand last, under 60 characters so Google shows it whole.
const SITE_TITLE = "Sites web et applications au Québec — Lavoie Digital";
// Under 160 characters — past that Google truncates the snippet mid-sentence.
const SITE_DESCRIPTION =
  "Studio de création de sites web et d'applications sur mesure au Québec. Site web livré en 2 semaines, application en 4. Suivi client illimité.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Child pages supply a short title; the brand is appended here. Keep child
    // titles free of "Lavoie Digital" or it lands twice in the same tag.
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Xavier Lavoie", url: SITE_URL }],
  creator: "Xavier Lavoie",
  publisher: SITE_NAME,
  category: "Web Development Studio",
  keywords: [
    "site web Québec",
    "application Québec",
    "création site web Québec",
    "développement application Québec",
    "agence web Québec",
    "studio développement web",
    "développement application full-stack",
    "création site web Québec",
    "agence digitale Québec",
    "développeur web Québec",
    "PME Québec site web",
    "application sur mesure Québec",
    "site web premium",
    "automatisation IA Québec",
    "création application web Québec",
    "refonte site web Québec",
    "SaaS Québec",
    "design web haut de gamme",
    "Lavoie Digital",
    "Xavier Lavoie",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "fr-CA": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lavoie Digital — Studio code & web · Québec",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // LocalBusiness is what powers the local knowledge panel; ProfessionalService
      // alone is too generic. Every field below mirrors the Google Business Profile
      // exactly — name, phone, hours, service areas and services — because
      // inconsistency between the two is what breaks entity matching.
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${SITE_URL}#studio`,
      name: SITE_NAME,
      legalName: "Lavoie Digital",
      alternateName: ["Studio Lavoie Digital", "Lavoie Digital Studio"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESCRIPTION,
      slogan: "On code, vous grandissez.",
      foundingDate: "2026",
      founder: {
        "@type": "Person",
        "@id": `${SITE_URL}#xavier-lavoie`,
        name: "Xavier Lavoie",
        jobTitle: "Fondateur & développeur",
        image: `${SITE_URL}/Fondateur.jpg`,
        url: `${SITE_URL}/a-propos`,
      },
      // Mirrors the service areas declared on the Google Business Profile.
      areaServed: [
        { "@type": "City", name: "Québec" },
        { "@type": "City", name: "Lévis" },
        { "@type": "City", name: "Montréal" },
        { "@type": "City", name: "Trois-Rivières" },
        { "@type": "City", name: "Sherbrooke" },
        { "@type": "City", name: "Saguenay" },
        { "@type": "City", name: "Gatineau" },
        { "@type": "AdministrativeArea", name: "Québec" },
        { "@type": "Country", name: "Canada" },
      ],
      knowsLanguage: ["fr-CA", "en-CA"],
      telephone: "+1-514-290-1648",
      email: "info@lavoiedigital.ca",
      // Service-area business: no public street address, so only locality/region
      // are declared. Inventing a street here would contradict the Google
      // Business Profile, which is set to "no location".
      address: {
        "@type": "PostalAddress",
        addressLocality: "Québec",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      potentialAction: {
        "@type": "ReserveAction",
        name: "Réserver un appel découverte gratuit",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/booking`,
          inLanguage: "fr-CA",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@lavoiedigital.ca",
        telephone: "+1-514-290-1648",
        areaServed: "CA",
        availableLanguage: ["French", "English"],
      },
      sameAs: [
        "https://www.linkedin.com/company/lavoie-digital/",
        "https://www.instagram.com/lavoie_digital/",
        "https://www.facebook.com/profile.php?id=61590179200262",
      ],
      priceRange: "$$-$$$$",
      // Same eight services, in the same order, as the Services section of the
      // Google Business Profile. Keep the two lists in sync when either changes.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de Lavoie Digital",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Création de site web",
              description:
                "Conception et développement de sites web sur mesure pour les PME du Québec, livrés en environ deux semaines.",
              url: `${SITE_URL}/creation-site-web-quebec`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Site web vitrine",
              description:
                "Site de présentation d'entreprise conçu pour établir la crédibilité et générer des appels.",
              url: `${SITE_URL}/creation-site-web-quebec`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Site e-commerce",
              description:
                "Boutique en ligne avec catalogue, panier, paiement sécurisé et gestion des commandes.",
              url: `${SITE_URL}/creation-site-web-quebec`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Refonte de site web",
              description:
                "Reconstruction d'un site existant avec redirections et conservation du référencement acquis.",
              url: `${SITE_URL}/creation-site-web-quebec`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Application web sur mesure",
              description:
                "Logiciels de gestion, portails clients et tableaux de bord développés selon vos règles d'affaires.",
              url: `${SITE_URL}/creation-application-web-quebec`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Développement d'application d'affaires",
              description:
                "Outils internes qui remplacent les fichiers partagés et les processus manuels.",
              url: `${SITE_URL}/creation-application-web-quebec`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Intégration d'intelligence artificielle",
              description:
                "Automatisation du travail répétitif : tri de demandes, extraction documentaire, réponses sur vos données.",
              url: `${SITE_URL}/creation-application-web-quebec`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Optimisation SEO et AEO",
              description:
                "Référencement Google et optimisation pour les moteurs de réponse par IA (ChatGPT, Perplexity, aperçus IA).",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "fr-CA",
      publisher: { "@id": `${SITE_URL}#studio` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        "https://www.linkedin.com/company/lavoie-digital/",
        "https://www.instagram.com/lavoie_digital/",
        "https://www.facebook.com/profile.php?id=61590179200262",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr-CA"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-black text-[var(--fg)] flex flex-col grain">
        {/* Enveloppe tout le site : c'est ce fournisseur qui décide si les
            balises Google se chargent, et il alimente le bouton « Gérer les
            témoins » du pied de page. */}
        <ConsentProvider>
          <AmbientBackdrop />
          <Nav />
          <main id="top" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer />
        </ConsentProvider>
      </body>
    </html>
  );
}
