"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

export default function Hero({ background }: { background?: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    if (!hero || !content || !logo) return;

    let scrolled = 0;
    let ticking = false;
    let visible = true;

    const apply = () => {
      ticking = false;
      if (!visible) return;
      const vh = window.innerHeight;
      if (scrolled >= vh) return;
      const fade = Math.max(0, 1 - scrolled / (vh * 0.9));
      content.style.transform = `translate3d(0, ${scrolled * 0.25}px, 0)`;
      logo.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
      hero.style.opacity = String(fade);
    };

    const onScroll = () => {
      scrolled = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    // Stop touching styles once we've scrolled past the hero
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(hero);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      {background}
      <div className="hero-logo-container" ref={logoRef}>
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
      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-headline">
          We build
          <br />
          <em>intelligent</em> software
        </h1>
        <p className="hero-sub">
          Custom software, AI automation, and scalable digital solutions
          <br />
          crafted for the next generation of business.
        </p>
        <div className="hero-actions">
          <a href="#portfolio" className="btn-primary">
            View our work
          </a>
          <a href="#services" className="btn-ghost">
            Our services
          </a>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
