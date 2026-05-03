"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";
import { useStartProject } from "./StartProjectModal";

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
          <MagneticButton
            className="btn-primary"
            onClick={openModal}
          >
            {t.contact.primary}
          </MagneticButton>
          <MagneticButton
            href="mailto:hello@nexosumak.com"
            className="btn-ghost"
            strength={0.2}
          >
            {t.contact.ghost}
          </MagneticButton>
        </Reveal>
        <Reveal delay={4} className="contact-email">
          {t.contact.direct_pre}
          <a href="mailto:hello@nexosumak.com">hello@nexosumak.com</a>
        </Reveal>
      </div>
    </section>
  );
}
