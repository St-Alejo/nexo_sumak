import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Cert = {
  name: string;
  issuer: string;
  year: string;
  delay: 1 | 2 | 3 | 4 | 5 | 6;
  badge: ReactNode;
};

const CERTS: Cert[] = [
  {
    delay: 1,
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
    badge: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2 L14.4 8.4 L21 9 L16.2 13.2 L17.6 20 L12 16.8 L6.4 20 L7.8 13.2 L3 9 L9.6 8.4 Z"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    delay: 2,
    name: "Google Professional ML Engineer",
    issuer: "Google Cloud",
    year: "2024",
    badge: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
        <path d="M9 12 L11 14 L15 10" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    delay: 3,
    name: "ISO 27001 Security Compliance",
    issuer: "International Standards Org.",
    year: "2023",
    badge: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" stroke="white" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" stroke="white" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" stroke="white" strokeWidth="1.5" />
        <rect x="13" y="13" width="8" height="8" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    delay: 4,
    name: "Microsoft Azure Developer",
    issuer: "Microsoft",
    year: "2024",
    badge: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 22,20 2,20" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="12" y1="9" x2="12" y2="14" stroke="white" strokeWidth="1.5" />
        <circle cx="12" cy="17" r="1" fill="white" />
      </svg>
    ),
  },
  {
    delay: 5,
    name: "OpenAI Verified Developer",
    issuer: "OpenAI",
    year: "2025",
    badge: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12 C3 7.03 7.03 3 12 3 C16.97 3 21 7.03 21 12"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M3 12 C3 16.97 7.03 21 12 21 C16.97 21 21 16.97 21 12"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <path
          d="M12 3 C12 3 9 7 9 12 C9 17 12 21 12 21"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M12 3 C12 3 15 7 15 12 C15 17 12 21 12 21"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      </svg>
    ),
  },
  {
    delay: 6,
    name: "Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    year: "2023",
    badge: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3 L4 7 L4 17 L12 21 L20 17 L20 7 Z"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M12 3 L12 21M4 7 L20 17M20 7 L4 17"
          stroke="white"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    ),
  },
];

export default function Certifications() {
  return (
    <section id="certifications">
      <Reveal>
        <div className="section-label">Trust &amp; credentials</div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="section-title">
          Built on <em>proven</em> standards
        </h2>
      </Reveal>
      <div className="cert-grid">
        {CERTS.map((c) => (
          <Reveal key={c.name} delay={c.delay} className="cert-card">
            <div className="cert-badge">{c.badge}</div>
            <h3 className="cert-name">{c.name}</h3>
            <div className="cert-issuer">{c.issuer}</div>
            <div className="cert-year">{c.year}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
