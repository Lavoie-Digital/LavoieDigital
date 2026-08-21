"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "./projectsData";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Carte d'une réalisation — image, client, secteur, une ligne.
 *
 * Extraite de WorkPreview pour être partagée avec les pages d'atterrissage
 * publicitaires : le visuel d'un projet n'est décrit qu'à un seul endroit, donc
 * un ajustement de style s'applique partout d'un coup.
 *
 * `sizes` est un paramètre parce que la même carte vit dans une grille à deux
 * colonnes sur la page d'accueil et à trois sur les pages d'atterrissage —
 * laisser la valeur en dur ferait télécharger une image trop lourde dans un cas
 * et trop légère dans l'autre.
 */
export default function ProjectCard({
  project: p,
  index = 0,
  sizes = "(max-width: 640px) 100vw, 560px",
}: {
  project: Project;
  index?: number;
  sizes?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: EASE }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
        backdropFilter: "blur(24px) saturate(160%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 100px -30px rgba(0,0,0,0.6)",
      }}
    >
      <Link
        href={`/travaux/${p.slug}`}
        className="block p-3"
        aria-label={`Étude de cas — ${p.client}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/40">
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            sizes={sizes}
            loading="lazy"
            className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          {/* Bottom scrim so the year badge stays legible on light shots */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))",
            }}
          />
          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur">
            {p.year}
          </span>
        </div>

        <div className="px-4 pb-4 pt-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-semibold tracking-tight text-white">
              {p.client}
            </h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="mt-1.5 shrink-0 text-white/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/80"
            >
              <path
                d="M1 7h12m0 0L7 1m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            {p.sector} · {p.location}
          </p>

          <p className="mt-4 text-[14px] leading-relaxed text-white/60">
            {p.teaser}
          </p>
        </div>
      </Link>

      {/* Live-site link sits outside the card Link so it stays its own target */}
      <div className="px-4 pb-5">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-[13px] text-white/45 hover:text-white/80"
        >
          {p.domain} ↗
        </a>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(200,220,255,0.22), transparent 70%)",
        }}
      />
    </motion.article>
  );
}
