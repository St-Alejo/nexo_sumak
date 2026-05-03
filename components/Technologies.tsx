import Reveal from "./Reveal";

const CATEGORIES: { label: string; items: string[] }[] = [
  {
    label: "AI & ML",
    items: [
      "OpenAI GPT-4",
      "TensorFlow",
      "PyTorch",
      "Hugging Face",
      "LangChain",
      "scikit-learn",
      "Pinecone",
    ],
  },
  {
    label: "Backend",
    items: ["Python", "Node.js", "Go", "FastAPI", "Django", "GraphQL", "gRPC"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Vue.js", "Svelte", "Three.js"],
  },
  {
    label: "Cloud",
    items: [
      "AWS",
      "Google Cloud",
      "Azure",
      "Vercel",
      "Kubernetes",
      "Docker",
      "Terraform",
    ],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "Snowflake",
      "dbt",
      "Airflow",
    ],
  },
];

export default function Technologies() {
  return (
    <section id="technologies">
      <div className="tech-header">
        <div>
          <Reveal>
            <div className="section-label">Technology stack</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">
              Tools we <em>master</em>
            </h2>
          </Reveal>
        </div>
      </div>
      <Reveal className="tech-categories">
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className="tech-row">
            <div className="tech-row-label">{cat.label}</div>
            <div className="tech-items">
              {cat.items.map((item) => (
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
