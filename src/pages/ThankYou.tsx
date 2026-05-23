"use client"

import { useLayoutEffect, useState } from "react"
import { Link } from "react-router-dom"
import ThankYouMessage from "../components/ThankYouMessage"
import { useMetaTags } from "../hooks/useMetaTags"

export default function ThankYou() {
  // Resolve order state synchronously on first render so the prerender captures
  // the correct UI and there is no redirect-induced flash for real users.
  const [orderFound] = useState(() => {
    let formData = sessionStorage.getItem("lastFormData")

    if (!formData) {
      const lastOrder = localStorage.getItem("lastOrder")
      if (lastOrder) {
        try {
          const orderData = JSON.parse(lastOrder)
          formData = JSON.stringify(orderData.formData)
          sessionStorage.setItem("lastFormData", formData)
          sessionStorage.setItem("lastOrderNumber", orderData.orderNumber || "")
        } catch (error) {
          console.error("Error parsing order data from localStorage:", error)
        }
      }
    }

    return !!formData
  })

  useMetaTags(
    "Thank You - Now or Never Magazine",
    "Thank you for your order. Your copy of Now or Never Magazine is on its way.",
    "/Cover.webp",
    "website"
  )

  useLayoutEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  if (!orderFound) {
    return (
      <div
        className="pt-28 md:pt-32 pb-16 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        <div className="text-center px-4 max-w-xl">
          <h1
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
            style={{ color: "#F5F5F5" }}
          >
            Order Not Found
          </h1>
          <p
            className="text-base md:text-lg mb-8 font-sans"
            style={{ color: "#E0E0E0" }}
          >
            We couldn't find an order linked to this session. If you just completed
            a purchase, please contact us at info@nowornevermagazine.com.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-green-primary text-white font-sans font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return <ThankYouMessage />
}
