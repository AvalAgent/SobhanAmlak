import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "خانه نما | مشاور هوشمند املاک",
  description:
    "لندینگ فارسی و راست چین برای برند خانه نما؛ تجربه ای روشن، دقیق و قابل اعتماد برای خرید، فروش و سرمایه گذاری ملک.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/*
          Was pointed at staging.avalagent.com, which has been paused since
          2026-08-15 (see avalagent/docs/CONTEXT.md) — the script 502'd and the
          widget silently never rendered. Points at prod now, with a fresh
          demo business (`iHome (دمو)`) created for this site specifically.
        */}
        <script
          src="https://avalagent.com/widget.js"
          data-business-id="01789320-149f-4428-bbd2-ef8525e71fe6"
          defer
        ></script>
      </body>
    </html>
  );
}
