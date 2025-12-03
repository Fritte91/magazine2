import { Instagram, Facebook } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"

export default function Footer() {
  const { t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({ top: offsetPosition, behavior: "smooth" })
      }
    }
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
  }

  return (
    <footer className="relative text-white py-6 md:py-10 lg:py-12 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a0f] via-[#1a2e1f] to-[#0f1f12]"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-primary/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-light/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-green-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      ></div>

      <div className="container-padding max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-6 md:mb-8">
          {/* Brand */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden shadow-xl ring-2 ring-green-primary/30">
                <img
                  src="/LOGO1.png"
                  alt="Now Or Never Logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed font-sans max-w-sm">
              Now Or Never 420 documents Thailand's living cannabis culture - bridging growers, artists, healers, and
              dreamers through authentic stories and beautiful photography.
            </p>
            <div className="flex items-center gap-2 md:gap-3 pt-1">
              <a
                href="https://www.instagram.com/nowornevermagazine/?igsh=MXFlYWVkdm1tbnB4eA%3D%3D&utm_source=qr#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-primary/20 hover:bg-green-primary/30 border border-green-primary/30 hover:border-green-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-primary/20"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-light" />
              </a>
              <a
                href="https://www.facebook.com/people/Now-or-Never/61578822662304/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-primary/20 hover:bg-green-primary/30 border border-green-primary/30 hover:border-green-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-primary/20"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-light" />
              </a>
            </div>
          </div>

          {/* Quick Links & Community Partners */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h4 className="text-xs font-sans font-bold tracking-wider mb-3 md:mb-4 uppercase text-green-light">Quick Links</h4>
              <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm font-sans">
                <li>
                  <button onClick={scrollToTop} className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Home
                    </span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("stories")} className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Stories
                    </span>
                  </button>
                </li>
                <li>
                  <Link to="/stories" className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Journal
                    </span>
                  </Link>
                </li>
                <li>
                  <button onClick={() => scrollToSection("about-author")} className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Author
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-sans font-bold tracking-wider mb-2 md:mb-3 uppercase text-green-light">
                Community Partners
              </h4>
              <div className="inline-block px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-green-primary/20 border border-green-primary/30">
                <p className="text-xs md:text-sm text-green-light font-sans font-semibold">Phonotype_247</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-sans font-bold tracking-wider mb-3 md:mb-4 uppercase text-green-light">Contact</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-sans">
              <li>
                <span className="text-white/70 block mb-1 md:mb-1.5 text-[10px] md:text-xs font-medium tracking-wide">EMAIL</span>
                <a 
                  href="mailto:info@nowornevermagazine.com" 
                  className="text-white hover:text-green-light transition-colors duration-200 break-all inline-flex items-center gap-2 group text-xs md:text-sm"
                >
                  <span>info@nowornevermagazine.com</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <span className="text-white/70 block mb-1 md:mb-1.5 text-[10px] md:text-xs font-medium tracking-wide">LOCATION</span>
                <span className="text-white flex items-center gap-2 text-xs md:text-sm">
                  <span>Bangkok, Thailand</span>
                  <span className="text-green-light">📍</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-primary/20 pt-4 md:pt-6 text-center">
          <p className="text-[10px] md:text-xs text-white/70 font-sans">{t("footer.copy")}</p>
        </div>
      </div>
    </footer>
  )
}
