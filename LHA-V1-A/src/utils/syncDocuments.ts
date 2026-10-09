import { SupportingDocumentItem, LegalHeir, WitnessDetails } from "@/types";

export function syncDocumentsWithEntities(
  currentDocs: SupportingDocumentItem[],
  heirs: LegalHeir[],
  witness1: WitnessDetails,
  witness2: WitnessDetails
): SupportingDocumentItem[] {
  const synced: SupportingDocumentItem[] = [];

  // Core base documents
  const baseDocs: SupportingDocumentItem[] = [
    {
      id: "doc-applicant-aadhaar",
      category: "APPLICANT",
      name: "Applicant Aadhaar Card",
      nameMl: "അപേക്ഷകന്റെ ആധാർ കാർഡ്",
      status: "Available",
      remarks: "Original verified",
    },
    {
      id: "doc-applicant-voter",
      category: "APPLICANT",
      name: "Applicant Voter Identity Card (Election ID)",
      nameMl: "അപേക്ഷകന്റെ തിരഞ്ഞെടുപ്പ് തിരിച്ചറിയൽ കാർഡ്",
      status: "Available",
      remarks: "Copy attached",
    },
    {
      id: "doc-ration-card",
      category: "GENERAL",
      name: "Ration Card (Family Proof showing Deceased)",
      nameMl: "റേഷൻ കാർഡ് (കുടുംബാംഗങ്ങളുടെ വിവരങ്ങൾ തെളിയിക്കുന്നത്)",
      status: "Available",
      remarks: "Original & copy",
    },
    {
      id: "doc-death-cert",
      category: "DECEASED",
      name: "Death Certificate (Registered with Local Registrar)",
      nameMl: "മരണ സർട്ടിഫിക്കറ്റ് (രജിസ്ട്രേഷൻ പകർപ്പ്)",
      status: "Available",
      remarks: "Official registrar copy",
    },
  ];

  // Merge existing status of base docs if present
  baseDocs.forEach((bDoc) => {
    const existing = currentDocs.find((d) => d.id === bDoc.id);
    if (existing) {
      synced.push({ ...bDoc, ...existing });
    } else {
      synced.push(bDoc);
    }
  });

  // Dynamic Heir Documents
  heirs.forEach((heir, idx) => {
    const heirDocId = `doc-heir-${heir.id || idx + 1}-aadhaar`;
    const existing = currentDocs.find((d) => d.id === heirDocId || d.relatedPerson === heir.fullName);

    synced.push({
      id: heirDocId,
      category: "HEIR",
      name: `Legal Heir Aadhaar - ${heir.fullName || `Heir #${idx + 1}`}`,
      nameMl: `അനന്തരാവകാശി ആധാർ - ${heir.fullNameMl || heir.fullName || `അവകാശി #${idx + 1}`}`,
      relatedPerson: heir.fullName,
      status: existing ? existing.status : "Available",
      documentNumber: heir.aadhaarNumber || existing?.documentNumber || "",
      remarks: existing?.remarks || (heir.isMinor ? "Minor - Guardian signature" : "Verified photocopy"),
    });
  });

  // Dynamic Witness 1
  const w1Existing = currentDocs.find((d) => d.id === "doc-witness1-aadhaar");
  synced.push({
    id: "doc-witness1-aadhaar",
    category: "WITNESS",
    name: `Witness 1 Identity Proof - ${witness1.fullName || "Witness 1"}`,
    nameMl: `സാക്ഷി 1 തിരിച്ചറിയൽ രേഖ - ${witness1.fullName || "സാക്ഷി 1"}`,
    relatedPerson: "Witness 1",
    status: w1Existing ? w1Existing.status : "Available",
    documentNumber: witness1.aadhaarNumber || w1Existing?.documentNumber || "",
    remarks: w1Existing?.remarks || "Resident in locality",
  });

  // Dynamic Witness 2
  const w2Existing = currentDocs.find((d) => d.id === "doc-witness2-aadhaar");
  synced.push({
    id: "doc-witness2-aadhaar",
    category: "WITNESS",
    name: `Witness 2 Identity Proof - ${witness2.fullName || "Witness 2"}`,
    nameMl: `സാക്ഷി 2 തിരിച്ചറിയൽ രേഖ - ${witness2.fullName || "സാക്ഷി 2"}`,
    relatedPerson: "Witness 2",
    status: w2Existing ? w2Existing.status : "Available",
    documentNumber: witness2.aadhaarNumber || w2Existing?.documentNumber || "",
    remarks: w2Existing?.remarks || "Resident in locality",
  });

  return synced;
}
