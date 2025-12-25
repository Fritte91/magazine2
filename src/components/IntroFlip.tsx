import { useEffect, useRef, useState, type CSSProperties } from "react"
import "./IntroFlip.css"
import { useI18n } from "../i18n/i18nContext"

interface IntroFlipProps {
  onFlipComplete: () => void
}

export default function IntroFlip({ onFlipComplete }: IntroFlipProps) {
  const { t } = useI18n()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const [bend, setBend] = useState(0)
  const [progress, setProgress] = useState(0)

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)

  const startXRef = useRef<number | null>(null)

  // Lock scroll while intro is visible
  useEffect(() => {
    const style = document.body.style
    const originalOverflow = style.overflow
    const originalPos = style.position

    style.overflow = "hidden"
    style.position = "fixed"

    return () => {
      style.overflow = originalOverflow
      style.position = originalPos
    }
  }, [])

  // Gyroscope parallax (mobile / tablet)
  useEffect(() => {
    if (window.innerWidth > 1024) return
    if (typeof DeviceOrientationEvent === "undefined") return

    const handler = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0
      const gamma = event.gamma ?? 0

      const x = Math.max(-10, Math.min(10, beta)) / 10
      const y = Math.max(-16, Math.min(16, gamma)) / 16

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
    setIsInteracting(false)

    if (navigator.vibrate) navigator.vibrate(8)

    setTimeout(() => {
      setIsFading(true)
      setTimeout(() => onFlipComplete(), 450)
    }, 800)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX
    setIsInteracting(true)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startXRef.current == null || isFlipped) return

    const deltaX = startXRef.current - e.clientX
    const normalized = Math.min(Math.max(deltaX / 160, 0), 1)

    setBend(normalized)
    setProgress(normalized * 0.85)

    // SUPER EASY SWIPE: tiny movement opens
    if (deltaX > 12) {
      triggerOpen()
      startXRef.current = null
    }
  }

  const endInteraction = () => {
    setBend(0)
    setProgress(0)
    setTimeout(() => setIsInteracting(false), 100)
    startXRef.current = null
  }

  const handlePointerUp = () => {
    if (!isFlipped) {
      // Tap anywhere on cover also opens
      triggerOpen()
    }
    endInteraction()
  }

  const handlePointerLeave = () => {
    if (!isFlipped) {
      setBend(0)
      setProgress(0)
    }
    setTimeout(() => setIsInteracting(false), 100)
  }

  return (
    <div className={`intro-overlay ${isFading ? "intro-fade-out" : ""}`}>
      {/* Golden particles */}
      <div className="particles">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`dot d${(i % 8) + 1}`} />
        ))}
      </div>

      {/* Floating stickers */}
      <div className="floating-ui">
        <div className="sticker-floating pre">{t("intro_flip.pre_order")}</div>
        <div className="sticker-floating limited">{t("intro_flip.limited_issue")}</div>
      </div>

      <div
        className={`magazine-stage ${isFlipped ? "open" : ""}`}
        style={
          {
            "--bend": bend,
            "--progress": progress,
            "--tiltX": tilt.x,
            "--tiltY": tilt.y,
          } as CSSProperties
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <div
          className={`book ${
            isInteracting ? "interacting" : ""
          } ${isFlipped ? "no-breath" : ""}`}
        >
          <div className="inner-page" />
          <div className="spine" />
          <div className="page-block" />

          <div className="cover">
            {/* dual gloss */}
            <div className="gloss-soft" />
            <div className="gloss-sweep" />

            {/* curl shading */}
            <div className="page-bend-layer" />

            <div className="cover-img-wrap">
              <img src="/Cover.webp" className="cover-img" alt="Magazine cover" />
            </div>

            <div className="swipe-text">{t("intro_flip.swipe_to_open")}</div>
          </div>
        </div>

        <div className="floor-shadow" />
      </div>
    </div>
  )
}
