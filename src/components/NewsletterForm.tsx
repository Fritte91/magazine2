import { useState } from "react"
import { useI18n } from "../i18n/i18nContext"

interface FormData {
  email: string
}

export default function NewsletterForm() {
  const { t } = useI18n()
  const [formData, setFormData] = useState<FormData>({ email: "" })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value })
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Prepare data for webhook
      const webhookData = {
        email: formData.email,
        timestamp: new Date().toISOString(),
        source: "newsletter_form"
      }

      // Send to Make.com webhook if URL is configured
      const webhookUrl = import.meta.env.VITE_NEWSLETTER_WEBHOOK_URL || undefined
      
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        })

        if (!response.ok) {
          throw new Error('Failed to submit newsletter subscription')
        }
      } else {
        // Development mode - log to console
        console.log("Newsletter submission (webhook not configured):", webhookData)
      }

      setSubmitted(true)
      setFormData({ email: "" })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      console.error("Newsletter submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Enhanced decorative divider lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal/20 to-transparent blur-[1px]"></div>
      </div>
      
      {/* Main container with premium background */}
      <div 
        className="relative py-12 md:py-14 lg:py-16"
        style={{ 
          backgroundColor: 'rgba(252, 250, 248, 0.5)',
          backgroundImage: `linear-gradient(135deg, rgba(252, 250, 248, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)`
        }}
      >
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--charcoal)) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        ></div>

        {/* Content */}
        <div className="container-padding max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Left: Text content */}
            <div className="flex-1 text-center md:text-left">
              <h3 
                className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 tracking-tight"
                style={{ color: '#1e1e1e' }}
              >
                {t("newsletter.title")}
              </h3>
              <p 
                className="text-sm md:text-base font-sans leading-relaxed"
                style={{ color: '#1e1e1e', opacity: 0.85 }}
              >
                {t("newsletter.description")}
              </p>
            </div>

            {/* Right: Form */}
            <div className="flex-1 w-full md:max-w-lg">
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Email input */}
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      name="email"
                      placeholder={t("newsletter.placeholder_email")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting || submitted}
                      className="w-full px-5 md:px-6 py-3.5 md:py-4 border-2 bg-white text-charcoal placeholder-charcoal/45 focus:outline-none text-sm md:text-base rounded-md transition-all duration-300 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        borderColor: 'rgba(30, 30, 30, 0.2)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(30, 30, 30, 0.4)'
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(30, 30, 30, 0.2)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)'
                      }}
                    />
                  </div>

                  {/* Join button - Vibrant Orange */}
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="px-8 md:px-10 py-3.5 md:py-4 text-white font-sans font-semibold text-sm md:text-base tracking-wide active:scale-[0.98] transition-all duration-300 uppercase whitespace-nowrap rounded-md disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                    style={{
                      backgroundColor: '#FF9800',
                      letterSpacing: "0.1em",
                      boxShadow: "0 4px 14px rgba(255, 152, 0, 0.35)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF8F00'
                      e.currentTarget.style.boxShadow = "0 6px 24px rgba(255, 152, 0, 0.5)"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF9800'
                      e.currentTarget.style.boxShadow = "0 4px 14px rgba(255, 152, 0, 0.35)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    {/* Button shine effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        </>
                      ) : submitted ? (
                        <span className="text-lg">✓</span>
                      ) : (
                        t("newsletter.submit")
                      )}
                    </span>
                  </button>
                </div>

                {/* Success message */}
                {submitted && (
                  <p 
                    className="mt-3 text-xs md:text-sm font-sans font-medium text-center sm:text-left"
                    style={{ color: '#FF9800' }}
                  >
                    {t("newsletter.success")}
                  </p>
                )}

                {/* Error message */}
                {error && (
                  <p className="mt-3 text-xs md:text-sm text-red-600 font-sans font-medium text-center sm:text-left">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Enhanced bottom decorative divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal/20 to-transparent blur-[1px]"></div>
        </div>
      </div>
    </section>
  )
}
