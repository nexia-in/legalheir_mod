"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormData } from "@/lib/types";
import { DOC_STATUS_LABEL } from "@/lib/types";
import { downloadBlob, downloadText, formatDate, maskAadhaar, up } from "@/lib/format";
import { buildChecklistTxt, buildOnlineApplicationTxt } from "@/lib/txt";
import { DOC_META, generatePdf, type GeneratedPdf } from "@/lib/pdf/generate";
import type { DocKey } from "@/lib/pdf/overlay";
import { Card, SectionHeading } from "@/components/ui/Field";
import type { Issue } from "@/lib/validation";

const WHATSAPP_URL =
  "https://wa.me/919961850698?text=" +
  encodeURIComponent(
    "Hello Nexia Virtual Desk, I have prepared my Legal Heirship Certificate documents and need assistance. (No personal details are included in this message.)"
  );

const DOC_ORDER: DocKey[] = ["main", "heir", "witness"];

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-x-2 border-b border-slate-100 py-1.5 last:border-0">
      <span className="min-w-[170px] text-[12.5px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-[13.5px] font-medium text-slate-900">{value || "—"}</span>
    </div>
  );
}

function Collapsible({
  title,
  subtitle,
  onEdit,
  children,
  defaultOpen,
}: {
  title: string;
  subtitle?: string;
  onEdit: () => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group rounded-2xl border border-slate-200 bg-white/70">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3.5 hover:bg-slate-50">
        <span>
          <span className="text-[15px] font-bold text-slate-900">{title}</span>
          {subtitle ? <span className="ml-2 text-[12.5px] text-slate-500">{subtitle}</span> : null}
        </span>
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-[12px] font-semibold text-sky-700 hover:bg-sky-100"
          >
            Edit
          </button>
          <span className="text-slate-400 transition group-open:rotate-180" aria-hidden>
            ▾
          </span>
        </span>
      </summary>
      <div className="border-t border-slate-100 px-4 py-3">{children}</div>
    </details>
  );
}

export function ReviewStep({
  data,
  issues,
  goToStep,
}: {
  data: FormData;
  issues: Issue[];
  goToStep: (s: number) => void;
}) {
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [docs, setDocs] = useState<Partial<Record<DocKey, GeneratedPdf>>>({});
  const [preview, setPreview] = useState<{ key: DocKey; url: string } | null>(null);
  const generatedRef = useRef<Partial<Record<DocKey, GeneratedPdf>>>({});

  useEffect(() => {
    generatedRef.current = docs;
  }, [docs]);

  // Revoke object URLs on unmount so the blobs are released.
  useEffect(() => {
    return () => {
      Object.values(generatedRef.current).forEach((d) => d && URL.revokeObjectURL(d.url));
    };
  }, []);

  const generateAll = useCallback(async () => {
    setError(null);
    const next: Partial<Record<DocKey, GeneratedPdf>> = {};
    try {
      for (const key of DOC_ORDER) {
        setBusy(`Generating ${DOC_META[key].title}…`);
        next[key] = await generatePdf(key, data);
      }
      Object.values(generatedRef.current).forEach((d) => d && URL.revokeObjectURL(d.url));
      setDocs(next);
    } catch (e) {
      Object.values(next).forEach((d) => d && URL.revokeObjectURL(d.url));
      setError(
        "The PDF could not be generated in this browser. Please try again, or use an updated version of Chrome, Edge, Firefox or Safari."
      );
      // Deliberately not logging `e` — it could contain form values.
      void e;
    } finally {
      setBusy(null);
    }
  }, [data]);

  const ready = Object.keys(docs).length === DOC_ORDER.length;
  const heirsWithAadhaar = data.heirs.filter((h) => h.aadhaar).length;

  return (
    <div className="space-y-5">
      <Card>
        <SectionHeading
          title="Review & Download"
          malayalam="വിവരങ്ങൾ പരിശോധിക്കുക"
          description="Check every section before generating the documents. Aadhaar numbers are masked here; the full numbers appear only in the checklist file you download."
        />

        {errors.length > 0 ? (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <h3 className="text-[14px] font-bold text-rose-800">
              {errors.length} required item{errors.length === 1 ? "" : "s"} still missing
            </h3>
            <ul className="mt-2 space-y-1.5">
              {errors.map((i, n) => (
                <li key={`${i.field}-${n}`} className="flex flex-wrap items-center gap-2 text-[13px] text-rose-800">
                  <button
                    type="button"
                    onClick={() => goToStep(i.step)}
                    className="rounded-md bg-white px-2 py-0.5 text-[11.5px] font-bold text-rose-700 underline-offset-2 hover:underline"
                  >
                    Fix
                  </button>
                  <span className="font-semibold">{i.label}</span>
                  <span className="text-rose-600">— {i.message}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-[13.5px] font-semibold text-emerald-800">
            ✓ All required fields are filled in.
          </div>
        )}

        {warnings.length > 0 ? (
          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="text-[14px] font-bold text-amber-900">
              {warnings.length} warning{warnings.length === 1 ? "" : "s"} — you can still download
            </h3>
            <ul className="mt-2 space-y-1.5">
              {warnings.map((i, n) => (
                <li key={`${i.field}-${n}`} className="flex flex-wrap items-center gap-2 text-[13px] text-amber-900">
                  <button
                    type="button"
                    onClick={() => goToStep(i.step)}
                    className="rounded-md bg-white px-2 py-0.5 text-[11.5px] font-bold text-amber-800 underline-offset-2 hover:underline"
                  >
                    Review
                  </button>
                  <span className="font-semibold">{i.label}</span>
                  <span>— {i.message}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="space-y-3">
          <Collapsible title="Applicant" subtitle={up(data.applicant.fullName)} onEdit={() => goToStep(0)} defaultOpen>
            <Line label="Full name" value={up(data.applicant.fullName)} />
            <Line label="Relationship" value={up(data.applicant.relationToDeceased)} />
            <Line label="Date of birth" value={formatDate(data.applicant.dob)} />
            <Line label="Aadhaar (masked)" value={maskAadhaar(data.applicant.aadhaar)} />
            <Line label="Ration card" value={up(data.applicant.rationCardNumber)} />
            <Line label="Voter ID" value={up(data.applicant.electionId)} />
            <Line label="Mobile" value={data.applicant.mobile} />
            <Line label="Email" value={data.applicant.email} />
            <Line
              label="Address"
              value={[
                up(data.applicant.houseNumber),
                up(data.applicant.houseName),
                up(data.applicant.locality),
                up(data.applicant.place),
                data.applicant.postOffice ? `${up(data.applicant.postOffice)} P.O` : "",
                data.applicant.pinCode ? `PIN ${data.applicant.pinCode}` : "",
                up(data.applicant.village),
                up(data.applicant.taluk),
                up(data.applicant.district),
                up(data.applicant.state),
              ]
                .filter(Boolean)
                .join(", ")}
            />
          </Collapsible>

          <Collapsible title="Deceased person" subtitle={up(data.deceased.fullName)} onEdit={() => goToStep(1)}>
            <Line label="Full name" value={up(data.deceased.fullName)} />
            <Line label="Age at death" value={data.deceased.age} />
            <Line label="Address" value={up(data.deceased.address)} />
            <Line label="Date of demise" value={formatDate(data.deceased.dateOfDemise)} />
            <Line label="Place of demise" value={up(data.deceased.placeOfDemise)} />
            <Line label="Death certificate no." value={up(data.deceased.deathCertificateNumber)} />
            <Line label="Registering authority" value={up(data.deceased.deathRegistrationAuthority)} />
          </Collapsible>

          <Collapsible
            title="Legal heirs"
            subtitle={`${data.heirs.length} entries · ${heirsWithAadhaar} with Aadhaar`}
            onEdit={() => goToStep(2)}
          >
            {data.heirs.length === 0 ? (
              <p className="text-[13.5px] font-semibold text-rose-600">No legal heir added.</p>
            ) : (
              <div className="space-y-3">
                {data.heirs.map((h, i) => (
                  <div key={h.id} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[14px] font-bold text-slate-900">
                      {i + 1}. {up(h.fullName) || "(NO NAME)"}
                      {h.isMinor ? <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-[11px] text-amber-800">MINOR</span> : null}
                    </p>
                    <Line label="Relationship" value={up(h.relationship)} />
                    <Line label="Gender / Age" value={[up(h.gender), h.age].filter(Boolean).join(" / ")} />
                    <Line label="Occupation" value={up(h.occupation)} />
                    <Line label="Address" value={up(h.address)} />
                    <Line label="Phone" value={h.phone} />
                    <Line label="Aadhaar (masked)" value={maskAadhaar(h.aadhaar)} />
                    <Line label="Aadhaar doc status" value={DOC_STATUS_LABEL[h.aadhaarDocStatus]} />
                    {h.isMinor ? <Line label="Guardian" value={up(h.guardianName)} /> : null}
                  </div>
                ))}
              </div>
            )}
          </Collapsible>

          <Collapsible title="Witnesses" subtitle={`${data.witnesses.filter((w) => w.fullName).length} of 2 entered`} onEdit={() => goToStep(3)}>
            <div className="space-y-3">
              {data.witnesses.map((w, i) => (
                <div key={w.id} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[14px] font-bold text-slate-900">
                    Witness {i + 1}: {up(w.fullName) || "(NOT ENTERED)"}
                  </p>
                  <Line label="Father / Husband" value={up(w.guardianName)} />
                  <Line label="Age / Occupation" value={[w.age, up(w.occupation)].filter(Boolean).join(" / ")} />
                  <Line label="Address" value={up(w.address)} />
                  <Line label="Phone" value={w.phone} />
                  <Line label="Aadhaar (masked)" value={maskAadhaar(w.aadhaar)} />
                  <Line label="Aadhaar doc status" value={DOC_STATUS_LABEL[w.aadhaarDocStatus]} />
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible title="Documents & declaration" onEdit={() => goToStep(4)}>
            <Line label="Applicant Aadhaar" value={DOC_STATUS_LABEL[data.documents.applicantAadhaar]} />
            <Line label="Applicant Voter ID" value={DOC_STATUS_LABEL[data.documents.applicantVoterId]} />
            <Line label="Ration card" value={DOC_STATUS_LABEL[data.documents.rationCard]} />
            <Line label="Death certificate" value={DOC_STATUS_LABEL[data.documents.deathCertificate]} />
            <Line label="Address proof" value={DOC_STATUS_LABEL[data.documents.addressProof]} />
            <Line label="Relationship proof" value={DOC_STATUS_LABEL[data.documents.relationshipProof]} />
            <Line label="Guardian proof" value={DOC_STATUS_LABEL[data.documents.minorGuardianProof]} />
            {data.documents.otherDocumentName ? (
              <Line label={up(data.documents.otherDocumentName)} value={DOC_STATUS_LABEL[data.documents.otherDocumentStatus]} />
            ) : null}
            <Line label="Purpose" value={up(data.documents.purpose)} />
            <Line label="Submitting office" value={up(data.documents.submissionOffice)} />
            <Line label="Place / Date" value={[up(data.documents.declarationPlace), formatDate(data.documents.declarationDate)].filter(Boolean).join(" / ")} />
          </Collapsible>
        </div>
      </Card>

      {/* -------- generation -------- */}
      <Card>
        <SectionHeading title="Generate documents" malayalam="രേഖകൾ തയ്യാറാക്കുക" />

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-[13.5px] text-slate-700">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <span>
            I have reviewed the information above and confirm it is correct. I understand that Nexia Virtual Desk is a
            private assistance service and that the final decision rests with the government authority.
          </span>
        </label>

        <button
          type="button"
          disabled={!confirmed || busy !== null}
          onClick={generateAll}
          className="mt-4 w-full rounded-2xl bg-slate-900 px-6 py-4 text-[16px] font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
        >
          {busy ?? (ready ? "Regenerate all documents" : "Generate the 3 application PDFs")}
        </button>

        {error ? (
          <p role="alert" className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-[13px] font-semibold text-rose-700">
            {error}
          </p>
        ) : null}

        {ready ? (
          <div className="mt-5 space-y-3">
            {DOC_ORDER.map((key) => {
              const d = docs[key];
              if (!d) return null;
              return (
                <div key={key} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-bold text-slate-900">{DOC_META[key].title}</p>
                      <p className="text-[13px] text-slate-500">{DOC_META[key].malayalam}</p>
                      <p className="mt-1 text-[11.5px] text-slate-400">
                        {d.filename} · {d.mode === "overlay" ? "overlaid on the original template" : "print-ready reproduction"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setPreview({ key, url: d.url })}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Preview {DOC_META[key].title.split("–")[0].trim()}
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadBlob(d.blob, d.filename)}
                        className="rounded-xl bg-sky-600 px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-sky-700"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </Card>

      {/* -------- TXT files -------- */}
      <Card>
        <SectionHeading
          title="Data files for the operator"
          malayalam="ഓപ്പറേറ്റർക്കുള്ള ഡാറ്റ ഫയലുകൾ"
          description="These two plain-text files are completely separate from the three PDFs. The checklist file contains full Aadhaar numbers — keep it confidential."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => downloadText(buildOnlineApplicationTxt(data), "Nexia_eDistrict_Online_Application_Data.txt")}
            className="rounded-2xl border border-slate-900/10 bg-slate-900 px-5 py-4 text-left text-white transition hover:bg-slate-800"
          >
            <span className="block text-[14.5px] font-bold">Download e-District data (.txt)</span>
            <span className="mt-1 block text-[12px] text-slate-300">Nexia_eDistrict_Online_Application_Data.txt</span>
          </button>
          <button
            type="button"
            onClick={() => downloadText(buildChecklistTxt(data), "Nexia_Aadhaar_Documents_Checklist.txt")}
            className="rounded-2xl border border-emerald-700/20 bg-emerald-700 px-5 py-4 text-left text-white transition hover:bg-emerald-800"
          >
            <span className="block text-[14.5px] font-bold">Download Aadhaar &amp; document checklist (.txt)</span>
            <span className="mt-1 block text-[12px] text-emerald-100">Nexia_Aadhaar_Documents_Checklist.txt</span>
          </button>
        </div>
      </Card>

      {/* -------- completion -------- */}
      {ready ? (
        <Card className="border-emerald-200/70 bg-emerald-50/70">
          <h2 className="text-xl font-bold text-emerald-900">Your documents are ready</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-emerald-900/85">
            Your application documents have been prepared. Please review the PDFs carefully, print them, obtain the
            required signatures, and verify all supporting documents before submission. For assistance, contact Nexia
            Virtual Desk.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] text-emerald-900/80">
            <li>Print on A4 paper. Signature spaces are intentionally left blank.</li>
            <li>The applicant, every heir (or guardian) and both witnesses must sign by hand.</li>
            <li>Downloaded files stay on this device until you delete them.</li>
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-[15px] font-bold text-white shadow-md transition hover:brightness-95"
          >
            <span aria-hidden>💬</span> Contact Nexia on WhatsApp
          </a>
          <p className="mt-2 text-[11.5px] text-emerald-900/70">
            Opens WhatsApp with a short enquiry message only. No personal details, Aadhaar numbers or files are attached
            automatically.
          </p>
        </Card>
      ) : null}

      {preview ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${DOC_META[preview.key].title} preview`}
          className="fixed inset-0 z-50 flex flex-col bg-slate-900/70 p-3 backdrop-blur-sm sm:p-6"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[15px] font-bold text-white">{DOC_META[preview.key].title} — preview</p>
            <div className="flex gap-2">
              <a
                href={preview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white/15 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-white/25"
              >
                Open in new tab
              </a>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-xl bg-white px-4 py-2 text-[13px] font-bold text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
          <iframe title="PDF preview" src={preview.url} className="min-h-0 w-full flex-1 rounded-2xl bg-white" />
          <p className="mt-2 text-center text-[11.5px] text-white/75">
            If the preview does not appear on your phone, tap “Open in new tab” or download the file.
          </p>
        </div>
      ) : null}
    </div>
  );
}
