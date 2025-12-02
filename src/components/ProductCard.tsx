import { useI18n } from "../i18n/i18nContext"
import { Check } from "lucide-react"

interface ProductCardProps {
  image: string
  title: string
  features: string[]
}

export default function ProductCard({ image, title, features }: ProductCardProps) {
  const { t } = useI18n()

  return (
    <div className="bg-white">
      {/* Product Image */}
      <div className="mb-10 md:mb-12 rounded-lg overflow-hidden shadow-xl">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title} 
          className="w-full h-auto object-contain" 
        />
      </div>

      {/* Product Info */}
      <div className="space-y-8">
        <div>
          <h1 className="mb-3 text-charcoal">{title}</h1>
          <p className="text-2xl md:text-4xl font-serif font-bold text-charcoal">{t("shop.price")}</p>
        </div>

        <p className="text-base md:text-lg text-charcoal/80 leading-relaxed">{t("shop.description")}</p>

        {/* Modern Interactive Features List */}
        <div className="space-y-3 md:space-y-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden cursor-pointer"
            >
              {/* Subtle background card with better visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-stone/5 via-white to-stone/5 rounded-lg border border-stone/15 group-hover:border-charcoal/20 group-hover:shadow-lg group-hover:bg-white transition-all duration-300"></div>
              
              {/* Accent line on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-primary/0 group-hover:bg-green-primary transition-all duration-300 rounded-l-lg"></div>
              
              {/* Content */}
              <div className="relative flex items-center gap-4 md:gap-5 p-5 md:p-6 lg:p-7">
                {/* Icon with smooth animation */}
                <div className="flex-shrink-0 relative">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-charcoal/8 flex items-center justify-center group-hover:bg-green-primary/15 transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-lg border border-stone/10 group-hover:border-green-primary/20">
                    <Check 
                      className="w-5 h-5 md:w-6 md:h-6 text-charcoal/70 group-hover:text-green-primary transition-all duration-300" 
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                
                {/* Text with smooth transitions - improved contrast */}
                <div className="flex-1 min-w-0">
                  <p className="text-base md:text-lg lg:text-xl text-charcoal font-semibold leading-relaxed group-hover:text-green-primary/90 transition-colors duration-300">
                    {feature}
                  </p>
                </div>

                {/* Elegant arrow indicator */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out">
                  <svg 
                    className="w-5 h-5 text-green-primary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
