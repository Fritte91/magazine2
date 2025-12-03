import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const legendsData = [
  {
    name: "Ko Dam Koh Tao",
    description:
      "A key figure in Thailand's cannabis scene, known for popularizing the KD Koh Tao strain, a local strain from Koh Tao Island. He is also widely known and recognized for supporting and educating local communities, and the development of Thailand's cannabis culture.",
    image: "/kdkohtao.jpeg",
  },
  { name: "Kitty Chopaka", description:"A prominent cannabis advocate in Thailand who played a crucial role in the legalization movement. Her work continues to shape the emerging legal cannabis industry in Southeast Asia.", image: "/kittychopaka.jpeg" },
  { name: "Dr.K Highthai", description: "A voice of sharing within Thailand's cannabis culture, P'K has spent over 20 years growing, teaching, and sharing his craft with an open heart. With passion and a free spirit, he continues to grow and cultivate the community, rooted in love and knowledge.", image: "/highthai.webp" },
  
]

export default function LegendsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? legendsData.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === legendsData.length - 1 ? 0 : prev + 1))
  }

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }

    // Reset
    touchStartX.current = null
    touchEndX.current = null
  }

  const currentLegend = legendsData[currentIndex]

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-screen flex items-center">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/legend.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Subtle Tint Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(45, 36, 22, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <div className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-lg">
            MEET THE LEGENDS
          </h2>
        </div>

        {/* Glassmorphic Card Container */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div
            className="w-full max-w-4xl rounded-xl p-6 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-500"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
              touchAction: "pan-x pan-y",
            }}
          >
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-[250px] md:max-w-[280px] aspect-square overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={currentLegend.image || "/legend.jpg"}
                  alt={currentLegend.name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/legend.jpg"
                  }}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <h3
                className="text-2xl md:text-3xl font-sans font-bold mb-4 transition-colors duration-500"
                style={{ color: "#ff8c42" }}
              >
                {currentLegend.name}
              </h3>
              <p
                className="text-base md:text-lg leading-relaxed font-sans transition-opacity duration-500"
                style={{ color: "rgba(255, 255, 255, 0.95)" }}
              >
                {currentLegend.description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.3)",
            }}
            aria-label="Previous legend"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2 items-center">
            {legendsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 h-2" : "w-2 h-2"
                }`}
                style={{
                  backgroundColor: idx === currentIndex ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                  boxShadow: idx === currentIndex ? "0 0 8px rgba(255, 255, 255, 0.5)" : "none",
                }}
                aria-label={`Go to legend ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.3)",
            }}
            aria-label="Next legend"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
