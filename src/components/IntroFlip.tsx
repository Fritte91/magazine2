import { useEffect, useRef, useState } from "react"
import "./IntroFlip.css"

interface IntroFlipProps {
  onFlipComplete: () => void
}

export default function IntroFlip({ onFlipComplete }: IntroFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFading, setIsFading] = useState(false)

  // interactive curl & rotation progress (0–1)
  const [bend, setBend] = useState(0)
  const [progress, setProgress] = useState(0)

  // gyroscope parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const startXRef = useRef<number | null>(null)
  const movedRef = useRef(false)

  // Lock scroll while intro is visible
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position

    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
    }
  }, [])

  // Gyroscope parallax (mobile)
  useEffect(() => {
    if (typeof window === "undefined") return
    const isMobile = window.innerWidth <= 1024

    if (!isMobile || typeof DeviceOrientationEvent === "undefined") return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0 // front/back
      const gamma = event.gamma ?? 0 // left/right

      // Clamp and normalize to -1..1 range
      const normX = Math.max(-15, Math.min(15, beta)) / 15
      const normY = Math.max(-20, Math.min(20, gamma)) / 20

      setTilt({
        x: normX,
        y: normY,
      })
    }

    // Try adding listener – if permissions are required and denied,
    // nothing happens; we just fail gracefully.
    window.addEventListener("deviceorientation", handleOrientation, true)

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true)
    }
  }, [])

  const triggerOpen = () => {
    if (isFlipped) return

    setIsFlipped(true)
    setProgress(1)
    setBend(0)

    if (navigator.vibrate) {
      navigator.vibrate(15)
    }

    setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        onFlipComplete()
      }, 550)
    }, 900)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX
    movedRef.current = false
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startXRef.current == null || isFlipped) return

    const deltaX = startXRef.current - e.clientX // drag left = positive
    const normalized = Math.min(Math.max(deltaX / 260, 0), 1) // 0–1

    // Live page bend & partial rotation
    setBend(normalized)
    setProgress(normalized * 0.9)

    if (deltaX > 75) {
      movedRef.current = true
      triggerOpen()
      startXRef.current = null
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // Reset curl if user let go without opening
    if (!isFlipped && !movedRef.current) {
      setBend(0)
      setProgress(0)

      const width = window.innerWidth
      // Tap on right half also opens
      if (e.clientX > width * 0.45) {
        triggerOpen()
      }
    } else if (!isFlipped && movedRef.current) {
      // Gesture started but didn't cross threshold
      setBend(0)
      setProgress(0)
    }

    startXRef.current = null
  }

  return (
    <div className={`intro-overlay ${isFading ? "intro-fade-out" : ""}`}>
      <div
        className={`magazine-stage ${isFlipped ? "open" : ""}`}
        style={
          {
            "--bend": bend,
            "--progress": isFlipped ? 1 : progress,
            "--tiltX": tilt.x,
            "--tiltY": tilt.y,
          } as React.CSSProperties
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="book">
          {/* Inner page (inside is pure dark / black) */}
          <div className="inner-page" />

          {/* Spine + page block */}
          <div className="spine" />
          <div className="page-block" />

          {/* Front cover */}
          <div className="cover">
            {/* Curl shading / deformation */}
            <div className="page-bend-layer" />

            <div className="cover-img-wrap">
              <img src="/Cover.webp" className="cover-img" alt="Magazine cover" />
            </div>

            <div className="cover-ui">
              <div className="sticker pre">PRE-ORDER NOW</div>
              <div className="sticker limited">LIMITED ISSUE 2025</div>
              <div className="swipe-text">Swipe left to open</div>
            </div>
          </div>
        </div>

        <div className="floor-shadow" />
      </div>
    </div>
  )
}
