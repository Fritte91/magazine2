"use client"

import { Link } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"
import { useState, useEffect } from "react"

interface OrderDetails {
  number: string
  name: string
  email: string
  phone: string
  address: string
}

export default function ThankYouMessage() {
  const { t } = useI18n()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Get order number from session storage
    const orderNumber = sessionStorage.getItem("lastOrderNumber")
    if (orderNumber) {
      // In a real app, you would fetch order details from your backend
      const storedFormData = sessionStorage.getItem("lastFormData")
      const formData = storedFormData ? JSON.parse(storedFormData) : {}

      setOrderDetails({
        number: orderNumber,
        name: formData.fullName || "Customer",
        email: formData.email || "",
        phone: formData.phone || "",
        address: formData.address || "",
      })
    }
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className="thank-you-page min-h-screen flex items-center justify-center py-12 md:py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
      <div className={`container-padding max-w-3xl w-full transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Success Icon & Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Checkmark Circle */}
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 rounded-full bg-charcoal/5 border-2 border-charcoal/15 relative">
            <svg 
              className="w-10 h-10 md:w-12 md:h-12 text-charcoal transform transition-all duration-500 delay-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-stone font-medium mb-4 md:mb-6 letter-spacing-wide" style={{ color: '#787878' }}>
            Order Confirmed
          </p>
          <h1 className="text-balance mb-5 md:mb-7 leading-[1.1] tracking-tight text-charcoal" style={{ color: '#1e1e1e' }}>
            {t("thank_you.title")}
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#505050' }}>
            {t("thank_you.confirmation_message")}
          </p>
        </div>

        {/* Order Number Card */}
        {orderDetails && (
          <div className="thank-you-card bg-white border p-8 md:p-12 rounded-lg mb-8 md:mb-12 shadow-sm hover:shadow-lg transition-all duration-500" style={{ borderColor: '#e5e5e5' }}>
            <div className="mb-8">
              <p className="text-xs md:text-sm tracking-wide uppercase mb-3 font-semibold" style={{ color: '#787878' }}>
                {t("thank_you.order_number")}
              </p>
              <p className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-none" style={{ color: '#1e1e1e' }}>
                {orderDetails.number}
              </p>
            </div>

            {/* Order Summary */}
            <div className="space-y-5 border-t border-b py-7 md:py-8" style={{ borderColor: '#e5e5e5' }}>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                <span className="text-sm md:text-base font-semibold uppercase tracking-wide" style={{ color: '#1e1e1e' }}>Name</span>
                <span className="text-base md:text-lg font-bold sm:text-right leading-relaxed" style={{ color: '#1e1e1e' }}>
                  {orderDetails.name}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                <span className="text-sm md:text-base font-semibold uppercase tracking-wide" style={{ color: '#1e1e1e' }}>Email</span>
                <span className="text-base md:text-lg font-bold sm:text-right leading-relaxed break-all" style={{ color: '#1e1e1e' }}>
                  {orderDetails.email}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                <span className="text-sm md:text-base font-semibold uppercase tracking-wide" style={{ color: '#1e1e1e' }}>Phone</span>
                <span className="text-base md:text-lg font-bold sm:text-right leading-relaxed" style={{ color: '#1e1e1e' }}>
                  {orderDetails.phone}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                <span className="text-sm md:text-base font-semibold uppercase tracking-wide" style={{ color: '#1e1e1e' }}>Shipping Address</span>
                <span className="text-base md:text-lg font-bold sm:text-right leading-relaxed max-w-md sm:ml-auto" style={{ color: '#1e1e1e' }}>
                  {orderDetails.address}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="thank-you-card bg-white border p-7 md:p-10 mb-8 md:mb-12 rounded-lg shadow-sm" style={{ borderColor: '#e5e5e5' }}>
          <h3 className="text-xl md:text-2xl font-serif font-bold mb-6 md:mb-8 tracking-tight" style={{ color: '#1e1e1e' }}>
            What's Next?
          </h3>
          <ol className="space-y-5 md:space-y-6">
            <li className="flex gap-4 md:gap-5 items-start">
              <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base font-bold mt-0.5" style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                1
              </span>
              <span className="text-base md:text-lg leading-relaxed pt-0.5" style={{ color: '#1e1e1e' }}>
                We've received your payment and will process your order within <strong className="font-bold">2 business days</strong>.
              </span>
            </li>
            <li className="flex gap-4 md:gap-5 items-start">
              <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base font-bold mt-0.5" style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                2
              </span>
              <span className="text-base md:text-lg leading-relaxed pt-0.5" style={{ color: '#1e1e1e' }}>
                You'll receive a <strong className="font-bold">confirmation email</strong> with tracking information.
              </span>
            </li>
            <li className="flex gap-4 md:gap-5 items-start">
              <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base font-bold mt-0.5" style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                3
              </span>
              <span className="text-base md:text-lg leading-relaxed pt-0.5" style={{ color: '#1e1e1e' }}>
                Your magazine will be shipped via <strong className="font-bold">Thai Post</strong>. Delivery typically takes <strong className="font-bold">3-5 business days</strong>.
              </span>
            </li>
          </ol>
        </div>

        {/* CTA Button */}
        <Link
          to="/"
          className="group block w-full py-5 md:py-6 text-white text-center font-serif text-base md:text-lg tracking-wide transition-all duration-300 uppercase shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mb-8 md:mb-10 rounded-sm"
          style={{ backgroundColor: '#1e1e1e' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e1e1e'}
        >
          {t("thank_you.back_home")}
        </Link>

        {/* Contact Info */}
        <p className="text-center text-sm md:text-base leading-relaxed" style={{ color: '#787878' }}>
          Questions? Contact us at{' '}
          <a 
            href="mailto:hello@nowornever.com" 
            className="font-semibold underline underline-offset-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: '#1e1e1e' }}
          >
            hello@nowornever.com
          </a>
        </p>
      </div>
      <style>{`
        .thank-you-page {
          background-color: #ffffff !important;
        }
        .thank-you-card {
          background-color: #ffffff !important;
        }
      `}</style>
    </div>
  )
}
