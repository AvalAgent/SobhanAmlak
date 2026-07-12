"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProductFacets, useProductList } from "@/lib/products-client";

const ALL_TYPES = "همه انواع";
const ALL_DISTRICTS = "همه محله ها";
const ALL_CITIES = "همه شهرها";
const SORTS = [
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان ترین" },
  { value: "price-desc", label: "گران ترین" },
  { value: "area-desc", label: "بزرگ ترین" },
] as const;

function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white">
      <div className="aspect-[4/3] animate-pulse bg-stone-200" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200" />
        <div className="h-6 w-2/3 animate-pulse rounded bg-stone-200" />
        <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 animate-pulse rounded-2xl bg-stone-200" />
          <div className="h-10 animate-pulse rounded-2xl bg-stone-200" />
          <div className="h-10 animate-pulse rounded-2xl bg-stone-200" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  initialQuery = "",
  initialType = ALL_TYPES,
  initialDistrict = ALL_DISTRICTS,
  initialCity = ALL_CITIES,
  initialSort = "newest",
}: {
  initialQuery?: string;
  initialType?: string;
  initialDistrict?: string;
  initialCity?: string;
  initialSort?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const [district, setDistrict] = useState(initialDistrict);
  const [city, setCity] = useState(initialCity);
  const [sort, setSort] = useState<string>(initialSort);
  const debouncedQuery = useDebounced(query);

  const { facets } = useProductFacets();

  const types = useMemo(
    () => [ALL_TYPES, ...(facets?.types ?? [])],
    [facets],
  );
  const districts = useMemo(
    () => [ALL_DISTRICTS, ...(facets?.districts ?? [])],
    [facets],
  );
  const cities = useMemo(
    () => [ALL_CITIES, ...(facets?.cities ?? [])],
    [facets],
  );

  const filters = useMemo(
    () => ({
      q: debouncedQuery.trim() || undefined,
      type: type !== ALL_TYPES ? type : undefined,
      district: district !== ALL_DISTRICTS ? district : undefined,
      city: city !== ALL_CITIES ? city : undefined,
      sort: sort as "newest" | "price-asc" | "price-desc" | "area-desc",
    }),
    [debouncedQuery, type, district, city, sort],
  );

  const { rows, total, loading, loadingMore, error, hasMore, loadMore } = useProductList(filters, 24);

  const hasActiveFilters =
    !!query || type !== ALL_TYPES || district !== ALL_DISTRICTS || city !== ALL_CITIES;

  function clearFilters() {
    setQuery("");
    setType(ALL_TYPES);
    setDistrict(ALL_DISTRICTS);
    setCity(ALL_CITIES);
  }

  return (
    <>
      <div className="mb-7 grid gap-3 rounded-[1.5rem] border border-[var(--line)] bg-white/82 p-4 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_auto]">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-stone-500">جست وجوی ملک</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 font-bold text-stone-800"
            placeholder="نام ملک، نوع یا محله"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-stone-500">نوع ملک</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 font-bold text-stone-800"
          >
            {types.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-stone-500">شهر</span>
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 font-bold text-stone-800"
          >
            {cities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-stone-500">محله</span>
          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 font-bold text-stone-800"
          >
            {districts.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-stone-500">مرتب سازی</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 font-bold text-stone-800"
          >
            {SORTS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3 text-sm font-bold text-stone-500">
        <span>
          {loading && rows.length === 0 ? "در حال جست وجو..." : `${total} فایل مطابق انتخاب شما`}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="focus-ring rounded-full text-[var(--cypress)]"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {error ? (
        <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-10 text-center">
          <h2 className="text-2xl font-black text-red-700">خطا در دریافت فایل ها</h2>
          <p className="mt-3 text-red-600">{error}</p>
        </div>
      ) : loading && rows.length === 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : rows.length ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rows.map((product) => (
              <Link
                href={`/products/${product.id}`}
                id={product.id}
                className="focus-ring soft-shadow block overflow-hidden rounded-[1.5rem] bg-white transition hover:-translate-y-1"
                key={product.id}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/88 px-4 py-2 text-sm font-black text-[var(--copper)] backdrop-blur">
                    {product.badge}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-stone-500">
                        {product.type} در {product.district}{product.city && product.city !== "تهران" ? `، ${product.city}` : ""}
                      </p>
                      <h2 className="mt-2 text-2xl font-black">{product.title}</h2>
                    </div>
                    <p className="shrink-0 text-lg font-black text-[var(--cypress)]">{product.price}</p>
                  </div>
                  <p className="mt-4 leading-8 text-stone-600">{product.summary}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm font-extrabold text-stone-700">
                    {[product.area, product.rooms, product.year].map((item) => (
                      <span className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-3 py-3" key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.features.slice(0, 4).map((feature) => (
                      <span className="rounded-full bg-[var(--mint)] px-3 py-2 text-xs font-bold text-[var(--cypress)]" key={feature}>{feature}</span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex rounded-full bg-[var(--cypress)] px-4 py-3 text-sm font-black text-white">مشاهده جزئیات ملک</span>
                </div>
              </Link>
            ))}
            {loadingMore && (
              <ProductCardSkeleton />
            )}
          </div>
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="focus-ring rounded-full border border-[var(--cypress)] bg-white px-8 py-4 font-black text-[var(--cypress)] transition hover:bg-[var(--mint)] disabled:opacity-60"
              >
                {loadingMore ? "در حال بارگذاری..." : "فایل های بیشتر"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-[1.5rem] border border-[var(--line)] bg-white p-10 text-center">
          <h2 className="text-2xl font-black">فایلی با این مشخصات پیدا نشد</h2>
          <p className="mt-3 text-stone-600">محله یا نوع ملک را تغییر دهید تا گزینه های بیشتری ببینید.</p>
        </div>
      )}
    </>
  );
}
