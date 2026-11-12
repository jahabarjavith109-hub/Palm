"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { SCHOOL_DIRECTIONS_URL, SCHOOL_MAP_URL } from "@/lib/map";

export default function Footer() {
  const { t, lang } = useLang();

  const quickLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.academics, href: "/academics" },
    { label: t.nav.teachers, href: "/teachers" },
    { label: t.nav.events, href: "/events" },
    { label: t.nav.admissions, href: "/admissions" },
    { label: t.nav.faqs, href: "/faqs" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const socials = [
    { label: "Facebook", href: "http://facebook.com", icon: "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.5.2-.8.5-.8z" },
    { label: "Instagram", href: "http://instagram.com", icon: "M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8zm0 5.2a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM17.5 8.6a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0zM16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm3.8 13a3.8 3.8 0 0 1-3.8 3.8H8A3.8 3.8 0 0 1 4.2 16V8A3.8 3.8 0 0 1 8 4.2h8A3.8 3.8 0 0 1 19.8 8v8z" },
    { label: "YouTube", href: "https://www.youtube.com/watch?v=8ArYu1uHrkM", icon: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8l5.5 3.2-5.5 3.2z" },
    { label: "X", href: "http://twitter.com", icon: "M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2 3h6.3l4.3 5.7L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" },
  ];

  return (
    <footer className="bg-blue text-white">
      <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            {/* white chip keeps the full-colour logo readable on the blue footer */}
            <span className="inline-block rounded-2xl bg-white px-5 py-4">
              <Image
                src="/assets/img/logo-full.png"
                alt="Palm Matric Hr. Sec. School"
                width={220}
                height={72}
                className="h-14 w-auto"
              />
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              {t.footer.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-lime hover:text-navy"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <nav aria-label={t.footer.quickMenu} className="lg:col-span-3">
            <h3 className="eyebrow text-lime">{t.footer.usefulLinks}</h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    hrefLang={lang}
                    className="text-sm text-white/85 transition hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div className="lg:col-span-5">
            <h3 className="eyebrow text-lime">{t.footer.getInTouch}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-lime">📍</span>
                <div>
                  <p className="font-semibold">{t.footer.addressLabel}</p>
                  <a
                    href={SCHOOL_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 transition hover:text-lime"
                  >
                    {t.footer.address}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-lime">📞</span>
                <div>
                  <p className="font-semibold">{t.contact.phoneLabel}</p>
                  <a
                    href="tel:+919940485774"
                    className="text-white/80 transition hover:text-lime"
                    dir="ltr"
                  >
                    {t.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-lime">✉️</span>
                <div>
                  <p className="font-semibold">{t.contact.emailLabel}</p>
                  <a
                    href="mailto:palmmatric@gmail.com"
                    className="text-white/80 transition hover:text-lime"
                  >
                    {t.contact.email}
                  </a>
                </div>
              </li>
            </ul>

            <a
              href={SCHOOL_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-white/50 px-6 py-2.5 text-sm font-bold transition hover:bg-white hover:text-blue"
            >
              {t.footer.getDirections} →
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/20 pt-6 text-xs text-white/70 sm:flex-row sm:items-center">
          <p>{t.footer.rights}</p>
          <p className="flex items-center gap-4">
            <Link href="/faqs" className="transition hover:text-lime">
              {t.nav.faqs}
            </Link>
            <span aria-hidden>·</span>
            <Link href="/contact" className="transition hover:text-lime">
              {t.nav.contact}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
