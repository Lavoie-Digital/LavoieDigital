"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ConstellationField from "./ConstellationField";
import { GoogleRatingPill } from "./GoogleRating";
import MagneticButton from "./MagneticButton";
import ProjectCard from "./ProjectCard";
import Reviews from "./Reviews";
import TiltCard from "./TiltCard";
import { getProject } from "./projectsData";
import type { Block, Fact } from "./landingData";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function LandingHero({
  eyebrow,
  h1,
  sub,
  crumb,
  facts,
}: {
  eyebrow: string;
  h1: string;
  sub: string;
  crumb: string;
  facts: Fact[];
}) {
  // Même parallaxe que le hero d'accueil : le curseur incline la plaque du logo.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });
  const rotateY = useTransform(smx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smy, [-0.5, 0.5], [10, -10]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    // Alimente le `.spotlight` de globals.css, qui lit --mx / --my.
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Hero pleine hauteur. `min-h` et non `h` : sur un écran court, la section
  // grandit plutôt que de rogner la bande de réassurance, et le centrage
  // vertical garde le H1 et les boutons dans l'écran sur un grand moniteur.
  return (
    <section
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative z-10 flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 py-24 sm:px-10"
    >
      {/* Maille de points blancs réactive au curseur — le même composant que le
          hero d'accueil. Il ne monte rien sur écran tactile. */}
      <ConstellationField />

      {/* Scrim décentré vers la gauche : contrairement au hero d'accueil, le
          texte n'est pas centré, donc le contraste doit être renforcé là où il
          se trouve réellement — sinon la maille passe derrière les lettres. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 78% 68% at 32% 46%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 46%, transparent 76%)",
        }}
      />

      {/* Halo qui suit le curseur */}
      <div className="spotlight pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Plaque de verre du logo. Volontairement plus petite que celle de
            l'accueil (64 px contre 176) : le hero est plein écran, donc tout ce
            qui est ajouté en haut pousse la bande de réassurance dehors. Les
            marges de cette colonne sont calibrées pour qu'un portable de
            800 px de haut voie le H1, les boutons et les quatre chiffres. */}
        {/* La perspective vit sur le parent : posée sur l'élément qui tourne,
            elle ne s'appliquerait qu'à ses enfants et la rotation resterait
            plate. */}
        <div className="mb-7 [perspective:1400px]" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotateX: -18 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: EASE }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="inline-block will-change-transform"
          >
            <div
              className="relative rounded-2xl border border-white/10 p-3.5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(24px) saturate(180%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(255,255,255,0.04), 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(232,240,255,0.15)",
              }}
            >
              <Image
                src="/logo.png"
                alt="Lavoie Digital"
                width={240}
                height={240}
                priority
                className="h-12 w-12 object-contain sm:h-16 sm:w-16"
                style={{ transform: "translateZ(40px)" }}
              />
              {/* Reflet vitré */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
                }}
              />
            </div>
          </motion.div>
        </div>

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

        {/* La note Google est le premier élément de preuve : sur du trafic
            publicitaire, le visiteur ne connaît ni le studio ni la marque, et
            c'est la seule chose qu'il peut vérifier en trois secondes. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            {eyebrow}
          </span>
          <GoogleRatingPill />
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
          className="text-pretty mt-7 max-w-2xl text-[17px] leading-relaxed text-white/60 sm:text-lg"
        >
          {sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <MagneticButton href="/booking">
            Réserver un appel gratuit
          </MagneticButton>
          {/* Ancre plutôt que lien vers /travaux : sur une page qui reçoit du
              trafic payant, le second bouton ne doit pas faire sortir le
              visiteur du parcours. Les réalisations sont juste en dessous. */}
          <MagneticButton href="#travaux" variant="ghost">
            Voir des projets livrés
          </MagneticButton>
        </motion.div>

        {/* Réassurance chiffrée sous la ligne de flottaison : délai, prix,
            propriété, suivi. Les quatre objections qui reviennent à l'appel. */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-4"
        >
          {facts.map((fact) => (
            <div key={fact.value} className="bg-black/40 px-5 py-4 backdrop-blur">
              <dt className="text-[15px] font-semibold tracking-tight text-white">
                {fact.value}
              </dt>
              <dd className="mt-1.5 text-[12px] leading-snug text-white/45">
                {fact.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Indicateur de défilement — indispensable dès qu'un hero occupe tout
          l'écran : sans lui, rien ne dit au visiteur que les réalisations et
          les avis existent en dessous. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/35"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Défilez</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Block renderer                                                      */
/* ------------------------------------------------------------------ */

export function LandingBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        // Indice comme clé : la liste est statique et ordonnée dans
        // landingData.ts, et le bloc « reviews » n'a pas de titre à utiliser.
        switch (block.kind) {
          case "prose":
            return <ProseBlock key={i} block={block} />;
          case "cards":
            return <CardsBlock key={i} block={block} />;
          case "steps":
            return <StepsBlock key={i} block={block} />;
          case "work":
            return <WorkBlock key={i} block={block} />;
          case "reviews":
            return <Reviews key={i} />;
          case "band":
            return <BandBlock key={i} block={block} />;
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
/* Réalisations                                                        */
/* ------------------------------------------------------------------ */

/**
 * Preuve par les projets livrés. Les slugs sont résolus depuis projectsData —
 * un slug qui n'existe pas est simplement ignoré plutôt que de faire tomber la
 * page, parce qu'un projet peut être retiré de la liste sans qu'on pense à
 * mettre à jour les deux pages d'atterrissage.
 */
function WorkBlock({ block }: { block: Extract<Block, { kind: "work" }> }) {
  const projects = block.slugs
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (projects.length === 0) return null;

  const wide = projects.length > 2;

  return (
    <section
      id="travaux"
      className="relative z-10 scroll-mt-24 border-t border-white/[0.06] px-6 py-16 sm:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <BlockHeader
            eyebrow={block.eyebrow}
            heading={block.heading}
            intro={block.intro}
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
              Toutes les études de cas
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

        <div
          className={`mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
            wide ? "lg:grid-cols-3" : ""
          }`}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              sizes={
                wide
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  : "(max-width: 640px) 100vw, 560px"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA de mi-page                                                      */
/* ------------------------------------------------------------------ */

/**
 * Bande de conversion intercalée. Volontairement plus compacte que le CTA de
 * fin de page : elle relance sans casser la lecture.
 */
function BandBlock({ block }: { block: Extract<Block, { kind: "band" }> }) {
  return (
    <section className="relative z-10 px-6 py-10 sm:px-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative flex flex-col items-start gap-7 overflow-hidden rounded-3xl border border-white/10 px-8 py-9 sm:px-11 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
          style={{
            background:
              "linear-gradient(110deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(24px) saturate(170%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.09), 0 30px 80px -35px rgba(0,0,0,0.7)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />

          <div className="max-w-2xl">
            <h2 className="text-balance text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold tracking-tight text-white">
              {block.title}
            </h2>
            <p className="text-pretty mt-3 text-[15px] leading-relaxed text-white/55">
              {block.text}
            </p>
          </div>

          <div className="shrink-0">
            <MagneticButton href="/booking">{block.cta}</MagneticButton>
          </div>
        </motion.div>
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
          {/* Un seul bouton, et le téléphone en lien discret plutôt qu'en
              bouton d'égale importance : le formulaire est la seule conversion
              que Google Ads peut mesurer, un appel direct reste invisible. On
              garde donc l'option ouverte sans la mettre en concurrence. */}
          <div className="mt-10 flex flex-col items-center justify-center gap-5">
            <MagneticButton href="/booking">
              Réserver un appel gratuit
            </MagneticButton>
            <p className="text-[13px] text-white/40">
              Vous préférez parler tout de suite ?{" "}
              <a
                href="tel:+15142901648"
                className="link-underline text-white/70 hover:text-white"
              >
                514 290-1648
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
