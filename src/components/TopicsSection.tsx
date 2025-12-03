import { useI18n } from "../i18n/i18nContext"

// Icon component that displays the image
const TopicIcon = ({ iconPath }: { iconPath: string }) => {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 mx-auto mb-8 flex items-center justify-center">
      <img 
        src={`/${iconPath}`} 
        alt="" 
        className="w-full h-full object-contain drop-shadow-sm"
      />
    </div>
  )
}

export default function TopicsSection() {
  const { t } = useI18n()
  const topics = t("topics.items", []) as any[]

  // Ensure topics is an array
  if (!Array.isArray(topics)) {
    return null
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-center text-charcoal mb-12 md:mb-16">
          {t("topics.title")}
        </h2>
        
        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {topics.map((topic: any, idx: number) => (
            <div
              key={idx}
              className="topic-card group relative flex flex-col items-center rounded-2xl p-8 md:p-10 lg:p-12 cursor-pointer overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 250, 248, 0.98) 100%)",
                border: "1px solid rgba(34, 85, 68, 0.1)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
              }}
            >
              {/* Decorative gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(255, 193, 7, 0.05) 100%)",
                }}
              ></div>

              {/* Accent line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                style={{
                  background: "transparent",
                }}
              ></div>

              {/* Icon */}
              <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
                <div 
                  className="absolute inset-0 rounded-full blur-xl transition-all duration-500"
                  style={{
                    backgroundColor: "transparent",
                  }}
                ></div>
                <div className="relative">
                  <TopicIcon iconPath={topic.icon || ""} />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="topic-title relative text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-5 md:mb-6 text-center transition-colors duration-300">
                {topic.title}
              </h3>
              
              {/* Description */}
              <p className="relative text-base md:text-lg text-charcoal/80 leading-relaxed font-sans text-center group-hover:text-charcoal/90 transition-colors duration-300">
                {topic.description}
              </p>

              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-lg"
                  style={{ borderColor: 'rgb(212, 175, 55)' }}
                ></div>
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-lg"
                  style={{ borderColor: 'rgb(212, 175, 55)' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .topic-card:hover {
          border-color: rgba(212, 175, 55, 0.4) !important;
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          transform: translateY(-8px);
        }
        .topic-card:hover .absolute.top-0.left-0.right-0.h-1 {
          background: linear-gradient(to right, rgb(212, 175, 55), rgb(255, 193, 7), rgb(212, 175, 55)) !important;
        }
        .topic-card:hover .topic-title {
          color: rgb(212, 175, 55) !important;
        }
        .topic-card:hover .relative.mb-6 .absolute.inset-0 {
          background-color: rgba(212, 175, 55, 0.15) !important;
          filter: blur(24px) !important;
        }
      `}</style>
    </section>
  )
}
