"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Reveal from "./Reveal";

type LinkItem = { label: string; href: string; note?: string };

/** ISZL-style "Where next?" cross-link grid shown at the bottom of inner pages. */
export default function WhereNext({
  title,
  links,
}: {
  title: string;
  links: LinkItem[];
}) {
  const { lang } = useLang();

  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <Reveal>
          <p className="eyebrow text-blue">→ {title}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.href} delay={i * 70}>
              <Link
                href={l.href}
                hrefLang={lang}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-cream p-6 transition hover:border-blue hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(21,101,192,0.55)]"
              >
                <span className="text-lg font-semibold text-ink group-hover:text-blue">
                  {l.label}
                </span>
                {l.note && (
                  <span className="mt-2 text-sm text-slate">{l.note}</span>
                )}
                <span className="mt-6 text-sm font-bold text-lime-dark">
                  {l.note ? "Explore →" : "Go →"}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
