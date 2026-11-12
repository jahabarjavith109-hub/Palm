"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import WhereNext from "@/components/WhereNext";
import Reveal from "@/components/Reveal";

export default function FAQsPage() {
  const { t, lang } = useLang();
  const q = t.faqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero kicker={q.kicker} title={q.title} lead={q.lead} breadcrumb={q.breadcrumb} />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
              {q.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={item.q} delay={i * 50}>
                    <li className="bg-white">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition hover:bg-cream sm:px-7"
                      >
                        <span className="flex items-start gap-4">
                          <span className="mt-0.5 text-sm font-extrabold text-lime-dark">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-semibold text-ink">{item.q}</span>
                        </span>
                        <span
                          aria-hidden
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                            isOpen ? "bg-blue text-white" : "bg-cream text-ink"
                          }`}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className={`transition-transform ${isOpen ? "rotate-45" : ""}`}
                          >
                            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 pl-[3.75rem] text-sm leading-relaxed text-slate sm:px-7 sm:pl-[4.25rem]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* sticky help rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={120}>
                <div className="rounded-3xl bg-navy p-7 text-white">
                  <span className="text-3xl" aria-hidden>🙋</span>
                  <p className="eyebrow mt-4 text-lime">{q.stillLabel}</p>
                  <h2 className="display mt-2 text-2xl">{q.stillTitle}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{q.stillText}</p>
                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href="tel:+919940485774"
                      className="rounded-full bg-lime px-6 py-3.5 text-center text-sm font-bold text-navy transition hover:bg-white"
                      dir="ltr"
                    >
                      📞 {q.stillCall}
                    </a>
                    <a
                      href="mailto:palmmatric@gmail.com"
                      className="rounded-full border border-white/40 px-6 py-3.5 text-center text-sm font-bold transition hover:bg-white hover:text-navy"
                    >
                      ✉️ {q.stillEmail}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-6 rounded-3xl bg-cream p-7 ring-1 ring-line">
                  <p className="eyebrow text-blue">{t.nav.admissions}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {t.admissions.formText}
                  </p>
                  <a
                    href="/admissions"
                    className="mt-4 inline-flex rounded-full bg-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-navy"
                  >
                    {t.home.ctaPrimary} →
                  </a>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        title={q.stillTitle}
        text={q.stillText}
        primary={q.stillCall}
        primaryHref="tel:+919940485774"
        secondary={q.stillEmail}
        secondaryHref="mailto:palmmatric@gmail.com"
      />

      <WhereNext
        title={lang === "ta" ? "அடுத்து எங்கே?" : "Where next?"}
        links={[
          { label: t.nav.admissions, href: "/admissions", note: t.admissions.title },
          { label: t.nav.contact, href: "/contact", note: t.contact.title },
          { label: t.nav.academics, href: "/academics", note: t.academics.title },
        ]}
      />
    </>
  );
}
