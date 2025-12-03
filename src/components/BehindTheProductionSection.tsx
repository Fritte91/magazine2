import { Link } from "react-router-dom"
import { articles } from "../data/articles"
import { useI18n } from "../i18n/i18nContext"

// Show only first 3 articles on homepage
const featuredArticles = articles.slice(0, 3)

export default function BehindTheProductionSection() {
  const { language } = useI18n()
  return (
    <section className="py-16 md:py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Premium dark background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0f0f] to-black"></div>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      ></div>

      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Decorative corner accents */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 opacity-5"
        style={{
          background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5"
        style={{
          background: 'radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        }}
      ></div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-center mb-16 md:mb-20 tracking-tight" style={{ color: "#F5F5F5" }}>
          Behind The Production
        </h2>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-16">
          {featuredArticles.map((article) => {
            // Create beautiful gradient combinations for each card
            let gradientStyle = ''
            if (article.id === "1") {
              // Green card - deep green to lighter green with teal accents
              gradientStyle = 'linear-gradient(135deg, #0d3e1f 0%, #1B5E20 25%, #2e7d32 50%, #1B5E20 75%, #0d3e1f 100%)'
            } else if (article.id === "2") {
              // Orange card - deep orange to amber with golden accents
              gradientStyle = 'linear-gradient(135deg, #bf360c 0%, #E65100 25%, #ff6f00 50%, #E65100 75%, #bf360c 100%)'
            } else if (article.id === "3") {
              // Red card - deep red to crimson with pink accents
              gradientStyle = 'linear-gradient(135deg, #880e4f 0%, #B71C1C 25%, #c62828 50%, #B71C1C 75%, #880e4f 100%)'
            } else {
              // Fallback gradient
              gradientStyle = `linear-gradient(135deg, ${article.gradientFrom} 0%, ${article.gradientMid || article.gradientFrom} 50%, ${article.gradientTo || article.gradientFrom} 100%)`
            }

            return (
            <div
              key={article.id}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer"
              style={{
                background: gradientStyle,
                boxShadow: `0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 4px 12px -2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                border: `1px solid rgba(255, 255, 255, 0.1)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)'
                e.currentTarget.style.boxShadow = `0 24px 48px -8px ${article.glowColor}80, 0 12px 24px -4px ${article.glowColor}60, 0 0 40px ${article.glowColor}50, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = `0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 4px 12px -2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.1)`
              }}
            >
              {/* Animated gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${article.glowColor}15 0%, transparent 50%, ${article.glowColor}10 100%)`,
                }}
              />

              {/* Glow border effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `0 0 60px ${article.glowColor}50, inset 0 0 40px ${article.glowColor}20`,
                }}
              />

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: article.glowColor }}></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: article.glowColor }}></div>
              </div>

              {/* Article Image */}
              <div className="w-full h-64 md:h-72 lg:h-80 overflow-hidden bg-gray-900 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent z-10" />
                <img
                  src={article.cardImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/Cover.webp"
                  }}
                />
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8 lg:p-10 relative z-10">
                {/* Title */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-3 transition-colors duration-300 group-hover:text-white" style={{ color: "#F5F5F5" }}>
                  {language === "th" && article.titleTh ? article.titleTh : article.title}
                </h3>

                {/* Date */}
                <p className="text-sm md:text-base mb-5 font-sans font-semibold tracking-wider uppercase" style={{ color: article.readMoreColor }}>
                  {article.date}
                </p>

                {/* Description */}
                <p className="text-base md:text-lg leading-relaxed mb-8 font-sans transition-colors duration-300" style={{ color: "#E0E0E0" }}>
                  {language === "th" && article.descriptionTh ? article.descriptionTh : article.description}
                </p>

                {/* Read More Button */}
                <Link
                  to={`/article/${article.id}`}
                  className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans font-semibold text-base md:text-lg transition-all duration-300"
                  style={{
                    color: '#FFFFFF',
                    backgroundColor: article.readMoreColor,
                    border: `2px solid ${article.readMoreColor}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = article.readMoreColor
                    e.currentTarget.style.boxShadow = `0 0 20px ${article.readMoreColor}80`
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = article.readMoreColor
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span>Read More</span>
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            )
          })}
        </div>

        {/* View All Stories Link */}
        <div className="mt-12 text-center">
          <Link
            to="/stories"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-sans font-semibold text-base md:text-lg transition-all duration-300 relative overflow-hidden"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#225544",
              border: "1px solid rgba(76, 175, 80, 0.3)",
              boxShadow: "0 4px 12px rgba(34, 85, 68, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2d6b52"
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(34, 85, 68, 0.5)"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.borderColor = "rgba(76, 175, 80, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#225544"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(34, 85, 68, 0.3)"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.borderColor = "rgba(76, 175, 80, 0.3)"
            }}
          >
            <span>View All Stories</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </Link>
        </div>
      </div>
    </section>
  )
}

