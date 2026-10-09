# Nexia Virtual Desk — Kerala Legal Heirship Certificate Application Assistant

A mobile-first assistant that collects the information needed for a Kerala
Legal Heirship Certificate application and produces, **entirely inside the
browser**:

| Output | File name | Type |
| --- | --- | --- |
| Main Application – Legal Heir | `Legal_Heir_Main_Application.pdf` | A4 PDF |
| Legal Heir Form | `Legal_Heir_Application_Form.pdf` | A4 PDF |
| Witness Form | `Legal_Heir_Witness_Form.pdf` | A4 PDF |
| e-District data transfer sheet | `Nexia_eDistrict_Online_Application_Data.txt` | TXT |
| Aadhaar & document checklist | `Nexia_Aadhaar_Documents_Checklist.txt` | TXT |

> **Disclaimer** — This is a private application assistance service provided by
> Nexia Virtual Desk. We are not affiliated with or representing the Government
> of Kerala. Final requirements and acceptance are subject to the relevant
> government authority. Official portal: <https://edistrict.kerala.gov.in/>

---

## 1. Honest status of the source documents

**The three PDFs (`1-Main application LH.pdf`, `2-application -Legal heir.pdf`,
`3-LH-Witness.pdf`) were not present in the project when this build was
produced.** They could not be opened, measured or traced.

Therefore:

* The three generated PDFs are a **careful print-ready reproduction** built
  from the existing data-entry workflow and the standard Kerala Village Office
  legal-heirship paperwork — **not** a pixel-accurate copy of the scans.
* No claim of exact official-form reproduction is made.
* Every field whose label, wording or presence must still be checked against
  the real scans is listed at **`/field-map`** with the status
  `needs-verification`.
* An **overlay mode** is implemented and ready: drop the originals into
  `public/templates/` with a calibrated `manifest.json` and the app will stamp
  the data straight onto the official scans instead. See
  [`public/templates/README.md`](public/templates/README.md).

### What must still be done manually

1. Open each scan and compare it with `/field-map`.
2. Correct any Malayalam heading, declaration sentence or column order that
   differs (all of it lives in `src/components/printable/*.tsx`).
3. Add any field the scan contains that the wizard does not collect yet
   (`src/lib/types.ts` → the matching step in `src/components/steps/Steps.tsx`
   → the printable template).
4. Optionally calibrate `public/templates/manifest.json` for true overlay
   output.

---

## 2. Project layout

The platform runtime is Next.js (App Router), so the classic
`index.html / style.css / script.js` trio maps as follows:

| Classic file | Here |
| --- | --- |
| `index.html` | `src/app/page.tsx` + `src/app/layout.tsx` |
| `style.css` | Tailwind CSS v4 via `src/app/globals.css` + component classes |
| `script.js` | `src/components/WizardApp.tsx` and `src/lib/**` |
| `assets/` | `public/` (incl. `public/templates/` for overlay mode) |

```
src/
  app/
    layout.tsx              root layout, Noto Sans Malayalam webfont
    page.tsx                renders the wizard
    field-map/page.tsx      source-form → web-form mapping table (from DB)
    api/health/route.ts     healthcheck
    api/field-map/route.ts  reference data (seeds itself, no personal data)
  components/
    WizardApp.tsx           6-step wizard, progress, reset dialog
    steps/Steps.tsx         steps 1–5
    steps/Review.tsx        step 6: review, generate, preview, download
    ui/Field.tsx            accessible inputs, status pickers, cards
    printable/
      shared.tsx            A4 page frame, bilingual rows, tables, sig boxes
      MainApplication.tsx   FORM-1 template
      LegalHeirForm.tsx     FORM-2 template
      WitnessForm.tsx       FORM-3 template
  lib/
    types.ts                data model + empty-state factories
    format.ts               uppercase / masking / date / download helpers
    validation.ts           required vs. optional, errors vs. warnings
    txt.ts                  the two TXT generators
    fieldMapSeed.ts         the field-mapping plan (seed data)
    pdf/generate.tsx        React → canvas → jsPDF (A4, multi-page)
    pdf/overlay.ts          optional pdf-lib overlay on the original scans
    pdf/values.ts           flat value map used by overlay mode
  db/schema.ts              reference tables only (no personal data)
```

### Why there is a backend at all

The wizard itself needs **no** backend — all PDF/TXT generation is client-side.
The small server part exists only for non-personal reference data: the
`form_field_map` table that powers `/field-map` and the "source-document
status" banner. **No applicant, heir, witness, Aadhaar or document data is ever
sent to the server or written to the database.**

---

## 3. How the PDFs are produced

1. The printable React template is rendered into a detached, off-screen A4
   stage (794 × 1123 px = A4 at 96 dpi).
2. The browser's own text engine shapes the Malayalam (conjuncts, chillus,
   reordered vowel signs) — this is why rendering goes through the DOM rather
   than through a PDF text API.
3. Each `[data-pdf-page]` element is rasterised with **html2canvas-pro**.
4. **jsPDF** assembles the images into a real multi-page A4 PDF and
   `pdf.output("blob")` returns `application/pdf` — a genuine PDF, not HTML
   renamed.
5. A shrink-to-fit guard scales a page's content block down (never below 55 %)
   if an unusually long address would otherwise overflow, so text can never be
   clipped.

**Trade-off:** pages are raster images inside the PDF, so the text is not
selectable. This was chosen deliberately — `pdf-lib`/jsPDF cannot shape
Malayalam correctly, and a correct Malayalam printout matters more than
selectable text. Overlay mode (`pdf-lib`) keeps the original vector scan and
stamps Latin-1 text on top.

### Uppercase rule

`up()` in `src/lib/format.ts` upper-cases every English value that reaches a
document. Malayalam code points have no case mapping, so Malayalam passes
through untouched. E-mail addresses go through `asIs()` and are never
case-folded. Digits in Aadhaar/ration-card/certificate numbers are unaffected.

### Signatures

Signature cells and boxes are always rendered **empty**. The app never draws,
imitates or inserts a signature.

---

## 4. Privacy model

* Form state lives in React memory only. Nothing is written to `localStorage`
  or `sessionStorage`, so reloading the tab wipes everything.
* No form value is ever sent over the network. The only `fetch` calls are
  `GET /api/field-map` (reference data, no body) and the optional template
  fetch from `/templates/`.
* No analytics, no third-party trackers, no automatic WhatsApp upload.
* Aadhaar is masked (`XXXX XXXX 9012`) on the review screen; the full number
  appears only in `Nexia_Aadhaar_Documents_Checklist.txt`.
* Heir and witness Aadhaar numbers are **never printed** on the three PDFs.
  (The applicant's Aadhaar is printed on FORM-1 because the existing workflow
  form carries that field — remove the row in `MainApplication.tsx` if the
  original scan does not have it.)
* PDF generation errors are shown as a friendly message; the caught error is
  deliberately not logged, because it could contain form values.
* "Clear All Data" asks for confirmation and resets everything.
* The WhatsApp button opens <https://wa.me/919961850698> with a short,
  non-sensitive enquiry text only.

---

## 5. Running locally

```bash
npm install
cp .env.example .env     # or create .env
# .env
# DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db

npx drizzle-kit push     # creates the two reference tables
npm run dev              # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## 6. Deploying to Vercel

1. Push the repository to GitHub/GitLab.
2. In Vercel, **Add New → Project** and import the repository. The framework is
   detected as Next.js; no build-command changes are needed.
3. Add the environment variable `DATABASE_URL` pointing at any Postgres
   instance (Vercel Postgres, Neon, Supabase…). It is used **only** for the
   `/field-map` reference table.
4. Deploy, then run `npx drizzle-kit push` once against the production
   database (locally, with `DATABASE_URL` pointing at it).

If you prefer a pure static host, the wizard works without the database: the
`/field-map` page and API fall back to the in-code seed data when the database
is unreachable.

---

## 7. Test report — what was actually tested

Automated checks run during the build (27 assertions, all passing — see
section 8 for the harness):

| # | Test | Result |
| --- | --- | --- |
| 1 | `npx next typegen` | ✅ pass |
| 2 | `tsc --noEmit` (strict) | ✅ pass |
| 3 | `next build` production build | ✅ pass |
| 4 | `eslint .` | ✅ 0 errors, 0 warnings |
| 5 | English → uppercase (`Anand Kumar` → `ANAND KUMAR`, `Kizhakkethil House` → `KIZHAKKETHIL HOUSE`) | ✅ pass |
| 6 | Malayalam strings unchanged by the uppercase helper | ✅ pass |
| 7 | Mixed Malayalam+English: only the English part upper-cased | ✅ pass |
| 8 | E-mail case and punctuation preserved | ✅ pass |
| 9 | Aadhaar grouping and masking helpers | ✅ pass |
| 10 | Date rendered as `dd-mm-yyyy` | ✅ pass |
| 11 | Empty form raises the expected required-field errors | ✅ pass |
| 12 | Missing second witness raises an error | ✅ pass |
| 13 | Fully filled 3-heir / 2-witness form → 0 errors, 0 warnings | ✅ pass |
| 14 | Zero heirs → blocking error | ✅ pass |
| 15 | 3-digit Aadhaar and 5-digit mobile → validation errors | ✅ pass |
| 16 | `TO_BE_VERIFIED` document status → warning (non-blocking) | ✅ pass |
| 17 | e-District TXT contains the entered values, upper-cased | ✅ pass |
| 18 | e-District TXT contains **no** Aadhaar number | ✅ pass |
| 19 | Checklist TXT contains the full Aadhaar numbers of applicant, every heir and both witnesses | ✅ pass |
| 20 | Checklist TXT lists pending/unverified items and the sign-off list | ✅ pass |
| 21 | The two TXT files are separate documents with different content | ✅ pass |
| 22 | Checklist content never enters the PDF templates (no template imports `txt.ts`) | ✅ verified by inspection of the import graph |
| 23 | Heir/witness Aadhaar absent from all three PDF templates | ✅ verified by inspection (`grep aadhaar src/components/printable` → only `applicant.aadhaar` in FORM-1) |

Reviewed by code inspection rather than execution:

* Add / edit / remove of multiple legal heirs, with a confirmation prompt
  before removal.
* Preview modal (`<iframe src={blobUrl}>`) and the six labelled
  preview/download buttons.
* WhatsApp deep link and its non-sensitive message.
* Reset dialog.

### Not tested — limitations you should know about

* **No browser was available in the build sandbox**, so the actual
  canvas→PDF rasterisation, the on-screen preview, the download prompts and the
  real Malayalam glyph shaping were **not** executed end-to-end. Please open
  the app in Chrome/Android once and generate the three PDFs before using it
  with a customer. The code paths are straightforward, but this is an honest
  "not run here".
* **Pixel accuracy against the official scans is unverified** — see section 1.
* PDF pages are raster images, so the text inside them is not selectable or
  searchable.
* Overlay mode has no calibrated coordinates shipped; `manifest.json` is absent
  by default, so the app always uses the reproduction path until you add one.
* The Malayalam webfont is fetched from Google Fonts. If the device is offline
  the browser falls back to an installed Malayalam font; if none exists the
  Malayalam headings will show as boxes. No personal data is sent to Google.
* Printing fidelity on very old Android WebViews (Android 7 and below) has not
  been checked.

## 8. Re-running the logic test harness

```bash
mkdir -p /tmp/tb
npx tsc src/lib/types.ts src/lib/format.ts src/lib/validation.ts src/lib/txt.ts \
  --outDir /tmp/tb --module commonjs --target es2020 --moduleResolution node \
  --skipLibCheck --esModuleInterop
node /tmp/tb/test.js   # the harness used for the table above
```

---

Nexia Virtual Desk · Your online application supporting team ·
WhatsApp <https://wa.me/919961850698>
