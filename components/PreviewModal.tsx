"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";

type Props = {
  url: string | null;
  title: string;
  onClose: () => void;
};

export default function PreviewModal({ url, title, onClose }: Props) {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [url]);

  useEffect(() => {
    if (!url) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [url, onClose]);

  if (!url) return null;

  return (
    <div
      className="preview-root"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="preview-backdrop" onClick={onClose} aria-hidden />
      <div className="preview-frame">
        <div className="preview-bar">
          <div className="preview-bar-left">
            <span className="preview-dots" aria-hidden>
              <span /> <span /> <span />
            </span>
            <span className="preview-title">{title}</span>
          </div>
          <div className="preview-bar-right">
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="preview-link"
            >
              {t.portfolio.open_external}
              <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              className="preview-close"
              onClick={onClose}
              aria-label={t.wizard.close}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 5 L19 19 M19 5 L5 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="preview-stage">
          {!loaded && (
            <div className="preview-loader" aria-live="polite">
              <span className="preview-spinner" aria-hidden />
              <span>{t.portfolio.loading}</span>
            </div>
          )}
          <iframe
            key={url}
            src={url}
            title={title}
            className={`preview-iframe ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    </div>
  );
}
