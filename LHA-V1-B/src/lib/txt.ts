import type { FormData } from "./types";
import { DOC_STATUS_LABEL } from "./types";
import { asIs, formatAadhaar, formatDate, joinAddress, up, upMultiline } from "./format";

const LINE = "=".repeat(68);
const THIN = "-".repeat(68);

function kv(label: string, value: string): string {
  return `${label}: ${value || "(NOT PROVIDED)"}`;
}

function header(title: string, subtitle: string): string {
  return [
    LINE,
    title,
    subtitle,
    `Generated: ${new Date().toLocaleString("en-IN")}`,
    LINE,
    "",
    "NOTE: Nexia Virtual Desk is a private application assistance service.",
    "It is not affiliated with, nor does it represent, the Government of Kerala.",
    "This file is a manual data-entry aid only. Always re-check the live field",
    "list on https://edistrict.kerala.gov.in/ before typing anything in.",
    "",
  ].join("\n");
}

export function buildOnlineApplicationTxt(data: FormData): string {
  const a = data.applicant;
  const d = data.deceased;
  const doc = data.documents;
  const out: string[] = [];

  out.push(
    header(
      "NEXIA VIRTUAL DESK — e-DISTRICT ONLINE APPLICATION DATA",
      "Service: Legal Heirship Certificate (Kerala)"
    )
  );

  out.push(THIN, "SECTION 1 — APPLICANT DETAILS", THIN);
  out.push(kv("FULL NAME (AS PER AADHAAR)", up(a.fullName)));
  out.push(kv("DATE OF BIRTH", formatDate(a.dob)));
  out.push(kv("RELATIONSHIP WITH DECEASED", up(a.relationToDeceased)));
  out.push(kv("MOBILE NUMBER", asIs(a.mobile)));
  out.push(kv("EMAIL ADDRESS", asIs(a.email)));
  out.push(kv("RATION CARD NUMBER", up(a.rationCardNumber)));
  out.push(kv("ELECTION ID / VOTER ID", up(a.electionId)));
  out.push("");

  out.push(THIN, "SECTION 2 — APPLICANT ADDRESS", THIN);
  out.push(kv("WARD / DIVISION NUMBER", up(a.wardNumber)));
  out.push(kv("HOUSE NUMBER", up(a.houseNumber)));
  out.push(kv("HOUSE NAME", up(a.houseName)));
  out.push(kv("LOCALITY", up(a.locality)));
  out.push(kv("PLACE", up(a.place)));
  out.push(kv("POST OFFICE", up(a.postOffice)));
  out.push(kv("PIN CODE", asIs(a.pinCode)));
  out.push(kv("VILLAGE", up(a.village)));
  out.push(kv("TALUK", up(a.taluk)));
  out.push(kv("DISTRICT", up(a.district)));
  out.push(kv("STATE", up(a.state)));
  out.push(kv("FULL ADDRESS (SINGLE LINE)", joinAddress([
    a.houseNumber && `${a.houseNumber}`,
    a.houseName,
    a.locality,
    a.place,
    a.postOffice && `${a.postOffice} P.O`,
    a.pinCode && `PIN ${a.pinCode}`,
    a.village && `${a.village} VILLAGE`,
    a.taluk && `${a.taluk} TALUK`,
    a.district,
    a.state,
  ])));
  out.push("");

  out.push(THIN, "SECTION 3 — DECEASED PERSON DETAILS", THIN);
  out.push(kv("FULL NAME OF DECEASED", up(d.fullName)));
  out.push(kv("AGE AT TIME OF DEATH", asIs(d.age)));
  out.push(kv("OCCUPATION BEFORE DEATH", up(d.occupationBeforeDeath)));
  out.push(kv("ADDRESS OF DECEASED", upMultiline(d.address).replace(/\n/g, ", ")));
  out.push(kv("DATE OF DEMISE", formatDate(d.dateOfDemise)));
  out.push(kv("PLACE OF DEMISE", up(d.placeOfDemise)));
  out.push(kv("DEATH CERTIFICATE NUMBER", up(d.deathCertificateNumber)));
  out.push(kv("DEATH REGISTERING AUTHORITY", up(d.deathRegistrationAuthority)));
  out.push("");

  out.push(THIN, `SECTION 4 — LEGAL HEIRS / CLAIMANTS (TOTAL: ${data.heirs.length})`, THIN);
  if (data.heirs.length === 0) {
    out.push("(NO LEGAL HEIR ENTERED)");
  }
  data.heirs.forEach((h, i) => {
    out.push("");
    out.push(`--- LEGAL HEIR ${i + 1} ---`);
    out.push(kv("NAME", up(h.fullName)));
    out.push(kv("GENDER", up(h.gender)));
    out.push(kv("AGE", asIs(h.age)));
    out.push(kv("RELATIONSHIP TO DECEASED", up(h.relationship)));
    out.push(kv("MARITAL STATUS", up(h.maritalStatus)));
    out.push(kv("OCCUPATION", up(h.occupation)));
    out.push(kv("ADDRESS", upMultiline(h.address).replace(/\n/g, ", ")));
    out.push(kv("PHONE NUMBER", asIs(h.phone)));
    out.push(kv("MINOR", h.isMinor ? "YES" : "NO"));
    if (h.isMinor) out.push(kv("GUARDIAN NAME", up(h.guardianName)));
    if (h.remarks) out.push(kv("REMARKS", up(h.remarks)));
  });
  out.push("");
  out.push("NOTE: Aadhaar numbers of heirs are intentionally NOT included in this");
  out.push("file. They are listed only in Nexia_Aadhaar_Documents_Checklist.txt.");
  out.push("");

  out.push(THIN, "SECTION 5 — WITNESSES", THIN);
  data.witnesses.forEach((w, i) => {
    if (!w.fullName.trim()) {
      out.push("", `--- WITNESS ${i + 1} --- (NOT ENTERED)`);
      return;
    }
    out.push("");
    out.push(`--- WITNESS ${i + 1} ---`);
    out.push(kv("NAME", up(w.fullName)));
    out.push(kv("FATHER'S / HUSBAND'S NAME", up(w.guardianName)));
    out.push(kv("AGE", asIs(w.age)));
    out.push(kv("OCCUPATION", up(w.occupation)));
    out.push(kv("ADDRESS", upMultiline(w.address).replace(/\n/g, ", ")));
    out.push(kv("PHONE NUMBER", asIs(w.phone)));
    out.push(kv("HOW THE WITNESS KNOWS THE FAMILY", up(w.relationToFamily)));
  });
  out.push("");

  out.push(THIN, "SECTION 6 — APPLICATION / DECLARATION", THIN);
  out.push(kv("PURPOSE OF CERTIFICATE", up(doc.purpose)));
  out.push(kv("SUBMITTING OFFICE", up(doc.submissionOffice)));
  out.push(kv("DECLARATION PLACE", up(doc.declarationPlace)));
  out.push(kv("DECLARATION DATE", formatDate(doc.declarationDate)));
  if (doc.operatorRemarks) out.push(kv("OPERATOR REMARKS", up(doc.operatorRemarks)));
  out.push("");

  out.push(THIN, "SECTION 7 — OPERATOR REMINDERS", THIN);
  out.push("[ ] Log in to the e-District portal using the CUSTOMER'S OWN credentials.");
  out.push("[ ] Nexia never stores portal usernames, passwords or OTPs.");
  out.push("[ ] Verify every value above against the original documents.");
  out.push("[ ] Upload scanned supporting documents as required by the portal.");
  out.push("[ ] Print the three application PDFs and collect handwritten signatures.");
  out.push("[ ] Submit the signed set at the Village Office / Taluk Office.");
  out.push("");
  out.push(LINE);
  out.push("END OF FILE — Nexia Virtual Desk | Your online application supporting team");
  out.push(LINE);

  return out.join("\n");
}

export function buildChecklistTxt(data: FormData): string {
  const a = data.applicant;
  const doc = data.documents;
  const out: string[] = [];
  const st = (s: keyof typeof DOC_STATUS_LABEL | string) =>
    DOC_STATUS_LABEL[s as keyof typeof DOC_STATUS_LABEL] ?? "TO BE VERIFIED";

  out.push(
    header(
      "NEXIA VIRTUAL DESK — AADHAAR & SUPPORTING DOCUMENT CHECKLIST",
      "INTERNAL VERIFICATION AID — NOT A GOVERNMENT DOCUMENT"
    )
  );
  out.push("CONFIDENTIAL: this file contains full Aadhaar numbers.");
  out.push("Keep it offline, share it only with the customer, and delete it when done.");
  out.push("");

  out.push(THIN, "1. APPLICANT", THIN);
  out.push(`PERSON: ${up(a.fullName) || "(NOT PROVIDED)"}`);
  out.push(`RELATIONSHIP / ROLE: APPLICANT${a.relationToDeceased ? ` (${up(a.relationToDeceased)} OF DECEASED)` : ""}`);
  out.push(`AADHAAR NUMBER: ${formatAadhaar(a.aadhaar) || "(NOT PROVIDED)"}`);
  out.push(`AADHAAR DOCUMENT STATUS: ${st(doc.applicantAadhaar)}`);
  out.push(`VOTER ID NUMBER: ${up(a.electionId) || "(NOT PROVIDED)"}`);
  out.push(`VOTER ID DOCUMENT STATUS: ${st(doc.applicantVoterId)}`);
  out.push(`RATION CARD NUMBER: ${up(a.rationCardNumber) || "(NOT PROVIDED)"}`);
  out.push(`RATION CARD STATUS: ${st(doc.rationCard)}`);
  out.push(`MOBILE: ${asIs(a.mobile) || "(NOT PROVIDED)"}`);
  out.push("");

  out.push(THIN, "2. DECEASED PERSON", THIN);
  out.push(`PERSON: ${up(data.deceased.fullName) || "(NOT PROVIDED)"}`);
  out.push(`RELATIONSHIP / ROLE: DECEASED`);
  out.push(`DATE OF DEMISE: ${formatDate(data.deceased.dateOfDemise) || "(NOT PROVIDED)"}`);
  out.push(`DEATH CERTIFICATE NUMBER: ${up(data.deceased.deathCertificateNumber) || "(NOT PROVIDED)"}`);
  out.push(`DEATH CERTIFICATE STATUS: ${st(doc.deathCertificate)}`);
  out.push("");

  out.push(THIN, `3. LEGAL HEIRS / CLAIMANTS (${data.heirs.length})`, THIN);
  data.heirs.forEach((h, i) => {
    out.push("");
    out.push(`PERSON: ${up(h.fullName) || "(NOT PROVIDED)"}`);
    out.push(`RELATIONSHIP / ROLE: LEGAL HEIR ${i + 1} — ${up(h.relationship) || "RELATIONSHIP NOT PROVIDED"}`);
    out.push(`AADHAAR NUMBER: ${formatAadhaar(h.aadhaar) || "(NOT PROVIDED)"}`);
    out.push(`AADHAAR DOCUMENT STATUS: ${st(h.aadhaarDocStatus)}`);
    out.push(
      `OTHER REQUIRED DOCUMENTS: ${
        h.isMinor
          ? `GUARDIAN PROOF — ${st(doc.minorGuardianProof)} (MINOR, GUARDIAN: ${up(h.guardianName) || "NOT PROVIDED"})`
          : `RELATIONSHIP PROOF — ${st(doc.relationshipProof)}`
      }`
    );
    out.push(`REMARKS: ${up(h.remarks) || "—"}`);
  });
  out.push("");

  out.push(THIN, "4. WITNESSES", THIN);
  data.witnesses.forEach((w, i) => {
    out.push("");
    if (!w.fullName.trim()) {
      out.push(`PERSON: (WITNESS ${i + 1} NOT ENTERED)`);
      out.push(`RELATIONSHIP / ROLE: WITNESS ${i + 1}`);
      out.push(`AADHAAR NUMBER: (NOT PROVIDED)`);
      out.push(`AADHAAR DOCUMENT STATUS: NOT AVAILABLE`);
      out.push(`REMARKS: PENDING — WITNESS DETAILS REQUIRED`);
      return;
    }
    out.push(`PERSON: ${up(w.fullName)}`);
    out.push(`RELATIONSHIP / ROLE: WITNESS ${i + 1}${w.relationToFamily ? ` — ${up(w.relationToFamily)}` : ""}`);
    out.push(`AADHAAR NUMBER: ${formatAadhaar(w.aadhaar) || "(NOT PROVIDED)"}`);
    out.push(`AADHAAR DOCUMENT STATUS: ${st(w.aadhaarDocStatus)}`);
    out.push(`OTHER REQUIRED DOCUMENTS: ADDRESS PROOF — ${st(doc.addressProof)}`);
    out.push(`REMARKS: ${up(w.remarks) || "—"}`);
  });
  out.push("");

  out.push(THIN, "5. COMMON SUPPORTING DOCUMENTS", THIN);
  out.push(`APPLICANT AADHAAR COPY ............. ${st(doc.applicantAadhaar)}`);
  out.push(`APPLICANT VOTER ID COPY ............ ${st(doc.applicantVoterId)}`);
  out.push(`RATION CARD COPY ................... ${st(doc.rationCard)}`);
  out.push(`DEATH CERTIFICATE COPY ............. ${st(doc.deathCertificate)}`);
  out.push(`ADDRESS PROOF ...................... ${st(doc.addressProof)}`);
  out.push(`RELATIONSHIP PROOF ................. ${st(doc.relationshipProof)}`);
  out.push(`GUARDIAN PROOF (IF MINOR HEIR) ..... ${st(doc.minorGuardianProof)}`);
  if (doc.otherDocumentName) {
    out.push(`${up(doc.otherDocumentName).padEnd(35, ".")} ${st(doc.otherDocumentStatus)}`);
  }
  out.push("");

  const pending: string[] = [];
  const add = (label: string, s: string) => {
    if (s === "TO_BE_VERIFIED" || s === "NOT_AVAILABLE") pending.push(`${label} — ${st(s)}`);
  };
  add("APPLICANT AADHAAR", doc.applicantAadhaar);
  add("APPLICANT VOTER ID", doc.applicantVoterId);
  add("RATION CARD", doc.rationCard);
  add("DEATH CERTIFICATE", doc.deathCertificate);
  add("ADDRESS PROOF", doc.addressProof);
  add("RELATIONSHIP PROOF", doc.relationshipProof);
  data.heirs.forEach((h, i) => add(`HEIR ${i + 1} AADHAAR (${up(h.fullName) || "NO NAME"})`, h.aadhaarDocStatus));
  data.witnesses.forEach((w, i) =>
    add(`WITNESS ${i + 1} AADHAAR (${up(w.fullName) || "NO NAME"})`, w.aadhaarDocStatus)
  );

  out.push(THIN, "6. FINAL REVIEW CHECKLIST FOR THE OPERATOR", THIN);
  if (pending.length === 0) {
    out.push("All listed documents are marked AVAILABLE or NOT APPLICABLE.");
    out.push("Physical verification against the originals is still required.");
  } else {
    out.push("PENDING / UNVERIFIED ITEMS:");
    pending.forEach((p) => out.push(`  [ ] ${p}`));
  }
  out.push("");
  out.push("SIGN-OFF CHECKLIST:");
  out.push("  [ ] Originals physically sighted and compared with the copies");
  out.push("  [ ] Name spelling identical across Aadhaar, ration card and death certificate");
  out.push("  [ ] All legal heirs of the deceased are listed — nobody omitted");
  out.push("  [ ] Main Application PDF printed and signed by the applicant");
  out.push("  [ ] Legal Heir Form PDF signed by every claimant / guardian");
  out.push("  [ ] Witness Form PDF signed by both witnesses");
  out.push("  [ ] Customer informed about the village office enquiry process");
  out.push("");
  if (doc.operatorRemarks) {
    out.push(`OPERATOR REMARKS: ${up(doc.operatorRemarks)}`);
    out.push("");
  }
  out.push("A selection of 'Available' is a CUSTOMER DECLARATION only.");
  out.push("It does NOT mean the document has been verified by Nexia Virtual Desk.");
  out.push("");
  out.push(LINE);
  out.push("END OF FILE — internal assistance document, not an official certificate.");
  out.push(LINE);

  return out.join("\n");
}
