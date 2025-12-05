// Pre-order date: December 12, 2025
const PRE_ORDER_DATE = new Date('2025-12-12T00:00:00')

// Check if pre-orders are currently open
export const isPreOrderOpen = (): boolean => {
  const now = new Date()
  return now >= PRE_ORDER_DATE
}

// Get the pre-order date for display
export const getPreOrderDate = (): Date => {
  return PRE_ORDER_DATE
}

// Format pre-order date for display
export const formatPreOrderDate = (locale: string = 'en'): string => {
  return PRE_ORDER_DATE.toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

