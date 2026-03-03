/**
 * Environment variable validation and type-safe access
 */

interface Env {
  VITE_ORDER_WEBHOOK_URL?: string
  VITE_NEWSLETTER_WEBHOOK_URL?: string
}

let validatedEnv: Env | null = null

/**
 * Validates and returns environment variables
 * Logs warnings in production if critical vars are missing
 */
export const getEnv = (): Env => {
  if (validatedEnv) {
    return validatedEnv
  }

  const env: Env = {
    VITE_ORDER_WEBHOOK_URL: import.meta.env.VITE_ORDER_WEBHOOK_URL,
    VITE_NEWSLETTER_WEBHOOK_URL: import.meta.env.VITE_NEWSLETTER_WEBHOOK_URL,
  }

  // In production, warn if critical vars are missing
  if (import.meta.env.PROD) {
    if (!env.VITE_ORDER_WEBHOOK_URL) {
      console.warn(
        '⚠️ VITE_ORDER_WEBHOOK_URL is not set. Order submissions will not work in production.'
      )
    }
    if (!env.VITE_NEWSLETTER_WEBHOOK_URL) {
      console.warn(
        '⚠️ VITE_NEWSLETTER_WEBHOOK_URL is not set. Newsletter signups will not work in production.'
      )
    }
  }

  validatedEnv = env
  return env
}

/**
 * Check if webhook URLs are configured
 */
export const isWebhookConfigured = (): boolean => {
  const env = getEnv()
  return !!(env.VITE_ORDER_WEBHOOK_URL || env.VITE_NEWSLETTER_WEBHOOK_URL)
}
