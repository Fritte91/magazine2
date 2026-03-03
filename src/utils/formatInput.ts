/**
 * Input formatting utilities
 * Provides better UX for phone numbers and postal codes
 */

/**
 * Formats Thai phone number as user types
 * Input: 0812345678 -> Output: 081-234-5678
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')
  
  // Limit to 10 digits
  const limited = digits.slice(0, 10)
  
  // Format: 081-234-5678
  if (limited.length <= 3) {
    return limited
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`
  } else {
    return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6, 10)}`
  }
}

/**
 * Removes formatting from phone number for validation/storage
 * Input: 081-234-5678 -> Output: 0812345678
 */
export const unformatPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '')
}

/**
 * Formats postal code (5 digits only)
 * Input: 12345 -> Output: 12345 (no formatting, just validation)
 */
export const formatPostalCode = (value: string): string => {
  // Remove all non-digits and limit to 5
  return value.replace(/\D/g, '').slice(0, 5)
}
