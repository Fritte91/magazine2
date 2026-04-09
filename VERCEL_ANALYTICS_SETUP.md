# Vercel Web Analytics Setup Guide

This document describes how Vercel Web Analytics is integrated into the Now or Never Magazine project.

## Overview

Vercel Web Analytics is already enabled and configured in this project. It provides real-time insights into your website's performance and user behavior without requiring additional configuration after deployment to Vercel.

## What's Included

This project includes:
- **@vercel/analytics** - The Vercel Analytics package (v1.6.1)
- **@vercel/speed-insights** - Vercel Speed Insights for Core Web Vitals monitoring (v1.3.1)

Both packages are configured and active in the application.

## Current Integration

### In `src/App.tsx`

Both analytics components are imported and rendered at the root level:

```tsx
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {
  // ... app code ...
  return (
    <ErrorBoundary>
      <I18nProvider>
        {/* ... routes and components ... */}
      </I18nProvider>
      <SpeedInsights />
      <Analytics />
    </ErrorBoundary>
  )
}
```

**Key Points:**
- Both components are placed outside the main routing to ensure they initialize for all pages
- This placement ensures analytics tracking starts immediately when the app loads
- SpeedInsights monitors Core Web Vitals (LCP, FID, CLS, etc.)
- Analytics tracks page views and custom events

## How It Works

### Automatic Tracking

Once deployed to Vercel, the following are automatically tracked:

1. **Page Views** - Every route change is automatically tracked
2. **Web Vitals** - Core Web Vitals (LCP, FID, CLS, TTFB, FCP) are automatically collected
3. **Custom Events** - You can track custom user interactions (see below)

### What Gets Tracked

The analytics automatically collect:
- Page path and title
- Referrer information
- Device type (mobile, tablet, desktop)
- User's browser and OS
- Geographic location (country/region)
- Time spent on page
- Conversion events (if configured)

## Custom Events

To track specific user interactions, use the `va` function provided by the analytics:

```tsx
// Track a button click
<button onClick={() => {
  window.va?.('event', {
    name: 'button_clicked',
    value: 'checkout_button'
  })
}}>
  Buy Now
</button>
```

### Example: Tracking Form Submissions

In `src/components/CheckoutForm.tsx`, you could add:

```tsx
const handleSubmit = (data: CheckoutFormData) => {
  // Track the submission
  window.va?.('event', {
    name: 'checkout_completed',
    value: data.totalAmount
  })
  
  // Send to your webhook...
}
```

### Example: Tracking Article Views

In `src/pages/Article.tsx`, you could add:

```tsx
useEffect(() => {
  // Track article view
  window.va?.('event', {
    name: 'article_viewed',
    value: articleId
  })
}, [articleId])
```

## Deployment Requirements

### Prerequisites for Analytics to Work

1. **Vercel Account** - You need a Vercel account at [vercel.com](https://vercel.com)
2. **Project Deployment** - Your project must be deployed on Vercel (not other platforms)
3. **Enable Analytics** - In your Vercel project dashboard:
   - Go to the **Analytics** tab
   - Click **Enable** (if not already enabled)
   - This adds the `/_vercel/insights/*` routes after your next deployment

### Environment Setup

The analytics package automatically detects the deployment environment:
- In development (localhost), data is not sent to Vercel
- Only production deployments on Vercel send analytics data

## Viewing Your Data

Once deployed and enabled:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Analytics** tab
4. View real-time data on:
   - Page views
   - Top pages
   - Top referrers
   - Web Vitals
   - Custom events (if tracked)

## Local Development

During local development (`npm run dev`):
- Analytics code runs but doesn't send data to Vercel
- This prevents polluting your analytics with development activity
- Perfect for testing event tracking without affecting production data

To test locally:
1. Open browser DevTools
2. Go to the Network tab
3. Look for requests to `/_vercel/insights/view` (they won't exist locally)

## Customization

### Disabling Analytics

If you need to disable analytics for certain users or environments:

```tsx
import { Analytics } from "@vercel/analytics/react"

// Only show analytics in production
{process.env.NODE_ENV === 'production' && <Analytics />}
```

### Custom Event Tracking

The `@vercel/analytics` package provides a `track` function for more complex scenarios:

```tsx
import { track } from "@vercel/analytics"

track('custom_event', {
  name: 'video_played',
  duration: 120,
  videoId: 'video-123'
})
```

## Best Practices

1. **Track Meaningful Events** - Only track events that help you understand user behavior
2. **Use Consistent Naming** - Use snake_case for event names (e.g., `button_clicked`)
3. **Avoid PII** - Never track personally identifiable information
4. **Test Events** - Verify events are tracked correctly before going to production
5. **Monitor Performance** - Use Speed Insights to catch performance regressions
6. **Set Goals** - Define what success looks like (e.g., checkout completion rate)

## Troubleshooting

### Analytics Not Showing Data

**Check:**
1. Is the project deployed on Vercel? (not localhost)
2. Is Analytics enabled in the Vercel dashboard?
3. Are there any browser console errors?
4. Have users visited the site since enabling analytics?

### Data Delay

Analytics data can take a few minutes to appear in the dashboard. This is normal.

### Speed Insights Not Showing

Real User Monitoring (RUM) requires actual traffic:
1. Wait for users to visit your site
2. Data appears after 24 hours of traffic
3. Lab results appear immediately after deployment

## Next Steps

1. **Deploy to Vercel** - Use `vercel deploy` or connect your Git repository
2. **Enable Analytics** - Go to project settings → Analytics tab → Enable
3. **Monitor Performance** - Check back after 24 hours for initial data
4. **Add Custom Events** - Implement tracking for important user actions
5. **Set Up Goals** - Define success metrics for your business

## Resources

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [@vercel/analytics Package](https://github.com/vercel/analytics)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Vercel Dashboard](https://vercel.com/dashboard)

## Support

For issues or questions:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review the `@vercel/analytics` [GitHub repository](https://github.com/vercel/analytics)
- Verify your project is properly deployed on Vercel
