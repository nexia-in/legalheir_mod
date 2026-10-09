"use client";

import { useState } from "react";
import {
  emptyHeir,
  KERALA_DISTRICTS,
  type DocStatus,
  type FormData,
  type Heir,
  type Witness,
} from "@/lib/types";
import {
  Card,
  Grid,
  SectionHeading,
  SelectField,
  StatusPicker,
  TextArea,
  TextField,
} from "@/components/ui/Field";

export interface StepProps {
  data: FormData;
  update: (patch: Partial<FormData>) => void;
  err: (field: string) => string | undefined;
}

const districtOptions = KERALA_DISTRICTS.map((d) => ({ value: d, label: d }));

/* ------------------------------------------------------------------ */
/* 1. APPLICANT                                                        */
/* ------------------------------------------------------------------ */
export function ApplicantStep({ data, update, err }: StepProps) {
  const a = data.applicant;
  const set = (k: keyof typeof a) => (v: string) => update({ applicant: { ...a, [k]: v } });

  return (
    <Card>
      <SectionHeading
        title="Applicant Details"
        malayalam="അപേക്ഷകന്റെ വിവരങ്ങൾ"
        description="Enter the details exactly as they appear on the Aadhaar card. English text is automatically printed in CAPITAL LETTERS on the generated forms."
      />
      <div className="space-y-6">
        <Grid>
          <TextField id="applicant-fullName" label="Full name (as per Aadhaar)" value={a.fullName} onChange={set("fullName")} required placeholder="e.g. Anand Kumar" error={err("applicant-fullName")} autoComplete="name" />
          <TextField id="applicant-dob" label="Date of birth" type="date" value={a.dob} onChange={set("dob")} error={err("applicant-dob")} />
          <TextField id="applicant-relationToDeceased" label="Relationship to the deceased" value={a.relationToDeceased} onChange={set("relationToDeceased")} required placeholder="e.g. Son / Wife / Daughter" error={err("applicant-relationToDeceased")} />
          <TextField id="applicant-aadhaar" label="Aadhaar number" value={a.aadhaar} onChange={(v) => set("aadhaar")(v.replace(/\D/g, "").slice(0, 12))} required inputMode="numeric" maxLength={12} placeholder="12 digits" hint="Stored only in your browser for this session." error={err("applicant-aadhaar")} />
          <TextField id="applicant-rationCardNumber" label="Ration card number" value={a.rationCardNumber} onChange={set("rationCardNumber")} error={err("applicant-rationCardNumber")} />
          <TextField id="applicant-electionId" label="Election ID / Voter ID" value={a.electionId} onChange={set("electionId")} error={err("applicant-electionId")} />
          <TextField id="applicant-mobile" label="Mobile number" value={a.mobile} onChange={(v) => set("mobile")(v.replace(/\D/g, "").slice(0, 10))} required inputMode="tel" maxLength={10} error={err("applicant-mobile")} autoComplete="tel" />
          <TextField id="applicant-email" label="Email address" type="email" value={a.email} onChange={set("email")} inputMode="email" placeholder="name@example.com" hint="Kept exactly as typed — never upper-cased." error={err("applicant-email")} autoComplete="email" />
        </Grid>

        <div>
          <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-slate-500">Address / വിലാസം</h3>
          <Grid cols={3}>
            <TextField id="applicant-wardNumber" label="Ward / Division number" value={a.wardNumber} onChange={set("wardNumber")} error={err("applicant-wardNumber")} />
            <TextField id="applicant-houseNumber" label="House number" value={a.houseNumber} onChange={set("houseNumber")} error={err("applicant-houseNumber")} />
            <TextField id="applicant-houseName" label="House name" value={a.houseName} onChange={set("houseName")} required error={err("applicant-houseName")} />
            <TextField id="applicant-locality" label="Locality" value={a.locality} onChange={set("locality")} error={err("applicant-locality")} />
            <TextField id="applicant-place" label="Place" value={a.place} onChange={set("place")} required error={err("applicant-place")} />
            <TextField id="applicant-postOffice" label="Post office" value={a.postOffice} onChange={set("postOffice")} required error={err("applicant-postOffice")} />
            <TextField id="applicant-pinCode" label="PIN code" value={a.pinCode} onChange={(v) => set("pinCode")(v.replace(/\D/g, "").slice(0, 6))} required inputMode="numeric" maxLength={6} error={err("applicant-pinCode")} />
            <TextField id="applicant-village" label="Village" value={a.village} onChange={set("village")} required error={err("applicant-village")} />
            <TextField id="applicant-taluk" label="Taluk" value={a.taluk} onChange={set("taluk")} error={err("applicant-taluk")} />
            <SelectField id="applicant-district" label="District" value={a.district} onChange={set("district")} options={districtOptions} required error={err("applicant-district")} />
            <TextField id="applicant-state" label="State" value={a.state} onChange={set("state")} error={err("applicant-state")} />
          </Grid>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* 2. DECEASED                                                         */
/* ------------------------------------------------------------------ */
export function DeceasedStep({ data, update, err }: StepProps) {
  const d = data.deceased;
  const set = (k: keyof typeof d) => (v: string) => update({ deceased: { ...d, [k]: v } });

  return (
    <Card>
      <SectionHeading
        title="Deceased Person Details"
        malayalam="മരണപ്പെട്ട ആളുടെ വിവരങ്ങൾ"
        description="Copy the name and the certificate number exactly as printed on the death certificate — spelling differences are the most common reason for rejection."
      />
      <Grid>
        <TextField id="deceased-fullName" label="Full name of the deceased" value={d.fullName} onChange={set("fullName")} required error={err("deceased-fullName")} />
        <TextField id="deceased-age" label="Age at the time of death" value={d.age} onChange={(v) => set("age")(v.replace(/\D/g, "").slice(0, 3))} inputMode="numeric" error={err("deceased-age")} />
        <TextField id="deceased-dateOfDemise" label="Date of demise" type="date" value={d.dateOfDemise} onChange={set("dateOfDemise")} required error={err("deceased-dateOfDemise")} />
        <TextField id="deceased-placeOfDemise" label="Place of demise" value={d.placeOfDemise} onChange={set("placeOfDemise")} required placeholder="Hospital / residence / place" error={err("deceased-placeOfDemise")} />
        <TextField id="deceased-deathCertificateNumber" label="Death certificate number" value={d.deathCertificateNumber} onChange={set("deathCertificateNumber")} error={err("deceased-deathCertificateNumber")} />
        <TextField id="deceased-deathRegistrationAuthority" label="Registering authority" value={d.deathRegistrationAuthority} onChange={set("deathRegistrationAuthority")} placeholder="e.g. Thrissur Municipal Corporation" error={err("deceased-deathRegistrationAuthority")} />
        <TextField id="deceased-occupationBeforeDeath" label="Occupation before death" value={d.occupationBeforeDeath} onChange={set("occupationBeforeDeath")} error={err("deceased-occupationBeforeDeath")} />
      </Grid>
      <div className="mt-4">
        <TextArea id="deceased-address" label="Full address of the deceased" value={d.address} onChange={set("address")} required rows={3} placeholder="House name, place, post office, PIN, village, district" error={err("deceased-address")} />
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* 3. HEIRS                                                            */
/* ------------------------------------------------------------------ */
export function HeirsStep({ data, update, err }: StepProps) {
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const heirs = data.heirs;

  const patch = (id: string, p: Partial<Heir>) =>
    update({ heirs: heirs.map((h) => (h.id === id ? { ...h, ...p } : h)) });

  const add = () => update({ heirs: [...heirs, emptyHeir()] });
  const remove = (id: string) => {
    update({ heirs: heirs.filter((h) => h.id !== id) });
    setPendingDelete(null);
  };

  return (
    <div className="space-y-5">
      <Card>
        <SectionHeading
          title="Legal Heirs / Claimants"
          malayalam="അനന്തരാവകാശികൾ"
          description="List every surviving legal heir of the deceased. Omitting an heir is the most common cause of enquiry delays at the Village Office."
        />
        <div
          id="heirs-section"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3"
        >
          <p className="text-[13.5px] font-semibold text-slate-700">
            {heirs.length} legal heir{heirs.length === 1 ? "" : "s"} added
          </p>
          <button
            type="button"
            onClick={add}
            className="rounded-xl bg-sky-600 px-4 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/25"
          >
            + Add Another Legal Heir
          </button>
        </div>
        {err("heirs-section") ? (
          <p role="alert" className="mt-2 text-[13px] font-semibold text-rose-600">
            ⚠ {err("heirs-section")}
          </p>
        ) : null}
      </Card>

      {heirs.map((h, i) => (
        <Card key={h.id}>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[17px] font-bold text-slate-900">Legal Heir {i + 1}</h3>
              <p className="text-[13px] text-slate-500">{h.fullName.trim() || "New entry"}</p>
            </div>
            {heirs.length > 1 ? (
              <button
                type="button"
                onClick={() => setPendingDelete(h.id)}
                className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-[13px] font-semibold text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-500/20"
              >
                Remove
              </button>
            ) : null}
          </div>

          {pendingDelete === h.id ? (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-[13.5px] font-semibold text-rose-800">
                Remove Legal Heir {i + 1}
                {h.fullName ? ` (${h.fullName})` : ""}? This cannot be undone.
              </p>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => remove(h.id)} className="rounded-xl bg-rose-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-rose-700">
                  Yes, remove
                </button>
                <button type="button" onClick={() => setPendingDelete(null)} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
                  Cancel
                </button>
              </div>
            </div>
          ) : null}

          <Grid>
            <TextField id={`heir-${h.id}-fullName`} label="Full name" value={h.fullName} onChange={(v) => patch(h.id, { fullName: v })} required error={err(`heir-${h.id}-fullName`)} />
            <SelectField id={`heir-${h.id}-gender`} label="Gender" value={h.gender} onChange={(v) => patch(h.id, { gender: v as Heir["gender"] })} required options={[{ value: "MALE", label: "Male" }, { value: "FEMALE", label: "Female" }, { value: "OTHER", label: "Other" }]} error={err(`heir-${h.id}-gender`)} />
            <TextField id={`heir-${h.id}-relationship`} label="Relationship to the deceased" value={h.relationship} onChange={(v) => patch(h.id, { relationship: v })} required placeholder="e.g. Son / Daughter / Wife" error={err(`heir-${h.id}-relationship`)} />
            <TextField id={`heir-${h.id}-age`} label="Age" value={h.age} onChange={(v) => patch(h.id, { age: v.replace(/\D/g, "").slice(0, 3) })} required inputMode="numeric" error={err(`heir-${h.id}-age`)} />
            <SelectField id={`heir-${h.id}-maritalStatus`} label="Marital status" value={h.maritalStatus} onChange={(v) => patch(h.id, { maritalStatus: v as Heir["maritalStatus"] })} options={[{ value: "SINGLE", label: "Single" }, { value: "MARRIED", label: "Married" }, { value: "WIDOWED", label: "Widowed" }, { value: "DIVORCED", label: "Divorced" }]} error={err(`heir-${h.id}-maritalStatus`)} />
            <TextField id={`heir-${h.id}-occupation`} label="Occupation" value={h.occupation} onChange={(v) => patch(h.id, { occupation: v })} error={err(`heir-${h.id}-occupation`)} />
            <TextField id={`heir-${h.id}-phone`} label="Phone number" value={h.phone} onChange={(v) => patch(h.id, { phone: v.replace(/\D/g, "").slice(0, 10) })} inputMode="tel" maxLength={10} error={err(`heir-${h.id}-phone`)} />
            <TextField id={`heir-${h.id}-aadhaar`} label="Aadhaar number" value={h.aadhaar} onChange={(v) => patch(h.id, { aadhaar: v.replace(/\D/g, "").slice(0, 12) })} inputMode="numeric" maxLength={12} hint="Used only in the internal checklist file — never printed on the forms." error={err(`heir-${h.id}-aadhaar`)} />
          </Grid>

          <div className="mt-4">
            <TextArea id={`heir-${h.id}-address`} label="Full address" value={h.address} onChange={(v) => patch(h.id, { address: v })} required rows={2} error={err(`heir-${h.id}-address`)} />
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-[14px] font-medium text-slate-700">
              <input
                type="checkbox"
                checked={h.isMinor}
                onChange={(e) => patch(h.id, { isMinor: e.target.checked })}
                className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              This heir is a minor (below 18 years)
            </label>
            {h.isMinor ? (
              <TextField id={`heir-${h.id}-guardianName`} label="Guardian name (signs on behalf of the minor)" value={h.guardianName} onChange={(v) => patch(h.id, { guardianName: v })} required error={err(`heir-${h.id}-guardianName`)} />
            ) : null}
            <StatusPicker id={`heir-${h.id}-aadhaarDocStatus`} label={`Aadhaar document status — Heir ${i + 1}`} value={h.aadhaarDocStatus} onChange={(v) => patch(h.id, { aadhaarDocStatus: v })} sublabel="Selecting 'Available' records the customer's statement only; it is not a verification." />
            <TextField id={`heir-${h.id}-remarks`} label="Remarks" value={h.remarks} onChange={(v) => patch(h.id, { remarks: v })} />
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. WITNESSES                                                        */
/* ------------------------------------------------------------------ */
export function WitnessStep({ data, update, err }: StepProps) {
  const witnesses = data.witnesses;
  const patch = (id: string, p: Partial<Witness>) =>
    update({ witnesses: witnesses.map((w) => (w.id === id ? { ...w, ...p } : w)) });

  return (
    <div className="space-y-5">
      <Card>
        <SectionHeading
          title="Witness Details"
          malayalam="സാക്ഷികളുടെ വിവരങ്ങൾ"
          description="Two witnesses are required. They should personally know the deceased and the family, and must sign the printed witness form in the presence of the verifying officer."
        />
        <p id="witness-section" className="rounded-2xl bg-slate-50 px-4 py-3 text-[13.5px] text-slate-600">
          Witness Aadhaar numbers are collected only for the internal verification checklist. They are
          <strong> not printed</strong> on the witness PDF.
        </p>
        {err("witness-section") ? (
          <p role="alert" className="mt-2 text-[13px] font-semibold text-rose-600">
            ⚠ {err("witness-section")}
          </p>
        ) : null}
      </Card>

      {witnesses.map((w, i) => (
        <Card key={w.id}>
          <h3 className="mb-4 text-[17px] font-bold text-slate-900">
            Witness {i + 1} <span className="text-[14px] font-medium text-slate-500">/ സാക്ഷി {i + 1}</span>
          </h3>
          <Grid>
            <TextField id={`witness-${w.id}-fullName`} label="Full name" value={w.fullName} onChange={(v) => patch(w.id, { fullName: v })} required error={err(`witness-${w.id}-fullName`)} />
            <TextField id={`witness-${w.id}-guardianName`} label="Father's / Husband's name" value={w.guardianName} onChange={(v) => patch(w.id, { guardianName: v })} error={err(`witness-${w.id}-guardianName`)} />
            <TextField id={`witness-${w.id}-age`} label="Age" value={w.age} onChange={(v) => patch(w.id, { age: v.replace(/\D/g, "").slice(0, 3) })} inputMode="numeric" error={err(`witness-${w.id}-age`)} />
            <TextField id={`witness-${w.id}-occupation`} label="Occupation" value={w.occupation} onChange={(v) => patch(w.id, { occupation: v })} error={err(`witness-${w.id}-occupation`)} />
            <TextField id={`witness-${w.id}-phone`} label="Phone number" value={w.phone} onChange={(v) => patch(w.id, { phone: v.replace(/\D/g, "").slice(0, 10) })} inputMode="tel" maxLength={10} error={err(`witness-${w.id}-phone`)} />
            <TextField id={`witness-${w.id}-aadhaar`} label="Aadhaar number" value={w.aadhaar} onChange={(v) => patch(w.id, { aadhaar: v.replace(/\D/g, "").slice(0, 12) })} inputMode="numeric" maxLength={12} error={err(`witness-${w.id}-aadhaar`)} />
          </Grid>
          <div className="mt-4 space-y-4">
            <TextArea id={`witness-${w.id}-address`} label="Full address" value={w.address} onChange={(v) => patch(w.id, { address: v })} required rows={2} error={err(`witness-${w.id}-address`)} />
            <TextField id={`witness-${w.id}-relationToFamily`} label="How the witness knows the family" value={w.relationToFamily} onChange={(v) => patch(w.id, { relationToFamily: v })} placeholder="e.g. Neighbour for 20 years" error={err(`witness-${w.id}-relationToFamily`)} />
            <StatusPicker id={`witness-${w.id}-aadhaarDocStatus`} label={`Aadhaar document status — Witness ${i + 1}`} value={w.aadhaarDocStatus} onChange={(v) => patch(w.id, { aadhaarDocStatus: v })} />
            <TextField id={`witness-${w.id}-remarks`} label="Remarks" value={w.remarks} onChange={(v) => patch(w.id, { remarks: v })} />
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. DOCUMENTS                                                        */
/* ------------------------------------------------------------------ */
export function DocumentsStepView({ data, update, err }: StepProps) {
  const doc = data.documents;
  const set = <K extends keyof typeof doc>(k: K) => (v: (typeof doc)[K]) =>
    update({ documents: { ...doc, [k]: v } });
  const setStatus = (k: keyof typeof doc) => (v: DocStatus) =>
    update({ documents: { ...doc, [k]: v } });

  return (
    <div className="space-y-5">
      <Card>
        <SectionHeading
          title="Supporting Documents"
          malayalam="അനുബന്ധ രേഖകൾ"
          description="Record the current status of each supporting document. 'Available' records what the customer told you — it does not mark the document as verified."
        />
        <div id="doc-checklist" className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <StatusPicker id="doc-applicantAadhaar" label="Applicant Aadhaar" value={doc.applicantAadhaar} onChange={setStatus("applicantAadhaar")} />
          <StatusPicker id="doc-applicantVoterId" label="Applicant Voter ID" value={doc.applicantVoterId} onChange={setStatus("applicantVoterId")} />
          <StatusPicker id="doc-rationCard" label="Ration Card" value={doc.rationCard} onChange={setStatus("rationCard")} />
          <StatusPicker id="doc-deathCertificate" label="Death Certificate" value={doc.deathCertificate} onChange={setStatus("deathCertificate")} />
          <StatusPicker id="doc-addressProof" label="Address proof" value={doc.addressProof} onChange={setStatus("addressProof")} />
          <StatusPicker id="doc-relationshipProof" label="Relationship proof" value={doc.relationshipProof} onChange={setStatus("relationshipProof")} sublabel="e.g. ration card showing family members, school certificate" />
          <StatusPicker id="doc-minorGuardianProof" label="Guardian proof (if a minor heir exists)" value={doc.minorGuardianProof} onChange={setStatus("minorGuardianProof")} />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField id="doc-otherDocumentName" label="Other document (name)" value={doc.otherDocumentName} onChange={set("otherDocumentName")} />
          <StatusPicker id="doc-otherDocumentStatus" label="Other document status" value={doc.otherDocumentStatus} onChange={setStatus("otherDocumentStatus")} />
        </div>
        <p className="mt-4 text-[12.5px] text-slate-500">
          Aadhaar document status for each heir and witness is captured on their own step.
        </p>
      </Card>

      <Card>
        <SectionHeading title="Application & Declaration" malayalam="അപേക്ഷയും സത്യപ്രസ്താവനയും" />
        <Grid>
          <TextField id="doc-submissionOffice" label="Submitting office" value={doc.submissionOffice} onChange={set("submissionOffice")} placeholder="e.g. Village Office, Ollur" error={err("doc-submissionOffice")} />
          <TextField id="doc-declarationPlace" label="Declaration place" value={doc.declarationPlace} onChange={set("declarationPlace")} required error={err("doc-declarationPlace")} />
          <TextField id="doc-declarationDate" label="Declaration date" type="date" value={doc.declarationDate} onChange={set("declarationDate")} required error={err("doc-declarationDate")} />
        </Grid>
        <div className="mt-4 space-y-4">
          <TextArea id="doc-purpose" label="Purpose for which the certificate is required" value={doc.purpose} onChange={set("purpose")} required rows={2} placeholder="e.g. Bank account settlement, pension claim, property transfer" error={err("doc-purpose")} />
          <TextArea id="doc-operatorRemarks" label="Operator remarks (internal only)" value={doc.operatorRemarks} onChange={set("operatorRemarks")} rows={2} hint="Appears only in the internal TXT files, never in the printable PDFs." />
        </div>
      </Card>
    </div>
  );
}
