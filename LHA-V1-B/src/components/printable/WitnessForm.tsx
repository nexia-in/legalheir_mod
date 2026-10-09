import type { FormData, Witness } from "@/lib/types";
import { formatDate, up, upMultiline } from "@/lib/format";
import {
  Block,
  chunkRows,
  FormHeader,
  ML,
  Note,
  Page,
  Row,
  SectionTitle,
  SignatureBox,
  td,
  ThCell,
} from "./shared";

const FORM_CODE = "NEXIA / LHC / FORM-3 — WITNESS STATEMENT";

export function WitnessForm({ data }: { data: FormData }) {
  const d = data.deceased;
  const doc = data.documents;
  const a = data.applicant;

  const nameChunks = chunkRows(data.heirs, 12, 28);
  const pageCount = nameChunks.length + 1;
  let n = 0;
  const next = () => ++n;

  return (
    <div data-pdf-doc="witness">
      <Page pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
        <FormHeader
          malayalamTitle="സാക്ഷി മൊഴി / സാക്ഷ്യപത്രം"
          englishTitle="WITNESS STATEMENT FOR LEGAL HEIRSHIP CERTIFICATE"
          subtitle="(രണ്ട് സാക്ഷികൾ പൂരിപ്പിച്ച് ഒപ്പിടേണ്ടത് — ഫോറം 3)"
          office={up(doc.submissionOffice) || "TO: THE VILLAGE OFFICER / TAHSILDAR"}
        />

        <SectionTitle ml="മരണപ്പെട്ട ആളുടെ വിവരങ്ങൾ" en="PARTICULARS OF THE DECEASED" />
        <Block>
          <Row ml="മരണപ്പെട്ട ആളുടെ പേര്" en="NAME OF DECEASED" value={up(d.fullName)} />
          <Row ml="വിലാസം" en="ADDRESS" value={upMultiline(d.address)} />
          <Row ml="മരണ തീയതി" en="DATE OF DEMISE" value={formatDate(d.dateOfDemise)} />
          <Row ml="മരണം സംഭവിച്ച സ്ഥലം" en="PLACE OF DEMISE" value={up(d.placeOfDemise)} />
          <Row ml="അപേക്ഷകന്റെ പേര്" en="NAME OF APPLICANT" value={up(a.fullName)} />
        </Block>

        <SectionTitle
          ml="സാക്ഷ്യപ്പെടുത്തുന്ന അനന്തരാവകാശികൾ"
          en={`LEGAL HEIRS CERTIFIED BY THE WITNESSES — TOTAL ${data.heirs.length}`}
        />
        <NameTable heirs={nameChunks[0]} startIndex={0} />
        {nameChunks.length > 1 ? (
          <div style={{ fontSize: "9.5px", marginTop: "4px", fontStyle: "italic" }}>
            …continued on the next page / തുടർച്ച അടുത്ത പേജിൽ
          </div>
        ) : null}
      </Page>

      {nameChunks.slice(1).map((chunk, idx) => (
        <Page key={`nc-${idx}`} pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
          <SectionTitle
            ml="സാക്ഷ്യപ്പെടുത്തുന്ന അനന്തരാവകാശികൾ (തുടർച്ച)"
            en="LEGAL HEIRS CERTIFIED BY THE WITNESSES (CONTINUED)"
          />
          <NameTable heirs={chunk} startIndex={12 + idx * 28} />
        </Page>
      ))}

      <Page pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
        <SectionTitle ml="സാക്ഷികളുടെ പ്രസ്താവന" en="STATEMENT OF THE WITNESSES" />
        <div
          style={{
            border: "1px solid #b9c2cd",
            borderTop: "none",
            padding: "10px 12px",
            fontFamily: ML,
            fontSize: "12px",
            lineHeight: 1.8,
          }}
        >
          മരണപ്പെട്ട <strong style={{ fontFamily: "inherit" }}>{up(d.fullName) || "__________________"}</strong> എന്ന
          ആളെയും അദ്ദേഹത്തിന്റെ / അവരുടെ കുടുംബത്തെയും ഞങ്ങൾക്ക് നേരിട്ട് അറിയാവുന്നതാണ്. മേൽ
          പട്ടികപ്പെടുത്തിയിട്ടുള്ളവർ മാത്രമാണ് പ്രസ്തുത ആളുടെ നിയമാനുസൃത അനന്തരാവകാശികൾ എന്നും,
          ഇവരെക്കൂടാതെ മറ്റ് അവകാശികൾ ആരും ഇല്ലെന്നും ഞങ്ങൾ ഇതിനാൽ സാക്ഷ്യപ്പെടുത്തുന്നു.
          <div style={{ fontFamily: "inherit", fontSize: "10px", marginTop: "8px", color: "#333c47" }}>
            We personally know the deceased and the family, and we certify that the persons listed above are the only
            legal heirs of the deceased.
          </div>
        </div>

        {data.witnesses.map((w, i) => (
          <WitnessBlock key={w.id} witness={w} index={i} />
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "18px" }}>
          <div style={{ fontFamily: ML, fontSize: "11.5px" }}>
            <div>
              സ്ഥലം / PLACE :{" "}
              <strong style={{ fontFamily: "inherit" }}>{up(doc.declarationPlace) || "____________"}</strong>
            </div>
            <div style={{ marginTop: "6px" }}>
              തീയതി / DATE :{" "}
              <strong style={{ fontFamily: "inherit" }}>{formatDate(doc.declarationDate) || "____________"}</strong>
            </div>
          </div>
          <SignatureBox
            caption="സാക്ഷ്യപ്പെടുത്തുന്ന ഉദ്യോഗസ്ഥന്റെ ഒപ്പും സീലും"
            subCaption="ATTESTING OFFICER — SIGNATURE & SEAL"
            width="290px"
            height="56px"
          />
        </div>

        <Note>
          Both witnesses must sign this page by hand in the presence of the verifying officer and carry their own
          identity proof. Witness Aadhaar numbers are deliberately NOT printed on this form — they are listed only in
          the internal file <strong>Nexia_Aadhaar_Documents_Checklist.txt</strong>.
        </Note>
      </Page>
    </div>
  );
}

function WitnessBlock({ witness, index }: { witness: Witness; index: number }) {
  const w = witness;
  return (
    <div style={{ marginTop: "10px" }}>
      <SectionTitle ml={`സാക്ഷി ${index + 1}`} en={`WITNESS ${index + 1}`} />
      <Block>
        <Row ml="പേര്" en="FULL NAME" value={up(w.fullName)} />
        <Row ml="പിതാവിന്റെ / ഭർത്താവിന്റെ പേര്" en="FATHER'S / HUSBAND'S NAME" value={up(w.guardianName)} />
        <Row
          ml="വയസ്സ് / തൊഴിൽ"
          en="AGE / OCCUPATION"
          value={[w.age.trim(), up(w.occupation)].filter(Boolean).join("  /  ")}
        />
        <Row ml="വിലാസം" en="FULL ADDRESS" value={upMultiline(w.address)} />
        <Row ml="ഫോൺ നമ്പർ" en="PHONE NUMBER" value={w.phone.trim()} />
        <Row ml="കുടുംബവുമായുള്ള പരിചയം" en="HOW THE WITNESS KNOWS THE FAMILY" value={up(w.relationToFamily)} />
      </Block>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
        <SignatureBox
          caption={`സാക്ഷി ${index + 1} ന്റെ ഒപ്പ്`}
          subCaption={`SIGNATURE OF WITNESS ${index + 1}`}
          width="250px"
          height="44px"
        />
      </div>
    </div>
  );
}

function NameTable({ heirs, startIndex }: { heirs: FormData["heirs"]; startIndex: number }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "2px" }}>
      <thead>
        <tr>
          <ThCell ml="ക്രമ നം." en="SL" width="38px" />
          <ThCell ml="അനന്തരാവകാശിയുടെ പേര്" en="NAME OF LEGAL HEIR" />
          <ThCell ml="വയസ്സ്" en="AGE" width="46px" />
          <ThCell ml="മരണപ്പെട്ട ആളുമായുള്ള ബന്ധം" en="RELATIONSHIP WITH DECEASED" width="150px" />
        </tr>
      </thead>
      <tbody>
        {heirs.map((h, i) => (
          <tr key={h.id}>
            <td style={{ ...td, textAlign: "center" }}>{startIndex + i + 1}</td>
            <td style={td}>{up(h.fullName)}</td>
            <td style={{ ...td, textAlign: "center" }}>{h.age.trim()}</td>
            <td style={td}>{up(h.relationship)}</td>
          </tr>
        ))}
        {heirs.length === 0 ? (
          <tr>
            <td style={{ ...td, textAlign: "center" }} colSpan={4}>
              NO LEGAL HEIR ENTERED
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
