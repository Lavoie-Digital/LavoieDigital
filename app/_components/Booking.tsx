"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Services";

type FormData = {
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

const INITIAL: FormData = {
  projectType: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

type Option = { value: string; label: string; desc?: string };

const PROJECT_TYPES: Option[] = [
  { value: "app", label: "Application full-stack", desc: "SaaS, dashboard, outil interne" },
  { value: "site", label: "Site web premium", desc: "Vitrine, e-commerce, landing" },
  { value: "ia", label: "Automatisation & IA", desc: "Agents, intégrations, tâches répétitives" },
  { value: "autre", label: "Autre projet", desc: "Parlons-en directement" },
];

// « Je ne sais pas encore » d'abord : sans porte de sortie, la question du
// budget est celle qui fait fermer l'onglet. Mieux vaut un lead honnête sans
// montant qu'un abandon, ou qu'une fourchette cochée au hasard.
const BUDGETS: Option[] = [
  { value: "unsure", label: "Je ne sais pas encore" },
  { value: "5k", label: "Moins de 5 000 $" },
  { value: "5-15k", label: "5 000 — 15 000 $" },
  { value: "15-40k", label: "15 000 — 40 000 $" },
  { value: "40k+", label: "Plus de 40 000 $" },
];

const TIMELINES: Option[] = [
  { value: "asap", label: "Dès que possible" },
  { value: "1-3", label: "Dans 1 à 3 mois" },
  { value: "3-6", label: "Dans 3 à 6 mois" },
  { value: "flex", label: "Flexible" },
];

/**
 * Ordre pensé pour la conversion : un premier clic gratuit, puis les
 * coordonnées pendant que l'élan est là, puis la qualification, et enfin des
 * champs entièrement facultatifs. Une personne qui décroche après l'étape 2
 * reste joignable — c'est tout l'intérêt de ne pas garder le nom pour la fin.
 */
const STEPS = [
  { key: "project", label: "Projet" },
  { key: "contact", label: "Vous" },
  { key: "scope", label: "Cadrage" },
  { key: "details", label: "Détails" },
] as const;

const TOTAL_STEPS = STEPS.length;

/** Brouillon conservé le temps de l'onglet, pour survivre à un rafraîchissement. */
const DRAFT_KEY = "ld-booking-draft";

const EMAIL_RE = /.+@.+\..+/;

export default function Booking() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Piège à robots : invisible et hors du parcours au clavier. */
  const [honeypot, setHoneypot] = useState("");

  const startedAt = useRef<number>(0);
  const restored = useRef(false);

  // Le chrono démarre au montage et sert de mesure anti-robot côté serveur.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Restauration du brouillon. Uniquement dans un effet : sessionStorage
  // n'existe pas au rendu serveur, et le lire pendant le rendu client ferait
  // diverger le DOM du HTML envoyé. C'est le cas de synchronisation avec un
  // système externe que la règle set-state-in-effect autorise à contourner.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { data: FormData; step: number };
      if (saved?.data) setData({ ...INITIAL, ...saved.data });
      if (typeof saved?.step === "number") {
        setStep(Math.min(Math.max(saved.step, 0), TOTAL_STEPS - 1));
      }
    } catch {
      // Brouillon illisible : on repart de zéro, ce n'est pas bloquant.
    } finally {
      restored.current = true;
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    // Attendre la restauration, sinon le premier rendu écrase le brouillon.
    if (!restored.current || done) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ data, step }));
    } catch {
      // Mode privé ou quota plein : la sauvegarde est un bonus, pas un dû.
    }
  }, [data, step, done]);

  const update = useCallback(
    <K extends keyof FormData>(k: K, v: FormData[K]) =>
      setData((d) => ({ ...d, [k]: v })),
    [],
  );

  const canAdvance = () => {
    if (step === 0) return !!data.projectType;
    if (step === 1)
      return data.name.trim().length > 1 && EMAIL_RE.test(data.email.trim());
    if (step === 2) return !!data.budget && !!data.timeline;
    // Dernière étape : tout est facultatif, on peut envoyer tel quel.
    return true;
  };

  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: honeypot,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const body = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) throw new Error(body?.error || "Erreur lors de l'envoi");
      setDone(true);
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        // Sans importance : le brouillon expire avec l'onglet.
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  };

  // Un vrai <form> pour que la touche Entrée fasse avancer puis envoyer.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !canAdvance()) return;
    if (step < TOTAL_STEPS - 1) next();
    else submit();
  };

  const isLast = step === TOTAL_STEPS - 1;

  return (
    <section id="booking" className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          titleAs="h1"
          eyebrow="Réserver"
          title="Parlons de votre projet web ou d'application."
          sub="Quatre étapes courtes, environ une minute. On revient vers vous sous 24 heures avec un appel et une première piste."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/12 p-6 sm:p-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(28px) saturate(180%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 50px 120px -30px rgba(0,0,0,0.7)",
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(180,200,255,0.18), transparent 70%)",
            }}
          />

          {done ? (
            <SuccessView
              data={data}
              onReset={() => {
                setDone(false);
                setStep(0);
                setData(INITIAL);
                startedAt.current = Date.now();
              }}
            />
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <ProgressBar step={step} />

              {/* Le changement d'étape est annoncé aux lecteurs d'écran, qui
                  sinon ne perçoivent rien du remplacement de contenu. */}
              <p aria-live="polite" className="sr-only">
                Étape {step + 1} sur {TOTAL_STEPS} — {STEPS[step].label}
              </p>

              <div className="relative mt-10 min-h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 0 && (
                      <StepShell
                        title="Quel type de projet ?"
                        sub="Choisissez ce qui s'en rapproche le plus. Rien n'est figé — on affinera ensemble à l'appel."
                      >
                        <RadioGroup
                          legend="Type de projet"
                          value={data.projectType}
                          onChange={(v) => update("projectType", v)}
                          options={PROJECT_TYPES}
                        />
                      </StepShell>
                    )}

                    {step === 1 && (
                      <StepShell
                        title="Comment vous joindre ?"
                        sub="Deux champs, et on peut déjà vous répondre même si vous vous arrêtez ici."
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field
                            label="Nom complet"
                            name="name"
                            autoComplete="name"
                            required
                            value={data.name}
                            onChange={(v) => update("name", v)}
                            placeholder="Marie Tremblay"
                          />
                          <Field
                            label="Courriel"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            required
                            value={data.email}
                            onChange={(v) => update("email", v)}
                            placeholder="marie@entreprise.ca"
                          />
                        </div>

                        {/* Avis de collecte — la Loi 25 exige d'informer la
                            personne des fins de la collecte au moment où elle a
                            lieu, pas seulement dans la politique. */}
                        <p className="mt-6 text-[13px] leading-relaxed text-white/40">
                          En envoyant ce formulaire, vous consentez à ce
                          qu&apos;on utilise ces renseignements pour répondre à
                          votre demande et cadrer votre projet. Aucun partage à
                          des fins commerciales, retrait du consentement
                          possible en tout temps.{" "}
                          <Link
                            href="/politique-de-confidentialite"
                            className="link-underline text-white/65 hover:text-white"
                          >
                            Politique de confidentialité
                          </Link>
                          .
                        </p>
                      </StepShell>
                    )}

                    {step === 2 && (
                      <StepShell
                        title="Cadrons le projet."
                        sub="Aucun jugement et rien d'engageant — ça nous sert à proposer la bonne approche dès le premier appel."
                      >
                        <RadioGroup
                          legend="Budget envisagé"
                          value={data.budget}
                          onChange={(v) => update("budget", v)}
                          options={BUDGETS}
                          variant="pill"
                        />
                        <div className="mt-8">
                          <RadioGroup
                            legend="Quand souhaitez-vous démarrer ?"
                            value={data.timeline}
                            onChange={(v) => update("timeline", v)}
                            options={TIMELINES}
                            variant="pill"
                          />
                        </div>
                      </StepShell>
                    )}

                    {step === 3 && (
                      <StepShell
                        title="Un dernier mot ?"
                        sub="Tout est facultatif ici. Vous pouvez envoyer votre demande telle quelle."
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field
                            label="Entreprise"
                            name="organization"
                            autoComplete="organization"
                            optional
                            value={data.company}
                            onChange={(v) => update("company", v)}
                            placeholder="Boulangerie du Quartier"
                          />
                          <Field
                            label="Téléphone"
                            name="tel"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            optional
                            value={data.phone}
                            onChange={(v) => update("phone", v)}
                            placeholder="(514) 555-0123"
                          />
                        </div>
                        <div className="mt-4">
                          <Field
                            label="Votre projet en quelques mots"
                            name="message"
                            optional
                            value={data.message}
                            onChange={(v) => update("message", v)}
                            placeholder="Ce qu'on veut accomplir, ce qui vous tient à cœur, contraintes connues…"
                            multiline
                          />
                        </div>
                      </StepShell>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Champ leurre : masqué visuellement, ignoré au clavier et par
                  les lecteurs d'écran. Un humain ne le remplit jamais. */}
              <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <label>
                  Ne pas remplir
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200/90"
                >
                  {error} Vous pouvez aussi nous écrire directement à{" "}
                  <a
                    href="mailto:info@lavoiedigital.ca"
                    className="link-underline text-white"
                  >
                    info@lavoiedigital.ca
                  </a>
                  .
                </div>
              )}

              <div className="mt-10 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/65 transition-all hover:bg-white/[0.06] hover:text-white"
                  >
                    ← Retour
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  disabled={!canAdvance() || submitting}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:gap-3 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {submitting
                    ? "Envoi…"
                    : isLast
                      ? "Envoyer la demande"
                      : "Suivant"}
                  {!submitting && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M1 7h12m0 0L7 1m6 6l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 text-center backdrop-blur-md sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-sm text-white/80">Préfère écrire directement ?</p>
            <p className="text-[13px] text-white/50">
              Email, téléphone — on est joignables.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[13px]">
            <a
              href="mailto:info@lavoiedigital.ca"
              className="link-underline text-white/90"
            >
              info@lavoiedigital.ca
            </a>
            <span className="hidden text-white/15 sm:inline">·</span>
            <a href="tel:+15142901648" className="link-underline text-white/90">
              +1 (514) 290-1648
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Progression ---------- */

function ProgressBar({ step }: { step: number }) {
  return (
    <div>
      <div className="flex gap-1.5">
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/8"
          >
            <motion.div
              initial={false}
              animate={{ scaleX: i <= step ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-0 bg-white"
            />
          </div>
        ))}
      </div>
      {/* Nommer les étapes rend le parcours prévisible : on voit d'un coup
          d'œil qu'il reste peu, et surtout quoi. */}
      <div className="mt-3 flex gap-1.5">
        {STEPS.map((s, i) => (
          <span
            key={s.key}
            className={`flex-1 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-500 sm:text-[10px] ${
              i === step
                ? "text-white/70"
                : i < step
                  ? "text-white/35"
                  : "text-white/20"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Coquille d'étape ---------- */

function StepShell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
        {title}
      </h3>
      <p className="mt-2 text-[15px] text-white/55">{sub}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

/* ---------- Groupe de choix ---------- */

/**
 * Boutons plutôt qu'`<input type="radio">` pour garder la mise en forme, mais
 * avec la sémantique ARIA complète : groupe nommé, état coché exposé, et
 * navigation aux flèches avec un seul point d'entrée dans l'ordre de tabulation.
 */
function RadioGroup({
  legend,
  value,
  onChange,
  options,
  variant = "card",
}: {
  legend: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  variant?: "card" | "pill";
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = options.findIndex((o) => o.value === value);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + options.length) % options.length;
    onChange(options[n].value);
    refs.current[n]?.focus();
  };

  return (
    <div>
      <p
        id={`legend-${legend}`}
        className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40"
      >
        {legend}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={`legend-${legend}`}
        className={
          variant === "card"
            ? "grid gap-3 sm:grid-cols-2"
            : "flex flex-wrap gap-2.5"
        }
      >
        {options.map((opt, i) => {
          const selected = value === opt.value;
          // Un seul élément tabulable par groupe : la sélection, ou le premier
          // choix tant que rien n'est coché.
          const tabIndex =
            selectedIndex === -1 ? (i === 0 ? 0 : -1) : selected ? 0 : -1;

          if (variant === "pill") {
            return (
              <button
                key={opt.value}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={tabIndex}
                onClick={() => onChange(opt.value)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`rounded-full border px-4 py-2.5 text-[14px] transition-all duration-300 ${
                  selected
                    ? "border-white/35 bg-white/[0.1] text-white"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/85"
                }`}
              >
                {opt.label}
              </button>
            );
          }

          return (
            <button
              key={opt.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={tabIndex}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`group relative flex flex-col items-start gap-1 rounded-2xl border p-5 pr-12 text-left transition-all duration-300 ${
                selected
                  ? "border-white/30 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span className="text-[15px] font-medium text-white">
                {opt.label}
              </span>
              {opt.desc && (
                <span className="text-[13px] text-white/50">{opt.desc}</span>
              )}
              <span
                aria-hidden
                className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  selected
                    ? "border-white bg-white"
                    : "border-white/20 bg-transparent"
                }`}
              >
                {selected && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Champ ---------- */

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  multiline = false,
  required = false,
  optional = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  multiline?: boolean;
  required?: boolean;
  optional?: boolean;
}) {
  const cls =
    "peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-[15px] text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.05]";
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
        {label}
        {required && <span className="text-white/60">requis</span>}
        {optional && <span className="text-white/25">facultatif</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

/* ---------- Succès ---------- */

function SuccessView({
  data,
  onReset,
}: {
  data: FormData;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M6 14l5 5 11-11"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <h3 className="mt-8 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-tight text-white">
        Merci, {data.name.trim().split(" ")[0]}.
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
        On a bien reçu votre demande. Vous recevrez un courriel de notre part à{" "}
        <span className="text-white/85">{data.email.trim()}</span> sous
        24&nbsp;heures pour planifier un appel découverte.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        Soumettre une autre demande
      </button>
    </motion.div>
  );
}
