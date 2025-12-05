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
      <StructuredData />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1" style={{ backgroundColor: "#ffffff", width: "100%" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
