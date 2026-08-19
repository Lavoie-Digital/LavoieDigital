"use client";

import { motion } from "motion/react";
import TiltCard from "./TiltCard";

type Service = {
  num: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: React.ReactNode;
};

const ICON_CLASS = "h-6 w-6 text-white";

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Applications full-stack",
    desc: "Plateformes SaaS, dashboards, outils internes et systèmes sur mesure conçus pour évoluer avec votre PME.",
    bullets: [
      "Auth, paiements, base de données",
      "API performantes et sécurisées",
      "Déploiement continu",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Sites web premium",
    desc: "Sites vitrines, e-commerce et pages de vente avec des animations qui marquent les esprits.",
    bullets: [
      "Design haut de gamme",
      "SEO et Core Web Vitals",
      "CMS pour gérer le contenu",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Automatisation & IA",
    desc: "Intégration d'intelligence artificielle et automatisation du travail répétitif, pour que votre équipe arrête de faire à la main ce qu'un système fait mieux.",
    bullets: [
      "Assistants branchés sur vos données",
      "Tri de demandes, extraction de documents",
      "Connexion de vos outils entre eux",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
        <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Référencement & visibilité IA",
    desc: "Être trouvé sur Google, mais aussi dans ChatGPT, Perplexity et les aperçus IA — là où vos clients cherchent maintenant.",
    bullets: [
      "SEO technique et contenu",
      "Données structurées et AEO",
      "Fiche Google et recherche locale",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS}>
        <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 15l5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 2.5l.75 1.75L21.5 5l-1.75.75L19 7.5l-.75-1.75L16.5 5l1.75-.75L19 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          titleAs="h1"
          eyebrow="Services"
          title="Création de sites web et d'applications sur mesure au Québec."
          sub="Du concept à la mise en marché, on construit des sites web premium, des applications full-stack et des plateformes SaaS que vos clients ont envie d'utiliser."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="h-full rounded-3xl">
                <div
                  className="relative h-full overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-10"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(24px) saturate(160%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -30px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* Subtle inner ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />

                  <div
                    className="flex items-start justify-between"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <div className="glass flex h-12 w-12 items-center justify-center rounded-2xl">
                      {s.icon}
                    </div>
                    <span className="font-mono text-xs tracking-[0.3em] text-white/30">
                      {s.num}
                    </span>
                  </div>

                  <h3
                    className="mt-8 text-2xl font-semibold tracking-tight text-white sm:text-[1.6rem]"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 text-[15px] leading-relaxed text-white/55"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {s.desc}
                  </p>

                  <ul
                    className="mt-7 space-y-2.5"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-3 text-[13px] text-white/65"
                      >
                        <span className="h-px w-5 bg-white/30" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  titleAs = "h2",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  /** Heading level for the title. Pages pass "h1" so each route has a single top-level heading. */
  titleAs?: "h1" | "h2";
}) {
  const Heading = titleAs === "h1" ? motion.h1 : motion.h2;
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur"
      >
        <span className="h-1 w-1 rounded-full bg-white/70" />
        {eyebrow}
      </motion.div>
      <Heading
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="display max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-white"
      >
        {title}
      </Heading>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-[17px] leading-relaxed text-white/55"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
