"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { num: "40+", label: "Projects delivered" },
  { num: "98%", label: "Client satisfaction" },
  { num: "12", label: "Expert engineers" },
  { num: "5+", label: "Years in market" },
];

const VALUES = [
  "Precision engineering over rapid prototyping",
  "Long-term partnerships, not one-off transactions",
  "AI-native architecture from day one",
  "Transparent process, measurable outcomes",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">Who we are</div>
      </div>
      <div className="reveal reveal-delay-1">
        <h2 className="section-title">
          Precision over <em>quantity</em>
        </h2>
      </div>
      <div className="about-layout">
        <div className="about-text">
          <p className="reveal reveal-delay-1">
            <strong>NEXOSUMAK is a boutique software and AI studio</strong>{" "}
            founded on the belief that exceptional technology demands exceptional
            craft. We don&apos;t ship fast and break things — we architect, test,
            and deliver with rigor.
          </p>
          <p className="reveal reveal-delay-2">
            Our team operates at the intersection of{" "}
            <strong>
              intelligent automation, systems design, and product thinking
            </strong>{" "}
            — bringing together engineers, AI researchers, and product
            strategists to solve problems that matter.
          </p>
          <p className="reveal reveal-delay-3">
            We work with startups scaling to series B and enterprise teams
            modernizing legacy infrastructure. The common thread: a commitment
            to{" "}
            <strong>building things that perform in the real world</strong>, not
            just in demos.
          </p>
          <div className="about-values reveal reveal-delay-4">
            {VALUES.map((v) => (
              <div className="about-value" key={v}>
                <div className="value-dot" />
                {v}
              </div>
            ))}
          </div>
        </div>
        <div className="about-stats reveal reveal-delay-2">
          {STATS.map((s) => (
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
