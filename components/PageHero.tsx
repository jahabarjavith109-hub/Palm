"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

/** Inner-page hero: navy panel with kicker + display title + lead (ISZL page header style). */
export default function PageHero({
  kicker,
  title,
  lead,
  breadcrumb,
}: {
  kicker: string;
  title: string;
  lead: string;
  breadcrumb: string;
}) {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* soft lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-lime/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue/40 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-14 pb-16 sm:px-8 md:pt-20 md:pb-24">
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow text-lime">
            <Link href="/" className="hover:underline">
              {t.nav.home}
            </Link>
            <span aria-hidden className="mx-2 text-white/40">
              /
            </span>
            <span className="text-white/80">{breadcrumb}</span>
          </nav>
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow mt-8 text-lime">{kicker}</p>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="display mt-3 max-w-4xl text-4xl sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
