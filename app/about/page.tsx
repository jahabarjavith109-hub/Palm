"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import WhereNext from "@/components/WhereNext";
import Reveal from "@/components/Reveal";

export default function AboutPage() {
  const { t, lang } = useLang();
  const a = t.about;

  return (
    <>
      <PageHero
        kicker={a.kicker}
        title={a.title}
        lead={a.lead}
        breadcrumb={a.breadcrumb}
      />

      {/* intro + gallery */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="display text-3xl sm:text-4xl">{t.home.aboutTitle}</h2>
            </Reveal>
            {a.body.map((p, i) => (
              <Reveal key={i} delay={80 + i * 80}>
                <p className="mt-5 leading-relaxed text-slate">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={260}>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {a.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-cream p-4 text-center">
                    <span className="block text-2xl font-extrabold text-blue">{s.value}</span>
                    <span className="mt-1 block text-[11px] font-bold uppercase tracking-wide text-slate">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="grid grid-cols-2 gap-4">
              {["/assets/img/about-1.jpg", "/assets/img/about-3.jpg", "/assets/img/about-4.jpg", "/assets/img/about-2.jpg"].map(
                (src, i) => (
                  <div
                    key={src}
                    className={`overflow-hidden rounded-3xl ${i % 2 === 0 ? "mt-0" : "mt-8"}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={400}
                      height={300}
                      className="h-44 w-full object-cover transition hover:scale-105 sm:h-52"
                    />
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* chairman quote */}
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-lime">{a.chairmanLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
              {a.chairmanTitle}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <blockquote className="relative mt-10">
              <span
                aria-hidden
                className="absolute -left-2 -top-8 text-7xl text-lime/40 sm:-left-6 sm:text-8xl"
              >
                &ldquo;
              </span>
              <p className="relative text-xl leading-relaxed text-white/85 sm:text-2xl">
                {a.chairmanQuote}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-lg font-extrabold text-navy">
                  {a.chairmanName.split(" ").map((w) => w[0]).join("")}
                </span>
                <span>
                  <span className="block font-semibold">{a.chairmanName}</span>
                  <span className="text-sm text-white/60">{a.chairmanRole}</span>
                </span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-blue">{a.valuesLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
              {a.valuesTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {a.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <article className="h-full rounded-3xl border border-line p-7 transition hover:border-blue hover:shadow-[0_24px_50px_-34px_rgba(21,101,192,0.7)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-lg font-extrabold text-navy">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how we learn */}
      <section className="bg-cream">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-blue">{a.approachLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
              {a.approachTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {a.approach.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="h-full bg-white p-7">
                  <span className="text-sm font-extrabold text-lime-dark">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={a.ctaTitle}
        text={a.ctaText}
        primary={a.ctaPrimary}
        primaryHref="/contact"
        secondary={a.ctaSecondary}
        secondaryHref="/admissions"
      />

      <WhereNext
        title={lang === "ta" ? "அடுத்து எங்கே?" : "Where next?"}
        links={[
          { label: t.nav.academics, href: "/academics", note: t.academics.lead.slice(0, 60) + "…" },
          { label: t.nav.teachers, href: "/teachers", note: t.teachers.lead.slice(0, 60) + "…" },
          { label: t.nav.admissions, href: "/admissions", note: t.admissions.lead.slice(0, 60) + "…" },
        ]}
      />
    </>
  );
}
