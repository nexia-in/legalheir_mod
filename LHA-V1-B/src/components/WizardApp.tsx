"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { emptyForm, type FormData } from "@/lib/types";
import { todayIso } from "@/lib/format";
import { issuesForStep, STEP_TITLES, validateAll } from "@/lib/validation";
import {
  ApplicantStep,
  DeceasedStep,
  DocumentsStepView,
  HeirsStep,
  WitnessStep,
} from "@/components/steps/Steps";
import { ReviewStep } from "@/components/steps/Review";

const STEP_ICONS = ["👤", "🕊️", "👨‍👩‍👧", "🤝", "📎", "✅"];

export function WizardApp() {
  const [data, setData] = useState<FormData>(() => {
    const f = emptyForm();
    f.documents.declarationDate = todayIso();
    return f;
  });
  const [step, setStep] = useState(0);
  const [submittedSteps, setSubmittedSteps] = useState<Set<number>>(new Set());
  const [showReset, setShowReset] = useState(false);
  const [mapWarning, setMapWarning] = useState<{ needsVerification: number; notPrinted: number } | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  const issues = useMemo(() => validateAll(data), [data]);

  useEffect(() => {
    let cancelled = false;
    // Reference data only — this request contains no form values.
    fetch("/api/field-map")
      .then((r) => r.json())
      .then((j) => {
        if (!cancelled && j?.ok) setMapWarning(j.summary);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const update = useCallback((patch: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const errorMap = useMemo(() => {
    const m = new Map<string, string>();
    issues
      .filter((i) => i.severity === "error" && submittedSteps.has(i.step))
      .forEach((i) => {
        if (!m.has(i.field)) m.set(i.field, i.message);
      });
    return m;
  }, [issues, submittedSteps]);

  const err = useCallback((field: string) => errorMap.get(field), [errorMap]);

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = useCallback((s: number) => {
    setStep(Math.max(0, Math.min(STEP_TITLES.length - 1, s)));
    scrollTop();
  }, []);

  const next = () => {
    setSubmittedSteps((prev) => new Set(prev).add(step));
    const stepErrors = issuesForStep(issues, step).filter((i) => i.severity === "error");
    if (stepErrors.length > 0) {
      const el = document.getElementById(stepErrors[0].field);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        if (el instanceof HTMLElement) el.focus({ preventScroll: true });
      }
      return;
    }
    goToStep(step + 1);
  };

  const reset = () => {
    const f = emptyForm();
    f.documents.declarationDate = todayIso();
    setData(f);
    setSubmittedSteps(new Set());
    setStep(0);
    setShowReset(false);
    scrollTop();
  };

  const stepErrorCount = (s: number) =>
    issues.filter((i) => i.step === s && i.severity === "error").length;

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_15%_-10%,#dbeafe_0%,transparent_55%),radial-gradient(900px_500px_at_95%_0%,#d1fae5_0%,transparent_50%)] bg-slate-100">
      <div ref={topRef} />

      {/* ---------- header ---------- */}
      <header className="sticky top-0 z-30 border-b border-white/50 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-sky-700 text-[15px] font-black text-white shadow-md">
              N
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-extrabold tracking-tight text-slate-900">Nexia Virtual Desk</p>
              <p className="text-[11.5px] text-slate-500">Your online application supporting team</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-400/20"
          >
            Clear All Data
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-28 pt-6">
        {/* ---------- intro ---------- */}
        {step === 0 ? (
          <section className="mb-6 space-y-3">
            <div className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-[0_8px_30px_-12px_rgba(15,39,68,0.25)] backdrop-blur-xl sm:p-7">
              <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-sky-800">
                Kerala · Legal Heirship Certificate
              </p>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Prepare your Legal Heirship Certificate application
              </h1>
              <p className="mt-1 text-[15px] text-slate-600">അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ് അപേക്ഷ തയ്യാറാക്കാം</p>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                Fill in the details once and download three printable application forms plus two operator data files.
                Everything is produced inside your browser.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  ["📄", "3 separate printable PDFs"],
                  ["📝", "2 operator TXT files"],
                  ["🔒", "No data leaves your device"],
                ].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-3 text-[13px] font-semibold text-slate-700">
                    <span aria-hidden>{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200/80 bg-amber-50/80 p-4 text-[12.5px] leading-relaxed text-amber-900 sm:p-5">
              <p className="font-bold">Disclaimer</p>
              <p className="mt-1">
                This is a private application assistance service provided by Nexia Virtual Desk. We are not affiliated
                with or representing the Government of Kerala. Final requirements and acceptance are subject to the
                relevant government authority. The official portal is{" "}
                <a
                  className="font-semibold underline"
                  href="https://edistrict.kerala.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  edistrict.kerala.gov.in
                </a>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/80 p-4 text-[12.5px] leading-relaxed text-emerald-900 sm:p-5">
              <p className="font-bold">Privacy note</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Your answers stay in this browser tab&apos;s memory and are never uploaded to a server.</li>
                <li>
                  Nothing is written to localStorage, so closing or reloading the tab clears everything — finish the
                  form in one sitting.
                </li>
                <li>PDFs and TXT files are built on your device and saved to your downloads folder, where they stay until you delete them.</li>
                <li>We never ask for e-District passwords or OTPs, and we never send your data to WhatsApp automatically.</li>
                <li>Aadhaar numbers are masked on the review screen and are never written into the printable PDFs for heirs and witnesses.</li>
              </ul>
            </div>

            {mapWarning && mapWarning.needsVerification > 0 ? (
              <div className="rounded-3xl border border-slate-300 bg-white/80 p-4 text-[12.5px] leading-relaxed text-slate-700 sm:p-5">
                <p className="font-bold text-slate-900">Source-document status</p>
                <p className="mt-1">
                  The three original PDFs were not available to this build, so the printouts are a careful
                  reproduction rather than a pixel copy. {mapWarning.needsVerification} field(s) are flagged for manual
                  verification and {mapWarning.notPrinted} item(s) are intentionally kept out of the PDFs.{" "}
                  <Link href="/field-map" className="font-semibold text-sky-700 underline">
                    View the full field map →
                  </Link>
                </p>
              </div>
            ) : null}
          </section>
        ) : null}

        {/* ---------- stepper ---------- */}
        <nav aria-label="Form steps" className="mb-5">
          <ol className="flex gap-2 overflow-x-auto pb-2">
            {STEP_TITLES.map((title, i) => {
              const active = i === step;
              const done = submittedSteps.has(i) && stepErrorCount(i) === 0;
              const bad = submittedSteps.has(i) && stepErrorCount(i) > 0;
              return (
                <li key={title} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-current={active ? "step" : undefined}
                    className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-[12.5px] font-semibold transition ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white shadow-md"
                        : bad
                          ? "border-rose-300 bg-rose-50 text-rose-700"
                          : done
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-white/80 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <span aria-hidden>{bad ? "⚠" : done ? "✓" : STEP_ICONS[i]}</span>
                    <span className="whitespace-nowrap">
                      {i + 1}. {title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-600 to-emerald-500 transition-all duration-500"
              style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }}
            />
          </div>
          <p className="mt-1.5 text-[12px] font-medium text-slate-500">
            Step {step + 1} of {STEP_TITLES.length} — {STEP_TITLES[step]}
          </p>
        </nav>

        {/* ---------- step body ---------- */}
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          {step === 0 ? <ApplicantStep data={data} update={update} err={err} /> : null}
          {step === 1 ? <DeceasedStep data={data} update={update} err={err} /> : null}
          {step === 2 ? <HeirsStep data={data} update={update} err={err} /> : null}
          {step === 3 ? <WitnessStep data={data} update={update} err={err} /> : null}
          {step === 4 ? <DocumentsStepView data={data} update={update} err={err} /> : null}
          {step === 5 ? <ReviewStep data={data} issues={issues} goToStep={goToStep} /> : null}
        </form>

        <footer className="mt-10 space-y-2 text-center text-[11.5px] leading-relaxed text-slate-500">
          <p>
            Nexia Virtual Desk · Your online application supporting team ·{" "}
            <Link href="/field-map" className="font-semibold text-sky-700 underline">
              Source form field map
            </Link>
          </p>
          <p>
            Private assistance service. Not a Government of Kerala website. PDF generation uses the open-source
            libraries jsPDF, html2canvas-pro and pdf-lib, all of which run locally in your browser.
          </p>
        </footer>
      </main>

      {/* ---------- sticky nav ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            disabled={step === 0}
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-[14px] font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            ← Back
          </button>
          <p className="hidden text-[12.5px] font-medium text-slate-500 sm:block">{STEP_TITLES[step]}</p>
          {step < STEP_TITLES.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-2xl bg-slate-900 px-6 py-3 text-[14px] font-bold text-white shadow-md transition hover:bg-slate-800"
            >
              {step === STEP_TITLES.length - 2 ? "Review →" : "Next →"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => goToStep(0)}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to start
            </button>
          )}
        </div>
      </div>

      {/* ---------- reset dialog ---------- */}
      {showReset ? (
        <div role="dialog" aria-modal="true" aria-label="Clear all data" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900">Clear all entered data?</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
              Every field, every legal heir and both witness entries will be erased from this browser session. Files
              you have already downloaded stay on your device — delete them yourself if required. This cannot be
              undone.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
              <button type="button" onClick={reset} className="rounded-2xl bg-rose-600 px-5 py-3 text-[14px] font-bold text-white hover:bg-rose-700">
                Yes, clear everything
              </button>
              <button type="button" onClick={() => setShowReset(false)} className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-[14px] font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
