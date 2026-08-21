import Booking from "./Booking";
import Faq from "./Faq";
import { LandingBlocks, LandingHero } from "./LandingSections";
import type { Landing } from "./landingData";

const SITE_URL = "https://lavoiedigital.ca";

/**
 * Shared body for the SEO landing pages. Server component so the JSON-LD is
 * emitted in the initial HTML (answer engines rarely execute JavaScript).
 *
 * Each page owns its own `metadata` export; only the body lives here.
 *
 * Ces deux pages reçoivent le trafic Google Ads, ce qui impose deux écarts par
 * rapport aux autres routes : le formulaire est rendu ici même plutôt que lié
 * vers /booking, et il n'y a aucune navigation de fin de page. Un visiteur
 * payant qui vient de lire la page au complet est au sommet de son intention —
 * lui proposer un autre service à ce moment-là est la fuite la plus chère de
 * toutes. Le maillage interne reste assuré par le pied de page.
 */
export default function LandingPage({ data }: { data: Landing }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}${data.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data.breadcrumb,
            item: `${SITE_URL}${data.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}${data.slug}#service`,
        name: data.serviceName,
        serviceType: data.serviceType,
        description: data.sub,
        url: `${SITE_URL}${data.slug}`,
        provider: { "@id": `${SITE_URL}#studio` },
        areaServed: [
          { "@type": "City", name: "Québec" },
          { "@type": "City", name: "Lévis" },
          { "@type": "City", name: "Montréal" },
          { "@type": "AdministrativeArea", name: "Québec" },
          { "@type": "Country", name: "Canada" },
        ],
        availableLanguage: ["fr-CA", "en-CA"],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${data.slug}#faq`,
        mainEntity: data.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHero
        eyebrow={data.eyebrow}
        h1={data.h1}
        sub={data.sub}
        crumb={data.breadcrumb}
        facts={data.facts}
      />
      <LandingBlocks blocks={data.blocks} />
      <Faq items={data.faq} title={data.faqTitle} />
      <Booking
        titleAs="h2"
        eyebrow="Réserver"
        title={data.ctaTitle}
        sub={data.ctaText}
        defaultProjectType={data.bookingProjectType}
      />
    </>
  );
}
