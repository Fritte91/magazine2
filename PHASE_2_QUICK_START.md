# ⚡ Phase 2 Quick Start Guide

## 🎯 Priority Order (Do in This Order)

1. **Code Splitting** (30 min) - Biggest performance impact
2. **Structured Data** (2-3 hours) - Best SEO improvement  
3. **Sitemap** (30 min) - Quick SEO win
4. **Build Optimization** (30 min) - Better production builds

---

## 1️⃣ Code Splitting (START HERE)

### Step 1: Update App.tsx

Replace the entire `src/App.tsx` file with the lazy-loaded version from `PHASE_2_IMPROVEMENTS.md`.

**Time:** 5 minutes  
**Impact:** 40-60% smaller initial bundle

### Step 2: Test

```bash
npm run build
# Check the bundle size in dist/
```

---

## 2️⃣ Structured Data

### Step 1: Create the component

Create `src/components/StructuredData.tsx` (copy from `PHASE_2_IMPROVEMENTS.md`)

### Step 2: Add to Layout

Add `<StructuredData />` at the top of Layout component's return

### Step 3: Test

- Build the site
- View page source
- Look for `<script type="application/ld+json">` tags
- Test with: https://search.google.com/test/rich-results

---

## 3️⃣ Sitemap

### Quick Method (Static):

1. Create `public/sitemap.xml` manually:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nowornevermagazine.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nowornevermagazine.com/shop</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://nowornevermagazine.com/stories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Add article URLs -->
  <url>
    <loc>https://nowornevermagazine.com/article/1</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add more articles -->
</urlset>
```

2. Update robots.txt to reference it (already done ✅)

---

## 4️⃣ Build Optimization

### Step 1: Update vite.config.js

Add the build configuration from `PHASE_2_IMPROVEMENTS.md`

### Step 2: Test

```bash
npm run build
# Check the output - should see separate chunks
```

---

## ✅ Verification Checklist

After each step, verify:

- [ ] Code splitting: Bundle size reduced in `dist/`
- [ ] Structured data: JSON-LD visible in page source
- [ ] Sitemap: Accessible at `/sitemap.xml`
- [ ] Build: No errors, chunks created properly

---

## 🐛 Troubleshooting

### Code Splitting Issues:
- Make sure LoadingSpinner component exists
- Check console for import errors
- Verify all lazy imports are correct

### Structured Data Issues:
- Check browser console for JSON errors
- Validate JSON at jsonlint.com
- Test schema at schema.org validator

### Build Issues:
- Check Node version (should be 16+)
- Clear node_modules and reinstall
- Check for TypeScript errors first

---

## 📊 Success Metrics

After completing Phase 2:

- Bundle size: Should be < 150KB initial
- Lighthouse Performance: Should improve 10-20 points
- Structured data: Validates at Google Rich Results Test
- Sitemap: Accessible and valid

---

**Total Time:** ~4-5 hours for all critical items  
**Expected Improvement:** 40-60% faster, better SEO foundation
