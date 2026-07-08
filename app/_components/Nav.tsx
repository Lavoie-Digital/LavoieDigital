"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/travaux", label: "Travaux" },
  { href: "/approche", label: "Approche" },
  { href: "/difference", label: "Différence" },
  { href: "/a-propos", label: "À propos" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4"
    >
      <div className="relative w-full max-w-5xl">
        <nav
          className={`relative flex w-full items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
            scrolled || menuOpen
              ? "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]"
              : "border-white/5 bg-white/[0.02] backdrop-blur-md"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 pl-2 pr-3 py-1"
            aria-label="Lavoie Digital — accueil"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-md">
              <Image
                src="/logo.png"
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden text-sm font-semibold tracking-tight text-white sm:inline">
              Lavoie Digital
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <Link
                    href={link.href}
                    className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${
                      active
                        ? "text-white"
                        : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="group relative inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black transition-all duration-300 hover:gap-2.5 hover:bg-white/90"
            >
              Réserver
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
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

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-colors duration-300 hover:bg-white/[0.06] md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  animate={
                    menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 block h-[1.5px] w-full rounded-full bg-current"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-[5.25px] block h-[1.5px] w-full rounded-full bg-current"
                />
                <motion.span
                  animate={
                    menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 block h-[1.5px] w-full rounded-full bg-current"
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.button
                type="button"
                aria-hidden
                tabIndex={-1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 -z-10 cursor-default bg-black/40 backdrop-blur-sm md:hidden"
              />

              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 right-0 top-full mt-2 origin-top overflow-hidden rounded-3xl border border-white/10 bg-black/80 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl md:hidden"
              >
                <ul className="flex flex-col">
                  {LINKS.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] transition-colors duration-200 ${
                            active
                              ? "bg-white/[0.08] text-white"
                              : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                          }`}
                        >
                          {link.label}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden
                            className="text-white/40"
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
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
