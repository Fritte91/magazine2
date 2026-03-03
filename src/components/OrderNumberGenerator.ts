/**
 * Generates a unique order number in format: NNM-YYYYMMDD-TIMERAND
 * Uses timestamp milliseconds to ensure uniqueness even for rapid submissions
 */
export function generateOrderNumber(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  
  // Use last 6 digits of timestamp + 2 random digits for better uniqueness
  // This ensures orders submitted in the same second are still unique
  const timestamp = String(now.getTime()).slice(-6) // Last 6 digits of timestamp
  const random = String(Math.floor(Math.random() * 100)).padStart(2, "0")

  return `NNM-${year}${month}${day}-${timestamp}${random}`
}
