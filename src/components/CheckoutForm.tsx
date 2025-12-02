import type React from "react"

import { useState } from "react"
import { useI18n } from "../i18n/i18nContext"
import { validateThaiPhone, validatePostalCode, validatePaymentSlipFile } from "../utils/validation"
import { generateOrderNumber } from "./OrderNumberGenerator"

interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  province: string
  district: string
  postalCode: string
  address: string
  notes: string
}

const thaiProvinces = [
  "Bangkok",
  "Phetchaburi",
  "Prachuap Khiri Khan",
  "Chumphon",
  "Ranong",
  "Phang Nga",
  "Phuket",
  "Krabi",
  "Trang",
  "Satun",
]

export default function CheckoutForm() {
  const { t } = useI18n()
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    province: "",
    district: "",
    postalCode: "",
    address: "",
    notes: "",
  })
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (validatePaymentSlipFile(file)) {
        setPaymentFile(file)
        if (errors.paymentFile) {
          setErrors((prev) => ({ ...prev, paymentFile: "" }))
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          paymentFile: "Invalid file type. Please upload JPG, PNG, PDF, or HEIC.",
        }))
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address"
    if (!validateThaiPhone(formData.phone))
      newErrors.phone = "Invalid Thai phone number (should be 10 digits starting with 0)"
    if (!formData.province) newErrors.province = "Province is required"
    if (!formData.district.trim()) newErrors.district = "District is required"
    if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = "Postal code must be 5 digits"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!paymentFile) newErrors.paymentFile = "Payment slip is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const orderNumber = generateOrderNumber()

      // Store form data for thank you page
      sessionStorage.setItem("lastFormData", JSON.stringify(formData))
      sessionStorage.setItem("lastOrderNumber", orderNumber)

      // Prepare form data for submission
      const submitData = {
        orderNumber,
        ...formData,
        paymentSlip: paymentFile,
      }

      console.log("Order Data:", submitData)
      // TODO: Connect to Make.com webhook with submitOrderToWebhook(submitData)

      // Simulate successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to thank you
      window.location.href = "/thank-you"
    } catch (error) {
      console.error("Submission error:", error)
      setErrors({ submit: "Failed to submit order. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Info Section */}
      <div>
        <h3 className="text-xl md:text-2xl font-serif mb-6">{t("checkout.customer_info")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">{t("checkout.full_name")} *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base md:text-lg"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">{t("checkout.email")} *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2">{t("checkout.phone")} *</label>
            <input
              type="tel"
              name="phone"
              placeholder="0812345678"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base"
              inputMode="numeric"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Province */}
          <div>
            <label className="block text-sm font-semibold mb-2">{t("checkout.province")} *</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base"
            >
              <option value="">Select Province</option>
              {thaiProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-semibold mb-2">{t("checkout.district")} *</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base"
            />
            {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-semibold mb-2">{t("checkout.postal_code")} *</label>
            <input
              type="text"
              name="postalCode"
              placeholder="12345"
              maxLength={5}
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base"
              inputMode="numeric"
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">{t("checkout.address")} *</label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">{t("checkout.notes")}</label>
            <textarea
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone/30 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal text-base"
            />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="border-t border-stone/20 pt-8">
        <h3 className="text-xl md:text-2xl font-serif mb-6">{t("checkout.payment")}</h3>

        <div className="bg-stone/5 p-6 md:p-8 rounded-lg mb-6">
          <p className="text-sm text-stone mb-4 text-center">Scan QR code to transfer ฿499</p>
          <div className="flex justify-center">
            <img
              src="/thai-payment-qr-code.jpg"
              alt="QR Payment Code"
              className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            {t("checkout.upload_slip")} * (JPG, PNG, PDF, or HEIC)
          </label>
          <div className="border-2 border-dashed border-stone/30 p-6 md:p-8 text-center cursor-pointer hover:bg-stone/5 hover:border-stone/50 transition-all">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.heic"
              className="hidden"
              id="payment-file"
            />
            <label htmlFor="payment-file" className="cursor-pointer">
              <p className="text-base text-charcoal font-semibold">
                {paymentFile ? `Selected: ${paymentFile.name}` : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-stone mt-2">PNG, JPG, PDF or HEIC</p>
            </label>
          </div>
          {errors.paymentFile && <p className="text-red-500 text-sm mt-2">{errors.paymentFile}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div>
        {errors.submit && <p className="text-red-500 text-sm mb-4 text-center">{errors.submit}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 md:py-5 bg-charcoal text-white font-serif text-base md:text-lg tracking-wide hover:bg-opacity-90 active:scale-95 transition-all duration-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed touch-none"
        >
          {isSubmitting ? "Submitting..." : t("checkout.submit_order")}
        </button>
      </div>
    </form>
  )
}
