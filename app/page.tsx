"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

const COURSE_CARDS = [
  { icon: "/assets/img/icon-ai.png", key: 0 },
  { icon: "/assets/img/icon-atom.png", key: 1 },
  { icon: "/assets/img/icon-chemistry.png", key: 2 },
  { icon: "/assets/img/icon-exchange.png", key: 3 },
];

export default function Home() {
  const { t, lang } = useLang();
  const h = t.home;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/assets/img/hero-gate.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy" />
        </div>

        {/* decorative glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-blue/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-lime/20 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 pt-16 pb-20 sm:px-8 md:pt-24 md:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-lime">{h.heroKicker}</p>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="display mt-5 text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.2rem]">
                  {h.heroLine1}
                  <br />
                  <span className="text-lime">{h.heroLine2}</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {h.heroLead}
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/about"
                    hrefLang={lang}
                    className="rounded-full bg-lime px-8 py-4 text-sm font-bold text-navy transition hover:bg-white"
                  >
                    {h.heroCta} →
                  </Link>
                  <Link
                    href="/admissions"
                    hrefLang={lang}
                    className="rounded-full border border-white/50 px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-navy"
                  >
                    {h.heroAdmission}
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={360}>
                <a
                  href="https://www.youtube.com/watch?v=8ArYu1uHrkM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 flex w-fit items-center gap-4 text-sm text-white/75 transition hover:text-lime"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 transition group-hover:border-lime">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
                      <path d="M0 0l14 8-14 8V0z" />
                    </svg>
                  </span>
                  <span className="font-semibold">{h.watchVideo}</span>
                </a>
              </Reveal>
            </div>

            {/* photo collage */}
            <div className="relative lg:col-span-5">
              <Reveal delay={200}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="float-slow overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
                    <Image
                      src="/assets/img/hero-campus.jpg"
                      alt="Palm Matric school campus"
                      width={640}
                      height={427}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="float-slower absolute -bottom-10 -left-6 w-40 overflow-hidden rounded-2xl border-4 border-navy shadow-2xl sm:w-48">
                    <Image
                      src="/assets/img/about-2.jpg"
                      alt="Students at Palm Matric"
                      width={320}
                      height={240}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  {/* est. badge */}
                  <div className="absolute -right-3 -top-5 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-lime text-navy shadow-xl sm:h-28 sm:w-28">
                    <span className="text-2xl font-extrabold leading-none sm:text-3xl">2012</span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-widest">
                      Est.
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {h.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <article className="h-full rounded-3xl border border-line bg-cream p-7 transition hover:border-blue hover:shadow-[0_24px_50px_-32px_rgba(21,101,192,0.6)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue text-lg font-extrabold text-white">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{f.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT BAND ================= */}
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/assets/img/about-1.jpg"
                  alt="Learning at Palm Matric"
                  width={640}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden w-44 overflow-hidden rounded-2xl border-[6px] border-cream shadow-xl sm:block lg:-right-10">
                <Image
                  src="/assets/img/about-5.jpg"
                  alt="School activity"
                  width={320}
                  height={240}
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* FAQ badge */}
              <Link
                href="/faqs"
                hrefLang={lang}
                className="absolute -left-3 top-6 hidden rotate-[-4deg] items-center gap-3 rounded-2xl bg-blue px-5 py-4 text-white shadow-xl transition hover:bg-navy sm:flex"
              >
                <span className="text-2xl" aria-hidden>🙋</span>
                <span>
                  <span className="block text-[11px] uppercase tracking-widest text-lime">
                    {h.faqBadge}
                  </span>
                  <span className="font-bold">{h.faqLink} →</span>
                </span>
              </Link>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-blue">{h.aboutLabel}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
                {h.aboutTitle}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 leading-relaxed text-slate">{h.aboutText}</p>
            </Reveal>
            <Reveal delay={220}>
              <Link
                href="/about"
                hrefLang={lang}
                className="mt-8 inline-flex rounded-full bg-blue px-8 py-3.5 text-sm font-bold text-white transition hover:bg-navy"
              >
                {h.aboutCta} →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= STATS (ISZL "at a glance") ================= */}
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-lime">{h.statsLabel}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
                  {h.statsTitle}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-white/70 leading-relaxed">{h.statsText}</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:col-span-7 lg:grid-cols-4">
              {h.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 90}>
                  <div
                    className={`flex h-40 flex-col items-center justify-center rounded-full px-4 text-center transition hover:-translate-y-1 sm:h-44 ${
                      i % 2 === 0 ? "bg-lime text-navy" : "bg-blue text-white"
                    }`}
                  >
                    <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {s.value}
                    </span>
                    <span className="mt-2 px-4 text-[11px] font-bold uppercase leading-tight tracking-wide opacity-90">
                      {s.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-blue">{h.coursesLabel}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
                  {h.coursesTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <Link
                href="/academics"
                hrefLang={lang}
                className="rounded-full border border-line px-7 py-3 text-sm font-bold text-ink transition hover:border-blue hover:text-blue"
              >
                {h.coursesCta} →
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COURSE_CARDS.map(({ icon, key }, i) => {
              const g = t.academics.groups[key];
              return (
                <Reveal key={g.title} delay={i * 80}>
                  <Link
                    href="/academics"
                    hrefLang={lang}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition hover:-translate-y-1.5 hover:border-blue hover:shadow-[0_28px_60px_-34px_rgba(21,101,192,0.7)]"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream transition group-hover:bg-lime/30">
                      <Image src={icon} alt="" width={30} height={30} className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-ink group-hover:text-blue">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-lime-dark">
                      {g.subjects.join(" · ")}
                    </p>
                    <span className="mt-auto pt-5 text-sm font-bold text-blue">
                      {t.common.readMore} →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-blue">{h.whyLabel}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
                {h.whyTitle}
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {h.why.map((w, i) => (
                <Reveal key={w.title} delay={i * 90}>
                  <article className="h-full rounded-3xl bg-white p-7 shadow-[0_20px_50px_-40px_rgba(16,28,43,0.7)]">
                    <Image src={w.icon} alt="" width={44} height={44} className="h-11 w-11" />
                    <h3 className="mt-4 text-lg font-semibold text-ink">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{w.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex items-center lg:col-span-5">
            <Reveal delay={160}>
              <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-blue text-center text-white shadow-[0_40px_80px_-40px_rgba(21,101,192,0.9)] sm:h-80 sm:w-80">
                <div>
                  <span className="block text-5xl font-extrabold tracking-tight sm:text-6xl">
                    {h.whyStat}
                  </span>
                  <span className="mx-auto mt-3 block max-w-[16rem] text-xs font-bold uppercase leading-snug tracking-wide text-lime">
                    {h.whyStatLabel}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-blue">{h.testimonialLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
              {h.testimonialTitle}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Mrs. Meenakshi R",
                role: "Parent of a Grade 10 Student",
                avatar: "/assets/img/avatar-woman.avif",
                en: "We were worried about our child's education and growth, but the curriculum and teachers at Palm Matric Hr. Sec. School are excellent. Great school, modern facilities, and personal attention — this has made us very happy!",
                ta: "எங்கள் குழந்தையின் கல்வி மற்றும் வளர்ச்சி குறித்து எங்களுக்கு கவலை இருந்தது, ஆனால் Palm Matric Hr. Sec. School வழங்கும் பாடத்திட்டம் மற்றும் ஆசிரியர்கள் மிகவும் சிறந்தவர்கள். சிறப்பான கல்விக்கூடம், நவீன வசதிகள், மற்றும் தனிப்பட்ட கவனம் – இது எங்களை மிகவும் மகிழ்ச்சியாக வைத்திருக்கிறது!",
              },
              {
                name: "Mr. Kumaravel S",
                role: "Parent of a Grade 8 Student",
                avatar: "/assets/img/avatar-man.avif",
                en: "At Palm Matric Hr. Sec. School, not only my child's education but also his virtues, self-confidence and talents have grown. There is no doubt that this is one of the best schools in the Thiruthuraipoondi area!",
                ta: "Palm Matric Hr. Sec. School-ல் சேர்த்து குழந்தையின் கல்வி மட்டுமல்ல, அவரது நற்குணங்கள், சுயநம்பிக்கை, மற்றும் திறமைகளும் வளர்ந்திருக்கின்றன. திருத்துறைப்பூண்டி பகுதியில் உள்ள மிகச்சிறந்த பள்ளிகளில் இதுவும் ஒன்று என்பதில் சந்தேகமில்லை!",
              },
              {
                name: "Mrs. Rajeshwari V",
                role: "Parent of a Grade 12 Student",
                avatar: "/assets/img/avatar-woman.avif",
                en: "My daughter received the training to perform well in her exams. The teachers are very caring and encourage the students. Palm Matric Hr. Sec. School has given our family and my daughter peace of mind about the future!",
                ta: "எங்கள் மகள் தேர்வுகளில் சிறப்பாக செயல்படுவதற்கான பயிற்சியை பெற்றார். ஆசிரியர்கள் மிகுந்த அக்கறை கொண்டவர்கள், மாணவர்களை ஊக்குவிக்கிறார்கள். எங்கள் குடும்பத்திற்கும், மகளுக்கும் எதிர்காலம் எப்படி இருக்கும் என்பது பற்றிய நிம்மதியை Palm Matric Hr. Sec. School தந்துள்ளது!",
              },
            ].map((q, i) => (
              <Reveal key={q.name} delay={i * 90}>
                <figure className="flex h-full flex-col rounded-3xl border border-line bg-cream p-7">
                  <span aria-hidden className="text-5xl leading-none text-lime">
                    &ldquo;
                  </span>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                    {lang === "ta" ? q.ta : q.en}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <Image
                      src={q.avatar}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full bg-white object-cover"
                    />
                    <span>
                      <span className="block font-semibold text-ink">{q.name}</span>
                      <span className="text-xs text-slate">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWS PREVIEW ================= */}
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-lime">{h.newsLabel}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
                  {h.newsTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <Link
                href="/events"
                hrefLang={lang}
                className="rounded-full border border-white/40 px-7 py-3 text-sm font-bold transition hover:bg-white hover:text-navy"
              >
                {h.newsCta} →
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.events.items.slice(0, 3).map((e, i) => (
              <Reveal key={e.title} delay={i * 90}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10">
                  <div className="flex items-center justify-between px-6 pt-6">
                    <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                      {e.tag}
                    </span>
                    <span className="text-xs text-white/60">{e.date}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold leading-snug">{e.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
                      {e.text.length > 130 ? `${e.text.slice(0, 130)}…` : e.text}
                    </p>
                    <Link
                      href="/events"
                      hrefLang={lang}
                      className="mt-5 text-sm font-bold text-lime"
                    >
                      {t.common.readMore} →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <CTASection
        title={h.ctaTitle}
        text={h.ctaText}
        primary={h.ctaPrimary}
        primaryHref="/admissions"
        secondary={h.ctaSecondary}
        secondaryHref="/contact"
      />
    </>
  );
}
