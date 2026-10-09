import Link from "next/link";
import { asc, sql } from "drizzle-orm";
import { db } from "@/db";
import { formFieldMap } from "@/db/schema";
import { FIELD_MAP_SEED } from "@/lib/fieldMapSeed";

export const dynamic = "force-dynamic";

const statusStyle: Record<string, string> = {
  mapped: "bg-emerald-100 text-emerald-800",
  "needs-verification": "bg-amber-100 text-amber-900",
  "not-printed": "bg-slate-200 text-slate-700",
};

async function getRows() {
  try {
    const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(formFieldMap);
    if ((row?.count ?? 0) === 0) await db.insert(formFieldMap).values(FIELD_MAP_SEED);
    return await db.select().from(formFieldMap).orderBy(asc(formFieldMap.sortOrder));
  } catch {
    return FIELD_MAP_SEED.map((r, i) => ({ ...r, id: i + 1 }));
  }
}

export default async function FieldMapPage() {
  const rows = await getRows();
  const forms = Array.from(new Set(rows.map((r) => r.sourceForm)));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-[13.5px] font-semibold text-sky-700 hover:underline">
        ← Back to the application assistant
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Source form → web form field map</h1>
      <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-slate-600">
        This page documents how every field of the three source documents is represented in the wizard and in the
        generated printouts. Rows marked <strong>needs-verification</strong> must be compared with the original scans
        (<code>1-Main application LH.pdf</code>, <code>2-application -Legal heir.pdf</code>,{" "}
        <code>3-LH-Witness.pdf</code>) before the printouts are relied upon at a government counter.
      </p>

      {forms.map((form) => (
        <section key={form} className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-slate-900">{form}</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[840px] border-collapse text-left text-[13px]">
              <thead className="bg-slate-50 text-[11.5px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2.5">Section</th>
                  <th className="px-3 py-2.5">Source label</th>
                  <th className="px-3 py-2.5">Malayalam</th>
                  <th className="px-3 py-2.5">Web form field</th>
                  <th className="px-3 py-2.5">Requirement</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((r) => r.sourceForm === form)
                  .map((r) => (
                    <tr key={r.id} className="border-t border-slate-100 align-top">
                      <td className="px-3 py-2.5 font-semibold text-slate-700">{r.section}</td>
                      <td className="px-3 py-2.5 text-slate-800">{r.sourceLabel}</td>
                      <td className="px-3 py-2.5 text-slate-700">{r.sourceLabelMl}</td>
                      <td className="px-3 py-2.5 font-mono text-[12px] text-slate-600">{r.webField}</td>
                      <td className="px-3 py-2.5 text-slate-600">{r.requirement}</td>
                      <td className="px-3 py-2.5">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyle[r.status] ?? ""}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-slate-600">{r.notes}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </main>
  );
}
