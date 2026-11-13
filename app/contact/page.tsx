"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { SCHOOL_DIRECTIONS_URL, SCHOOL_MAP_EMBED_URL, SCHOOL_MAP_URL } from "@/lib/map";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import WhereNext from "@/components/WhereNext";
import Reveal from "@/components/Reveal";

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

export default function ContactPage() {
  const { t, lang } = useLang();
  const c = t.contact;
  const f = c.fields;

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const str = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};

    if (!str("name")) next.name = f.required;
    const phone = str("phone").replace(/\s|-/g, "");
    if (!phone) next.phone = f.required;
    else if (!/^\+?\d{10,13}$/.test(phone)) next.phone = f.invalidPhone;
    const email = str("email");
    if (!email) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = f.invalidEmail;
    if (!str("message")) next.message = f.required;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // Capture the form now: React nulls ev.currentTarget after the handler returns.
    const form = ev.currentTarget;
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      form.reset();
    }, 700);
  }

  const fieldBase =
    "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-slate/60 focus:ring-2 focus:ring-blue/30";
  const okBorder = "border-line focus:border-blue";
  const badBorder = "border-red-400 focus:border-red-400 focus:ring-red-200";

  const cards = [
    { icon: "📍", label: c.addressLabel, value: c.address, href: SCHOOL_MAP_URL },
    { icon: "📞", label: c.phoneLabel, value: c.phone, href: "tel:+919940485774", ltr: true },
    { icon: "✉️", label: c.emailLabel, value: c.email, href: "mailto:palmmatric@gmail.com" },
    { icon: "🕘", label: c.hoursLabel, value: c.hours },
  ];

  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} lead={c.lead} breadcrumb={c.breadcrumb} />

      {/* contact cards */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 70}>
                <div className="h-full rounded-3xl border border-line bg-cream p-6 transition hover:border-blue hover:bg-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl ring-1 ring-line">
                    <span aria-hidden>{card.icon}</span>
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1.5 block text-sm font-medium leading-relaxed text-ink hover:text-blue"
                      dir={card.ltr ? "ltr" : undefined}
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink">
                      {card.value}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* form + map */}
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-3xl bg-white p-7 shadow-[0_30px_70px_-50px_rgba(16,28,43,0.9)] sm:p-9">
                <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{c.formTitle}</h2>
                <p className="mt-2 text-sm text-slate">{c.formText}</p>

                {sent ? (
                  <div className="mt-8 rounded-2xl border border-lime bg-lime/10 p-6 text-center">
                    <span className="text-3xl" aria-hidden>✅</span>
                    <p className="mt-3 font-semibold text-ink">{f.success}</p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-5 rounded-full border border-line px-6 py-3 text-sm font-bold text-ink transition hover:border-blue hover:text-blue"
                    >
                      {f.successAgain}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.name} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                        className={`${fieldBase} ${errors.name ? badBorder : okBorder}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.phone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        dir="ltr"
                        placeholder="+91 99404 85774"
                        maxLength={15}
                        className={`${fieldBase} ${errors.phone ? badBorder : okBorder}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.email} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        className={`${fieldBase} ${errors.email ? badBorder : okBorder}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.subject}
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        maxLength={150}
                        className={`${fieldBase} ${okBorder}`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.message} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        maxLength={2000}
                        className={`${fieldBase} ${errors.message ? badBorder : okBorder} resize-y`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-blue px-8 py-4 text-sm font-bold text-white transition hover:bg-navy disabled:opacity-60 sm:w-auto"
                      >
                        {submitting ? f.submitting : `${f.submit} →`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* map + faq nudge */}
          <aside className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
                <div className="flex items-center justify-between px-6 py-4">
                  <p className="eyebrow text-blue">{c.mapLabel}</p>
                  <a
                    href={SCHOOL_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-blue hover:underline"
                  >
                    {c.getDirections} →
                  </a>
                </div>
                <iframe
                  title="Palm Matric Hr. Sec. School location"
                  src={SCHOOL_MAP_EMBED_URL}
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 rounded-3xl bg-navy p-7 text-white">
                <span className="text-3xl" aria-hidden>🙋</span>
                <h3 className="mt-3 text-xl font-semibold">{c.faqTitle}</h3>
                <p className="mt-2 text-sm text-white/70">{c.faqText}</p>
                <a
                  href="/faqs"
                  className="mt-5 inline-flex rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition hover:bg-white"
                >
                  {c.faqCta} →
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CTASection
        title={t.admissions.ctaTitle}
        text={t.admissions.ctaText}
        primary={t.home.ctaPrimary}
        primaryHref="/admissions"
        secondary={t.nav.callUs}
        secondaryHref="tel:+919940485774"
      />

      <WhereNext
        title={lang === "ta" ? "அடுத்து எங்கே?" : "Where next?"}
        links={[
          { label: t.nav.faqs, href: "/faqs", note: t.faqs.title },
          { label: t.nav.admissions, href: "/admissions", note: t.admissions.title },
          { label: t.nav.about, href: "/about", note: t.about.title },
        ]}
      />
    </>
  );
}
