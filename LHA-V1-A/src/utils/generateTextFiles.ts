import { FullApplicationData } from "@/types";
import { toUpperEnglish, formatDateKerala, formatEmail } from "./textFormatters";

/**
 * Generates plain text formatted for copying and pasting into the Kerala e-District online portal
 * (edistrict.kerala.gov.in) by an operator or Akshaya Centre assistant.
 */
export function generateOnlineApplicationText(data: FullApplicationData): string {
  const border = "=".repeat(75);
  const divider = "-".repeat(75);

  const lines: string[] = [
    border,
    "NEXIA VIRTUAL DESK - KERALA E-DISTRICT DATA ENTRY ASSISTANT",
    "APPLICATION FOR LEGAL HEIRSHIP CERTIFICATE (അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ്)",
    "PORTAL REFERENCE: https://edistrict.kerala.gov.in/",
    border,
    "DISCLAIMER:",
    "This data sheet is prepared by Nexia Virtual Desk to assist in manual data",
    "entry into the official Kerala e-District portal or Akshaya desk.",
    "Verify all spelling against original Aadhaar and Death Certificate before final submission.",
    "",
    "GENERATION DATE: " + new Date().toLocaleString("en-IN"),
    "APPLICATION REF PLACE: " + toUpperEnglish(data.applicationPlace || data.applicant.district),
    "",
    border,
    "SECTION 1: APPLICANT DETAILS (അപേക്ഷകന്റെ വിവരങ്ങൾ)",
    border,
    `FULL NAME (AS PER AADHAAR): ${toUpperEnglish(data.applicant.fullName)}`,
    data.applicant.fullNameMl ? `NAME IN MALAYALAM: ${data.applicant.fullNameMl}` : "",
    `RELATIONSHIP TO DECEASED: ${toUpperEnglish(data.applicant.relationshipToDeceased)}`,
    `GENDER: ${toUpperEnglish(data.applicant.gender)}`,
    `DATE OF BIRTH: ${formatDateKerala(data.applicant.dob)}`,
    `AGE: ${data.applicant.age || "N/A"}`,
    `AADHAAR NUMBER: ${data.applicant.aadhaarNumber}`,
    `VOTER ID / ELECTION CARD NO: ${toUpperEnglish(data.applicant.voterId)}`,
    `RATION CARD NUMBER: ${toUpperEnglish(data.applicant.rationCardNumber)}`,
    `MOBILE NUMBER: ${data.applicant.mobileNumber}`,
    `EMAIL ADDRESS: ${formatEmail(data.applicant.email)}`,
    "",
    "--- APPLICANT ADDRESS DETAILS ---",
    `HOUSE NUMBER: ${toUpperEnglish(data.applicant.houseNumber)}`,
    `HOUSE NAME: ${toUpperEnglish(data.applicant.houseName)}`,
    `LOCALITY / STREET: ${toUpperEnglish(data.applicant.locality)}`,
    `PLACE: ${toUpperEnglish(data.applicant.place)}`,
    `POST OFFICE: ${toUpperEnglish(data.applicant.postOffice)}`,
    `PIN CODE: ${data.applicant.pinCode}`,
    `WARD / DIVISION NO: ${toUpperEnglish(data.applicant.wardNumber)}`,
    `VILLAGE: ${toUpperEnglish(data.applicant.village)}`,
    `TALUK: ${toUpperEnglish(data.applicant.taluk)}`,
    `DISTRICT: ${toUpperEnglish(data.applicant.district)}`,
    `STATE: ${toUpperEnglish(data.applicant.state || "KERALA")}`,
    "",
    border,
    "SECTION 2: DECEASED PERSON DETAILS (മരണപ്പെട്ട വ്യക്തിയുടെ വിവരങ്ങൾ)",
    border,
    `DECEASED FULL NAME: ${toUpperEnglish(data.deceased.fullName)}`,
    data.deceased.fullNameMl ? `NAME IN MALAYALAM: ${data.deceased.fullNameMl}` : "",
    `FATHER / HUSBAND NAME: ${toUpperEnglish(data.deceased.fatherOrHusbandName)}`,
    `GENDER: ${toUpperEnglish(data.deceased.gender)}`,
    data.deceased.dob ? `DATE OF BIRTH: ${formatDateKerala(data.deceased.dob)}` : "",
    `DATE OF DEMISE (DEATH): ${formatDateKerala(data.deceased.dateOfDemise)}`,
    `PLACE OF DEMISE: ${toUpperEnglish(data.deceased.placeOfDemise)}`,
    `DEATH CERTIFICATE NUMBER: ${toUpperEnglish(data.deceased.deathCertificateNumber)}`,
    `DEATH CERTIFICATE DATE: ${formatDateKerala(data.deceased.deathCertificateDate)}`,
    `REGISTRATION LOCAL BODY: ${toUpperEnglish(data.deceased.deathRegistrarAuthority)}`,
    `PERMANENT ADDRESS: ${toUpperEnglish(data.deceased.permanentAddress)}`,
    `RELIGION: ${toUpperEnglish(data.deceased.religion)}`,
    `CASTE / COMMUNITY: ${toUpperEnglish(data.deceased.caste)}`,
    `MARITAL STATUS: ${toUpperEnglish(data.deceased.maritalStatus)}`,
    `FORMER OCCUPATION: ${toUpperEnglish(data.deceased.occupation)}`,
    `PURPOSE OF CERTIFICATE: ${toUpperEnglish(data.deceased.purposeOfCertificate)}`,
    `CLAIM / ASSET PARTICULARS: ${toUpperEnglish(data.deceased.claimParticulars)}`,
    "",
    border,
    `SECTION 3: LEGAL HEIRS / CLAIMANTS (TOTAL HEIRS: ${data.heirs.length})`,
    border,
  ];

  if (data.heirs.length === 0) {
    lines.push("NO LEGAL HEIRS ENTERED YET. PLEASE ADD HEIRS BEFORE SUBMITTING.");
  } else {
    data.heirs.forEach((heir, idx) => {
      lines.push(`[LEGAL HEIR #${idx + 1}]`);
      lines.push(`NAME: ${toUpperEnglish(heir.fullName)}`);
      if (heir.fullNameMl) lines.push(`NAME IN MALAYALAM: ${heir.fullNameMl}`);
      lines.push(`RELATIONSHIP TO DECEASED: ${toUpperEnglish(heir.relationship)}`);
      lines.push(`GENDER: ${toUpperEnglish(heir.gender)}`);
      lines.push(`AGE: ${heir.age}`);
      if (heir.dob) lines.push(`DATE OF BIRTH: ${formatDateKerala(heir.dob)}`);
      lines.push(`MARITAL STATUS: ${toUpperEnglish(heir.maritalStatus)}`);
      lines.push(`OCCUPATION: ${toUpperEnglish(heir.occupation)}`);
      lines.push(`AADHAAR NUMBER: ${heir.aadhaarNumber || "NOT SPECIFIED"}`);
      lines.push(`PHONE NUMBER: ${heir.phone}`);
      lines.push(`FULL ADDRESS: ${toUpperEnglish(heir.address)}`);
      lines.push(`IS PRIMARY APPLICANT: ${heir.isApplicant ? "YES" : "NO"}`);
      lines.push(`IS MINOR: ${heir.isMinor ? "YES (GUARDIAN: " + toUpperEnglish(heir.guardianName) + ")" : "NO"}`);
      lines.push(`RELINQUISHING SHARE (NOC): ${heir.relinquishShare ? "YES" : "NO"}`);
      lines.push(divider);
    });
  }

  lines.push(
    "",
    border,
    "SECTION 4: LOCAL WITNESSES (സ്വതന്ത്ര സാക്ഷികൾ)",
    border,
    "[WITNESS 1]",
    `FULL NAME: ${toUpperEnglish(data.witness1.fullName)}`,
    `FATHER / HUSBAND NAME: ${toUpperEnglish(data.witness1.fatherOrHusbandName)}`,
    `AGE: ${data.witness1.age}`,
    `GENDER: ${toUpperEnglish(data.witness1.gender)}`,
    `OCCUPATION: ${toUpperEnglish(data.witness1.occupation)}`,
    `AADHAAR NUMBER: ${data.witness1.aadhaarNumber}`,
    `MOBILE NUMBER: ${data.witness1.mobileNumber}`,
    `HOUSE NAME: ${toUpperEnglish(data.witness1.houseName)}`,
    `LOCALITY: ${toUpperEnglish(data.witness1.locality)}`,
    `PLACE: ${toUpperEnglish(data.witness1.place)}`,
    `POST OFFICE: ${toUpperEnglish(data.witness1.postOffice)}`,
    `PIN CODE: ${data.witness1.pinCode}`,
    `VILLAGE: ${toUpperEnglish(data.witness1.village)}`,
    `TALUK: ${toUpperEnglish(data.witness1.taluk)}`,
    `DISTRICT: ${toUpperEnglish(data.witness1.district)}`,
    `YEARS KNOWN TO FAMILY: ${data.witness1.yearsKnown} YEARS`,
    "",
    divider,
    "[WITNESS 2]",
    `FULL NAME: ${toUpperEnglish(data.witness2.fullName)}`,
    `FATHER / HUSBAND NAME: ${toUpperEnglish(data.witness2.fatherOrHusbandName)}`,
    `AGE: ${data.witness2.age}`,
    `GENDER: ${toUpperEnglish(data.witness2.gender)}`,
    `OCCUPATION: ${toUpperEnglish(data.witness2.occupation)}`,
    `AADHAAR NUMBER: ${data.witness2.aadhaarNumber}`,
    `MOBILE NUMBER: ${data.witness2.mobileNumber}`,
    `HOUSE NAME: ${toUpperEnglish(data.witness2.houseName)}`,
    `LOCALITY: ${toUpperEnglish(data.witness2.locality)}`,
    `PLACE: ${toUpperEnglish(data.witness2.place)}`,
    `POST OFFICE: ${toUpperEnglish(data.witness2.postOffice)}`,
    `PIN CODE: ${data.witness2.pinCode}`,
    `VILLAGE: ${toUpperEnglish(data.witness2.village)}`,
    `TALUK: ${toUpperEnglish(data.witness2.taluk)}`,
    `DISTRICT: ${toUpperEnglish(data.witness2.district)}`,
    `YEARS KNOWN TO FAMILY: ${data.witness2.yearsKnown} YEARS`,
    "",
    border,
    "SECTION 5: APPLICATION REMARKS & SUBMISSION CHECKLIST",
    border,
    "1. Ensure physical forms (Main Application, Heirs Schedule, Witness Statement)",
    "   are printed on A4 paper and physically signed by applicant, all legal heirs, and witnesses.",
    "2. Affix Court Fee Stamp (Rs 5/-) on the Main Application.",
    "3. Upload scanned PDF of physical application + death cert + ration card + Aadhaar proofs",
    "   on the e-District Kerala portal (or submit via Akshaya Centre).",
    "4. For assistance or verification, contact Nexia Virtual Desk: +91 9961850698",
    border
  );

  return lines.filter((l) => l !== "").join("\n");
}

/**
 * Generates plain text structured checklist for Aadhaar verification and supporting documents.
 * Completely separate from the official application PDFs.
 */
export function generateAadhaarChecklistText(data: FullApplicationData): string {
  const border = "=".repeat(75);
  const divider = "-".repeat(75);

  const lines: string[] = [
    border,
    "NEXIA VIRTUAL DESK - AADHAAR & SUPPORTING DOCUMENTS VERIFICATION CHECKLIST",
    "INTERNAL VERIFICATION DOCUMENT (NOT AN OFFICIAL CERTIFICATE)",
    border,
    "This document summarizes Aadhaar credentials, ID proofs, and document readiness",
    "for the Kerala Legal Heirship Certificate application.",
    "Do NOT submit this file to the Revenue Department. It is for internal file auditing.",
    "",
    "DATE: " + new Date().toLocaleString("en-IN"),
    "DECEASED PERSON: " + toUpperEnglish(data.deceased.fullName),
    "DEATH CERTIFICATE NO: " + toUpperEnglish(data.deceased.deathCertificateNumber || "PENDING"),
    "",
    border,
    "INDIVIDUAL IDENTITY & AADHAAR STATUS RECORDS",
    border,
    "",
  ];

  // 1. Applicant
  const appAadhaarDoc = data.documents.find((d) => d.id === "doc-applicant-aadhaar");
  const appVoterDoc = data.documents.find((d) => d.id === "doc-applicant-voter");
  lines.push(
    `PERSON: ${toUpperEnglish(data.applicant.fullName)}`,
    `RELATIONSHIP / ROLE: PRIMARY APPLICANT (${toUpperEnglish(data.applicant.relationshipToDeceased)})`,
    `AADHAAR NUMBER: ${data.applicant.aadhaarNumber || "NOT PROVIDED"}`,
    `AADHAAR DOCUMENT STATUS: ${appAadhaarDoc ? appAadhaarDoc.status : "Available"}`,
    `VOTER ID STATUS: ${appVoterDoc ? appVoterDoc.status : "Available"} (ID: ${toUpperEnglish(data.applicant.voterId)})`,
    `PHONE: ${data.applicant.mobileNumber}`,
    `REMARKS: Primary signatory on Form 1 (Main Application)`,
    divider
  );

  // 2. Each Legal Heir
  data.heirs.forEach((heir, idx) => {
    const heirDoc = data.documents.find(
      (d) => d.category === "HEIR" && (d.relatedPerson === heir.fullName || d.id === `doc-heir-${idx + 1}-aadhaar`)
    );
    lines.push(
      `PERSON: ${toUpperEnglish(heir.fullName)}`,
      `RELATIONSHIP / ROLE: LEGAL HEIR #${idx + 1} (${toUpperEnglish(heir.relationship)})`,
      `AADHAAR NUMBER: ${heir.aadhaarNumber || "NOT PROVIDED"}`,
      `AADHAAR DOCUMENT STATUS: ${heirDoc ? heirDoc.status : "Available"}`,
      `OTHER REQUIRED DOCUMENTS: ${heir.isMinor ? "Birth Certificate & Guardian Authorization" : "Identity Proof (Voter/DL/Aadhaar)"}`,
      `REMARKS: ${heir.relinquishShare ? "Relinquishment NOC required" : "Signatory on Form 2 (Heirs Schedule)"}`,
      divider
    );
  });

  // 3. Witness 1
  const w1Doc = data.documents.find((d) => d.id === "doc-witness1-aadhaar");
  lines.push(
    `PERSON: ${toUpperEnglish(data.witness1.fullName)}`,
    `RELATIONSHIP / ROLE: WITNESS 1 (Neighbour / Local Resident)`,
    `AADHAAR NUMBER: ${data.witness1.aadhaarNumber || "NOT PROVIDED"}`,
    `AADHAAR DOCUMENT STATUS: ${w1Doc ? w1Doc.status : "Available"}`,
    `OTHER REQUIRED DOCUMENTS: Proof of residence in same village/locality`,
    `REMARKS: Signatory on Form 3 (Witness Deposition) before Village Officer`,
    divider
  );

  // 4. Witness 2
  const w2Doc = data.documents.find((d) => d.id === "doc-witness2-aadhaar");
  lines.push(
    `PERSON: ${toUpperEnglish(data.witness2.fullName)}`,
    `RELATIONSHIP / ROLE: WITNESS 2 (Neighbour / Local Resident)`,
    `AADHAAR NUMBER: ${data.witness2.aadhaarNumber || "NOT PROVIDED"}`,
    `AADHAAR DOCUMENT STATUS: ${w2Doc ? w2Doc.status : "Available"}`,
    `OTHER REQUIRED DOCUMENTS: Proof of residence in same village/locality`,
    `REMARKS: Signatory on Form 3 (Witness Deposition) before Village Officer`,
    divider
  );

  // General Supporting Documents
  lines.push(
    "",
    border,
    "GENERAL SUPPORTING DOCUMENTS CHECKLIST",
    border
  );

  data.documents.forEach((doc, idx) => {
    lines.push(
      `[${idx + 1}] ${doc.name}`,
      `    CATEGORY: ${doc.category}`,
      `    STATUS: ${doc.status}`,
      doc.documentNumber ? `    DOCUMENT / REGISTRATION NO: ${doc.documentNumber}` : "",
      doc.remarks ? `    OPERATOR NOTES: ${doc.remarks}` : "",
      ""
    );
  });

  // Final operator review section
  lines.push(
    border,
    "OPERATOR FINAL SCRUTINY CHECKLIST",
    border,
    "[ ] 1. Death Certificate matches Deceased Name and Date of Demise exactly.",
    "[ ] 2. Ration Card includes deceased and names of family members.",
    "[ ] 3. All legal heirs listed match the actual family composition (no heir omitted).",
    "[ ] 4. All legal heirs' Aadhaar numbers & photocopies verified.",
    "[ ] 5. Both witnesses reside within the jurisdiction of the concerned Village Office.",
    "[ ] 6. Three application forms printed with adequate blank signature boxes.",
    "[ ] 7. Court fee stamp (Rs 5/-) arranged for Form 1.",
    "",
    "SCRUTINIZED BY (OPERATOR NAME): _______________________",
    "VERIFICATION STATUS: [ ] APPROVED FOR SUBMISSION  [ ] PENDING CLARIFICATION",
    "VERIFICATION DATE:   ____ / ____ / ________",
    "NEXIA VIRTUAL DESK HELPLINE: +91 9961850698",
    border
  );

  return lines.filter((l) => l !== "").join("\n");
}

/**
 * Trigger browser file download for text file.
 */
export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
