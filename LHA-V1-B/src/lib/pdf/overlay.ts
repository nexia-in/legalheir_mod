import type { FormData } from "@/lib/types";
import { flattenValues } from "./values";

export type DocKey = "main" | "heir" | "witness";

interface FieldSpec {
  key: string; // dotted key resolved from flattenValues()
  page: number; // 0-based page index of the template PDF
  x: number; // pt from left
  y: number; // pt from bottom (pdf-lib origin)
  size?: number;
  maxWidth?: number;
}

interface TemplateSpec {
  file: string;
  fields: FieldSpec[];
}

export type Manifest = Partial<Record<DocKey, TemplateSpec>> & { enabled?: boolean };

let manifestCache: Manifest | null | undefined;

/**
 * Optional overlay mode.
 *
 * If the operator drops the three original scanned PDFs into
 * `public/templates/` together with a calibrated `manifest.json`, the entered
 * data is stamped directly onto the official scans. When the manifest is
 * absent (the default), `null` is returned and the app falls back to the
 * built-in print-ready reproduction.
 */
export async function loadManifest(): Promise<Manifest | null> {
  if (manifestCache !== undefined) return manifestCache ?? null;
  try {
    const res = await fetch("/templates/manifest.json", { cache: "no-store" });
    if (!res.ok) {
      manifestCache = null;
      return null;
    }
    const json = (await res.json()) as Manifest;
    manifestCache = json && json.enabled ? json : null;
  } catch {
    manifestCache = null;
  }
  return manifestCache ?? null;
}

/** Latin-1 only — the standard PDF fonts cannot encode Malayalam. */
function sanitize(text: string): string {
  return text.replace(/[^\u0000-\u00FF]/g, "").trim();
}

export async function overlayTemplate(
  docKey: DocKey,
  data: FormData,
  manifest: Manifest
): Promise<Blob | null> {
  const spec = manifest[docKey];
  if (!spec) return null;

  const res = await fetch(`/templates/${encodeURIComponent(spec.file)}`, { cache: "no-store" });
  if (!res.ok) return null;
  const bytes = await res.arrayBuffer();

  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const values = flattenValues(data);
  const pages = pdf.getPages();

  for (const f of spec.fields) {
    const page = pages[f.page];
    if (!page) continue;
    const raw = values[f.key];
    if (!raw) continue;
    const size = f.size ?? 10;
    let text = sanitize(raw);
    if (f.maxWidth) {
      while (text.length > 1 && font.widthOfTextAtSize(text, size) > f.maxWidth) {
        text = text.slice(0, -1);
      }
    }
    if (!text) continue;
    page.drawText(text, { x: f.x, y: f.y, size, font, color: rgb(0, 0, 0) });
  }

  const outBytes = await pdf.save();
  return new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
}
