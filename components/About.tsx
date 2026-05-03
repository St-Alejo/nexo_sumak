"use client";

import { useEffect, useRef } from "react";
import { useLang } from "./LanguageProvider";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll<HTMLElement>(".reveal");
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((el) => revealObs.observe(el));

    const counters = section.querySelectorAll<HTMLElement>(".stat-num");
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const text = el.dataset.target ?? el.textContent ?? "";
          const match = text.match(/^(\d+)(.*)$/);
          if (match) {
            const target = parseInt(match[1], 10);
            const suffix = match[2];
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              el.textContent = `${Math.floor(current)}${suffix}`;
              if (current >= target) clearInterval(timer);
            }, 16);
          }
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObs.observe(el));

    return () => {
      revealObs.disconnect();
      counterObs.disconnect();
    };
  }, [t]);

  return (
    <section id="about" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">{t.about.label}</div>
      </div>
      <div className="reveal reveal-delay-1">
        <h2 className="section-title">
          {t.about.title_1} <em>{t.about.title_em}</em>
        </h2>
      </div>
      <div className="about-layout">
        <div className="about-text">
          <p className="reveal reveal-delay-1">
            {t.about.p1_pre}
            <strong>{t.about.p1_strong}</strong>
            {t.about.p1_post}
          </p>
          <p className="reveal reveal-delay-2">
            {t.about.p2_pre}
            <strong>{t.about.p2_strong}</strong>
            {t.about.p2_post}
          </p>
          <p className="reveal reveal-delay-3">
            {t.about.p3_pre}
            <strong>{t.about.p3_strong}</strong>
            {t.about.p3_post}
          </p>
          <div className="about-values reveal reveal-delay-4">
            {t.about.values.map((v) => (
              <div className="about-value" key={v}>
                <div className="value-dot" />
                {v}
              </div>
            ))}
          </div>
        </div>
        <div className="about-stats reveal reveal-delay-2">
          {t.about.stats.map((s) => (
            <div className="about-stat" key={s.label}>
              <div className="stat-num" data-target={s.num}>
                {s.num}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
