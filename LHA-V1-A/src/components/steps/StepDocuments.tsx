import React from "react";
import { SupportingDocumentItem, DocumentStatus, LegalHeir, WitnessDetails } from "@/types";
import { CheckSquare, ShieldCheck, AlertCircle, FileText } from "lucide-react";

interface StepDocumentsProps {
  documents: SupportingDocumentItem[];
  heirs: LegalHeir[];
  witness1: WitnessDetails;
  witness2: WitnessDetails;
  onChange: (docs: SupportingDocumentItem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepDocuments: React.FC<StepDocumentsProps> = ({
  documents,
  onChange,
  onNext,
  onBack,
}) => {
  const handleStatusChange = (id: string, status: DocumentStatus) => {
    const updated = documents.map((doc) => (doc.id === id ? { ...doc, status } : doc));
    onChange(updated);
  };

  const handleFieldChange = (id: string, field: "documentNumber" | "remarks", value: string) => {
    const updated = documents.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc));
    onChange(updated);
  };

  const countAvailable = documents.filter((d) => d.status === "Available").length;
  const countToVerify = documents.filter((d) => d.status === "To Be Verified").length;
  const countMissing = documents.filter((d) => d.status === "Not Available").length;

  return (
    <div className="space-y-6">
      {/* Title & Guidance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
          <CheckSquare className="w-3.5 h-3.5" />
          Step 5 of 6 • Internal Document Verification
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Supporting Documents & Identity Verification (രേഖകൾ)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Track the physical availability and readiness of each certificate and Aadhaar proof. This data generates the separate &quot;Nexia_Aadhaar_Documents_Checklist.txt&quot; for operator file auditing.
        </p>

        {/* Status Counter Chips */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full font-semibold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            {countAvailable} Available
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full font-semibold border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            {countToVerify} To Be Verified
          </span>
          {countMissing > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 rounded-full font-semibold border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              {countMissing} Not Available
            </span>
          )}
        </div>
      </div>

      {/* Notice regarding separate outputs */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Privacy & Separation Rule:</strong>
          <p className="mt-0.5 text-blue-800">
            This verification status will be included in the separate &quot;Nexia_Aadhaar_Documents_Checklist.txt&quot; and will NEVER be inserted into the three printable application forms unless explicitly demanded by the official Revenue template.
          </p>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {documents.map((doc, idx) => {
          let badgeColor = "bg-slate-100 text-slate-700 border-slate-200";
          if (doc.status === "Available") badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
          if (doc.status === "To Be Verified") badgeColor = "bg-amber-50 text-amber-800 border-amber-300";
          if (doc.status === "Not Available") badgeColor = "bg-rose-50 text-rose-800 border-rose-300";

          return (
            <div
              key={doc.id || idx}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{doc.name}</div>
                    <div className="text-xs text-slate-600 font-sans mt-0.5">{doc.nameMl}</div>
                    {doc.relatedPerson && (
                      <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded mt-1">
                        Person: {doc.relatedPerson}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={doc.status}
                    onChange={(e) => handleStatusChange(doc.id, e.target.value as DocumentStatus)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer ${badgeColor}`}
                  >
                    <option value="Available">Available (ലഭ്യമാണ്)</option>
                    <option value="To Be Verified">To Be Verified (പരിശോധിക്കണം)</option>
                    <option value="Not Available">Not Available (ലഭ്യമല്ല)</option>
                    <option value="Not Applicable">Not Applicable (ബാധകമല്ല)</option>
                  </select>
                </div>
              </div>

              {/* Document number and remarks fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Document / Registration Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={doc.documentNumber || ""}
                    onChange={(e) => handleFieldChange(doc.id, "documentNumber", e.target.value)}
                    placeholder="e.g. Card No, Registration No"
                    className="w-full px-3 py-1.5 text-xs uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Operator Notes / Physical Verification Remarks
                  </label>
                  <input
                    type="text"
                    value={doc.remarks || ""}
                    onChange={(e) => handleFieldChange(doc.id, "remarks", e.target.value)}
                    placeholder="e.g. Original verified, 2 copies attached"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
        >
          ← Back to Witness Details
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Proceed to Review & Generate Documents →
        </button>
      </div>
    </div>
  );
};
