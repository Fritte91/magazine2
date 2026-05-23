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
    "Now or Never Magazine — วัฒนธรรมกัญชาไทย สตอรี่ & ภาพถ่าย",
    "Now or Never นิตยสารฉบับพิเศษ สำรวจวัฒนธรรมกัญชาไทยผ่านเรื่องราว บทสัมภาษณ์ และภาพถ่ายต้นฉบับ Limited edition Thai cannabis culture magazine.",
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
