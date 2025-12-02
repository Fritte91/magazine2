import HeroSection from "../components/HeroSection"
import StatisticsSection from "../components/StatisticsSection"
import AboutAuthorSection from "../components/AboutAuthorSection"
import TopicsSection from "../components/TopicsSection"
import TestimonialsSlider from "../components/TestimonialsSlider"
import LegendsSlider from "../components/LegendsSlider"
import NewsletterForm from "../components/NewsletterForm"
import BehindTheProductionSection from "../components/BehindTheProductionSection"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <AboutAuthorSection />
      <TopicsSection />
      <TestimonialsSlider />
      <LegendsSlider />
      <NewsletterForm />
      <BehindTheProductionSection />
    </div>
  )
}
