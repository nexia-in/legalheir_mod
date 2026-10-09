/**
 * Text helpers.
 *
 * Rule from the specification: every English value that goes into a generated
 * document must be upper-cased. Malayalam code points have no case mapping, so
 * `String.prototype.toUpperCase()` leaves them untouched — Malayalam entered by
 * the user is therefore preserved byte-for-byte.
 *
 * Identifiers that must not be altered (e-mail addresses) are passed through
 * `preserveCase`.
 */

export function up(value: string | undefined | null): string {
  if (!value) return "";
  return String(value).replace(/\s+/g, " ").trim().toUpperCase();
}

/** Multi-line safe uppercase (keeps newlines, trims each line). */
export function upMultiline(value: string | undefined | null): string {
  if (!value) return "";
  return String(value)
    .split(/\r?\n/)
    .map((l) => l.replace(/[ \t]+/g, " ").trim().toUpperCase())
    .join("\n")
    .trim();
}

/** Values that must not be case-folded or re-spaced (e-mail etc.). */
export function asIs(value: string | undefined | null): string {
  if (!value) return "";
  return String(value).trim();
}

export function orDash(value: string): string {
  return value && value.length > 0 ? value : "—";
}

export function orBlank(value: string): string {
  return value && value.length > 0 ? value : "";
}

/** 1234 5678 9012 grouping, digits only. */
export function formatAadhaar(value: string): string {
  const digits = (value || "").replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

/** Masked for on-screen display: XXXX XXXX 9012 */
export function maskAadhaar(value: string): string {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 4) return digits;
  const last4 = digits.slice(-4);
  return `XXXX XXXX ${last4}`;
}

export function isValidAadhaar(value: string): boolean {
  return /^\d{12}$/.test((value || "").replace(/\D/g, ""));
}

export function isValidMobile(value: string): boolean {
  return /^[6-9]\d{9}$/.test((value || "").replace(/\D/g, ""));
}

export function isValidPin(value: string): boolean {
  return /^\d{6}$/.test((value || "").replace(/\D/g, ""));
}

export function isValidEmail(value: string): boolean {
  if (!value) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** dd-mm-yyyy from an ISO yyyy-mm-dd input value. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return iso.trim().toUpperCase();
  return `${m[3]}-${m[2]}-${m[1]}`;
}

export function todayIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function timestampForFile(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

/** Joins non-empty address parts with commas, upper-cased. */
export function joinAddress(parts: (string | undefined)[]): string {
  return parts
    .map((p) => up(p || ""))
    .filter((p) => p.length > 0)
    .join(", ");
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke a tick later so Safari/Android Chrome have time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function downloadText(text: string, filename: string): void {
  downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
}
