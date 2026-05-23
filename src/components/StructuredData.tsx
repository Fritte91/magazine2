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
    "url": "https://www.nowornevermagazine.com",
    "logo": "https://www.nowornevermagazine.com/LOGO1.png",
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
    "url": "https://www.nowornevermagazine.com",
    "inLanguage": language === "th" ? "th-TH" : "en-US"
  }

  // Breadcrumb schema (assigned per route below)
  let breadcrumbSchema = null

  // Article schema (for article pages)
  let articleSchema = null
  if (pathname.startsWith("/article/")) {
    const articleParam = pathname.split("/article/")[1]
    const article = articles.find(a => a.slug === articleParam || a.id === articleParam)

    if (article) {
      const title = language === "th" && article.titleTh ? article.titleTh : article.title
      const description = language === "th" && article.descriptionTh ? article.descriptionTh : article.description

      breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nowornevermagazine.com/" },
          { "@type": "ListItem", "position": 2, "name": "Stories", "item": "https://www.nowornevermagazine.com/stories" },
          { "@type": "ListItem", "position": 3, "name": title }
        ]
      }

      articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": `https://www.nowornevermagazine.com${article.heroImage}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.nowornevermagazine.com/article/${article.slug}`
        },
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "author": {
          "@type": "Person",
          "name": "Phonotype_247",
          "sameAs": "https://www.instagram.com/nowornevermagazine/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Now or Never Magazine",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.nowornevermagazine.com/LOGO1.png"
          }
        },
        "inLanguage": language === "th" ? "th-TH" : "en-US"
      }
    }
  }

  // Stories list page breadcrumb + ItemList
  let storiesItemListSchema = null
  if (pathname === "/stories") {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nowornevermagazine.com/" },
        { "@type": "ListItem", "position": 2, "name": "Stories" }
      ]
    }

    storiesItemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Stories from Now or Never Magazine",
      "numberOfItems": articles.length,
      "itemListElement": articles.map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://www.nowornevermagazine.com/article/${a.slug}`,
        "name": language === "th" && a.titleTh ? a.titleTh : a.title
      }))
    }
  }

  // Product schema (for shop page)
  let productSchema = null
  if (pathname === "/shop") {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nowornevermagazine.com/" },
        { "@type": "ListItem", "position": 2, "name": "Shop" }
      ]
    }

    productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Now or Never Magazine - Issue 1",
      "description": "Limited edition premium magazine exploring Thai cannabis culture. Only 420 copies available.",
      "image": "https://www.nowornevermagazine.com/Cover.webp",
      "brand": {
        "@type": "Brand",
        "name": "Now or Never Magazine"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.nowornevermagazine.com/shop",
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
    productSchema,
    breadcrumbSchema,
    storiesItemListSchema
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








