"use client";

/**
 * Palm AI — Public Assistant widget.
 * Bilingual (EN/தமிழ்) chat over the school knowledge base, with quick
 * replies, typing indicator, WhatsApp handover and call/email escalation.
 */

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { getReply, GREETING, containsTamil, type Lang } from "@/lib/assistant";

const WHATSAPP_URL =
  "https://wa.me/919940485774?text=" +
  encodeURIComponent("Hi Palm Matric! I have a question from your website.");

type Msg = {
  id: number;
  role: "bot" | "user";
  text: string;
  escalate?: boolean;
};

const COPY = {
  en: {
    title: "Palm AI Assistant",
    subtitle: "Ask me anything about Palm Matric",
    placeholder: "Type your question…",
    send: "Send",
    open: "Chat with Palm AI",
    close: "Close chat",
    typing: "Palm AI is typing…",
    wa: "Continue on WhatsApp",
    call: "Call the office",
    email: "Email us",
    chips: [
      "Admission process",
      "School fees",
      "School timings",
      "Streams offered",
      "Facilities",
      "Contact details",
    ],
    disclaimer: "Palm AI answers from school information — for exact details, contact the office.",
    fresh: "New chat",
  },
  ta: {
    title: "Palm AI உதவியாளர்",
    subtitle: "பாம் மெட்ரிக் பற்றி எதையும் கேளுங்கள்",
    placeholder: "உங்கள் கேள்வியை இங்கே எழுதுங்கள்…",
    send: "அனுப்பு",
    open: "Palm AI உடன் உரையாடுங்கள்",
    close: "உரையாடலை மூடு",
    typing: "Palm AI தட்டச்சு செய்கிறது…",
    wa: "WhatsApp-இல் தொடருங்கள்",
    call: "அலுவலகத்தை அழையுங்கள்",
    email: "மின்னஞ்சல் அனுப்புங்கள்",
    chips: [
      "சேர்க்கை நடைமுறை",
      "பள்ளிக் கட்டணம்",
      "பள்ளி நேரம்",
      "வழங்கப்படும் பாடக் குழுக்கள்",
      "வசதிகள்",
      "தொடர்பு விவரங்கள்",
    ],
    disclaimer: "Palm AI பள்ளி தகவலிலிருந்து பதிலளிக்கிறது — சரியான விவரங்களுக்கு அலுவலகத்தைத் தொடர்புகொள்ளுங்கள்.",
    fresh: "புதிய உரையாடல்",
  },
} as const;

export default function PalmAssistant() {
  const { lang, setLang } = useLang();
  const copy = COPY[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);

  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // greet on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: idRef.current++, role: "bot", text: GREETING[lang] }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // scroll to bottom on new content
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  // focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // playful first-load nudge
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function push(role: Msg["role"], text: string, escalate?: boolean) {
    setMessages((m) => [...m, { id: idRef.current++, role, text, escalate }]);
  }

  function ask(raw: string) {
    const text = raw.trim();
    if (!text || typing) return;
    setInput("");
    push("user", text);
    setTyping(true);

    // pick reply language: Tamil script wins, else current site language
    const replyLang: Lang = containsTamil(text) ? "ta" : lang;
    const reply = getReply(text, replyLang);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      push("bot", reply.text, reply.escalate);
    }, 600 + Math.min(text.length * 12, 700));
  }

  function resetChat() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTyping(false);
    setMessages([{ id: idRef.current++, role: "bot", text: GREETING[lang] }]);
    inputRef.current?.focus();
  }

  function quick(label: string) {
    // map the chip label back to a question the engine understands
    const mapEn: Record<string, string> = {
      "Admission process": "How do I apply for admission?",
      "School fees": "What are the school fees?",
      "School timings": "What are the school timings?",
      "Streams offered": "Which streams do you offer?",
      Facilities: "What facilities do you have?",
      "Contact details": "How do I contact the school?",
    };
    const mapTa: Record<string, string> = {
      "சேர்க்கை நடைமுறை": "சேர்க்கைக்கு எப்படி விண்ணப்பிப்பது?",
      "பள்ளிக் கட்டணம்": "பள்ளிக் கட்டணம் எவ்வளவு?",
      "பள்ளி நேரம்": "பள்ளி நேரம் என்ன?",
      "வழங்கப்படும் பாடக் குழுக்கள்": "என்னென்ன பாடக் குழுக்கள்?",
      "வசதிகள்": "என்னென்ன வசதிகள் உள்ளன?",
      "தொடர்பு விவரங்கள்": "தொடர்பு விவரங்கள் என்ன?",
    };
    const q = (lang === "ta" ? mapTa : mapEn)[label] ?? label;
    ask(q);
  }

  const btn =
    "inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition active:scale-95";

  return (
    <>
      {/* ---------- floating launcher ---------- */}
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setNudge(false);
        }}
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-blue px-5 text-white shadow-[0_10px_30px_rgba(21,101,192,0.4)] transition hover:bg-blue-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/70 ${
          nudge && !open ? "animate-bounce" : ""
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
        <span className="hidden text-sm font-semibold sm:inline">{open ? copy.close : "Palm AI"}</span>
        {!open && <span className="h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-blue" aria-hidden />}
      </button>

      {/* ---------- chat panel ---------- */}
      {open && (
        <div
          role="dialog"
          aria-label={copy.title}
          className="fixed bottom-24 right-3 z-50 flex h-[min(560px,calc(100dvh_-_8rem))] w-[min(380px,calc(100vw_-_1.5rem))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_60px_rgba(16,28,43,0.28)] sm:right-5"
        >
          {/* header */}
          <div className="flex items-center gap-3 bg-blue px-4 py-3.5 text-white">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-lime/70"
              aria-hidden
            >
              <img
                src="/assets/img/logo-icon.png"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{copy.title}</p>
              <p className="truncate text-xs text-white/85">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={resetChat}
              aria-label={copy.fresh}
              title={copy.fresh}
              className="rounded-full p-1.5 text-white/90 transition hover:bg-white/15"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.close}
              className="rounded-full p-1.5 text-white/90 transition hover:bg-white/15"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* language pill */}
          <div className="flex items-center justify-between border-b border-line bg-cream px-4 py-1.5">
            <span className="text-[11px] font-semibold tracking-wide text-slate">
              {lang === "ta" ? "மொழி" : "Language"}
            </span>
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="rounded-full border border-blue/30 bg-white px-3 py-0.5 text-[11px] font-bold text-blue transition hover:bg-blue hover:text-white"
            >
              {lang === "en" ? "தமிழ்" : "English"}
            </button>
          </div>

          {/* messages */}
          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto bg-cream px-4 py-4"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className="max-w-[85%]">
                  <div
                    className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-blue text-white"
                        : "rounded-bl-md border border-line bg-white text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.role === "bot" && m.escalate && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${btn} bg-[#25D366] text-white hover:brightness-95`}
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                        {copy.wa}
                      </a>
                      <a href="tel:+919940485774" className={`${btn} bg-blue text-white hover:bg-blue-dark`}>
                        📞 {copy.call}
                      </a>
                      <a
                        href="mailto:palmmatric@gmail.com?subject=Website%20enquiry%20-%20Palm%20Matric"
                        className={`${btn} border border-line bg-white text-ink hover:border-blue hover:text-blue`}
                      >
                        ✉️ {copy.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3" aria-label={copy.typing}>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* quick replies */}
          <div className="flex gap-2 overflow-x-auto border-t border-line bg-white px-3 pb-2 pt-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {copy.chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => quick(c)}
                className="shrink-0 rounded-full border border-blue/35 bg-white px-3 py-1.5 text-xs font-semibold text-blue transition hover:bg-blue hover:text-white"
              >
                {c}
              </button>
            ))}
          </div>

          {/* composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-white px-3 py-2.5"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.placeholder}
              aria-label={copy.placeholder}
              maxLength={400}
              className="min-w-0 flex-1 rounded-full border border-line bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-slate focus:border-blue focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label={copy.send}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue text-white transition hover:bg-blue-dark disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 -translate-x-px" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
          <p className="bg-white px-4 pb-2 text-center text-[10px] leading-tight text-slate">{copy.disclaimer}</p>
        </div>
      )}
    </>
  );
}
