import React from "react";
import { FullApplicationData } from "@/types";
import { toUpperEnglish, formatDateKerala } from "@/utils/textFormatters";

interface Props {
  data: FullApplicationData;
  id?: string;
}

export const MainApplicationTemplate: React.FC<Props> = ({ data, id = "pdf-main-application" }) => {
  const applicant = data.applicant;
  const deceased = data.deceased;

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
        fontSize: "13px",
        color: "#0f172a",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header with Court Fee Stamp box */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3 mb-4">
        <div className="flex-1 pr-4">
          <div className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
            GOVERNMENT OF KERALA • REVENUE DEPARTMENT
          </div>
          <h1 className="text-[18px] font-bold text-slate-950 mt-0.5 leading-snug">
            കേരള സർക്കാർ - റവന്യൂ വകുപ്പ്
          </h1>
          <h2 className="text-[15px] font-bold text-blue-950 mt-1 leading-snug">
            അനന്തരാവകാശ സർട്ടിഫിക്കറ്റിനായുള്ള പ്രധാന അപേക്ഷ
          </h2>
          <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
            (MAIN APPLICATION FOR LEGAL HEIRSHIP CERTIFICATE)
          </div>
        </div>

        {/* Court Fee Stamp placeholder */}
        <div className="w-[125px] h-[95px] border-2 border-dashed border-slate-700 rounded flex flex-col items-center justify-center p-1 text-center bg-slate-50 shrink-0">
          <span className="text-[10px] font-bold text-slate-900 leading-tight">
            കോർട്ട് ഫീ സ്റ്റാമ്പ്
          </span>
          <span className="text-[13px] font-extrabold text-slate-950 mt-0.5">₹ 5 /-</span>
          <span className="text-[9px] text-slate-600 leading-tight mt-0.5">
            പതിക്കേണ്ട സ്ഥലം
          </span>
          <span className="text-[8px] text-slate-500 uppercase mt-0.5">Court Fee Stamp</span>
        </div>
      </div>

      {/* Addressed to Tahsildar */}
      <div className="bg-slate-50 border border-slate-300 rounded p-3 mb-4 text-[12px]">
        <div className="font-bold text-slate-900">സ്വീകർത്താവ് (To):</div>
        <div className="font-semibold text-slate-950 mt-0.5">
          ബഹുമാനപ്പെട്ട തഹസിൽദാർ അവർകൾ മുമ്പാകെ,
        </div>
        <div className="text-slate-800">
          <span className="font-bold text-slate-950 uppercase">{toUpperEnglish(applicant.taluk) || "........................"}</span> താലൂക്ക് കച്ചേരി,{" "}
          <span className="font-bold text-slate-950 uppercase">{toUpperEnglish(applicant.district) || "........................"}</span> ജില്ല.
        </div>
        <div className="mt-1 pt-1 border-t border-slate-200 text-[11px] text-slate-700">
          <span className="font-bold">വിഷയം:</span> പരേതനായ/പരേതയായ{" "}
          <span className="font-bold uppercase text-slate-950">
            {toUpperEnglish(deceased.fullName) || "...................................................."}
          </span>{" "}
          എന്നയാളുടെ അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ് അനുവദിച്ചു നൽകുന്നത് സംബന്ധിച്ച്.
        </div>
      </div>

      {/* 1. Applicant Details */}
      <div className="mb-4">
        <div className="bg-slate-800 text-white px-2.5 py-1 text-[12px] font-bold uppercase tracking-wide flex justify-between">
          <span>1. അപേക്ഷകന്റെ വിവരങ്ങൾ (APPLICANT DETAILS)</span>
          <span className="text-[10px] font-normal text-slate-300">FORM LH-01</span>
        </div>
        <table className="w-full border-collapse border border-slate-400 text-[12px] mt-1">
          <tbody>
            <tr className="border-b border-slate-300">
              <td className="w-1/3 bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                അപേക്ഷകന്റെ പൂർണ്ണ പേര്
                <div className="text-[10px] text-slate-600 font-normal">Full Name as per Aadhaar</div>
              </td>
              <td className="w-2/3 p-1.5 font-bold uppercase text-slate-950">
                {toUpperEnglish(applicant.fullName)}
                {applicant.fullNameMl && (
                  <span className="ml-2 font-normal text-slate-700">({applicant.fullNameMl})</span>
                )}
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                പരേതനുമായുള്ള ബന്ധം & ലിംഗം
                <div className="text-[10px] text-slate-600 font-normal">Relationship & Gender</div>
              </td>
              <td className="p-1.5 text-slate-950 uppercase">
                <span className="font-bold">{toUpperEnglish(applicant.relationshipToDeceased)}</span> | ലിംഗം:{" "}
                <span className="font-bold">{toUpperEnglish(applicant.gender)}</span>
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                വയസ്സും ജനന തീയതിയും
                <div className="text-[10px] text-slate-600 font-normal">Age & Date of Birth</div>
              </td>
              <td className="p-1.5 text-slate-950">
                പ്രായം: <span className="font-bold">{applicant.age || "—"}</span> വയസ്സ് | DOB:{" "}
                <span className="font-bold">{formatDateKerala(applicant.dob) || "—"}</span>
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                സ്ഥിര മേൽവിലാസം
                <div className="text-[10px] text-slate-600 font-normal">Permanent Residential Address</div>
              </td>
              <td className="p-1.5 uppercase font-medium text-slate-950">
                {toUpperEnglish(applicant.houseNumber) && `NO. ${toUpperEnglish(applicant.houseNumber)}, `}
                {toUpperEnglish(applicant.houseName)}, {toUpperEnglish(applicant.locality)},{" "}
                {toUpperEnglish(applicant.place)}, {toUpperEnglish(applicant.postOffice)} - {applicant.pinCode}
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                ഭരണപരിധി വിവരങ്ങൾ
                <div className="text-[10px] text-slate-600 font-normal">Ward, Village, Taluk, District</div>
              </td>
              <td className="p-1.5 text-slate-950 uppercase">
                വാർഡ്: <span className="font-bold">{toUpperEnglish(applicant.wardNumber) || "—"}</span> | വില്ലേജ്:{" "}
                <span className="font-bold">{toUpperEnglish(applicant.village)}</span> | താലൂക്ക്:{" "}
                <span className="font-bold">{toUpperEnglish(applicant.taluk)}</span> | ജില്ല:{" "}
                <span className="font-bold">{toUpperEnglish(applicant.district)}</span>
              </td>
            </tr>

            <tr>
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                തിരിച്ചറിയൽ രേഖകൾ & ഫോൺ
                <div className="text-[10px] text-slate-600 font-normal">ID Credentials & Contact</div>
              </td>
              <td className="p-1.5 text-slate-950 uppercase text-[11px]">
                മൊബൈൽ: <span className="font-bold text-slate-950">{applicant.mobileNumber || "—"}</span> | വോട്ടർ ഐഡി:{" "}
                <span className="font-bold">{toUpperEnglish(applicant.voterId) || "—"}</span> | റേഷൻ കാർഡ്:{" "}
                <span className="font-bold">{toUpperEnglish(applicant.rationCardNumber) || "—"}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Deceased Person Details */}
      <div className="mb-4">
        <div className="bg-slate-800 text-white px-2.5 py-1 text-[12px] font-bold uppercase tracking-wide">
          2. മരണപ്പെട്ട വ്യക്തിയുടെ വിവരങ്ങൾ (DECEASED PERSON DETAILS)
        </div>
        <table className="w-full border-collapse border border-slate-400 text-[12px] mt-1">
          <tbody>
            <tr className="border-b border-slate-300">
              <td className="w-1/3 bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                പരേതന്റെ / പരേതയുടെ പേര്
                <div className="text-[10px] text-slate-600 font-normal">Full Name of Deceased</div>
              </td>
              <td className="w-2/3 p-1.5 font-bold uppercase text-slate-950">
                {toUpperEnglish(deceased.fullName)}
                {deceased.fullNameMl && (
                  <span className="ml-2 font-normal text-slate-700">({deceased.fullNameMl})</span>
                )}
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                പിതാവിന്റെ / ഭർത്താവിന്റെ പേര്
                <div className="text-[10px] text-slate-600 font-normal">Father's / Spouse's Name</div>
              </td>
              <td className="p-1.5 uppercase font-medium text-slate-950">
                {toUpperEnglish(deceased.fatherOrHusbandName) || "—"} | ലിംഗം:{" "}
                <span className="font-bold">{toUpperEnglish(deceased.gender)}</span>
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                മരണ തീയതിയും സ്ഥലവും
                <div className="text-[10px] text-slate-600 font-normal">Date & Place of Demise</div>
              </td>
              <td className="p-1.5 text-slate-950">
                തീയതി: <span className="font-bold">{formatDateKerala(deceased.dateOfDemise)}</span> | സ്ഥലം:{" "}
                <span className="font-bold uppercase">{toUpperEnglish(deceased.placeOfDemise)}</span>
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                മരണ സർട്ടിഫിക്കറ്റ് വിവരങ്ങൾ
                <div className="text-[10px] text-slate-600 font-normal">Death Certificate No. & Issuing Office</div>
              </td>
              <td className="p-1.5 text-slate-950 uppercase text-[11px]">
                നമ്പർ: <span className="font-bold">{toUpperEnglish(deceased.deathCertificateNumber)}</span> | തീയതി:{" "}
                <span className="font-bold">{formatDateKerala(deceased.deathCertificateDate) || "—"}</span> | രജിസ്ട്രാർ:{" "}
                <span className="font-bold">{toUpperEnglish(deceased.deathRegistrarAuthority)}</span>
              </td>
            </tr>

            <tr className="border-b border-slate-300">
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                സ്ഥിര മേൽവിലാസം & മതം
                <div className="text-[10px] text-slate-600 font-normal">Permanent Address & Religion / Caste</div>
              </td>
              <td className="p-1.5 text-slate-950 uppercase text-[11px]">
                മേൽവിലാസം: <span className="font-medium">{toUpperEnglish(deceased.permanentAddress)}</span>
                <br />
                മതം/സമുദായം: <span className="font-bold">{toUpperEnglish(deceased.religion)}</span> (
                {toUpperEnglish(deceased.caste)}) | വൈവാഹികാവസ്ഥ:{" "}
                <span className="font-bold">{toUpperEnglish(deceased.maritalStatus)}</span>
              </td>
            </tr>

            <tr>
              <td className="bg-slate-100 p-1.5 font-semibold text-slate-800 border-r border-slate-300">
                സർട്ടിഫിക്കറ്റ് ആവശ്യമായ കാര്യം
                <div className="text-[10px] text-slate-600 font-normal">Purpose of Certificate & Particulars</div>
              </td>
              <td className="p-1.5 text-slate-950 uppercase text-[11px]">
                <span className="font-bold text-blue-900">{toUpperEnglish(deceased.purposeOfCertificate)}</span>
                {deceased.claimParticulars && (
                  <div className="text-slate-800 mt-0.5">വിശദാംശങ്ങൾ: {toUpperEnglish(deceased.claimParticulars)}</div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Applicant Declaration (Malayalam) */}
      <div className="border border-slate-400 bg-slate-50 p-3 rounded mb-4 text-[11.5px] leading-relaxed text-slate-900">
        <div className="font-bold text-center text-slate-950 underline mb-1 uppercase tracking-wider text-[12px]">
          സത്യപ്രസ്താവന (SOLEMN DECLARATION OF APPLICANT)
        </div>
        <p className="text-justify indent-6">
          മേൽ വിവരിച്ചിട്ടുള്ള വിവരങ്ങൾ എല്ലാം തന്നെ എന്റെ അറിവിലും പൂർണ്ണ വിശ്വാസത്തിലും തികച്ചും സത്യവും ബോധ്യവുമാണെന്ന്
          ഇതിനാൽ സാക്ഷ്യപ്പെടുത്തുന്നു. പരേതനായ/പരേതയായ{" "}
          <strong className="uppercase underline">{toUpperEnglish(deceased.fullName) || "...................................................."}</strong>{" "}
          എന്നയാൾക്ക് ഫോം 2 അനുബന്ധ പട്ടികയിൽ ചേർത്തിട്ടുള്ളവരല്ലാതെ മറ്റ് ഭാര്യയോ, ഭർത്താവോ, മക്കളോ, മാതാപിതാക്കളോ,
          ദത്തെടുത്ത മക്കളോ, മറ്റ് നിയമാനുസൃത അനന്തരാവകാശികളോ ഇല്ലെന്നും, ആരെയും മനഃപൂർവ്വമോ അല്ലാതെയോ ഒഴിവാക്കിയിട്ടില്ലെന്നും
          സാക്ഷ്യപ്പെടുത്തുന്നു.
        </p>
        <p className="text-justify indent-6 mt-1">
          വസ്തുതകൾ മറച്ചുവെച്ചോ തെറ്റായ വിവരങ്ങൾ നൽകിയോ സർട്ടിഫിക്കറ്റ് തരപ്പെടുത്തിയതായി തെളിഞ്ഞാൽ എന്റെ പേരിൽ
          സ്വീകരിക്കുന്ന എല്ലാത്തരം നിയമനടപടികൾക്കും ക്രിമിനൽ ബാധ്യതകൾക്കും ഞാൻ പൂർണ്ണ ഉത്തരവാദിയായിരിക്കുന്നതാണ്.
        </p>
      </div>

      {/* Date, Place, and Signatures */}
      <div className="flex justify-between items-end pt-2 pb-2 text-[12px]">
        <div>
          <div className="text-slate-800">
            സ്ഥലം (Place): <strong className="uppercase">{toUpperEnglish(data.applicationPlace || applicant.place || applicant.district)}</strong>
          </div>
          <div className="text-slate-800 mt-1">
            തീയതി (Date): <strong>{formatDateKerala(data.applicationDate)}</strong>
          </div>
        </div>

        <div className="text-center">
          <div className="w-[200px] h-[55px] border-b-2 border-slate-900 flex items-end justify-center pb-1 mb-1">
            {/* Blank for physical handwritten signature */}
            <span className="text-[10px] text-slate-400 italic">
              [ഇവിടെ ഒപ്പിടുക / Physical Signature]
            </span>
          </div>
          <div className="font-bold text-slate-950 text-[12px] uppercase">
            {toUpperEnglish(applicant.fullName)}
          </div>
          <div className="text-[11px] text-slate-700">അപേക്ഷകന്റെ ഒപ്പ് / വിരലടയാളം</div>
          <div className="text-[9px] text-slate-500 uppercase">(Signature / Thumb Impression)</div>
        </div>
      </div>

      {/* Office verification footer */}
      <div className="mt-4 pt-2 border-t border-slate-400 text-[10px] text-slate-600 flex justify-between items-center">
        <div>
          റവന്യൂ രേഖകൾ പ്രകാരം പരിശോധനക്കായി വില്ലേജ് ഓഫീസിലേക്ക് അയക്കുന്നു.
          <br />
          വില്ലേജ് ഓഫീസറുടെ അന്വേഷണ റിപ്പോർട്ട് അനുബന്ധമായി സമർപ്പിക്കുക.
        </div>
        <div className="text-right">
          ഫോം 1: പ്രധാന അപേക്ഷ • താലൂക്ക് ഓഫീസ് ഉപയോഗത്തിന്
          <br />
          <span className="font-bold text-slate-700">Nexia Virtual Desk Assistance Service</span>
        </div>
      </div>
    </div>
  );
};
