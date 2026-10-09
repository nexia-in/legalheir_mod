import React, { useState } from "react";
import { DeceasedDetails, CERTIFICATE_PURPOSES } from "@/types";
import { UserX, AlertCircle } from "lucide-react";

interface StepDeceasedProps {
  data: DeceasedDetails;
  onChange: (data: DeceasedDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepDeceased: React.FC<StepDeceasedProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof DeceasedDetails, value: string) => {
    const updated = { ...data, [field]: value };
    onChange(updated);

    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) newErrors.fullName = "Deceased person's full name is required";
    if (!data.dateOfDemise) newErrors.dateOfDemise = "Date of demise (death) is required";
    if (!data.placeOfDemise.trim()) newErrors.placeOfDemise = "Place of demise is required";
    if (!data.deathCertificateNumber.trim()) {
      newErrors.deathCertificateNumber = "Death certificate registration number is required";
    }
    if (!data.permanentAddress.trim()) {
      newErrors.permanentAddress = "Permanent residence address of deceased is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Title & Guidance Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
          <UserX className="w-3.5 h-3.5" />
          Step 2 of 6 • Form LH-01 Section 2
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Deceased Person Details (മരണപ്പെട്ട വ്യക്തിയുടെ വിവരങ്ങൾ)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Provide accurate demise and death certificate information as issued by the local registrar (Panchayat / Municipality / Corporation).
        </p>

        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Please correct the highlighted fields:</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {Object.values(errors).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Basic Demise Particulars */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
          Deceased Personal Record
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name of Deceased (പരേതന്റെ പേര്) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g. KRISHNAN NAIR K"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Ensure this matches the spelling on the official Death Certificate exactly.
            </span>
          </div>

          {/* Full Name in Malayalam */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              പരേതന്റെ പേര് മലയാളത്തിൽ (Optional)
            </label>
            <input
              type="text"
              value={data.fullNameMl}
              onChange={(e) => handleChange("fullNameMl", e.target.value)}
              placeholder="ഉദാ: കൃഷ്ണൻ നായർ കെ"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all font-sans"
            />
          </div>

          {/* Father or Husband Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Father's / Husband's Name (പിതാവ് / ഭർത്താവ്)
            </label>
            <input
              type="text"
              value={data.fatherOrHusbandName}
              onChange={(e) => handleChange("fatherOrHusbandName", e.target.value)}
              placeholder="e.g. RAMAN NAIR"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gender <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.gender}
              onChange={(e) => handleChange("gender", e.target.value as "MALE" | "FEMALE")}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            >
              <option value="MALE">Male (പുരുഷൻ)</option>
              <option value="FEMALE">Female (സ്ത്രീ)</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Marital Status at Demise
            </label>
            <select
              value={data.maritalStatus}
              onChange={(e) => handleChange("maritalStatus", e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            >
              <option value="MARRIED">Married (വിവാഹിതൻ/വിവാഹിത)</option>
              <option value="WIDOWED">Widowed (വിധവ/വിഭാര്യൻ)</option>
              <option value="UNMARRIED">Unmarried (അവിവാഹിതൻ/അവിവാഹിത)</option>
              <option value="DIVORCED">Divorced (വിവാഹമോചിതൻ/വിവാഹമോചിത)</option>
            </select>
          </div>

          {/* Date of Demise */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Demise (മരണ തീയതി) <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={data.dateOfDemise}
              onChange={(e) => handleChange("dateOfDemise", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.dateOfDemise
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* Place of Demise */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Place of Demise (മരിച്ച സ്ഥലം) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.placeOfDemise}
              onChange={(e) => handleChange("placeOfDemise", e.target.value)}
              placeholder="e.g. Jubilee Mission Hospital, Thrissur / Residence"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.placeOfDemise
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Death Certificate Registration */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
          Death Certificate & Registration Details (മരണ സർട്ടിഫിക്കറ്റ് വിവരങ്ങൾ)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Certificate Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Death Certificate Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.deathCertificateNumber}
              onChange={(e) => handleChange("deathCertificateNumber", e.target.value)}
              placeholder="e.g. D-2024-09876"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.deathCertificateNumber
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* Certificate Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issue / Registration Date
            </label>
            <input
              type="date"
              value={data.deathCertificateDate}
              onChange={(e) => handleChange("deathCertificateDate", e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Issuing Authority */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issuing Local Body / Authority
            </label>
            <input
              type="text"
              value={data.deathRegistrarAuthority}
              onChange={(e) => handleChange("deathRegistrarAuthority", e.target.value)}
              placeholder="e.g. Thrissur Municipal Corporation"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Permanent Address */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deceased Permanent Address (പരേതന്റെ സ്ഥിര മേൽവിലാസം) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={data.permanentAddress}
              onChange={(e) => handleChange("permanentAddress", e.target.value)}
              placeholder="e.g. Kizhakkethil House, Ayyanthole PO, Thrissur - 680003"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.permanentAddress
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Succession Law, Religion & Purpose */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
          Personal Law & Purpose of Application
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Religion */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Religion (മതം)</label>
            <input
              type="text"
              value={data.religion}
              onChange={(e) => handleChange("religion", e.target.value)}
              placeholder="e.g. Hindu / Muslim / Christian"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Determines applicable Indian succession law.
            </span>
          </div>

          {/* Caste / Community */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Caste / Community (സമുദായം)
            </label>
            <input
              type="text"
              value={data.caste}
              onChange={(e) => handleChange("caste", e.target.value)}
              placeholder="e.g. Nair / Ezhava / Dheevara / RC"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Former Occupation */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Former Occupation (മുൻ തൊഴിൽ)
            </label>
            <input
              type="text"
              value={data.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              placeholder="e.g. Retired Government Employee"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Purpose of Certificate */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Purpose of Certificate (സർട്ടിഫിക്കറ്റ് ആവശ്യമായ കാര്യം)
            </label>
            <select
              value={data.purposeOfCertificate}
              onChange={(e) => handleChange("purposeOfCertificate", e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            >
              {CERTIFICATE_PURPOSES.map((purp) => (
                <option key={purp} value={purp}>
                  {purp}
                </option>
              ))}
            </select>
          </div>

          {/* Claim Particulars */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Asset / Account / Claim Particulars (ആനുകൂല്യങ്ങളുടെ വിശദാംശങ്ങൾ)
            </label>
            <input
              type="text"
              value={data.claimParticulars}
              onChange={(e) => handleChange("claimParticulars", e.target.value)}
              placeholder="e.g. SBI Ayyanthole Branch A/c No. 30123456789 & FD No. 40987654321"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
        >
          ← Back to Applicant Details
        </button>

        <button
          type="button"
          onClick={validateAndProceed}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Continue to Legal Heirs (അവകാശികൾ) →
        </button>
      </div>
    </div>
  );
};
