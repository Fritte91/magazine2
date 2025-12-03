"use client"

import { useI18n } from "../i18n/i18nContext"

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n()

  return (
    <div className="flex items-center gap-0.5 bg-gray-100/50 rounded-md p-0.5 border border-gray-200/50">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 min-w-[36px] ${
          language === "en" 
            ? "bg-white text-charcoal shadow-sm border border-gray-300" 
            : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("th")}
        className={`px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 min-w-[36px] ${
          language === "th" 
            ? "bg-white text-charcoal shadow-sm border border-gray-300" 
            : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
        }`}
      >
        TH
      </button>
    </div>
  )
}
