import { NextResponse } from "next/server";
import { asc, sql } from "drizzle-orm";
import { db } from "@/db";
import { formFieldMap } from "@/db/schema";
import { FIELD_MAP_SEED } from "@/lib/fieldMapSeed";

export const dynamic = "force-dynamic";

/** Seeds the reference table once; contains no personal data. */
async function ensureSeeded() {
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(formFieldMap);
  if ((row?.count ?? 0) > 0) return;
  await db.insert(formFieldMap).values(FIELD_MAP_SEED);
}

export async function GET() {
  try {
    await ensureSeeded();
    const rows = await db.select().from(formFieldMap).orderBy(asc(formFieldMap.sortOrder));
    return NextResponse.json({
      ok: true,
      rows,
      summary: {
        total: rows.length,
        needsVerification: rows.filter((r) => r.status === "needs-verification").length,
        notPrinted: rows.filter((r) => r.status === "not-printed").length,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, rows: [], summary: { total: 0, needsVerification: 0, notPrinted: 0 } },
      { status: 200 }
    );
  }
}
