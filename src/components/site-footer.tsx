import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#21372f] text-white">
      <div className="mx-auto grid w-full max-w-[1480px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] lg:px-12">
        <div>
          <Link
            href="/"
            className="focus-ring rounded-full text-2xl font-black text-[#f5d7aa]"
          >
            خانه نما
          </Link>
          <p className="mt-4 max-w-md leading-8 text-white/72">
            همراه دقیق شما برای پیدا کردن، ارزیابی و معامله مطمئن ملک.
          </p>
        </div>
        <div>
          <p className="font-black text-[#f5d7aa]">دسترسی سریع</p>
          <nav className="mt-4 grid gap-3 text-sm text-white/78">
            <Link className="focus-ring flex min-h-11 w-fit items-center rounded-full" href="/">
              صفحه اصلی
            </Link>
            <Link className="focus-ring flex min-h-11 w-fit items-center rounded-full" href="/products">
              فایل های ملکی
            </Link>
            <Link className="focus-ring flex min-h-11 w-fit items-center rounded-full" href="/#services">
              خدمات
            </Link>
          </nav>
        </div>
        <div>
          <p className="font-black text-[#f5d7aa]">ارتباط با ما</p>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-white/78">
            <a className="focus-ring flex min-h-11 w-fit items-center rounded-full" href="tel:02122000000">
              ۰۲۱-۲۲۰۰-۰۰۰۰
            </a>
            <a
              className="focus-ring flex min-h-11 w-fit items-center rounded-full"
              href="mailto:hello@khanenama.ir"
            >
              hello@khanenama.ir
            </a>
            <span>تهران، نیاوران، خیابان کامرانیه</span>
          </div>
        </div>
        <div>
          <p className="font-black text-[#f5d7aa]">تلگرام ما</p>
          <a
            href="https://t.me/avalAmlakBot"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-4 inline-block rounded-2xl bg-white p-2"
            aria-label="گفتگو در تلگرام"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/telegram-qr.svg"
              alt="کد QR تلگرام خانه نما"
              width={112}
              height={112}
              className="h-28 w-28"
            />
          </a>
          <p className="mt-3 text-sm text-white/78">
            اسکن کنید و در تلگرام با ما گفتگو کنید
          </p>
        </div>
      </div>
      <div className="border-t border-white/12">
        <div className="mx-auto w-full max-w-[1480px] px-5 py-4 text-xs text-white/55 sm:px-8 lg:px-12">
          © ۱۴۰۵ خانه نما؛ اطلاعات فایل ها برای تصمیم اولیه است.
        </div>
      </div>
    </footer>
  );
}
