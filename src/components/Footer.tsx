import { Instagram, Facebook } from "lucide-react"
import { Link } from "react-router-dom"
import { useI18n } from "../i18n/i18nContext"

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="text-white py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#225544' }}>
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg" style={{ backgroundColor: '#225544' }}>
                <img
                  src="/LOGO1.png"
                  alt="Now Or Never Logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-base text-white/85 leading-relaxed font-sans max-w-sm">
              Now Or Never 420 documents Thailand's living cannabis culture - bridging growers, artists, healers, and
              dreamers through authentic stories and beautiful photography.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links & Community Partners */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-sans font-bold tracking-wider mb-6 uppercase text-white">Quick Links</h4>
              <ul className="space-y-3 text-base font-sans">
                <li>
                  <Link to="/" className="text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1">
                    Stories
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1">
                    Author
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold tracking-wider mb-4 uppercase text-white">
                Community Partners
              </h4>
              <p className="text-base text-white/80 font-sans">Phonotype_247</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-sans font-bold tracking-wider mb-6 uppercase text-white">Contact</h4>
            <ul className="space-y-5 text-base font-sans">
              <li>
                <span className="text-white/70 block mb-2 text-sm font-medium tracking-wide">EMAIL</span>
                <a 
                  href="mailto:info@nowornevermagazine.com" 
                  className="text-white hover:text-green-light transition-colors duration-200 break-all"
                >
                  info@nowornevermagazine.com
                </a>
              </li>
              <li>
                <span className="text-white/70 block mb-2 text-sm font-medium tracking-wide">LOCATION</span>
                <span className="text-white">Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/15 pt-10 text-center">
          <p className="text-sm text-white/70 font-sans">{t("footer.copy")}</p>
        </div>
      </div>
    </footer>
  )
}
