"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form
      className="grid gap-4 rounded-[1.5rem] bg-white p-5 sm:p-6"
      onSubmit={handleSubmit}
    >
      <label className="grid gap-2">
        <span className="text-sm font-bold text-stone-600">نام و نام خانوادگی</span>
        <input
          required
          name="name"
          className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 text-stone-900"
          placeholder="مثلا سارا احمدی"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-bold text-stone-600">شماره تماس</span>
        <input
          required
          name="phone"
          type="tel"
          inputMode="tel"
          className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 text-stone-900"
          placeholder="۰۹۱۲۱۲۳۴۵۶۷"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-bold text-stone-600">محدوده مورد نظر</span>
        <input
          required
          name="district"
          className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 text-stone-900"
          placeholder="مثلا زعفرانیه یا لواسان"
        />
      </label>
      <button
        type="submit"
        className="focus-ring mt-2 rounded-2xl bg-[var(--cypress)] px-5 py-4 font-black text-white transition hover:bg-[#0b584b]"
      >
        ثبت درخواست مشاوره
      </button>
      <p aria-live="polite" className="min-h-6 text-center text-sm font-bold text-[var(--cypress)]">
        {submitted ? "درخواست شما آماده شد؛ تیم خانه نما با شما تماس می گیرد." : ""}
      </p>
    </form>
  );
}
