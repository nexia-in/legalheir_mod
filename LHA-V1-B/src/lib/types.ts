export type DocStatus = "AVAILABLE" | "NOT_AVAILABLE" | "TO_BE_VERIFIED" | "NOT_APPLICABLE";

export const DOC_STATUS_OPTIONS: { value: DocStatus; label: string; tone: string }[] = [
  { value: "AVAILABLE", label: "Available", tone: "emerald" },
  { value: "TO_BE_VERIFIED", label: "To Be Verified", tone: "amber" },
  { value: "NOT_AVAILABLE", label: "Not Available", tone: "rose" },
  { value: "NOT_APPLICABLE", label: "Not Applicable", tone: "slate" },
];

export const DOC_STATUS_LABEL: Record<DocStatus, string> = {
  AVAILABLE: "AVAILABLE",
  NOT_AVAILABLE: "NOT AVAILABLE",
  TO_BE_VERIFIED: "TO BE VERIFIED",
  NOT_APPLICABLE: "NOT APPLICABLE",
};

export interface Applicant {
  rationCardNumber: string;
  electionId: string;
  aadhaar: string;
  mobile: string;
  email: string;
  fullName: string;
  dob: string;
  relationToDeceased: string;
  wardNumber: string;
  houseNumber: string;
  houseName: string;
  locality: string;
  place: string;
  postOffice: string;
  pinCode: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
}

export interface Deceased {
  fullName: string;
  address: string;
  dateOfDemise: string;
  placeOfDemise: string;
  deathCertificateNumber: string;
  deathRegistrationAuthority: string;
  age: string;
  occupationBeforeDeath: string;
}

export interface Heir {
  id: string;
  fullName: string;
  gender: "" | "MALE" | "FEMALE" | "OTHER";
  relationship: string;
  age: string;
  occupation: string;
  address: string;
  phone: string;
  aadhaar: string;
  maritalStatus: "" | "SINGLE" | "MARRIED" | "WIDOWED" | "DIVORCED";
  isMinor: boolean;
  guardianName: string;
  aadhaarDocStatus: DocStatus;
  remarks: string;
}

export interface Witness {
  id: string;
  fullName: string;
  guardianName: string;
  age: string;
  occupation: string;
  address: string;
  phone: string;
  aadhaar: string;
  relationToFamily: string;
  aadhaarDocStatus: DocStatus;
  remarks: string;
}

export interface DocumentsStep {
  applicantAadhaar: DocStatus;
  applicantVoterId: DocStatus;
  rationCard: DocStatus;
  deathCertificate: DocStatus;
  addressProof: DocStatus;
  relationshipProof: DocStatus;
  minorGuardianProof: DocStatus;
  otherDocumentName: string;
  otherDocumentStatus: DocStatus;
  purpose: string;
  submissionOffice: string;
  declarationPlace: string;
  declarationDate: string;
  operatorRemarks: string;
}

export interface FormData {
  applicant: Applicant;
  deceased: Deceased;
  heirs: Heir[];
  witnesses: Witness[];
  documents: DocumentsStep;
}

export const emptyHeir = (): Heir => ({
  id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
  fullName: "",
  gender: "",
  relationship: "",
  age: "",
  occupation: "",
  address: "",
  phone: "",
  aadhaar: "",
  maritalStatus: "",
  isMinor: false,
  guardianName: "",
  aadhaarDocStatus: "TO_BE_VERIFIED",
  remarks: "",
});

export const emptyWitness = (): Witness => ({
  id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
  fullName: "",
  guardianName: "",
  age: "",
  occupation: "",
  address: "",
  phone: "",
  aadhaar: "",
  relationToFamily: "",
  aadhaarDocStatus: "TO_BE_VERIFIED",
  remarks: "",
});

export const emptyForm = (): FormData => ({
  applicant: {
    rationCardNumber: "",
    electionId: "",
    aadhaar: "",
    mobile: "",
    email: "",
    fullName: "",
    dob: "",
    relationToDeceased: "",
    wardNumber: "",
    houseNumber: "",
    houseName: "",
    locality: "",
    place: "",
    postOffice: "",
    pinCode: "",
    village: "",
    taluk: "",
    district: "",
    state: "KERALA",
  },
  deceased: {
    fullName: "",
    address: "",
    dateOfDemise: "",
    placeOfDemise: "",
    deathCertificateNumber: "",
    deathRegistrationAuthority: "",
    age: "",
    occupationBeforeDeath: "",
  },
  heirs: [emptyHeir()],
  witnesses: [emptyWitness(), emptyWitness()],
  documents: {
    applicantAadhaar: "TO_BE_VERIFIED",
    applicantVoterId: "TO_BE_VERIFIED",
    rationCard: "TO_BE_VERIFIED",
    deathCertificate: "TO_BE_VERIFIED",
    addressProof: "TO_BE_VERIFIED",
    relationshipProof: "TO_BE_VERIFIED",
    minorGuardianProof: "NOT_APPLICABLE",
    otherDocumentName: "",
    otherDocumentStatus: "NOT_APPLICABLE",
    purpose: "",
    submissionOffice: "",
    declarationPlace: "",
    declarationDate: "",
    operatorRemarks: "",
  },
});

export const KERALA_DISTRICTS = [
  "THIRUVANANTHAPURAM",
  "KOLLAM",
  "PATHANAMTHITTA",
  "ALAPPUZHA",
  "KOTTAYAM",
  "IDUKKI",
  "ERNAKULAM",
  "THRISSUR",
  "PALAKKAD",
  "MALAPPURAM",
  "KOZHIKODE",
  "WAYANAD",
  "KANNUR",
  "KASARAGOD",
];
