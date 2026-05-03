import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <Reveal className="contact-eyebrow">Ready to build?</Reveal>
        <Reveal as="h2" delay={1} className="contact-title">
          Start your
          <br />
          <em>next</em> project
        </Reveal>
        <Reveal as="p" delay={2} className="contact-sub">
          Let&apos;s discuss your goals and build something that genuinely moves
          the needle. First consultation is always on us.
        </Reveal>
        <Reveal delay={3} className="contact-actions">
          <a href="mailto:hello@nexosumak.com" className="btn-primary">
            Start your project
          </a>
          <a href="mailto:hello@nexosumak.com" className="btn-ghost">
            Schedule a call
          </a>
        </Reveal>
        <Reveal delay={4} className="contact-email">
          Or reach us directly at{" "}
          <a href="mailto:hello@nexosumak.com">hello@nexosumak.com</a>
        </Reveal>
      </div>
    </section>
  );
}
