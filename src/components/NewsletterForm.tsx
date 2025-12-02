import { useState } from "react"
import { useI18n } from "../i18n/i18nContext"

interface FormData {
  name: string
  email: string
}

export default function NewsletterForm() {
  const { t } = useI18n()
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter submission:", formData)
    // TODO: Connect to Make.com webhook
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", email: "" })
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative">
      <div className="container-padding max-w-2xl mx-auto text-center">
        {/* Large, Bold Heading */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-charcoal mb-6 md:mb-8 leading-tight">
          {t("newsletter.title")}
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-charcoal mb-10 md:mb-12 font-sans leading-relaxed">
          {t("newsletter.description")}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="text"
            name="name"
            placeholder={t("newsletter.placeholder_name")}
            value={formData.name}
            onChange={handleChange}
            required
            className="flex-1 px-5 md:px-6 py-4 md:py-5 border-2 border-charcoal/30 bg-white text-charcoal placeholder-stone/60 focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 text-base md:text-lg rounded-md transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder={t("newsletter.placeholder_email")}
            value={formData.email}
            onChange={handleChange}
            required
            className="flex-1 px-5 md:px-6 py-4 md:py-5 border-2 border-charcoal/30 bg-white text-charcoal placeholder-stone/60 focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 text-base md:text-lg rounded-md transition-all"
          />
          <button
            type="submit"
            className="px-8 md:px-10 py-4 md:py-5 bg-charcoal text-white font-sans font-bold text-base md:text-lg tracking-wide hover:bg-charcoal/90 active:scale-95 transition-all duration-300 uppercase whitespace-nowrap rounded-md shadow-lg hover:shadow-xl"
          >
            {submitted ? "Subscribed!" : t("newsletter.submit")}
          </button>
        </form>
      </div>
    </section>
  )
}
