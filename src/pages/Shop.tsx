import { Link } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"
import ProductCard from "../components/ProductCard"

export default function Shop() {
  const { t } = useI18n()
  const features = t("shop.features", []) as string[]

  // Ensure features is an array
  if (!Array.isArray(features)) {
    return null
  }

  return (
    <div className="pt-28 md:pt-32">
      <div className="container-padding max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-12 md:mb-16">
          {/* Product */}
          <div className="lg:col-span-2">
            <ProductCard image="/marketing.webp" title={t("shop.title")} features={features} />
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 md:top-32 bg-white border border-stone/15 p-6 md:p-8 rounded-xl h-fit shadow-lg">
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-6 text-charcoal">{t("checkout.title")}</h3>

              <div className="mb-8 aspect-[3/4] bg-white rounded-md overflow-hidden shadow-md border border-stone/10">
                <img src="/Cover.webp" alt="Magazine Cover" className="w-full h-full object-contain" />
              </div>

              <div className="space-y-4 border-y border-stone/20 py-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/80 text-sm md:text-base font-medium">{t("shop.title")}</span>
                  <span className="font-semibold text-charcoal">฿499</span>
                </div>
                <div className="flex justify-between items-center text-sm text-charcoal/70">
                  <span>Shipping (No Tracking)</span>
                  <span className="font-medium">฿0</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 text-lg md:text-xl font-serif font-bold text-charcoal border-t border-stone/20 pt-4">
                <span>Total:</span>
                <span>฿499</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-4 bg-charcoal text-white text-center font-serif text-sm tracking-wide hover:bg-charcoal/90 transition-all duration-300 uppercase rounded-md shadow-md hover:shadow-lg font-bold"
              >
                {t("shop.order_button")}
              </Link>

              <p className="text-xs text-charcoal/70 text-center mt-4 font-medium">Limited to 1000 copies available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
