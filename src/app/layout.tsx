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
        <script
          src="https://staging.avalagent.com/widget.js"
          data-business-id="5fd2b57c-4d37-44f9-b307-8677a3646439"
          defer
        ></script>
      </body>
    </html>
  );
}
