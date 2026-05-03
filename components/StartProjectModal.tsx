"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLang } from "./LanguageProvider";

type ModalCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalCtx | null>(null);

export function StartProjectProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const value = useMemo<ModalCtx>(
    () => ({ open, setOpen, openModal, closeModal }),
    [open, openModal, closeModal]
  );
  return (
    <ModalContext.Provider value={value}>
      {children}
      <StartProjectModal />
    </ModalContext.Provider>
  );
}

export function useStartProject() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useStartProject must be inside StartProjectProvider");
  return ctx;
}

type Form = {
  type: string[];
  scope: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

const EMPTY: Form = {
  type: [],
  scope: [],
  timeline: "",
  budget: "",
  name: "",
  email: "",
  company: "",
  message: "",
};

const TOTAL_STEPS = 5;

function StartProjectModal() {
  const { open, closeModal } = useStartProject();
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (!open) {
      // Reset after exit
      const id = window.setTimeout(() => {
        setStep(0);
        setForm(EMPTY);
        setSubmitted(false);
      }, 400);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Focus first input on contact step
  useEffect(() => {
    if (open && step === 4 && firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, [open, step]);

  // Subtle 3D tilt of the card following cursor
  useEffect(() => {
    if (!open) return;
    const card = cardRef.current;
    if (!card) return;
    const fineHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fineHover) return;
    let raf = 0;
    let scheduled = false;
    let tx = 0;
    let ty = 0;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      tx = ((e.clientX - cx) / cx) * 2;
      ty = ((e.clientY - cy) / cy) * 2;
      if (!scheduled) {
        scheduled = true;
        raf = requestAnimationFrame(() => {
          scheduled = false;
          card.style.transform = `perspective(1400px) rotateY(${tx}deg) rotateX(${
            -ty
          }deg)`;
        });
      }
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      card.style.transform = "";
    };
  }, [open]);

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return form.type.length > 0;
      case 1:
        return true; // scope is optional
      case 2:
        return form.timeline !== "";
      case 3:
        return form.budget !== "";
      case 4:
        return form.name.trim() !== "" && /\S+@\S+\.\S+/.test(form.email);
      default:
        return false;
    }
  }, [step, form]);

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else handleSubmit();
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = () => {
    // No backend yet — open mailto with summary so the user actually reaches us.
    const lines = [
      `Tipo: ${form.type.join(", ")}`,
      `Scope: ${form.scope.join(", ") || "—"}`,
      `Timeline: ${form.timeline}`,
      `Budget: ${form.budget}`,
      `Empresa: ${form.company || "—"}`,
      "",
      form.message || "",
    ];
    const subject = encodeURIComponent(
      `[Nuevo proyecto] ${form.name}${form.company ? " — " + form.company : ""}`
    );
    const body = encodeURIComponent(lines.join("\n"));
    try {
      window.location.href = `mailto:hello@nexosumak.com?subject=${subject}&body=${body}`;
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  const toggleArr = (key: "type" | "scope", val: string) => {
    setForm((f) => {
      const set = new Set(f[key]);
      if (set.has(val)) set.delete(val);
      else set.add(val);
      return { ...f, [key]: Array.from(set) };
    });
  };

  if (!open) return null;

  const w = t.wizard;
  const progress = submitted ? 100 : ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div
      className="modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wizard-title"
    >
      <div
        className="modal-backdrop"
        onClick={closeModal}
        aria-hidden
      />
      <div className="modal-card" ref={cardRef}>
        <button
          type="button"
          className="modal-close"
          onClick={closeModal}
          aria-label={w.close}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 5 L19 19 M19 5 L5 19"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        {!submitted && (
          <div className="modal-header">
            <div className="modal-eyebrow">
              {w.step} {step + 1} {w.of} {TOTAL_STEPS}
            </div>
            <div className="modal-progress" aria-label={w.progress}>
              <div
                className="modal-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="modal-body">
          {submitted ? (
            <SuccessView title={w.success.title} body={w.success.body} />
          ) : step === 0 ? (
            <StepCards
              title={w.steps.type.title}
              subtitle={w.steps.type.subtitle}
              options={w.steps.type.options}
              selected={form.type}
              multi
              onToggle={(id) => toggleArr("type", id)}
            />
          ) : step === 1 ? (
            <StepChips
              title={w.steps.scope.title}
              subtitle={w.steps.scope.subtitle}
              options={w.steps.scope.options}
              selected={form.scope}
              onToggle={(id) => toggleArr("scope", id)}
            />
          ) : step === 2 ? (
            <StepCards
              title={w.steps.timeline.title}
              subtitle={w.steps.timeline.subtitle}
              options={w.steps.timeline.options}
              selected={form.timeline ? [form.timeline] : []}
              onToggle={(id) =>
                setForm((f) => ({ ...f, timeline: id }))
              }
            />
          ) : step === 3 ? (
            <StepCards
              title={w.steps.budget.title}
              subtitle={w.steps.budget.subtitle}
              options={w.steps.budget.options}
              selected={form.budget ? [form.budget] : []}
              onToggle={(id) =>
                setForm((f) => ({ ...f, budget: id }))
              }
            />
          ) : (
            <StepContact
              title={w.steps.contact.title}
              subtitle={w.steps.contact.subtitle}
              labels={w.steps.contact}
              form={form}
              setForm={setForm}
              firstFieldRef={firstFieldRef}
            />
          )}
        </div>

        {!submitted && (
          <div className="modal-footer">
            <button
              type="button"
              className="modal-btn modal-btn-ghost"
              onClick={back}
              disabled={step === 0}
            >
              {w.back}
            </button>
            <button
              type="button"
              className="modal-btn modal-btn-primary"
              onClick={next}
              disabled={!stepValid}
            >
              {step === TOTAL_STEPS - 1 ? w.submit : w.next}
              <span aria-hidden>→</span>
            </button>
          </div>
        )}

        {submitted && (
          <div className="modal-footer modal-footer-center">
            <button
              type="button"
              className="modal-btn modal-btn-primary"
              onClick={closeModal}
            >
              {w.success.cta}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="step-head">
      <h3 id="wizard-title" className="step-title">
        {title}
      </h3>
      <p className="step-sub">{subtitle}</p>
    </div>
  );
}

type CardOption = { id: string; label: string; desc: string };

function StepCards({
  title,
  subtitle,
  options,
  selected,
  multi,
  onToggle,
}: {
  title: string;
  subtitle: string;
  options: readonly CardOption[];
  selected: string[];
  multi?: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="step step-grid">
      <StepHeader title={title} subtitle={subtitle} />
      <div className="option-grid">
        {options.map((o, i) => {
          const active = selected.includes(o.id);
          return (
            <button
              type="button"
              key={o.id}
              className={`option-card ${active ? "active" : ""}`}
              onClick={() => onToggle(o.id)}
              style={{ animationDelay: `${i * 40}ms` }}
              aria-pressed={active}
            >
              <span className="option-check" aria-hidden>
                {active ? (multi ? "✓" : "●") : ""}
              </span>
              <span className="option-label">{o.label}</span>
              <span className="option-desc">{o.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepChips({
  title,
  subtitle,
  options,
  selected,
  onToggle,
}: {
  title: string;
  subtitle: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="step">
      <StepHeader title={title} subtitle={subtitle} />
      <div className="chip-row">
        {options.map((o, i) => {
          const active = selected.includes(o);
          return (
            <button
              type="button"
              key={o}
              className={`chip ${active ? "active" : ""}`}
              onClick={() => onToggle(o)}
              style={{ animationDelay: `${i * 30}ms` }}
              aria-pressed={active}
            >
              <span className="chip-dot" aria-hidden />
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepContact({
  title,
  subtitle,
  labels,
  form,
  setForm,
  firstFieldRef,
}: {
  title: string;
  subtitle: string;
  labels: { name: string; email: string; company: string; message: string };
  form: Form;
  setForm: (updater: (f: Form) => Form) => void;
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="step">
      <StepHeader title={title} subtitle={subtitle} />
      <div className="field-grid">
        <Field label={labels.name} required>
          <input
            ref={firstFieldRef}
            className="field-input"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
            placeholder=" "
            autoComplete="name"
          />
        </Field>
        <Field label={labels.email} required>
          <input
            type="email"
            className="field-input"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
            placeholder=" "
            autoComplete="email"
          />
        </Field>
        <Field label={labels.company}>
          <input
            className="field-input"
            value={form.company}
            onChange={(e) =>
              setForm((f) => ({ ...f, company: e.target.value }))
            }
            placeholder=" "
            autoComplete="organization"
          />
        </Field>
        <Field label={labels.message} full>
          <textarea
            className="field-input field-textarea"
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            placeholder=" "
            rows={3}
          />
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={`field ${full ? "field-full" : ""}`}>
      <span className="field-label">
        {label}
        {required ? <span className="field-required" aria-hidden>*</span> : null}
      </span>
      {children}
    </label>
  );
}

function SuccessView({ title, body }: { title: string; body: string }) {
  return (
    <div className="success">
      <div className="success-anim" aria-hidden>
        <svg viewBox="0 0 64 64" width="64" height="64">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="success-ring"
          />
          <path
            d="M20 33 L29 42 L46 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-check"
          />
        </svg>
      </div>
      <h3 className="step-title">{title}</h3>
      <p className="step-sub">{body}</p>
    </div>
  );
}
