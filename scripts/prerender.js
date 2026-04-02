import { createServer } from "http"
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs"
import { join, dirname, extname } from "path"
import puppeteer from "puppeteer"
import chromium from "@sparticuz/chromium-min"

const DIST_DIR = join(process.cwd(), "dist")
const PORT = 4173

const ROUTES = [
  "/",
  "/shop",
  "/stories",
  "/checkout",
  "/thank-you",
  "/form",
  "/article/1",
  "/article/2",
  "/article/3",
  "/article/4",
  "/article/5",
  "/article/6",
]

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

// Simple static file server that falls back to index.html for SPA routes
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === "/" ? "index.html" : req.url)

      // If no extension, it's an SPA route — serve index.html
      if (!extname(filePath)) {
        filePath = join(DIST_DIR, "index.html")
      }

      try {
        if (existsSync(filePath)) {
          const ext = extname(filePath)
          const contentType = MIME_TYPES[ext] || "application/octet-stream"
          const content = readFileSync(filePath)
          res.writeHead(200, { "Content-Type": contentType })
          res.end(content)
        } else {
          // Fallback to index.html for SPA routing
          const content = readFileSync(join(DIST_DIR, "index.html"))
          res.writeHead(200, { "Content-Type": "text/html" })
          res.end(content)
        }
      } catch {
        res.writeHead(500)
        res.end("Server error")
      }
    })

    server.listen(PORT, () => {
      console.log(`[prerender] Static server running on http://localhost:${PORT}`)
      resolve(server)
    })
  })
}

async function prerender() {
  // Start static server
  const server = await startServer()

  // Launch Puppeteer
  const isCI = !!(process.env.VERCEL || process.env.CI)
  console.log(`[prerender] Launching browser (${isCI ? "CI/Vercel" : "local"})...`)

  const executablePath = isCI
    ? await chromium.executablePath()
    : puppeteer.executablePath()

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: isCI ? chromium.args : ["--no-sandbox", "--disable-setuid-sandbox"],
  })

  try {
    for (const route of ROUTES) {
      console.log(`[prerender] Rendering ${route}...`)
      const page = await browser.newPage()

      // Set a desktop viewport so the intro animation is skipped
      await page.setViewport({ width: 1280, height: 800 })

      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      })

      // Wait for the custom "app-rendered" event or a timeout
      await page.evaluate(() => {
        return new Promise((resolve) => {
          if (document.querySelector("#main-content")) {
            resolve()
            return
          }
          document.addEventListener("app-rendered", () => resolve())
          setTimeout(() => resolve(), 5000)
        })
      })

      // Small extra delay for any final renders
      await new Promise((r) => setTimeout(r, 500))

      const html = await page.content()
      await page.close()

      // Determine output path
      const outputDir =
        route === "/" ? DIST_DIR : join(DIST_DIR, route)
      const outputPath =
        route === "/"
          ? join(DIST_DIR, "index.html")
          : join(outputDir, "index.html")

      // Create directory if needed
      if (route !== "/") {
        mkdirSync(outputDir, { recursive: true })
      }

      writeFileSync(outputPath, html)
      console.log(`[prerender]   -> ${outputPath.replace(DIST_DIR, "dist")}`)
    }
  } finally {
    await browser.close()
    server.close()
  }

  console.log("[prerender] All routes prerendered successfully!")
}

prerender().catch((err) => {
  console.error("[prerender] Fatal error:", err)
  process.exit(1)
})
