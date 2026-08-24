"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "./Services";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Section « fondateur » de la page d'accueil, entre les avis et la FAQ.
 *
 * La home parlait au pluriel — « Voir nos services » — sans jamais dire que le
 * studio est une personne. C'est pourtant l'argument qui porte /a-propos et les
 * pages publicitaires. Les avis prouvent que le travail est bon, pas qui l'a
 * fait : cette section répond à l'objection qu'ils laissent ouverte, juste avant
 * la FAQ qui traite les autres.
 *
 * Le portrait vertical complet, pas la pastille : à cette échelle on veut la
 * posture entière, c'est elle qui rend la personne concrète. La copie reste
 * courte et différente de celle de /a-propos — ici on pose l'argument et on y
 * renvoie, on ne le développe pas.
 *
 * L'image est intégrée directement plutôt que via `Portrait` : ce dernier fixe
 * ses dimensions en pixels, ce qui déborderait sur un téléphone étroit. Ici le
 * conteneur est fluide et plafonné.
 */
export default function FounderSignature() {
  return (
    <section
      id="fondateur"
      className="relative z-10 border-t border-white/[0.06] px-6 py-16 sm:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-[20rem] lg:mx-0"
          >
            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.14), 0 40px 100px -20px rgba(0,0,0,0.8)",
              }}
            >
              {/* `quality` à 95 : sans la prop, Next réencode à 75 et le fond en
                  dégradé se met à baver. La valeur doit rester listée dans
                  `images.qualities` (next.config.ts). */}
              <Image
                src="/Fondateur-portrait.jpg"
                alt="Xavier Lavoie, fondateur de Lavoie Digital"
                width={1800}
                height={2700}
                quality={95}
                className="h-full w-full object-cover"
                sizes="20rem"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* Argument */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Le studio"
              title="Derrière chaque projet, une seule personne."
              sub="Pas d'intermédiaire, pas de sous-traitance, pas de gabarit. Je conçois, je code et je livre votre projet moi-même — et je reste joignable une fois en ligne."
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <div>
                <p className="text-[15px] font-semibold tracking-tight text-white">
                  Xavier Lavoie
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Fondateur — Québec
                </p>
              </div>
              <span aria-hidden className="h-8 w-px bg-white/10" />
              <Link
                href="/a-propos"
                className="link-underline text-[13px] text-white/60 hover:text-white"
              >
                Qui je suis →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
