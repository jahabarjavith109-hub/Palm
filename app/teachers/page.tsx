"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import WhereNext from "@/components/WhereNext";
import Reveal from "@/components/Reveal";

export default function TeachersPage() {
  const { t, lang } = useLang();
  const p = t.teachers;

  return (
    <>
      <PageHero kicker={p.kicker} title={p.title} lead={p.lead} breadcrumb={p.breadcrumb} />

      {/* faculty grid */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.items.map((teacher, i) => (
              <Reveal key={teacher.name} delay={i * 80}>
                <article className="group h-full overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1.5 hover:border-blue hover:shadow-[0_30px_60px_-38px_rgba(21,101,192,0.75)]">
                  <div className="relative flex h-44 items-end bg-gradient-to-br from-blue to-navy p-6">
                    <span
                      aria-hidden
                      className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-lime/30 blur-2xl"
                    />
                    <Image
                      src={i % 2 === 0 ? "/assets/img/avatar-man.avif" : "/assets/img/avatar-woman.avif"}
                      alt=""
                      width={96}
                      height={96}
                      className="relative h-24 w-24 rounded-full bg-white object-cover ring-4 ring-white/80"
                    />
                    <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white ring-1 ring-white/30">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-ink">{teacher.name}</h2>
                    <p className="mt-1 text-sm font-bold text-lime-dark">{teacher.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate">{teacher.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* promise band */}
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/assets/img/about-4.jpg"
                alt="Teacher with students"
                width={640}
                height={480}
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow text-blue">{p.promiseLabel}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">{p.promiseTitle}</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 leading-relaxed text-slate">{p.promiseText}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:palmmatric@gmail.com?subject=Career%20enquiry%20-%20Palm%20Matric"
                  className="rounded-full bg-blue px-8 py-3.5 text-sm font-bold text-white transition hover:bg-navy"
                >
                  {p.ctaPrimary} →
                </a>
                <a
                  href="tel:+919940485774"
                  className="rounded-full border border-line px-8 py-3.5 text-sm font-bold text-ink transition hover:border-blue hover:text-blue"
                  dir="ltr"
                >
                  {t.contact.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title={p.ctaTitle}
        text={p.ctaText}
        primary={p.ctaPrimary}
        primaryHref="/contact"
        secondary={p.ctaSecondary}
        secondaryHref="/admissions"
      />

      <WhereNext
        title={lang === "ta" ? "அடுத்து எங்கே?" : "Where next?"}
        links={[
          { label: t.nav.academics, href: "/academics", note: t.academics.title },
          { label: t.nav.events, href: "/events", note: t.events.title },
          { label: t.nav.contact, href: "/contact", note: t.contact.title },
        ]}
      />
    </>
  );
}
