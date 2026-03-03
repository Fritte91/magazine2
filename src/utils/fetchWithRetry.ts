import { fetchWithTimeout } from './fetchWithTimeout'

/**
 * Fetch with retry logic and exponential backoff
 * Attempts to retry failed requests up to maxRetries times
 * 
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param timeout - Request timeout in milliseconds (default: 10000)
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @returns Promise<Response>
 */
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  timeout = 10000,
  maxRetries = 3
): Promise<Response> => {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout)

      // If response is not ok, throw error to trigger retry
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Success - return response
      return response
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        throw lastError
      }

      // Calculate exponential backoff delay: 1s, 2s, 4s, etc.
      const delay = 1000 * Math.pow(2, attempt - 1)
      
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError || new Error('Unknown error in fetchWithRetry')
}
