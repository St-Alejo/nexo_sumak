"use client";

import { useEffect, useRef } from "react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let ticking = false;
    let lastState = false;
    const apply = () => {
      ticking = false;
      const next = window.scrollY > 60;
      if (next !== lastState) {
        lastState = next;
        nav.classList.toggle("scrolled", next);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} className="main-nav" id="mainNav">
      <a href="#hero" className="nav-logo">
        NEXOSUMAK
      </a>
      <ul className="nav-links">
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#portfolio">Work</a>
        </li>
        <li>
          <a href="#technologies">Stack</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>
      <a href="#contact" className="nav-cta">
        Start a project
      </a>
    </nav>
  );
}
