import React, { useState } from "react";
import { LegalHeir, ApplicantDetails, HEIR_RELATIONSHIPS } from "@/types";
import { Users, Plus, Edit2, Trash2, UserCheck, AlertTriangle } from "lucide-react";

interface StepLegalHeirsProps {
  heirs: LegalHeir[];
  applicant: ApplicantDetails;
  onChange: (heirs: LegalHeir[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepLegalHeirs: React.FC<StepLegalHeirsProps> = ({
  heirs,
  applicant,
  onChange,
  onNext,
  onBack,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Form state for current heir in modal
  const defaultHeirForm: LegalHeir = {
    id: "",
    fullName: "",
    fullNameMl: "",
    relationship: "Son",
    gender: "MALE",
    age: "",
    dob: "",
    maritalStatus: "Married",
    occupation: "Employed",
    address: applicant.houseName ? `${applicant.houseName}, ${applicant.place}, ${applicant.district}` : "",
    phone: applicant.mobileNumber || "",
    aadhaarNumber: "",
    isApplicant: false,
    isMinor: false,
    guardianName: "",
    relinquishShare: false,
  };

  const [form, setForm] = useState<LegalHeir>(defaultHeirForm);
  const [modalError, setModalError] = useState("");

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setForm({
      ...defaultHeirForm,
      id: "heir-" + Date.now(),
      address: `${applicant.houseName ? applicant.houseName + ", " : ""}${applicant.place ? applicant.place + ", " : ""}${applicant.district || ""}`.trim(),
    });
    setModalError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setForm({ ...heirs[index] });
    setModalError("");
    setModalOpen(true);
  };

  const handleSaveModal = () => {
    if (!form.fullName.trim()) {
      setModalError("Legal heir full name is required.");
      return;
    }
    if (!form.age.trim()) {
      setModalError("Age is required.");
      return;
    }
    if (form.isMinor && !form.guardianName.trim()) {
      setModalError("Guardian name is required for minor legal heir.");
      return;
    }

    const updated = [...heirs];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push({ ...form, id: form.id || "heir-" + Date.now() });
    }

    onChange(updated);
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = heirs.filter((_, idx) => idx !== deleteIndex);
      onChange(updated);
      setDeleteIndex(null);
    }
  };

  // Helper to quickly add applicant as legal heir if missing
  const handleAddApplicantAsHeir = () => {
    const exists = heirs.some((h) => h.isApplicant || h.fullName.toLowerCase() === applicant.fullName.toLowerCase());
    if (exists) return;

    const applicantAsHeir: LegalHeir = {
      id: "heir-" + Date.now(),
      fullName: applicant.fullName,
      fullNameMl: applicant.fullNameMl,
      relationship: applicant.relationshipToDeceased || "Son",
      gender: applicant.gender,
      age: applicant.age || "35",
      dob: applicant.dob,
      maritalStatus: "Married",
      occupation: "Employed",
      address: `${applicant.houseName}, ${applicant.place}, ${applicant.postOffice} - ${applicant.pinCode}`,
      phone: applicant.mobileNumber,
      aadhaarNumber: applicant.aadhaarNumber,
      isApplicant: true,
      isMinor: false,
      guardianName: "",
      relinquishShare: false,
    };

    onChange([...heirs, applicantAsHeir]);
  };

  const applicantAlreadyHeir = heirs.some(
    (h) => h.isApplicant || (applicant.fullName && h.fullName.toLowerCase() === applicant.fullName.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title & Guidance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
              <Users className="w-3.5 h-3.5" />
              Step 3 of 6 • Form LH-02
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Legal Heirs / Claimants (അനന്തരാവകാശികൾ)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Add all living legal heirs of the deceased. The table will generate Form 2 (Legal Heir Schedule). If the applicant is also an heir, include them in this list.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!applicantAlreadyHeir && applicant.fullName && (
              <button
                type="button"
                onClick={handleAddApplicantAsHeir}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Add Applicant as Heir</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Legal Heir</span>
            </button>
          </div>
        </div>

        {heirs.length === 0 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>No legal heirs added yet.</strong>
              <p className="mt-0.5">
                At least one legal heir is required to generate the Kerala Legal Heirship Application Form. Click &quot;Add Another Legal Heir&quot; or &quot;Add Applicant as Heir&quot; above.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Heirs Cards Grid */}
      <div className="space-y-3">
        {heirs.map((heir, idx) => (
          <div
            key={heir.id || idx}
            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-sm flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-base text-slate-900 uppercase">
                      {heir.fullName}
                    </span>
                    {heir.fullNameMl && (
                      <span className="text-xs text-slate-600">({heir.fullNameMl})</span>
                    )}
                    {heir.isApplicant && (
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Primary Applicant
                      </span>
                    )}
                    {heir.isMinor && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Minor (Guardian: {heir.guardianName})
                      </span>
                    )}
                    {heir.relinquishShare && (
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Relinquishing Share (NOC)
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-700">Relationship:</span>{" "}
                      <span className="font-medium text-slate-900">{heir.relationship}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Age:</span>{" "}
                      <span className="font-medium text-slate-900">{heir.age} Years</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Gender:</span>{" "}
                      <span className="font-medium text-slate-900">{heir.gender}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Occupation:</span>{" "}
                      <span className="font-medium text-slate-900 uppercase">{heir.occupation || "—"}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Address:</span>{" "}
                    <span className="uppercase text-slate-800">{heir.address}</span>
                    {heir.phone && <span className="ml-3 text-slate-500">Phone: {heir.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-start">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(idx)}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="Edit Legal Heir"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteIndex(idx)}
                  className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove Legal Heir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding / Editing Heir */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {editingIndex !== null ? "Edit Legal Heir Details" : "Add New Legal Heir"}
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Enter details according to Aadhaar card. Uppercase conversion will be applied automatically.
            </p>

            {modalError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs mb-4">
                {modalError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (as per Aadhaar) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. RADHAMANI AMMA"
                  className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  പേര് മലയാളത്തിൽ (Optional)
                </label>
                <input
                  type="text"
                  value={form.fullNameMl}
                  onChange={(e) => setForm({ ...form, fullNameMl: e.target.value })}
                  placeholder="ഉദാ: രാധാമണി അമ്മ"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relationship to Deceased
                  </label>
                  <select
                    value={form.relationship}
                    onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  >
                    {HEIR_RELATIONSHIPS.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  >
                    <option value="MALE">Male (പുരുഷൻ)</option>
                    <option value="FEMALE">Female (സ്ത്രീ)</option>
                    <option value="OTHER">Other (മറ്റുള്ളവ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age (Years) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="e.g. 62"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Occupation</label>
                  <input
                    type="text"
                    value={form.occupation}
                    onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                    placeholder="e.g. Homemaker / Engineer"
                    className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Residential Address
                </label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="e.g. Kizhakkethil House, Ayyanthole PO, Thrissur - 680003"
                  className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 9847123456"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aadhaar Number (12 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={form.aadhaarNumber}
                    onChange={(e) => setForm({ ...form, aadhaarNumber: e.target.value.replace(/\D/g, "") })}
                    placeholder="Aadhaar for checklist"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Special options */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.isApplicant}
                    onChange={(e) => setForm({ ...form, isApplicant: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>This person is the primary applicant</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.isMinor}
                    onChange={(e) => setForm({ ...form, isMinor: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>This legal heir is a minor (under 18 years)</span>
                </label>

                {form.isMinor && (
                  <div className="pl-6 pt-1">
                    <label className="block text-xs font-semibold text-amber-900 mb-1">
                      Legal Guardian Name (രക്ഷാധികാരിയുടെ പേര്) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.guardianName}
                      onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
                      placeholder="e.g. Radhamani Amma (Mother / Legal Guardian)"
                      className="w-full px-3.5 py-2 text-sm uppercase rounded-xl border border-amber-300 bg-amber-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
                    />
                  </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.relinquishShare}
                    onChange={(e) => setForm({ ...form, relinquishShare: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Relinquishing claim / share in favour of applicant (NOC / സമ്മതപത്രം)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-all shadow-md cursor-pointer"
              >
                {editingIndex !== null ? "Save Changes" : "Add Legal Heir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Remove Legal Heir?</h4>
            <p className="text-xs text-slate-600 mb-5">
              Are you sure you want to remove &quot;{heirs[deleteIndex]?.fullName}&quot; from the application?
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteIndex(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 rounded-xl transition-all cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
        >
          ← Back to Deceased Details
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Continue to Witness Details (സാക്ഷികൾ) →
        </button>
      </div>
    </div>
  );
};
