/**
 * Simple XSS protection utility
 * Escapes HTML special characters to prevent XSS attacks
 */

/**
 * Escapes HTML special characters in a string
 * @param text - The text to sanitize
 * @returns Sanitized text safe for display in HTML
 */
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Sanitizes error messages for safe display
 * @param error - Error object or string
 * @returns Sanitized error message
 */
export const sanitizeError = (error: Error | string): string => {
  const message = error instanceof Error ? error.message : String(error)
  return escapeHtml(message)
}
