import { useEffect, useRef } from "react";

/**
 * A rotating 3D hologram of a microcontroller, drawn on a canvas with a small
 * hand-written 3D projection (no libraries).
 *
 *  - the chip slowly turns, its label turns with it, and a scan-line sweeps
 *    across the die
 *  - two tilted orbit rings carry glowing electrons with comet trails
 *  - protocol tags (I2C, SPI, UART...) float around on a third ring
 *  - sparks rise from a floor grid, and shock-wave rings expand from under
 *    the chip
 *  - the pointer tilts the whole scene a little
 *
 * It keeps moving even with reduced-motion on (slower, no pointer tilt) because
 * the motion is the whole point of this element; it pauses when off-screen or
 * when the tab is hidden.
 */

type V3 = [number, number, number];

const D = 560; // camera distance
const FOV = 560;
const HX = 62; // chip half-size (x / z)
const HY = 9; // chip half-thickness
const FLOOR = -78;
const PINS = 10;
const TAGS = ["I2C", "SPI", "UART", "PWM", "ADC", "GPIO", "CAN", "USB"];
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function rotX(p: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}
function rotY(p: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}

function tokenColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

interface Spark {
  angle: number;
  radius: number;
  speed: number;
  phase: number;
  tone: 0 | 1;
}

export function HoloChip({ className }: { className?: string }) {
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
    const speed = reduceMotion ? 0.55 : 1;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let k = 1; // world -> pixel scale
    let frame = 0;
    let running = false;
    let visible = true;
    let lastNow = performance.now();
    let t = 2.5;
    let colors = { accent: "", accent2: "", ink: "", surface: "" };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const cam = { yaw: 0, pitch: -0.42 };
    const pinFlash = new Array<number>(PINS * 4).fill(0);

    const sparks: Spark[] = Array.from({ length: 46 }, (_, i) => ({
      angle: (i * 2.399) % (Math.PI * 2),
      radius: 38 + ((i * 53) % 130),
      speed: 18 + ((i * 7) % 26),
      phase: (i * 0.173) % 1,
      tone: i % 4 === 0 ? 1 : 0,
    }));

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
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      k = Math.min(width, height) / 470;
    }

    const rgb = (c: string, a: number) => `rgb(${c} / ${Math.max(0, Math.min(1, a))})`;

    /** World point -> screen. depth > 0 is farther than the chip centre. */
    function proj(p: V3) {
      const v = rotX(rotY(p, cam.yaw), cam.pitch);
      const f = FOV / (v[2] + D);
      return {
        x: width / 2 + v[0] * f * k,
        y: height * 0.52 - v[1] * f * k,
        z: v[2],
        f,
      };
    }

    function view(p: V3): V3 {
      return rotX(rotY(p, cam.yaw), cam.pitch);
    }

    // ---- scene pieces -----------------------------------------------------

    function drawFloor(time: number) {
      // Glow pool under the chip.
      const c = proj([0, FLOOR, 0]);
      const g = ctx.createRadialGradient(c.x, c.y, 4, c.x, c.y, 200 * k);
      g.addColorStop(0, rgb(colors.accent, 0.28));
      g.addColorStop(1, rgb(colors.accent, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Grid.
      ctx.lineWidth = 1;
      const ext = 200;
      for (let i = -5; i <= 5; i += 1) {
        const o = i * 40;
        const fade = Math.max(0, 1 - Math.abs(o) / (ext + 10));
        ctx.strokeStyle = rgb(colors.accent, 0.03 + fade * 0.22);
        let a = proj([o, FLOOR, -ext]);
        let b = proj([o, FLOOR, ext]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        a = proj([-ext, FLOOR, o]);
        b = proj([ext, FLOOR, o]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Shock-wave rings.
      for (let w = 0; w < 3; w += 1) {
        const phase = ((time * 0.42 + w / 3) % 1 + 1) % 1;
        const radius = 30 + phase * 190;
        ctx.lineWidth = 2;
        ctx.strokeStyle = rgb(colors.accent, (1 - phase) * 0.55);
        ctx.beginPath();
        for (let s = 0; s <= 72; s += 1) {
          const a = (s / 72) * Math.PI * 2;
          const p = proj([Math.cos(a) * radius, FLOOR, Math.sin(a) * radius]);
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    }

    /** Draws a (tilted, spinning) ring; `pass` picks the half behind/in front of the chip. */
    function ringPoint(radius: number, tilt: number, spin: number, theta: number): V3 {
      const base: V3 = [Math.cos(theta) * radius, 0, Math.sin(theta) * radius];
      return rotY(rotX(base, tilt), spin);
    }

    function drawRing(
      radius: number,
      tilt: number,
      spin: number,
      color: string,
      pass: "back" | "front",
    ) {
      const steps = 96;
      ctx.lineWidth = 1.3;
      let prev = proj(ringPoint(radius, tilt, spin, 0));
      for (let s = 1; s <= steps; s += 1) {
        const p = proj(ringPoint(radius, tilt, spin, (s / steps) * Math.PI * 2));
        const mid = (p.z + prev.z) / 2;
        const isBack = mid > 0;
        if ((pass === "back") === isBack) {
          ctx.strokeStyle = rgb(color, isBack ? 0.14 : 0.42);
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        prev = p;
      }
    }

    function drawElectron(
      radius: number,
      tilt: number,
      spin: number,
      theta: number,
      color: string,
      pass: "back" | "front",
    ) {
      const head = proj(ringPoint(radius, tilt, spin, theta));
      const isBack = head.z > 0;
      if ((pass === "back") !== isBack) return;
      // Comet trail.
      const trail = 22;
      ctx.lineCap = "round";
      let prev = head;
      for (let i = 1; i <= trail; i += 1) {
        const p = proj(ringPoint(radius, tilt, spin, theta - i * 0.045));
        ctx.lineWidth = Math.max(0.6, 3.6 * (1 - i / trail) * head.f);
        ctx.strokeStyle = rgb(color, (1 - i / trail) * (isBack ? 0.45 : 0.9));
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        prev = p;
      }
      ctx.save();
      ctx.shadowColor = rgb(color, 1);
      ctx.shadowBlur = 16;
      ctx.fillStyle = rgb(color, isBack ? 0.7 : 1);
      ctx.beginPath();
      ctx.arc(head.x, head.y, 4 * head.f * k * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawTags(time: number, pass: "back" | "front") {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < TAGS.length; i += 1) {
        const theta = time * 0.28 + (i / TAGS.length) * Math.PI * 2;
        const p3 = ringPoint(172, 1.1 + 0.12 * Math.sin(time * 0.4), time * 0.12, theta);
        const p = proj(p3);
        const isBack = p.z > 0;
        if ((pass === "back") !== isBack) continue;
        const size = Math.max(7, 10.5 * p.f * k * 1.5);
        ctx.font = `600 ${size}px ${MONO}`;
        const a = isBack ? 0.32 : 0.95;
        const w = ctx.measureText(TAGS[i]).width + 10 * p.f;
        ctx.fillStyle = rgb(colors.surface, 0.8 * (isBack ? 0.5 : 1));
        ctx.strokeStyle = rgb(colors.accent, a * 0.6);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(p.x - w / 2, p.y - size * 0.8, w, size * 1.6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = rgb(i % 3 === 0 ? colors.accent2 : colors.accent, a);
        ctx.fillText(TAGS[i], p.x, p.y + 0.5);
      }
    }

    function drawSparks(time: number, pass: "back" | "front") {
      for (const s of sparks) {
        const life = (((time * s.speed) / 150 + s.phase) % 1 + 1) % 1;
        const y = FLOOR + life * 190;
        const a = s.angle + time * 0.15;
        const p = proj([Math.cos(a) * s.radius, y, Math.sin(a) * s.radius]);
        const isBack = p.z > 0;
        if ((pass === "back") !== isBack) continue;
        const fade = Math.sin(life * Math.PI);
        const color = s.tone === 1 ? colors.accent2 : colors.accent;
        ctx.fillStyle = rgb(color, fade * (isBack ? 0.45 : 0.95));
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.9, 1.9 * p.f * k * 1.4), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawPins(chipYaw: number, pass: "back" | "front") {
      ctx.lineCap = "butt";
      for (let side = 0; side < 4; side += 1) {
        for (let i = 0; i < PINS; i += 1) {
          const along = -52 + i * (104 / (PINS - 1));
          const sign = side % 2 === 0 ? 1 : -1;
          const a: V3 = side < 2 ? [sign * HX, 0, along] : [along, 0, sign * HX];
          const b: V3 =
            side < 2 ? [sign * (HX + 15), 0, along] : [along, 0, sign * (HX + 15)];
          const pa = proj(rotY(a, chipYaw));
          const pb = proj(rotY(b, chipYaw));
          const isBack = (pa.z + pb.z) / 2 > 0;
          if ((pass === "back") !== isBack) continue;
          const lit = pinFlash[side * PINS + i];
          ctx.lineWidth = Math.max(1.4, 4 * pa.f * k * 1.4);
          ctx.strokeStyle = lit > 0.05
            ? rgb(colors.accent, 0.5 + lit * 0.5)
            : rgb(colors.ink, isBack ? 0.22 : 0.5);
          if (lit > 0.3) {
            ctx.save();
            ctx.shadowColor = rgb(colors.accent, 1);
            ctx.shadowBlur = 12 * lit;
          }
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
          if (lit > 0.3) ctx.restore();
        }
      }
    }

    function drawChip(time: number, chipYaw: number) {
      const corners = (axis: "x" | "y" | "z", sign: number): V3[] => {
        if (axis === "y") {
          const y = sign * HY;
          return [[-HX, y, -HX], [HX, y, -HX], [HX, y, HX], [-HX, y, HX]];
        }
        if (axis === "x") {
          const x = sign * HX;
          return [[x, -HY, -HX], [x, -HY, HX], [x, HY, HX], [x, HY, -HX]];
        }
        const z = sign * HX;
        return [[-HX, -HY, z], [HX, -HY, z], [HX, HY, z], [-HX, HY, z]];
      };
      const faces: { n: V3; pts: V3[] }[] = [
        { n: [0, 1, 0], pts: corners("y", 1) },
        { n: [1, 0, 0], pts: corners("x", 1) },
        { n: [-1, 0, 0], pts: corners("x", -1) },
        { n: [0, 0, 1], pts: corners("z", 1) },
        { n: [0, 0, -1], pts: corners("z", -1) },
      ];

      const visibleFaces = faces
        .map((face) => {
          const n = view(rotY(face.n, chipYaw));
          const centre = face.pts
            .reduce<V3>((acc, p) => [acc[0] + p[0] / 4, acc[1] + p[1] / 4, acc[2] + p[2] / 4], [0, 0, 0]);
          const cv = view(rotY(centre, chipYaw));
          const toFace: V3 = [cv[0], cv[1], cv[2] + D];
          const facing = n[0] * toFace[0] + n[1] * toFace[1] + n[2] * toFace[2] < 0;
          return { face, facing, depth: cv[2] };
        })
        .filter((f) => f.facing)
        .sort((a, b) => b.depth - a.depth);

      const pulse = 0.5 + 0.5 * Math.sin(time * 2.2);

      for (const { face } of visibleFaces) {
        const pts = face.pts.map((p) => proj(rotY(p, chipYaw)));
        const isTop = face.n[1] === 1;
        ctx.save();
        ctx.shadowColor = rgb(colors.accent, 0.7);
        ctx.shadowBlur = isTop ? 26 + pulse * 12 : 10;
        ctx.fillStyle = rgb(colors.surface, isTop ? 0.97 : 0.93);
        ctx.strokeStyle = rgb(colors.accent, 0.95);
        ctx.lineWidth = isTop ? 2 : 1.4;
        ctx.beginPath();
        pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        if (!isTop) continue;

        // Draw in the top face's own coordinate system so the artwork turns
        // with the chip. u = +x, v = toward the viewer (so text is upright).
        const o = proj(rotY([0, HY, 0], chipYaw));
        const pu = proj(rotY([10, HY, 0], chipYaw));
        const pv = proj(rotY([0, HY, -10], chipYaw));
        ctx.save();
        ctx.setTransform(
          dpr * ((pu.x - o.x) / 10),
          dpr * ((pu.y - o.y) / 10),
          dpr * ((pv.x - o.x) / 10),
          dpr * ((pv.y - o.y) / 10),
          dpr * o.x,
          dpr * o.y,
        );

        // Core glow.
        const core = ctx.createRadialGradient(0, 0, 2, 0, 0, 52);
        core.addColorStop(0, rgb(colors.accent, 0.5 + pulse * 0.25));
        core.addColorStop(1, rgb(colors.accent, 0));
        ctx.fillStyle = core;
        ctx.fillRect(-HX, -HX, HX * 2, HX * 2);

        // Die outline and tiny circuitry.
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = rgb(colors.ink, 0.3);
        ctx.strokeRect(-34, -34, 68, 68);
        ctx.strokeStyle = rgb(colors.accent, 0.35);
        ctx.beginPath();
        for (let i = -3; i <= 3; i += 1) {
          ctx.moveTo(-34, i * 9);
          ctx.lineTo(-44, i * 9);
          ctx.moveTo(34, i * 9);
          ctx.lineTo(44, i * 9);
          ctx.moveTo(i * 9, -34);
          ctx.lineTo(i * 9, -44);
          ctx.moveTo(i * 9, 34);
          ctx.lineTo(i * 9, 44);
        }
        ctx.stroke();

        // Pin-1 dot.
        ctx.fillStyle = rgb(colors.accent, 1);
        ctx.beginPath();
        ctx.arc(-HX + 8, -HX + 8, 2.6, 0, Math.PI * 2);
        ctx.fill();

        // Scan-line sweeping across the die.
        ctx.save();
        ctx.beginPath();
        ctx.rect(-HX, -HX, HX * 2, HX * 2);
        ctx.clip();
        const sweep = (((time * 0.55) % 1) + 1) % 1;
        const sx = -HX - 20 + sweep * (HX * 2 + 40);
        const sg = ctx.createLinearGradient(sx - 22, 0, sx + 22, 0);
        sg.addColorStop(0, rgb(colors.accent2, 0));
        sg.addColorStop(0.5, rgb(colors.accent2, 0.55));
        sg.addColorStop(1, rgb(colors.accent2, 0));
        ctx.fillStyle = sg;
        ctx.fillRect(sx - 22, -HX, 44, HX * 2);
        ctx.restore();

        // Label.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `800 19px ${MONO}`;
        ctx.fillStyle = rgb(colors.accent, 1);
        ctx.shadowColor = rgb(colors.accent, 0.9);
        ctx.shadowBlur = 8;
        ctx.fillText("PX-1", 0, -3);
        ctx.shadowBlur = 0;
        ctx.font = `7px ${MONO}`;
        ctx.fillStyle = rgb(colors.ink, 0.65);
        ctx.fillText("32-BIT · 3V3", 0, 13);
        ctx.restore();
      }
    }

    // ---- frame ------------------------------------------------------------

    function render() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      cam.yaw = pointer.x * 0.35;
      cam.pitch = -0.42 + pointer.y * 0.12 + Math.sin(t * 0.5) * 0.035;
      const chipYaw = t * 0.5;

      drawFloor(t);

      // Everything farther than the chip first...
      drawRing(112, 1.0, t * 0.35, colors.accent, "back");
      drawRing(146, -0.85, -t * 0.28, colors.accent2, "back");
      drawSparks(t, "back");
      drawTags(t, "back");
      drawElectron(112, 1.0, t * 0.35, t * 1.5, colors.accent, "back");
      drawElectron(112, 1.0, t * 0.35, t * 1.5 + Math.PI, colors.accent, "back");
      drawElectron(146, -0.85, -t * 0.28, -t * 1.1, colors.accent2, "back");
      drawElectron(146, -0.85, -t * 0.28, -t * 1.1 + 2.1, colors.accent2, "back");
      drawElectron(146, -0.85, -t * 0.28, -t * 1.1 + 4.2, colors.accent2, "back");
      drawPins(chipYaw, "back");

      drawChip(t, chipYaw);

      // ...then everything nearer.
      drawPins(chipYaw, "front");
      drawRing(112, 1.0, t * 0.35, colors.accent, "front");
      drawRing(146, -0.85, -t * 0.28, colors.accent2, "front");
      drawElectron(112, 1.0, t * 0.35, t * 1.5, colors.accent, "front");
      drawElectron(112, 1.0, t * 0.35, t * 1.5 + Math.PI, colors.accent, "front");
      drawElectron(146, -0.85, -t * 0.28, -t * 1.1, colors.accent2, "front");
      drawElectron(146, -0.85, -t * 0.28, -t * 1.1 + 2.1, colors.accent2, "front");
      drawElectron(146, -0.85, -t * 0.28, -t * 1.1 + 4.2, colors.accent2, "front");
      drawSparks(t, "front");
      drawTags(t, "front");
    }

    function loop(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - lastNow) / 1000) * speed;
      lastNow = now;
      t += dt;
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 5);
      for (let i = 0; i < pinFlash.length; i += 1) {
        pinFlash[i] = Math.max(0, pinFlash[i] - dt * 2.4);
      }
      if (Math.random() < dt * 9) {
        pinFlash[Math.floor(Math.random() * pinFlash.length)] = 1;
      }
      render();
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || !visible || document.hidden) return;
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
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointer.tx = Math.max(-1.2, Math.min(1.2, x));
      pointer.ty = Math.max(-1.2, Math.min(1.2, y));
    }

    readColors();
    resize();
    render();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) render();
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
      if (!running) render();
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
      aria-label="Decorative rotating 3D microchip with orbiting data electrons"
    />
  );
}
