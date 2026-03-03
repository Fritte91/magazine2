/**
 * Fetch with timeout utility
 * Prevents requests from hanging indefinitely
 */
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = 10000 // 10 seconds default
): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('TIMEOUT')
    }
    throw error
  }
}
