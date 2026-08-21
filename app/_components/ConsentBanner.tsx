"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";
import {
  CONSENT_MAX_AGE_DAYS,
  DENY_ALL,
  GA_MEASUREMENT_ID,
  type ConsentChoices,
} from "./consent";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Bannière et panneau de préférences des témoins.
 *
 * Trois exigences de la Loi 25 sont visibles à l'œil nu ici :
 *
 *   · « Refuser » a exactement le même poids visuel et le même nombre de clics
 *     que « Tout accepter ». Un refus enterré sous trois écrans ne donne pas un
 *     consentement libre.
 *   · Les finalités sont séparées et refusables une par une.
 *   · La bannière ne bloque pas le contenu : le site reste consultable pendant
 *     que la personne décide, et le refus ne retire aucune fonctionnalité.
 */
export default function ConsentBanner() {
  const { ready, decision, panelOpen, openPanel } = useConsent();

  // Aucune balise configurée : il n'y a rien à consentir, donc pas de bannière.
  const hasTags = Boolean(GA_MEASUREMENT_ID);

  // Rien à afficher avant d'avoir lu le témoin, sinon la bannière clignote pour
  // les personnes qui ont déjà choisi.
  const showBanner = hasTags && ready && !decision && !panelOpen;

  return (
    <>
      <AnimatePresence>
        {showBanner && <Banner onCustomise={openPanel} />}
      </AnimatePresence>
      <AnimatePresence>{panelOpen && <PreferencesPanel />}</AnimatePresence>
    </>
  );
}

/* -------------------------------- Bannière ------------------------------- */

function Banner({ onCustomise }: { onCustomise: () => void }) {
  const { acceptAll, rejectAll } = useConsent();
  const titleId = useId();

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/12 p-4 sm:rounded-[1.75rem] sm:p-7"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,17,0.92) 0%, rgba(6,6,8,0.94) 100%)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.1), 0 40px 100px -30px rgba(0,0,0,0.9)",
        }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40 sm:text-[10px]">
          Témoins
        </p>
        <h2
          id={titleId}
          className="mt-1.5 text-[15px] font-semibold tracking-tight text-white sm:mt-3 sm:text-[19px]"
        >
          On aimerait mesurer ce qui fonctionne.
        </h2>
        {/* Version courte sur mobile : la bannière ne doit pas manger l'écran. */}
        <p className="mt-1.5 text-[12.5px] leading-snug text-white/55 sm:hidden">
          Aucun témoin de mesure ou de publicité sans votre accord. Refuser ne
          retire rien.
        </p>
        <p className="mt-2.5 hidden max-w-2xl text-[14px] leading-relaxed text-white/55 sm:block">
          Aucun témoin de mesure ou de publicité n&apos;est déposé sans votre
          accord. Avec votre consentement, on suit la fréquentation du site et
          l&apos;efficacité de nos annonces. Refuser ne retire rien : le site
          fonctionne à l&apos;identique.
        </p>

        <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:flex-row sm:items-center sm:gap-2.5">
          <Action variant="primary" onClick={acceptAll}>
            Tout accepter
          </Action>
          <Action variant="ghost" onClick={rejectAll}>
            Tout refuser
          </Action>
          {/* `sm:contents` : sur grand écran les deux enfants rejoignent la rangée. */}
          <div className="col-span-2 flex items-center justify-between sm:contents">
            <Action variant="quiet" onClick={onCustomise}>
              Personnaliser
            </Action>
            <Link
              href="/politique-de-confidentialite"
              className="link-underline text-[12px] text-white/45 hover:text-white sm:ml-auto sm:text-[13px]"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------------- Panneau détaillé ---------------------------- */

type Purpose = {
  key: keyof ConsentChoices | "necessary";
  title: string;
  vendor: string;
  body: string;
  cookies: string;
  locked?: boolean;
};

const PURPOSES: Purpose[] = [
  {
    key: "necessary",
    title: "Strictement nécessaire",
    vendor: "Lavoie Digital",
    body: "Un seul témoin, déposé par nous : celui qui mémorise le choix que vous faites ici. Sans lui, la question vous serait reposée à chaque page. Il ne contient aucun identifiant unique et ne permet pas de vous reconnaître.",
    cookies: `ld_consent · ${CONSENT_MAX_AGE_DAYS} jours`,
    locked: true,
  },
  {
    key: "analytics",
    title: "Mesure d'audience",
    vendor: "Google Analytics 4 — Google LLC",
    body: "Combien de personnes visitent le site, quelles pages elles consultent, par quel canal elles arrivent. Ces statistiques servent à améliorer le site, jamais à vous démarcher. L'adresse IP est tronquée par Google avant tout stockage.",
    cookies: "_ga, _ga_* · 24 mois",
  },
  {
    key: "marketing",
    title: "Publicité",
    vendor: "Google Analytics 4 — Google LLC",
    body: "Permet de savoir laquelle de nos annonces vous a amené ici, et donc lesquelles valent la peine d'être payées. Aucune régie publicitaire n'est chargée sur ce site. Refuser n'empêche pas de voir nos annonces : nous ne saurons simplement pas qu'elles ont fonctionné.",
    cookies: "_gcl_au · 90 jours",
  },
];

function PreferencesPanel() {
  const { decision, save, acceptAll, rejectAll, closePanel } = useConsent();
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);

  const [draft, setDraft] = useState<ConsentChoices>(() =>
    decision
      ? { analytics: decision.analytics, marketing: decision.marketing }
      : DENY_ALL,
  );

  // Piège à focus : tant que le panneau est ouvert, la tabulation y reste.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;

      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closePanel],
  );

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    // Rend le focus à l'élément qui a ouvert le panneau.
    return () => opener?.focus?.();
  }, []);

  const toggle = (key: keyof ConsentChoices) =>
    setDraft((d) => ({ ...d, [key]: !d[key] }));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6"
      onKeyDown={onKeyDown}
    >
      <motion.button
        type="button"
        aria-label="Fermer sans enregistrer"
        onClick={closePanel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 32, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.985 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-white/12 outline-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,17,0.96) 0%, rgba(6,6,8,0.97) 100%)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.1), 0 50px 120px -30px rgba(0,0,0,0.9)",
        }}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              Préférences
            </p>
            <h2
              id={titleId}
              className="mt-3 text-[19px] font-semibold tracking-tight text-white sm:text-[22px]"
            >
              Vos témoins, vos règles.
            </h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-white/55">
              Chaque finalité s&apos;accepte ou se refuse séparément. Votre choix
              est révocable en tout temps depuis le pied de page.
            </p>
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label="Fermer"
            className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-7 min-h-0 flex-1 overflow-y-auto border-t border-white/8 px-6 sm:px-8">
          <ul className="divide-y divide-white/8">
            {PURPOSES.map((p) => {
              // Une finalité sans identifiant configuré n'est pas proposée :
              // demander un consentement pour une balise absente serait faux.
              // Les deux finalités optionnelles dépendent de la même balise :
              // sans GA4, il n'y a ni mesure d'audience ni signal publicitaire
              // à autoriser. Le strictement nécessaire, lui, existe toujours.
              if (p.key !== "necessary" && !GA_MEASUREMENT_ID) return null;

              const checked =
                p.key === "necessary" ? true : draft[p.key as keyof ConsentChoices];

              return (
                <li key={p.key} className="py-6">
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-white">
                        {p.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {p.vendor}
                      </p>
                    </div>
                    <Switch
                      checked={checked}
                      locked={p.locked}
                      label={p.title}
                      onChange={() => toggle(p.key as keyof ConsentChoices)}
                    />
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                    {p.body}
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-white/30">
                    {p.cookies}
                  </p>
                </li>
              );
            })}
          </ul>

          <p className="border-t border-white/8 py-6 text-[13px] leading-relaxed text-white/40">
            Google LLC est établie aux États-Unis : accepter la mesure
            d&apos;audience ou la publicité implique une communication de
            renseignements hors du Québec. Le détail, les durées de conservation
            et vos recours sont dans la{" "}
            <Link
              href="/politique-de-confidentialite#temoins"
              className="link-underline text-white/65 hover:text-white"
            >
              politique de confidentialité
            </Link>
            .
            {decision?.date && (
              <>
                {" "}
                Dernier choix enregistré le{" "}
                {new Date(decision.date).toLocaleDateString("fr-CA")}.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-white/8 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <Action variant="primary" onClick={() => save(draft)}>
            Enregistrer mes choix
          </Action>
          <Action variant="ghost" onClick={acceptAll}>
            Tout accepter
          </Action>
          <Action variant="ghost" onClick={rejectAll}>
            Tout refuser
          </Action>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------- Primitives ------------------------------ */

function Action({
  children,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "ghost" | "quiet";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full text-[13px] font-medium tracking-tight transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:text-[14px]";
  const sizing = "px-4 py-2.5 sm:px-6 sm:py-3";
  const skins = {
    primary: `${sizing} bg-white text-black hover:bg-white/90`,
    ghost: `${sizing} border border-white/12 bg-white/[0.04] text-white/85 hover:border-white/25 hover:bg-white/[0.08] hover:text-white`,
    quiet:
      "px-0 py-1 text-white/55 hover:text-white sm:px-6 sm:py-3",
  } as const;

  return (
    <button type="button" onClick={onClick} className={`${base} ${skins[variant]}`}>
      {children}
    </button>
  );
}

function Switch({
  checked,
  locked,
  label,
  onChange,
}: {
  checked: boolean;
  locked?: boolean;
  label: string;
  onChange: () => void;
}) {
  if (locked) {
    return (
      <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        Toujours actif
      </span>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
        checked
          ? "border-white/20 bg-white"
          : "border-white/12 bg-white/[0.06] hover:bg-white/[0.1]"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all duration-300 ${
          checked ? "left-[calc(100%-1.375rem)] bg-black" : "left-[0.1875rem] bg-white/70"
        }`}
      />
    </button>
  );
}
