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
              className="flex flex-col items-center bg-white rounded-xl border-2 border-gray-100 p-8 md:p-10 lg:p-12 hover:border-[#d4af37] hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              {/* Icon */}
              <div className="mb-6 group-hover:scale-105 transition-transform duration-300">
                <TopicIcon iconPath={topic.icon || ""} />
              </div>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-charcoal mb-5 md:mb-6 text-center group-hover:text-[#d4af37] transition-colors duration-300">
                {topic.title}
              </h3>
              
              {/* Description */}
              <p className="text-base md:text-lg text-charcoal/90 leading-relaxed font-sans text-center">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
