export interface FieldMapRow {
  sourceForm: string;
  section: string;
  sourceLabel: string;
  sourceLabelMl: string;
  webField: string;
  requirement: "required" | "optional" | "office-use";
  status: "mapped" | "needs-verification" | "not-printed";
  notes: string;
  sortOrder: number;
}

/**
 * Field-mapping plan.
 *
 * The three source PDFs (`1-Main application LH.pdf`, `2-application -Legal
 * heir.pdf`, `3-LH-Witness.pdf`) were NOT present in the project when this
 * build was produced, so every row below is derived from the existing
 * data-entry workflow and the standard Kerala Village Office legal-heirship
 * paperwork. Rows marked `needs-verification` must be re-checked against the
 * real scans before the printouts are used at a counter.
 */
export const FIELD_MAP_SEED: FieldMapRow[] = [
  // ---- FORM 1 -----------------------------------------------------------
  f("FORM-1", "Heading", "Application for Legal Heirship Certificate", "അനന്തരാവകാശ സർട്ടിഫിക്കറ്റിനുള്ള അപേക്ഷ", "—", "office-use", "needs-verification", "Exact official heading/running number must be confirmed from the scan.", 1),
  f("FORM-1", "Addressee", "To the Village Officer / Tahsildar", "വില്ലേജ് ഓഫീസർ / തഹസിൽദാർ", "documents.submissionOffice", "optional", "mapped", "", 2),
  f("FORM-1", "Applicant", "Full name as per Aadhaar", "അപേക്ഷകന്റെ പേര്", "applicant.fullName", "required", "mapped", "", 3),
  f("FORM-1", "Applicant", "Date of birth", "ജനന തീയതി", "applicant.dob", "optional", "mapped", "", 4),
  f("FORM-1", "Applicant", "Relationship with the deceased", "മരണപ്പെട്ട ആളുമായുള്ള ബന്ധം", "applicant.relationToDeceased", "required", "mapped", "", 5),
  f("FORM-1", "Applicant", "Aadhaar number", "ആധാർ നമ്പർ", "applicant.aadhaar", "required", "mapped", "Printed only because the existing workflow form carries an Aadhaar field for the applicant.", 6),
  f("FORM-1", "Applicant", "Ration card number", "റേഷൻ കാർഡ് നമ്പർ", "applicant.rationCardNumber", "required", "mapped", "", 7),
  f("FORM-1", "Applicant", "Election ID / Voter ID", "തിരഞ്ഞെടുപ്പ് തിരിച്ചറിയൽ കാർഡ് നമ്പർ", "applicant.electionId", "optional", "mapped", "", 8),
  f("FORM-1", "Applicant", "Mobile number", "മൊബൈൽ നമ്പർ", "applicant.mobile", "required", "mapped", "", 9),
  f("FORM-1", "Applicant", "Email address", "ഇ-മെയിൽ വിലാസം", "applicant.email", "optional", "mapped", "Never upper-cased.", 10),
  f("FORM-1", "Address", "Ward / Division number", "വാർഡ് / ഡിവിഷൻ നമ്പർ", "applicant.wardNumber", "optional", "mapped", "", 11),
  f("FORM-1", "Address", "House number", "വീട്ടു നമ്പർ", "applicant.houseNumber", "optional", "mapped", "", 12),
  f("FORM-1", "Address", "House name", "വീട്ടുപേര്", "applicant.houseName", "required", "mapped", "", 13),
  f("FORM-1", "Address", "Locality", "പ്രദേശം", "applicant.locality", "optional", "mapped", "", 14),
  f("FORM-1", "Address", "Place", "സ്ഥലം", "applicant.place", "required", "mapped", "", 15),
  f("FORM-1", "Address", "Post office", "പോസ്റ്റ് ഓഫീസ്", "applicant.postOffice", "required", "mapped", "", 16),
  f("FORM-1", "Address", "PIN code", "പിൻ കോഡ്", "applicant.pinCode", "required", "mapped", "", 17),
  f("FORM-1", "Address", "Village", "വില്ലേജ്", "applicant.village", "required", "mapped", "", 18),
  f("FORM-1", "Address", "Taluk", "താലൂക്ക്", "applicant.taluk", "optional", "needs-verification", "Added because village-office forms normally print the taluk; confirm against the scan.", 19),
  f("FORM-1", "Address", "District / State", "ജില്ല / സംസ്ഥാനം", "applicant.district / applicant.state", "required", "mapped", "", 20),
  f("FORM-1", "Deceased", "Name of the deceased", "മരണപ്പെട്ട ആളുടെ പേര്", "deceased.fullName", "required", "mapped", "", 21),
  f("FORM-1", "Deceased", "Full address", "വിലാസം", "deceased.address", "required", "mapped", "", 22),
  f("FORM-1", "Deceased", "Date of demise", "മരണ തീയതി", "deceased.dateOfDemise", "required", "mapped", "", 23),
  f("FORM-1", "Deceased", "Place of demise", "മരണം സംഭവിച്ച സ്ഥലം", "deceased.placeOfDemise", "required", "mapped", "", 24),
  f("FORM-1", "Deceased", "Death certificate number", "മരണ സർട്ടിഫിക്കറ്റ് നമ്പർ", "deceased.deathCertificateNumber", "required", "mapped", "", 25),
  f("FORM-1", "Deceased", "Registering authority", "മരണം രജിസ്റ്റർ ചെയ്ത സ്ഥാപനം", "deceased.deathRegistrationAuthority", "optional", "needs-verification", "Present on most forms; confirm the exact wording.", 26),
  f("FORM-1", "Purpose", "Purpose for which the certificate is required", "ആവശ്യം", "documents.purpose", "required", "mapped", "", 27),
  f("FORM-1", "Heir table", "Sl / Name / Sex / Age / Relation / Occupation / Signature", "ക്രമ നം. / പേര് / ലിംഗം / വയസ്സ് / ബന്ധം / തൊഴിൽ / ഒപ്പ്", "heirs[]", "required", "mapped", "Signature column kept blank for handwriting; overflows to extra pages.", 28),
  f("FORM-1", "Declaration", "Declaration of correctness", "സത്യപ്രസ്താവന", "—", "required", "needs-verification", "Wording reproduced in standard Malayalam; compare with the official text.", 29),
  f("FORM-1", "Signature", "Place / Date / Applicant signature", "സ്ഥലം / തീയതി / അപേക്ഷകന്റെ ഒപ്പ്", "documents.declarationPlace / declarationDate", "required", "mapped", "", 30),
  f("FORM-1", "Enclosures", "List of enclosures with tick boxes", "ഹാജരാക്കുന്ന രേഖകൾ", "documents.*", "optional", "needs-verification", "Tick boxes printed empty; checklist statuses are NOT printed.", 31),

  // ---- FORM 2 -----------------------------------------------------------
  f("FORM-2", "Heading", "Statement of legal heirs / claimants", "അനന്തരാവകാശികളുടെ വിവരപ്പട്ടിക", "—", "office-use", "needs-verification", "", 40),
  f("FORM-2", "Summary", "Applicant name and address", "അപേക്ഷകന്റെ പേരും വിലാസവും", "applicant.*", "required", "mapped", "", 41),
  f("FORM-2", "Summary", "Deceased name, address, date/place of demise", "മരണപ്പെട്ട ആളുടെ വിവരങ്ങൾ", "deceased.*", "required", "mapped", "", 42),
  f("FORM-2", "Claimant table", "Name", "പേര്", "heirs[].fullName", "required", "mapped", "", 43),
  f("FORM-2", "Claimant table", "Sex", "ലിംഗം", "heirs[].gender", "required", "mapped", "", 44),
  f("FORM-2", "Claimant table", "Age", "വയസ്സ്", "heirs[].age", "required", "mapped", "", 45),
  f("FORM-2", "Claimant table", "Relationship with deceased", "ബന്ധം", "heirs[].relationship", "required", "mapped", "", 46),
  f("FORM-2", "Claimant table", "Marital status", "വിവാഹ നില", "heirs[].maritalStatus", "optional", "needs-verification", "Column exists on many claimant tables; confirm.", 47),
  f("FORM-2", "Claimant table", "Occupation", "തൊഴിൽ", "heirs[].occupation", "optional", "mapped", "", 48),
  f("FORM-2", "Claimant table", "Address and phone", "വിലാസവും ഫോൺ നമ്പറും", "heirs[].address / heirs[].phone", "required", "mapped", "", 49),
  f("FORM-2", "Claimant table", "Guardian of minor claimant", "രക്ഷിതാവ്", "heirs[].guardianName", "optional", "mapped", "Shown only when the heir is flagged as a minor.", 50),
  f("FORM-2", "Signature grid", "Signature / thumb impression of each claimant", "ഓരോ അവകാശിയുടെയും ഒപ്പ്", "—", "required", "mapped", "Always printed blank — never auto-signed.", 51),
  f("FORM-2", "Declaration", "Joint declaration by the claimants", "സത്യപ്രസ്താവന", "—", "required", "needs-verification", "", 52),

  // ---- FORM 3 -----------------------------------------------------------
  f("FORM-3", "Heading", "Witness statement", "സാക്ഷി മൊഴി / സാക്ഷ്യപത്രം", "—", "office-use", "needs-verification", "", 60),
  f("FORM-3", "Deceased", "Deceased particulars", "മരണപ്പെട്ട ആളുടെ വിവരങ്ങൾ", "deceased.*", "required", "mapped", "", 61),
  f("FORM-3", "Heir list", "Names, age, relationship of the heirs being certified", "അനന്തരാവകാശികളുടെ പേരുവിവരം", "heirs[]", "required", "mapped", "", 62),
  f("FORM-3", "Witness 1/2", "Full name", "പേര്", "witnesses[].fullName", "required", "mapped", "", 63),
  f("FORM-3", "Witness 1/2", "Father's / husband's name", "പിതാവിന്റെ / ഭർത്താവിന്റെ പേര്", "witnesses[].guardianName", "optional", "needs-verification", "", 64),
  f("FORM-3", "Witness 1/2", "Age / occupation", "വയസ്സ് / തൊഴിൽ", "witnesses[].age / witnesses[].occupation", "optional", "mapped", "", 65),
  f("FORM-3", "Witness 1/2", "Full address", "വിലാസം", "witnesses[].address", "required", "mapped", "", 66),
  f("FORM-3", "Witness 1/2", "Phone number", "ഫോൺ നമ്പർ", "witnesses[].phone", "optional", "mapped", "", 67),
  f("FORM-3", "Witness 1/2", "Aadhaar number", "ആധാർ നമ്പർ", "witnesses[].aadhaar", "optional", "not-printed", "Collected for the internal checklist only. NOT printed, because the source form could not be inspected.", 68),
  f("FORM-3", "Witness 1/2", "Signature", "സാക്ഷിയുടെ ഒപ്പ്", "—", "required", "mapped", "Blank signature space.", 69),
  f("FORM-3", "Attestation", "Attesting officer signature and seal", "സാക്ഷ്യപ്പെടുത്തുന്ന ഉദ്യോഗസ്ഥന്റെ ഒപ്പും സീലും", "—", "office-use", "mapped", "", 70),

  // ---- OUTSIDE THE PDFS -------------------------------------------------
  f("INTERNAL", "Checklist", "Aadhaar numbers and document statuses", "—", "documents.* / heirs[].aadhaarDocStatus", "optional", "not-printed", "Written only to Nexia_Aadhaar_Documents_Checklist.txt.", 80),
  f("INTERNAL", "e-District", "Online application transfer sheet", "—", "all", "optional", "not-printed", "Written only to Nexia_eDistrict_Online_Application_Data.txt.", 81),
];

function f(
  sourceForm: string,
  section: string,
  sourceLabel: string,
  sourceLabelMl: string,
  webField: string,
  requirement: FieldMapRow["requirement"],
  status: FieldMapRow["status"],
  notes: string,
  sortOrder: number
): FieldMapRow {
  return { sourceForm, section, sourceLabel, sourceLabelMl, webField, requirement, status, notes, sortOrder };
}
