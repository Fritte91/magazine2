import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { articles } from '../src/data/articles.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const baseUrl = 'https://nowornevermagazine.com'
const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/shop', changefreq: 'monthly', priority: 0.9 },
  { path: '/stories', changefreq: 'weekly', priority: 0.9 },
]

const articleRoutes = articles.map(article => ({
  path: `/article/${article.id}`,
  changefreq: 'monthly',
  priority: 0.8,
  lastmod: new Date().toISOString().split('T')[0]
}))

const allRoutes = [...routes, ...articleRoutes]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

const outputPath = resolve(__dirname, '..', 'public', 'sitemap.xml')
writeFileSync(outputPath, sitemap, 'utf-8')
console.log(`✅ Sitemap generated at ${outputPath}`)

