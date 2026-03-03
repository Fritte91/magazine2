/**
 * Analytics event tracking
 * Centralized analytics for better insights and conversion tracking
 */

/**
 * Track custom events
 * Uses Vercel Analytics if available, falls back to console in dev
 */
export const track = (eventName: string, properties?: Record<string, any>): void => {
  // In development, log to console
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', eventName, properties)
  }

  // In production, use Vercel Analytics
  if (import.meta.env.PROD) {
    // Vercel Analytics automatically tracks page views
    // For custom events, we can use the track function if available
    // @ts-ignore - Vercel Analytics types may not be available
    if (typeof window !== 'undefined' && window.va) {
      // @ts-ignore
      window.va('track', eventName, properties)
    }
  }
}

/**
 * Track page views
 */
export const trackPageView = (path: string): void => {
  track('page_view', { path })
}

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, success: boolean, error?: string): void => {
  track('form_submission', {
    form_name: formName,
    success,
    error,
  })
}

/**
 * Track order events
 */
export const trackOrder = (action: 'started' | 'completed' | 'failed', orderNumber?: string, error?: string): void => {
  track('order_event', {
    action,
    order_number: orderNumber,
    error,
  })
}

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = (success: boolean, error?: string): void => {
  track('newsletter_signup', {
    success,
    error,
  })
}

/**
 * Track article views
 */
export const trackArticleView = (articleId: string, articleTitle: string): void => {
  track('article_view', {
    article_id: articleId,
    article_title: articleTitle,
  })
}

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location: string): void => {
  track('button_click', {
    button_name: buttonName,
    location,
  })
}
