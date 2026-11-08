import { useEffect, useRef } from "react";

/**
 * A live oscilloscope: two channels scrolling right-to-left in real time.
 *
 *  CH1 (accent)  analog signal whose frequency and amplitude drift, with a
 *                small amount of noise, like a sensor being probed.
 *  CH2 (accent2) a digital data line that sends a burst of bits every few
 *                seconds and idles in between.
 *
 * Drawn on a canvas and redrawn with requestAnimationFrame. It pauses when it
 * is off-screen or the tab is hidden, renders a single still frame for people
 * who prefer reduced motion, and reads its colours from the theme tokens so it
 * follows light/dark mode.
 */

const SPEED = 70; // pixels per second the trace scrolls
const BIT_WIDTH = 16; // pixels per data bit
const BURST_PERIOD = 5.2; // seconds between data bursts
const BURST_BITS = 22;

function tokenColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/** Deterministic pseudo-random in [0,1) so the data line is stable per bit. */
function hash(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function analog(t: number): number {
  // Frequency and amplitude wander slowly so the trace never looks looped.
  const amp = 0.62 + 0.18 * Math.sin(t * 0.35);
  const wobble = 1 + 0.25 * Math.sin(t * 0.21);
  const base = Math.sin(t * 5.2 * wobble) + 0.28 * Math.sin(t * 13.1);
  const noise = (hash(Math.floor(t * 90)) - 0.5) * 0.07;
  return amp * (base / 1.28) + noise;
}

function digital(t: number): number {
  // t is in seconds of "signal time"; returns 0 (low) or 1 (high).
  const cycle = Math.floor(t / BURST_PERIOD);
  const inCycle = t - cycle * BURST_PERIOD;
  const bitIndex = Math.floor((inCycle * SPEED) / BIT_WIDTH);
  if (bitIndex < 0 || bitIndex >= BURST_BITS) return 1; // idle line is high
  if (bitIndex === 0) return 0; // start bit
  return hash(cycle * 101 + bitIndex) > 0.5 ? 1 : 0;
}

export function ScopeTrace({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let startTime = performance.now();
    let lastReadout = 0;
    let colors = { accent: "", accent2: "", ink: "" };

    function readColors() {
      colors = {
        accent: tokenColor("--color-accent", "249 115 22"),
        accent2: tokenColor("--color-accent2", "251 191 36"),
        ink: tokenColor("--color-content", "148 163 184"),
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawGrid(offset: number) {
      const step = 24;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgb(${colors.ink} / 0.07)`;
      ctx.beginPath();
      // The vertical lines scroll with the trace so motion reads clearly.
      for (let x = -((offset % step) + step); x < width + step; x += step) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, height);
      }
      for (let y = 0; y <= height; y += step) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(width, Math.round(y) + 0.5);
      }
      ctx.stroke();

      // Centre axes, a touch stronger.
      ctx.strokeStyle = `rgb(${colors.ink} / 0.14)`;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(height * 0.38) + 0.5);
      ctx.lineTo(width, Math.round(height * 0.38) + 0.5);
      ctx.stroke();
    }

    function strokeTrace(
      color: string,
      sample: (x: number) => number,
      glow: number,
    ) {
      // Newest samples (right edge) are bright, older ones fade out.
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `rgb(${color} / 0)`);
      gradient.addColorStop(0.35, `rgb(${color} / 0.55)`);
      gradient.addColorStop(1, `rgb(${color} / 1)`);

      ctx.save();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 2.25;
      ctx.strokeStyle = gradient;
      ctx.shadowColor = `rgb(${color} / 0.85)`;
      ctx.shadowBlur = glow;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const y = sample(x);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }

    function render(now: number) {
      const t = (now - startTime) / 1000;
      const offset = t * SPEED;
      ctx.clearRect(0, 0, width, height);
      drawGrid(offset);

      const ch1Mid = height * 0.38;
      const ch1Amp = height * 0.26;
      const ch2Mid = height * 0.82;
      const ch2Amp = height * 0.09;

      // x = right edge is "now"; step left in time.
      const timeAt = (x: number) => t - (width - x) / SPEED;

      strokeTrace(
        colors.accent,
        (x) => ch1Mid - analog(timeAt(x)) * ch1Amp,
        10,
      );
      strokeTrace(
        colors.accent2,
        (x) => ch2Mid - (digital(timeAt(x)) * 2 - 1) * ch2Amp,
        6,
      );

      // Leading dot where the newest sample is written.
      const headY = ch1Mid - analog(t) * ch1Amp;
      ctx.save();
      ctx.fillStyle = `rgb(${colors.accent})`;
      ctx.shadowColor = `rgb(${colors.accent})`;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(width - 3, headY, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Channel labels.
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = `rgb(${colors.accent})`;
      ctx.fillText("CH1", 10, 16);
      ctx.fillStyle = `rgb(${colors.accent2})`;
      ctx.fillText("CH2", 10, height - 10);

      // Live readout, updated a few times a second without re-rendering React.
      if (readoutRef.current && now - lastReadout > 250) {
        lastReadout = now;
        const volts = (3.3 * (0.5 + 0.5 * analog(t))).toFixed(2);
        const freq = (0.8 + 0.2 * Math.sin(t * 0.21)).toFixed(2);
        readoutRef.current.textContent = `${volts} V · ${freq} kHz`;
      }
    }

    function loop(now: number) {
      if (!running) return;
      render(now);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    readColors();
    resize();
    // Start from a moment that shows a data burst rather than an idle line.
    startTime = performance.now() - 1500;
    render(performance.now());
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) render(performance.now());
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Re-read colours when the theme is switched.
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (!running) render(performance.now());
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
    };
  }, []);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        role="img"
        aria-label="Decorative live oscilloscope trace"
      />
      <span
        ref={readoutRef}
        className="pointer-events-none absolute right-3 top-2.5 font-mono text-[10px] text-content-muted sm:text-xs"
        aria-hidden="true"
      >
        3.30 V · 0.80 kHz
      </span>
    </div>
  );
}
