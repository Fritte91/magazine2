import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToTop from "./ScrollToTop"
import StructuredData from "./StructuredData"
import { useI18n } from "../i18n/i18nContext"

export default function Layout() {
  const { language } = useI18n()
  
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  // Ensure we're at the top when Layout first mounts
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    // Also prevent scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  }, [])
  
  return (
    <div 
      className="flex flex-col min-h-screen text-charcoal"
      style={{ 
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-charcoal focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-charcoal"
        style={{ zIndex: 9999 }}
      >
        Skip to main content
      </a>
      
      <StructuredData />
      <ScrollToTop />
      <Navbar />
      <main 
        id="main-content"
        className="flex-1" 
        style={{ backgroundColor: "#ffffff", width: "100%" }}
        role="main"
        aria-label="Main content"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
