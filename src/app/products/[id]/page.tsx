"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ConsultationModal } from "@/components/consultation-modal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Product } from "@/lib/products-client";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

function DetailSkeleton() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="aspect-[4/3] animate-pulse rounded-[2rem] bg-stone-200" />
      <div className="space-y-5">
        <div className="h-4 w-40 animate-pulse rounded bg-stone-200" />
        <div className="h-14 w-3/4 animate-pulse rounded bg-stone-200" />
        <div className="h-24 w-full animate-pulse rounded bg-stone-200" />
        <div className="h-8 w-1/2 animate-pulse rounded bg-stone-200" />
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          if (alive) setError(true);
          return;
        }
        const json = await res.json();
        if (alive) setProduct(json.data ?? null);
      } catch {
        if (alive) setError(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="site-plan min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <section className="mx-auto w-full max-w-[1480px] px-5 pb-16 pt-5 sm:px-8 lg:px-12 lg:pb-24">
          <SiteHeader current="products" />
          <DetailSkeleton />
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (error || !product) {
    notFound();
  }

  return (
    <main className="site-plan min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[1480px] px-5 pb-16 pt-5 sm:px-8 lg:px-12 lg:pb-24">
        <SiteHeader current="products" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--paper)] soft-shadow">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <span className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-[var(--copper)] backdrop-blur">
              {product.badge}
            </span>
          </div>
          <div>
            <Link
              href="/products"
              className="focus-ring inline-flex min-h-11 items-center rounded-full text-sm font-bold text-[var(--copper)]"
            >
              ← بازگشت به فایل های ملکی
            </Link>
            <p className="mt-7 text-sm font-bold text-stone-500">
              {product.type} در {product.district || product.city}{product.district && product.city && product.city !== "تهران" ? `، ${product.city}` : ""}
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-[#18241f] sm:text-6xl">
              {product.title}
            </h1>
            <p className="mt-5 text-lg leading-9 text-stone-700">
              {product.summary}
            </p>
            <p className="mt-7 text-2xl font-black text-[var(--cypress)]">
              {product.price}
            </p>
            <ConsultationModal propertyTitle={product.title} />
          </div>
        </div>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["متراژ", product.area],
            ["اتاق خواب", product.rooms],
            ["وضعیت بنا", product.year],
          ].map(([label, value]) => (
            <div
              className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6"
              key={label}
            >
              <p className="text-sm font-bold text-stone-500">{label}</p>
              <p className="mt-3 text-2xl font-black text-[var(--cypress)]">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-bold text-[var(--copper)]">ویژگی های ملک</p>
            <h2 className="mt-2 text-3xl font-black">جزئیاتی برای تصمیم مطمئن</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {product.features.map((feature) => (
              <div
                className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 font-extrabold text-[var(--cypress)]"
                key={feature}
              >
                {feature}
              </div>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
