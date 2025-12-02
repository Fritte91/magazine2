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
    <article className="pt-20 md:pt-24" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Hero Image */}
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[800px] overflow-hidden relative">
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
      <div className="container-padding max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
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
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/article/${relatedArticle.id}`}
                  className="group cursor-pointer"
                >
                  <div className="mb-4 h-56 md:h-64 bg-stone/10 rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />
                    <img
                      src={relatedArticle.cardImage}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/Cover.webp"
                      }}
                    />
                    {relatedArticle.tag && (
                      <div
                        className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: relatedArticle.tag === "Featured" ? "#4CAF50" : "#FFC107",
                          color: "#FFFFFF",
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {relatedArticle.tag}
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl md:text-2xl font-serif font-bold group-hover:text-green-primary transition-colors mb-2 text-charcoal">
                    {relatedArticle.title}
                  </h4>
                  <p className="text-sm md:text-base text-charcoal/70 mb-2 font-sans">
                    {relatedArticle.date}
                  </p>
                  <p className="text-base text-charcoal/80 font-sans">
                    {relatedArticle.description}
                  </p>
                </Link>
              ))}
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
