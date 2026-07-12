"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Product = {
  id: string;
  title: string;
  type: string;
  city?: string;
  district: string;
  price: string;
  priceValue?: number;
  priceUnit?: string;
  area: string;
  areaValue?: number;
  rooms: string;
  roomsValue?: number;
  year: string;
  yearValue?: number;
  badge: string;
  isFeatured?: boolean;
  image: string;
  summary: string;
  features: string[];
};

export type ProductListResponse = {
  data: Product[];
  total: number;
  limit: number;
  offset: number;
  count: number;
};

export type ProductFacets = {
  total: number;
  types: string[];
  cities: string[];
  districts: string[];
  priceRange: { min: number; max: number };
  areaRange: { min: number; max: number };
};

export type ListFilters = {
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
  sort?: string;
};

const BASE = "/api/products";

function buildUrl(
  filters: ListFilters,
  limit: number,
  offset: number,
): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) {
    if (v === undefined || v === "" || v === false) continue;
    sp.set(k, String(v));
  }
  sp.set("limit", String(limit));
  sp.set("offset", String(offset));
  return `${BASE}?${sp.toString()}`;
}

async function fetchList(
  filters: ListFilters,
  limit: number,
  offset: number,
): Promise<ProductListResponse> {
  const res = await fetch(buildUrl(filters, limit, offset), {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as ProductListResponse;
}

export function useProductList(filters: ListFilters, pageLimit = 24) {
  const [rows, setRows] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const reqId = useRef(0);

  const { q, type, city, district, sort } = filters;

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return;
    const id = ++reqId.current;
    setLoadingMore(true);
    try {
      const json = await fetchList(filters, pageLimit, rows.length);
      if (id !== reqId.current) return;
      setRows((prev) => [...prev, ...json.data]);
      setHasMore(rows.length + json.count < json.total);
    } catch (e) {
      if (id !== reqId.current) return;
      setError(e instanceof Error ? e.message : "خطا در دریافت فایل ها");
    } finally {
      if (id === reqId.current) setLoadingMore(false);
    }
  }, [filters, pageLimit, hasMore, loading, loadingMore, rows.length]);

  useEffect(() => {
    const id = ++reqId.current;
    const controller = new AbortController();
    void (async () => {
      setLoading(true);
      try {
        const json = await fetchList(filters, pageLimit, 0);
        if (id !== reqId.current || controller.signal.aborted) return;
        setRows(json.data);
        setTotal(json.total);
        setHasMore(json.count < json.total);
        setError(null);
      } catch (e) {
        if (id !== reqId.current) return;
        setError(e instanceof Error ? e.message : "خطا در دریافت فایل ها");
        setRows([]);
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [filters, pageLimit, q, type, city, district, sort]);

  return {
    rows,
    total,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
}

export function useProductFacets() {
  const [facets, setFacets] = useState<ProductFacets | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const res = await fetch(`${BASE}?facets=1`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (alive) setFacets(json.facets as ProductFacets);
      } catch {
        if (alive) setFacets(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { facets, loading };
}
