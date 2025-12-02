import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import en from "./en.json"
import th from "./th.json"

type Language = "en" | "th"
type Translations = typeof en

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, defaultValue?: any) => any
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Language, Translations> = { en, th }

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language")
    return (saved as Language) || "en"
  })

  const setLanguageSafe = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string, defaultValue: any = ""): any => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    // Return the value as-is if it exists (could be string, array, object, etc.)
    if (value !== undefined && value !== null) {
      return value
    }

    // Return defaultValue if provided, otherwise return the key
    return defaultValue !== "" ? defaultValue : key
  }

  return <I18nContext.Provider value={{ language, setLanguage: setLanguageSafe, t }}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
