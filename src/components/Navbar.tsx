import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import LanguageToggle from "./LanguageToggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 80 // Account for fixed navbar
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80 // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({ top: offsetPosition, behavior: "smooth" })
      }
    }
    closeMenu()
  }

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    closeMenu()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-padding max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Circular Logo */}
          <Link
            to="/"
            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-primary flex items-center justify-center hover:opacity-90 transition-opacity overflow-hidden shadow-md hover:shadow-lg"
          >
            <img
              src="/LOGO1.png"
              alt="Now Or Never Logo"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </Link>
          {/* Site Title */}
          <Link
            to="/"
            className="text-xl md:text-2xl lg:text-3xl font-sans font-bold text-charcoal hover:opacity-70 transition-opacity"
          >
            Now Or Never
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={scrollToTop}
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/") && location.pathname === "/"
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            Home
            {isActive("/") && location.pathname === "/" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </button>
          <button
            onClick={() => scrollToSection("stories")}
            className="text-base font-sans font-semibold transition-all duration-200 relative text-charcoal hover:text-green-primary"
          >
            Stories
          </button>
          <Link 
            to="/shop" 
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/shop") 
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            Shop
            {isActive("/shop") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </Link>
          <button
            onClick={() => scrollToSection("topics")}
            className={`text-base font-sans font-semibold transition-all duration-200 relative text-charcoal hover:text-green-primary`}
          >
            About
          </button>
          <Link 
            to="/stories" 
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/stories") 
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            Blog
            {isActive("/stories") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </Link>
          <button
            onClick={() => scrollToSection("about-author")}
            className={`text-base font-sans font-semibold transition-all duration-200 relative text-charcoal hover:text-green-primary`}
          >
            Author
          </button>
        </div>

        {/* Desktop Language Toggle */}
        <div className="hidden md:block">
          <LanguageToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-charcoal" />
          ) : (
            <Menu size={24} className="text-charcoal" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-padding bg-white border-t border-gray-100 py-4">
          <div className="flex flex-col space-y-1">
            <button
              onClick={scrollToTop}
              className={`px-4 py-3 rounded-lg text-base font-sans font-semibold transition-all duration-200 text-left ${
                isActive("/") && location.pathname === "/"
                  ? "text-green-primary bg-green-primary/10"
                  : "text-charcoal hover:text-green-primary hover:bg-gray-50"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("stories")}
              className="px-4 py-3 rounded-lg text-base font-sans font-semibold transition-all duration-200 text-left text-charcoal hover:text-green-primary hover:bg-gray-50"
            >
              Stories
            </button>
            <Link
              to="/shop"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg text-base font-sans font-semibold transition-all duration-200 ${
                isActive("/shop")
                  ? "text-green-primary bg-green-primary/10"
                  : "text-charcoal hover:text-green-primary hover:bg-gray-50"
              }`}
            >
              Shop
            </Link>
            <button
              onClick={() => scrollToSection("topics")}
              className="px-4 py-3 rounded-lg text-base font-sans font-semibold transition-all duration-200 text-left text-charcoal hover:text-green-primary hover:bg-gray-50"
            >
              About
            </button>
            <Link
              to="/stories"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg text-base font-sans font-semibold transition-all duration-200 ${
                isActive("/stories")
                  ? "text-green-primary bg-green-primary/10"
                  : "text-charcoal hover:text-green-primary hover:bg-gray-50"
              }`}
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection("about-author")}
              className="px-4 py-3 rounded-lg text-base font-sans font-semibold transition-all duration-200 text-left text-charcoal hover:text-green-primary hover:bg-gray-50"
            >
              Author
            </button>
            {/* Language Toggle in Mobile Menu */}
            <div className="px-4 py-3">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
