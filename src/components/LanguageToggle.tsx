"use client"

import { useI18n } from "../i18n/i18nContext"

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n()

  return (
    <div className="flex items-center gap-0.5 bg-gray-200 rounded-lg p-1 border border-gray-300">
      <button
        onClick={() => setLanguage("en")}
        className={`px-5 py-2 rounded-md text-sm font-bold transition-all duration-200 min-w-[55px] ${
          language === "en" 
            ? "bg-white text-charcoal shadow-md border-2 border-gray-500 font-extrabold" 
            : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("th")}
        className={`px-5 py-2 rounded-md text-sm font-bold transition-all duration-200 min-w-[55px] ${
          language === "th" 
            ? "bg-white text-charcoal shadow-md border-2 border-gray-500 font-extrabold" 
            : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
        }`}
      >
        TH
      </button>
    </div>
  )
}
