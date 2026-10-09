import React from "react";
import { X, FileText, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink } from "lucide-react";

interface SourceDocsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceDocsInfoModal: React.FC<SourceDocsInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-1">
              Kerala Revenue Department Guidelines
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Source Forms & Official Application Workflow
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Authoritative mapping of the three Kerala Legal Heirship certificate forms and system outputs.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Three Separate PDF Forms */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              The Three Official Printable Application Forms
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-900 text-[13px] mb-1">1. Main Application</div>
                <div className="text-[11px] font-sans font-semibold text-blue-900 mb-1">
                  പ്രധാന അപേക്ഷ (LH-01)
                </div>
                <p className="text-slate-600">
                  Addressed to the Hon. Tahsildar. Includes ₹5 Court Fee Stamp box, complete applicant & deceased person details, purpose of certificate, solemn declaration, and applicant signature box.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-900 text-[13px] mb-1">2. Legal Heir Schedule</div>
                <div className="text-[11px] font-sans font-semibold text-blue-900 mb-1">
                  അനന്തരാവകാശികളുടെ പട്ടിക (LH-02)
                </div>
                <p className="text-slate-600">
                  Comprehensive tabular list of all living legal heirs (name, relationship, age, gender, occupation, address). Includes Joint Declaration and physical signature boxes for all adult heirs.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-900 text-[13px] mb-1">3. Witness Form</div>
                <div className="text-[11px] font-sans font-semibold text-blue-900 mb-1">
                  സാക്ഷിമൊഴിപ്പത്രിക (LH-03)
                </div>
                <p className="text-slate-600">
                  Deposition of two independent adult neighbours who know the family. Submitted before the Village Officer with dedicated signature areas and official Village Officer attestation seal box.
                </p>
              </div>
            </div>
          </div>

          {/* Two Separate Text Files */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              The Two Separate Audit & Entry Text Files
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200">
                <div className="font-bold text-emerald-950 text-[13px] mb-1">
                  Nexia_eDistrict_Online_Application_Data.txt
                </div>
                <p className="text-emerald-900">
                  Formatted in plain, clean, copy-paste ready blocks to help the human operator or Akshaya desk swiftly type data into the Kerala e-District portal (https://edistrict.kerala.gov.in/).
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200">
                <div className="font-bold text-emerald-950 text-[13px] mb-1">
                  Nexia_Aadhaar_Documents_Checklist.txt
                </div>
                <p className="text-emerald-900">
                  Internal audit record listing Aadhaar numbers, voter IDs, death certificate status, and operator scrutiny checkboxes. Kept strictly separate from the 3 official printable PDFs.
                </p>
              </div>
            </div>
          </div>

          {/* 6-Step Submission Process */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Recommended Kerala Revenue Submission Steps
            </h4>
            <ol className="space-y-2 list-decimal list-inside text-slate-700">
              <li>
                <strong>Generate & Download:</strong> Download the three PDFs and the two text files.
              </li>
              <li>
                <strong>Print Forms on A4:</strong> Print Form 1, Form 2, and Form 3 on clean white A4 sheets.
              </li>
              <li>
                <strong>Court Fee Stamp:</strong> Affix a ₹5 Court Fee Stamp in the designated top-right box on Form 1.
              </li>
              <li>
                <strong>Physical Signatures:</strong> Obtain handwritten physical signatures from the applicant on Form 1, from each legal heir on Form 2, and from both witnesses on Form 3.
              </li>
              <li>
                <strong>Witness Hearing:</strong> Present both witnesses with their photo IDs before the Village Officer for official verification.
              </li>
              <li>
                <strong>e-District Upload:</strong> Upload scanned copies of the signed forms and supporting certificates on the official Kerala e-District portal or through your nearest Akshaya Centre.
              </li>
            </ol>
          </div>

          {/* Template Storage Note */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Local Templates Storage Location:</strong>
              <p className="mt-0.5">
                The three standard templates are fully generated client-side with native Malayalam typography. If you have custom pre-printed scanned forms, store them in the <code>public/templates/</code> directory:
              </p>
              <ul className="list-disc list-inside mt-1 font-mono text-[11px] text-amber-800">
                <li>public/templates/1-Main application LH.pdf</li>
                <li>public/templates/2-application -Legal heir.pdf</li>
                <li>public/templates/3-LH-Witness.pdf</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
