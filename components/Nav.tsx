"use client";

import { useEffect, useRef, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "./LanguageProvider";
import { useStartProject } from "./StartProjectModal";
import { CONTACT } from "@/lib/contact";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { openModal } = useStartProject();
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeAnd = (cb?: () => void) => () => {
    setMenuOpen(false);
    if (cb) cb();
  };

  return (
    <>
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
            className="nav-cta nav-cta-desktop"
            onClick={openModal}
          >
            {t.nav.cta}
          </button>
          <button
            type="button"
            className={`nav-burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.wizard.menu}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        id="mobileMenu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          <ul className="mobile-menu-links">
            <li style={{ animationDelay: "0.05s" }}>
              <a href="#services" onClick={closeAnd()}>
                <span className="mm-num">01</span>
                <span className="mm-label">{t.nav.services}</span>
                <span className="mm-arrow" aria-hidden>→</span>
              </a>
            </li>
            <li style={{ animationDelay: "0.1s" }}>
              <a href="#portfolio" onClick={closeAnd()}>
                <span className="mm-num">02</span>
                <span className="mm-label">{t.nav.work}</span>
                <span className="mm-arrow" aria-hidden>→</span>
              </a>
            </li>
            <li style={{ animationDelay: "0.15s" }}>
              <a href="#technologies" onClick={closeAnd()}>
                <span className="mm-num">03</span>
                <span className="mm-label">{t.nav.stack}</span>
                <span className="mm-arrow" aria-hidden>→</span>
              </a>
            </li>
            <li style={{ animationDelay: "0.2s" }}>
              <a href="#about" onClick={closeAnd()}>
                <span className="mm-num">04</span>
                <span className="mm-label">{t.nav.about}</span>
                <span className="mm-arrow" aria-hidden>→</span>
              </a>
            </li>
          </ul>

          <div className="mobile-menu-cta" style={{ animationDelay: "0.28s" }}>
            <button
              type="button"
              className="btn-primary mobile-menu-primary"
              onClick={closeAnd(openModal)}
            >
              {t.nav.cta}
            </button>
          </div>

          <div className="mobile-menu-contact" style={{ animationDelay: "0.34s" }}>
            <a href={`mailto:${CONTACT.email}`} className="mm-contact-row">
              <span className="mm-contact-label">{t.contact.email_label}</span>
              <span className="mm-contact-value">{CONTACT.email}</span>
            </a>
            {CONTACT.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="mm-contact-row">
                <span className="mm-contact-label">{t.contact.phone_label}</span>
                <span className="mm-contact-value">{p.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
