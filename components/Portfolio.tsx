"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Project = {
  visualClass: string;
  visual: ReactNode;
  tags: string[];
  title: string;
  desc: string;
  featured?: boolean;
  delay: 1 | 2 | 3 | 4 | 5 | 6;
};

const PROJECTS: Project[] = [
  {
    visualClass: "pv-1",
    featured: true,
    delay: 1,
    tags: ["AI", "Python", "FastAPI", "PostgreSQL"],
    title: "Intelligent CRM Automation",
    desc: "End-to-end AI system that qualifies leads, drafts follow-ups, and predicts deal outcomes with 94% accuracy.",
    visual: (
      <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
        <rect x="10" y="10" width="60" height="8" rx="1" fill="rgba(255,255,255,0.12)" />
        <rect x="10" y="26" width="140" height="1" fill="rgba(255,255,255,0.06)" />
        <rect x="10" y="34" width="80" height="6" rx="1" fill="rgba(255,255,255,0.08)" />
        <rect x="10" y="48" width="120" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="10" y="60" width="100" height="6" rx="1" fill="rgba(255,255,255,0.04)" />
        <rect
          x="100"
          y="30"
          width="50"
          height="60"
          rx="2"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.03)"
        />
        <circle cx="125" cy="55" r="12" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
        <path d="M120 55 L123 58 L130 51" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    visualClass: "pv-2",
    delay: 2,
    tags: ["SaaS", "React", "Node.js"],
    title: "Analytics SaaS Platform",
    desc: "Real-time data intelligence platform serving 200+ enterprise clients with sub-second query performance.",
    visual: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="6" fill="rgba(255,255,255,0.3)" />
        <path
          d="M50 20 L50 10M50 90 L50 80M20 50 L10 50M90 50 L80 50"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <path
          d="M30 30 L22 22M70 70 L78 78M70 30 L78 22M30 70 L22 78"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    visualClass: "pv-3",
    delay: 3,
    tags: ["Integrations", "REST", "GraphQL"],
    title: "ERP API Bridge",
    desc: "Unified API layer connecting SAP, Salesforce, and 12 legacy systems into a single coherent interface.",
    visual: (
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
    visualClass: "pv-4",
    delay: 2,
    tags: ["ML", "TensorFlow", "AWS"],
    title: "Predictive Demand Engine",
    desc: "Machine learning model forecasting inventory needs 30 days ahead, reducing overstock by 38%.",
    visual: (
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
    visualClass: "pv-5",
    delay: 3,
    tags: ["Licensing", "Stripe", "Go"],
    title: "Software Licensing Hub",
    desc: "Modular licensing infrastructure with seat management, usage metering, and automated renewals.",
    visual: (
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

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fineHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const cards = Array.from(
      section.querySelectorAll<HTMLDivElement>("[data-tilt]")
    );

    const handlers: Array<{
      card: HTMLDivElement;
      onMove?: (e: MouseEvent) => void;
      onLeave?: () => void;
      onEnter?: () => void;
    }> = [];

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
          }deg) translateZ(4px)`;
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
        <div className="section-label">Selected work</div>
      </div>
      <div className="reveal reveal-delay-1">
        <h2 className="section-title">
          Projects that <em>perform</em>
        </h2>
      </div>
      <div className="portfolio-grid">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className={`project-card reveal reveal-delay-${p.delay}${
              p.featured ? " featured" : ""
            }`}
            data-tilt
          >
            <div className="project-img">
              <div className={`project-visual ${p.visualClass}`}>{p.visual}</div>
            </div>
            <div className="project-info">
              <div className="project-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <a href="#" className="project-link">
                View project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
