"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

/** Closing CTA band — lime panel used at the bottom of inner pages (ISZL "Where next?" energy). */
export default function CTASection({
  title,
  text,
  primary,
  primaryHref,
  secondary,
  secondaryHref,
}: {
  title: string;
  text?: string;
  primary: string;
  primaryHref: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  const { lang } = useLang();

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-blue px-6 py-12 text-white sm:px-12 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime/30 blur-2xl"
            />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="display text-3xl sm:text-4xl md:text-5xl">
                  {title}
                </h2>
                {text && (
                  <p className="mt-4 text-white/80 leading-relaxed">{text}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-3 md:max-w-md lg:max-w-none">
                <Link
                  href={primaryHref}
                  className="rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-navy transition hover:bg-white"
                  hrefLang={lang}
                >
                  {primary} →
                </Link>
                {secondary && secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-blue"
                    hrefLang={lang}
                  >
                    {secondary}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
