// Thai phone number validation (10 digits starting with 0)
export const validateThaiPhone = (phone: string): boolean => {
  const phoneRegex = /^0\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ""))
}

// 5-digit postal code validation
export const validatePostalCode = (code: string): boolean => {
  return /^\d{5}$/.test(code)
}

// File validation for payment slip
export const validatePaymentSlipFile = (file: File): boolean => {
  const acceptedTypes = ["image/jpeg", "image/png", "application/pdf", "image/heic"]
  return acceptedTypes.includes(file.type)
}
