"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  title: string;
  type: string;
  district: string;
  price: string;
  area: string;
  rooms: string;
  year: string;
  badge: string;
  image: string;
  summary: string;
  features: string[];
};

export function ProductGrid({
  products,
  initialQuery = "",
  initialType = "همه انواع",
  initialDistrict = "همه محله ها",
}: {
  products: Product[];
  initialQuery?: string;
  initialType?: string;
  initialDistrict?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const [district, setDistrict] = useState(initialDistrict);
  const types = ["همه انواع", ...new Set(products.map((product) => product.type))];
  const districts = [
    "همه محله ها",
    ...new Set(products.map((product) => product.district)),
  ];
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fa-IR");
    return products.filter((product) => {
      const searchable = `${product.title} ${product.type} ${product.district}`.toLocaleLowerCase("fa-IR");
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (type === "همه انواع" || product.type === type) &&
        (district === "همه محله ها" || product.district === district)
      );
    });
  }, [district, products, query, type]);

  return (
    <>
      <div className="mb-7 grid gap-3 rounded-[1.5rem] border border-[var(--line)] bg-white/82 p-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
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
          <span className="text-sm font-bold text-stone-500">محله</span>
          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 font-bold text-stone-800"
          >
            {districts.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="mb-5 flex items-center justify-between gap-3 text-sm font-bold text-stone-500">
        <span>{filteredProducts.length} فایل مطابق انتخاب شما</span>
        {(query || type !== "همه انواع" || district !== "همه محله ها") && (
          <button
            type="button"
            onClick={() => { setQuery(""); setType("همه انواع"); setDistrict("همه محله ها"); }}
            className="focus-ring rounded-full text-[var(--cypress)]"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>
      {filteredProducts.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
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
                    <p className="text-sm font-bold text-stone-500">{product.type} در {product.district}</p>
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
                  {product.features.map((feature) => (
                    <span className="rounded-full bg-[var(--mint)] px-3 py-2 text-xs font-bold text-[var(--cypress)]" key={feature}>{feature}</span>
                  ))}
                </div>
                <span className="mt-6 inline-flex rounded-full bg-[var(--cypress)] px-4 py-3 text-sm font-black text-white">مشاهده جزئیات ملک</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-[var(--line)] bg-white p-10 text-center">
          <h2 className="text-2xl font-black">فایلی با این مشخصات پیدا نشد</h2>
          <p className="mt-3 text-stone-600">محله یا نوع ملک را تغییر دهید تا گزینه های بیشتری ببینید.</p>
        </div>
      )}
    </>
  );
}
