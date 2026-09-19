import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { user, error } = await requireUser();
  if (error) return error;

  const { id: raw } = await ctx.params;
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
  }

  const [deleted] = await db
    .delete(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, user.id)))
    .returning({ id: transactions.id });

  if (!deleted) return NextResponse.json({ error: "Transaksi tidak ditemukan." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
