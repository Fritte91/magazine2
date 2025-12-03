import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToTop from "./ScrollToTop"

export default function Layout() {
  return (
    <div 
      className="flex flex-col min-h-screen text-charcoal"
      style={{ 
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <ScrollToTop />
      <Navbar />
      <main className="flex-1" style={{ backgroundColor: "#ffffff", width: "100%" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
