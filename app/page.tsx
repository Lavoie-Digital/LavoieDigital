import ExplorePanels from "./_components/ExplorePanels";
import Faq from "./_components/Faq";
import { FAQ_ITEMS } from "./_components/faqData";
import Hero from "./_components/Hero";
import PageNav from "./_components/PageNav";

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
      <ExplorePanels />
      <Faq />
      {/* Mobile only — desktop has the active-content area in ExplorePanels */}
      <div className="md:hidden">
        <PageNav
          next={{ href: "/services", label: "Services", eyebrow: "Suivant — 01" }}
        />
      </div>
    </>
  );
}
