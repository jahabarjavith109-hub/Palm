"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export default function Header() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile drawer
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // close overlays on route change
  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  // lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav: NavItem[] = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    {
      label: t.nav.academics,
      href: "/academics",
      children: [
        { label: t.nav.academics, href: "/academics" },
        { label: t.nav.teachers, href: "/teachers" },
        { label: t.nav.events, href: "/events" },
      ],
    },
    {
      label: t.nav.admissions,
      href: "/admissions",
      children: [
        { label: t.nav.admissions, href: "/admissions" },
        { label: t.nav.faqs, href: "/faqs" },
      ],
    },
    { label: t.nav.contact, href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ---------- utility bar ---------- */}
      <div className="hidden bg-navy text-white md:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[13px]">
          <p className="flex items-center gap-2 font-medium">
            <span aria-hidden className="text-lime">🔔</span>
            {t.home.topbar}
          </p>
          <div className="flex items-center gap-5">
            <a
              href="tel:+919940485774"
              className="flex items-center gap-1.5 transition hover:text-lime"
            >
              <span aria-hidden>📞</span>
              <span dir="ltr">{t.contact.phone}</span>
            </a>
            <span aria-hidden className="h-3 w-px bg-white/25" />
            <a
              href="mailto:palmmatric@gmail.com"
              className="flex items-center gap-1.5 transition hover:text-lime"
            >
              <span aria-hidden>✉️</span>
              {t.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* ---------- main header ---------- */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-white/95 shadow-[0_10px_30px_-24px_rgba(16,28,43,0.6)] backdrop-blur"
            : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
          {/* logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Palm Matric Hr. Sec. School — home"
          >
            <Image
              src="/assets/img/logo.png"
              alt="Palm Matric Hr. Sec. School"
              width={150}
              height={54}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>

          {/* desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setDropdown(item.href)}
                onMouseLeave={() => item.children && setDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-[15px] font-semibold transition ${
                    isActive(item.href)
                      ? "text-blue"
                      : "text-ink hover:bg-cream hover:text-blue"
                  }`}
                  aria-expanded={item.children ? dropdown === item.href : undefined}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      aria-hidden
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      className={`mt-0.5 transition-transform ${
                        dropdown === item.href ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </Link>

                {/* desktop dropdown */}
                {item.children && dropdown === item.href && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="min-w-56 overflow-hidden rounded-2xl border border-line bg-white py-2 shadow-[0_30px_60px_-30px_rgba(16,28,43,0.45)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-2.5 text-[15px] transition ${
                            isActive(child.href)
                              ? "bg-cream font-semibold text-blue"
                              : "text-ink hover:bg-cream hover:text-blue"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* language toggle */}
            <div
              role="group"
              aria-label={t.nav.language}
              className="flex overflow-hidden rounded-full border border-line bg-cream p-1"
            >
              {(["en", "ta"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                    lang === l
                      ? "bg-blue text-white shadow-sm"
                      : "text-slate hover:text-ink"
                  }`}
                >
                  {l === "en" ? "EN" : "தமிழ்"}
                </button>
              ))}
            </div>

            <Link
              href="/admissions"
              className="hidden rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition hover:bg-lime-dark hover:text-white sm:inline-flex"
            >
              {t.nav.admissionOpen} →
            </Link>

            {/* hamburger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-blue hover:text-blue lg:hidden"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
                <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- mobile drawer ---------- */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Image
                src="/assets/img/logo.png"
                alt=""
                width={130}
                height={46}
                className="h-11 w-auto"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.nav.close}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-blue hover:text-blue"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
              {nav.map((item) => (
                <div key={item.href} className="border-b border-line/70 py-1">
                  <Link
                    href={item.href}
                    className={`block py-3 text-lg font-semibold ${
                      isActive(item.href) ? "text-blue" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mb-2 pl-4">
                      {item.children
                        .filter((c) => c.href !== item.href)
                        .map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-[15px] text-slate"
                          >
                            — {child.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/admissions"
                className="mt-5 block rounded-full bg-lime px-6 py-3.5 text-center text-sm font-bold text-navy"
              >
                {t.nav.admissionOpen} →
              </Link>
            </nav>

            <div className="border-t border-line bg-cream px-5 py-4 text-sm">
              <a href="tel:+919940485774" className="block py-1 font-semibold text-blue" dir="ltr">
                📞 {t.contact.phone}
              </a>
              <a href="mailto:palmmatric@gmail.com" className="block py-1 text-slate">
                ✉️ {t.contact.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
