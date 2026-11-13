import { useEffect, useRef } from "react";
import {
  PROFILES,
  chooseDpr,
  createChipScene,
  pickInitialQuality,
  type Quality,
  type SceneColors,
} from "./holoChip/engine";

/**
 * A rotating 3D hologram of a microcontroller, drawn on a canvas with a small
 * hand-written 3D projection (no libraries). See holoChip/engine.ts for the
 * renderer and for why it is cheap enough for low-end phones.
 *
 * This component decides how much detail the device can afford:
 *
 *  - it starts at a quality picked from the device (cores, memory, data-saver,
 *    reduced-motion, screen size)
 *  - it measures how late frames actually are and steps down a level when the
 *    device cannot keep up, ending in a still image rather than a stutter
 *  - it renders fewer frames while the page is scrolling, so scrolling stays
 *    smooth
 *  - it pauses when off-screen or when the tab is hidden
 *
 * It keeps moving with reduced-motion on (slower, no pointer tilt), because the
 * motion is the whole point of this element.
 */

/** Each step trades detail or frame rate for speed. The last is a still image. */
const LEVELS: { quality: Quality; fpsScale: number }[] = [
  { quality: "high", fpsScale: 1 },
  { quality: "medium", fpsScale: 1 },
  { quality: "lite", fpsScale: 1 },
  { quality: "lite", fpsScale: 0.5 },
];
const SCROLL_FPS = 24;
const WARMUP_FRAMES = 36;
const MIN_MS_BETWEEN_CHANGES = 1800;
/** Frames this much later than planned (on average) trigger a step down. */
const LATE_RATIO = 1.5;

function readColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function readColors(): SceneColors {
  return {
    accent: readColor("--color-accent", "232 126 54"),
    accent2: readColor("--color-accent2", "245 180 82"),
    ink: readColor("--color-content", "178 183 193"),
    surface: readColor("--color-surface", "17 20 25"),
  };
}

export function HoloChip({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const speed = reduceMotion ? 0.55 : 1;

    const scene = createChipScene(context, {
      createCanvas(width, height) {
        const sprite = document.createElement("canvas");
        sprite.width = width;
        sprite.height = height;
        return sprite;
      },
    });

    const initial = pickInitialQuality({
      reducedMotion: reduceMotion,
      saveData: Boolean(nav.connection?.saveData),
      cores: nav.hardwareConcurrency,
      memory: nav.deviceMemory,
      coarsePointer,
      viewportWidth: window.innerWidth,
    });
    let level = Math.max(
      0,
      LEVELS.findIndex((entry) => entry.quality === initial),
    );

    let running = false;
    let frozen = false;
    let visible = true;
    let frame = 0;
    let t = 2.5;
    let lastRender = 0;
    let scrollUntil = 0;
    let late = 1; // smoothed (actual frame gap / planned frame gap)
    let samples = 0;
    let lastChange = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    function applyLevel() {
      const { quality } = LEVELS[level];
      scene.setQuality(quality);
      canvas!.dataset.quality = frozen ? "still" : `${quality}${LEVELS[level].fpsScale < 1 ? "-slow" : ""}`;
      applySize();
    }

    function applySize() {
      const rect = canvas!.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = chooseDpr(w, h, window.devicePixelRatio, PROFILES[LEVELS[level].quality]);
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);
      if (canvas!.width !== pw || canvas!.height !== ph) {
        canvas!.width = pw;
        canvas!.height = ph;
      }
      scene.resize(w, h, pw / w);
    }

    function draw(dt: number) {
      scene.setPointer(pointer.x, pointer.y);
      scene.render(t, dt);
    }

    function freeze() {
      frozen = true;
      running = false;
      cancelAnimationFrame(frame);
      canvas!.dataset.quality = "still";
      draw(0);
    }

    function stepDown(now: number) {
      lastChange = now;
      samples = 0;
      late = 1;
      if (level >= LEVELS.length - 1) {
        freeze();
        return;
      }
      level += 1;
      applyLevel();
    }

    function loop(now: number) {
      if (!running) return;
      frame = requestAnimationFrame(loop);

      const scrolling = now < scrollUntil;
      const fps = Math.min(
        PROFILES[LEVELS[level].quality].fps * LEVELS[level].fpsScale,
        scrolling ? SCROLL_FPS : Infinity,
      );
      const planned = 1000 / fps;
      const sinceRender = now - lastRender;
      if (sinceRender < planned - 2) return;

      lastRender = now;
      const dt = Math.min(0.05, sinceRender / 1000) * speed;
      t += dt;
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 5);
      draw(dt);

      // Judge the device by frames that were late, ignoring the gap after a
      // pause and the deliberately slower scrolling frame rate.
      if (sinceRender > 250 || scrolling) return;
      late = late * 0.88 + (sinceRender / planned) * 0.12;
      samples += 1;
      if (samples >= WARMUP_FRAMES && now - lastChange > MIN_MS_BETWEEN_CHANGES && late > LATE_RATIO) {
        stepDown(now);
      }
    }

    function start() {
      if (running || frozen || !visible || document.hidden) return;
      running = true;
      lastRender = performance.now();
      frame = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointer.tx = Math.max(-1.2, Math.min(1.2, x));
      pointer.ty = Math.max(-1.2, Math.min(1.2, y));
    }
    function onScroll() {
      scrollUntil = performance.now() + 160;
    }

    scene.setColors(readColors());
    applyLevel();
    draw(0);
    start();

    const resizeObserver = new ResizeObserver(() => {
      applySize();
      if (!running) draw(0);
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "80px" },
    );
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const themeObserver = new MutationObserver(() => {
      scene.setColors(readColors());
      if (!running) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Decorative rotating 3D microchip with orbiting data electrons"
    />
  );
}
