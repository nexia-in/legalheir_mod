/**
 * Helper to uppercase English alphabetic characters while preserving
 * Malayalam unicode characters, digits, spaces, and punctuation untouched.
 */
export function toUpperEnglish(text: string | null | undefined): string {
  if (!text) return "";
  // In JavaScript, .toUpperCase() converts ASCII and latin characters to uppercase
  // and does not alter Malayalam or other non-cased unicode scripts.
  return String(text).toUpperCase();
}

/**
 * For email addresses, preserve lower-case or standard email casing.
 */
export function formatEmail(email: string | null | undefined): string {
  if (!email) return "";
  return String(email).trim().toLowerCase();
}

/**
 * Mask 12-digit Aadhaar number for security (shows last 4 digits only unless unmasked).
 * e.g., "7845 1236 9854" -> "XXXX XXXX 9854"
 */
export function maskAadhaar(aadhaar: string | null | undefined, showFull = false): string {
  if (!aadhaar) return "";
  const cleaned = aadhaar.replace(/\s+/g, "");
  if (showFull) {
    if (cleaned.length === 12) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
    }
    return cleaned;
  }
  if (cleaned.length >= 4) {
    const lastFour = cleaned.slice(-4);
    return `•••• •••• ${lastFour}`;
  }
  return "•••• •••• ••••";
}

/**
 * Format standard date string (YYYY-MM-DD) into DD-MM-YYYY
 */
export function formatDateKerala(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return dateStr;
}

/**
 * Format Phone Number with spacing
 */
export function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}
