// Thai phone number validation (10 digits starting with 0)
export const validateThaiPhone = (phone: string): boolean => {
  const phoneRegex = /^0\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ""))
}

// 5-digit postal code validation
export const validatePostalCode = (code: string): boolean => {
  return /^\d{5}$/.test(code)
}

// Maximum file size: 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

// File validation for payment slip
export const validatePaymentSlipFile = (file: File): { valid: boolean; error?: string } => {
  const acceptedTypes = ["image/jpeg", "image/png", "application/pdf", "image/heic"]
  
  // Check file type
  if (!acceptedTypes.includes(file.type)) {
    return { valid: false, error: "file_type_invalid" }
  }
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "file_too_large" }
  }
  
  return { valid: true }
}
