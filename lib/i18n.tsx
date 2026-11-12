"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { en } from "./dict/en";
import { ta } from "./dict/ta";

export type Lang = "en" | "ta";
export type Dict = typeof en;

const dictionaries: Record<Lang, Dict> = { en, ta };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "palm-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  // hydrate from localStorage after mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ta") setLangState(saved);
    } catch {
      /* storage unavailable — keep default */
    }
    setReady(true);
  }, []);

  // keep <html lang> in sync for fonts & screen readers
  useEffect(() => {
    if (ready) document.documentElement.lang = lang;
  }, [lang, ready]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value: Ctx = { lang, setLang, t: dictionaries[lang] };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
