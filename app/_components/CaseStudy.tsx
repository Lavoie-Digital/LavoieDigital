"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import type { Project } from "./projectsData";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="relative z-10">
      {/* ---------- Header ---------- */}
      <section className="px-6 pt-32 pb-12 sm:px-10 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <motion.nav
            aria-label="Fil d'Ariane"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35"
          >
            <Link href="/" className="link-underline hover:text-white/70">
              Accueil
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <Link href="/travaux" className="link-underline hover:text-white/70">
              Travaux
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/55">{project.client}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur"
          >
            <span className="h-1 w-1 rounded-full bg-white/70" />
            {project.tag}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="display mt-6 text-balance text-[clamp(2.2rem,6vw,4.2rem)] text-white"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="text-pretty mt-8 max-w-2xl text-[17px] leading-relaxed text-white/60 sm:text-lg"
          >
            {project.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-10"
          >
            <MagneticButton href={project.url}>
              Visiter {project.domain}
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M3 11L11 3m0 0H5m6 0v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ---------- Screenshot ---------- */}
      <section className="px-6 pb-4 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mx-auto max-w-6xl"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 sm:rounded-[2rem]">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* ---------- Specs ---------- */}
      <section className="px-6 py-14 sm:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] lg:grid-cols-4">
            {project.specs.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="bg-black/40 p-6 backdrop-blur sm:p-7"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                  {s.label}
                </dt>
                <dd className="mt-3 text-[15px] leading-snug text-white/80">
                  {s.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Narrative ---------- */}
      {project.sections.map((section) => (
        <section key={section.heading} className="px-6 py-12 sm:px-10 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-14">
              <div className="md:col-span-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="display text-[clamp(1.7rem,3.6vw,2.6rem)] text-white"
                >
                  {section.heading}
                </motion.h2>
              </div>
              <div className="flex flex-col gap-5 md:col-span-8 md:pt-2">
                {section.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                    className="text-pretty text-[16px] leading-[1.75] text-white/65 sm:text-[17px]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ---------- Delivered ---------- */}
      <section className="px-6 py-14 sm:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="display text-[clamp(1.7rem,3.6vw,2.6rem)] text-white"
              >
                Ce qui a été livré
              </motion.h2>
            </div>
            <ul className="md:col-span-8">
              {project.delivered.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="flex items-start gap-4 border-t border-white/10 py-5 text-[15px] leading-relaxed text-white/70 sm:text-[16px]"
                >
                  <span className="mt-2.5 h-px w-6 shrink-0 bg-white/30" />
                  {d}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="px-6 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-14 text-center sm:px-14 sm:py-20"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.012) 100%)",
              backdropFilter: "blur(24px) saturate(170%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.09), 0 40px 100px -40px rgba(0,0,0,0.7)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
            <h2 className="display mx-auto max-w-2xl text-balance text-[clamp(1.8rem,4.4vw,3rem)] text-white">
              Un projet du même genre ?
            </h2>
            <p className="text-pretty mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/60">
              Un appel découverte gratuit de 30 minutes, sans engagement. On
              regarde ce que vous voulez bâtir et ce que ça demande réellement.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/booking">Réserver un appel</MagneticButton>
              <MagneticButton href="/travaux" variant="ghost">
                Voir les autres projets
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
