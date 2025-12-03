import { useI18n } from "../i18n/i18nContext"

export default function AboutAuthorSection() {
  const { t } = useI18n()

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Title and Author Info */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-4">
            {t("about_author.title")}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-charcoal mb-2">
            {t("about_author.name")}
          </h3>
          <p className="text-lg md:text-xl text-green-primary font-sans">
            {t("about_author.subtitle")}
          </p>
        </div>

        {/* Background Logo Container */}
        <div className="relative min-h-[600px] md:min-h-[800px] rounded-lg overflow-hidden">
          {/* Background Logo */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/9.webp')`,
              opacity: 0.9
            }}
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/20" />

          {/* Text Sections/Bubbles */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* My Journey */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-4">
                {t("about_author.my_journey.title")}
              </h4>
              <p className="text-base md:text-lg leading-relaxed text-charcoal font-sans">
                {t("about_author.my_journey.text")}
              </p>
            </div>

            {/* Creative Insights */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-4">
                {t("about_author.creative_insights.title")}
              </h4>
              <p className="text-base md:text-lg leading-relaxed text-charcoal font-sans">
                {t("about_author.creative_insights.text")}
              </p>
            </div>

            {/* The Mission */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-4">
                {t("about_author.the_mission.title")}
              </h4>
              <p className="text-base md:text-lg leading-relaxed text-charcoal font-sans">
                {t("about_author.the_mission.text")}
              </p>
            </div>

            {/* Magazine Perspective */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-4">
                {t("about_author.magazine_perspective.title")}
              </h4>
              <p className="text-base md:text-lg leading-relaxed text-charcoal font-sans">
                {t("about_author.magazine_perspective.text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
