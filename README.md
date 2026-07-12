# خانه نما

لندینگ فارسی و راست چین برای کسب و کار املاک، ساخته شده با Next.js App Router و Tailwind CSS.

## اجرا

```bash
npm run dev
```

سپس آدرس زیر را باز کنید:

```text
http://localhost:3000
```

## فرمان های اصلی

```bash
npm run lint
npm run build
```

## ساختار

- `src/app/page.tsx`: لندینگ ۹ سکشن خانه نما
- `src/app/products/page.tsx`: صفحه محصولات/ملک ها با داده JSON
- `src/app/layout.tsx`: متادیتا، زبان فارسی، RTL و فونت Vazirmatn
- `src/app/globals.css`: تم لایت، توکن های رنگ و الگوی بصری پلان معماری
- `src/data/products.json`: دیتای محصولات/ملک های سایت
- `next.config.ts`: تنظیم root توربوپک و دامنه تصاویر
