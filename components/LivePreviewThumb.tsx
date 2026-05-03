"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  title: string;
  /** width of the rendered iframe in CSS px before scaling */
  renderWidth?: number;
  /** height of the rendered iframe in CSS px before scaling */
  renderHeight?: number;
};

export default function LivePreviewThumb({
  url,
  title,
  renderWidth = 1440,
  renderHeight = 900,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lazy-mount when the card enters the viewport (or after idle on small screens)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMount(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-compute the scale factor so the iframe always fits its container
  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const apply = () => {
      const rect = wrap.getBoundingClientRect();
      const sx = rect.width / renderWidth;
      const sy = rect.height / renderHeight;
      const scale = Math.max(sx, sy);
      inner.style.transform = `scale(${scale})`;
      inner.style.width = `${renderWidth}px`;
      inner.style.height = `${renderHeight}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [renderWidth, renderHeight, shouldMount]);

  return (
    <div className="thumb-wrap" ref={wrapRef} aria-hidden>
      <div className="thumb-scaler" ref={innerRef}>
        {shouldMount && (
          <iframe
            src={url}
            title={`${title} preview`}
            className={`thumb-iframe ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            scrolling="no"
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
      {!loaded && <div className="thumb-skeleton" aria-hidden />}
      <div className="thumb-overlay" aria-hidden />
    </div>
  );
}
