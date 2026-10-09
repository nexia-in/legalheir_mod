import type { FormData, Heir } from "@/lib/types";
import { formatDate, joinAddress, up, upMultiline } from "@/lib/format";
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

const FORM_CODE = "NEXIA / LHC / FORM-2 — LEGAL HEIR DETAILS & DECLARATION";

export function LegalHeirForm({ data }: { data: FormData }) {
  const a = data.applicant;
  const d = data.deceased;
  const doc = data.documents;

  const tableChunks = chunkRows(data.heirs, 4, 9);
  const sigChunks = chunkRows(data.heirs, 8, 12);
  const pageCount = 1 + (tableChunks.length - 1) + sigChunks.length;

  let n = 0;
  const next = () => ++n;

  const applicantAddress = joinAddress([
    a.houseNumber,
    a.houseName,
    a.locality,
    a.place,
    a.postOffice && `${a.postOffice} P.O`,
    a.pinCode && `PIN ${a.pinCode}`,
    a.village && `${a.village} VILLAGE`,
    a.taluk && `${a.taluk} TALUK`,
    a.district,
  ]);

  return (
    <div data-pdf-doc="heir">
      <Page pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
        <FormHeader
          malayalamTitle="അനന്തരാവകാശികളുടെ വിവരപ്പട്ടികയും സത്യപ്രസ്താവനയും"
          englishTitle="STATEMENT OF LEGAL HEIRS / CLAIMANTS"
          subtitle="(അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ് അപേക്ഷയോടൊപ്പം സമർപ്പിക്കേണ്ടത് — ഫോറം 2)"
          office={up(doc.submissionOffice) || "TO: THE VILLAGE OFFICER / TAHSILDAR"}
        />

        <SectionTitle ml="അപേക്ഷകനും മരണപ്പെട്ട ആളും" en="APPLICANT AND DECEASED" />
        <Block>
          <Row ml="അപേക്ഷകന്റെ പേര്" en="NAME OF APPLICANT" value={up(a.fullName)} />
          <Row ml="അപേക്ഷകന്റെ വിലാസം" en="ADDRESS OF APPLICANT" value={applicantAddress} />
          <Row ml="മരണപ്പെട്ട ആളുടെ പേര്" en="NAME OF DECEASED" value={up(d.fullName)} />
          <Row ml="മരണപ്പെട്ട ആളുടെ വിലാസം" en="ADDRESS OF DECEASED" value={upMultiline(d.address)} />
          <Row
            ml="മരണ തീയതിയും സ്ഥലവും"
            en="DATE AND PLACE OF DEMISE"
            value={[formatDate(d.dateOfDemise), up(d.placeOfDemise)].filter(Boolean).join("  /  ")}
          />
          <Row ml="മരണ സർട്ടിഫിക്കറ്റ് നമ്പർ" en="DEATH CERTIFICATE NUMBER" value={up(d.deathCertificateNumber)} />
        </Block>

        <SectionTitle
          ml="അനന്തരാവകാശികളുടെ (അവകാശവാദികളുടെ) പൂർണ്ണ വിവരങ്ങൾ"
          en={`FULL PARTICULARS OF CLAIMANTS — TOTAL ${data.heirs.length}`}
        />
        <ClaimantTable heirs={tableChunks[0]} startIndex={0} />
        {tableChunks.length > 1 ? (
          <div style={{ fontSize: "9.5px", marginTop: "4px", fontStyle: "italic" }}>
            …continued on the next page / തുടർച്ച അടുത്ത പേജിൽ
          </div>
        ) : null}
      </Page>

      {tableChunks.slice(1).map((chunk, idx) => (
        <Page key={`c-${idx}`} pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
          <SectionTitle
            ml="അനന്തരാവകാശികളുടെ പൂർണ്ണ വിവരങ്ങൾ (തുടർച്ച)"
            en="FULL PARTICULARS OF CLAIMANTS (CONTINUED)"
          />
          <ClaimantTable heirs={chunk} startIndex={4 + idx * 9} />
        </Page>
      ))}

      {sigChunks.map((chunk, idx) => {
        const start = idx === 0 ? 0 : 8 + (idx - 1) * 12;
        const isFirst = idx === 0;
        const isLast = idx === sigChunks.length - 1;
        return (
          <Page key={`s-${idx}`} pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
            {isFirst ? (
              <>
                <SectionTitle ml="സത്യപ്രസ്താവന" en="DECLARATION BY THE CLAIMANTS" />
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
                  മരണപ്പെട്ട{" "}
                  <strong style={{ fontFamily: "inherit" }}>{up(d.fullName) || "__________________"}</strong> എന്ന
                  ആളുടെ നിയമാനുസൃത അനന്തരാവകാശികൾ ഞങ്ങൾ മാത്രമാണെന്നും, ഞങ്ങളെക്കൂടാതെ മറ്റ് അവകാശികൾ
                  ആരും ഇല്ലെന്നും, മേൽ പട്ടികയിൽ നൽകിയിട്ടുള്ള വിവരങ്ങൾ പൂർണ്ണമായും ശരിയാണെന്നും ഞങ്ങൾ ഇതിനാൽ
                  സത്യപ്രസ്താവന ചെയ്യുന്നു. ഈ വിവരങ്ങൾ തെറ്റാണെന്ന് കണ്ടെത്തിയാൽ നിയമപ്രകാരമുള്ള
                  നടപടികൾക്ക് ഞങ്ങൾ വിധേയരായിരിക്കുന്നതാണ്.
                  <div style={{ fontFamily: "inherit", fontSize: "10px", marginTop: "8px", color: "#333c47" }}>
                    We hereby declare that we are the only legal heirs of the above named deceased and that the
                    particulars furnished are true and complete.
                  </div>
                </div>
              </>
            ) : null}

            <SectionTitle
              ml={`അവകാശികളുടെ ഒപ്പ്${isFirst ? "" : " (തുടർച്ച)"}`}
              en={`SIGNATURES OF THE CLAIMANTS${isFirst ? "" : " (CONTINUED)"}`}
            />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <ThCell ml="ക്രമ നം." en="SL" width="36px" />
                  <ThCell ml="അവകാശിയുടെ പേര്" en="NAME OF CLAIMANT" />
                  <ThCell ml="ബന്ധം" en="RELATION" width="100px" />
                  <ThCell ml="ഒപ്പ് / വിരലടയാളം" en="SIGNATURE / THUMB IMPRESSION" width="220px" />
                </tr>
              </thead>
              <tbody>
                {chunk.map((h, i) => (
                  <tr key={h.id}>
                    <td style={{ ...td, textAlign: "center" }}>{start + i + 1}</td>
                    <td style={{ ...td, height: "46px" }}>
                      {up(h.fullName)}
                      {h.isMinor ? (
                        <div style={{ fontSize: "8.5px", color: "#3d4854" }}>
                          MINOR — SIGNED BY GUARDIAN: {up(h.guardianName) || "____________"}
                        </div>
                      ) : null}
                    </td>
                    <td style={td}>{up(h.relationship)}</td>
                    <td style={{ ...td, height: "46px" }}>{"\u00A0"}</td>
                  </tr>
                ))}
                {chunk.length === 0 ? (
                  <tr>
                    <td style={{ ...td, textAlign: "center", height: "40px" }} colSpan={4}>
                      NO CLAIMANT ENTERED
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>

            {isLast ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
                  <div style={{ fontFamily: ML, fontSize: "11.5px" }}>
                    <div>
                      സ്ഥലം / PLACE :{" "}
                      <strong style={{ fontFamily: "inherit" }}>
                        {up(doc.declarationPlace) || "____________"}
                      </strong>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      തീയതി / DATE :{" "}
                      <strong style={{ fontFamily: "inherit" }}>
                        {formatDate(doc.declarationDate) || "____________"}
                      </strong>
                    </div>
                  </div>
                  <SignatureBox
                    caption="അപേക്ഷകന്റെ ഒപ്പ്"
                    subCaption={`SIGNATURE OF THE APPLICANT${a.fullName ? ` — ${up(a.fullName)}` : ""}`}
                    width="280px"
                    height="58px"
                  />
                </div>
                <Note>
                  Every claimant (or the guardian of a minor claimant) must sign this sheet by hand in the presence of
                  the verifying officer. Nexia Virtual Desk never adds signatures to this document.
                </Note>
              </>
            ) : null}
          </Page>
        );
      })}
    </div>
  );
}

function ClaimantTable({ heirs, startIndex }: { heirs: Heir[]; startIndex: number }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "2px" }}>
      <thead>
        <tr>
          <ThCell ml="ക്രമ നം." en="SL" width="32px" />
          <ThCell ml="പേര്" en="NAME" width="130px" />
          <ThCell ml="ലിംഗം" en="SEX" width="48px" />
          <ThCell ml="വയസ്സ്" en="AGE" width="36px" />
          <ThCell ml="ബന്ധം" en="RELATION" width="82px" />
          <ThCell ml="വിവാഹ നില" en="MARITAL" width="62px" />
          <ThCell ml="തൊഴിൽ" en="OCCUPATION" width="72px" />
          <ThCell ml="വിലാസവും ഫോൺ നമ്പറും" en="ADDRESS & PHONE" />
        </tr>
      </thead>
      <tbody>
        {heirs.map((h, i) => (
          <tr key={h.id}>
            <td style={{ ...td, textAlign: "center" }}>{startIndex + i + 1}</td>
            <td style={td}>
              {up(h.fullName)}
              {h.isMinor && h.guardianName ? (
                <div style={{ fontSize: "8.5px", color: "#3d4854" }}>G: {up(h.guardianName)}</div>
              ) : null}
            </td>
            <td style={{ ...td, textAlign: "center", fontSize: "9.5px" }}>{up(h.gender)}</td>
            <td style={{ ...td, textAlign: "center" }}>{h.age.trim()}</td>
            <td style={{ ...td, fontSize: "9.5px" }}>{up(h.relationship)}</td>
            <td style={{ ...td, fontSize: "9px" }}>{up(h.maritalStatus)}</td>
            <td style={{ ...td, fontSize: "9.5px" }}>{up(h.occupation)}</td>
            <td style={{ ...td, fontSize: "9.5px" }}>
              {upMultiline(h.address).replace(/\n/g, ", ")}
              {h.phone ? <div style={{ marginTop: "2px" }}>PH: {h.phone.trim()}</div> : null}
            </td>
          </tr>
        ))}
        {heirs.length === 0 ? (
          <tr>
            <td style={{ ...td, textAlign: "center" }} colSpan={8}>
              NO LEGAL HEIR ENTERED
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
