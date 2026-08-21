"use client";

import { motion } from "motion/react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "./projectsData";
import { SectionHeader } from "./Services";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Landing-page teaser for /travaux. Deliberately lighter than the full
 * Projects list: image, client, one line — the case study lives elsewhere.
 * Reads from the same PROJECTS source so a new client only gets added once.
 */
export default function WorkPreview() {
  return (
    <section
      id="travaux"
      className="relative z-10 border-t border-white/[0.06] px-6 py-16 sm:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Travaux"
            title="Des projets en ligne, pour de vrais clients."
            sub="Boutiques, portails clients et sites de marque livrés pour des entreprises du Québec. Chaque site est en ligne — vous pouvez le visiter."
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="shrink-0"
          >
            <Link
              href="/travaux"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08]"
            >
              Tous les travaux
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M1 7h12m0 0L7 1m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
