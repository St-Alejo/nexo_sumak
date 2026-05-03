"use client";

import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-logo">NEXOSUMAK</div>
      <ul className="footer-links">
        <li>
          <a href="#services">{t.footer.services}</a>
        </li>
        <li>
          <a href="#portfolio">{t.footer.work}</a>
        </li>
        <li>
          <a href="#about">{t.footer.about}</a>
        </li>
        <li>
          <a href="#contact">{t.footer.contact}</a>
        </li>
      </ul>
      <div className="footer-copy">{t.footer.copy}</div>
    </footer>
  );
}
