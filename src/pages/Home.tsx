import HeroSection from "../components/HeroSection"
import StatisticsSection from "../components/StatisticsSection"
import AboutAuthorSection from "../components/AboutAuthorSection"
import TopicsSection from "../components/TopicsSection"
import TestimonialsSlider from "../components/TestimonialsSlider"
import LegendsSlider from "../components/LegendsSlider"
import NewsletterForm from "../components/NewsletterForm"
import BehindTheProductionSection from "../components/BehindTheProductionSection"
import { useMetaTags } from "../hooks/useMetaTags"

export default function Home() {
  useMetaTags(
    "Now or Never Magazine — Thai Cannabis Culture, Stories & Photography",
    "Now or Never is a limited edition print magazine documenting Thailand's cannabis culture through authentic stories, expert interviews, and original photography. Issue 1 — only 420 copies printed.",
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
