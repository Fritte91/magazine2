import { useParams, Link } from "react-router-dom"
import { getArticleById, getOtherArticles } from "../data/articles"

export default function Article() {
  const { id } = useParams<{ id: string }>()
  const article = getArticleById(id || "1")
  const relatedArticles = getOtherArticles(id || "1", 2)

  if (!article) {
    return (
      <div className="pt-28 md:pt-32 min-h-screen flex items-center justify-center" style={{ backgroundColor: "#1E1E1E" }}>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "#F5F5F5" }}>Article Not Found</h1>
          <Link to="/stories" className="text-green-primary hover:underline">Back to Stories</Link>
        </div>
      </div>
    )
  }

  return (
    <article className="pt-20 md:pt-24 relative" style={{ backgroundColor: "#F0F0F0" }}>
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>

        {/* Subtle dot texture */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30"></div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[800px] overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
        <img 
          src={article.heroImage} 
          alt={article.title} 
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/Cover.webp"
          }}
        />
      </div>

      {/* Article Content */}
      <div className="container-padding max-w-4xl mx-auto py-12 md:py-16 lg:py-20 relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <Link 
              to="/stories" 
              className="text-sm md:text-base font-sans font-medium text-charcoal/70 hover:text-green-primary transition-colors"
            >
              ← Back to Stories
            </Link>
            <span className="text-charcoal/30">|</span>
            <p className="text-xs md:text-sm tracking-widest uppercase text-charcoal/60 font-semibold">
              {article.date}
            </p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 md:mb-6 text-charcoal leading-tight">
            {article.title}
          </h1>
          
          {article.subtitle && (
            <p className="text-xl md:text-2xl font-serif text-charcoal/80 italic mb-6">
              {article.subtitle}
            </p>
          )}

          <div className="h-1 w-24 bg-green-primary mt-6"></div>
        </div>

        {/* Body Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.split("\n\n").map((paragraph, idx) => {
            const trimmed = paragraph.trim()
            
            // Handle headings (lines starting with #)
            if (trimmed.startsWith("#")) {
              const level = trimmed.match(/^#+/)?.[0].length || 2
              const text = trimmed.replace(/^#+\s/, "")
              
              if (level === 2) {
                return (
                  <h2 
                    key={idx} 
                    className="text-3xl md:text-4xl font-serif font-bold mt-12 mb-6 text-charcoal first:mt-0"
                  >
                    {text}
                  </h2>
                )
              }
              
              if (level === 3) {
                return (
                  <h3 
                    key={idx} 
                    className="text-2xl md:text-3xl font-serif font-bold mt-10 mb-4 text-charcoal"
                  >
                    {text}
                  </h3>
                )
              }
            }
            
            // Regular paragraphs
            if (trimmed) {
              return (
                <p 
                  key={idx} 
                  className="text-lg md:text-xl text-charcoal/90 leading-relaxed mb-6 md:mb-8 font-sans"
                >
                  {trimmed}
                </p>
              )
            }
            
            return null
          })}
        </div>

        {/* Divider */}
        <div className="my-16 md:my-20 h-px bg-stone/20"></div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 md:mb-12 text-charcoal">
              More Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {relatedArticles.map((relatedArticle) => {
                // Create beautiful gradient combinations for each card matching Stories page
                let gradientStyle = ''
                if (relatedArticle.id === "1") {
                  gradientStyle = 'linear-gradient(135deg, #0d3e1f 0%, #1B5E20 25%, #2e7d32 50%, #1B5E20 75%, #0d3e1f 100%)'
                } else if (relatedArticle.id === "2") {
                  gradientStyle = 'linear-gradient(135deg, #bf360c 0%, #E65100 25%, #ff6f00 50%, #E65100 75%, #bf360c 100%)'
                } else if (relatedArticle.id === "3") {
                  gradientStyle = 'linear-gradient(135deg, #880e4f 0%, #B71C1C 25%, #c62828 50%, #B71C1C 75%, #880e4f 100%)'
                } else if (relatedArticle.id === "4") {
                  gradientStyle = 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 25%, #8e24aa 50%, #6a1b9a 75%, #4a148c 100%)'
                } else if (relatedArticle.id === "5") {
                  gradientStyle = 'linear-gradient(135deg, #004d40 0%, #006064 25%, #00838f 50%, #006064 75%, #004d40 100%)'
                } else if (relatedArticle.id === "6") {
                  gradientStyle = 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 25%, #4caf50 50%, #2e7d32 75%, #1b5e20 100%)'
                } else {
                  gradientStyle = `linear-gradient(135deg, ${relatedArticle.gradientFrom} 0%, ${relatedArticle.gradientMid || relatedArticle.gradientFrom} 50%, ${relatedArticle.gradientTo || relatedArticle.gradientFrom} 100%)`
                }

                return (
                  <Link
                    key={relatedArticle.id}
                    to={`/article/${relatedArticle.id}`}
                    className="group relative rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      background: gradientStyle,
                      boxShadow: `0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 4px 12px -2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                      border: `1px solid rgba(255, 255, 255, 0.1)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)'
                      e.currentTarget.style.boxShadow = `0 24px 48px -8px ${relatedArticle.glowColor}80, 0 12px 24px -4px ${relatedArticle.glowColor}60, 0 0 40px ${relatedArticle.glowColor}50, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
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
                        background: `linear-gradient(135deg, ${relatedArticle.glowColor}15 0%, transparent 50%, ${relatedArticle.glowColor}10 100%)`,
                      }}
                    />

                    {/* Glow border effect on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: `0 0 60px ${relatedArticle.glowColor}50, inset 0 0 40px ${relatedArticle.glowColor}20`,
                      }}
                    />

                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: relatedArticle.glowColor }}></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: relatedArticle.glowColor }}></div>
                    </div>

                    {/* Tag Badge */}
                    {relatedArticle.tag && (
                      <div
                        className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: relatedArticle.tag === "Featured" ? "#4CAF50" : "#FFC107",
                          color: "#FFFFFF",
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {relatedArticle.tag}
                      </div>
                    )}

                    {/* Article Image */}
                    <div className="w-full h-56 md:h-64 overflow-hidden bg-gray-900 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent z-10" />
                      <img
                        src={relatedArticle.cardImage}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/Cover.webp"
                        }}
                      />
                    </div>

                    {/* Article Content */}
                    <div className="p-6 md:p-8 relative z-10">
                      {/* Title */}
                      <h4 className="text-xl md:text-2xl font-serif font-bold mb-3 transition-colors duration-300 group-hover:text-white" style={{ color: "#F5F5F5" }}>
                        {relatedArticle.title}
                      </h4>

                      {/* Date */}
                      <p className="text-sm md:text-base mb-4 font-sans font-semibold tracking-wider uppercase" style={{ color: relatedArticle.readMoreColor }}>
                        {relatedArticle.date}
                      </p>

                      {/* Description */}
                      <p className="text-base md:text-lg leading-relaxed font-sans transition-colors duration-300 line-clamp-3" style={{ color: "#E0E0E0" }}>
                        {relatedArticle.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Back to Stories Button */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white font-sans font-semibold text-base md:text-lg rounded-lg hover:bg-charcoal/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>View All Stories</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
