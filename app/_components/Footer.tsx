"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lavoie_digital/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/lavoie-digital/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5c0-1.2-.02-2.74-1.9-2.74-1.9 0-2.2 1.32-2.2 2.66V21h-3.9z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590179200262",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.29-.04-1.27-.12-2.4-.12-2.38 0-4.01 1.45-4.01 4.12v2.29H7.9V13h2.69v8z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/8 bg-black/40 backdrop-blur-md">
      {/* Giant wordmark */}
      <div className="relative overflow-hidden">
        <motion.p
          aria-hidden
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display select-none px-6 pt-20 pb-10 text-center text-[clamp(3.5rem,16vw,14rem)] leading-[0.85] text-white sm:px-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.15) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LAVOIE DIGITAL
        </motion.p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Lavoie Digital"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-white">Lavoie Digital</p>
              <p className="text-[12px] text-white/40">Studio code &amp; web · Québec</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/55">
            Applications full-stack et expériences web haut de gamme pour
            les PME du Québec. Conçus pour durer, optimisés pour convertir.
          </p>
        </div>

        {/* Keyword-bearing anchors to the search-intent landing pages. Generic
            anchors like "Services" tell Google nothing about what ranks here. */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Expertises
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li>
              <Link
                href="/creation-site-web-quebec"
                className="link-underline text-white/70 hover:text-white"
              >
                Création de site web au Québec
              </Link>
            </li>
            <li>
              <Link
                href="/creation-application-web-quebec"
                className="link-underline text-white/70 hover:text-white"
              >
                Création d&apos;application web au Québec
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Navigation
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li><Link href="/services" className="link-underline text-white/70 hover:text-white">Services</Link></li>
            <li><Link href="/travaux" className="link-underline text-white/70 hover:text-white">Travaux</Link></li>
            <li><Link href="/approche" className="link-underline text-white/70 hover:text-white">Approche</Link></li>
            <li><Link href="/difference" className="link-underline text-white/70 hover:text-white">Différence</Link></li>
            <li><Link href="/a-propos" className="link-underline text-white/70 hover:text-white">À propos</Link></li>
            <li><Link href="/booking" className="link-underline text-white/70 hover:text-white">Réserver</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li><a href="mailto:info@lavoiedigital.ca" className="link-underline text-white/70 hover:text-white">info@lavoiedigital.ca</a></li>
            <li><a href="tel:+15142901648" className="link-underline text-white/70 hover:text-white">+1 (514) 290-1648</a></li>
          </ul>

          <div className="mt-5 flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-white/8 px-6 py-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:px-10">
        <p>© {new Date().getFullYear()} Lavoie Digital. Tous droits réservés.</p>
        <p className="font-mono uppercase tracking-[0.22em]">
          Conçu &amp; codé à Québec
        </p>
      </div>
    </footer>
  );
}
