# Integration Guide

## Make.com Webhook Setup

### 1. Newsletter Signup Integration

**File**: `src/components/NewsletterForm.tsx`

Replace the console.log with:
\`\`\`typescript
// In handleSubmit function
const response = await fetch(process.env.VITE_NEWSLETTER_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: formData.name, email: formData.email })
})
\`\`\`

**Make.com Flow**:
1. Create new scenario in Make.com
2. Add HTTP → Make a request
3. URL: Get from v0's Environment Variables
4. Method: POST
5. Body: `{"name": "", "email": ""}`
6. Add Email notification or database update action

### 2. Order Submission Integration

**File**: `src/components/CheckoutForm.tsx`

Replace the console.log with:
\`\`\`typescript
// In handleSubmit function
const formDataObj = new FormData()
Object.entries(submitData).forEach(([key, value]) => {
  if (key !== 'paymentSlip') formDataObj.append(key, value as any)
})
if (paymentFile) formDataObj.append('paymentSlip', paymentFile)

const response = await fetch(process.env.VITE_ORDER_WEBHOOK_URL, {
  method: 'POST',
  body: formDataObj
})
\`\`\`

**Make.com Flow**:
1. Create new scenario
2. Add HTTP → Make a request with form-data
3. Map all checkout fields
4. Send order to your database
5. Trigger email confirmation
6. Store payment slip

### 3. Environment Variables

Create `.env.local`:
\`\`\`
VITE_NEWSLETTER_WEBHOOK_URL=https://hook.make.com/...
VITE_ORDER_WEBHOOK_URL=https://hook.make.com/...
\`\`\`

## Order Number Format

Order numbers are auto-generated: `NNM-YYYYMMDD-XXXX`
- Prefix: NNM (Now or Never Magazine)
- Date: Year-Month-Day (YYYYMMDD)
- Random: 4-digit random number

Example: `NNM-20250215-7834`

## Payment Processing

### Current Setup
- QR code image placeholder
- File upload for payment slip
- No automatic payment processing

### To Add Payment Gateway
1. Replace QR code image with Stripe/Omise QR
2. Use Stripe Connect for Thai account
3. Validate payment before confirming order

## Database Connection

The checkout form is ready for database integration. To add:

1. **Supabase** (Recommended for Thai market):
   \`\`\`typescript
   // In utils/supabase.ts
   import { createClient } from '@supabase/supabase-js'
   export const supabase = createClient(URL, KEY)
   \`\`\`

2. **Neon PostgreSQL**:
   \`\`\`typescript
   import { neon } from '@neondatabase/serverless'
   const sql = neon(process.env.DATABASE_URL)
   \`\`\`

3. **Store orders**:
   \`\`\`typescript
   await sql`
     INSERT INTO orders (order_number, customer_name, email, phone, ...)
     VALUES ($1, $2, $3, ...)
   `
   \`\`\`

## Email Notifications

Recommended: SendGrid or AWS SES

Example with Make.com:
1. After order submission
2. Send confirmation email with order number
3. Attach payment slip as evidence
4. Include tracking link

## Analytics & Tracking

Add to `index.html` or `src/main.tsx`:
\`\`\`html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>

<!-- Facebook Pixel -->
<script>!function(f,b,e,v,n,t,s)...</script>
\`\`\`

## Testing Checklist

- [ ] Newsletter form submissions
- [ ] Order form validation (all fields)
- [ ] Thai phone number validation
- [ ] Postal code validation
- [ ] File upload (all formats)
- [ ] Order number generation unique
- [ ] Thank you page redirects
- [ ] Language switching (EN/TH)
- [ ] Mobile responsiveness (360-1440px)
- [ ] Form error messages display
- [ ] Image loading performance

---

Ready to launch? Start with the newsletter integration first to test your Make.com setup!
