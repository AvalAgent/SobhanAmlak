"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products-client";

function CardSkeleton() {
  return (
    <div className="block overflow-hidden rounded-[1.5rem] bg-white">
      <div className="aspect-[4/3] animate-pulse bg-stone-200" />
      <div className="space-y-3 p-5">
        <div className="h-6 w-3/4 animate-pulse rounded bg-stone-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-stone-200" />
      </div>
    </div>
  );
}

export function FeaturedHomes() {
  const [homes, setHomes] = useState<Product[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/products?featured=1&limit=3", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = await res.json();
        if (alive) setHomes(json.data ?? []);
      } catch {
        if (alive) setHomes([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!homes) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (!homes.length) {
    return (
      <p className="text-stone-600">در حال حاضر فایل ویژه ای موجود نیست.</p>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {homes.map((home) => (
        <Link
          href={`/products/${home.id}`}
          className="focus-ring soft-shadow block overflow-hidden rounded-[1.5rem] bg-white transition hover:-translate-y-1"
          key={home.id}
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={home.image}
              alt={home.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-black">{home.title}</h3>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              {home.rooms} | {home.area} | {home.district || home.city}
            </p>
            <p className="mt-4 text-lg font-black text-[var(--cypress)]">
              {home.price}
            </p>
            <span className="mt-4 inline-flex rounded-full bg-[var(--mint)] px-4 py-2 text-sm font-black text-[var(--cypress)]">
              مشاهده جزئیات
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
