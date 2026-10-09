# Optional: overlay mode for the original scanned PDFs

The build in this repository does **not** contain the three source documents
(`1-Main application LH.pdf`, `2-application -Legal heir.pdf`,
`3-LH-Witness.pdf`). They were not supplied to the project, so the app prints a
careful **reproduction** of each form instead.

If you have the originals you can switch the app to **overlay mode**, where the
entered data is stamped directly onto the scans.

## 1. Put the files here

```
public/templates/1-Main application LH.pdf
public/templates/2-application -Legal heir.pdf
public/templates/3-LH-Witness.pdf
public/templates/manifest.json
```

## 2. Create `manifest.json`

```jsonc
{
  "enabled": true,
  "main": {
    "file": "1-Main application LH.pdf",
    "fields": [
      { "key": "applicant.fullName", "page": 0, "x": 190, "y": 668, "size": 10, "maxWidth": 330 },
      { "key": "applicant.rationCardNumber", "page": 0, "x": 190, "y": 648, "size": 10 },
      { "key": "deceased.fullName", "page": 0, "x": 190, "y": 520, "size": 10 }
    ]
  },
  "heir":    { "file": "2-application -Legal heir.pdf", "fields": [] },
  "witness": { "file": "3-LH-Witness.pdf",              "fields": [] }
}
```

* `key` — any key produced by `flattenValues()` in `src/lib/pdf/values.ts`
  (for example `applicant.fullName`, `deceased.dateOfDemise`,
  `heirs.0.fullName`, `witnesses.1.address`). All values are already
  upper-cased.
* `page` — 0-based page index inside the template PDF.
* `x` / `y` — PDF points, origin at the **bottom-left** of the page
  (A4 = 595 × 842 pt).
* `maxWidth` — optional; the text is truncated so it cannot run into the next
  column.

## 3. Calibrating the coordinates

Open the template in any PDF reader that shows cursor coordinates (or import it
into Inkscape / Illustrator), note the point position of each blank, and add a
row. Reload the app and press **Generate** — `loadManifest()` picks the file up
automatically and `overlayTemplate()` stamps the values.

If `manifest.json` is missing, unreadable, or has `"enabled": false`, the app
silently falls back to the built-in reproduction, so nothing breaks.

## Limitation you must know about

Overlay mode uses the PDF standard font **Helvetica**, which can only encode
Latin-1. Malayalam values typed by the user are therefore dropped in overlay
mode (the Malayalam that is *printed on the scan itself* is of course
untouched). The built-in reproduction mode renders Malayalam correctly because
it uses the browser's own text shaping engine.
