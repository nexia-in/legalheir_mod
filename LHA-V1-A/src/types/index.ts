export type DocumentStatus = "Available" | "Not Available" | "To Be Verified" | "Not Applicable";

export interface ApplicantDetails {
  fullName: string;
  fullNameMl: string;
  relationshipToDeceased: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  age: string;
  aadhaarNumber: string;
  voterId: string;
  rationCardNumber: string;
  mobileNumber: string;
  email: string;
  houseNumber: string;
  houseName: string;
  locality: string;
  place: string;
  postOffice: string;
  pinCode: string;
  wardNumber: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
}

export interface DeceasedDetails {
  fullName: string;
  fullNameMl: string;
  fatherOrHusbandName: string;
  gender: "MALE" | "FEMALE";
  dob: string;
  dateOfDemise: string;
  placeOfDemise: string;
  deathCertificateNumber: string;
  deathCertificateDate: string;
  deathRegistrarAuthority: string;
  permanentAddress: string;
  religion: string;
  caste: string;
  maritalStatus: "MARRIED" | "UNMARRIED" | "WIDOWED" | "DIVORCED";
  occupation: string;
  purposeOfCertificate: string;
  claimParticulars: string;
}

export interface LegalHeir {
  id: string;
  fullName: string;
  fullNameMl: string;
  relationship: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: string;
  dob: string;
  maritalStatus: string;
  occupation: string;
  address: string;
  phone: string;
  aadhaarNumber: string;
  isApplicant: boolean;
  isMinor: boolean;
  guardianName: string;
  relinquishShare: boolean;
}

export interface WitnessDetails {
  fullName: string;
  fatherOrHusbandName: string;
  age: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  occupation: string;
  aadhaarNumber: string;
  mobileNumber: string;
  houseName: string;
  locality: string;
  place: string;
  postOffice: string;
  pinCode: string;
  village: string;
  taluk: string;
  district: string;
  yearsKnown: string;
}

export interface SupportingDocumentItem {
  id: string;
  category: "APPLICANT" | "DECEASED" | "HEIR" | "WITNESS" | "GENERAL";
  name: string;
  nameMl: string;
  relatedPerson?: string;
  status: DocumentStatus;
  documentNumber?: string;
  remarks?: string;
}

export interface FullApplicationData {
  applicant: ApplicantDetails;
  deceased: DeceasedDetails;
  heirs: LegalHeir[];
  witness1: WitnessDetails;
  witness2: WitnessDetails;
  documents: SupportingDocumentItem[];
  applicationDate: string;
  applicationPlace: string;
}

export const KERALA_DISTRICTS = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
] as const;

export const HEIR_RELATIONSHIPS = [
  "Wife",
  "Husband",
  "Son",
  "Daughter",
  "Mother",
  "Father",
  "Brother",
  "Sister",
  "Grandson",
  "Granddaughter",
  "Other",
] as const;

export const CERTIFICATE_PURPOSES = [
  "Bank Deposit / Savings Account Claim",
  "Family Pension / Service Benefits",
  "Property Transfer / Land Mutation (Pokkuvaravu)",
  "Life Insurance / LIC Claim Settlement",
  "Provident Fund (PF) Settlement",
  "Compassionate Employment Scheme",
  "Vehicle RC Ownership Transfer",
  "Shares / Mutual Funds Transmission",
  "Other Legal & Financial Matters",
] as const;

export const INITIAL_APPLICATION_DATA: FullApplicationData = {
  applicant: {
    fullName: "",
    fullNameMl: "",
    relationshipToDeceased: "Son",
    gender: "MALE",
    dob: "",
    age: "",
    aadhaarNumber: "",
    voterId: "",
    rationCardNumber: "",
    mobileNumber: "",
    email: "",
    houseNumber: "",
    houseName: "",
    locality: "",
    place: "",
    postOffice: "",
    pinCode: "",
    wardNumber: "",
    village: "",
    taluk: "",
    district: "Thrissur",
    state: "KERALA",
  },
  deceased: {
    fullName: "",
    fullNameMl: "",
    fatherOrHusbandName: "",
    gender: "MALE",
    dob: "",
    dateOfDemise: "",
    placeOfDemise: "",
    deathCertificateNumber: "",
    deathCertificateDate: "",
    deathRegistrarAuthority: "",
    permanentAddress: "",
    religion: "Hindu",
    caste: "Nair",
    maritalStatus: "MARRIED",
    occupation: "Retired Government Employee",
    purposeOfCertificate: "Bank Deposit / Savings Account Claim",
    claimParticulars: "SBI Savings Bank Account & Fixed Deposits Settlement",
  },
  heirs: [],
  witness1: {
    fullName: "",
    fatherOrHusbandName: "",
    age: "",
    gender: "MALE",
    occupation: "Business",
    aadhaarNumber: "",
    mobileNumber: "",
    houseName: "",
    locality: "",
    place: "",
    postOffice: "",
    pinCode: "",
    village: "",
    taluk: "",
    district: "Thrissur",
    yearsKnown: "15",
  },
  witness2: {
    fullName: "",
    fatherOrHusbandName: "",
    age: "",
    gender: "MALE",
    occupation: "Teacher",
    aadhaarNumber: "",
    mobileNumber: "",
    houseName: "",
    locality: "",
    place: "",
    postOffice: "",
    pinCode: "",
    village: "",
    taluk: "",
    district: "Thrissur",
    yearsKnown: "20",
  },
  documents: [
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
      remarks: "Original and copy ready",
    },
    {
      id: "doc-death-cert",
      category: "DECEASED",
      name: "Death Certificate (Registered with Local Registrar)",
      nameMl: "മരണ സർട്ടിഫിക്കറ്റ് (രജിസ്ട്രേഷൻ പകർപ്പ്)",
      status: "Available",
      remarks: "Official computerized copy",
    },
    {
      id: "doc-witness1-aadhaar",
      category: "WITNESS",
      name: "Witness 1 Aadhaar / Identity Proof",
      nameMl: "സാക്ഷി 1 ന്റെ തിരിച്ചറിയൽ രേഖ / ആധാർ",
      relatedPerson: "Witness 1",
      status: "Available",
      remarks: "Local resident proof",
    },
    {
      id: "doc-witness2-aadhaar",
      category: "WITNESS",
      name: "Witness 2 Aadhaar / Identity Proof",
      nameMl: "സാക്ഷി 2 ന്റെ തിരിച്ചറിയൽ രേഖ / ആധാർ",
      relatedPerson: "Witness 2",
      status: "Available",
      remarks: "Local resident proof",
    },
  ],
  applicationDate: new Date().toISOString().split("T")[0],
  applicationPlace: "Thrissur",
};

export const SAMPLE_APPLICATION_DATA: FullApplicationData = {
  applicant: {
    fullName: "Anand Kumar K",
    fullNameMl: "ആനന്ദ് കുമാർ കെ",
    relationshipToDeceased: "Son",
    gender: "MALE",
    dob: "1988-05-14",
    age: "36",
    aadhaarNumber: "784512369854",
    voterId: "KL/10/065/456123",
    rationCardNumber: "1856234190",
    mobileNumber: "9847123456",
    email: "anand.kumar@example.com",
    houseNumber: "12/450",
    houseName: "Kizhakkethil House",
    locality: "Near Devi Temple, Ayyanthole",
    place: "Ayyanthole",
    postOffice: "Ayyanthole PO",
    pinCode: "680003",
    wardNumber: "14",
    village: "Ayyanthole",
    taluk: "Thrissur",
    district: "Thrissur",
    state: "KERALA",
  },
  deceased: {
    fullName: "Krishnan Nair K",
    fullNameMl: "കൃഷ്ണൻ നായർ കെ",
    fatherOrHusbandName: "Raman Nair",
    gender: "MALE",
    dob: "1952-03-10",
    dateOfDemise: "2024-08-15",
    placeOfDemise: "Jubilee Mission Hospital, Thrissur",
    deathCertificateNumber: "D-2024-09876",
    deathCertificateDate: "2024-08-22",
    deathRegistrarAuthority: "Thrissur Municipal Corporation",
    permanentAddress: "Kizhakkethil House, Ayyanthole PO, Thrissur - 680003",
    religion: "Hindu",
    caste: "Nair",
    maritalStatus: "MARRIED",
    occupation: "Retired Senior Clerk, KSEB",
    purposeOfCertificate: "Bank Deposit / Savings Account Claim",
    claimParticulars: "SBI Ayyanthole Branch Savings A/c & Fixed Deposit Settlement",
  },
  heirs: [
    {
      id: "heir-1",
      fullName: "Radhamani Amma",
      fullNameMl: "രാധാമണി അമ്മ",
      relationship: "Wife",
      gender: "FEMALE",
      age: "62",
      dob: "1962-09-18",
      maritalStatus: "Widowed",
      occupation: "Homemaker",
      address: "Kizhakkethil House, Ayyanthole PO, Thrissur - 680003",
      phone: "9847123456",
      aadhaarNumber: "654123987452",
      isApplicant: false,
      isMinor: false,
      guardianName: "",
      relinquishShare: false,
    },
    {
      id: "heir-2",
      fullName: "Anand Kumar K",
      fullNameMl: "ആനന്ദ് കുമാർ കെ",
      relationship: "Son",
      gender: "MALE",
      age: "36",
      dob: "1988-05-14",
      maritalStatus: "Married",
      occupation: "Private Sector Employee",
      address: "Kizhakkethil House, Ayyanthole PO, Thrissur - 680003",
      phone: "9847123456",
      aadhaarNumber: "784512369854",
      isApplicant: true,
      isMinor: false,
      guardianName: "",
      relinquishShare: false,
    },
    {
      id: "heir-3",
      fullName: "Anitha K Nair",
      fullNameMl: "അനിത കെ നായർ",
      relationship: "Daughter",
      gender: "FEMALE",
      age: "32",
      dob: "1992-11-25",
      maritalStatus: "Married",
      occupation: "Software Engineer",
      address: "Shree Nilayam, Chembukkavu, Thrissur - 680020",
      phone: "9447654321",
      aadhaarNumber: "452189632145",
      isApplicant: false,
      isMinor: false,
      guardianName: "",
      relinquishShare: false,
    },
  ],
  witness1: {
    fullName: "Venu Gopalan M",
    fatherOrHusbandName: "Madhavan Nair",
    age: "58",
    gender: "MALE",
    occupation: "Merchant",
    aadhaarNumber: "321456987123",
    mobileNumber: "9446112233",
    houseName: "Thiruvambadi Villa",
    locality: "Ayyanthole North",
    place: "Ayyanthole",
    postOffice: "Ayyanthole PO",
    pinCode: "680003",
    village: "Ayyanthole",
    taluk: "Thrissur",
    district: "Thrissur",
    yearsKnown: "22",
  },
  witness2: {
    fullName: "Sunil Kumar P",
    fatherOrHusbandName: "Prabhakaran",
    age: "49",
    gender: "MALE",
    occupation: "High School Teacher",
    aadhaarNumber: "987456321159",
    mobileNumber: "9846334455",
    houseName: "Souparnika",
    locality: "Temple Road",
    place: "Ayyanthole",
    postOffice: "Ayyanthole PO",
    pinCode: "680003",
    village: "Ayyanthole",
    taluk: "Thrissur",
    district: "Thrissur",
    yearsKnown: "18",
  },
  documents: [
    {
      id: "doc-applicant-aadhaar",
      category: "APPLICANT",
      name: "Applicant Aadhaar Card",
      nameMl: "അപേക്ഷകന്റെ ആധാർ കാർഡ്",
      status: "Available",
      documentNumber: "784512369854",
      remarks: "Self-attested copy ready",
    },
    {
      id: "doc-applicant-voter",
      category: "APPLICANT",
      name: "Applicant Voter Identity Card (Election ID)",
      nameMl: "അപേക്ഷകന്റെ തിരഞ്ഞെടുപ്പ് തിരിച്ചറിയൽ കാർഡ്",
      status: "Available",
      documentNumber: "KL/10/065/456123",
      remarks: "Original verified",
    },
    {
      id: "doc-ration-card",
      category: "GENERAL",
      name: "Ration Card (Family Proof showing Deceased)",
      nameMl: "റേഷൻ കാർഡ് (കുടുംബാംഗങ്ങളുടെ വിവരങ്ങൾ തെളിയിക്കുന്നത്)",
      status: "Available",
      documentNumber: "1856234190",
      remarks: "Original and 2 photocopies",
    },
    {
      id: "doc-death-cert",
      category: "DECEASED",
      name: "Death Certificate (Registered with Local Registrar)",
      nameMl: "മരണ സർട്ടിഫിക്കറ്റ് (രജിസ്ട്രേഷൻ പകർപ്പ്)",
      status: "Available",
      documentNumber: "D-2024-09876",
      remarks: "Thrissur Corporation certified certificate",
    },
    {
      id: "doc-heir-1-aadhaar",
      category: "HEIR",
      name: "Legal Heir Aadhaar - Radhamani Amma",
      nameMl: "അനന്തരാവകാശി ആധാർ - രാധാമണി അമ്മ",
      relatedPerson: "Radhamani Amma",
      status: "Available",
      documentNumber: "654123987452",
      remarks: "Copy signed",
    },
    {
      id: "doc-heir-2-aadhaar",
      category: "HEIR",
      name: "Legal Heir Aadhaar - Anand Kumar K",
      nameMl: "അനന്തരാവകാശി ആധാർ - ആനന്ദ് കുമാർ കെ",
      relatedPerson: "Anand Kumar K",
      status: "Available",
      documentNumber: "784512369854",
      remarks: "Copy signed",
    },
    {
      id: "doc-heir-3-aadhaar",
      category: "HEIR",
      name: "Legal Heir Aadhaar - Anitha K Nair",
      nameMl: "അനന്തരാവകാശി ആധാർ - അനിത കെ നായർ",
      relatedPerson: "Anitha K Nair",
      status: "Available",
      documentNumber: "452189632145",
      remarks: "Copy signed",
    },
    {
      id: "doc-witness1-aadhaar",
      category: "WITNESS",
      name: "Witness 1 Aadhaar / Identity Proof - Venu Gopalan M",
      nameMl: "സാക്ഷി 1 ന്റെ തിരിച്ചറിയൽ രേഖ - വേണു ഗോപാലൻ എം",
      relatedPerson: "Witness 1",
      status: "Available",
      documentNumber: "321456987123",
      remarks: "Verified resident",
    },
    {
      id: "doc-witness2-aadhaar",
      category: "WITNESS",
      name: "Witness 2 Aadhaar / Identity Proof - Sunil Kumar P",
      nameMl: "സാക്ഷി 2 ന്റെ തിരിച്ചറിയൽ രേഖ - സുനിൽ കുമാർ പി",
      relatedPerson: "Witness 2",
      status: "Available",
      documentNumber: "987456321159",
      remarks: "Verified resident",
    },
  ],
  applicationDate: "2024-09-02",
  applicationPlace: "Thrissur",
};
