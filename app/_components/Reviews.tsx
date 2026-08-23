"use client";

import { motion } from "motion/react";
import { GoogleGlyph, Stars, formatRating } from "./GoogleRating";
import {
  GOOGLE_REVIEWS_URL,
  REVIEWS,
  TOTAL_REVIEW_COUNT,
  averageRating,
} from "./reviewsData";
import { SectionHeader } from "./Services";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Avis Google affichés sur la landing page. Rend `null` tant que
 * `reviewsData.ts` est vide — mieux vaut aucune section qu'une section
 * de faux témoignages.
 */
export default function Reviews() {
  if (REVIEWS.length === 0) return null;

  const avg = averageRating();
  const count = TOTAL_REVIEW_COUNT;

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
            sub="Un extrait des avis publics laissés sur notre fiche Google. Aucun n'est modifié : cliquez et vérifiez."
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
                    {formatRating(avg)}
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

        {/* Flex plutôt que grid : avec 5 cartes sur 3 colonnes, une grille
            colle les 2 dernières à gauche et laisse un trou. Le flex-wrap
            centré équilibre la rangée incomplète. Les largeurs reproduisent
            les colonnes, gap-5 (1.25rem) déduit au prorata. */}
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {REVIEWS.map((review, i) => (
            <motion.figure
              key={`${review.author}-${i}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 p-7 md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
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
