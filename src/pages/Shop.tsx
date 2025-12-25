import { Link } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"
import ProductCard from "../components/ProductCard"
import { isPreOrderOpen, formatPreOrderDate } from "../utils/shop"

export default function Shop() {
  const { t, language } = useI18n()
  const features = t("shop.features", []) as string[]
  const preOrderOpen = isPreOrderOpen()
  const preOrderDate = formatPreOrderDate(language)

  // Ensure features is an array
  if (!Array.isArray(features)) {
    return null
  }

  return (
    <div className="shop-page pt-28 md:pt-32 relative">
      <div className="container-padding max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-12 md:mb-16">
          {/* Product */}
          <div className="lg:col-span-2">
            <ProductCard image="/marketing.webp" title={t("shop.title")} features={features} />
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="shop-card sticky top-28 md:top-32 bg-white border-2 border-charcoal/10 p-6 md:p-8 rounded-2xl h-fit shadow-2xl transition-all duration-500 group relative overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/5 via-transparent to-yellow-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Accent border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 transition-all duration-500 pointer-events-none" style={{ borderColor: 'transparent' }}></div>
              
              <div className="relative z-10">
                <h3 className="shop-title text-xl md:text-2xl font-serif font-bold mb-6 text-charcoal transition-colors duration-300">{t("checkout.title")}</h3>

                <div className="shop-cover mb-8 aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-xl border-2 transition-all duration-500" style={{ borderColor: 'rgba(30, 30, 30, 0.1)' }}>
                  <img src="/Cover.webp" alt="Magazine Cover" className="w-full h-full object-contain transition-transform duration-500" loading="lazy" />
                </div>

                <div className="shop-border space-y-4 border-y-2 py-5 mb-6 transition-colors duration-300" style={{ borderColor: 'rgba(30, 30, 30, 0.1)' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal/80 text-sm md:text-base font-medium">{t("shop.title")}</span>
                    <span className="shop-price font-bold text-lg text-charcoal transition-colors duration-300">฿1420</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-charcoal/70">
                    <span>Shipping (No Tracking)</span>
                    <span className="font-semibold text-green-primary">FREE</span>
                  </div>
                </div>

                <div className="shop-total flex justify-between items-center mb-8 text-lg md:text-xl font-serif font-bold text-charcoal border-t-2 pt-5 transition-colors duration-300" style={{ borderColor: 'rgba(30, 30, 30, 0.1)' }}>
                  <span>Total:</span>
                  <span className="shop-total-price text-2xl transition-colors duration-300">฿1420</span>
                </div>

                {preOrderOpen ? (
                  <Link
                    to="/checkout"
                    className="shop-button block w-full py-4 text-white text-center font-serif text-sm tracking-wide transition-all duration-300 uppercase rounded-xl shadow-lg font-bold transform relative overflow-hidden"
                  >
                    <span className="relative z-10">{t("shop.order_button")}</span>
                  </Link>
                ) : (
                  <div className="space-y-4">
                    <div className="shop-button-disabled block w-full py-4 text-white text-center font-serif text-sm tracking-wide uppercase rounded-xl shadow-lg font-bold relative overflow-hidden cursor-not-allowed opacity-60"
                      style={{
                        background: 'linear-gradient(to right, rgb(100, 100, 100), rgba(100, 100, 100, 0.95))'
                      }}
                    >
                      <span className="relative z-10">{t("shop.order_button")}</span>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-charcoal/5 to-charcoal/10 rounded-lg border-2 border-charcoal/20">
                      <p className="text-sm text-charcoal/90 text-center font-semibold mb-2">
                        {t("shop.pre_order_closed")}
                      </p>
                      <p className="text-xs text-charcoal/70 text-center">
                        {t("shop.pre_order_date")} {preOrderDate}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-5 p-3 bg-gradient-to-r from-gold-accent/10 to-yellow-accent/10 rounded-lg border border-gold-accent/20">
                  <p className="text-xs text-charcoal/80 text-center font-semibold">
                    <span className="text-gold-accent font-bold">⚡ Limited Edition:</span> Only 420 copies available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .shop-page {
          background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 50%, #2a2a2a 100%) !important;
          background-image: 
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0),
            radial-gradient(circle at 18px 18px, rgba(255,255,255,0.02) 1px, transparent 0) !important;
          background-size: 40px 40px, 80px 80px !important;
          background-position: 0 0, 20px 20px !important;
        }
        .shop-card:hover {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3) !important;
        }
        .shop-card:hover .absolute.inset-0.rounded-2xl {
          border-color: rgba(212, 175, 55, 0.3) !important;
        }
        .shop-card:hover .shop-title {
          color: rgb(212, 175, 55) !important;
        }
        .shop-card:hover .shop-cover {
          border-color: rgba(212, 175, 55, 0.4) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
          transform: scale(1.02);
        }
        .shop-card:hover .shop-cover img {
          transform: scale(1.05);
        }
        .shop-card:hover .shop-border {
          border-color: rgba(212, 175, 55, 0.3) !important;
        }
        .shop-card:hover .shop-price {
          color: rgb(212, 175, 55) !important;
        }
        .shop-card:hover .shop-total {
          border-color: rgba(212, 175, 55, 0.3) !important;
        }
        .shop-card:hover .shop-total-price {
          color: rgb(212, 175, 55) !important;
        }
        .shop-button {
          background: linear-gradient(to right, rgb(30, 30, 30), rgba(30, 30, 30, 0.95)) !important;
          color: rgb(255, 255, 255) !important;
          text-decoration: none !important;
        }
        .shop-button:hover {
          background: linear-gradient(to right, rgb(212, 175, 55), rgb(255, 193, 7)) !important;
          color: rgb(30, 30, 30) !important;
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3) !important;
          transform: scale(1.02);
          text-decoration: none !important;
        }
        .shop-button:visited {
          color: rgb(255, 255, 255) !important;
        }
        .shop-button:visited:hover {
          color: rgb(30, 30, 30) !important;
        }
        .shop-button:active {
          transform: scale(0.98);
        }
        .shop-button:focus {
          outline: none !important;
        }
        .shop-button-disabled {
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
