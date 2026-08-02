"use client";

import { motion } from "motion/react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";
import type { Block } from "./landingData";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function LandingHero({
  eyebrow,
  h1,
  sub,
  crumb,
}: {
  eyebrow: string;
  h1: string;
  sub: string;
  crumb: string;
}) {
  return (
    <section className="relative z-10 px-6 pt-32 pb-16 sm:px-10 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Visible breadcrumb — mirrors the BreadcrumbList JSON-LD */}
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
          <span className="text-white/55">{crumb}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur"
        >
          <span className="h-1 w-1 rounded-full bg-white/70" />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="display mt-6 text-balance text-[clamp(2.4rem,6.5vw,4.6rem)] text-white"
        >
          {h1}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="text-pretty mt-8 max-w-2xl text-[17px] leading-relaxed text-white/60 sm:text-lg"
        >
          {sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mt-11 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <MagneticButton href="/booking">Réserver un appel</MagneticButton>
          <MagneticButton href="/travaux" variant="ghost">
            Voir nos travaux
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Block renderer                                                      */
/* ------------------------------------------------------------------ */

export function LandingBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.kind) {
          case "prose":
            return <ProseBlock key={block.heading} block={block} />;
          case "cards":
            return <CardsBlock key={block.heading} block={block} />;
          case "steps":
            return <StepsBlock key={block.heading} block={block} />;
        }
      })}
    </>
  );
}

function BlockHeader({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="display max-w-3xl text-[clamp(1.9rem,4.4vw,3.1rem)] text-white"
      >
        {heading}
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="max-w-xl text-[16px] leading-relaxed text-white/55"
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

function ProseBlock({
  block,
}: {
  block: Extract<Block, { kind: "prose" }>;
}) {
  return (
    <section className="relative z-10 px-6 py-14 sm:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <BlockHeader eyebrow={block.eyebrow} heading={block.heading} />
          </div>
          <div className="flex flex-col gap-5 md:col-span-7 md:pt-2">
            {block.paragraphs.map((p, i) => (
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
  );
}

function CardsBlock({
  block,
}: {
  block: Extract<Block, { kind: "cards" }>;
}) {
  return (
    <section className="relative z-10 px-6 py-14 sm:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {block.cards.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
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
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />

                  <span
                    className="font-mono text-xs tracking-[0.3em] text-white/30"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {c.num}
                  </span>

                  <h3
                    className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-[1.6rem]"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-3 text-[15px] leading-relaxed text-white/55"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {c.desc}
                  </p>

                  <ul
                    className="mt-7 space-y-2.5"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {c.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[13px] leading-relaxed text-white/65"
                      >
                        <span className="mt-2 h-px w-5 shrink-0 bg-white/30" />
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

function StepsBlock({
  block,
}: {
  block: Extract<Block, { kind: "steps" }>;
}) {
  return (
    <section className="relative z-10 px-6 py-14 sm:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
        />

        <ol className="mt-14 flex flex-col">
          {block.steps.map((s, i) => (
            <motion.li
              key={s.num}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="grid grid-cols-1 gap-4 border-t border-white/10 py-8 md:grid-cols-12 md:gap-8"
            >
              <div className="flex items-baseline gap-4 md:col-span-3">
                <span className="font-mono text-xs tracking-[0.3em] text-white/30">
                  {s.num}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {s.meta}
                </span>
              </div>
              <p className="text-pretty text-[15px] leading-relaxed text-white/60 md:col-span-7 sm:text-[16px]">
                {s.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing CTA                                                         */
/* ------------------------------------------------------------------ */

export function LandingCta({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
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

          <h2 className="display mx-auto max-w-2xl text-balance text-[clamp(1.9rem,4.6vw,3.2rem)] text-white">
            {title}
          </h2>
          <p className="text-pretty mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/60">
            {text}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton href="/booking">Réserver un appel</MagneticButton>
            <MagneticButton href="/services" variant="ghost">
              Explorer les services
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
