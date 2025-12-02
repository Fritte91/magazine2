import { Link, useLocation } from "react-router-dom"
import LanguageToggle from "./LanguageToggle"

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
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

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link 
            to="/" 
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/") 
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            Home
            {isActive("/") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </Link>
          <Link 
            to="/stories" 
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/stories") 
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            Stories
            {isActive("/stories") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </Link>
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
          <Link 
            to="/" 
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/about") 
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            About
            {isActive("/about") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </Link>
          <Link 
            to="/" 
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/blog") 
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            Blog
            {isActive("/blog") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </Link>
          <Link 
            to="/" 
            className={`text-base font-sans font-semibold transition-all duration-200 relative ${
              isActive("/author") 
                ? "text-green-primary" 
                : "text-charcoal hover:text-green-primary"
            }`}
          >
            Author
            {isActive("/author") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-primary"></span>
            )}
          </Link>
        </div>

        {/* Language Toggle */}
        <LanguageToggle />
      </div>
    </nav>
  )
}
