"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { SCHOOL_MAP_URL } from "@/lib/map";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import WhereNext from "@/components/WhereNext";
import Reveal from "@/components/Reveal";

type Errors = Partial<Record<"studentName" | "parentName" | "phone" | "email" | "grade", string>>;

export default function AdmissionsPage() {
  const { t, lang } = useLang();
  const a = t.admissions;
  const f = a.fields;

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const str = (k: string) => String(data.get(k) ?? "").trim();

    if (!str("studentName")) next.studentName = f.required;
    if (!str("parentName")) next.parentName = f.required;
    const phone = str("phone").replace(/\s|-/g, "");
    if (!phone) next.phone = f.required;
    else if (!/^\+?\d{10,13}$/.test(phone)) next.phone = f.invalidPhone;
    const email = str("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = f.invalidEmail;
    if (!str("grade")) next.grade = f.required;
    return next;
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const next = validate(ev.currentTarget);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // no backend: simulate a short submit, then confirm (hook up your API/CRM here)
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      ev.currentTarget.reset();
    }, 700);
  }

  const fieldBase =
    "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-slate/60 focus:ring-2 focus:ring-blue/30";
  const okBorder = "border-line focus:border-blue";
  const badBorder = "border-red-400 focus:border-red-400 focus:ring-red-200";

  return (
    <>
      <PageHero kicker={a.kicker} title={a.title} lead={a.lead} breadcrumb={a.breadcrumb} />

      {/* process steps */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-blue">{a.stepsLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">{a.stepsTitle}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <li className="relative h-full rounded-3xl border border-line bg-cream p-7">
                  <span className="text-4xl font-extrabold tracking-tight text-lime">{s.n}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* form + why */}
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-3xl bg-white p-7 shadow-[0_30px_70px_-50px_rgba(16,28,43,0.9)] sm:p-9">
                <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{a.formTitle}</h2>
                <p className="mt-2 text-sm text-slate">{a.formText}</p>

                {sent ? (
                  <div className="mt-8 rounded-2xl border border-lime bg-lime/10 p-6 text-center">
                    <span className="text-3xl" aria-hidden>✅</span>
                    <p className="mt-3 font-semibold text-ink">{f.success}</p>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <a
                        href="tel:+919940485774"
                        className="rounded-full bg-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-navy"
                        dir="ltr"
                      >
                        📞 {t.contact.phone}
                      </a>
                      <button
                        type="button"
                        onClick={() => setSent(false)}
                        className="rounded-full border border-line px-6 py-3 text-sm font-bold text-ink transition hover:border-blue hover:text-blue"
                      >
                        {f.successAgain}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="studentName" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.studentName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="studentName"
                        name="studentName"
                        type="text"
                        autoComplete="name"
                        className={`${fieldBase} ${errors.studentName ? badBorder : okBorder}`}
                      />
                      {errors.studentName && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.studentName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="parentName" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.parentName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="parentName"
                        name="parentName"
                        type="text"
                        autoComplete="name"
                        className={`${fieldBase} ${errors.parentName ? badBorder : okBorder}`}
                      />
                      {errors.parentName && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.parentName}</p>
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
                        className={`${fieldBase} ${errors.phone ? badBorder : okBorder}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.email}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={`${fieldBase} ${errors.email ? badBorder : okBorder}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="grade" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.grade} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        defaultValue=""
                        className={`${fieldBase} ${errors.grade ? badBorder : okBorder}`}
                      >
                        <option value="" disabled>
                          {f.selectGrade}
                        </option>
                        {f.grades.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      {errors.grade && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.grade}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="group" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.group}
                      </label>
                      <select id="group" name="group" defaultValue="" className={`${fieldBase} ${okBorder}`}>
                        <option value="" disabled>
                          {f.selectGroup}
                        </option>
                        {t.academics.groups.map((g) => (
                          <option key={g.title} value={g.title}>
                            {g.title}
                          </option>
                        ))}
                        <option value="not-sure">—</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
                        {f.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className={`${fieldBase} ${okBorder} resize-y`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-lime px-8 py-4 text-sm font-bold text-navy transition hover:bg-blue hover:text-white disabled:opacity-60 sm:w-auto"
                      >
                        {submitting ? f.submitting : `${f.submit} →`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* why palm + contact rail */}
          <aside className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="rounded-3xl bg-navy p-7 text-white sm:p-8">
                <p className="eyebrow text-lime">{a.whyLabel}</p>
                <h2 className="display mt-3 text-2xl sm:text-3xl">{t.home.whyTitle}</h2>
                <ul className="mt-6 space-y-3">
                  {a.whyPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-white/80">
                      <span aria-hidden className="mt-0.5 text-lime">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 rounded-3xl bg-white p-7 ring-1 ring-line sm:p-8">
                <p className="eyebrow text-blue">{a.contactLabel}</p>
                <ul className="mt-5 space-y-4 text-sm">
                  <li>
                    <p className="font-semibold text-ink">{a.helpline}</p>
                    <a href="tel:+919940485774" className="text-blue hover:underline" dir="ltr">
                      {t.contact.phone}
                    </a>
                  </li>
                  <li>
                    <p className="font-semibold text-ink">{a.emailLabel}</p>
                    <a href="mailto:palmmatric@gmail.com" className="text-blue hover:underline">
                      {t.contact.email}
                    </a>
                  </li>
                  <li>
                    <p className="font-semibold text-ink">{a.addressLabel}</p>
                    <a
                      href={SCHOOL_MAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-blue"
                    >
                      {t.contact.address}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CTASection
        title={a.ctaTitle}
        text={a.ctaText}
        primary={t.nav.callUs}
        primaryHref="tel:+919940485774"
        secondary={t.nav.email}
        secondaryHref="mailto:palmmatric@gmail.com"
      />

      <WhereNext
        title={lang === "ta" ? "அடுத்து எங்கே?" : "Where next?"}
        links={[
          { label: t.nav.faqs, href: "/faqs", note: t.faqs.title },
          { label: t.nav.academics, href: "/academics", note: t.academics.title },
          { label: t.nav.contact, href: "/contact", note: t.contact.title },
        ]}
      />
    </>
  );
}
