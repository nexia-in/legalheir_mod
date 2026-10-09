import React, { useState } from "react";
import { ApplicantDetails, KERALA_DISTRICTS, HEIR_RELATIONSHIPS } from "@/types";
import { User, Shield, AlertCircle, Eye, EyeOff } from "lucide-react";

interface StepApplicantProps {
  data: ApplicantDetails;
  onChange: (data: ApplicantDetails) => void;
  onNext: () => void;
}

export const StepApplicant: React.FC<StepApplicantProps> = ({ data, onChange, onNext }) => {
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof ApplicantDetails, value: string) => {
    const updated = { ...data, [field]: value };

    // Auto-calculate age if DOB is changed
    if (field === "dob" && value) {
      const birthDate = new Date(value);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age >= 0 && age < 120) {
          updated.age = age.toString();
        }
      }
    }

    onChange(updated);

    // Clear error for field
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

    if (!data.fullName.trim()) newErrors.fullName = "Applicant full name is required";
    if (!data.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
    if (data.mobileNumber.replace(/\D/g, "").length !== 10) {
      newErrors.mobileNumber = "Valid 10-digit mobile number is required";
    }
    if (!data.houseName.trim()) newErrors.houseName = "House Name / Tharavadu is required";
    if (!data.postOffice.trim()) newErrors.postOffice = "Post Office is required";
    if (!data.pinCode.trim() || data.pinCode.length !== 6) {
      newErrors.pinCode = "Valid 6-digit PIN code is required";
    }
    if (!data.village.trim()) newErrors.village = "Village name is required";
    if (!data.taluk.trim()) newErrors.taluk = "Taluk is required";
    if (!data.district.trim()) newErrors.district = "District is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Title & guidance banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
              <User className="w-3.5 h-3.5" />
              Step 1 of 6 • Form LH-01
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Applicant Details (അപേക്ഷകന്റെ വിവരങ്ങൾ)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Enter primary applicant details. English text will automatically be capitalized on official generated forms as required by Revenue Department guidelines.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Client-side Encrypted Session</span>
          </div>
        </div>

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

      {/* Primary Identity Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name (as per Aadhaar Card) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g. ANAND KUMAR K"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Enter full name. English letters will be auto-formatted to UPPERCASE on the documents.
            </span>
          </div>

          {/* Full Name in Malayalam */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              പേര് മലയാളത്തിൽ (Optional)
            </label>
            <input
              type="text"
              value={data.fullNameMl}
              onChange={(e) => handleChange("fullNameMl", e.target.value)}
              placeholder="ഉദാ: ആനന്ദ് കുമാർ കെ"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all font-sans"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Helps print official Malayalam headings accurately.
            </span>
          </div>

          {/* Relationship to Deceased */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Relationship to Deceased <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.relationshipToDeceased}
              onChange={(e) => handleChange("relationshipToDeceased", e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            >
              {HEIR_RELATIONSHIPS.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gender <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.gender}
              onChange={(e) => handleChange("gender", e.target.value as "MALE" | "FEMALE" | "OTHER")}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            >
              <option value="MALE">Male (പുരുഷൻ)</option>
              <option value="FEMALE">Female (സ്ത്രീ)</option>
              <option value="OTHER">Other (മറ്റുള്ളവ)</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
            <input
              type="number"
              value={data.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="e.g. 36"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2 text-sm text-slate-500 font-medium">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={data.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value.replace(/\D/g, ""))}
                placeholder="9847123456"
                className={`w-full pl-12 pr-3.5 py-2 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.mobileNumber
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
                }`}
              />
            </div>
            {errors.mobileNumber && (
              <span className="text-[11px] text-rose-600 mt-0.5 block">{errors.mobileNumber}</span>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="applicant@example.com"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Official Identification Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
          Identification & Cards (തിരിച്ചറിയൽ രേഖകൾ)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Aadhaar Number with Privacy Mask */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Aadhaar Number (12 Digits)</label>
              <button
                type="button"
                onClick={() => setShowAadhaar(!showAadhaar)}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                {showAadhaar ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAadhaar ? "Hide" : "Show"}</span>
              </button>
            </div>
            <input
              type={showAadhaar ? "text" : "password"}
              maxLength={12}
              value={data.aadhaarNumber}
              onChange={(e) => handleChange("aadhaarNumber", e.target.value.replace(/\D/g, ""))}
              placeholder="12 digit Aadhaar"
              className="w-full px-3.5 py-2 text-sm tracking-wider rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Never shared externally. Masked in review screen.
            </span>
          </div>

          {/* Voter ID / Election ID */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Election ID / Voter ID (തിരിച്ചറിയൽ കാർഡ്)
            </label>
            <input
              type="text"
              value={data.voterId}
              onChange={(e) => handleChange("voterId", e.target.value)}
              placeholder="e.g. KL/10/065/456123"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Ration Card Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ration Card Number (റേഷൻ കാർഡ്)
            </label>
            <input
              type="text"
              value={data.rationCardNumber}
              onChange={(e) => handleChange("rationCardNumber", e.target.value)}
              placeholder="e.g. 1856234190"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Residential Address Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
          Residential & Jurisdictional Address (മേൽവിലാസം)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* House Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              House / Building Number
            </label>
            <input
              type="text"
              value={data.houseNumber}
              onChange={(e) => handleChange("houseNumber", e.target.value)}
              placeholder="e.g. 12/450"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* House Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              House Name / Tharavadu / Villa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.houseName}
              onChange={(e) => handleChange("houseName", e.target.value)}
              placeholder="e.g. Kizhakkethil House"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.houseName
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* Locality */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Locality / Landmark</label>
            <input
              type="text"
              value={data.locality}
              onChange={(e) => handleChange("locality", e.target.value)}
              placeholder="e.g. Near Devi Temple"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Place */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Place / City</label>
            <input
              type="text"
              value={data.place}
              onChange={(e) => handleChange("place", e.target.value)}
              placeholder="e.g. Ayyanthole"
              className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Post Office */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Post Office <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.postOffice}
              onChange={(e) => handleChange("postOffice", e.target.value)}
              placeholder="e.g. Ayyanthole PO"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.postOffice
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* PIN Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              PIN Code (6 digits) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              value={data.pinCode}
              onChange={(e) => handleChange("pinCode", e.target.value.replace(/\D/g, ""))}
              placeholder="680003"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.pinCode
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* Ward / Division Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ward / Division Number
            </label>
            <input
              type="text"
              value={data.wardNumber}
              onChange={(e) => handleChange("wardNumber", e.target.value)}
              placeholder="e.g. 14"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Village */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Village (വില്ലേജ്) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.village}
              onChange={(e) => handleChange("village", e.target.value)}
              placeholder="e.g. Ayyanthole"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.village
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* Taluk */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Taluk (താലൂക്ക്) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.taluk}
              onChange={(e) => handleChange("taluk", e.target.value)}
              placeholder="e.g. Thrissur"
              className={`w-full px-3.5 py-2 text-sm uppercase rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.taluk
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
              }`}
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              District (ജില്ല) <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.district}
              onChange={(e) => handleChange("district", e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
            >
              {KERALA_DISTRICTS.map((dst) => (
                <option key={dst} value={dst}>
                  {dst}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
            <input
              type="text"
              value={data.state || "KERALA"}
              disabled
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-100 text-slate-600 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Navigation button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={validateAndProceed}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Continue to Deceased Person Details →
        </button>
      </div>
    </div>
  );
};
