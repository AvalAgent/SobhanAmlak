import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { ProductGrid } from "@/components/product-grid";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "فایل های ملکی | خانه نما",
  description:
    "لیست فایل های ملکی خانه نما با اطلاعات قیمت، متراژ، محله و ویژگی های هر ملک.",
};

type ProductsPageProps = {
  searchParams: Promise<{
    query?: string;
    type?: string;
    district?: string;
    city?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = await searchParams;

  return (
    <main className="site-plan min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-[1480px] px-5 pb-14 pt-5 sm:px-8 lg:px-12">
        <SiteHeader current="products" />

        <div className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:py-20">
          <div>
            <p className="w-fit rounded-full border border-[var(--line)] bg-white/76 px-4 py-2 text-sm font-bold text-[var(--copper)]">
              فایل های زنده از پایگاه داده ملکی
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-[#18241f] sm:text-6xl">
              فایل های ملکی منتخب خانه نما
            </h1>
          </div>
          <p className="max-w-3xl text-lg leading-9 text-stone-700">
            فایل های بررسی شده خانه نما را بر اساس محله، نوع ملک و شرایط مورد
            نظرتان پیدا کنید و برای بازدید یا دریافت مشاوره، جزئیات هر گزینه را
            ببینید.
          </p>
        </div>

        <ProductGrid
          initialQuery={filters.query}
          initialType={filters.type}
          initialDistrict={filters.district}
          initialCity={filters.city}
        />
      </section>
      <SiteFooter />
    </main>
  );
}
