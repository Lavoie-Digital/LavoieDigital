import { GOOGLE_REVIEWS_URL, REVIEWS, averageRating } from "./reviewsData";

/** Jaune Google, pour que les étoiles soient reconnues comme des étoiles Google. */
const STAR = "#fbbc04";

/** Note affichée à la française : 5,0 et non 5.0. */
export function formatRating(value: number) {
  return value.toFixed(1).replace(".", ",");
}

/**
 * Pastille de preuve sociale : logo Google, étoiles, note et nombre d'avis.
 * Les chiffres viennent des avis réels de `reviewsData.ts` — jamais codés en
 * dur — et la pastille disparaît si la liste est vide.
 */
export function GoogleRatingPill({ className = "" }: { className?: string }) {
  if (REVIEWS.length === 0) return null;

  const avg = averageRating();
  const count = REVIEWS.length;

  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Note de ${formatRating(avg)} sur 5 d'après ${count} avis Google — voir la fiche`}
      className={`group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-3 pr-4 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] ${className}`}
    >
      <GoogleGlyph size={15} />
      <Stars value={avg} size={12} />
      <span className="text-[13px] font-medium leading-none text-white">
        {formatRating(avg)}
      </span>
      <span aria-hidden className="h-3 w-px bg-white/15" />
      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-white/45 transition-colors duration-300 group-hover:text-white/75">
        {count} avis Google
      </span>
    </a>
  );
}

/* ----------------- Étoiles ----------------- */

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      role="img"
      aria-label={`${formatRating(value)} sur 5`}
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

export function GoogleGlyph({ size = 26 }: { size?: number }) {
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
