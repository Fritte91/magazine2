"use client"

import { useEffect } from "react"
import ThankYouMessage from "../components/ThankYouMessage"

export default function ThankYou() {
  useEffect(() => {
    // Capture form data before clearing (if needed)
    const formData = sessionStorage.getItem("lastFormData")
    if (!formData) {
      // Redirect to home if no order data
      window.location.href = "/"
    }
  }, [])

  return <ThankYouMessage />
}
