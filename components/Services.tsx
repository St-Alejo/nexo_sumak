"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

const ICONS = [
  (
    <svg className="service-icon" viewBox="0 0 40 40" fill="none" key="i1">
      <rect x="4" y="4" width="14" height="14" stroke="white" strokeWidth="1.5" />
      <rect x="22" y="4" width="14" height="14" stroke="white" strokeWidth="1.5" />
      <rect x="4" y="22" width="14" height="14" stroke="white" strokeWidth="1.5" />
      <rect x="22" y="22" width="14" height="14" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
  (
    <svg className="service-icon" viewBox="0 0 40 40" fill="none" key="i2">
      <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="1.5" />
      <path
        d="M20 4 L20 12M20 28 L20 36M4 20 L12 20M28 20 L36 20"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M8.69 8.69 L14.14 14.14M25.86 25.86 L31.31 31.31M31.31 8.69 L25.86 14.14M14.14 25.86 L8.69 31.31"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  ),
  (
    <svg className="service-icon" viewBox="0 0 40 40" fill="none" key="i3">
      <rect x="4" y="14" width="12" height="12" rx="1" stroke="white" strokeWidth="1.5" />
      <rect x="24" y="14" width="12" height="12" rx="1" stroke="white" strokeWidth="1.5" />
      <path d="M16 20 L24 20" stroke="white" strokeWidth="1.5" />
      <path d="M20 20 L20 8 L32 8" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M20 20 L20 32 L32 32" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  ),
  (
    <svg className="service-icon" viewBox="0 0 40 40" fill="none" key="i4">
      <path d="M8 32 L8 16 L20 8 L32 16 L32 32 Z" stroke="white" strokeWidth="1.5" />
      <rect x="16" y="22" width="8" height="10" stroke="white" strokeWidth="1.5" />
      <path d="M14 16 L20 12 L26 16" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
];

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services">
      <Reveal>
        <div className="section-label">{t.services.label}</div>
      </Reveal>
      <div className="services-header">
        <Reveal>
          <h2 className="section-title">
            {t.services.title_1} <em>{t.services.title_em}</em>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="services-desc">{t.services.desc}</p>
        </Reveal>
      </div>
      <div className="services-grid">
        {t.services.items.map((s, i) => (
          <Reveal
            key={s.name}
            delay={(i + 1) as 1 | 2 | 3 | 4}
            className="service-card"
          >
            <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="service-icon-wrap">{ICONS[i]}</div>
            <h3 className="service-name">{s.name}</h3>
            <p className="service-desc">{s.desc}</p>
            <span className="service-arrow">↗</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
