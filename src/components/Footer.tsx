import { Instagram, Facebook } from "lucide-react"
import { Link } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative text-white py-16 md:py-20 lg:py-24 overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden shadow-xl ring-2 ring-green-primary/30">
                <img
                  src="/LOGO1.png"
                  alt="Now Or Never Logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-base text-white/90 leading-relaxed font-sans max-w-sm">
              Now Or Never 420 documents Thailand's living cannabis culture - bridging growers, artists, healers, and
              dreamers through authentic stories and beautiful photography.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-green-primary/20 hover:bg-green-primary/30 border border-green-primary/30 hover:border-green-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-primary/20"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-green-light" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-green-primary/20 hover:bg-green-primary/30 border border-green-primary/30 hover:border-green-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-primary/20"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-green-light" />
              </a>
            </div>
          </div>

          {/* Quick Links & Community Partners */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-sans font-bold tracking-wider mb-6 uppercase text-green-light">Quick Links</h4>
              <ul className="space-y-3 text-base font-sans">
                <li>
                  <Link to="/" className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Stories
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Journal
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-white/80 hover:text-green-light transition-all duration-200 inline-block hover:translate-x-2 group">
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-light transition-all duration-200"></span>
                      Author
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold tracking-wider mb-4 uppercase text-green-light">
                Community Partners
              </h4>
              <div className="inline-block px-4 py-2 rounded-lg bg-green-primary/20 border border-green-primary/30">
                <p className="text-base text-green-light font-sans font-semibold">Phonotype_247</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-sans font-bold tracking-wider mb-6 uppercase text-green-light">Contact</h4>
            <ul className="space-y-5 text-base font-sans">
              <li>
                <span className="text-white/70 block mb-2 text-sm font-medium tracking-wide">EMAIL</span>
                <a 
                  href="mailto:info@nowornevermagazine.com" 
                  className="text-white hover:text-green-light transition-colors duration-200 break-all inline-flex items-center gap-2 group"
                >
                  <span>info@nowornevermagazine.com</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <span className="text-white/70 block mb-2 text-sm font-medium tracking-wide">LOCATION</span>
                <span className="text-white flex items-center gap-2">
                  <span>Bangkok, Thailand</span>
                  <span className="text-green-light">📍</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-primary/20 pt-10 text-center">
          <p className="text-sm text-white/70 font-sans">{t("footer.copy")}</p>
        </div>
      </div>
    </footer>
  )
}
