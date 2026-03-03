import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/i18nContext'

/**
 * Hook to dynamically update meta tags per page
 * Improves SEO and social media sharing
 */
export const useMetaTags = (
  title: string,
  description: string,
  image?: string,
  type: 'website' | 'article' | 'product' = 'website'
) => {
  const { language } = useI18n()
  const location = useLocation()
  const baseUrl = 'https://nowornevermagazine.com'
  const fullUrl = `${baseUrl}${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      const isOpenGraph = property.startsWith('og:')
      const selector = isOpenGraph
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`

      let element = document.querySelector(selector) as HTMLMetaElement

      if (!element) {
        element = document.createElement('meta')
        if (isOpenGraph) {
          element.setAttribute('property', property)
        } else {
          element.setAttribute('name', property)
        }
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('og:type', type)
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:url', fullUrl)
    updateMetaTag('og:locale', language === 'th' ? 'th_TH' : 'en_US')

    // Image
    if (image) {
      const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
      updateMetaTag('og:image', imageUrl)
      updateMetaTag('twitter:image', imageUrl)
    } else {
      // Default image
      updateMetaTag('og:image', `${baseUrl}/Cover.webp`)
      updateMetaTag('twitter:image', `${baseUrl}/Cover.webp`)
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:url', fullUrl)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)
  }, [title, description, image, type, language, location.pathname, fullUrl])
}
