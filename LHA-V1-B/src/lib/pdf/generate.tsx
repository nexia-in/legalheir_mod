"use client";

import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import type { ReactElement } from "react";
import type { FormData } from "@/lib/types";
import { MainApplication } from "@/components/printable/MainApplication";
import { LegalHeirForm } from "@/components/printable/LegalHeirForm";
import { WitnessForm } from "@/components/printable/WitnessForm";
import { A4_W } from "@/components/printable/shared";
import { loadManifest, overlayTemplate, type DocKey } from "./overlay";

export const DOC_META: Record<DocKey, { title: string; filename: string; malayalam: string }> = {
  main: {
    title: "Main Application – Legal Heir",
    malayalam: "അനന്തരാവകാശ സർട്ടിഫിക്കറ്റിനുള്ള അപേക്ഷ",
    filename: "Legal_Heir_Main_Application.pdf",
  },
  heir: {
    title: "Legal Heir Form",
    malayalam: "അനന്തരാവകാശികളുടെ വിവരപ്പട്ടിക",
    filename: "Legal_Heir_Application_Form.pdf",
  },
  witness: {
    title: "Witness Form",
    malayalam: "സാക്ഷി മൊഴി",
    filename: "Legal_Heir_Witness_Form.pdf",
  },
};

function elementFor(docKey: DocKey, data: FormData): ReactElement {
  if (docKey === "main") return <MainApplication data={data} />;
  if (docKey === "heir") return <LegalHeirForm data={data} />;
  return <WitnessForm data={data} />;
}

async function ensureFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  const faces = [
    '400 12px "Noto Sans Malayalam"',
    '700 19px "Noto Sans Malayalam"',
    '400 12px "Noto Sans"',
    '700 12px "Noto Sans"',
  ];
  try {
    await Promise.all(faces.map((f) => document.fonts.load(f, "അ ABC")));
    await document.fonts.ready;
  } catch {
    /* fonts are best-effort; system fallbacks still render Malayalam */
  }
}

const raf = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/**
 * Renders the printable React template into a detached, off-screen A4 stage,
 * rasterises each page with html2canvas-pro (so the browser's own Malayalam
 * shaping engine is used) and assembles a real multi-page A4 PDF with jsPDF.
 *
 * Everything happens in the browser; nothing is uploaded.
 */
async function renderReproductionPdf(docKey: DocKey, data: FormData): Promise<Blob> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = [
    "position:fixed",
    "left:-20000px",
    "top:0",
    `width:${A4_W}px`,
    "background:#ffffff",
    "z-index:-1",
    "pointer-events:none",
  ].join(";");
  document.body.appendChild(host);

  const root = createRoot(host);
  try {
    flushSync(() => {
      root.render(elementFor(docKey, data));
    });
    await ensureFonts();
    await raf();
    await raf();

    const pageEls = Array.from(host.querySelectorAll<HTMLElement>("[data-pdf-page]"));
    if (pageEls.length === 0) throw new Error("No printable page was produced.");

    // Shrink-to-fit guard: unusually long names/addresses can never be clipped.
    host.querySelectorAll<HTMLElement>("[data-pdf-fit]").forEach((fit) => {
      const inner = fit.querySelector<HTMLElement>("[data-pdf-inner]");
      if (!inner) return;
      const available = fit.clientHeight;
      const needed = inner.scrollHeight;
      if (needed > available && available > 0) {
        const scale = Math.max(0.55, available / needed);
        inner.style.transformOrigin = "top left";
        inner.style.transform = `scale(${scale})`;
        inner.style.width = `${100 / scale}%`;
      }
    });

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pageEls.length; i++) {
      const canvas = await html2canvas(pageEls[i], {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });
      const img = canvas.toDataURL("image/jpeg", 0.95);
      if (i > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", 0, 0, pw, ph, undefined, "FAST");
    }

    pdf.setProperties({
      title: DOC_META[docKey].title,
      subject: "Kerala Legal Heirship Certificate – application assistance printout",
      creator: "Nexia Virtual Desk",
    });

    return pdf.output("blob");
  } finally {
    try {
      root.unmount();
    } catch {
      /* ignore */
    }
    host.remove();
  }
}

export interface GeneratedPdf {
  blob: Blob;
  url: string;
  filename: string;
  mode: "overlay" | "reproduction";
  pages: number;
}

export async function generatePdf(docKey: DocKey, data: FormData): Promise<GeneratedPdf> {
  const manifest = await loadManifest();
  if (manifest) {
    try {
      const overlaid = await overlayTemplate(docKey, data, manifest);
      if (overlaid) {
        return {
          blob: overlaid,
          url: URL.createObjectURL(overlaid),
          filename: DOC_META[docKey].filename,
          mode: "overlay",
          pages: 0,
        };
      }
    } catch {
      /* fall through to the built-in reproduction */
    }
  }
  const blob = await renderReproductionPdf(docKey, data);
  return {
    blob,
    url: URL.createObjectURL(blob),
    filename: DOC_META[docKey].filename,
    mode: "reproduction",
    pages: 0,
  };
}
