"use client";

import { useEffect, useRef } from "react";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "./LanguageProvider";
import { useStartProject } from "./StartProjectModal";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { openModal } = useStartProject();

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
          <a href="#services">{t.nav.services}</a>
        </li>
        <li>
          <a href="#portfolio">{t.nav.work}</a>
        </li>
        <li>
          <a href="#technologies">{t.nav.stack}</a>
        </li>
        <li>
          <a href="#about">{t.nav.about}</a>
        </li>
      </ul>
      <div className="nav-right">
        <LanguageToggle />
        <button
          type="button"
          className="nav-cta"
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
        >
          {t.nav.cta}
        </button>
      </div>
    </nav>
  );
}
