"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { FAQ_ITEMS } from "./faqData";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative z-10 px-6 py-16 sm:px-10 md:py-24"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur"
        >
          <span className="h-1 w-1 rounded-full bg-white/70" />
          Questions fréquentes
        </motion.div>

        <motion.h2
          id="faq-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-6 max-w-2xl text-[clamp(2rem,5vw,3.2rem)] text-white"
        >
          Tout savoir sur nos sites web et applications au Québec.
        </motion.h2>

        <div className="mt-12 flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-white/10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                  backdropFilter: "blur(24px) saturate(160%)",
                }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[16px] font-medium text-white transition-colors duration-300 hover:bg-white/[0.03] sm:text-[17px]"
                  >
                    {item.q}
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="grid h-6 w-6 shrink-0 place-items-center text-white/60"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 1v14M1 8h14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.span>
                  </button>
                </h3>
                {/* Answer stays mounted (collapsed via height) so its text is
                    always in the DOM for crawlers and answer engines. */}
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-white/60">
                    {item.a}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
