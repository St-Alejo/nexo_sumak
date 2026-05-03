"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

const ITEMS: string[][] = [
  ["OpenAI GPT-4", "TensorFlow", "PyTorch", "Hugging Face", "LangChain", "scikit-learn", "Pinecone"],
  ["Python", "Node.js", "Go", "FastAPI", "Django", "GraphQL", "gRPC"],
  ["React", "Next.js", "TypeScript", "Vue.js", "Svelte", "Three.js"],
  ["AWS", "Google Cloud", "Azure", "Vercel", "Kubernetes", "Docker", "Terraform"],
  ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Snowflake", "dbt", "Airflow"],
];

export default function Technologies() {
  const { t } = useLang();
  return (
    <section id="technologies">
      <div className="tech-header">
        <div>
          <Reveal>
            <div className="section-label">{t.technologies.label}</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">
              {t.technologies.title_1} <em>{t.technologies.title_em}</em>
            </h2>
          </Reveal>
        </div>
      </div>
      <Reveal className="tech-categories">
        {t.technologies.categories.map((label, i) => (
          <div key={label} className="tech-row">
            <div className="tech-row-label">{label}</div>
            <div className="tech-items">
              {ITEMS[i].map((item) => (
                <span key={item} className="tech-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
