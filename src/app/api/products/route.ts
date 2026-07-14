import { NextRequest, NextResponse } from "next/server";
import {
  listProducts,
  listProductFacets,
  type Product,
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

// avalagent catalog-sync fetches `?page=N&limit=100` and expects
// `{ items, total, page, hasMore }` with RemoteProduct fields
// (sku/title/category/priceIRR/description/images/url/attributes).
function toCatalogItem(p: Product, origin: string) {
  return {
    id: p.id,
    sku: p.id,
    title: p.title,
    category: p.type,
    priceIRR: p.priceValue,
    stock: 1,
    description: `${p.summary} ${p.features.join("، ")}`,
    images: [p.image],
    url: `${origin}/products/${p.id}`,
    attributes: {
      استان: p.province,
      شهر: p.city,
      ...(p.district ? { منطقه: p.district } : {}),
      متراژ: p.area,
      اتاق: p.rooms,
      "سال ساخت": p.year,
      قیمت: p.price,
    },
  };
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  // Paged catalog shape for the avalagent sales agent.
  const pageParam = num(sp.get("page"));
  if (pageParam !== undefined) {
    const page = Math.max(1, pageParam);
    const limit = num(sp.get("limit")) ?? 100;
    const res = listProducts({ limit, offset: (page - 1) * limit });
    const origin = req.nextUrl.origin;
    return NextResponse.json({
      items: res.data.map((p) => toCatalogItem(p, origin)),
      total: res.total,
      page,
      hasMore: res.offset + res.count < res.total,
    });
  }

  const filters: ProductFilters = {
    q: sp.get("q") ?? undefined,
    type: sp.get("type") ?? undefined,
    province: sp.get("province") ?? undefined,
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
