import { useI18n } from "../i18n/i18nContext"

export default function GoogleForm() {
  const { t } = useI18n()

  return (
    <div className="pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="container-padding max-w-4xl mx-auto">
        <h1 className="text-center mb-4">{t("nav.contact")}</h1>
        <p className="text-center text-stone mb-12 md:mb-16">{t("contact.description")}</p>

        {/* Embedded Google Form */}
        <div className="bg-white border border-stone/20 p-6 md:p-8 rounded-lg">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfZ-N5ZzqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXq/viewform?embedded=true"
            width="100%"
            height="500"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            className="rounded"
          >
            {t("contact.loading")}
          </iframe>
        </div>

        <p className="text-center text-sm text-stone mt-8">
          {t("contact.iframe_note")}
        </p>
      </div>
    </div>
  )
}
