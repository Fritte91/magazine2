import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { I18nProvider } from "./i18n/i18nContext"
import ErrorBoundary from "./components/ErrorBoundary"
import Layout from "./components/Layout"
import LoadingSpinner from "./components/LoadingSpinner"

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"))
const Shop = lazy(() => import("./pages/Shop"))
const Checkout = lazy(() => import("./pages/Checkout"))
const ThankYou = lazy(() => import("./pages/ThankYou"))
const GoogleForm = lazy(() => import("./pages/GoogleForm"))
const Article = lazy(() => import("./pages/Article"))
const Stories = lazy(() => import("./pages/Stories"))

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
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
      </I18nProvider>
      <SpeedInsights />
    </ErrorBoundary>
  )
}

export default App
