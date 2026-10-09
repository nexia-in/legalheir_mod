import type { FormData } from "./types";
import { isValidAadhaar, isValidEmail, isValidMobile, isValidPin } from "./format";

export type Severity = "error" | "warning";

export interface Issue {
  step: number; // 0-based wizard step index
  field: string; // dom id for focus/scroll
  label: string;
  message: string;
  severity: Severity;
}

export const STEP_TITLES = [
  "Applicant Details",
  "Deceased Person Details",
  "Legal Heirs / Claimants",
  "Witness Details",
  "Supporting Documents",
  "Review & Download",
];

function req(
  issues: Issue[],
  step: number,
  field: string,
  label: string,
  value: string,
  message = "This field is required"
) {
  if (!value || !value.trim()) {
    issues.push({ step, field, label, message, severity: "error" });
  }
}

export function validateAll(data: FormData): Issue[] {
  const issues: Issue[] = [];
  const a = data.applicant;

  // ---- Step 0: applicant -------------------------------------------------
  req(issues, 0, "applicant-fullName", "Applicant full name", a.fullName);
  req(issues, 0, "applicant-aadhaar", "Applicant Aadhaar number", a.aadhaar);
  if (a.aadhaar && !isValidAadhaar(a.aadhaar)) {
    issues.push({
      step: 0,
      field: "applicant-aadhaar",
      label: "Applicant Aadhaar number",
      message: "Aadhaar must be exactly 12 digits",
      severity: "error",
    });
  }
  req(issues, 0, "applicant-mobile", "Mobile number", a.mobile);
  if (a.mobile && !isValidMobile(a.mobile)) {
    issues.push({
      step: 0,
      field: "applicant-mobile",
      label: "Mobile number",
      message: "Enter a valid 10-digit Indian mobile number",
      severity: "error",
    });
  }
  if (a.email && !isValidEmail(a.email)) {
    issues.push({
      step: 0,
      field: "applicant-email",
      label: "Email address",
      message: "Enter a valid email address",
      severity: "error",
    });
  }
  req(issues, 0, "applicant-houseName", "House name", a.houseName);
  req(issues, 0, "applicant-place", "Place", a.place);
  req(issues, 0, "applicant-postOffice", "Post office", a.postOffice);
  req(issues, 0, "applicant-pinCode", "PIN code", a.pinCode);
  if (a.pinCode && !isValidPin(a.pinCode)) {
    issues.push({
      step: 0,
      field: "applicant-pinCode",
      label: "PIN code",
      message: "PIN code must be 6 digits",
      severity: "error",
    });
  }
  req(issues, 0, "applicant-village", "Village", a.village);
  req(issues, 0, "applicant-district", "District", a.district);
  req(issues, 0, "applicant-relationToDeceased", "Relationship to deceased", a.relationToDeceased);

  if (!a.rationCardNumber.trim()) {
    issues.push({
      step: 0,
      field: "applicant-rationCardNumber",
      label: "Ration card number",
      message: "Village offices usually ask for the ration card number — add it if available",
      severity: "warning",
    });
  }
  if (!a.taluk.trim()) {
    issues.push({
      step: 0,
      field: "applicant-taluk",
      label: "Taluk",
      message: "Taluk is normally printed on the application — add it if known",
      severity: "warning",
    });
  }

  // ---- Step 1: deceased --------------------------------------------------
  const d = data.deceased;
  req(issues, 1, "deceased-fullName", "Deceased full name", d.fullName);
  req(issues, 1, "deceased-address", "Deceased address", d.address);
  req(issues, 1, "deceased-dateOfDemise", "Date of demise", d.dateOfDemise);
  req(issues, 1, "deceased-placeOfDemise", "Place of demise", d.placeOfDemise);
  if (!d.deathCertificateNumber.trim()) {
    issues.push({
      step: 1,
      field: "deceased-deathCertificateNumber",
      label: "Death certificate number",
      message: "Death certificate number is usually mandatory at the village office",
      severity: "warning",
    });
  }

  // ---- Step 2: heirs -----------------------------------------------------
  if (data.heirs.length === 0) {
    issues.push({
      step: 2,
      field: "heirs-section",
      label: "Legal heirs",
      message: "At least one legal heir must be added",
      severity: "error",
    });
  }
  data.heirs.forEach((h, i) => {
    const n = i + 1;
    req(issues, 2, `heir-${h.id}-fullName`, `Heir ${n}: full name`, h.fullName);
    req(issues, 2, `heir-${h.id}-relationship`, `Heir ${n}: relationship`, h.relationship);
    req(issues, 2, `heir-${h.id}-age`, `Heir ${n}: age`, h.age);
    if (!h.gender) {
      issues.push({
        step: 2,
        field: `heir-${h.id}-gender`,
        label: `Heir ${n}: gender`,
        message: "Select a gender",
        severity: "error",
      });
    }
    req(issues, 2, `heir-${h.id}-address`, `Heir ${n}: address`, h.address);
    if (h.aadhaar && !isValidAadhaar(h.aadhaar)) {
      issues.push({
        step: 2,
        field: `heir-${h.id}-aadhaar`,
        label: `Heir ${n}: Aadhaar`,
        message: "Aadhaar must be exactly 12 digits",
        severity: "error",
      });
    }
    if (!h.aadhaar) {
      issues.push({
        step: 2,
        field: `heir-${h.id}-aadhaar`,
        label: `Heir ${n}: Aadhaar`,
        message: "Aadhaar is normally required for every heir in the e-District application",
        severity: "warning",
      });
    }
    if (!h.occupation) {
      issues.push({
        step: 2,
        field: `heir-${h.id}-occupation`,
        label: `Heir ${n}: occupation`,
        message: "Optional, but the claimant table has an occupation column",
        severity: "warning",
      });
    }
    if (h.isMinor && !h.guardianName.trim()) {
      issues.push({
        step: 2,
        field: `heir-${h.id}-guardianName`,
        label: `Heir ${n}: guardian`,
        message: "A minor heir must have a guardian name for the signature column",
        severity: "error",
      });
    }
  });

  // ---- Step 3: witnesses -------------------------------------------------
  const filledWitnesses = data.witnesses.filter((w) => w.fullName.trim().length > 0);
  if (filledWitnesses.length < 2) {
    issues.push({
      step: 3,
      field: "witness-section",
      label: "Witnesses",
      message: "Two witnesses are required by the witness form",
      severity: "error",
    });
  }
  data.witnesses.forEach((w, i) => {
    const n = i + 1;
    if (!w.fullName.trim() && !w.address.trim() && !w.aadhaar.trim()) return; // untouched slot
    req(issues, 3, `witness-${w.id}-fullName`, `Witness ${n}: full name`, w.fullName);
    req(issues, 3, `witness-${w.id}-address`, `Witness ${n}: address`, w.address);
    if (w.aadhaar && !isValidAadhaar(w.aadhaar)) {
      issues.push({
        step: 3,
        field: `witness-${w.id}-aadhaar`,
        label: `Witness ${n}: Aadhaar`,
        message: "Aadhaar must be exactly 12 digits",
        severity: "error",
      });
    }
    if (!w.aadhaar) {
      issues.push({
        step: 3,
        field: `witness-${w.id}-aadhaar`,
        label: `Witness ${n}: Aadhaar`,
        message: "Witness Aadhaar is usually asked for at verification",
        severity: "warning",
      });
    }
    if (w.phone && !isValidMobile(w.phone)) {
      issues.push({
        step: 3,
        field: `witness-${w.id}-phone`,
        label: `Witness ${n}: phone`,
        message: "Enter a valid 10-digit mobile number",
        severity: "error",
      });
    }
  });

  // ---- Step 4: documents -------------------------------------------------
  const doc = data.documents;
  req(issues, 4, "doc-purpose", "Purpose of certificate", doc.purpose);
  req(issues, 4, "doc-declarationPlace", "Declaration place", doc.declarationPlace);
  req(issues, 4, "doc-declarationDate", "Declaration date", doc.declarationDate);
  if (!doc.submissionOffice.trim()) {
    issues.push({
      step: 4,
      field: "doc-submissionOffice",
      label: "Submitting office",
      message: "Name the Village Office / Taluk Office the application goes to",
      severity: "warning",
    });
  }

  const pending: string[] = [];
  const check = (label: string, v: string) => {
    if (v === "TO_BE_VERIFIED" || v === "NOT_AVAILABLE") pending.push(label);
  };
  check("Applicant Aadhaar", doc.applicantAadhaar);
  check("Applicant Voter ID", doc.applicantVoterId);
  check("Ration Card", doc.rationCard);
  check("Death Certificate", doc.deathCertificate);
  check("Address Proof", doc.addressProof);
  check("Relationship Proof", doc.relationshipProof);
  data.heirs.forEach((h, i) => check(`Heir ${i + 1} Aadhaar`, h.aadhaarDocStatus));
  data.witnesses.forEach((w, i) => {
    if (w.fullName.trim()) check(`Witness ${i + 1} Aadhaar`, w.aadhaarDocStatus);
  });
  if (pending.length > 0) {
    issues.push({
      step: 4,
      field: "doc-checklist",
      label: "Document checklist",
      message: `${pending.length} document(s) still unverified or missing: ${pending.join(", ")}`,
      severity: "warning",
    });
  }

  return issues;
}

export function errorsOf(issues: Issue[]): Issue[] {
  return issues.filter((i) => i.severity === "error");
}

export function warningsOf(issues: Issue[]): Issue[] {
  return issues.filter((i) => i.severity === "warning");
}

export function issuesForStep(issues: Issue[], step: number): Issue[] {
  return issues.filter((i) => i.step === step);
}
