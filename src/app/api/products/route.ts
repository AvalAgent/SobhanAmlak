import { NextRequest, NextResponse } from "next/server";
import {
  listProducts,
  listProductFacets,
  type ProductFilters,
} from "@/lib/products";

// Catalog API for avalagent sales-agent ingestion. No DB — reads directly from
// src/data/products.json (500 static listings). Supports filter + pagination so
// the agent can full-sync (offset walk) or query by budget/type/district.
//
// Example: GET /api/products?city=تهران&type=ویلا&maxPrice=50000000000&sort=price-asc&limit=50&offset=0

function num(v: string | null): number | undefined {
  if (v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function bool(v: string | null): boolean {
  return v === "1" || v === "true" || v === "yes";
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const filters: ProductFilters = {
    q: sp.get("q") ?? undefined,
    type: sp.get("type") ?? undefined,
    city: sp.get("city") ?? undefined,
    district: sp.get("district") ?? undefined,
    minPrice: num(sp.get("minPrice")),
    maxPrice: num(sp.get("maxPrice")),
    minArea: num(sp.get("minArea")),
    maxArea: num(sp.get("maxArea")),
    rooms: num(sp.get("rooms")),
    featured: sp.has("featured") ? bool(sp.get("featured")) : undefined,
    limit: num(sp.get("limit")),
    offset: num(sp.get("offset")),
    sort: (sp.get("sort") as ProductFilters["sort"]) ?? undefined,
  };

  // ?facets=1 returns the catalog summary (types/cities/districts/price+area
  // ranges) the agent can use to scope a query before paging.
  if (sp.get("facets")) {
    return NextResponse.json({ facets: listProductFacets() });
  }

  return NextResponse.json(listProducts(filters));
}
