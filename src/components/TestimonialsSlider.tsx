import { useRef, useState, useEffect } from "react"
import { useI18n } from "../i18n/i18nContext"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  item: any
  index: number
  setKey: string
}

function TestimonialCard({ item, index, setKey }: TestimonialCardProps) {
  return (
    <div key={`${setKey}-${index}`} className="flex-shrink-0 w-72 md:w-80 lg:w-96">
      <div
        className="h-full rounded-xl p-5 md:p-6 lg:p-7 group hover:scale-[1.02] transition-all duration-300"
        style={{
          backgroundColor: "rgba(34, 85, 68, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(76, 175, 80, 0.2)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(76, 175, 80, 0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(76, 175, 80, 0.4)"
          e.currentTarget.style.backgroundColor = "rgba(34, 85, 68, 0.25)"
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(34, 85, 68, 0.3), inset 0 1px 0 rgba(76, 175, 80, 0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(76, 175, 80, 0.2)"
          e.currentTarget.style.backgroundColor = "rgba(34, 85, 68, 0.15)"
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(76, 175, 80, 0.1)"
        }}
      >
        <div className="flex items-start mb-3 md:mb-4">
          <Quote
            className="text-green-light opacity-80 group-hover:opacity-100 transition-opacity"
            size={32}
            strokeWidth={1.5}
            style={{
              filter: "drop-shadow(0 2px 8px rgba(76, 175, 80, 0.5))",
            }}
          />
        </div>
        <p
          className="text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-5 font-serif text-white/95"
          style={{
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
            lineHeight: "1.6",
            fontWeight: 400,
            minHeight: "60px",
          }}
        >
          {item.quote}
        </p>
        <div className="pt-3 md:pt-4 border-t border-green-light/20">
          <p
            className="text-xs md:text-sm font-sans font-semibold text-green-light tracking-wide"
            style={{
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
            }}
          >
            {item.author}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSlider() {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [initialScroll, setInitialScroll] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [setWidth, setSetWidth] = useState(0)
  const testimonials = t("testimonials.items", []) as any[]

  // Ensure testimonials is an array
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return null
  }

  // Calculate the width of one set of testimonials
  useEffect(() => {
    if (!containerRef.current) return

    const updateWidth = () => {
      if (containerRef.current) {
        const firstCard = containerRef.current.children[0] as HTMLElement
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth
          const gap = 16 // gap-4 = 1rem = 16px on mobile
          const gapMd = 24 // gap-6 = 1.5rem = 24px on md+
          const actualGap = window.innerWidth >= 768 ? gapMd : gap
          const width = testimonials.length * cardWidth + (testimonials.length - 1) * actualGap
          setSetWidth(width)
        }
      }
    }

    updateWidth()
    const resizeObserver = new ResizeObserver(updateWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener("resize", updateWidth)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateWidth)
    }
  }, [testimonials.length])

  // Auto-scroll functionality
  useEffect(() => {
    if (!containerRef.current || isDragging || isPaused || setWidth === 0) return

    let animationFrameId: number
    const scrollSpeed = 0.5 // pixels per frame

    const scroll = () => {
      if (containerRef.current && !isDragging && !isPaused && setWidth > 0) {
        setScrollPosition((prev) => {
          let newPos = prev + scrollSpeed

          // Reset when we've scrolled through one full set
          if (newPos >= setWidth) {
            newPos = 0
          }

          if (containerRef.current) {
            containerRef.current.style.transform = `translateX(-${newPos}px)`
          }
          return newPos
        })
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isDragging, isPaused, setWidth])

  // Handle drag start (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !wrapperRef.current) return
    setIsDragging(true)
    setIsPaused(true)
    const rect = wrapperRef.current.getBoundingClientRect()
    setStartX(e.clientX - rect.left)
    setInitialScroll(scrollPosition)
    e.preventDefault()
  }

  // Handle drag (mouse) - global to work outside element
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current || !wrapperRef.current) return
      e.preventDefault()

      const rect = wrapperRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const walk = (x - startX) * 2 // Scroll multiplier
      let newPos = initialScroll - walk

      // Handle seamless infinite scroll
      if (newPos < 0) {
        newPos = setWidth + (newPos % setWidth)
      } else if (newPos >= setWidth) {
        newPos = newPos % setWidth
      }

      setScrollPosition(newPos)
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(-${newPos}px)`
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        setTimeout(() => setIsPaused(false), 500)
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
      document.body.style.cursor = "grabbing"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, startX, initialScroll, setWidth])

  // Handle drag end (mouse)
  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 500)
  }

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || !wrapperRef.current) return
    setIsDragging(true)
    setIsPaused(true)
    const rect = wrapperRef.current.getBoundingClientRect()
    setStartX(e.touches[0].clientX - rect.left)
    setInitialScroll(scrollPosition)
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || !wrapperRef.current) return
    e.preventDefault() // Prevent default scrolling

    const rect = wrapperRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const walk = (x - startX) * 2
    let newPos = initialScroll - walk

    // Handle seamless infinite scroll
    if (newPos < 0) {
      newPos = setWidth + (newPos % setWidth)
    } else if (newPos >= setWidth) {
      newPos = newPos % setWidth
    }

    setScrollPosition(newPos)
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${newPos}px)`
    }
  }

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 500)
  }

  return (
    <section
      className="py-8 md:py-10 relative overflow-hidden"
      style={{
        backgroundColor: "#1a2e1f",
      }}
      onMouseEnter={() => {
        if (!isDragging) setIsPaused(true)
      }}
      onMouseLeave={() => {
        if (!isDragging) setIsPaused(false)
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-light/20 rounded-full blur-3xl"></div>
      </div>

      {/* Gradient fade edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, #1a2e1f 0%, transparent 8%, transparent 92%, #1a2e1f 100%)",
        }}
      />

      <div
        ref={wrapperRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "pan-x",
        }}
      >
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-6"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
            willChange: "transform",
          }}
        >
          {/* First set of testimonials */}
          {testimonials.map((item: any, idx: number) => (
            <TestimonialCard key={`first-${idx}`} item={item} index={idx} setKey="first" />
          ))}

          {/* Duplicate set for seamless loop */}
          {testimonials.map((item: any, idx: number) => (
            <TestimonialCard key={`second-${idx}`} item={item} index={idx} setKey="second" />
          ))}
        </div>
      </div>
    </section>
  )
}