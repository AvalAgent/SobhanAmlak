import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

// GET /api/products/[id] — single listing. Returns 404 JSON when not found.
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json(
      { ok: false, error: "not_found", id },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: product });
}
