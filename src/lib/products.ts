import productsData from "@/data/products.json";

export type Product = {
  id: string;
  title: string;
  type: string;
  city: string;
  district: string;
  price: string;
  priceValue: number;
  priceUnit: string;
  area: string;
  areaValue: number;
  rooms: string;
  roomsValue: number;
  year: string;
  yearValue: number;
  badge: string;
  isFeatured: boolean;
  image: string;
  summary: string;
  features: string[];
};

export const products: Product[] = productsData as Product[];

export type ProductListMeta = {
  total: number;
  limit: number;
  offset: number;
  count: number;
};

export type ProductListResponse = {
  data: Product[];
} & ProductListMeta;

export type ProductFilters = {
  q?: string;
  type?: string;
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number;
  featured?: boolean;
  limit?: number;
  offset?: number;
  sort?: "price-asc" | "price-desc" | "area-desc" | "newest";
};

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 100;

function clampLimit(value: number | undefined): number {
  if (!value || value < 1) return DEFAULT_LIMIT;
  return Math.min(value, MAX_LIMIT);
}

function clampOffset(value: number | undefined, total: number): number {
  if (!value || value < 0) return 0;
  return Math.min(value, total);
}

export function listProducts(filters: ProductFilters = {}): ProductListResponse {
  const {
    q,
    type,
    city,
    district,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    rooms,
    featured,
    sort,
  } = filters;

  let rows = products.slice();

  if (q && q.trim()) {
    const needle = q.trim().toLowerCase();
    rows = rows.filter((p) =>
      [p.title, p.district, p.city, p.type, p.summary, ...p.features]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }
  if (type) rows = rows.filter((p) => p.type === type);
  if (city) rows = rows.filter((p) => p.city === city);
  if (district) rows = rows.filter((p) => p.district === district);
  if (typeof minPrice === "number") rows = rows.filter((p) => p.priceValue >= minPrice);
  if (typeof maxPrice === "number") rows = rows.filter((p) => p.priceValue <= maxPrice);
  if (typeof minArea === "number") rows = rows.filter((p) => p.areaValue >= minArea);
  if (typeof maxArea === "number") rows = rows.filter((p) => p.areaValue <= maxArea);
  if (typeof rooms === "number") rows = rows.filter((p) => p.roomsValue === rooms);
  if (featured) rows = rows.filter((p) => p.isFeatured);

  switch (sort) {
    case "price-asc":
      rows.sort((a, b) => a.priceValue - b.priceValue);
      break;
    case "price-desc":
      rows.sort((a, b) => b.priceValue - a.priceValue);
      break;
    case "area-desc":
      rows.sort((a, b) => b.areaValue - a.areaValue);
      break;
    case "newest":
      rows.sort((a, b) => b.yearValue - a.yearValue);
      break;
    default:
      break;
  }

  const total = rows.length;
  const limit = clampLimit(filters.limit);
  const offset = clampOffset(filters.offset, total);
  const data = rows.slice(offset, offset + limit);

  return { data, total, limit, offset, count: data.length };
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function listProductFacets() {
  const types = Array.from(new Set(products.map((p) => p.type))).sort();
  const cities = Array.from(new Set(products.map((p) => p.city))).sort();
  const districts = Array.from(new Set(products.map((p) => p.district))).sort();
  const priceRange = {
    min: Math.min(...products.map((p) => p.priceValue)),
    max: Math.max(...products.map((p) => p.priceValue)),
  };
  const areaRange = {
    min: Math.min(...products.map((p) => p.areaValue)),
    max: Math.max(...products.map((p) => p.areaValue)),
  };
  return {
    total: products.length,
    types,
    cities,
    districts,
    priceRange,
    areaRange,
  };
}
