import React from "react";
import { FullApplicationData } from "@/types";
import { toUpperEnglish, formatDateKerala } from "@/utils/textFormatters";

interface Props {
  data: FullApplicationData;
  id?: string;
}

export const WitnessFormTemplate: React.FC<Props> = ({ data, id = "pdf-witness-form" }) => {
  const applicant = data.applicant;
  const deceased = data.deceased;
  const w1 = data.witness1;
  const w2 = data.witness2;

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
          അയൽസാക്ഷി മൊഴിപ്പത്രിക / സാക്ഷ്യപത്രം
        </h1>
        <div className="text-[12px] font-bold text-blue-950 mt-0.5">
          DEPOSITION & STATEMENT OF LOCAL INDEPENDENT WITNESSES (FORM LH-03)
        </div>
        <div className="text-[11px] text-slate-700 mt-1">
          (വില്ലേജ് ഓഫീസർ മുമ്പാകെ സമർപ്പിക്കുന്ന സാക്ഷിമൊഴി)
        </div>
      </div>

      {/* Village Officer Header reference */}
      <div className="bg-slate-50 border border-slate-300 rounded p-2.5 mb-3 text-[11.5px]">
        <div className="font-bold text-slate-900">
          ബഹുമാനപ്പെട്ട വില്ലേജ് ഓഫീസർ അവർകൾ മുമ്പാകെ,
        </div>
        <div className="text-slate-800">
          <span className="font-bold text-slate-950 uppercase">{toUpperEnglish(applicant.village) || "........................"}</span> വില്ലേജ് ഓഫീസ്,{" "}
          <span className="font-bold text-slate-950 uppercase">{toUpperEnglish(applicant.taluk) || "........................"}</span> താലൂക്ക്,{" "}
          <span className="font-bold text-slate-950 uppercase">{toUpperEnglish(applicant.district) || "........................"}</span> ജില്ല.
        </div>
        <div className="mt-1 pt-1 border-t border-slate-200 text-slate-700 text-[11px]">
          <span className="font-bold">വിഷയം:</span> പരേതനായ/പരേതയായ{" "}
          <strong className="text-slate-950 uppercase">
            {toUpperEnglish(deceased.fullName) || "...................................................."}
          </strong>{" "}
          (മരണ തീയതി: {formatDateKerala(deceased.dateOfDemise) || "—"}) എന്നയാളുടെ അവകാശികളെ സംബന്ധിച്ച് സമീപവാസികളായ
          സ്വതന്ത്ര സാക്ഷികൾ നൽകുന്ന മൊഴി.
        </div>
      </div>

      {/* Witness 1 and Witness 2 Side-by-Side or Stacked Cards */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Witness 1 Card */}
        <div className="border border-slate-400 rounded overflow-hidden">
          <div className="bg-slate-800 text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide flex justify-between">
            <span>സാക്ഷി 1 (WITNESS 1)</span>
            <span className="text-[9.5px] font-normal text-slate-300">സമീപവാസി</span>
          </div>
          <div className="p-2.5 bg-white text-[11px] space-y-1">
            <div>
              <span className="text-slate-600">പൂർണ്ണ പേര്:</span>{" "}
              <strong className="text-slate-950 uppercase">{toUpperEnglish(w1.fullName) || "—"}</strong>
            </div>
            <div>
              <span className="text-slate-600">പിതാവ് / ഭർത്താവ്:</span>{" "}
              <span className="font-medium text-slate-900 uppercase">{toUpperEnglish(w1.fatherOrHusbandName) || "—"}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10.5px]">
              <div>
                <span className="text-slate-600">വയസ്സ്:</span> <strong>{w1.age || "—"}</strong> വയസ്സ്
              </div>
              <div>
                <span className="text-slate-600">തൊഴിൽ:</span> <span className="uppercase">{toUpperEnglish(w1.occupation) || "—"}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-600">മേൽവിലാസം:</span>{" "}
              <span className="uppercase text-slate-900">
                {toUpperEnglish(w1.houseName)}, {toUpperEnglish(w1.locality)}, {toUpperEnglish(w1.place)},{" "}
                {toUpperEnglish(w1.postOffice)} - {w1.pinCode}
              </span>
            </div>
            <div className="text-[10.5px]">
              <span className="text-slate-600">വില്ലേജ് & താലൂക്ക്:</span>{" "}
              <span className="uppercase font-medium">
                {toUpperEnglish(w1.village)}, {toUpperEnglish(w1.taluk)}
              </span>
            </div>
            <div className="text-[10.5px]">
              <span className="text-slate-600">മൊബൈൽ & തിരിച്ചറിയൽ രേഖ:</span>{" "}
              <span>{w1.mobileNumber || "—"}</span>
            </div>
            <div className="text-[10px] text-blue-900 font-semibold pt-0.5">
              പരേതന്റെ കുടുംബത്തെ അറിയാവുന്ന കാലയളവ്: {w1.yearsKnown || "—"} വർഷം
            </div>

            {/* Signature Box Witness 1 */}
            <div className="pt-2 mt-2 border-t border-slate-200 text-center">
              <div className="h-[42px] border border-dashed border-slate-400 rounded bg-slate-50 flex items-center justify-center">
                <span className="text-[9px] text-slate-400 italic">[സാക്ഷി 1 ഒപ്പ് / Signature]</span>
              </div>
              <div className="text-[9.5px] text-slate-600 mt-1">സാക്ഷി 1 ന്റെ ഒപ്പ്</div>
            </div>
          </div>
        </div>

        {/* Witness 2 Card */}
        <div className="border border-slate-400 rounded overflow-hidden">
          <div className="bg-slate-800 text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide flex justify-between">
            <span>സാക്ഷി 2 (WITNESS 2)</span>
            <span className="text-[9.5px] font-normal text-slate-300">സമീപവാസി</span>
          </div>
          <div className="p-2.5 bg-white text-[11px] space-y-1">
            <div>
              <span className="text-slate-600">പൂർണ്ണ പേര്:</span>{" "}
              <strong className="text-slate-950 uppercase">{toUpperEnglish(w2.fullName) || "—"}</strong>
            </div>
            <div>
              <span className="text-slate-600">പിതാവ് / ഭർത്താവ്:</span>{" "}
              <span className="font-medium text-slate-900 uppercase">{toUpperEnglish(w2.fatherOrHusbandName) || "—"}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10.5px]">
              <div>
                <span className="text-slate-600">വയസ്സ്:</span> <strong>{w2.age || "—"}</strong> വയസ്സ്
              </div>
              <div>
                <span className="text-slate-600">തൊഴിൽ:</span> <span className="uppercase">{toUpperEnglish(w2.occupation) || "—"}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-600">മേൽവിലാസം:</span>{" "}
              <span className="uppercase text-slate-900">
                {toUpperEnglish(w2.houseName)}, {toUpperEnglish(w2.locality)}, {toUpperEnglish(w2.place)},{" "}
                {toUpperEnglish(w2.postOffice)} - {w2.pinCode}
              </span>
            </div>
            <div className="text-[10.5px]">
              <span className="text-slate-600">വില്ലേജ് & താലൂക്ക്:</span>{" "}
              <span className="uppercase font-medium">
                {toUpperEnglish(w2.village)}, {toUpperEnglish(w2.taluk)}
              </span>
            </div>
            <div className="text-[10.5px]">
              <span className="text-slate-600">മൊബൈൽ & തിരിച്ചറിയൽ രേഖ:</span>{" "}
              <span>{w2.mobileNumber || "—"}</span>
            </div>
            <div className="text-[10px] text-blue-900 font-semibold pt-0.5">
              പരേതന്റെ കുടുംബത്തെ അറിയാവുന്ന കാലയളവ്: {w2.yearsKnown || "—"} വർഷം
            </div>

            {/* Signature Box Witness 2 */}
            <div className="pt-2 mt-2 border-t border-slate-200 text-center">
              <div className="h-[42px] border border-dashed border-slate-400 rounded bg-slate-50 flex items-center justify-center">
                <span className="text-[9px] text-slate-400 italic">[സാക്ഷി 2 ഒപ്പ് / Signature]</span>
              </div>
              <div className="text-[9.5px] text-slate-600 mt-1">സാക്ഷി 2 ന്റെ ഒപ്പ്</div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Witness Deposition Text (Malayalam) */}
      <div className="border border-slate-400 bg-slate-50 p-3 rounded mb-3 text-[11px] leading-relaxed text-slate-900">
        <div className="font-bold text-center text-slate-950 underline mb-1 uppercase tracking-wider text-[11.5px]">
          സാക്ഷിമൊഴി വിവരണം (WITNESS DEPOSITION STATEMENT)
        </div>
        <p className="text-justify indent-6">
          ഞങ്ങൾ മേൽ ഒപ്പുവെച്ചിട്ടുള്ള സമീപവാസികളായ സാക്ഷികൾ രണ്ടുപേരും ഒന്നിച്ച് പൂർണ്ണ ബോധ്യത്തോടെ വില്ലേജ് ഓഫീസർ
          മുൻപാകെ സാക്ഷ്യപ്പെടുത്തുന്നത്:
        </p>
        <p className="text-justify indent-6 mt-1">
          ഞങ്ങൾക്ക് പരേതനായ/പരേതയായ{" "}
          <strong className="uppercase underline">{toUpperEnglish(deceased.fullName) || "...................................................."}</strong>{" "}
          എന്നയാളെയും അവരുടെ കുടുംബാംഗങ്ങളെയും കഴിഞ്ഞ പല വർഷങ്ങളായി നേരിട്ട് അടുത്തറിയാം. അദ്ദേഹം/അവർ{" "}
          <strong>{formatDateKerala(deceased.dateOfDemise) || "......................."}</strong> തീയതിയിൽ നിര്യാതനായി/നിര്യാതയായി
          എന്ന് ഞങ്ങൾക്കറിയാം. ഞങ്ങളുടെ അറിവിലും അന്വേഷണത്തിലും പരേതന്റെ/പരേതയുടെ നിയമപരമായ അനന്തരാവകാശികളായി ഈ അപേക്ഷയോടൊപ്പമുള്ള
          ഫോം 2 പട്ടികയിൽ ചേർത്തിട്ടുള്ള ആളുകൾ മാത്രമേയുള്ളൂ. ഇവരെക്കൂടാതെ മറ്റ് ഭാര്യയോ ഭർത്താവോ മക്കളോ മാതാപിതാക്കളോ ദത്തെടുത്ത
          മക്കളോ മറ്റ് അവകാശികളോ ജീവിച്ചിരിപ്പില്ലെന്ന് ഞങ്ങൾ ഉത്തമവിശ്വാസത്തിൽ സാക്ഷ്യപ്പെടുത്തുന്നു.
        </p>
        <p className="text-justify indent-6 mt-1">
          ഈ സാക്ഷിമൊഴി ഞങ്ങൾ സ്വന്തം ഇഷ്ടപ്രകാരവും വസ്തുതകൾ ബോധ്യപ്പെട്ടും വില്ലേജ് ഓഫീസർ മുൻപാകെ സത്യസന്ധമായി നൽകിയതാണ്.
        </p>
      </div>

      {/* Witnesses Date, Place & Signatures Confirmation */}
      <div className="flex justify-between items-end border-b border-slate-300 pb-3 mb-3 text-[11.5px]">
        <div>
          <div>
            സ്ഥലം: <strong className="uppercase">{toUpperEnglish(data.applicationPlace || applicant.place || applicant.district)}</strong>
          </div>
          <div className="mt-0.5">
            തീയതി: <strong>{formatDateKerala(data.applicationDate)}</strong>
          </div>
        </div>

        <div className="flex space-x-6 text-center">
          <div>
            <div className="text-[10.5px] font-bold uppercase">{toUpperEnglish(w1.fullName)}</div>
            <div className="text-[9.5px] text-slate-600">സാക്ഷി 1 സാക്ഷ്യപ്പെടുത്തൽ</div>
          </div>
          <div>
            <div className="text-[10.5px] font-bold uppercase">{toUpperEnglish(w2.fullName)}</div>
            <div className="text-[9.5px] text-slate-600">സാക്ഷി 2 സാക്ഷ്യപ്പെടുത്തൽ</div>
          </div>
        </div>
      </div>

      {/* Village Officer Official Attestation Area */}
      <div className="border border-slate-400 bg-white p-3 rounded text-[11px]">
        <div className="font-bold text-center text-slate-950 uppercase tracking-wide text-[11.5px] mb-1">
          വില്ലേജ് ഓഫീസറുടെ സാക്ഷ്യപ്പെടുത്തൽ (OFFICIAL ENDORSEMENT OF VILLAGE OFFICER)
        </div>
        <p className="text-justify indent-4 text-slate-800">
          സാക്ഷികൾ രണ്ടുപേരും എന്റെ മുമ്പാകെ നേരിട്ട് ഹാജരായി മേൽ മൊഴി വായിച്ചു കേട്ട് പൂർണ്ണ സമ്മതത്തോടെ ഒപ്പുവെച്ചതാണെന്നും,
          സാക്ഷികൾ ഈ വില്ലേജ് പരിധിയിൽ സ്ഥിരതാമസക്കാരാണെന്ന് അവരുടെ തിരിച്ചറിയൽ രേഖകൾ പരിശോധിച്ച് ബോധ്യപ്പെട്ടതാണെന്നും ഇതിനാൽ
          സാക്ഷ്യപ്പെടുത്തുന്നു.
        </p>
        <div className="flex justify-between items-end mt-4 pt-2">
          <div className="text-slate-700 text-[10.5px]">
            <div>സ്ഥലം: ........................................</div>
            <div className="mt-1">തീയതി: ........................................</div>
          </div>
          <div className="text-center">
            <div className="w-[190px] h-[48px] border border-dashed border-slate-400 rounded flex items-center justify-center bg-slate-50 mb-1">
              <span className="text-[8.5px] text-slate-400 italic">[ഔദ്യോഗിക സീലും ഒപ്പും / Official Seal]</span>
            </div>
            <div className="font-bold text-slate-900 text-[10.5px]">വില്ലേജ് ഓഫീസർ</div>
            <div className="text-[9px] text-slate-500 uppercase">Village Officer Signature & Seal</div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-right text-[9px] text-slate-400">
        ഫോം 3: സാക്ഷിമൊഴിപ്പത്രിക • Nexia Virtual Desk Assistance Service
      </div>
    </div>
  );
};
