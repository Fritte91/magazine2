# Now or Never Magazine - Premium Editorial Landing Page

A luxury, mobile-first React + Tailwind CSS landing page for a premium magazine product. Built with Vite, featuring complete e-commerce flow with Thai payment integration and bilingual (EN/TH) support.

## 🚀 Features

### Core Pages
- **Home** - Luxury hero with magazine cover, author bio, content preview, testimonials, featured stories, and newsletter signup
- **Stories** - Complete article listing page with all stories in a beautiful card grid
- **Shop** - Product showcase with detailed features and order summary sidebar
- **Checkout** - Complete Thai checkout with form validation, QR payment, and file upload
- **Thank You** - Order confirmation with tracking information
- **Article** - Individual article pages with full content and related articles
- **Google Form** - Embedded form page for external integrations

### Premium Design Elements
- Full-width sections with high-quality imagery
- Minimalist, elegant typography with serif fonts
- Smooth animations and hover transitions
- Professional color palette (cream, charcoal, stone accents)
- Luxury editorial aesthetic inspired by nowornevermagazine.com

### Functionality
- **i18n System** - Custom context-based internationalization (EN/TH)
- **Order Management** - Order number generation (NNM-YYYYMMDD-XXXX format)
- **Thai Validation** - Phone number, postal code, and file type validation
- **QR Payment** - Payment slip upload with file validation
- **Responsive Design** - Perfect on all devices (360px to 1440px+)
- **Touch-Friendly** - Optimized for mobile interactions and sliders

## 📋 Project Structure

\`\`\`
src/
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── Shop.tsx                 # Product page
│   ├── Checkout.tsx             # Checkout flow
│   ├── ThankYou.tsx             # Order confirmation
│   ├── Article.tsx              # Article template
│   └── GoogleForm.tsx           # Embedded form page
│
├── components/
│   ├── Layout.tsx               # Main layout wrapper
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   ├── LanguageToggle.tsx       # EN/TH switcher
│   ├── HeroSection.tsx          # Hero with magazine cover
│   ├── AboutAuthorSection.tsx   # Author bio section
│   ├── TopicsSection.tsx        # Magazine content grid
│   ├── TestimonialsSlider.tsx   # Auto-scrolling testimonials
│   ├── LegendsSlider.tsx        # Touch-friendly legends carousel
│   ├── NewsletterForm.tsx       # Newsletter signup
│   ├── ProductCard.tsx          # Product display
│   ├── CheckoutForm.tsx         # Complete checkout form
│   ├── ThankYouMessage.tsx      # Order confirmation message
│   └── OrderNumberGenerator.ts  # Order ID generation utility
│
├── i18n/
│   ├── i18nContext.tsx          # i18n provider and hooks
│   ├── en.json                  # English translations
│   └── th.json                  # Thai translations
│
├── utils/
│   └── validation.ts            # Form validation utilities
│
├── App.tsx                      # Router setup
├── main.tsx                     # React entry point
├── index.css                    # Global styles + Tailwind
└── tailwind.css                # Scrollbar utilities
\`\`\`

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16+ (or use `npm` directly)
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Opens at `http://localhost:3000`

4. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`

## 🎨 Customization Guide

### Colors & Styling
Edit CSS variables in `src/index.css`:
\`\`\`css
:root {
  --background: 255 255 255;      /* White */
  --foreground: 20 20 20;         /* Dark */
  --charcoal: 30 30 30;           /* Main dark */
  --stone: 120 120 120;           /* Secondary */
  --accent: 180 80 60;            /* Accent color */
}
\`\`\`

### Images & Content
Replace placeholder images:
- Magazine cover: `/public/luxury-magazine-cover-now-or-never.jpg`
- Author photo: `/public/editorial-portrait-author.jpg`
- Topic images: `/public/topic-*.jpg`
- Legend portraits: `/public/legend-portrait-*.jpg`

Update text in language files:
- `src/i18n/en.json` - English
- `src/i18n/th.json` - Thai

### Thai Provinces
Edit the province list in `src/components/CheckoutForm.tsx`:
\`\`\`typescript
const thaiProvinces = [
  'Bangkok',
  'Phetchaburi',
  // Add more...
]
\`\`\`

### Newsletter Integration
In `src/components/NewsletterForm.tsx`, replace the console.log with Make.com webhook:
\`\`\`typescript
// TODO: submitNewsletter(formData) → Connect to Make.com
\`\`\`

### Checkout Webhook
In `src/components/CheckoutForm.tsx`, implement the order submission:
\`\`\`typescript
// TODO: submitOrderToWebhook(submitData) → Connect to Make.com
\`\`\`

## 🌍 i18n Usage

All text uses the i18n system. Usage example:
\`\`\`tsx
import { useI18n } from '../i18n/i18nContext'

export default function Component() {
  const { t, language, setLanguage } = useI18n()
  
  return (
    <h1>{t('hero.title')}</h1>
  )
}
\`\`\`

## ✅ Form Validation

### Thai Phone Numbers
- Format: 0812345678 (10 digits starting with 0)
- Regex: `/^0\d{9}$/`

### Postal Code
- Format: 5 digits (e.g., 10110)
- Regex: `/^\d{5}$/`

### Payment Slip Files
- Accepted: JPG, PNG, PDF, HEIC
- Max file size: Browser dependent

## 📱 Responsive Breakpoints

- **Mobile**: 360px+ (default)
- **Tablet**: 768px+ (`md:` prefix)
- **Desktop**: 1024px+ (`lg:` prefix)

All components tested on:
- iPhone SE (375px)
- iPhone 12 (390px)
- iPad (768px)
- Desktop (1440px+)

## 🔗 Routing

\`\`\`
/                    → Home/Landing
/stories             → All articles listing
/shop                → Product page
/checkout            → Checkout form
/thank-you           → Order confirmation
/form                → Google Form embed
/article/:id         → Individual article page
\`\`\`

## 🧩 Key Components

### HeroSection
- Responsive side-by-side layout (stacks on mobile)
- Magazine cover with hover animation
- CTA button with smooth scroll

### TopicsSection
- Responsive grid (1-4 columns)
- Image hover zoom effect
- Lazy loading support

### LegendsSlider
- Touch-friendly horizontal scroll
- Smart arrow navigation (hides when not needed)
- Scroll snap for smooth mobile experience

### CheckoutForm
- Complete Thai address validation
- Real-time error feedback
- File upload with drag-and-drop
- Order number generation

## 🔐 Security Notes

- Phone validation prevents invalid Thai numbers
- Email validation uses regex pattern
- Payment slip upload validates file types
- Form validation happens on submit

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Fritte91/magazine2.git
   git push -u origin main
   \`\`\`

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository: `Fritte91/magazine2`
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your site will be live in minutes!

### Manual Vercel CLI
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Other Platforms
\`\`\`bash
npm run build
# Deploy the `dist/` folder
\`\`\`

## 📚 Dependencies

- **React 18.3** - UI framework
- **React Router 6.20** - Routing
- **Tailwind CSS 4.0** - Styling
- **Lucide React** - Icons
- **Embla Carousel** - Slider library

## 🔧 Available Scripts

\`\`\`bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run linter (if configured)
\`\`\`

## 📝 Notes

- Replace all TODO comments with your Make.com integrations
- Update newsletter and order webhooks
- Replace Google Form iframe src with your form ID
- Test all forms on actual Thai devices for better experience
- Consider adding Google Analytics for traffic tracking

## 💡 Tips for Success

1. **Images**: High-quality, large images make a huge difference on luxury sites
2. **Spacing**: The generous padding/margins create the premium feel - keep them
3. **Typography**: Serif fonts (h1-h6) create editorial authority
4. **Colors**: Stick to the minimal palette - luxury is about restraint
5. **Performance**: Lazy load images, optimize for Core Web Vitals

## 🤝 Support

For issues or questions about integration:
- Check component comments for TODO items
- Review i18n/en.json for all text keys
- Test form validation with the utils/validation.ts patterns

---

**Built with ❤️ for premium editorial brands**
