"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";
import { useStartProject } from "./StartProjectModal";
import { CONTACT } from "@/lib/contact";

export default function Contact() {
  const { t } = useLang();
  const { openModal } = useStartProject();

  return (
    <section id="contact">
      <div className="contact-orbs" aria-hidden>
        <span className="contact-orb contact-orb-1" />
        <span className="contact-orb contact-orb-2" />
      </div>
      <div className="contact-inner">
        <Reveal className="contact-eyebrow">{t.contact.eyebrow}</Reveal>
        <Reveal as="h2" delay={1} className="contact-title">
          {t.contact.title_1}
          <br />
          <em>{t.contact.title_em}</em> {t.contact.title_2}
        </Reveal>
        <Reveal as="p" delay={2} className="contact-sub">
          {t.contact.sub}
        </Reveal>
        <Reveal delay={3} className="contact-actions">
          <MagneticButton className="btn-primary" onClick={openModal}>
            {t.contact.primary}
          </MagneticButton>
          <MagneticButton
            href={`mailto:${CONTACT.email}`}
            className="btn-ghost"
            strength={0.2}
          >
            {t.contact.ghost}
          </MagneticButton>
        </Reveal>
        <Reveal delay={4} className="contact-info">
          <a href={`mailto:${CONTACT.email}`} className="contact-info-item">
            <span className="contact-info-label">{t.contact.email_label}</span>
            <span className="contact-info-value">{CONTACT.email}</span>
          </a>
          {CONTACT.phones.map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="contact-info-item"
            >
              <span className="contact-info-label">{t.contact.phone_label}</span>
              <span className="contact-info-value">{p.label}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
