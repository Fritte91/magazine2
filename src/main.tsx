import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { getEnv } from "./utils/env"

// Validate environment variables at startup
getEnv()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
