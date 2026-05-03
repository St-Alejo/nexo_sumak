"use client";

import { useLang } from "./LanguageProvider";

export default function Marquee() {
  const { t } = useLang();
  const items = t.marquee;
  const loop = [...items, ...items];
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
