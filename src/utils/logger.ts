/**
 * Error logging utility
 * Centralized error logging with context information
 */

interface LogContext {
  component?: string
  action?: string
  userId?: string
  [key: string]: any
}

/**
 * Logs errors with context information
 * In production, this can be extended to send to error tracking services
 * 
 * @param error - Error object or error message
 * @param context - Additional context information
 */
export const logError = (error: Error | string, context?: LogContext): void => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  const errorStack = error instanceof Error ? error.stack : undefined

  const logData = {
    message: errorMessage,
    stack: errorStack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...context,
  }

  // Always log to console for debugging
  console.error('Error logged:', logData)

  // In production, send to error tracking service
  if (import.meta.env.PROD) {
    // TODO: Integrate with error tracking service (e.g., Sentry, LogRocket, etc.)
    // Example:
    // Sentry.captureException(error, { extra: context })
    // or
    // fetch('/api/log-error', { method: 'POST', body: JSON.stringify(logData) })
    
    // For now, we can store errors in localStorage for debugging
    try {
      const errorLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]')
      errorLogs.push(logData)
      // Keep only last 10 errors
      if (errorLogs.length > 10) {
        errorLogs.shift()
      }
      localStorage.setItem('errorLogs', JSON.stringify(errorLogs))
    } catch (e) {
      // If localStorage fails, just continue
      console.warn('Failed to store error log:', e)
    }
  }
}

/**
 * Logs informational messages
 */
export const logInfo = (message: string, context?: LogContext): void => {
  if (import.meta.env.DEV) {
    console.log('Info:', message, context)
  }
}

/**
 * Logs warning messages
 */
export const logWarning = (message: string, context?: LogContext): void => {
  console.warn('Warning:', message, context)
}
