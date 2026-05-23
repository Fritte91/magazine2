import { lazy, Suspense, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { I18nProvider } from "./i18n/i18nContext"
import ErrorBoundary from "./components/ErrorBoundary"
import Layout from "./components/Layout"
import LoadingSpinner from "./components/LoadingSpinner"
import IntroFlip from "./components/IntroFlip"

const Home = lazy(() => import("./pages/Home"))
const Shop = lazy(() => import("./pages/Shop"))
const Checkout = lazy(() => import("./pages/Checkout"))
const ThankYou = lazy(() => import("./pages/ThankYou"))
const GoogleForm = lazy(() => import("./pages/GoogleForm"))
const Article = lazy(() => import("./pages/Article"))
const Stories = lazy(() => import("./pages/Stories"))

function App() {
  const [introCompleted, setIntroCompleted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const hasIntroBeenShownToday = () => {
    try {
      const lastShownDate = localStorage.getItem("introFlipLastShown")
      if (!lastShownDate) return false

      const today = new Date().toDateString()
      const lastShown = new Date(lastShownDate).toDateString()

      return today === lastShown
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsDesktop(width >= 1025)

      if (width >= 1025 || hasIntroBeenShownToday()) {
        setIntroCompleted(true)
      }
    }

    checkScreenSize()

    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkScreenSize, 150)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  const handleIntroComplete = () => {
    try {
      localStorage.setItem("introFlipLastShown", new Date().toISOString())
    } catch (error) {
      console.warn("Could not save intro completion to localStorage", error)
    }
    setIntroCompleted(true)
  }

  // Signal to the prerenderer that the app has mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      document.dispatchEvent(new Event("app-rendered"))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const introVisible = !introCompleted && !isDesktop

  return (
    <ErrorBoundary>
      <I18nProvider>
        <div aria-hidden={introVisible ? "true" : undefined}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Shop />
                    </Suspense>
                  }
                />
                <Route
                  path="/stories"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Stories />
                    </Suspense>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Checkout />
                    </Suspense>
                  }
                />
                <Route
                  path="/thank-you"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <ThankYou />
                    </Suspense>
                  }
                />
                <Route
                  path="/form"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <GoogleForm />
                    </Suspense>
                  }
                />
                <Route
                  path="/article/:slug"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Article />
                    </Suspense>
                  }
                />
                <Route
                  path="/article/:id"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Article />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
        {introVisible && <IntroFlip onFlipComplete={handleIntroComplete} />}
      </I18nProvider>
      <SpeedInsights />
      <Analytics />
    </ErrorBoundary>
  )
}

export default App
