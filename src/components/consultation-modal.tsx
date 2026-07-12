"use client";

import { FormEvent, useEffect, useState } from "react";

type ConsultationModalProps = {
  propertyTitle: string;
};

export function ConsultationModal({ propertyTitle }: ConsultationModalProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  function closeModal() {
    setOpen(false);
    setSubmitted(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring mt-7 inline-flex rounded-full bg-[var(--cypress)] px-6 py-4 font-black text-white transition hover:bg-[#0b584b]"
      >
        درخواست بازدید و مشاوره
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#13251f]/60 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            aria-labelledby="consultation-title"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-[var(--paper)] p-6 shadow-2xl sm:p-8"
            role="dialog"
          >
            <button
              type="button"
              aria-label="بستن پنجره"
              onClick={closeModal}
              className="focus-ring absolute left-5 top-5 grid size-10 place-items-center rounded-full border border-[var(--line)] text-2xl leading-none text-stone-600 transition hover:bg-[var(--mint)]"
            >
              ×
            </button>
            <p className="text-sm font-bold text-[var(--copper)]">درخواست مشاوره</p>
            <h2 id="consultation-title" className="mt-3 max-w-sm text-3xl font-black leading-tight text-[#18241f]">
              برای بازدید از {propertyTitle} آماده‌اید؟
            </h2>
            <p className="mt-4 leading-8 text-stone-600">
              مشخصاتتان را وارد کنید تا زمان مناسب بازدید را با شما هماهنگ کنیم.
            </p>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-stone-600">نام و نام خانوادگی</span>
                <input required name="name" autoFocus className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 text-stone-900" placeholder="مثلا سارا احمدی" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-stone-600">شماره تماس</span>
                <input required name="phone" type="tel" inputMode="tel" className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-4 text-stone-900" placeholder="۰۹۱۲۱۲۳۴۵۶۷" />
              </label>
              <button type="submit" className="focus-ring rounded-2xl bg-[var(--cypress)] px-5 py-4 font-black text-white transition hover:bg-[#0b584b]">
                ثبت درخواست
              </button>
              <p aria-live="polite" className="min-h-6 text-center text-sm font-bold text-[var(--cypress)]">
                {submitted ? "درخواست شما آماده شد؛ با شما تماس می گیریم." : ""}
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
