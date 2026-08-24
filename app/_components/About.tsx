"use client";

import { motion } from "motion/react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

const VALUES = [
  {
    title: "Fondateur aux commandes",
    body: "Vous ne parlez pas à un intermédiaire. C'est moi qui conçois, code et livre votre projet — de la première idée au lancement.",
  },
  {
    title: "Obsédé par la qualité",
    body: "Chaque détail compte : la performance, l'esthétique, la robustesse. Je livre un produit dont je suis fier, pas un « assez bon ».",
  },
  {
    title: "Ancré au Québec",
    body: "Studio local, disponible et accessible. On se comprend, on se rejoint vite, en français comme en anglais.",
  },
  {
    title: "Là après le lancement",
    body: "Le vrai travail commence une fois en ligne. Suivi illimité, optimisations et découvrabilité (SEO, AEO, GEO) mois après mois.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 px-6 py-16 sm:px-10 md:py-24"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-6xl">
        {/* Intro — photo + heading */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:gap-16">
          {/* Photo plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 40px 100px -20px rgba(0,0,0,0.8)",
              }}
            >
              {/* Plan trois-quarts vertical : à cette taille on veut la
                  posture entière, pas seulement le visage. Le conteneur est
                  plafonné à `max-w-sm` (24rem) à toutes les largeurs, donc
                  `sizes` l'annonce tel quel — déclarer plus large ferait
                  télécharger un candidat inutilement lourd.

                  `quality` à 95 comme dans Portrait.tsx : sans cette prop Next
                  réencode à 75, et sur ce cliché le fond en dégradé se met à
                  baver bien avant le reste du site. La valeur doit figurer dans
                  `images.qualities` (next.config.ts), sinon Next la ramène en
                  silence à la plus proche. */}
              <Image
                src="/Fondateur-portrait.jpg"
                alt="Xavier Lavoie, fondateur de Lavoie Digital"
                width={1800}
                height={2700}
                quality={95}
                priority
                className="h-full w-full object-cover"
                sizes="24rem"
              />
              {/* Subtle top gloss to blend with the dark theme */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%)",
                }}
              />
            </div>
            {/* Name badge */}
            <div className="mt-5 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Fondateur
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
          </motion.div>

          {/* Heading + bio */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur"
            >
              <span className="h-1 w-1 rounded-full bg-white/70" />
              À propos
            </motion.div>

            <motion.h1
              id="about-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display max-w-2xl text-[clamp(2rem,5vw,3.6rem)] text-white"
            >
              Xavier Lavoie, fondateur du studio Lavoie Digital.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-w-xl flex-col gap-4 text-[16px] leading-relaxed text-white/60"
            >
              <p>
                J&apos;ai fondé Lavoie Digital avec une conviction simple : les PME
                du Québec méritent des sites web et des applications à la hauteur
                des plus grandes marques — sans l&apos;usine, sans les
                intermédiaires, sans les templates.
              </p>
              <p>
                Je conçois et je code chaque projet moi-même, de A à Z. Résultat :
                un produit sur mesure, rapide et soigné, pensé pour convertir et
                pour être retrouvé sur Google comme sur les moteurs de réponse par
                IA. Et une fois en ligne, je reste là — le suivi ne s&apos;arrête
                jamais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2"
            >
              <MagneticButton href="/booking">
                Discutons de votre projet
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1 7h12m0 0L7 1m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/10 p-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(24px) saturate(160%)",
              }}
            >
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {v.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                {v.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
