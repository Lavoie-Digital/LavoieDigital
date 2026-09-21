"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./Services";
import { PROJECTS } from "./projectsData";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="work" className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          titleAs="h1"
          eyebrow="Travaux"
          title="Des sites et des applications en ligne, pour de vrais clients."
          sub="Cinq projets livrés pour des entreprises du Québec — Montréal, Saguenay, Québec, Lévis. Chaque site est en ligne et vous pouvez le visiter."
        />

        <div className="mt-16 space-y-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="group relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] border border-white/10 p-6 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:p-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(24px) saturate(160%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 100px -30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  {p.tag}
                </span>

                <h2 className="mt-5 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-tight text-white">
                  {p.client}
                </h2>

                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                  {p.sector} · {p.location}
                </p>

                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
                  {p.teaser}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={`/travaux/${p.slug}`}
                    className="group/cta inline-flex items-center gap-2 text-[14px] font-medium text-white"
                  >
                    <span className="link-underline">Voir l&apos;étude de cas</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
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

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[14px] text-white/50 hover:text-white/80"
                  >
                    {p.domain} ↗
                  </a>
                </div>
              </div>

              <Link
                href={`/travaux/${p.slug}`}
                className="order-1 block lg:order-2"
                aria-label={`Étude de cas — ${p.client}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    priority={i === 0}
                  />
                </div>
              </Link>

              {/* hover glow */}
              <div
                className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200,220,255,0.25), transparent 70%)",
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
