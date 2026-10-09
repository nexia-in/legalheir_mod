import React, { useState } from "react";
import { FullApplicationData } from "@/types";
import { toUpperEnglish, maskAadhaar, formatDateKerala } from "@/utils/textFormatters";
import {
  FileText,
  Download,
  Eye,
  Printer,
  Edit3,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  FileSpreadsheet,
  ShieldCheck,
  FolderArchive,
} from "lucide-react";

interface StepReviewAndDownloadProps {
  data: FullApplicationData;
  onNavigateToStep: (step: number) => void;
  onPreviewPdf: (docType: "main" | "heir" | "witness") => void;
  onDownloadPdf: (docType: "main" | "heir" | "witness") => Promise<void>;
  onPrintPdf: (docType: "main" | "heir" | "witness") => void;
  onDownloadOnlineDataTxt: () => void;
  onDownloadAadhaarChecklistTxt: () => void;
  onDownloadAllBundle: () => Promise<void>;
}

export const StepReviewAndDownload: React.FC<StepReviewAndDownloadProps> = ({
  data,
  onNavigateToStep,
  onPreviewPdf,
  onDownloadPdf,
  onPrintPdf,
  onDownloadOnlineDataTxt,
  onDownloadAadhaarChecklistTxt,
  onDownloadAllBundle,
}) => {
  // Collapsible sections
  const [collapsed, setCollapsed] = useState({
    applicant: false,
    deceased: false,
    heirs: false,
    witnesses: false,
    documents: false,
  });

  const [copiedOnline, setCopiedOnline] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  const toggleSection = (section: keyof typeof collapsed) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Validation warnings
  const warnings: string[] = [];
  if (!data.applicant.fullName) warnings.push("Applicant full name is missing.");
  if (!data.applicant.mobileNumber) warnings.push("Applicant mobile number is missing.");
  if (!data.deceased.fullName) warnings.push("Deceased person's full name is missing.");
  if (!data.deceased.deathCertificateNumber) warnings.push("Death certificate number is missing.");
  if (data.heirs.length === 0) warnings.push("No legal heirs added. At least one legal heir is required.");
  if (!data.witness1.fullName || !data.witness2.fullName) warnings.push("Two witnesses are required.");

  const handleDownloadWithLoading = async (docType: "main" | "heir" | "witness") => {
    setDownloadingDoc(docType);
    try {
      await onDownloadPdf(docType);
    } catch (e) {
      console.error(e);
      alert("Error generating PDF. Please try printing directly.");
    } finally {
      setDownloadingDoc(null);
    }
  };

  const handleDownloadAllWithLoading = async () => {
    setDownloadingDoc("all");
    try {
      await onDownloadAllBundle();
    } catch (e) {
      console.error(e);
      alert("Error downloading all files.");
    } finally {
      setDownloadingDoc(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Step 6 of 6 • Review & Document Generation
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Review & Download Official Documents
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Verify all entered details. When ready, generate and download the three individual PDFs and the two text files below.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadAllWithLoading}
            disabled={downloadingDoc !== null}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md cursor-pointer disabled:opacity-60 shrink-0"
          >
            <FolderArchive className="w-4 h-4" />
            <span>{downloadingDoc === "all" ? "Generating Bundle..." : "Download All 5 Files"}</span>
          </button>
        </div>

        {/* Validation Warning Alert */}
        {warnings.length > 0 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1 text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Incomplete Information Detected ({warnings.length} items):</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-amber-800">
              {warnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-amber-700 italic">
              You can still generate documents, but government authorities require complete details for certificate issuance.
            </p>
          </div>
        )}
      </div>

      {/* GENERATE SEPARATE PDF DOCUMENTS SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Three Printable Application Forms (A4 PDFs)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Individual print-ready PDFs formatted according to Kerala Revenue Department standards with dedicated handwritten signature areas.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            A4 Print Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Main Application */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                  Form 1 • LH-01
                </span>
                <span className="text-[11px] text-slate-500 font-mono">1 Page A4</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">Main Application</h4>
              <p className="text-xs font-sans text-blue-950 mt-0.5">പ്രധാന അപേക്ഷ (തഹസിൽദാർ മുമ്പാകെ)</p>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                Addressed to Tahsildar with ₹5 Court Fee Stamp box, complete applicant & deceased person details, purpose, and applicant signature box.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
              <button
                type="button"
                onClick={() => onPreviewPdf("main")}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Preview Form 1</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadWithLoading("main")}
                  disabled={downloadingDoc === "main"}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingDoc === "main" ? "Building..." : "Download"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onPrintPdf("main")}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Legal Heir Form */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                  Form 2 • LH-02
                </span>
                <span className="text-[11px] text-slate-500 font-mono">{data.heirs.length} Heirs</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">Legal Heir Schedule</h4>
              <p className="text-xs font-sans text-blue-950 mt-0.5">അനന്തരാവകാശികളുടെ പട്ടിക & സത്യവാങ്മൂലം</p>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                Tabular schedule of all heirs (age, relationship, occupation, address) with Joint Declaration and handwritten signature spaces for each heir.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
              <button
                type="button"
                onClick={() => onPreviewPdf("heir")}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Preview Form 2</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadWithLoading("heir")}
                  disabled={downloadingDoc === "heir"}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingDoc === "heir" ? "Building..." : "Download"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onPrintPdf("heir")}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Witness Form */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                  Form 3 • LH-03
                </span>
                <span className="text-[11px] text-slate-500 font-mono">2 Witnesses</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">Witness Deposition Form</h4>
              <p className="text-xs font-sans text-blue-950 mt-0.5">സാക്ഷിമൊഴിപ്പത്രിക (വില്ലേജ് ഓഫീസർ മുമ്പാകെ)</p>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                Deposition statement of 2 local neighbours with credentials, signature boxes, and official Village Officer endorsement seal area.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
              <button
                type="button"
                onClick={() => onPreviewPdf("witness")}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Preview Form 3</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadWithLoading("witness")}
                  disabled={downloadingDoc === "witness"}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingDoc === "witness" ? "Building..." : "Download"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onPrintPdf("witness")}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GENERATE TWO SEPARATE TEXT FILES SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            Two Separate Data & Audit Files (.txt)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured plain-text files completely segregated from the printable PDFs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TXT File 1: Online Application Data */}
          <div className="border border-emerald-200/80 rounded-2xl p-4 bg-emerald-50/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Operator Entry TXT
                </span>
                <span className="text-[10px] font-mono text-emerald-700">edistrict.kerala.gov.in</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Nexia_eDistrict_Online_Application_Data.txt
              </h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                Contains organized copy-and-paste sections for the online e-District portal or Akshaya operator. English text is converted to UPPERCASE.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-2">
              <button
                type="button"
                onClick={onDownloadOnlineDataTxt}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt File</span>
              </button>
            </div>
          </div>

          {/* TXT File 2: Aadhaar & Supporting Documents Checklist */}
          <div className="border border-blue-200/80 rounded-2xl p-4 bg-blue-50/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  Internal Verification Audit
                </span>
                <span className="text-[10px] font-mono text-blue-700">Confidential</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Nexia_Aadhaar_Documents_Checklist.txt
              </h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                Structured checklist of each individual&apos;s Aadhaar numbers, voter IDs, document readiness status, and operator sign-off template.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-100 flex items-center gap-2">
              <button
                type="button"
                onClick={onDownloadAadhaarChecklistTxt}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Checklist .txt</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE DATA SUMMARY CARDS */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 pt-2">
          Entered Information Review Summary
        </h3>

        {/* 1. Applicant Details */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div
            onClick={() => toggleSection("applicant")}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <span className="font-bold text-sm text-slate-900">Applicant Details</span>
                <span className="text-xs text-slate-500 ml-2">
                  {toUpperEnglish(data.applicant.fullName) || "Name missing"} (
                  {toUpperEnglish(data.applicant.relationshipToDeceased)})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToStep(1);
                }}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              {collapsed.applicant ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {!collapsed.applicant && (
            <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/50">
              <div>
                <span className="text-slate-500 block text-[11px]">Full Name:</span>
                <strong className="text-slate-900 uppercase">{toUpperEnglish(data.applicant.fullName) || "—"}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Mobile Number:</span>
                <strong className="text-slate-900">{data.applicant.mobileNumber || "—"}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Aadhaar Number:</span>
                <span className="font-mono text-slate-900">{maskAadhaar(data.applicant.aadhaarNumber)}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Ration Card:</span>
                <span className="text-slate-900 uppercase">{data.applicant.rationCardNumber || "—"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[11px]">Address:</span>
                <span className="text-slate-900 uppercase">
                  {data.applicant.houseName}, {data.applicant.locality}, {data.applicant.place},{" "}
                  {data.applicant.postOffice} - {data.applicant.pinCode}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Village / Taluk:</span>
                <span className="text-slate-900 uppercase">
                  {data.applicant.village} / {data.applicant.taluk}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">District:</span>
                <strong className="text-slate-900 uppercase">{data.applicant.district}</strong>
              </div>
            </div>
          )}
        </div>

        {/* 2. Deceased Person Details */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div
            onClick={() => toggleSection("deceased")}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <span className="font-bold text-sm text-slate-900">Deceased Person Details</span>
                <span className="text-xs text-slate-500 ml-2">
                  {toUpperEnglish(data.deceased.fullName) || "Name missing"} (Demise:{" "}
                  {formatDateKerala(data.deceased.dateOfDemise) || "—"})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToStep(2);
                }}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              {collapsed.deceased ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {!collapsed.deceased && (
            <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/50">
              <div>
                <span className="text-slate-500 block text-[11px]">Deceased Full Name:</span>
                <strong className="text-slate-900 uppercase">{toUpperEnglish(data.deceased.fullName) || "—"}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Date of Demise:</span>
                <strong className="text-slate-900">{formatDateKerala(data.deceased.dateOfDemise) || "—"}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Death Cert No:</span>
                <span className="text-slate-900 uppercase">{data.deceased.deathCertificateNumber || "—"}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Religion & Caste:</span>
                <span className="text-slate-900 uppercase">{data.deceased.religion} ({data.deceased.caste})</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[11px]">Place of Demise:</span>
                <span className="text-slate-900 uppercase">{data.deceased.placeOfDemise || "—"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[11px]">Purpose of Certificate:</span>
                <span className="font-semibold text-blue-900 uppercase">{data.deceased.purposeOfCertificate}</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Legal Heirs Details */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div
            onClick={() => toggleSection("heirs")}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <span className="font-bold text-sm text-slate-900">Legal Heirs ({data.heirs.length})</span>
                <span className="text-xs text-slate-500 ml-2">
                  {data.heirs.map((h) => toUpperEnglish(h.fullName)).join(", ") || "None added"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToStep(3);
                }}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              {collapsed.heirs ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {!collapsed.heirs && (
            <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-700 bg-slate-50/50">
              <div className="divide-y divide-slate-200">
                {data.heirs.map((heir, idx) => (
                  <div key={idx} className="py-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 uppercase">
                        {idx + 1}. {toUpperEnglish(heir.fullName)}
                      </span>
                      <span className="text-slate-500 ml-2">
                        ({toUpperEnglish(heir.relationship)}, {heir.age} Yrs, {heir.gender})
                      </span>
                      {heir.isApplicant && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          Primary Applicant
                        </span>
                      )}
                      {heir.isMinor && (
                        <span className="ml-2 bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          Minor (Guardian: {heir.guardianName})
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-[11px] font-mono">
                      Aadhaar: {heir.aadhaarNumber ? maskAadhaar(heir.aadhaarNumber) : "Not Provided"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Witnesses Details */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div
            onClick={() => toggleSection("witnesses")}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                4
              </span>
              <div>
                <span className="font-bold text-sm text-slate-900">Two Local Witnesses</span>
                <span className="text-xs text-slate-500 ml-2">
                  1. {toUpperEnglish(data.witness1.fullName) || "Pending"} | 2.{" "}
                  {toUpperEnglish(data.witness2.fullName) || "Pending"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToStep(4);
                }}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              {collapsed.witnesses ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
            </div>
          </div>

          {!collapsed.witnesses && (
            <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-blue-900 block mb-1">Witness 1:</span>
                <div className="font-semibold text-slate-900 uppercase">{toUpperEnglish(data.witness1.fullName)}</div>
                <div className="text-slate-500 text-[11px]">
                  Phone: {data.witness1.mobileNumber || "—"} | Known: {data.witness1.yearsKnown || "—"} Years
                </div>
                <div className="text-slate-600 text-[11px] uppercase mt-1">
                  {data.witness1.houseName}, {data.witness1.place}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-blue-900 block mb-1">Witness 2:</span>
                <div className="font-semibold text-slate-900 uppercase">{toUpperEnglish(data.witness2.fullName)}</div>
                <div className="text-slate-500 text-[11px]">
                  Phone: {data.witness2.mobileNumber || "—"} | Known: {data.witness2.yearsKnown || "—"} Years
                </div>
                <div className="text-slate-600 text-[11px] uppercase mt-1">
                  {data.witness2.houseName}, {data.witness2.place}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WHATSAPP NEXT STEPS CARD */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Nexia Virtual Desk Support Flow
            </span>
          </div>
          <h4 className="text-base font-bold text-white mt-1">
            Need Guidance on Physical Submission or Akshaya Upload?
          </h4>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            Your application documents have been prepared. Please review the PDFs carefully, print them on A4, obtain the required handwritten signatures, and verify all supporting documents before submission. For assistance, contact Nexia Virtual Desk.
          </p>
        </div>

        <a
          href="https://wa.me/919961850698?text=Hello%20Nexia%20Virtual%20Desk%2C%20I%20have%20prepared%20my%20Kerala%20Legal%20Heirship%20Certificate%20documents%20and%20would%20like%20guidance%20on%20the%20next%20submission%20steps."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 transition-all shadow-md shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-700" />
          <span>Contact Nexia on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
