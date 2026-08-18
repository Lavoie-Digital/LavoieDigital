"use client";

import { motion } from "motion/react";
import { GOOGLE_REVIEWS_URL, REVIEWS, averageRating } from "./reviewsData";
import { SectionHeader } from "./Services";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Jaune Google, pour que les étoiles soient reconnues comme des étoiles Google. */
const STAR = "#fbbc04";

/**
 * Avis Google affichés sur la landing page. Rend `null` tant que
 * `reviewsData.ts` est vide — mieux vaut aucune section qu'une section
 * de faux témoignages.
 */
export default function Reviews() {
  if (REVIEWS.length === 0) return null;

  const avg = averageRating();
  const count = REVIEWS.length;

  return (
    <section
      id="avis"
      className="relative z-10 border-t border-white/[0.06] px-6 py-16 sm:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Avis Google"
            title="Ce que disent les clients."
            sub="Des avis publics laissés sur notre fiche Google. Aucun n'est modifié ni sélectionné : cliquez et vérifiez."
          />

          {/* Résumé de la note — la preuve lisible en trois secondes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="w-full shrink-0 rounded-2xl border border-white/10 px-6 py-5 lg:w-auto"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)",
              backdropFilter: "blur(24px) saturate(160%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex items-center gap-4">
              <GoogleGlyph />
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="display text-3xl leading-none text-white">
                    {avg.toFixed(1)}
                  </span>
                  <Stars value={avg} size={15} />
                </div>
                <p className="mt-1.5 text-[12px] text-white/50">
                  {count} avis {count > 1 ? "vérifiés" : "vérifié"} sur Google
                </p>
              </div>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-block text-[13px] text-white/60 hover:text-white"
            >
              Voir la fiche Google ↗
            </a>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <motion.figure
              key={`${review.author}-${i}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(24px) saturate(160%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 100px -30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <Stars value={review.rating} size={14} />
                <span className="opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                  <GoogleGlyph size={18} />
                </span>
              </div>

              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-white/75">
                {review.text}
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-[13px] font-medium text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
                  }}
                >
                  {review.author.trim().charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-white">
                    {review.author}
                  </p>
                  <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                    {review.context ? `${review.context} · ` : ""}
                    {review.date}
                  </p>
                </div>
              </figcaption>

              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200,220,255,0.2), transparent 70%)",
                }}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Étoiles ----------------- */

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      role="img"
      aria-label={`${value} sur 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        // Une étoile pleine tant que la note la dépasse, sinon un remplissage
        // partiel pour les moyennes du genre 4,7.
        const fill = Math.max(0, Math.min(1, value - i));
        return <Star key={i} fill={fill} size={size} />;
      })}
    </span>
  );
}

const STAR_PATH =
  "M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45L2.6 9.45l6.5-.95L12 2.6z";

/**
 * L'étoile dorée est superposée à l'étoile grise et rognée en CSS plutôt qu'avec
 * un `clipPath` SVG : un clip par étoile voudrait dire un `id` par étoile, et
 * cinq étoiles pleines par carte finissent vite en `id` dupliqués dans le DOM.
 */
function Star({ fill, size }: { fill: number; size: number }) {
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
    >
      <StarPath color="rgba(255,255,255,0.14)" size={size} />
      {fill > 0 && (
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${fill * 100}%` }}
        >
          <StarPath color={STAR} size={size} />
        </span>
      )}
    </span>
  );
}

function StarPath({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className="block"
    >
      <path d={STAR_PATH} fill={color} />
    </svg>
  );
}

/* ----------------- Logo Google ----------------- */

function GoogleGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h11.9c-.2 2-1.5 5-4.4 7l6.7 5.2c4-3.7 6.9-9.1 6.9-15.8z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.2-5.3l-6.7-5.2c-1.8 1.3-4.3 2.2-7.5 2.2-5.8 0-10.7-3.8-12.4-9.1l-7 5.4C8 41.1 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.6 28.6A13.6 13.6 0 0110.8 24c0-1.6.3-3.2.8-4.6l-7-5.4A22 22 0 002 24c0 3.5.8 6.9 2.6 9.9l7-5.3z"
      />
      <path
        fill="#EA4335"
        d="M24 10.2c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4 29.9 2 24 2 15.4 2 8 6.9 4.6 14.1l7 5.4C13.3 14.1 18.2 10.2 24 10.2z"
      />
    </svg>
  );
}
