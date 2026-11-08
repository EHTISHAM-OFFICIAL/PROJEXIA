import { useEffect, useRef } from "react";

/**
 * A live, futuristic circuit board: a glowing microcontroller at the centre,
 * 24 traces fanning out to labelled pads, and data pulses racing along them
 * in both directions. Pads flash when a pulse arrives, the chip core glows
 * with activity, and the chip and traces shift slightly against each other
 * when the pointer moves (a cheap parallax depth effect).
 *
 * Canvas + requestAnimationFrame. Pauses off-screen / hidden tab, draws one
 * still frame for reduced-motion users, and reads theme tokens so it follows
 * light and dark mode.
 */

type Point = { x: number; y: number };

interface Trace {
  points: Point[];
  lengths: number[]; // cumulative length at each point
  total: number;
  pad: Point;
  stubFrom: Point;
  stubTo: Point;
  label: string;
  labelDir: Point; // unit vector pointing away from the end of the trace
  tone: 0 | 1; // 0 = accent, 1 = accent2
  // pulse state
  pulseAt: number; // distance along the path of the head, -1 when idle
  reverse: boolean;
  nextFire: number; // seconds
  flash: number; // 0..1 pad flash
  pinFlash: number; // 0..1 pin flash
}

const SIZE = 400;
const CENTER = SIZE / 2;
const PULSE_SPEED = 150; // units per second
const TAIL = 46; // units
const LABELS = [
  "I2C", "SPI", "TX", "RX", "ADC", "PWM",
  "CAN", "USB", "SDA", "SCL", "IO4", "IO5",
  "3V3", "GND", "LED", "BTN", "IRQ", "RST",
  "CLK", "MOSI", "MISO", "CS", "DAC", "AUX",
];

function rotate(point: Point, quarterTurns: number): Point {
  let { x, y } = point;
  for (let i = 0; i < quarterTurns; i += 1) {
    const dx = x - CENTER;
    const dy = y - CENTER;
    x = CENTER - dy;
    y = CENTER + dx;
  }
  return { x, y };
}

function buildTraces(): Trace[] {
  const traces: Trace[] = [];
  for (let side = 0; side < 4; side += 1) {
    for (let i = 0; i < 6; i += 1) {
      const pinX = 145 + i * 22;
      const dx = (i - 2.5) * 26;
      const turnY = 114;
      const endY = 36 + (i % 2) * 10;
      const raw: Point[] = [
        { x: pinX, y: 122 },
        { x: pinX, y: turnY },
        { x: pinX + dx, y: turnY - Math.abs(dx) },
        { x: pinX + dx, y: endY },
      ];
      const points = raw.map((p) => rotate(p, side));
      const lengths = [0];
      for (let k = 1; k < points.length; k += 1) {
        lengths.push(
          lengths[k - 1] +
            Math.hypot(
              points[k].x - points[k - 1].x,
              points[k].y - points[k - 1].y,
            ),
        );
      }
      const end = points[points.length - 1];
      const prev = points[points.length - 2];
      const norm = Math.hypot(end.x - prev.x, end.y - prev.y) || 1;
      const index = side * 6 + i;
      traces.push({
        points,
        lengths,
        total: lengths[lengths.length - 1],
        pad: end,
        stubFrom: rotate({ x: pinX, y: 130 }, side),
        stubTo: rotate({ x: pinX, y: 122 }, side),
        label: LABELS[index],
        labelDir: { x: (end.x - prev.x) / norm, y: (end.y - prev.y) / norm },
        tone: index % 3 === 0 ? 1 : 0,
        pulseAt: -1,
        reverse: false,
        nextFire: 0.3 + ((index * 0.37) % 2.4),
        flash: 0,
        pinFlash: 0,
      });
    }
  }
  return traces;
}

function pointAt(trace: Trace, distance: number): Point {
  const d = Math.min(Math.max(distance, 0), trace.total);
  for (let k = 1; k < trace.points.length; k += 1) {
    if (d <= trace.lengths[k]) {
      const span = trace.lengths[k] - trace.lengths[k - 1] || 1;
      const f = (d - trace.lengths[k - 1]) / span;
      const a = trace.points[k - 1];
      const b = trace.points[k];
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    }
  }
  return trace.points[trace.points.length - 1];
}

function tokenColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export function CircuitBoard({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const traces = buildTraces();
    let width = 0;
    let height = 0;
    let scale = 1;
    let frame = 0;
    let running = false;
    let visible = true;
    let lastNow = performance.now();
    let clock = 0;
    let coreGlow = 0;
    let colors = { accent: "", accent2: "", ink: "", surface: "" };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    function readColors() {
      colors = {
        accent: tokenColor("--color-accent", "249 115 22"),
        accent2: tokenColor("--color-accent2", "251 191 36"),
        ink: tokenColor("--color-content", "148 163 184"),
        surface: tokenColor("--color-surface", "17 20 26"),
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
      scale = Math.min(width, height) / SIZE;
    }

    function alpha(color: string, a: number): string {
      return `rgb(${color} / ${a})`;
    }

    function update(dt: number) {
      clock += dt;
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 4);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 4);
      coreGlow = Math.max(0, coreGlow - dt * 1.4);

      for (const trace of traces) {
        trace.flash = Math.max(0, trace.flash - dt * 2.2);
        trace.pinFlash = Math.max(0, trace.pinFlash - dt * 2.6);

        if (trace.pulseAt >= 0) {
          trace.pulseAt += PULSE_SPEED * dt;
          if (trace.pulseAt >= trace.total + TAIL * 0.4) {
            if (trace.reverse) {
              coreGlow = Math.min(1, coreGlow + 0.35);
              trace.pinFlash = 1;
            } else {
              trace.flash = 1;
            }
            trace.pulseAt = -1;
            trace.nextFire = clock + 0.6 + Math.random() * 3.2;
          }
        } else if (clock >= trace.nextFire) {
          trace.reverse = Math.random() < 0.45;
          trace.pulseAt = 0;
          if (!trace.reverse) {
            trace.pinFlash = 1;
            coreGlow = Math.min(1, coreGlow + 0.15);
          }
        }
      }
    }

    function drawBackdrop() {
      const radius = SIZE * 0.55;
      const g = ctx.createRadialGradient(CENTER, CENTER, 10, CENTER, CENTER, radius);
      g.addColorStop(0, alpha(colors.accent, 0.16 + coreGlow * 0.14));
      g.addColorStop(1, alpha(colors.accent, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // Faint concentric guide rings, like a board outline.
      ctx.lineWidth = 1;
      ctx.strokeStyle = alpha(colors.ink, 0.06);
      for (const r of [96, 150, 196]) {
        ctx.beginPath();
        ctx.arc(CENTER, CENTER, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawTraces() {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (const trace of traces) {
        const base = trace.tone === 1 ? colors.accent2 : colors.accent;
        // Base copper trace.
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = alpha(colors.ink, 0.17 + trace.flash * 0.2);
        ctx.beginPath();
        trace.points.forEach((p, k) =>
          k === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
        );
        ctx.stroke();

        // Pad (via ring) at the far end.
        const pad = trace.pad;
        ctx.fillStyle = alpha(colors.surface, 1);
        ctx.strokeStyle = alpha(base, 0.45 + trace.flash * 0.55);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(pad.x, pad.y, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (trace.flash > 0.02) {
          ctx.save();
          ctx.shadowColor = alpha(base, 1);
          ctx.shadowBlur = 14 * trace.flash;
          ctx.fillStyle = alpha(base, trace.flash);
          ctx.beginPath();
          ctx.arc(pad.x, pad.y, 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Label.
        if (scale >= 0.72) {
          ctx.font = "7.5px ui-monospace, SFMono-Regular, Menlo, monospace";
          ctx.fillStyle = alpha(
            trace.flash > 0.1 ? base : colors.ink,
            trace.flash > 0.1 ? 0.4 + trace.flash * 0.6 : 0.42,
          );
          const gap = 9;
          const lx = pad.x + trace.labelDir.x * gap;
          const ly = pad.y + trace.labelDir.y * gap;
          ctx.textAlign =
            Math.abs(trace.labelDir.x) > 0.5
              ? trace.labelDir.x > 0
                ? "left"
                : "right"
              : "center";
          ctx.textBaseline =
            Math.abs(trace.labelDir.y) > 0.5
              ? trace.labelDir.y > 0
                ? "top"
                : "bottom"
              : "middle";
          ctx.fillText(trace.label, lx, ly);
        }
      }
    }

    function drawPulses() {
      for (const trace of traces) {
        if (trace.pulseAt < 0) continue;
        const base = trace.tone === 1 ? colors.accent2 : colors.accent;
        const head = trace.reverse
          ? trace.total - trace.pulseAt
          : trace.pulseAt;
        const dir = trace.reverse ? 1 : -1; // tail sits behind the head
        const steps = 14;

        ctx.lineWidth = 2.6;
        ctx.lineCap = "round";
        for (let k = 0; k < steps; k += 1) {
          const d0 = head + dir * (k / steps) * TAIL;
          const d1 = head + dir * ((k + 1) / steps) * TAIL;
          if (
            (d0 < 0 && d1 < 0) ||
            (d0 > trace.total && d1 > trace.total)
          )
            continue;
          const a = pointAt(trace, d0);
          const b = pointAt(trace, d1);
          ctx.strokeStyle = alpha(base, Math.pow(1 - k / steps, 1.6) * 0.95);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        if (head >= 0 && head <= trace.total) {
          const h = pointAt(trace, head);
          ctx.save();
          ctx.shadowColor = alpha(base, 1);
          ctx.shadowBlur = 14;
          ctx.fillStyle = alpha(base, 1);
          ctx.beginPath();
          ctx.arc(h.x, h.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    function drawChip(now: number) {
      const left = 130;
      const top = 130;
      const size = 140;

      // Pin stubs.
      for (const trace of traces) {
        const lit = trace.pinFlash;
        ctx.lineWidth = 4;
        ctx.lineCap = "butt";
        ctx.strokeStyle = alpha(
          lit > 0.05 ? colors.accent : colors.ink,
          lit > 0.05 ? 0.4 + lit * 0.6 : 0.4,
        );
        ctx.beginPath();
        ctx.moveTo(trace.stubFrom.x, trace.stubFrom.y);
        ctx.lineTo(trace.stubTo.x, trace.stubTo.y);
        ctx.stroke();
      }

      // Package body with an animated glow.
      const pulse = 0.5 + 0.5 * Math.sin(now / 700);
      ctx.save();
      ctx.shadowColor = alpha(colors.accent, 0.55 + coreGlow * 0.4);
      ctx.shadowBlur = 22 + pulse * 8 + coreGlow * 16;
      ctx.fillStyle = alpha(colors.surface, 1);
      ctx.strokeStyle = alpha(colors.accent, 0.8);
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(left, top, size, size, 12);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Die.
      ctx.lineWidth = 1;
      ctx.strokeStyle = alpha(colors.ink, 0.22);
      ctx.beginPath();
      ctx.roundRect(left + 24, top + 24, size - 48, size - 48, 6);
      ctx.stroke();

      // Core glow.
      const core = ctx.createRadialGradient(CENTER, CENTER, 2, CENTER, CENTER, 44);
      core.addColorStop(0, alpha(colors.accent, 0.35 + coreGlow * 0.4 + pulse * 0.1));
      core.addColorStop(1, alpha(colors.accent, 0));
      ctx.fillStyle = core;
      ctx.fillRect(left + 20, top + 20, size - 40, size - 40);

      // Pin-1 marker.
      ctx.fillStyle = alpha(colors.accent, 0.9);
      ctx.beginPath();
      ctx.arc(left + 11, top + 11, 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Text.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "700 17px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = alpha(colors.accent, 1);
      ctx.fillText("PX-1", CENTER, CENTER - 4);
      ctx.font = "6.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = alpha(colors.ink, 0.55);
      ctx.fillText("32-BIT · 3V3", CENTER, CENTER + 12);
    }

    function render(now: number) {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate((width - SIZE * scale) / 2, (height - SIZE * scale) / 2);
      ctx.scale(scale, scale);

      drawBackdrop();

      ctx.save();
      ctx.translate(pointer.x * 4, pointer.y * 4);
      drawTraces();
      drawPulses();
      ctx.restore();

      ctx.save();
      ctx.translate(pointer.x * 9, pointer.y * 9);
      drawChip(now);
      ctx.restore();

      ctx.restore();
    }

    function loop(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      update(dt);
      render(now);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      lastNow = performance.now();
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointer.tx = Math.max(-1.5, Math.min(1.5, pointer.tx));
      pointer.ty = Math.max(-1.5, Math.min(1.5, pointer.ty));
    }

    readColors();
    resize();
    // Seed a few pulses mid-flight so the first (or only, for reduced-motion)
    // frame already looks alive.
    traces.forEach((trace, index) => {
      if (index % 4 === 1) {
        trace.pulseAt = trace.total * (0.25 + ((index * 0.13) % 0.6));
        trace.reverse = index % 8 === 5;
      }
    });
    coreGlow = 0.4;
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

    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

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
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Decorative animated circuit board with a microcontroller and data pulses"
    />
  );
}
