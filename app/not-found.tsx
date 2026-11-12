"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t, lang } = useLang();

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cream px-5 py-24 text-center">
      <div>
        <p className="text-7xl font-extrabold tracking-tight text-lime">404</p>
        <h1 className="display mt-4 text-3xl sm:text-4xl">{t.common.notFoundTitle}</h1>
        <p className="mt-3 text-slate">{t.common.notFoundText}</p>
        <Link
          href="/"
          hrefLang={lang}
          className="mt-8 inline-flex rounded-full bg-blue px-8 py-3.5 text-sm font-bold text-white transition hover:bg-navy"
        >
          ← {t.common.backToHome}
        </Link>
      </div>
    </section>
  );
}
