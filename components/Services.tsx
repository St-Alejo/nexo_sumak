import Reveal from "./Reveal";

const SERVICES = [
  {
    num: "01",
    name: "Custom Software Development",
    desc: "Bespoke systems engineered to your exact requirements — performant, maintainable, and built to grow.",
    icon: (
      <svg className="service-icon" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="4" width="14" height="14" stroke="white" strokeWidth="1.5" />
        <rect x="22" y="4" width="14" height="14" stroke="white" strokeWidth="1.5" />
        <rect x="4" y="22" width="14" height="14" stroke="white" strokeWidth="1.5" />
        <rect x="22" y="22" width="14" height="14" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "02",
    name: "AI Automation Solutions",
    desc: "Intelligent pipelines that eliminate repetitive work, surface insights, and drive autonomous decision-making.",
    icon: (
      <svg className="service-icon" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="1.5" />
        <path
          d="M20 4 L20 12M20 28 L20 36M4 20 L12 20M28 20 L36 20"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M8.69 8.69 L14.14 14.14M25.86 25.86 L31.31 31.31M31.31 8.69 L25.86 14.14M14.14 25.86 L8.69 31.31"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    num: "03",
    name: "API Integrations",
    desc: "Seamlessly connect your ecosystem — third-party services, internal tools, and data sources — into a unified experience.",
    icon: (
      <svg className="service-icon" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="14" width="12" height="12" rx="1" stroke="white" strokeWidth="1.5" />
        <rect x="24" y="14" width="12" height="12" rx="1" stroke="white" strokeWidth="1.5" />
        <path d="M16 20 L24 20" stroke="white" strokeWidth="1.5" />
        <path d="M20 20 L20 8 L32 8" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
        <path
          d="M20 20 L20 32 L32 32"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      </svg>
    ),
  },
  {
    num: "04",
    name: "SaaS & Licensing Systems",
    desc: "Multi-tenant platforms, subscription billing, access control, and licensing infrastructure built for scale.",
    icon: (
      <svg className="service-icon" viewBox="0 0 40 40" fill="none">
        <path d="M8 32 L8 16 L20 8 L32 16 L32 32 Z" stroke="white" strokeWidth="1.5" />
        <rect x="16" y="22" width="8" height="10" stroke="white" strokeWidth="1.5" />
        <path d="M14 16 L20 12 L26 16" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services">
      <Reveal>
        <div className="section-label">What we do</div>
      </Reveal>
      <div className="services-header">
        <Reveal>
          <h2 className="section-title">
            Capabilities built for <em>scale</em>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="services-desc">
            We architect and deliver end-to-end digital systems — from intelligent
            automation to robust SaaS platforms — with precision and speed.
          </p>
        </Reveal>
      </div>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.num}
            delay={(i + 1) as 1 | 2 | 3 | 4}
            className="service-card"
          >
            <span className="service-num">{s.num}</span>
            {s.icon}
            <h3 className="service-name">{s.name}</h3>
            <p className="service-desc">{s.desc}</p>
            <span className="service-arrow">↗</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
