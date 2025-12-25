import { Link } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"

export default function HeroSection() {
  const { t } = useI18n()
  
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16"
      style={{
        backgroundImage: "url('/hero-background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay for Better Contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.65) 100%)",
        }}
      />

      {/* Content Container - Centered */}
      <div className="container-padding max-w-7xl mx-auto relative z-10 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            {/* Main Headline */}
            <div>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.15] mb-4 md:mb-6"
                style={{
                  color: "#ffffff",
                  textShadow: "0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6)",
                }}
              >
                {t("hero.journey_title")}
              </h1>
            </div>

            {/* Thai Sub-headline */}
            <p
              className="text-lg md:text-xl font-sans font-medium"
              style={{
                color: "#ffffff",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
              }}
            >
              {t("hero.journey_subtitle_th")}
            </p>

            {/* English Tagline */}
            <p
              className="text-lg md:text-xl font-sans italic"
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
              }}
            >
              {t("hero.journey_tagline")}
            </p>

            {/* Divider */}
            <div className="w-16 h-px bg-white/40 my-6 md:my-8 mx-auto lg:mx-0"></div>

            {/* Description */}
            <p
              className="text-base md:text-lg leading-relaxed font-sans max-w-xl mx-auto lg:mx-0"
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              {t("hero.journey_description")}
            </p>

            {/* CTA Button - Premium Green Styling */}
            <div className="flex justify-center lg:justify-start pt-2">
              <Link
                to="/shop"
                className="inline-block px-10 py-4 md:py-5 font-sans font-bold text-base md:text-lg tracking-wider transition-all duration-300 rounded-lg uppercase"
                style={{
                  backgroundColor: "#225544",
                  color: "#ffffff",
                  letterSpacing: "0.1em",
                  boxShadow: "0 10px 30px rgba(34, 85, 68, 0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2d6b52"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(34, 85, 68, 0.7)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#225544"
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(34, 85, 68, 0.5)"
                }}
              >
                {t("hero.buy_button")}
              </Link>
            </div>

            {/* Limited Edition Badge */}
            <div className="flex justify-center lg:justify-start pt-2">
              <div
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-sans font-semibold tracking-wide"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                {t("hero.limited_badge")}
              </div>
            </div>
          </div>

          {/* Right Column: Single Magazine Cover - Centered */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Thai Text Above Cover */}
              <div className="mb-6 md:mb-8 text-center lg:text-right space-y-2">
                <p
                  className="text-sm md:text-base font-sans font-medium tracking-wide"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {t("hero.certificate_text")}
                </p>
                <p
                  className="text-sm md:text-base font-sans font-medium tracking-wide"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {t("hero.bookmark_text")}
                </p>
                <p
                  className="text-base md:text-lg font-sans font-semibold tracking-wide"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {t("hero.limited_text")}
                </p>
              </div>

              {/* Single Magazine Cover - Large and Prominent */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  <div
                    className="rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:rotate-1"
                    style={{
                      boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <img
                      src="/Cover.webp"
                      alt="Now or Never Magazine Cover"
                      className="w-full max-w-[260px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] h-auto block"
                      loading="eager"
                    />
                  </div>

                  {/* Decorative Glow Effect */}
                  <div
                    className="absolute -inset-6 rounded-3xl opacity-25 blur-3xl -z-10"
                    style={{
                      background: "linear-gradient(135deg, #225544 0%, #4caf50 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
