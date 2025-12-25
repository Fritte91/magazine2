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
  "Amnat Charoen",
  "Ang Thong",
  "Bangkok",
  "Bueng Kan",
  "Buriram",
  "Chachoengsao",
  "Chai Nat",
  "Chaiyaphum",
  "Chanthaburi",
  "Chiang Mai",
  "Chiang Rai",
  "Chonburi",
  "Chumphon",
  "Kalasin",
  "Kamphaeng Phet",
  "Kanchanaburi",
  "Khon Kaen",
  "Krabi",
  "Lampang",
  "Lamphun",
  "Loei",
  "Lopburi",
  "Mae Hong Son",
  "Maha Sarakham",
  "Mukdahan",
  "Nakhon Nayok",
  "Nakhon Pathom",
  "Nakhon Phanom",
  "Nakhon Ratchasima",
  "Nakhon Sawan",
  "Nakhon Si Thammarat",
  "Nan",
  "Narathiwat",
  "Nong Bua Lamphu",
  "Nong Khai",
  "Nonthaburi",
  "Pathum Thani",
  "Pattani",
  "Phang Nga",
  "Phatthalung",
  "Phayao",
  "Phetchabun",
  "Phetchaburi",
  "Phichit",
  "Phitsanulok",
  "Phra Nakhon Si Ayutthaya",
  "Phrae",
  "Phuket",
  "Prachinburi",
  "Prachuap Khiri Khan",
  "Ranong",
  "Ratchaburi",
  "Rayong",
  "Roi Et",
  "Sa Kaeo",
  "Sakon Nakhon",
  "Samut Prakan",
  "Samut Sakhon",
  "Samut Songkhram",
  "Saraburi",
  "Satun",
  "Sing Buri",
  "Sisaket",
  "Songkhla",
  "Sukhothai",
  "Suphan Buri",
  "Surat Thani",
  "Surin",
  "Tak",
  "Trang",
  "Trat",
  "Ubon Ratchathani",
  "Udon Thani",
  "Uthai Thani",
  "Uttaradit",
  "Yala",
  "Yasothon"
];


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
          paymentFile: t("checkout.errors.file_type_invalid"),
        }))
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = t("checkout.errors.full_name_required")
    if (!formData.email.trim()) newErrors.email = t("checkout.errors.email_required")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t("checkout.errors.email_invalid")
    if (!validateThaiPhone(formData.phone))
      newErrors.phone = t("checkout.errors.phone_invalid")
    if (!formData.province) newErrors.province = t("checkout.errors.province_required")
    if (!formData.district.trim()) newErrors.district = t("checkout.errors.district_required")
    if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = t("checkout.errors.postal_code_invalid")
    if (!formData.address.trim()) newErrors.address = t("checkout.errors.address_required")
    if (!paymentFile) newErrors.paymentFile = t("checkout.errors.payment_slip_required")

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
    })
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

      // Prepare form data for submission to Make.com webhook
      const webhookUrl = import.meta.env.VITE_ORDER_WEBHOOK_URL
      
      if (webhookUrl) {
        // Convert payment slip file to base64
        let paymentSlipBase64: string | null = null
        let paymentSlipFileName: string | null = null
        let paymentSlipMimeType: string | null = null
        
        if (paymentFile) {
          paymentSlipBase64 = await fileToBase64(paymentFile)
          paymentSlipFileName = paymentFile.name
          paymentSlipMimeType = paymentFile.type
        }
        
        // Create JSON payload with base64 image
        const payload = {
          orderNumber,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          province: formData.province,
          district: formData.district,
          postalCode: formData.postalCode,
          address: formData.address,
          notes: formData.notes || '',
          paymentSlip: paymentSlipBase64,
          paymentSlipFileName: paymentSlipFileName,
          paymentSlipMimeType: paymentSlipMimeType,
          timestamp: new Date().toISOString(),
          totalAmount: '1420',
          currency: 'THB'
        }
        
        // Send to Make.com webhook as JSON
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        
        if (!response.ok) {
          throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`)
        }
        
        console.log("Order submitted successfully to webhook:", orderNumber)
      } else {
        // Development mode - log to console
        console.log("Order Data (webhook not configured):", {
          orderNumber,
          ...formData,
          paymentSlip: paymentFile?.name
        })
        // Simulate successful submission
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      // Redirect to thank you
      window.location.href = "/thank-you"
    } catch (error) {
      console.error("Submission error:", error)
      setErrors({ submit: t("checkout.errors.submit_failed") })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      {/* Customer Info Section */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg border-2 border-charcoal/5 hover:border-charcoal/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4 pb-2 md:pb-3 border-b-2 border-charcoal/10">
          <div className="w-1 h-5 md:h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, rgb(212, 175, 55), rgb(255, 193, 7))' }}></div>
          <h3 className="text-base md:text-lg lg:text-xl font-serif font-bold text-charcoal">{t("checkout.customer_info")}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.full_name")} *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {errors.fullName && <p className="text-red-600 text-xs mt-1 font-medium">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.email")} *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {errors.email && <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.phone")} *</label>
            <input
              type="tel"
              name="phone"
              placeholder="0812345678"
              value={formData.phone}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md"
              inputMode="numeric"
            />
            {errors.phone && <p className="text-red-600 text-xs mt-1 font-medium">{errors.phone}</p>}
          </div>

          {/* Province */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.province")} *</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="">{t("checkout.select_province")}</option>
              {thaiProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.province && <p className="text-red-600 text-xs mt-1 font-medium">{errors.province}</p>}
          </div>

          {/* District */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.district")} *</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {errors.district && <p className="text-red-600 text-xs mt-1 font-medium">{errors.district}</p>}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.postal_code")} *</label>
            <input
              type="text"
              name="postalCode"
              placeholder="12345"
              maxLength={5}
              value={formData.postalCode}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md"
              inputMode="numeric"
            />
            {errors.postalCode && <p className="text-red-600 text-xs mt-1 font-medium">{errors.postalCode}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.address")} *</label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md resize-none"
            />
            {errors.address && <p className="text-red-600 text-xs mt-1 font-medium">{errors.address}</p>}
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold mb-1.5 text-charcoal/80 uppercase tracking-wide">{t("checkout.notes")}</label>
            <textarea
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              className="checkout-input w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-charcoal/15 bg-white text-charcoal focus:outline-none rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md resize-none"
            />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg border-2 border-charcoal/5 hover:border-charcoal/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4 pb-2 md:pb-3 border-b-2 border-charcoal/10">
          <div className="w-1 h-5 md:h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, rgb(212, 175, 55), rgb(255, 193, 7))' }}></div>
          <h3 className="text-base md:text-lg lg:text-xl font-serif font-bold text-charcoal">{t("checkout.payment")}</h3>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-lg md:rounded-xl mb-4 md:mb-5 border-2 shadow-sm relative overflow-hidden" style={{ borderColor: '#e5e5e5' }}>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #d4d4d4, transparent)' }}></div>
              <p className="text-xs font-bold uppercase tracking-wider px-2 md:px-3" style={{ color: '#1e1e1e' }}>{t("checkout.scan_qr")}</p>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #d4d4d4, transparent)' }}></div>
            </div>
            <div className="flex justify-center mb-2 md:mb-3">
              <div className="bg-white p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg border-2" style={{ borderColor: '#e5e5e5' }}>
                <img
                  src="/qr.jfif"
                  alt="QR Payment Code"
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg"
                />
              </div>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-center" style={{ color: '#1e1e1e' }}>฿1420</p>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#1e1e1e' }}>
            {t("checkout.upload_slip")} * <span className="normal-case font-normal text-xs" style={{ color: '#787878' }}>{t("checkout.file_types")}</span>
          </label>
          <div className="checkout-upload border-2 border-dashed p-3 md:p-4 text-center cursor-pointer transition-all duration-300 rounded-lg group relative overflow-hidden bg-white" style={{ borderColor: '#d4d4d4' }}>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.heic"
              className="hidden"
              id="payment-file"
            />
            <label htmlFor="payment-file" className="cursor-pointer relative z-10 block">
              {paymentFile ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e1e1e' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-semibold truncate" style={{ color: '#1e1e1e' }}>{paymentFile.name}</p>
                  <span className="text-xs ml-1" style={{ color: '#787878' }}>{t("checkout.click_to_change")}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg transition-colors duration-300" style={{ backgroundColor: '#f5f5f5' }}>
                    <svg className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e1e1e' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: '#1e1e1e' }}>{t("checkout.click_to_upload")}</p>
                    <p className="text-xs" style={{ color: '#787878' }}>{t("checkout.file_types_short")}</p>
                  </div>
                </div>
              )}
            </label>
          </div>
          {errors.paymentFile && <p className="text-red-600 text-xs mt-2 font-medium">{errors.paymentFile}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        {errors.submit && <div className="mb-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg"><p className="text-red-600 text-xs font-medium text-center">{errors.submit}</p></div>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="checkout-submit-btn w-full py-3 md:py-3.5 text-white font-serif text-sm tracking-wider active:scale-[0.98] transition-all duration-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed touch-none rounded-lg shadow-xl font-bold relative overflow-hidden"
          style={{
            background: 'linear-gradient(to right, rgb(30, 30, 30), rgba(30, 30, 30, 0.95))'
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t("checkout.processing")}</span>
              </>
            ) : (
              <>
                <span>{t("checkout.submit_order")}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
          <div className="absolute inset-0 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, rgb(212, 175, 55), rgb(255, 193, 7))', opacity: 0 }}></div>
        </button>
        
        {/* Pre-order Notice */}
        <div className="mt-4 p-3 md:p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-red-600 text-xs md:text-sm font-medium text-center leading-relaxed mb-2">
            <strong>EN:</strong> {t("checkout.pre_order_notice.en")}
          </p>
          <p className="text-red-600 text-xs md:text-sm font-medium text-center leading-relaxed">
            <strong>TH:</strong> {t("checkout.pre_order_notice.th")}
          </p>
        </div>
      </div>
      <style>{`
        .checkout-input:focus {
          border-color: #1e1e1e !important;
          box-shadow: 0 0 0 2px rgba(30, 30, 30, 0.1) !important;
        }
        .checkout-input:hover {
          border-color: #787878 !important;
        }
        .checkout-upload:hover {
          background-color: #fafafa !important;
          border-color: #1e1e1e !important;
        }
        .checkout-submit-btn:hover {
          background: linear-gradient(to right, rgb(212, 175, 55), rgb(255, 193, 7)) !important;
          color: rgb(30, 30, 30) !important;
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3) !important;
        }
        .checkout-submit-btn:hover .absolute.inset-0 {
          opacity: 1 !important;
        }
      `}</style>
    </form>
  )
}
