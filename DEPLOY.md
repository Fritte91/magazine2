# Quick Deployment Guide

## Step 1: Initialize Git and Push to GitHub

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Now or Never Magazine website"

# Set main branch
git branch -M main

# Add GitHub remote (your repo)
git remote add origin https://github.com/Fritte91/magazine2.git

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or use GitHub Desktop app

## Step 2: Deploy to Vercel

### Option A: Via Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Find and select your repository: **`Fritte91/magazine2`**
4. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **"Deploy"**
6. Wait 1-2 minutes for deployment
7. Your site will be live! 🎉

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (run from project folder)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? magazine2 (or press enter)
# - Directory? ./ (press enter)
# - Override settings? No

# For production deployment:
vercel --prod
```

## Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## That's It! 🚀

Your site will be live at: `https://magazine2.vercel.app` (or your custom domain)

---

## Troubleshooting

### Build Fails?
- Check that all dependencies are in `package.json`
- Run `npm install` locally first to test
- Check Vercel build logs for errors

### Images Not Loading?
- Make sure all images are in the `public/` folder
- Check image paths start with `/` (e.g., `/cover10.webp`)

### Routing Issues?
- The `vercel.json` file handles SPA routing
- All routes should redirect to `index.html`

### Need to Update?
Just push to GitHub:
```bash
git add .
git commit -m "Update description"
git push
```
Vercel will automatically redeploy!

