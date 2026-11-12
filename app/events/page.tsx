"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import WhereNext from "@/components/WhereNext";
import Reveal from "@/components/Reveal";

const TAG_COLORS: Record<string, string> = {
  Celebration: "bg-lime text-navy",
  Sports: "bg-blue text-white",
  Exhibition: "bg-navy text-white",
  Milestone: "bg-lime text-navy",
  Achievement: "bg-blue text-white",
};

export default function EventsPage() {
  const { t, lang } = useLang();
  const e = t.events;

  return (
    <>
      <PageHero kicker={e.kicker} title={e.title} lead={e.lead} breadcrumb={e.breadcrumb} />

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {e.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1.5 hover:border-blue hover:shadow-[0_30px_60px_-38px_rgba(21,101,192,0.75)]">
                  {/* colored header strip */}
                  <div className="flex items-center justify-between bg-cream px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                        TAG_COLORS[item.tag] ?? "bg-navy text-white"
                      }`}
                    >
                      {item.tag}
                    </span>
                    <time className="text-xs font-semibold text-slate">{item.date}</time>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-semibold leading-snug text-ink group-hover:text-blue">
                      {item.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{item.text}</p>
                    <span className="mt-5 text-sm font-bold text-blue">
                      {t.common.readMore} →
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* load-more style note */}
          <Reveal delay={120}>
            <p className="mt-12 text-center text-sm text-slate">
              {lang === "ta"
                ? "மேலும் நிகழ்வுகளுக்கு எங்களைத் தொடர்புகொள்ளுங்கள்."
                : "Want more? Reach out for our full event archive."}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title={e.ctaTitle}
        text={e.ctaText}
        primary={e.ctaPrimary}
        primaryHref="/contact"
        secondary={e.ctaSecondary}
        secondaryHref="/admissions"
      />

      <WhereNext
        title={lang === "ta" ? "அடுத்து எங்கே?" : "Where next?"}
        links={[
          { label: t.nav.about, href: "/about", note: t.about.title },
          { label: t.nav.academics, href: "/academics", note: t.academics.title },
          { label: t.nav.admissions, href: "/admissions", note: t.admissions.title },
        ]}
      />
    </>
  );
}
