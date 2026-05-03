"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

const BADGES: ReactNode[] = [
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="b1">
      <path
        d="M12 2 L14.4 8.4 L21 9 L16.2 13.2 L17.6 20 L12 16.8 L6.4 20 L7.8 13.2 L3 9 L9.6 8.4 Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="b2">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
      <path d="M9 12 L11 14 L15 10" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="b3">
      <rect x="3" y="3" width="8" height="8" stroke="white" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" stroke="white" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" stroke="white" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="b4">
      <polygon points="12,2 22,20 2,20" stroke="white" strokeWidth="1.5" fill="none" />
      <line x1="12" y1="9" x2="12" y2="14" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="1" fill="white" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="b5">
      <path
        d="M3 12 C3 7.03 7.03 3 12 3 C16.97 3 21 7.03 21 12"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M3 12 C3 16.97 7.03 21 12 21 C16.97 21 21 16.97 21 12"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <path
        d="M12 3 C12 3 9 7 9 12 C9 17 12 21 12 21"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M12 3 C12 3 15 7 15 12 C15 17 12 21 12 21"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" key="b6">
      <path
        d="M12 3 L4 7 L4 17 L12 21 L20 17 L20 7 Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 3 L12 21M4 7 L20 17M20 7 L4 17"
        stroke="white"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  ),
];

const DELAYS: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4, 5, 6];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  // Light tilt on cert badges
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!fineHover) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLDivElement>(".cert-card")
    );
    const handlers = cards.map((card) => {
      const badge = card.querySelector<HTMLElement>(".cert-badge");
      let rect: DOMRect | null = null;
      let raf = 0;
      let scheduled = false;
      let dx = 0;
      let dy = 0;
      const apply = () => {
        scheduled = false;
        if (badge) {
          badge.style.transform = `perspective(600px) rotateY(${dx * 14}deg) rotateX(${
            -dy * 14
          }deg)`;
        }
      };
      const onMove = (e: MouseEvent) => {
        if (!rect) rect = card.getBoundingClientRect();
        dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        if (!scheduled) {
          scheduled = true;
          raf = requestAnimationFrame(apply);
        }
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        rect = null;
        if (badge) {
          badge.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
          badge.style.transform =
            "perspective(600px) rotateY(0deg) rotateX(0deg)";
        }
      };
      const onEnter = () => {
        rect = card.getBoundingClientRect();
        if (badge) {
          badge.style.transition = "transform 0.1s ease";
        }
      };
      card.addEventListener("mousemove", onMove, { passive: true });
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("mouseenter", onEnter);
      return { card, onMove, onLeave, onEnter };
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave, onEnter }) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        card.removeEventListener("mouseenter", onEnter);
      });
    };
  }, []);

  return (
    <section id="certifications" ref={sectionRef}>
      <Reveal>
        <div className="section-label">{t.certifications.label}</div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="section-title">
          {t.certifications.title_1} <em>{t.certifications.title_em}</em>
        </h2>
      </Reveal>
      <div className="cert-grid">
        {t.certifications.items.map((c, i) => (
          <Reveal key={c.name} delay={DELAYS[i]} className="cert-card">
            <div className="cert-badge">{BADGES[i]}</div>
            <h3 className="cert-name">{c.name}</h3>
            <div className="cert-issuer">{c.issuer}</div>
            <div className="cert-year">{c.year}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
