import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import { HomeSearch } from "@/components/home-search";
import { FeaturedHomes } from "@/components/featured-homes";

const districts = ["زعفرانیه", "فرشته", "الهیه", "دروس", "ولنجک", "اقدسیه"];

const services = [
  "ارزیابی دقیق قیمت روز",
  "فیلتر حقوقی و سندی ملک",
  "بازدید خصوصی و زمان بندی شده",
  "مذاکره و تنظیم پیشنهاد خرید",
];

export default function Home() {
  return (
    <>
      <main className="site-plan min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative mx-auto grid w-full max-w-[1480px] gap-8 px-5 pb-16 pt-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-12 lg:pb-24">
        <SiteHeader current="home" />

        <div className="flex flex-col justify-center py-8 lg:py-16">
          <p className="mb-4 w-fit rounded-full border border-[var(--line)] bg-white/76 px-4 py-2 text-sm font-bold text-[var(--copper)]">
            املاک منتخب شمال تهران
          </p>
          <h1 className="max-w-[840px] text-4xl font-black leading-[1.35] tracking-normal text-[#18241f] sm:text-6xl lg:text-7xl">
            خرید خانه وقتی دقیق می شود که نقشه اش روشن باشد.
          </h1>
          <p className="mt-6 max-w-[740px] text-lg leading-9 text-stone-700">
            خانه نما برای خریداران، فروشندگان و سرمایه گذارانی ساخته شده که
            قبل از بازدید، تصویر کامل محله، قیمت، سند و کیفیت زندگی را می
            خواهند.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="focus-ring rounded-full bg-[var(--cypress)] px-7 py-4 text-center font-extrabold text-white transition hover:bg-[#0b584b]"
              href="/products"
            >
              مشاهده فایل های شاخص
            </Link>
            <a
              className="focus-ring rounded-full border border-[var(--cypress)] bg-white/70 px-7 py-4 text-center font-extrabold text-[var(--cypress)] transition hover:bg-white"
              href="#valuation"
            >
              قیمت گذاری ملک
            </a>
          </div>
        </div>

        <div className="plan-frame soft-shadow relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[var(--paper)] p-3 sm:min-h-[520px]">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=88"
            alt="ویلای روشن با پنجره های بزرگ و فضای سبز"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 z-10 rounded-3xl border border-white/50 bg-white/82 p-4 backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5">
            <p className="text-sm font-bold text-[var(--copper)]">
              پیشنهاد امروز
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-black sm:text-2xl">
                ویلای مدرن در لواسان
              </h2>
              <span className="text-base font-black text-[var(--cypress)] sm:text-lg">
                ۲۱۰ میلیارد تومان
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1480px] px-5 py-10 sm:px-8 lg:px-12">
        <HomeSearch />
      </section>

      <section
        id="properties"
        className="mx-auto w-full max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12"
      >
        <div className="mb-8 max-w-3xl">
          <p className="font-bold text-[var(--copper)]">فایل های منتخب</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            ملک هایی که قبل از انتشار عمومی بررسی شده اند
          </h2>
          <p className="mt-3 leading-8 text-stone-600">
            هر فایل با تصویر، قیمت منطقه، وضعیت سند و امکان مذاکره واقعی وارد
            لیست می شود.
          </p>
        </div>
        <FeaturedHomes />
      </section>

      <section id="valuation" className="bg-white/62 py-16">
        <div className="mx-auto grid w-full max-w-[1480px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div>
            <p className="font-bold text-[var(--copper)]">نبض بازار</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              قیمت گذاری بر اساس محله، سن بنا و کیفیت معامله
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["۴۸ ساعت", "میانگین زمان اعلام بازه قیمت"],
              ["۳۱ محله", "پایش هفتگی قیمت فایل های فعال"],
              ["۹۲٪", "فایل های دارای بررسی سندی"],
            ].map(([value, label]) => (
              <div
                className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6"
                key={value}
              >
                <strong className="text-3xl font-black text-[var(--cypress)]">
                  {value}
                </strong>
                <p className="mt-3 leading-7 text-stone-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="rounded-[2rem] bg-[#21372f] p-6 text-white sm:p-8 lg:p-10">
          <p className="font-bold text-[#e5bf7b]">محله شناسی</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
            هر محله را با مسیر، نور، آرامش و آینده ساخت و ساز می سنجیم.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {districts.map((district) => (
              <div
                className="rounded-2xl border border-white/14 bg-white/10 px-4 py-5 text-center font-extrabold backdrop-blur"
                key={district}
              >
                {district}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto grid w-full max-w-[1480px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12"
      >
        <div>
          <p className="font-bold text-[var(--copper)]">مسیر همکاری</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            از ارزش گذاری تا امضای قرارداد، مرحله ها شفاف می مانند.
          </h2>
        </div>
        <div className="grid gap-4">
          {services.map((service, index) => (
            <div
              className="flex items-center gap-4 rounded-3xl border border-[var(--line)] bg-white/78 p-5"
              key={service}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--mint)] text-lg font-black text-[var(--cypress)]">
                {index + 1}
              </span>
              <p className="text-lg font-extrabold">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--mist)] py-16">
        <div className="mx-auto grid w-full max-w-[1480px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1100&q=85"
              alt="مشاور املاک در حال بررسی قرارداد و پلان خانه"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-bold text-[var(--copper)]">تیم مشاوران</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              مشاورانی که فقط فایل معرفی نمی کنند؛ تصمیم را روشن می کنند.
            </h2>
            <p className="mt-5 leading-9 text-stone-700">
              هر مشتری یک مشاور ثابت دارد که گزارش محله، مقایسه قیمت و ریسک
              های حقوقی را پیش از بازدید آماده می کند.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [
              "خانواده میرزایی",
              "قبل از بازدید سوم، دقیقا می دانستیم کدام فایل ارزش مذاکره دارد.",
            ],
            [
              "سرمایه گذار خصوصی",
              "گزارش محله و قیمت، ریسک تصمیم را برای ما کم کرد.",
            ],
            [
              "فروشنده ملک",
              "قیمت گذاری واقع بینانه باعث شد ملک بدون فرسایش بازار فروخته شود.",
            ],
          ].map(([name, quote]) => (
            <blockquote
              className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6"
              key={name}
            >
              <p className="leading-9 text-stone-700">«{quote}»</p>
              <footer className="mt-5 font-black text-[var(--cypress)]">
                {name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-[1480px] px-5 pb-20 pt-10 sm:px-8 lg:px-12"
      >
        <div className="soft-shadow overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-[var(--paper)] p-6 sm:p-10 lg:p-12">
              <p className="font-bold text-[var(--copper)]">شروع گفتگو</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#18241f] sm:text-5xl">
                برای خرید یا فروش ملک، اول تصویر دقیق بازار را بگیرید.
              </h2>
              <p className="mt-5 max-w-2xl leading-9 text-stone-700">
                بودجه، محله و اولویت هایتان را بفرستید؛ مشاور خانه نما یک
                پیشنهاد کوتاه، قابل بازدید و قابل مذاکره آماده می کند.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["پاسخ در همان روز", "بررسی قیمت محله", "هماهنگی بازدید"].map(
                  (item) => (
                    <div
                      className="rounded-2xl border border-[var(--line)] bg-white px-4 py-4 text-sm font-extrabold text-[var(--cypress)]"
                      key={item}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="bg-[var(--cypress)] p-6 sm:p-10 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </>
  );
}
