import type { FormData } from "@/lib/types";
import { asIs, formatDate, joinAddress, up, upMultiline } from "@/lib/format";

/**
 * Flat, already-uppercased value map used by the optional template-overlay
 * engine. Keys are referenced from public/templates/manifest.json.
 */
export function flattenValues(data: FormData): Record<string, string> {
  const a = data.applicant;
  const d = data.deceased;
  const doc = data.documents;

  const out: Record<string, string> = {
    "applicant.fullName": up(a.fullName),
    "applicant.dob": formatDate(a.dob),
    "applicant.relationToDeceased": up(a.relationToDeceased),
    "applicant.aadhaar": asIs(a.aadhaar),
    "applicant.rationCardNumber": up(a.rationCardNumber),
    "applicant.electionId": up(a.electionId),
    "applicant.mobile": asIs(a.mobile),
    "applicant.email": asIs(a.email),
    "applicant.wardNumber": up(a.wardNumber),
    "applicant.houseNumber": up(a.houseNumber),
    "applicant.houseName": up(a.houseName),
    "applicant.locality": up(a.locality),
    "applicant.place": up(a.place),
    "applicant.postOffice": up(a.postOffice),
    "applicant.pinCode": asIs(a.pinCode),
    "applicant.village": up(a.village),
    "applicant.taluk": up(a.taluk),
    "applicant.district": up(a.district),
    "applicant.state": up(a.state),
    "applicant.fullAddress": joinAddress([
      a.houseNumber,
      a.houseName,
      a.locality,
      a.place,
      a.postOffice && `${a.postOffice} P.O`,
      a.pinCode && `PIN ${a.pinCode}`,
      a.village && `${a.village} VILLAGE`,
      a.taluk && `${a.taluk} TALUK`,
      a.district,
      a.state,
    ]),
    "deceased.fullName": up(d.fullName),
    "deceased.address": upMultiline(d.address).replace(/\n/g, ", "),
    "deceased.dateOfDemise": formatDate(d.dateOfDemise),
    "deceased.placeOfDemise": up(d.placeOfDemise),
    "deceased.deathCertificateNumber": up(d.deathCertificateNumber),
    "deceased.deathRegistrationAuthority": up(d.deathRegistrationAuthority),
    "deceased.age": asIs(d.age),
    "deceased.occupationBeforeDeath": up(d.occupationBeforeDeath),
    "documents.purpose": upMultiline(doc.purpose).replace(/\n/g, " "),
    "documents.submissionOffice": up(doc.submissionOffice),
    "documents.declarationPlace": up(doc.declarationPlace),
    "documents.declarationDate": formatDate(doc.declarationDate),
    "meta.heirCount": String(data.heirs.length),
  };

  data.heirs.forEach((h, i) => {
    const p = `heirs.${i}.`;
    out[`${p}fullName`] = up(h.fullName);
    out[`${p}gender`] = up(h.gender);
    out[`${p}age`] = asIs(h.age);
    out[`${p}relationship`] = up(h.relationship);
    out[`${p}occupation`] = up(h.occupation);
    out[`${p}maritalStatus`] = up(h.maritalStatus);
    out[`${p}address`] = upMultiline(h.address).replace(/\n/g, ", ");
    out[`${p}phone`] = asIs(h.phone);
    out[`${p}guardianName`] = up(h.guardianName);
  });

  data.witnesses.forEach((w, i) => {
    const p = `witnesses.${i}.`;
    out[`${p}fullName`] = up(w.fullName);
    out[`${p}guardianName`] = up(w.guardianName);
    out[`${p}age`] = asIs(w.age);
    out[`${p}occupation`] = up(w.occupation);
    out[`${p}address`] = upMultiline(w.address).replace(/\n/g, ", ");
    out[`${p}phone`] = asIs(w.phone);
    out[`${p}relationToFamily`] = up(w.relationToFamily);
  });

  return out;
}
