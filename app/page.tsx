import Faq from "./_components/Faq";
import { FAQ_ITEMS } from "./_components/faqData";
import FounderSignature from "./_components/FounderSignature";
import Hero from "./_components/Hero";
import PageNav from "./_components/PageNav";
import Reviews from "./_components/Reviews";
import WorkPreview from "./_components/WorkPreview";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      {/* Preuve avant la FAQ : les travaux montrent, les avis confirment, le
          visage dit qui les a faits. */}
      <WorkPreview />
      <Reviews />
      <FounderSignature />
      <Faq />
      <PageNav
        next={{ href: "/services", label: "Services", eyebrow: "Suivant — 01" }}
      />
    </>
  );
}
