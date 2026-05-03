"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  strength?: number;
  type?: "button" | "submit";
};

export default function MagneticButton({
  href,
  onClick,
  className = "",
  children,
  strength = 0.35,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fineHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fineHover) return;

    let raf = 0;
    let scheduled = false;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      scheduled = false;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tx = (e.clientX - cx) * strength;
      ty = (e.clientY - cy) * strength;
      if (!scheduled) {
        scheduled = true;
        raf = requestAnimationFrame(apply);
      }
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      tx = 0;
      ty = 0;
      el.style.transform = "translate3d(0, 0, 0)";
      el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    };
    const onEnter = () => {
      el.style.transition = "transform 0.15s ease";
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  if (href) {
    return (
      <a
        ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <span className="magnetic-inner">{children}</span>
      </a>
    );
  }
  return (
    <button
      ref={ref as unknown as React.RefObject<HTMLButtonElement>}
      type={type}
      className={className}
      onClick={onClick}
    >
      <span className="magnetic-inner">{children}</span>
    </button>
  );
}
