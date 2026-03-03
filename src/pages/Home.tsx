import HeroSection from "../components/HeroSection"
import StatisticsSection from "../components/StatisticsSection"
import AboutAuthorSection from "../components/AboutAuthorSection"
import TopicsSection from "../components/TopicsSection"
import TestimonialsSlider from "../components/TestimonialsSlider"
import LegendsSlider from "../components/LegendsSlider"
import NewsletterForm from "../components/NewsletterForm"
import BehindTheProductionSection from "../components/BehindTheProductionSection"
import { useMetaTags } from "../hooks/useMetaTags"
import { useI18n } from "../i18n/i18nContext"

export default function Home() {
  const { t } = useI18n()
  
  useMetaTags(
    t("hero.title"),
    t("hero.description"),
    "/Cover.webp",
    "website"
  )
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <div id="about-author">
        <AboutAuthorSection />
      </div>
      <div id="topics">
        <TopicsSection />
      </div>
      <TestimonialsSlider />
      <LegendsSlider />
      <NewsletterForm />
      <div id="stories">
        <BehindTheProductionSection />
      </div>
    </div>
  )
}
