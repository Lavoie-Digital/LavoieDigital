"use client";

import { useEffect, useRef, useState } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Point d'ancrage : le ressort ramène toujours le point ici. */
  baseX: number;
  baseY: number;
  radius: number;
  pulse: number;
};

const SPACING = 55;
const MAX_CONN_DIST = 75;
const MOUSE_RADIUS = 220;
/** Raideur du ressort (loi de Hooke) et frottement sur la vitesse. */
const SPRING_K = 18;
const DAMPING = 0.82;
/** Les traits sont regroupés par palier d'opacité pour ne pas faire un stroke() par segment. */
const ALPHA_STEPS = 8;
const LINE_ALPHA = 0.18;

/** L'effet n'a de sens qu'avec un vrai curseur : sur écran tactile il n'y a rien
 *  à survoler, et le défilement au doigt émet des `pointermove` pendant que le
 *  canvas se déplace, ce qui envoie une onde de choc à chaque geste. */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Maille de points blancs réagissant au curseur : chaque point est relié à ses
 * voisins et repoussé par une onde de choc proportionnelle à la vitesse du
 * curseur, puis ramené à son ancrage par un ressort amorti.
 *
 * Le canvas est transparent et en `pointer-events-none` : l'AmbientBackdrop
 * reste visible derrière et les CTA du hero restent cliquables. Sur mobile et
 * tablette, rien n'est monté du tout — ni canvas, ni boucle d'animation.
 */
export default function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Faux au premier rendu : le serveur ne connaît pas le pointeur, et partir de
  // faux évite un décalage d'hydratation.
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const sync = () => setHasFinePointer(mq.matches);
    sync();
    // Suit le branchement d'une souris ou le passage en mode tablette.
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let nodes: Node[] = [];
    let raf = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      /** px/ms, sert à muscler l'onde de choc quand on balaie vite. */
      speed: 0,
      seen: false,
    };

    /** Les points sont stockés en colonnes, ce qui rend les voisins calculables. */
    const at = (i: number, j: number) => nodes[i * rows + j];

    const initNodes = () => {
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      // La maille est un peu plus large que le hero : on la centre pour que le
      // débordement soit symétrique plutôt que collé à droite et en bas.
      const offsetX = (width - (cols - 1) * SPACING) / 2;
      const offsetY = (height - (rows - 1) * SPACING) / 2;

      nodes = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * SPACING;
          const y = offsetY + j * SPACING;
          nodes.push({
            x,
            y,
            vx: 0,
            vy: 0,
            baseX: x,
            baseY: y,
            radius: Math.random() * 0.7 + 0.7,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Fixer width/height remet la matrice de transformation à l'identité,
      // donc le scale doit venir après.
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
      if (reduceMotion) draw();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (!mouse.seen) {
        // Sans ça, le premier mouvement part de -9999 et déclenche une onde de
        // choc absurde sur toute la grille.
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.seen = true;
      }
    };

    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
      mouse.seen = false;
    };

    /** Segments à tracer, regroupés par palier d'opacité et réutilisés d'une image à l'autre. */
    const buckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => []);

    const drawLines = () => {
      for (const bucket of buckets) bucket.length = 0;

      // Au repos, seuls les voisins orthogonaux sont à portée (55 < 75) ; les
      // diagonales (77,8) n'entrent en jeu que lorsque la maille se déforme.
      // Tester uniquement ces quatre voisins remplace un balayage en O(n²).
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const n = at(i, j);
          for (let k = 0; k < 4; k++) {
            const ni = i + (k === 1 ? 0 : 1);
            const nj = j + (k === 0 ? 0 : k === 3 ? -1 : 1);
            if (ni >= cols || nj < 0 || nj >= rows) continue;

            const n2 = at(ni, nj);
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq >= MAX_CONN_DIST * MAX_CONN_DIST) continue;

            const t = 1 - Math.sqrt(distSq) / MAX_CONN_DIST;
            const step = Math.min(ALPHA_STEPS - 1, (t * ALPHA_STEPS) | 0);
            buckets[step].push(n.x, n.y, n2.x, n2.y);
          }
        }
      }

      ctx.lineWidth = 0.7;
      for (let s = 0; s < ALPHA_STEPS; s++) {
        const seg = buckets[s];
        if (seg.length === 0) continue;
        ctx.strokeStyle = `rgba(255,255,255,${
          ((s + 0.5) / ALPHA_STEPS) * LINE_ALPHA
        })`;
        ctx.beginPath();
        for (let p = 0; p < seg.length; p += 4) {
          ctx.moveTo(seg[p], seg[p + 1]);
          ctx.lineTo(seg[p + 2], seg[p + 3]);
        }
        ctx.stroke();
      }
    };

    const drawNodes = () => {
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < MOUSE_RADIUS;

        const alpha = isNear ? 0.9 : 0.25 + Math.sin(n.pulse) * 0.1;
        const radius = isNear
          ? n.radius * 2
          : n.radius + Math.sin(n.pulse) * 0.18;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.35, radius), 0, Math.PI * 2);
        ctx.fill();

        // Anneau radar sur les points immédiatement sous le curseur.
        if (dist < 90) {
          const ring = ((n.pulse * 20) % 30) + 4;
          ctx.strokeStyle = `rgba(255,255,255,${(1 - ring / 34) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, ring, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    // En `const` et non en `function` : une déclaration hoistée pourrait être
    // appelée avant le garde sur `ctx`, donc TypeScript y perd le narrowing.
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawLines();
      drawNodes();
    };

    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const mvx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
      const mvy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
      mouse.speed = Math.sqrt(mvx * mvx + mvy * mvy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      for (const n of nodes) {
        n.pulse += dt * 3;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force =
            (1 - dist / MOUSE_RADIUS) * (1500 + mouse.speed * 150) * dt;
          n.vx -= (dx / dist) * force;
          n.vy -= (dy / dist) * force;
        }

        n.vx += (n.baseX - n.x) * SPRING_K * dt;
        n.vy += (n.baseY - n.y) * SPRING_K * dt;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
      }

      draw();
      raf = requestAnimationFrame(frame);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
    />
  );
}
