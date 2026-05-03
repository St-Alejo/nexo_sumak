"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLang } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    if (!hero || !content || !logo) return;

    let scrolled = 0;
    let mx = 0;
    let my = 0;
    let ticking = false;
    let visible = true;

    const apply = () => {
      ticking = false;
      if (!visible) return;
      const vh = window.innerHeight;
      if (scrolled >= vh) return;
      const fade = Math.max(0, 1 - scrolled / (vh * 0.9));
      content.style.transform = `translate3d(${mx * -8}px, ${
        scrolled * 0.25 + my * -6
      }px, 0)`;
      logo.style.transform = `translate3d(${mx * 12}px, ${
        scrolled * 0.15 + my * 10
      }px, 0)`;
      hero.style.opacity = String(fade);
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    const onScroll = () => {
      scrolled = window.scrollY;
      schedule();
    };
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(hero);

    window.addEventListener("scroll", onScroll, { passive: true });
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("mousemove", onMouse, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      io.disconnect();
    };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-orbs" aria-hidden>
        <span className="hero-orb hero-orb-1" />
        <span className="hero-orb hero-orb-2" />
        <span className="hero-orb hero-orb-3" />
      </div>
      <div className="hero-logo-container" ref={logoRef}>
        <div className="hero-logo-float">
          <Image
            className="hero-ns-logo"
            src="/logo-ns.jpeg"
            alt="NEXOSUMAK"
            width={160}
            height={160}
            priority
            unoptimized
          />
        </div>
      </div>
      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-headline">
          {t.hero.headline_1}
          <br />
          <em>{t.hero.headline_em}</em>
          {t.hero.headline_2 ? ` ${t.hero.headline_2}` : ""}
        </h1>
        <p className="hero-sub">
          {t.hero.sub.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
        <div className="hero-actions">
          <MagneticButton href="#portfolio" className="btn-primary">
            {t.hero.primary}
          </MagneticButton>
          <MagneticButton href="#services" className="btn-ghost" strength={0.2}>
            {t.hero.ghost}
          </MagneticButton>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>{t.hero.scroll}</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
