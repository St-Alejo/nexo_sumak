"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    let rafScheduled = false;
    let primed = false;

    const animate = () => {
      rafScheduled = false;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      const dist = Math.hypot(mouseX - ringX, mouseY - ringY);
      if (dist > 0.5) {
        raf = requestAnimationFrame(animate);
        rafScheduled = true;
      }
    };

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!primed) {
        primed = true;
        ringX = mouseX;
        ringY = mouseY;
        cursor.style.opacity = "1";
        ring.style.opacity = "1";
      }
      if (!rafScheduled) {
        rafScheduled = true;
        raf = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("mousemove", handleMove, { passive: true });

    const hoverSelector =
      "a, button, .service-card, .project-card, .cert-card, .tech-pill, .nav-cta";
    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");
    const targets = document.querySelectorAll<HTMLElement>(hoverSelector);
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        aria-hidden
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden
        style={{ opacity: 0 }}
      />
    </>
  );
}
