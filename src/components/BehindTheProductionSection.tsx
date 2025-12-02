import { Link } from "react-router-dom"
import { articles } from "../data/articles"

// Show only first 3 articles on homepage
const featuredArticles = articles.slice(0, 3)

export default function BehindTheProductionSection() {
  return (
    <section className="py-16 md:py-20 lg:py-28 relative" style={{ backgroundColor: "#1E1E1E" }}>
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-center mb-16 md:mb-20 tracking-tight" style={{ color: "#F5F5F5" }}>
          Behind The Production
        </h2>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-16">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer"
              style={{
                backgroundColor: article.gradientFrom,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                e.currentTarget.style.boxShadow = `0 20px 40px -5px ${article.glowColor}80, 0 10px 20px -5px ${article.glowColor}60, 0 0 30px ${article.glowColor}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Simple Glow Border Effect on Hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `0 0 40px ${article.glowColor}40`,
                }}
              />

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
                  {article.title}
                </h3>

                {/* Date */}
                <p className="text-sm md:text-base mb-5 font-sans font-semibold tracking-wider uppercase" style={{ color: article.readMoreColor }}>
                  {article.date}
                </p>

                {/* Description */}
                <p className="text-base md:text-lg leading-relaxed mb-8 font-sans transition-colors duration-300" style={{ color: "#E0E0E0" }}>
                  {article.description}
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
          ))}
        </div>

        {/* View All Stories Link */}
        <div className="mt-12">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-lg md:text-xl font-sans font-medium transition-all duration-300"
            style={{ color: "#9C27B0" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 15px #9C27B080'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none'
            }}
          >
            <span>View All Stories...</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

