"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "./LanguageProvider";
import PreviewModal from "./PreviewModal";
import LivePreviewThumb from "./LivePreviewThumb";

const FALLBACK_VISUALS: { cls: string; svg: ReactNode }[] = [
  {
    cls: "pv-1",
    svg: (
      <svg width="220" height="130" viewBox="0 0 220 130" fill="none">
        <rect
          x="14"
          y="14"
          width="192"
          height="102"
          rx="6"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.025)"
        />
        <rect x="14" y="14" width="192" height="14" rx="6" fill="rgba(255,255,255,0.04)" />
        <circle cx="22" cy="21" r="1.6" fill="rgba(255,255,255,0.35)" />
        <circle cx="28" cy="21" r="1.6" fill="rgba(255,255,255,0.22)" />
        <circle cx="34" cy="21" r="1.6" fill="rgba(255,255,255,0.18)" />
        <rect x="44" y="18" width="120" height="6" rx="2" fill="rgba(255,255,255,0.07)" />
      </svg>
    ),
  },
  { cls: "pv-2", svg: null },
  {
    cls: "pv-3",
    svg: (
      <svg width="110" height="100" viewBox="0 0 110 100" fill="none">
        <rect
          x="10"
          y="30"
          width="90"
          height="55"
          rx="3"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.02)"
        />
        <rect
          x="10"
          y="15"
          width="40"
          height="20"
          rx="2"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.02)"
        />
        <path d="M55 25 L55 30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="22" y="42" width="20" height="16" rx="1" fill="rgba(255,255,255,0.08)" />
        <rect x="50" y="42" width="20" height="16" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="78" y="42" width="14" height="16" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="22" y="65" width="66" height="8" rx="1" fill="rgba(255,255,255,0.04)" />
      </svg>
    ),
  },
  {
    cls: "pv-4",
    svg: (
      <svg width="110" height="100" viewBox="0 0 110 100" fill="none">
        <path
          d="M20 70 L20 40 L40 55 L60 25 L80 45 L100 30"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M20 70 L20 40 L40 55 L60 25 L80 45 L100 30 L100 70 Z"
          fill="rgba(255,255,255,0.04)"
        />
        <circle cx="20" cy="40" r="3" fill="rgba(255,255,255,0.4)" />
        <circle cx="40" cy="55" r="3" fill="rgba(255,255,255,0.4)" />
        <circle cx="60" cy="25" r="3" fill="rgba(255,255,255,0.4)" />
        <circle cx="80" cy="45" r="3" fill="rgba(255,255,255,0.4)" />
        <circle cx="100" cy="30" r="3" fill="rgba(255,255,255,0.4)" />
      </svg>
    ),
  },
  {
    cls: "pv-5",
    svg: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect
          x="20"
          y="20"
          width="60"
          height="60"
          rx="4"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.02)"
        />
        <path d="M35 50 L45 60 L65 40" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <rect x="30" y="30" width="18" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="52" y="30" width="18" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="30" y="64" width="40" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
      </svg>
    ),
  },
];

const TAGS = [
  ["IA", "Next.js", "OCR", "Claude AI", "INVIMA"],
  ["IA", "Power BI", "XGBoost", "DANE", "IDEAM"],
  ["Integrations", "REST", "GraphQL"],
  ["ML", "TensorFlow", "AWS"],
  ["Licensing", "Stripe", "Go"],
];

const URLS: (string | null)[] = [
  "https://solumed.vercel.app/info",
  "https://agro-h2.vercel.app/",
  null,
  null,
  null,
];

const DELAYS: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 2, 3];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(
    null
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const cards = Array.from(
      section.querySelectorAll<HTMLDivElement>("[data-tilt]")
    );

    type H = {
      card: HTMLDivElement;
      onMove?: (e: MouseEvent) => void;
      onLeave?: () => void;
      onEnter?: () => void;
    };
    const handlers: H[] = [];

    if (fineHover) {
      cards.forEach((card) => {
        let rect: DOMRect | null = null;
        let raf = 0;
        let pendingX = 0;
        let pendingY = 0;
        let scheduled = false;

        const applyTilt = () => {
          scheduled = false;
          if (!rect) return;
          const dx = pendingX / (rect.width / 2);
          const dy = pendingY / (rect.height / 2);
          card.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${
            -dy * 4
          }deg) translateZ(6px)`;
        };

        const onMove = (e: MouseEvent) => {
          if (!rect) rect = card.getBoundingClientRect();
          pendingX = e.clientX - (rect.left + rect.width / 2);
          pendingY = e.clientY - (rect.top + rect.height / 2);
          if (!scheduled) {
            scheduled = true;
            raf = requestAnimationFrame(applyTilt);
          }
        };
        const onLeave = () => {
          cancelAnimationFrame(raf);
          rect = null;
          card.style.transform =
            "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
          card.style.transition =
            "transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease";
        };
        const onEnter = () => {
          rect = card.getBoundingClientRect();
          card.style.transition = "transform 0.1s ease, border-color 0.4s ease";
        };
        card.addEventListener("mousemove", onMove, { passive: true });
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("mouseenter", onEnter);
        handlers.push({ card, onMove, onLeave, onEnter });
      });
    }

    const reveals = section.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      handlers.forEach(({ card, onMove, onLeave, onEnter }) => {
        if (onMove) card.removeEventListener("mousemove", onMove);
        if (onLeave) card.removeEventListener("mouseleave", onLeave);
        if (onEnter) card.removeEventListener("mouseenter", onEnter);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <section id="portfolio" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">{t.portfolio.label}</div>
      </div>
      <div className="reveal reveal-delay-1">
        <h2 className="section-title">
          {t.portfolio.title_1} <em>{t.portfolio.title_em}</em>
        </h2>
      </div>
      <div className="portfolio-grid">
        {t.portfolio.items.map((p, i) => {
          const url = URLS[i];
          const handleOpen = (e: React.MouseEvent | React.KeyboardEvent) => {
            if (!url) return;
            e.preventDefault();
            setPreview({ url, title: p.title });
          };
          return (
            <div
              key={p.title}
              className={`project-card reveal reveal-delay-${DELAYS[i]}${
                i === 0 ? " featured" : ""
              }${url ? " interactive" : ""}`}
              data-tilt
              onClick={url ? handleOpen : undefined}
              role={url ? "button" : undefined}
              tabIndex={url ? 0 : undefined}
              onKeyDown={
                url
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") handleOpen(e);
                    }
                  : undefined
              }
            >
              {url && (
                <span className="project-live" aria-label="Live">
                  <span className="project-live-dot" />
                  Live
                </span>
              )}
              <div className="project-img">
                {url ? (
                  <LivePreviewThumb url={url} title={p.title} />
                ) : (
                  <div className={`project-visual ${FALLBACK_VISUALS[i].cls}`}>
                    {FALLBACK_VISUALS[i].svg}
                  </div>
                )}
                {url && (
                  <span className="project-hover-cta">
                    <span>{t.portfolio.preview}</span>
                    <span aria-hidden>↗</span>
                  </span>
                )}
              </div>
              <div className="project-info">
                <div className="project-tags">
                  {TAGS[i].map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                {url ? (
                  <button
                    type="button"
                    className="project-link"
                    onClick={handleOpen}
                  >
                    {t.portfolio.preview}
                  </button>
                ) : (
                  <span className="project-link project-link-static">
                    {t.portfolio.view}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <PreviewModal
        url={preview?.url ?? null}
        title={preview?.title ?? ""}
        onClose={() => setPreview(null)}
      />
    </section>
  );
}
