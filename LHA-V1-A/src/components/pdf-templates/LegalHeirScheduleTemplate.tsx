import React from "react";
import { FullApplicationData } from "@/types";
import { toUpperEnglish, formatDateKerala } from "@/utils/textFormatters";

interface Props {
  data: FullApplicationData;
  id?: string;
}

export const LegalHeirScheduleTemplate: React.FC<Props> = ({
  data,
  id = "pdf-legal-heir-schedule",
}) => {
  const applicant = data.applicant;
  const deceased = data.deceased;
  const heirs = data.heirs.length > 0 ? data.heirs : [];

  return (
    <div
      id={id}
      className="bg-white text-slate-900 mx-auto box-border"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "36px 44px",
        fontFamily: "'Noto Sans Malayalam', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1.45,
        fontSize: "12.5px",
        color: "#0f172a",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
        <div className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
          GOVERNMENT OF KERALA • REVENUE DEPARTMENT
        </div>
        <h1 className="text-[18px] font-bold text-slate-950 mt-0.5">
          അനന്തരാവകാശികളുടെ പട്ടികയും സംയുക്ത സത്യവാങ്മൂലവും
        </h1>
        <div className="text-[12px] font-bold text-blue-950 mt-0.5">
          SCHEDULE OF LEGAL HEIRS & JOINT CONSENT DECLARATION (FORM LH-02)
        </div>
        <div className="text-[11px] text-slate-700 mt-1">
          (തഹസിൽദാർ / വില്ലേജ് ഓഫീസർ മുമ്പാകെ സമർപ്പിക്കുന്ന ഫോറം)
        </div>
      </div>

      {/* Reference Deceased Details Card */}
      <div className="bg-slate-50 border border-slate-300 rounded p-2.5 mb-3 text-[11.5px]">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-slate-600">പരേതന്റെ പൂർണ്ണ പേര് (Deceased Name):</span>{" "}
            <strong className="text-slate-950 uppercase">{toUpperEnglish(deceased.fullName)}</strong>
            {deceased.fullNameMl && <span className="ml-1 text-slate-700">({deceased.fullNameMl})</span>}
          </div>
          <div>
            <span className="text-slate-600">മരണ തീയതി (Date of Demise):</span>{" "}
            <strong className="text-slate-950">{formatDateKerala(deceased.dateOfDemise) || "—"}</strong>
          </div>
          <div>
            <span className="text-slate-600">മരണ സർട്ടിഫിക്കറ്റ് നമ്പർ:</span>{" "}
            <strong className="text-slate-950 uppercase">{toUpperEnglish(deceased.deathCertificateNumber) || "—"}</strong>
          </div>
          <div>
            <span className="text-slate-600">താലൂക്ക് & ജില്ല:</span>{" "}
            <strong className="text-slate-950 uppercase">
              {toUpperEnglish(applicant.taluk)}, {toUpperEnglish(applicant.district)}
            </strong>
          </div>
        </div>
        <div className="mt-1 pt-1 border-t border-slate-200 text-slate-700">
          <span className="text-slate-600">സ്ഥിര മേൽവിലാസം:</span>{" "}
          <span className="uppercase font-medium text-slate-900">{toUpperEnglish(deceased.permanentAddress)}</span>
        </div>
      </div>

      {/* Heirs Table */}
      <div className="mb-4">
        <div className="bg-slate-800 text-white px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide flex justify-between">
          <span>നിയമാനുസൃത അനന്തരാവകാശികളുടെ വിവരപ്പട്ടിക (LIST OF SURVIVING LEGAL HEIRS)</span>
          <span className="text-slate-300 font-normal">ആകെ അവകാശികൾ: {heirs.length}</span>
        </div>

        <table className="w-full border-collapse border border-slate-400 text-[11px] mt-1">
          <thead>
            <tr className="bg-slate-100 text-slate-900 border-b border-slate-400">
              <th className="border-r border-slate-300 p-1.5 w-[32px] text-center">ക്രമം</th>
              <th className="border-r border-slate-300 p-1.5 text-left w-[155px]">
                അവകാശിയുടെ പേര്
                <div className="text-[9px] text-slate-600 font-normal">Name of Legal Heir</div>
              </th>
              <th className="border-r border-slate-300 p-1.5 text-left w-[95px]">
                ബന്ധം
                <div className="text-[9px] text-slate-600 font-normal">Relationship</div>
              </th>
              <th className="border-r border-slate-300 p-1.5 text-center w-[45px]">
                പ്രായം
                <div className="text-[9px] text-slate-600 font-normal">Age</div>
              </th>
              <th className="border-r border-slate-300 p-1.5 text-center w-[55px]">
                ലിംഗം
                <div className="text-[9px] text-slate-600 font-normal">Gender</div>
              </th>
              <th className="border-r border-slate-300 p-1.5 text-left w-[85px]">
                തൊഴിൽ
                <div className="text-[9px] text-slate-600 font-normal">Occupation</div>
              </th>
              <th className="border-r border-slate-300 p-1.5 text-left">
                മേൽവിലാസവും ഫോൺ നമ്പറും
                <div className="text-[9px] text-slate-600 font-normal">Address & Phone</div>
              </th>
              <th className="p-1.5 text-center w-[105px]">
                അവകാശിയുടെ ഒപ്പ്
                <div className="text-[9px] text-slate-600 font-normal">Signature</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {heirs.map((heir, idx) => (
              <tr key={heir.id || idx} className="border-b border-slate-300">
                <td className="border-r border-slate-300 p-1.5 text-center font-bold text-slate-800">
                  {idx + 1}
                </td>
                <td className="border-r border-slate-300 p-1.5">
                  <div className="font-bold text-slate-950 uppercase leading-snug">
                    {toUpperEnglish(heir.fullName)}
                  </div>
                  {heir.fullNameMl && (
                    <div className="text-[10px] text-slate-700">{heir.fullNameMl}</div>
                  )}
                  {heir.isApplicant && (
                    <span className="inline-block bg-blue-100 text-blue-900 text-[8.5px] font-bold px-1 rounded mt-0.5">
                      അപേക്ഷകൻ / APPLICANT
                    </span>
                  )}
                  {heir.isMinor && (
                    <div className="text-[9px] text-amber-800 font-bold mt-0.5">
                      മൈനർ (രക്ഷാധികാരി: {toUpperEnglish(heir.guardianName)})
                    </div>
                  )}
                </td>
                <td className="border-r border-slate-300 p-1.5 uppercase font-semibold text-slate-900">
                  {toUpperEnglish(heir.relationship)}
                </td>
                <td className="border-r border-slate-300 p-1.5 text-center font-bold text-slate-950">
                  {heir.age || "—"}
                </td>
                <td className="border-r border-slate-300 p-1.5 text-center uppercase text-[10px]">
                  {toUpperEnglish(heir.gender)}
                </td>
                <td className="border-r border-slate-300 p-1.5 uppercase text-[10px]">
                  {toUpperEnglish(heir.occupation) || "—"}
                </td>
                <td className="border-r border-slate-300 p-1.5 text-[10px] uppercase">
                  <div className="leading-snug">{toUpperEnglish(heir.address)}</div>
                  {heir.phone && <div className="text-slate-600 mt-0.5">ഫോൺ: {heir.phone}</div>}
                </td>
                <td className="p-1 text-center align-middle">
                  <div className="h-[42px] border border-dashed border-slate-400 rounded bg-slate-50 flex items-center justify-center">
                    <span className="text-[8.5px] text-slate-400 italic">
                      [ഒപ്പ് / Sign]
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Joint Declaration (Malayalam) */}
      <div className="border border-slate-400 bg-slate-50 p-3 rounded mb-3 text-[11px] leading-relaxed text-slate-900">
        <div className="font-bold text-center text-slate-950 underline mb-1 uppercase tracking-wider text-[11.5px]">
          അനന്തരാവകാശികളുടെ സംയുക്ത സത്യപ്രസ്താവന (JOINT SOLEMN DECLARATION)
        </div>
        <p className="text-justify indent-6">
          ഞങ്ങൾ മേൽ പട്ടികയിൽ പേര് ചേർത്തിട്ടുള്ള എല്ലാവരും പരേതനായ/പരേതയായ{" "}
          <strong className="uppercase underline">{toUpperEnglish(deceased.fullName) || "...................................................."}</strong>{" "}
          എന്നയാളുടെ നിയമാനുസൃത അനന്തരാവകാശികളാകുന്നു എന്ന് ഇതിനാൽ ബോധിപ്പിക്കുന്നു. ഞങ്ങളുടെ അറിവിലോ വിശ്വാസത്തിലോ പരേതന്
          മേൽ വിവരിച്ചവരല്ലാതെ മറ്റ് അവകാശികൾ ആരും തന്നെ ജീവിച്ചിരിപ്പില്ലെന്ന് ഇതിനാൽ ഉറപ്പുനൽകുന്നു.
        </p>
        <p className="text-justify indent-6 mt-1">
          പ്രസ്തുത അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ് അനുവദിക്കുന്നതിനും സർട്ടിഫിക്കറ്റ് ഉപയോഗിച്ച് നിർദ്ദിഷ്ട ആനുകൂല്യങ്ങൾ
          കൈപ്പറ്റുന്നതിനും ഞങ്ങൾക്ക് യാതൊരുവിധ തർക്കവുമില്ലെന്നും ഞങ്ങളുടെ പൂർണ്ണ സമ്മതത്തോടെയാണ് ഈ വിവരപ്പട്ടിക
          സമർപ്പിക്കുന്നതെന്നും സംയുക്തമായി സാക്ഷ്യപ്പെടുത്തുന്നു.
        </p>
      </div>

      {/* Signatures of All Legal Heirs */}
      <div className="mb-3">
        <div className="text-[11px] font-bold text-slate-900 mb-1">
          അനന്തരാവകാശികളുടെ ഒപ്പുകൾ (SIGNATURES OF ALL ADULT LEGAL HEIRS):
        </div>
        <div className="grid grid-cols-3 gap-2">
          {heirs.slice(0, 6).map((heir, idx) => (
            <div
              key={heir.id || idx}
              className="border border-slate-300 rounded p-1.5 text-center bg-white"
            >
              <div className="h-[36px] border-b border-dashed border-slate-400 flex items-center justify-center">
                <span className="text-[8px] text-slate-400 italic">[ഒപ്പ് / Signature]</span>
              </div>
              <div className="text-[10px] font-bold text-slate-950 uppercase truncate mt-1">
                {toUpperEnglish(heir.fullName)}
              </div>
              <div className="text-[9px] text-slate-600">
                {idx + 1}. {toUpperEnglish(heir.relationship)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date, Place, and Attestation */}
      <div className="flex justify-between items-end pt-2 border-t border-slate-300 text-[11.5px]">
        <div>
          <div>
            സ്ഥലം: <strong className="uppercase">{toUpperEnglish(data.applicationPlace || applicant.place || applicant.district)}</strong>
          </div>
          <div className="mt-0.5">
            തീയതി: <strong>{formatDateKerala(data.applicationDate)}</strong>
          </div>
        </div>

        <div className="text-right">
          <div className="w-[180px] h-[45px] border border-dashed border-slate-400 rounded flex items-center justify-center bg-slate-50 ml-auto mb-1">
            <span className="text-[9px] text-slate-400 italic">[വില്ലേജ് ഓഫീസറുടെ ഒപ്പും സീലും]</span>
          </div>
          <div className="text-[10px] font-bold text-slate-800">വില്ലേജ് ഓഫീസർ / റവന്യൂ ഇൻസ്പെക്ടർ</div>
          <div className="text-[9px] text-slate-500 uppercase">(Village Officer Attestation)</div>
        </div>
      </div>

      <div className="mt-2 text-right text-[9px] text-slate-400">
        ഫോം 2: അനന്തരാവകാശികളുടെ പട്ടിക • Nexia Virtual Desk Assistance Service
      </div>
    </div>
  );
};
