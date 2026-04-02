"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ThankYouMessage from "../components/ThankYouMessage"
import { useMetaTags } from "../hooks/useMetaTags"

export default function ThankYou() {
  const navigate = useNavigate()

  useMetaTags(
    "Thank You - Now or Never Magazine",
    "Thank you for your order. Your copy of Now or Never Magazine is on its way.",
    "/Cover.webp",
    "website"
  )

  useEffect(() => {
    // Try to get order data from sessionStorage first, then localStorage as fallback
    let formData = sessionStorage.getItem("lastFormData")
    let orderNumber = sessionStorage.getItem("lastOrderNumber")

    // If not in sessionStorage, try localStorage (survives tab close)
    if (!formData) {
      const lastOrder = localStorage.getItem("lastOrder")
      if (lastOrder) {
        try {
          const orderData = JSON.parse(lastOrder)
          formData = JSON.stringify(orderData.formData)
          orderNumber = orderData.orderNumber
          
          // Restore to sessionStorage for ThankYouMessage component
          sessionStorage.setItem("lastFormData", formData)
          sessionStorage.setItem("lastOrderNumber", orderNumber || "")
        } catch (error) {
          console.error("Error parsing order data from localStorage:", error)
        }
      }
    }

    // If still no data, redirect to home
    if (!formData) {
      navigate("/", { state: { error: "order_not_found" } })
    }
  }, [navigate])

  return <ThankYouMessage />
}
