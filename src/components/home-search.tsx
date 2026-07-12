"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("همه محله ها");
  const [type, setType] = useState("همه انواع");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    if (district !== "همه محله ها") params.set("district", district);
    if (type !== "همه انواع") params.set("type", type);
    router.push(`/products${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-[1.75rem] border border-[var(--line)] bg-white/84 p-4 backdrop-blur md:grid-cols-[1.3fr_0.85fr_0.85fr_auto] md:items-end"
    >
      <label className="grid gap-2">
        <span className="text-sm font-bold text-stone-500">دنبال چه ملکی هستید؟</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 font-bold text-stone-800"
          placeholder="نام ملک یا محله"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-bold text-stone-500">نوع ملک</span>
        <select value={type} onChange={(event) => setType(event.target.value)} className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 font-bold text-stone-800">
          <option>همه انواع</option>
          <option>آپارتمان</option>
          <option>آپارتمان لوکس</option>
          <option>آپارتمان باغی</option>
          <option>پنت هاوس</option>
          <option>ویلا</option>
        </select>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-bold text-stone-500">محله</span>
        <select value={district} onChange={(event) => setDistrict(event.target.value)} className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 font-bold text-stone-800">
          <option>همه محله ها</option>
          <option>نیاوران</option>
          <option>لواسان</option>
          <option>سعادت آباد</option>
          <option>زعفرانیه</option>
          <option>الهیه</option>
        </select>
      </label>
      <button type="submit" className="focus-ring rounded-2xl bg-[var(--cypress)] px-6 py-4 font-black text-white transition hover:bg-[#0b584b]">
        جست وجوی فایل
      </button>
    </form>
  );
}
