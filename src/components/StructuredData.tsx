import { useLocation } from "react-router-dom"
import { articles } from "../data/articles"
import { useI18n } from "../i18n/i18nContext"

export default function StructuredData() {
  const location = useLocation()
  const { language } = useI18n()
  const pathname = location.pathname

  // Organization schema (always shown)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Now or Never Magazine",
    "url": "https://nowornevermagazine.com",
    "logo": "https://nowornevermagazine.com/LOGO1.png",
    "description": "A premium publication exploring Thai cannabis culture through authentic stories, expert insights, and beautiful photography.",
    "sameAs": [
      "https://www.instagram.com/nowornevermagazine/",
      "https://www.facebook.com/people/Now-or-Never/61578822662304/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@nowornevermagazine.com",
      "contactType": "Customer Service",
      "areaServed": "TH",
      "availableLanguage": ["en", "th"]
    }
  }

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Now or Never Magazine",
    "url": "https://nowornevermagazine.com",
    "inLanguage": language === "th" ? "th-TH" : "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nowornevermagazine.com/stories?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  // Article schema (for article pages)
  let articleSchema = null
  if (pathname.startsWith("/article/")) {
    const articleId = pathname.split("/article/")[1]
    const article = articles.find(a => a.id === articleId)
    
    if (article) {
      const title = language === "th" && article.titleTh ? article.titleTh : article.title
      const description = language === "th" && article.descriptionTh ? article.descriptionTh : article.description
      
      articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": `https://nowornevermagazine.com${article.heroImage}`,
        "datePublished": "2024-11-01",
        "dateModified": "2024-11-01",
        "author": {
          "@type": "Person",
          "name": "Now or Never Magazine"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Now or Never Magazine",
          "logo": {
            "@type": "ImageObject",
            "url": "https://nowornevermagazine.com/LOGO1.png"
          }
        },
        "inLanguage": language === "th" ? "th-TH" : "en-US"
      }
    }
  }

  // Product schema (for shop page)
  let productSchema = null
  if (pathname === "/shop") {
    productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Now or Never Magazine - Issue 1",
      "description": "Limited edition premium magazine exploring Thai cannabis culture. Only 420 copies available.",
      "image": "https://nowornevermagazine.com/Cover.webp",
      "brand": {
        "@type": "Brand",
        "name": "Now or Never Magazine"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://nowornevermagazine.com/shop",
        "priceCurrency": "THB",
        "price": "1420",
        "availability": "https://schema.org/LimitedAvailability",
        "itemCondition": "https://schema.org/NewCondition"
      }
    }
  }

  const schemas = [
    organizationSchema,
    websiteSchema,
    articleSchema,
    productSchema
  ].filter(Boolean)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

