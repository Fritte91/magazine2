import { useI18n } from "../i18n/i18nContext"

export default function StatisticsSection() {
  const { t } = useI18n()
  
  return (
    <section className="py-8 md:py-10 bg-white border-y border-gray-100">
      <div className="container-padding max-w-5xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8">
          {/* Stat 1 */}
          <div className="text-center">
            <div 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 leading-tight tracking-tight"
              style={{ color: 'hsl(140, 60%, 30%)' }}
            >
              420
            </div>
            <p className="text-xs md:text-sm text-charcoal/70 font-sans uppercase tracking-[0.15em] font-medium">
              {t("statistics.limited_copies")}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <div 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 leading-tight tracking-tight"
              style={{ color: 'hsl(140, 60%, 30%)' }}
            >
              12
            </div>
            <p className="text-xs md:text-sm text-charcoal/70 font-sans uppercase tracking-[0.15em] font-medium">
              {t("statistics.featured_artists")}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2 leading-tight tracking-tight"
              style={{ color: 'hsl(140, 60%, 30%)' }}
            >
              24
            </div>
            <p className="text-xs md:text-sm text-charcoal/70 font-sans uppercase tracking-[0.15em] font-medium">
              {t("statistics.unique_stories")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

