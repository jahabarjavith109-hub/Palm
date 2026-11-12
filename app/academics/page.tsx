"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import WhereNext from "@/components/WhereNext";
import Reveal from "@/components/Reveal";

const ICONS = [
  "/assets/img/icon-ai.png",
  "/assets/img/icon-atom.png",
  "/assets/img/icon-chemistry.png",
  "/assets/img/icon-exchange.png",
];

export default function AcademicsPage() {
  const { t, lang } = useLang();
  const a = t.academics;

  return (
    <>
      <PageHero kicker={a.kicker} title={a.title} lead={a.lead} breadcrumb={a.breadcrumb} />

      {/* academic groups */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            {a.groups.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <article className="group flex h-full flex-col rounded-3xl border border-line bg-cream p-8 transition hover:-translate-y-1 hover:border-blue hover:bg-white hover:shadow-[0_30px_60px_-38px_rgba(21,101,192,0.75)]">
                  <div className="flex items-start gap-5">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm transition group-hover:bg-lime/30">
                      <Image src={ICONS[i]} alt="" width={36} height={36} className="h-9 w-9" />
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-blue">
                        0{i + 1}
                      </span>
                      <h2 className="mt-1 text-2xl font-semibold text-ink">{g.title}</h2>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-slate">{g.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.subjects.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue ring-1 ring-line"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* journey */}
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-lime">{a.journeyLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">{a.journeyTitle}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.journey.map((j, i) => (
              <Reveal key={j.stage} delay={i * 80}>
                <li className="relative h-full rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-navy">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{j.stage}</h3>
                  <p className="mt-1 text-sm font-bold text-lime">{j.grades}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{j.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* facilities */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-blue">{a.facilitiesLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">{a.facilitiesTitle}</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {a.facilities.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <article className="h-full rounded-3xl border border-line p-7 transition hover:border-blue">
                  <span className="text-3xl" aria-hidden>
                    {["🏫", "🔬", "📚", "💻", "⚽", "🛡️"][i]}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{f.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-14 overflow-hidden rounded-3xl">
              <Image
                src="/assets/img/about-3.jpg"
                alt="Palm Matric campus"
                width={1400}
                height={560}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title={a.ctaTitle}
        text={a.ctaText}
        primary={a.ctaPrimary}
        primaryHref="/teachers"
        secondary={a.ctaSecondary}
        secondaryHref="/faqs"
      />

      <WhereNext
        title={lang === "ta" ? "அடுத்து எங்கே?" : "Where next?"}
        links={[
          { label: t.nav.teachers, href: "/teachers", note: t.teachers.title },
          { label: t.nav.events, href: "/events", note: t.events.title },
          { label: t.nav.admissions, href: "/admissions", note: t.admissions.title },
        ]}
      />
    </>
  );
}
