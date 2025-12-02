import { BrowserRouter, Routes, Route } from "react-router-dom"
import { I18nProvider } from "./i18n/i18nContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Checkout from "./pages/Checkout"
import ThankYou from "./pages/ThankYou"
import GoogleForm from "./pages/GoogleForm"
import Article from "./pages/Article"
import Stories from "./pages/Stories"

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/form" element={<GoogleForm />} />
            <Route path="/article/:id" element={<Article />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
