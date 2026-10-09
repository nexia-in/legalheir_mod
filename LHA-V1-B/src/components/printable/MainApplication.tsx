import type { FormData } from "@/lib/types";
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

const FORM_CODE = "NEXIA / LHC / FORM-1 — MAIN APPLICATION";

export function MainApplication({ data }: { data: FormData }) {
  const a = data.applicant;
  const d = data.deceased;
  const doc = data.documents;

  const chunks = chunkRows(data.heirs, 6, 16);
  const pageCount = 2 + chunks.length - 1 + 1; // p1 + heir pages + declaration page

  let n = 0;
  const next = () => ++n;

  return (
    <div data-pdf-doc="main">
      {/* ---------------- PAGE 1 ---------------- */}
      <Page pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
        <FormHeader
          malayalamTitle="അനന്തരാവകാശ സർട്ടിഫിക്കറ്റിനുള്ള അപേക്ഷ"
          englishTitle="APPLICATION FOR LEGAL HEIRSHIP CERTIFICATE"
          subtitle="(പ്രധാന അപേക്ഷാ ഫോറം — ഫോറം 1)"
          office={up(doc.submissionOffice) || "TO: THE VILLAGE OFFICER / TAHSILDAR"}
        />

        <div style={{ fontFamily: ML, fontSize: "11.5px", marginBottom: "6px" }}>
          ബഹുമാനപ്പെട്ട വില്ലേജ് ഓഫീസർ / തഹസിൽദാർ അവർകൾക്ക്,
          <div style={{ marginTop: "2px" }}>
            താഴെ വിവരിക്കുന്ന വിവരങ്ങൾ പ്രകാരം അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ് അനുവദിച്ചു നൽകണമെന്ന് വിനീതമായി
            അപേക്ഷിക്കുന്നു.
          </div>
        </div>

        <SectionTitle ml="1. അപേക്ഷകന്റെ വിവരങ്ങൾ" en="APPLICANT DETAILS" />
        <Block>
          <Row ml="അപേക്ഷകന്റെ പൂർണ്ണമായ പേര് (ആധാർ പ്രകാരം)" en="FULL NAME AS PER AADHAAR" value={up(a.fullName)} />
          <Row ml="ജനന തീയതി" en="DATE OF BIRTH" value={formatDate(a.dob)} />
          <Row
            ml="മരണപ്പെട്ട ആളുമായുള്ള ബന്ധം"
            en="RELATIONSHIP WITH THE DECEASED"
            value={up(a.relationToDeceased)}
          />
          <Row ml="ആധാർ നമ്പർ" en="AADHAAR NUMBER" value={up(a.aadhaar)} />
          <Row ml="റേഷൻ കാർഡ് നമ്പർ" en="RATION CARD NUMBER" value={up(a.rationCardNumber)} />
          <Row ml="തിരഞ്ഞെടുപ്പ് തിരിച്ചറിയൽ കാർഡ് നമ്പർ" en="ELECTION ID / VOTER ID" value={up(a.electionId)} />
          <Row ml="മൊബൈൽ നമ്പർ" en="MOBILE NUMBER" value={a.mobile.trim()} />
          <Row ml="ഇ-മെയിൽ വിലാസം" en="EMAIL ADDRESS" value={a.email.trim()} />
        </Block>

        <SectionTitle ml="2. അപേക്ഷകന്റെ വിലാസം" en="ADDRESS OF THE APPLICANT" />
        <Block>
          <Row ml="വാർഡ് / ഡിവിഷൻ നമ്പർ" en="WARD / DIVISION NUMBER" value={up(a.wardNumber)} />
          <Row ml="വീട്ടു നമ്പർ" en="HOUSE NUMBER" value={up(a.houseNumber)} />
          <Row ml="വീട്ടുപേര്" en="HOUSE NAME" value={up(a.houseName)} />
          <Row ml="പ്രദേശം / സ്ഥലപ്പേര്" en="LOCALITY" value={up(a.locality)} />
          <Row ml="സ്ഥലം" en="PLACE" value={up(a.place)} />
          <Row ml="പോസ്റ്റ് ഓഫീസ്" en="POST OFFICE" value={up(a.postOffice)} />
          <Row ml="പിൻ കോഡ്" en="PIN CODE" value={a.pinCode.trim()} />
          <Row ml="വില്ലേജ്" en="VILLAGE" value={up(a.village)} />
          <Row ml="താലൂക്ക്" en="TALUK" value={up(a.taluk)} />
          <Row ml="ജില്ല / സംസ്ഥാനം" en="DISTRICT / STATE" value={[up(a.district), up(a.state)].filter(Boolean).join(" / ")} />
        </Block>
      </Page>

      {/* ---------------- PAGE 2 ---------------- */}
      <Page pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
        <SectionTitle ml="3. മരണപ്പെട്ട ആളുടെ വിവരങ്ങൾ" en="DETAILS OF THE DECEASED PERSON" />
        <Block>
          <Row ml="മരണപ്പെട്ട ആളുടെ പൂർണ്ണമായ പേര്" en="FULL NAME OF THE DECEASED" value={up(d.fullName)} />
          <Row ml="മരണസമയത്തെ വയസ്സ്" en="AGE AT THE TIME OF DEATH" value={d.age.trim()} />
          <Row ml="തൊഴിൽ" en="OCCUPATION" value={up(d.occupationBeforeDeath)} />
          <Row ml="പൂർണ്ണമായ വിലാസം" en="FULL ADDRESS" value={upMultiline(d.address)} />
          <Row ml="മരണ തീയതി" en="DATE OF DEMISE" value={formatDate(d.dateOfDemise)} />
          <Row ml="മരണം സംഭവിച്ച സ്ഥലം" en="PLACE OF DEMISE" value={up(d.placeOfDemise)} />
          <Row ml="മരണ സർട്ടിഫിക്കറ്റ് നമ്പർ" en="DEATH CERTIFICATE NUMBER" value={up(d.deathCertificateNumber)} />
          <Row
            ml="മരണം രജിസ്റ്റർ ചെയ്ത സ്ഥാപനം"
            en="REGISTERING AUTHORITY"
            value={up(d.deathRegistrationAuthority)}
          />
        </Block>

        <SectionTitle ml="4. സർട്ടിഫിക്കറ്റ് ആവശ്യമായ കാരണം" en="PURPOSE FOR WHICH THE CERTIFICATE IS REQUIRED" />
        <Block>
          <Row ml="ആവശ്യം" en="PURPOSE" value={upMultiline(doc.purpose)} />
        </Block>

        <SectionTitle
          ml="5. അനന്തരാവകാശികളുടെ വിവരങ്ങൾ"
          en={`LIST OF LEGAL HEIRS (TOTAL ${data.heirs.length})`}
        />
        <HeirTable heirs={chunks[0]} startIndex={0} />
        {chunks.length > 1 ? (
          <div style={{ fontSize: "9.5px", marginTop: "4px", fontStyle: "italic" }}>
            …continued on the next page / തുടർച്ച അടുത്ത പേജിൽ
          </div>
        ) : null}
      </Page>

      {/* ------------- HEIR CONTINUATION PAGES ------------- */}
      {chunks.slice(1).map((chunk, idx) => {
        const start = 6 + idx * 16;
        return (
          <Page key={`heir-${idx}`} pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
            <SectionTitle
              ml="5. അനന്തരാവകാശികളുടെ വിവരങ്ങൾ (തുടർച്ച)"
              en="LIST OF LEGAL HEIRS (CONTINUED)"
            />
            <HeirTable heirs={chunk} startIndex={start} />
          </Page>
        );
      })}

      {/* ---------------- DECLARATION PAGE ---------------- */}
      <Page pageNo={next()} pageCount={pageCount} formCode={FORM_CODE}>
        <SectionTitle ml="6. സത്യപ്രസ്താവന" en="DECLARATION BY THE APPLICANT" />
        <div
          style={{
            border: "1px solid #b9c2cd",
            borderTop: "none",
            padding: "10px 12px",
            fontFamily: ML,
            fontSize: "12px",
            lineHeight: 1.75,
          }}
        >
          മേൽ വിവരിച്ചിട്ടുള്ള വിവരങ്ങൾ എന്റെ അറിവിലും വിശ്വാസത്തിലും ശരിയും സത്യവുമാണെന്നും, മരണപ്പെട്ട{" "}
          <strong style={{ fontFamily: "inherit" }}>{up(d.fullName) || "__________________"}</strong> എന്ന ആളുടെ
          അനന്തരാവകാശികൾ മുകളിൽ പട്ടികപ്പെടുത്തിയിട്ടുള്ളവർ മാത്രമാണെന്നും, ഇവരെക്കൂടാതെ മറ്റ് അവകാശികൾ
          ഇല്ലെന്നും ഞാൻ ഇതിനാൽ സത്യപ്രസ്താവന ചെയ്യുന്നു. നൽകിയിട്ടുള്ള വിവരങ്ങൾ തെറ്റാണെന്ന് കണ്ടെത്തിയാൽ
          നിയമപ്രകാരമുള്ള നടപടികൾക്ക് ഞാൻ വിധേയനായിരിക്കുന്നതാണ്.
          <div style={{ fontFamily: "inherit", fontSize: "10px", marginTop: "8px", color: "#333c47" }}>
            I hereby declare that the particulars furnished above are true and correct to the best of my knowledge and
            belief, and that there are no legal heirs other than those listed above.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "26px" }}>
          <div style={{ fontFamily: ML, fontSize: "11.5px" }}>
            <div>
              സ്ഥലം / PLACE :{" "}
              <strong style={{ fontFamily: "inherit" }}>{up(doc.declarationPlace) || "____________"}</strong>
            </div>
            <div style={{ marginTop: "8px" }}>
              തീയതി / DATE :{" "}
              <strong style={{ fontFamily: "inherit" }}>{formatDate(doc.declarationDate) || "____________"}</strong>
            </div>
          </div>
          <SignatureBox
            caption="അപേക്ഷകന്റെ ഒപ്പ്"
            subCaption={`SIGNATURE OF THE APPLICANT${a.fullName ? ` — ${up(a.fullName)}` : ""}`}
            width="280px"
            height="62px"
          />
        </div>

        <SectionTitle ml="7. ഹാജരാക്കുന്ന രേഖകൾ" en="ENCLOSURES SUBMITTED (TICK AS APPLICABLE)" />
        <div
          style={{
            border: "1px solid #b9c2cd",
            borderTop: "none",
            padding: "8px 12px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "5px",
            columnGap: "12px",
            fontSize: "10.5px",
          }}
        >
          {[
            ["മരണ സർട്ടിഫിക്കറ്റ് പകർപ്പ്", "Copy of Death Certificate"],
            ["റേഷൻ കാർഡ് പകർപ്പ്", "Copy of Ration Card"],
            ["അപേക്ഷകന്റെ ആധാർ പകർപ്പ്", "Aadhaar copy of applicant"],
            ["അപേക്ഷകന്റെ തിരിച്ചറിയൽ കാർഡ്", "Voter ID of applicant"],
            ["അവകാശികളുടെ ആധാർ പകർപ്പുകൾ", "Aadhaar copies of legal heirs"],
            ["മറ്റ് രേഖകൾ", "Other documents"],
          ].map(([ml, en]) => (
            <div key={en} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
              <span style={{ display: "inline-block", width: "11px", height: "11px", border: "1px solid #444", marginTop: "2px" }} />
              <span>
                <span style={{ fontFamily: ML }}>{ml}</span>
                <span style={{ color: "#4a5663", fontSize: "9px" }}> / {en}</span>
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "34px", display: "flex", justifyContent: "space-between" }}>
          <SignatureBox caption="ഓഫീസ് ഉപയോഗത്തിന് — സ്വീകരിച്ച ഉദ്യോഗസ്ഥന്റെ ഒപ്പ്" subCaption="FOR OFFICE USE — RECEIVING OFFICER" width="300px" />
          <SignatureBox caption="ഓഫീസ് സീൽ" subCaption="OFFICE SEAL" width="200px" />
        </div>

        <Note>
          Prepared with assistance from <strong>Nexia Virtual Desk</strong> (private application assistance service, not
          affiliated with the Government of Kerala). This printout must be signed by hand before submission. Signature
          spaces are intentionally left blank.
        </Note>
      </Page>
    </div>
  );
}

function HeirTable({ heirs, startIndex }: { heirs: FormData["heirs"]; startIndex: number }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "2px" }}>
      <thead>
        <tr>
          <ThCell ml="ക്രമ നം." en="SL" width="34px" />
          <ThCell ml="പേര്" en="NAME" />
          <ThCell ml="ലിംഗം" en="SEX" width="52px" />
          <ThCell ml="വയസ്സ്" en="AGE" width="40px" />
          <ThCell ml="ബന്ധം" en="RELATION" width="92px" />
          <ThCell ml="തൊഴിൽ" en="OCCUPATION" width="86px" />
          <ThCell ml="ഒപ്പ്" en="SIGNATURE" width="120px" />
        </tr>
      </thead>
      <tbody>
        {heirs.map((h, i) => (
          <tr key={h.id}>
            <td style={{ ...td, textAlign: "center" }}>{startIndex + i + 1}</td>
            <td style={td}>
              {up(h.fullName)}
              {h.isMinor && h.guardianName ? (
                <div style={{ fontSize: "8.5px", color: "#3d4854" }}>
                  (MINOR — GUARDIAN: {up(h.guardianName)})
                </div>
              ) : null}
            </td>
            <td style={{ ...td, textAlign: "center" }}>{up(h.gender).slice(0, 6)}</td>
            <td style={{ ...td, textAlign: "center" }}>{h.age.trim()}</td>
            <td style={td}>{up(h.relationship)}</td>
            <td style={td}>{up(h.occupation)}</td>
            <td style={{ ...td, height: "34px" }}>{"\u00A0"}</td>
          </tr>
        ))}
        {heirs.length === 0 ? (
          <tr>
            <td style={{ ...td, textAlign: "center" }} colSpan={7}>
              NO LEGAL HEIR ENTERED
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
