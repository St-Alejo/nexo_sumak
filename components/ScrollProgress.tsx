"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let ticking = false;
    let max = document.documentElement.scrollHeight - window.innerHeight;

    const apply = () => {
      ticking = false;
      const ratio = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    const onResize = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      apply();
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden />;
}
