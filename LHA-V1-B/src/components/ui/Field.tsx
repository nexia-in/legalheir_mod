"use client";

import type { ReactNode } from "react";
import { DOC_STATUS_OPTIONS, type DocStatus } from "@/lib/types";

const base =
  "w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 py-3 text-[15px] text-slate-900 shadow-sm outline-none transition " +
  "placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 disabled:bg-slate-100";

const errorRing = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold text-slate-700">
      {children}
      {required ? <span className="ml-0.5 text-rose-500">*</span> : <span className="ml-1 text-[11px] font-normal text-slate-400">(optional)</span>}
      {hint ? <span className="ml-1 block text-[11px] font-normal text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function ErrorText({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-start gap-1 text-[12px] font-medium text-rose-600">
      <span aria-hidden>⚠</span>
      <span>{children}</span>
    </p>
  );
}

export interface BaseProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email" | "decimal";
  maxLength?: number;
  autoComplete?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  hint,
  placeholder,
  type = "text",
  inputMode,
  maxLength,
  autoComplete = "off",
}: BaseProps) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${base} ${error ? errorRing : ""}`}
      />
      <span id={`${id}-error`}>
        <ErrorText>{error}</ErrorText>
      </span>
    </div>
  );
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  required,
  error,
  hint,
  placeholder,
  rows = 3,
}: BaseProps & { rows?: number }) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${base} resize-y ${error ? errorRing : ""}`}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required,
  error,
  hint,
  placeholder = "— Select —",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <select
        id={id}
        name={id}
        value={value}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${base} ${error ? errorRing : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

const toneClasses: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-300 ring-emerald-500/20",
  amber: "bg-amber-50 text-amber-800 border-amber-300 ring-amber-500/20",
  rose: "bg-rose-50 text-rose-700 border-rose-300 ring-rose-500/20",
  slate: "bg-slate-100 text-slate-600 border-slate-300 ring-slate-400/20",
};

export function StatusPicker({
  id,
  label,
  value,
  onChange,
  sublabel,
}: {
  id: string;
  label: string;
  value: DocStatus;
  onChange: (v: DocStatus) => void;
  sublabel?: string;
}) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white/70 p-3.5" id={id}>
      <legend className="px-1 text-[13px] font-semibold text-slate-800">{label}</legend>
      {sublabel ? <p className="mb-2 text-[11.5px] text-slate-500">{sublabel}</p> : null}
      <div className="flex flex-wrap gap-2">
        {DOC_STATUS_OPTIONS.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition focus:outline-none focus:ring-4 ${
                active
                  ? `${toneClasses[o.tone]} ring-2`
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-white/60 bg-white/75 p-5 shadow-[0_8px_30px_-12px_rgba(15,39,68,0.25)] backdrop-blur-xl sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  malayalam,
  description,
}: {
  title: string;
  malayalam?: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
      {malayalam ? <p className="mt-0.5 text-[15px] text-slate-600">{malayalam}</p> : null}
      {description ? <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{description}</p> : null}
    </div>
  );
}

export function Grid({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const c = cols === 1 ? "sm:grid-cols-1" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return <div className={`grid grid-cols-1 gap-4 ${c}`}>{children}</div>;
}
