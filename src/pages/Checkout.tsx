import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"
import CheckoutForm from "../components/CheckoutForm"
import { isPreOrderOpen, formatPreOrderDate } from "../utils/shop"

export default function Checkout() {
  const navigate = useNavigate()
  const { t, language } = useI18n()
  const preOrderOpen = isPreOrderOpen()

  useEffect(() => {
    if (!preOrderOpen) {
      // Redirect to shop page if pre-orders are not open yet
      navigate("/shop", { replace: true })
    }
  }, [preOrderOpen, navigate])

  if (!preOrderOpen) {
    // Show a message while redirecting
    const preOrderDate = formatPreOrderDate(language)
    return (
      <div className="pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="container-padding max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="mb-6 text-charcoal">{t("shop.pre_order_closed")}</h1>
            <p className="text-lg text-charcoal/80 mb-8">
              {t("shop.pre_order_date")} {preOrderDate}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="container-padding max-w-4xl mx-auto">
        <h1 className="mb-12 md:mb-16 text-center">{t("checkout.page_title")}</h1>
        <CheckoutForm />
      </div>
    </div>
  )
}
