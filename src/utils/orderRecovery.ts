/**
 * Order recovery utilities
 * Helps recover failed orders and retry submissions
 */

interface PendingOrder {
  formData: any
  orderNumber: string
  payload: any
  timestamp: number
  status: 'pending' | 'completed' | 'failed'
  retryCount?: number
}

const MAX_RETRY_ATTEMPTS = 3
const RETRY_DELAY = 5000 // 5 seconds

/**
 * Get pending order from localStorage
 */
export const getPendingOrder = (): PendingOrder | null => {
  try {
    const pending = localStorage.getItem('pendingOrder')
    if (!pending) return null
    
    const order = JSON.parse(pending) as PendingOrder
    // Only return if order is less than 24 hours old
    const age = Date.now() - order.timestamp
    if (age > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('pendingOrder')
      return null
    }
    
    return order
  } catch (error) {
    console.error('Error reading pending order:', error)
    return null
  }
}

/**
 * Save pending order to localStorage
 */
export const savePendingOrder = (order: PendingOrder): void => {
  try {
    localStorage.setItem('pendingOrder', JSON.stringify(order))
  } catch (error) {
    console.error('Error saving pending order:', error)
  }
}

/**
 * Mark order as failed and increment retry count
 */
export const markOrderAsFailed = (order: PendingOrder): PendingOrder => {
  const updatedOrder: PendingOrder = {
    ...order,
    status: 'failed',
    retryCount: (order.retryCount || 0) + 1,
  }
  
  savePendingOrder(updatedOrder)
  return updatedOrder
}

/**
 * Check if order can be retried
 */
export const canRetryOrder = (order: PendingOrder): boolean => {
  const retryCount = order.retryCount || 0
  return retryCount < MAX_RETRY_ATTEMPTS
}

/**
 * Clear pending order (after successful submission)
 */
export const clearPendingOrder = (): void => {
  try {
    localStorage.removeItem('pendingOrder')
  } catch (error) {
    console.error('Error clearing pending order:', error)
  }
}

/**
 * Get order recovery message
 */
export const getRecoveryMessage = (order: PendingOrder | null): string | null => {
  if (!order || order.status !== 'failed') return null
  
  const retryCount = order.retryCount || 0
  if (retryCount >= MAX_RETRY_ATTEMPTS) {
    return 'Your previous order submission failed. Please try submitting again or contact support.'
  }
  
  return `Your previous order submission failed. We'll automatically retry. (Attempt ${retryCount + 1}/${MAX_RETRY_ATTEMPTS})`
}
