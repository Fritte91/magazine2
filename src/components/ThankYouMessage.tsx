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
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 md:py-16">
      <div className="container-padding max-w-2xl w-full">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm tracking-widest uppercase text-stone mb-4">Order Confirmed</p>
          <h1 className="text-balance mb-4 md:mb-6">{t("thank_you.title")}</h1>
          <p className="text-base md:text-lg text-stone">{t("thank_you.confirmation_message")}</p>
        </div>

        {/* Order Number */}
        {orderDetails && (
          <div className="bg-stone/5 p-8 md:p-12 rounded-lg mb-12 md:mb-16">
            <p className="text-sm text-stone mb-2">{t("thank_you.order_number")}:</p>
            <p className="text-2xl md:text-4xl font-serif font-bold mb-8 tracking-tight">{orderDetails.number}</p>

            {/* Order Summary */}
            <div className="space-y-4 border-y border-stone/20 py-6">
              <div className="flex justify-between">
                <span className="text-stone">Name:</span>
                <span className="font-semibold">{orderDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone">Email:</span>
                <span className="font-semibold text-sm">{orderDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone">Phone:</span>
                <span className="font-semibold">{orderDetails.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone">Shipping Address:</span>
                <span className="font-semibold text-right text-sm">{orderDetails.address}</span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white border border-stone/20 p-6 md:p-8 mb-12 md:mb-16">
          <h3 className="text-lg font-serif font-bold mb-4">What's Next?</h3>
          <ol className="space-y-3 text-sm md:text-base text-stone">
            <li className="flex gap-3">
              <span className="font-semibold text-charcoal flex-shrink-0">1.</span>
              <span>We've received your payment and will process your order within 2 business days.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-charcoal flex-shrink-0">2.</span>
              <span>You'll receive a confirmation email with tracking information.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-charcoal flex-shrink-0">3.</span>
              <span>Your magazine will be shipped via Thai Post. Delivery typically takes 3-5 business days.</span>
            </li>
          </ol>
        </div>

        {/* CTA Button */}
        <Link
          to="/"
          className="block w-full py-4 md:py-5 bg-charcoal text-white text-center font-serif text-base md:text-lg tracking-wide hover:bg-opacity-90 transition-all duration-300 uppercase"
        >
          {t("thank_you.back_home")}
        </Link>

        {/* Contact Info */}
        <p className="text-center text-sm text-stone mt-8">Questions? Contact us at hello@nowornever.com</p>
      </div>
    </div>
  )
}
