const ITEMS = [
  "Custom Software Development",
  "AI Automation",
  "API Integrations",
  "SaaS & Licensing",
  "Machine Learning",
  "Scalable Architecture",
  "Cloud Infrastructure",
  "Data Engineering",
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track" id="marqueeTrack">
        {loop.map((item, i) => (
          <div className="marquee-item" key={`${item}-${i}`}>
            <span className="marquee-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
