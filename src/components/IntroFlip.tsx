import { useEffect, useRef, useState } from "react"
import "./IntroFlip.css"

interface IntroFlipProps {
  onFlipComplete: () => void
}

export default function IntroFlip({ onFlipComplete }: IntroFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const [bend, setBend] = useState(0)
  const [progress, setProgress] = useState(0)

  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const startXRef = useRef<number | null>(null)
  const movedRef = useRef(false)

  // Disable scrolling while intro is active
  useEffect(() => {
    const o = document.body.style
    const originalOverflow = o.overflow
    const originalPos = o.position

    o.overflow = "hidden"
    o.position = "fixed"

    return () => {
      o.overflow = originalOverflow
      o.position = originalPos
    }
  }, [])

  // Gyroscope parallax (mobile only)
  useEffect(() => {
    if (window.innerWidth > 1024) return

    const handler = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0
      const gamma = event.gamma ?? 0

      const x = Math.max(-12, Math.min(12, beta)) / 12
      const y = Math.max(-18, Math.min(18, gamma)) / 18

      setTilt({ x, y })
    }

    window.addEventListener("deviceorientation", handler, true)
    return () => window.removeEventListener("deviceorientation", handler, true)
  }, [])

  const triggerOpen = () => {
    if (isFlipped) return

    setIsFlipped(true)
    setProgress(1)
    setBend(0)

    if (navigator.vibrate) navigator.vibrate(10)

    setTimeout(() => {
      setIsFading(true)
      setTimeout(() => onFlipComplete(), 500)
    }, 850)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX
    movedRef.current = false
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startXRef.current == null || isFlipped) return

    const deltaX = startXRef.current - e.clientX
    const normalized = Math.min(Math.max(deltaX / 180, 0), 1)

    setBend(normalized)
    setProgress(normalized * 0.85)

    if (deltaX > 30) {
      movedRef.current = true
      triggerOpen()
      startXRef.current = null
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setBend(0)
    setProgress(0)

    if (!isFlipped && !movedRef.current) {
      if (e.clientX > window.innerWidth * 0.45) triggerOpen()
    }
  }

  return (
    <div className={`intro-overlay ${isFading ? "intro-fade-out" : ""}`}>
      
      {/* Floating stickers above the magazine */}
      <div className="floating-ui">
        <div className="sticker-floating pre">PRE-ORDER NOW</div>
        <div className="sticker-floating limited">LIMITED ISSUE 2025</div>
      </div>

      <div
        className={`magazine-stage ${isFlipped ? "open" : ""}`}
        style={
          {
            "--bend": bend,
            "--progress": progress,
            "--tiltX": tilt.x,
            "--tiltY": tilt.y,
          } as React.CSSProperties
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="book">

          <div className="inner-page" />
          <div className="spine" />
          <div className="page-block" />

          <div className="cover">
            <div className="page-bend-layer" />

            <div className="cover-img-wrap">
              <img src="/Cover.webp" className="cover-img" alt="Magazine cover" />
            </div>

            <div className="swipe-text">SWIPE LEFT TO OPEN</div>
          </div>
        </div>

        <div className="floor-shadow" />
      </div>
    </div>
  )
}
