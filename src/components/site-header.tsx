import Link from "next/link";

type SiteHeaderProps = {
  current?: "home" | "products";
};

const navItems = [
  ["خانه", "/"],
  ["ملک ها", "/products"],
  ["خدمات", "/#services"],
  ["تماس", "/#contact"],
] as const;

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <>
      <header className="col-span-full flex min-w-0 items-center justify-between gap-3 rounded-full border border-[var(--line)] bg-white/80 px-4 py-3 backdrop-blur">
        <Link
          href="/"
          className="focus-ring shrink-0 rounded-full text-xl font-black text-[var(--cypress)] sm:text-2xl"
        >
          خانه نما
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-700 md:flex">
          {navItems.map(([label, href]) => (
            <Link
              className={`focus-ring inline-flex min-h-11 items-center rounded-full px-2 ${
                (current === "home" && href === "/") ||
                (current === "products" && href === "/products")
                  ? "font-black text-[var(--cypress)]"
                  : ""
              }`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className="focus-ring shrink-0 rounded-full bg-[var(--cypress)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0b584b] sm:px-5"
          href="/#contact"
        >
          مشاوره سریع
        </Link>
      </header>
      <nav className="col-span-full grid grid-cols-4 gap-2 rounded-2xl border border-[var(--line)] bg-white/70 p-2 text-center text-xs font-bold text-stone-600 md:hidden">
        {navItems.map(([label, href]) => (
          <Link
            className={`focus-ring rounded-xl px-2 py-3 ${
              (current === "home" && href === "/") ||
              (current === "products" && href === "/products")
                ? "bg-[var(--mint)] text-[var(--cypress)]"
                : ""
            }`}
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
