import Faq from "./Faq";
import { LandingBlocks, LandingCta, LandingHero } from "./LandingSections";
import PageNav from "./PageNav";
import type { Landing } from "./landingData";

const SITE_URL = "https://lavoiedigital.ca";

type Item = { href: string; label: string; eyebrow?: string };

/**
 * Shared body for the SEO landing pages. Server component so the JSON-LD is
 * emitted in the initial HTML (answer engines rarely execute JavaScript).
 *
 * Each page owns its own `metadata` export; only the body lives here.
 */
export default function LandingPage({
  data,
  prev,
  next,
}: {
  data: Landing;
  prev?: Item;
  next?: Item;
}) {
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
      />
      <LandingBlocks blocks={data.blocks} />
      <Faq items={data.faq} title={data.faqTitle} />
      <LandingCta title={data.ctaTitle} text={data.ctaText} />
      <PageNav prev={prev} next={next} />
    </>
  );
}
