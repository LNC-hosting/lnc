"use client";

import { useRef, useEffect } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(true);
  const idleTimerRef = useRef<number | null>(null);
  const starsRef = useRef<
    Array<{ x: number; y: number; z: number; color: string }>
  >([]);
  const currentSpeedRef = useRef(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    mouseRef.current = { x: width / 2, y: height / 2 };

    const NUM_STARS = 1000;
    const TARGET_SPEED = prefersReducedMotion ? 0 : 2;
    currentSpeedRef.current = TARGET_SPEED;

    if (starsRef.current.length === 0) {
      for (let i = 0; i < NUM_STARS; i++) {
        const isPurple = i % 12 === 0;
        starsRef.current.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
          color: isPurple
            ? `rgba(188, 19, 254, ${Math.random() * 1})`
            : `rgba(254, 254, 254, ${Math.random() * 0.3})`,
        });
      }
    }

    const stars = starsRef.current;
    isActiveRef.current = !prefersReducedMotion;
    const IDLE_TIMEOUT = 10000;

    const clearIdle = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const markActive = () => {
      clearIdle();
      isActiveRef.current = true;
      idleTimerRef.current = window.setTimeout(() => {
        isActiveRef.current = false;
      }, IDLE_TIMEOUT) as unknown as number;
    };

    markActive();

    const draw = () => {
      const target = isActiveRef.current ? TARGET_SPEED : 0;
      currentSpeedRef.current += (target - currentSpeedRef.current) * 0.12;

      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // const dxCenter = mx - cx;
      // const dyCenter = my - cy;
      // const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
      // const maxDist = Math.sqrt(cx * cx + cy * cy);
      // const t = Math.min(distCenter / maxDist, 1);

      const repulsionStrength = 3;
      const repulsionRadius = 100;

      const moving = Math.abs(currentSpeedRef.current) > 0.001;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (moving) {
          star.z -= currentSpeedRef.current;
          if (star.z <= 0) {
            star.x = Math.random() * width - width / 2;
            star.y = Math.random() * height - height / 2;
            star.z = width;
          }
        }

        const k = 128 / Math.max(star.z, 0.0001);
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (moving) {
          const dx = px - mx;
          const dy = py - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < repulsionRadius * repulsionRadius) {
            const dist = Math.sqrt(distSq);
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - dist) / repulsionRadius;
            const power = repulsionStrength * force;

            star.x += Math.cos(angle) * power * (star.z / 100);
            star.y += Math.sin(angle) * power * (star.z / 100);
          }
        }

        const size = (1 - star.z / width) * 1.8;

        if (
          px >= -10 &&
          px <= width + 10 &&
          py >= -10 &&
          py <= height + 10 &&
          size > 0
        ) {
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let frameId: number;
    const tick = () => {
      draw();
      frameId = requestAnimationFrame(tick);
    };

    tick();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      markActive();
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches?.[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      markActive();
    };

    const handleScroll = () => markActive();

    const handleVisibilityChange = () => {
      if (document.hidden) isActiveRef.current = false;
      else markActive();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full block z-0" />
  );
}
