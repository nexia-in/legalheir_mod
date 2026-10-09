import React, { useState } from "react";
import { WitnessDetails, KERALA_DISTRICTS } from "@/types";
import { Eye, AlertCircle } from "lucide-react";

interface StepWitnessesProps {
  witness1: WitnessDetails;
  witness2: WitnessDetails;
  onChangeWitness1: (w: WitnessDetails) => void;
  onChangeWitness2: (w: WitnessDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepWitnesses: React.FC<StepWitnessesProps> = ({
  witness1,
  witness2,
  onChangeWitness1,
  onChangeWitness2,
  onNext,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {};

    if (!witness1.fullName.trim()) newErrors.w1_fullName = "Witness 1 full name is required";
    if (!witness1.mobileNumber.trim()) newErrors.w1_mobile = "Witness 1 phone number is required";
    if (!witness1.houseName.trim()) newErrors.w1_houseName = "Witness 1 address/house name is required";

    if (!witness2.fullName.trim()) newErrors.w2_fullName = "Witness 2 full name is required";
    if (!witness2.mobileNumber.trim()) newErrors.w2_mobile = "Witness 2 phone number is required";
    if (!witness2.houseName.trim()) newErrors.w2_houseName = "Witness 2 address/house name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.w1_fullName || newErrors.w1_mobile || newErrors.w1_houseName) {
        setActiveTab(1);
      } else {
        setActiveTab(2);
      }
      return;
    }

    onNext();
  };

  const renderWitnessForm = (
    w: WitnessDetails,
    update: (w: WitnessDetails) => void,
    prefix: "w1" | "w2",
    num: number
  ) => {
    const handleFieldChange = (field: keyof WitnessDetails, value: string) => {
      update({ ...w, [field]: value });
      if (errors[`${prefix}_${field}`]) {
        setErrors((prev) => {
          const n = { ...prev };
          delete n[`${prefix}_${field}`];
          return n;
        });
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Witness {num} Full Name (സാക്ഷിയുടെ പേര്) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={w.fullName}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              placeholder="e.g. VENU GOPALAN M"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors[`${prefix}_fullName`]
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* Father or Husband Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Father's / Husband's Name (പിതാവ് / ഭർത്താവ്)
            </label>
            <input
              type="text"
              value={w.fatherOrHusbandName}
              onChange={(e) => handleFieldChange("fatherOrHusbandName", e.target.value)}
              placeholder="e.g. MADHAVAN NAIR"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
            <input
              type="number"
              value={w.age}
              onChange={(e) => handleFieldChange("age", e.target.value)}
              placeholder="e.g. 58"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
            <select
              value={w.gender}
              onChange={(e) => handleFieldChange("gender", e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            >
              <option value="MALE">Male (പുരുഷൻ)</option>
              <option value="FEMALE">Female (സ്ത്രീ)</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Occupation (തൊഴിൽ)</label>
            <input
              type="text"
              value={w.occupation}
              onChange={(e) => handleFieldChange("occupation", e.target.value)}
              placeholder="e.g. Merchant / Teacher / Business"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              maxLength={10}
              value={w.mobileNumber}
              onChange={(e) => handleFieldChange("mobileNumber", e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 9446112233"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors[`${prefix}_mobile`]
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* Aadhaar Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Aadhaar / ID Number (തിരിച്ചറിയൽ രേഖ)
            </label>
            <input
              type="text"
              value={w.aadhaarNumber}
              onChange={(e) => handleFieldChange("aadhaarNumber", e.target.value)}
              placeholder="12 digit Aadhaar / Voter ID"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Years Known */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Years Known to Family (അറിയാവുന്ന കാലയളവ്)
            </label>
            <div className="relative">
              <input
                type="number"
                value={w.yearsKnown}
                onChange={(e) => handleFieldChange("yearsKnown", e.target.value)}
                placeholder="e.g. 15"
                className="w-full pr-14 pl-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
              />
              <span className="absolute right-3.5 top-2 text-xs text-slate-500">Years</span>
            </div>
          </div>
        </div>

        {/* Address Fields */}
        <div className="pt-3 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Residential Address in Locality
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                House Name / Building <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={w.houseName}
                onChange={(e) => handleFieldChange("houseName", e.target.value)}
                placeholder="e.g. Thiruvambadi Villa"
                className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors[`${prefix}_houseName`]
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Locality</label>
              <input
                type="text"
                value={w.locality}
                onChange={(e) => handleFieldChange("locality", e.target.value)}
                placeholder="e.g. Ayyanthole North"
                className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Place</label>
              <input
                type="text"
                value={w.place}
                onChange={(e) => handleFieldChange("place", e.target.value)}
                placeholder="e.g. Ayyanthole"
                className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Post Office & PIN</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={w.postOffice}
                  onChange={(e) => handleFieldChange("postOffice", e.target.value)}
                  placeholder="Ayyanthole PO"
                  className="w-full px-3 py-2 text-xs uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                />
                <input
                  type="text"
                  maxLength={6}
                  value={w.pinCode}
                  onChange={(e) => handleFieldChange("pinCode", e.target.value.replace(/\D/g, ""))}
                  placeholder="680003"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Village & Taluk</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={w.village}
                  onChange={(e) => handleFieldChange("village", e.target.value)}
                  placeholder="Village"
                  className="w-full px-3 py-2 text-xs uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                />
                <input
                  type="text"
                  value={w.taluk}
                  onChange={(e) => handleFieldChange("taluk", e.target.value)}
                  placeholder="Taluk"
                  className="w-full px-3 py-2 text-xs uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
              <select
                value={w.district}
                onChange={(e) => handleFieldChange("district", e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
              >
                {KERALA_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Title & Guidance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
          <Eye className="w-3.5 h-3.5" />
          Step 4 of 6 • Form LH-03 (സാക്ഷിമൊഴി)
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Independent Local Witnesses (സ്വതന്ത്ര അയൽസാക്ഷികൾ)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Kerala Revenue Department requires two independent adult neighbours who personally know the deceased and the family to vouch for the legal heirs before the Village Officer.
        </p>

        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Please complete the required witness details:</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {Object.values(errors).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Tab Switcher for Witness 1 and Witness 2 */}
      <div className="flex border-b border-slate-200 bg-slate-100/60 p-1 rounded-2xl max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 1
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Witness 1 (സാക്ഷി 1)
          {witness1.fullName && (
            <span className="block text-[10px] font-normal text-slate-500 truncate max-w-[140px] mx-auto">
              {witness1.fullName}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(2)}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 2
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Witness 2 (സാക്ഷി 2)
          {witness2.fullName && (
            <span className="block text-[10px] font-normal text-slate-500 truncate max-w-[140px] mx-auto">
              {witness2.fullName}
            </span>
          )}
        </button>
      </div>

      {/* Active Witness Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        {activeTab === 1 ? (
          renderWitnessForm(witness1, onChangeWitness1, "w1", 1)
        ) : (
          renderWitnessForm(witness2, onChangeWitness2, "w2", 2)
        )}
      </div>

      {/* Summary preview of both witnesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
            <span>Witness 1 Summary</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
              Deposition Form LH-03
            </span>
          </div>
          <div className="text-slate-700">
            <strong>{witness1.fullName || "Name Pending"}</strong>
            {witness1.age && <span> ({witness1.age} Yrs)</span>}
          </div>
          <div className="text-slate-500 text-[11px] mt-0.5">
            {witness1.houseName ? `${witness1.houseName}, ${witness1.place || ""}` : "Address Pending"}
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
            <span>Witness 2 Summary</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
              Deposition Form LH-03
            </span>
          </div>
          <div className="text-slate-700">
            <strong>{witness2.fullName || "Name Pending"}</strong>
            {witness2.age && <span> ({witness2.age} Yrs)</span>}
          </div>
          <div className="text-slate-500 text-[11px] mt-0.5">
            {witness2.houseName ? `${witness2.houseName}, ${witness2.place || ""}` : "Address Pending"}
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
          ← Back to Legal Heirs
        </button>

        <button
          type="button"
          onClick={validateAndProceed}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Continue to Supporting Documents (രേഖകൾ) →
        </button>
      </div>
    </div>
  );
};
