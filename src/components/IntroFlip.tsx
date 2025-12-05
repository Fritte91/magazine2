import { useState, useRef, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import "./IntroFlip.css"

interface IntroFlipProps {
  onFlipComplete: () => void
}

export default function IntroFlip({ onFlipComplete }: IntroFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  })
  const flipBookRef = useRef<any>(null)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const flipbookKeyRef = useRef(Date.now()) // Unique key per component instance

  // Handle window resize with debounce
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        setDimensions({
          width: newWidth,
          height: newHeight,
        })
        // Update flipbook size if it exists
        if (flipBookRef.current && flipBookRef.current.pageFlip) {
          try {
            const pageFlip = flipBookRef.current.pageFlip()
            if (pageFlip) {
              // Use resize method if available, otherwise update
              if (typeof pageFlip.resize === "function") {
                pageFlip.resize(newWidth, newHeight)
              } else if (typeof pageFlip.update === "function") {
                pageFlip.update()
              }
            }
          } catch (error) {
            // Silently handle update errors
          }
        }
      }, 150)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  const handleFlip = (e: any) => {
    // e.data contains the page number (0-indexed)
    // When flipping from page 0 (cover) to page 1, the flip is complete
    if (e.data === 1 && !isFlipped) {
      setIsFlipped(true)
      // Immediately scroll to top when flip starts
      const scrollToTop = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      scrollToTop()
      
      // Wait for flip animation to complete, then fade out
      setTimeout(() => {
        setIsFading(true)
        // Scroll to top again before fade
        scrollToTop()
        // After fade completes, call onFlipComplete
        setTimeout(() => {
          // Final scroll to top before showing main app
          scrollToTop()
          onFlipComplete()
        }, 800)
      }, 500)
    }
  }

  // Enhanced desktop drag handling - allow drag from anywhere
  useEffect(() => {
    if (isFlipped) return

    const handleMouseDown = (e: MouseEvent) => {
      // Allow drag from anywhere on desktop
      isDraggingRef.current = true
      dragStartRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || isFlipped) return

      const deltaX = e.clientX - dragStartRef.current.x
      const deltaY = Math.abs(e.clientY - dragStartRef.current.y)
      
      // Make swiping easier - lower threshold for more sensitive detection
      // Trigger if horizontal left movement is significant and vertical is minimal
      const isRightEdge = window.innerWidth - dragStartRef.current.x < 200
      const threshold = isRightEdge ? 20 : 50  // Lowered thresholds for easier swipe
      
      if (deltaX < -threshold && deltaY < 200) {  // Increased vertical tolerance
        // User is dragging left - trigger flip
        if (flipBookRef.current && flipBookRef.current.pageFlip) {
          try {
            const pageFlip = flipBookRef.current.pageFlip()
            if (pageFlip && typeof pageFlip.flipNext === "function") {
              pageFlip.flipNext()
              isDraggingRef.current = false
            }
          } catch (error) {
            // Silently handle errors
          }
        }
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    // Only add desktop handlers if not on touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (!isTouchDevice) {
      window.addEventListener("mousedown", handleMouseDown, { passive: false })
      window.addEventListener("mousemove", handleMouseMove, { passive: false })
      window.addEventListener("mouseup", handleMouseUp)
    }
    
    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isFlipped])

  // Initialize flipbook after mount and force reset to page 0
  useEffect(() => {
    // Small delay to ensure flipbook is fully initialized
    const timer = setTimeout(() => {
      if (flipBookRef.current && flipBookRef.current.pageFlip) {
        try {
          const pageFlip = flipBookRef.current.pageFlip()
          if (pageFlip) {
            // Force reset to page 0 (cover) on mount
            if (typeof pageFlip.flip === "function") {
              pageFlip.flip(0)
            } else if (typeof pageFlip.gotoPage === "function") {
              pageFlip.gotoPage(0)
            }
            // Update after reset
            if (typeof pageFlip.update === "function") {
              pageFlip.update()
            }
          }
        } catch (error) {
          // Silently handle errors
        }
      }
      
      // Ensure initial position is correct - only prevent vertical movement
      const flipbookElement = document.querySelector('.intro-flipbook') as HTMLElement
      
      if (flipbookElement && flipbookElement.querySelector) {
        const wrapper = flipbookElement.querySelector('.stf__wrapper') as HTMLElement
        const block = flipbookElement.querySelector('.stf__block') as HTMLElement
        
        if (wrapper) {
          wrapper.style.setProperty('top', '0', 'important')
          wrapper.style.setProperty('left', '0', 'important')
          wrapper.style.setProperty('position', 'relative', 'important')
          // Only lock Y axis
          wrapper.style.setProperty('transform', 'translateY(0)', 'important')
        }
        if (block) {
          block.style.setProperty('left', '0', 'important')
          block.style.setProperty('top', '0', 'important')
          block.style.setProperty('position', 'relative', 'important')
          // Only lock Y axis
          block.style.setProperty('transform', 'translateY(0)', 'important')
        }
      }
      
      // Reset flipbook container position
      if (flipbookElement) {
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024
        if (isTablet) {
          flipbookElement.style.setProperty('position', 'relative', 'important')
        } else {
          flipbookElement.style.setProperty('position', 'fixed', 'important')
        }
        flipbookElement.style.setProperty('left', '0', 'important')
        flipbookElement.style.setProperty('top', '0', 'important')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [dimensions])

  // Force reset flipbook to page 0 on component mount and continuously monitor/reset positions
  useEffect(() => {
    // Reset state when component mounts
    setIsFlipped(false)
    setIsFading(false)
    
    let resetInterval: ReturnType<typeof setInterval>
    let resetAttempts = 0
    const maxAttempts = 30 // Stop after 3 seconds (30 * 100ms)
    
    // Function to reset to page 0 and ensure initial position
    const resetFlipbook = () => {
      if (flipBookRef.current && flipBookRef.current.pageFlip) {
        try {
          const pageFlip = flipBookRef.current.pageFlip()
          if (pageFlip) {
            if (typeof pageFlip.flip === "function") {
              pageFlip.flip(0)
            } else if (typeof pageFlip.gotoPage === "function") {
              pageFlip.gotoPage(0)
            } else if (typeof pageFlip.turnToPage === "function") {
              pageFlip.turnToPage(0)
            } else if (typeof pageFlip.turnPage === "function") {
              pageFlip.turnPage(0)
            }
            if (typeof pageFlip.update === "function") {
              pageFlip.update()
            }
          }
        } catch (error) {
          // Silently handle errors
        }
      }
      
      // Only prevent vertical movement, allow horizontal flip animation
      const flipbookElement = document.querySelector('.intro-flipbook') as HTMLElement
      if (flipbookElement && flipbookElement.querySelector) {
        const wrapper = flipbookElement.querySelector('.stf__wrapper') as HTMLElement
        const block = flipbookElement.querySelector('.stf__block') as HTMLElement
        
        if (wrapper) {
          // Only lock Y axis, allow X for flip animation
          const currentTransform = wrapper.style.transform || window.getComputedStyle(wrapper).transform
          if (currentTransform && currentTransform.includes('translateY')) {
            wrapper.style.setProperty('transform', currentTransform.replace(/translateY\([^)]*\)/g, 'translateY(0)'), 'important')
          } else {
            wrapper.style.setProperty('transform', 'translateY(0)', 'important')
          }
        }
        if (block) {
          // Only lock Y axis, allow X for flip animation
          const currentTransform = block.style.transform || window.getComputedStyle(block).transform
          if (currentTransform && currentTransform.includes('translateY')) {
            block.style.setProperty('transform', currentTransform.replace(/translateY\([^)]*\)/g, 'translateY(0)'), 'important')
          } else {
            block.style.setProperty('transform', 'translateY(0)', 'important')
          }
        }
      }
    }
    
    // Initial reset after delay
    const resetTimer = setTimeout(() => {
      resetFlipbook()
      
      // Continue monitoring and resetting for a short period
      resetInterval = setInterval(() => {
        resetAttempts++
        resetFlipbook()
        
        if (resetAttempts >= maxAttempts) {
          clearInterval(resetInterval)
        }
      }, 100)
    }, 300)

    return () => {
      clearTimeout(resetTimer)
      if (resetInterval) {
        clearInterval(resetInterval)
      }
    }
  }, [])

  // Prevent scroll restoration and ensure we start at top
  useEffect(() => {
    // Disable scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    
    // Ensure we're at the top when intro mounts
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Prevent body scroll while intro is showing
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.width = "100%"
    document.body.style.height = "100%"
    
    return () => {
      // Restore body styles when intro unmounts
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = ""
      document.body.style.height = ""
    }
  }, [])

  // Calculate flipbook size based on screen size
  // Only handle mobile and tablet (up to 1024px) - desktop is handled in App.tsx
  const isMobile = dimensions.width <= 768
  const isTablet = dimensions.width > 768 && dimensions.width <= 1024
  
  // For mobile: full screen
  // For tablet: use viewport-based sizing (handled by CSS)
  const flipbookWidth = isMobile ? dimensions.width : (isTablet ? dimensions.width * 0.95 : dimensions.width)
  const flipbookHeight = isMobile ? dimensions.height : (isTablet ? dimensions.height * 0.95 : dimensions.height)

  return (
    <div className={`intro-container ${isFading ? "fade-out" : ""}`}>
      <HTMLFlipBook
        key={flipbookKeyRef.current}
        width={flipbookWidth}
        height={flipbookHeight}
        size="stretch"
        minWidth={isMobile ? 315 : Math.floor(flipbookWidth)}
        maxWidth={isMobile ? 10000 : Math.floor(flipbookWidth)}
        minHeight={isMobile ? 420 : Math.floor(flipbookHeight)}
        maxHeight={isMobile ? 10000 : Math.floor(flipbookHeight)}
        maxShadowOpacity={0.6}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        ref={flipBookRef}
        className="intro-flipbook"
        style={{
          width: isMobile ? "100vw" : `${flipbookWidth}px`,
          height: isMobile ? "100vh" : `${flipbookHeight}px`,
        }}
        drawShadow={true}
        flippingTime={600}
        startPage={0}
        showPageCorners={false}
        disableFlipByClick={false}
        swipeDistance={30}
        usePortrait={false}
        startZIndex={0}
        autoSize={false}
        clickEventForward={false}
        useMouseEvents={true}
      >
        <div className="page cover-page">
          <div className="cover-image-wrapper">
            <img src="/Cover.webp" alt="Magazine Cover" className="cover-image" />
          </div>
          <div className="overlay-content">
            <div className="overlay-text">Swipe left to open</div>
            <div className="sticker pre-order">PRE-ORDER NOW</div>
            <div className="sticker limited-issue">LIMITED ISSUE 2025</div>
          </div>
        </div>
        <div className="page blank-page"></div>
      </HTMLFlipBook>
    </div>
  )
}

