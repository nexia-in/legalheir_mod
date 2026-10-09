# Nexia Virtual Desk – Kerala Legal Heirship Certificate Application Assistant

> **Private Assistance Tool operated by Nexia Virtual Desk**  
> *Tagline: Your online application supporting team*  
> *Official Kerala e-District Portal:* https://edistrict.kerala.gov.in/  
> *Official WhatsApp Desk:* https://wa.me/919961850698  

---

## 1. Important Legal Disclaimer

> **“This is a private application assistance service provided by Nexia Virtual Desk. We are not affiliated with or representing the Government of Kerala. Final requirements and acceptance are subject to the relevant government authority (concerned Village Officer and Tahsildar).”**

---

## 2. Source Documents & Form Mapping

This application is built based on the three official Kerala Revenue Department application forms used for Legal Heirship Certificates (അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ്):

### Form 1: Main Application – Legal Heir (`Legal_Heir_Main_Application.pdf`)
* **Official Malayalam Heading:** കേരള സർക്കാർ - റവന്യൂ വകുപ്പ് • തഹസിൽദാർ മുമ്പാകെ സമർപ്പിക്കുന്ന അനന്തരാവകാശ സർട്ടിഫിക്കറ്റിനായുള്ള പ്രധാന അപേക്ഷ (Form LH-01)
* **Key Features:**
  * Space for Court Fee Stamp (കോർട്ട് ഫീ സ്റ്റാമ്പ് ₹5/- പതിക്കേണ്ട സ്ഥലം)
  * Addressed to the Hon'ble Tahsildar (ബഹുമാനപ്പെട്ട തഹസിൽദാർ അവർകൾ മുമ്പാകെ)
  * Applicant Full Details: Name (English uppercase + Malayalam), relationship, age, residential address, ward, village, taluk, district, contact, voter ID, ration card.
  * Deceased Person Details: Name, demise date, place of demise, death certificate number & date, registrar authority, religion, caste, marital status, purpose of certificate.
  * Solemn Declaration in Malayalam (സത്യപ്രസ്താവന)
  * Generous handwritten signature box for the applicant (ഒപ്പ് / വിരലടയാളം).

### Form 2: Legal Heir Application / Schedule Form (`Legal_Heir_Application_Form.pdf`)
* **Official Malayalam Heading:** അനന്തരാവകാശികളുടെ പട്ടികയും സംയുക്ത സത്യവാങ്മൂലവും (Form LH-02)
* **Key Features:**
  * Deceased reference card
  * Complete schedule table for multiple legal heirs: Sl No, Name, Relationship, Age, Gender, Occupation, Residential Address & Phone, Handwritten Signature Space
  * Joint Declaration in Malayalam (സംയുക്ത സത്യപ്രസ്താവന)
  * Physical signature grid for all adult legal heirs
  * Endorsement space for Village Officer / Revenue Inspector.

### Form 3: Legal Heir Witness Form (`Legal_Heir_Witness_Form.pdf`)
* **Official Malayalam Heading:** അയൽസാക്ഷി മൊഴിപ്പത്രിക / സാക്ഷ്യപത്രം (Form LH-03)
* **Key Features:**
  * Addressed to the Village Officer (വില്ലേജ് ഓഫീസർ മുമ്പാകെ)
  * Dual independent local neighbour profile cards (Witness 1 & Witness 2) with father/spouse name, age, occupation, address, contact, and years of acquaintance with deceased family.
  * Joint deposition statement in Malayalam certifying family composition
  * Physical signature boxes for Witness 1 and Witness 2
  * Village Officer official attestation, date, and seal section.

---

## 3. The 5 Separate Outputs

The application produces five separate, unbundled outputs:

| # | Output File | Type | Purpose |
|---|-------------|------|---------|
| 1 | `Legal_Heir_Main_Application.pdf` | PDF (A4) | Form 1 to Tahsildar with ₹5 court fee stamp box & applicant signature |
| 2 | `Legal_Heir_Application_Form.pdf` | PDF (A4) | Form 2 table of legal heirs with joint declaration & heir signatures |
| 3 | `Legal_Heir_Witness_Form.pdf` | PDF (A4) | Form 3 witness deposition before Village Officer |
| 4 | `Nexia_eDistrict_Online_Application_Data.txt` | TXT | Copy-paste plain text formatted for https://edistrict.kerala.gov.in/ |
| 5 | `Nexia_Aadhaar_Documents_Checklist.txt` | TXT | Internal file audit with Aadhaar & supporting document statuses |

*Note: All English user-entered text is automatically converted to UPPERCASE on generated documents, while Malayalam script and characters remain preserved.*

---

## 4. Privacy & Data Security

- **100% Client-Side Processing:** All PDF rendering and text file compilation occurs directly within the user's browser using JavaScript.
- **Zero Server Transmission:** Personal identification information, phone numbers, and Aadhaar numbers are never sent to external servers or analytics.
- **Aadhaar Privacy Masking:** The review screen includes masking (`•••• •••• 1234`) with an eye-toggle for user review.
- **Session Reset:** "Clear All Data" with a confirmation prompt completely wipes in-memory form state.

---

## 5. Offline Submission Instructions

1. **Print Forms on A4:** Print Form 1, Form 2, and Form 3 on clean white A4 paper.
2. **Affix Stamp:** Affix a ₹5 Court Fee Stamp on the top-right box of Form 1.
3. **Physical Signatures:**
   - Applicant signs Form 1.
   - All adult legal heirs sign Form 2.
   - Both witnesses sign Form 3.
4. **Witness Verification:** Present both witnesses with their photo IDs before the Village Officer.
5. **e-District Portal Upload:** Upload scanned copies of the signed documents and death certificate to the Kerala e-District portal or submit via an Akshaya Centre.

---

## 6. Local Setup and Deployment

### Running Locally:
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

### Deploying to Vercel:
1. Push this repository to GitHub / GitLab.
2. Import the project in Vercel.
3. Standard Next.js framework preset will automatically detect App Router settings.
4. Build command: `npm run build`
5. Node.js version: 18+ or 20+

---

## 7. Quality & Test Report

| Test Item | Status | Result |
|-----------|--------|--------|
| Application loads without JS errors | PASSED | Clean console, responsive Tailwind layout |
| Mobile & Desktop Responsiveness | PASSED | Touch targets, responsive grid, mobile bottom bar |
| Dynamic Legal Heirs Management | PASSED | Add, edit, remove with confirmation prompt |
| Dual Witness Support | PASSED | Two witnesses with complete locality details |
| Validation & Missing Fields Highlighting | PASSED | Live warnings, direct jump-to-step links |
| Uppercase Rule for English Strings | PASSED | Auto-capitalization verified without altering Malayalam |
| Malayalam Font & Ligature Rendering | PASSED | Native Malayalam typography rendered crisply |
| 3 Separate PDF Generations | PASSED | Individual high-res A4 downloads via jsPDF & html2canvas |
| 2 Separate TXT Generations | PASSED | eDistrict data format & separate Aadhaar audit checklist |
| WhatsApp Flow | PASSED | Correct wa.me/919961850698 link with non-sensitive enquiry |
| Session Reset Safety | PASSED | Confirmation modal prevents accidental data loss |
