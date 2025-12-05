import { lazy, Suspense, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { I18nProvider } from "./i18n/i18nContext"
import ErrorBoundary from "./components/ErrorBoundary"
import Layout from "./components/Layout"
import LoadingSpinner from "./components/LoadingSpinner"
import IntroFlip from "./components/IntroFlip"

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"))
const Shop = lazy(() => import("./pages/Shop"))
const Checkout = lazy(() => import("./pages/Checkout"))
const ThankYou = lazy(() => import("./pages/ThankYou"))
const GoogleForm = lazy(() => import("./pages/GoogleForm"))
const Article = lazy(() => import("./pages/Article"))
const Stories = lazy(() => import("./pages/Stories"))

function App() {
  const [introCompleted, setIntroCompleted] = useState(false)
  const [showMainApp, setShowMainApp] = useState(false)

  // Handle intro completion with proper scroll timing
  const handleIntroComplete = () => {
    // First, ensure we're scrolled to top BEFORE showing main app
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Prevent scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    
    // Mark intro as completed
    setIntroCompleted(true)
    
    // Wait a moment to ensure scroll is set, then show main app
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        setShowMainApp(true)
      })
    })
  }

  // Additional scroll enforcement when main app shows
  useEffect(() => {
    if (showMainApp) {
      const scrollToTop = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      
      scrollToTop()
      setTimeout(scrollToTop, 0)
      setTimeout(scrollToTop, 10)
      setTimeout(scrollToTop, 50)
    }
  }, [showMainApp])

  return (
    <ErrorBoundary>
      <I18nProvider>
        {!introCompleted ? (
          <IntroFlip onFlipComplete={handleIntroComplete} />
        ) : showMainApp ? (
          <div className="fade-in">
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
        ) : null}
      </I18nProvider>
      <SpeedInsights />
    </ErrorBoundary>
  )
}

export default App
