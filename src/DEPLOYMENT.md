# VedicTime - Deployment Guide

## Prerequisites

- Supabase project (already set up)
- Node.js 18+ installed
- Git repository
- Domain name (optional)

## Step 1: Backend Deployment (Supabase Edge Functions)

The backend microservices are already configured in `/supabase/functions/server/`

### 1.1 Verify Supabase CLI Installation

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login
```

### 1.2 Link to Your Project

```bash
# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_ID
```

### 1.3 Set Environment Variables in Supabase

Go to Supabase Dashboard → Project Settings → Edge Functions → Secrets

Add these secrets:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 1.4 Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific function
supabase functions deploy make-server-e18c4393
```

### 1.5 Test Backend

```bash
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-e18c4393/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-03-09T10:30:00.000Z"
}
```

## Step 2: Frontend Deployment

### 2.1 Set Environment Variables

Create `.env` file in project root:

```env
VITE_API_BASE_URL=https://YOUR_PROJECT.supabase.co/functions/v1/make-server-e18c4393
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ENABLE_SOCIAL_LOGIN=false
VITE_ENABLE_ANALYTICS=true
```

**How to get these values:**
1. Go to Supabase Dashboard
2. Project Settings → API
3. Copy Project URL (SUPABASE_URL)
4. Copy `anon` key (SUPABASE_ANON_KEY)
5. ⚠️ **NEVER** use the `service_role` key in frontend!

### 2.2 Build Frontend

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### 2.3 Deploy to Vercel (Recommended)

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables when prompted
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import your Git repository
4. Add environment variables:
   - `VITE_API_BASE_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ENABLE_SOCIAL_LOGIN`
   - `VITE_ENABLE_ANALYTICS`
5. Click "Deploy"

### 2.4 Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

### 2.5 Deploy to Cloudflare Pages

1. Push to Git repository
2. Go to Cloudflare Pages dashboard
3. Connect repository
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variables
7. Deploy

## Step 3: Database Setup

### 3.1 Enable Row Level Security

Go to Supabase Dashboard → Database → Tables → `kv_store_e18c4393`

```sql
-- Enable RLS
ALTER TABLE kv_store_e18c4393 ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data
CREATE POLICY "Users can access own data"
ON kv_store_e18c4393
FOR ALL
USING (
  key LIKE 'user:' || auth.uid() || '%'
  OR key LIKE 'kundali:' || auth.uid() || '%'
  OR key LIKE 'favorite:' || auth.uid() || '%'
);

-- Policy: Service role can access all data
CREATE POLICY "Service role full access"
ON kv_store_e18c4393
FOR ALL
TO service_role
USING (true);

-- Policy: Anonymous users can read panchang data
CREATE POLICY "Anonymous read panchang"
ON kv_store_e18c4393
FOR SELECT
USING (key LIKE 'panchang:%');
```

### 3.2 Create Indexes for Performance

```sql
-- Index on key column for faster lookups
CREATE INDEX IF NOT EXISTS idx_kv_key ON kv_store_e18c4393(key);

-- Index for user-specific queries
CREATE INDEX IF NOT EXISTS idx_kv_user_prefix ON kv_store_e18c4393(key) 
WHERE key LIKE 'user:%';

-- Index for kundali queries
CREATE INDEX IF NOT EXISTS idx_kv_kundali_prefix ON kv_store_e18c4393(key) 
WHERE key LIKE 'kundali:%';
```

## Step 4: Configure Authentication

### 4.1 Email Authentication

Already configured by default through Supabase Auth.

### 4.2 Social OAuth (Optional)

If you want to enable Google/Facebook login:

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google/Facebook
3. Follow setup instructions at:
   - Google: https://supabase.com/docs/guides/auth/social-login/auth-google
   - Facebook: https://supabase.com/docs/guides/auth/social-login/auth-facebook
4. Update frontend env: `VITE_ENABLE_SOCIAL_LOGIN=true`

## Step 5: Testing Production

### 5.1 Test Authentication Flow

```bash
# Register
curl -X POST https://YOUR_DOMAIN/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123","name":"Test User"}'

# Login
curl -X POST https://YOUR_DOMAIN/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'
```

### 5.2 Test Panchang API

```bash
# Get today's Panchang
curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-e18c4393/panchang/date/2024-03-09" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5.3 Test Kundali API

```bash
# Create Kundali (requires authentication)
curl -X POST "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-e18c4393/kundali" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Test User",
    "dateOfBirth": "1990-01-15",
    "timeOfBirth": "10:30",
    "placeOfBirth": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "latitude": 19.0760,
      "longitude": 72.8777
    }
  }'
```

## Step 6: Monitoring & Analytics

### 6.1 Enable Supabase Monitoring

1. Go to Supabase Dashboard → Reports
2. Monitor:
   - API requests
   - Database performance
   - Edge Function executions
   - Error rates

### 6.2 Set Up Alerts

1. Supabase Dashboard → Project Settings → Notifications
2. Configure alerts for:
   - High error rates
   - Slow queries
   - Resource limits

### 6.3 External Monitoring (Optional)

**Sentry for Error Tracking:**
```bash
npm install @sentry/react

# Add to your app
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

## Step 7: Custom Domain Setup

### 7.1 For Frontend (Vercel)

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

### 7.2 For Backend (Supabase)

1. Go to Project Settings → Custom Domains
2. Add your API subdomain (e.g., `api.vedictime.com`)
3. Update DNS records
4. Update frontend `VITE_API_BASE_URL` to use custom domain

## Step 8: Security Hardening

### 8.1 Enable HTTPS Only

Vercel/Netlify automatically enforce HTTPS. No action needed.

### 8.2 Configure CORS

Already configured in backend. To restrict to specific domain:

```typescript
// In /supabase/functions/server/index.tsx
app.use(
  "/*",
  cors({
    origin: "https://yourdomain.com", // Restrict to your domain
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
```

### 8.3 Rate Limiting

Already implemented in backend. Adjust limits if needed:

```typescript
// In index.tsx
rateLimitMiddleware(100, 60000) // 100 requests per minute
```

## Step 9: Backup Strategy

### 9.1 Enable Database Backups

1. Supabase Dashboard → Database → Backups
2. Enable automatic daily backups
3. Configure retention period

### 9.2 Export User Data (Weekly)

```bash
# Create backup script
npm run backup-users
```

## Step 10: CI/CD Pipeline (Optional)

### 10.1 GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: supabase/setup-cli@v1
      - run: supabase functions deploy
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: vercel/actions@v2
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Troubleshooting

### Issue: API returns 401 Unauthorized

**Solution:**
- Check if token is being sent in Authorization header
- Verify token hasn't expired
- Check if user is registered

### Issue: Panchang calculation returns error

**Solution:**
- Verify date format is correct (YYYY-MM-DD)
- Check backend logs in Supabase Edge Functions

### Issue: Kundali creation fails

**Solution:**
- Check if user has reached free limit (3 Kundalis)
- Verify premium subscription status
- Check backend logs for calculation errors

### Issue: Environment variables not working

**Solution:**
- Rebuild frontend after changing .env
- Verify environment variables in deployment platform
- Check variable names have VITE_ prefix

## Production Checklist

- [ ] Backend deployed to Supabase Edge Functions
- [ ] Frontend deployed to hosting platform
- [ ] Environment variables configured
- [ ] Database RLS policies enabled
- [ ] Authentication tested
- [ ] API endpoints tested
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Error tracking enabled
- [ ] Rate limiting verified
- [ ] Security audit completed

## Post-Deployment

1. **Monitor Usage:**
   - Track API calls
   - Monitor database size
   - Check error rates

2. **User Feedback:**
   - Collect user feedback
   - Track feature usage
   - Identify bottlenecks

3. **Performance Optimization:**
   - Optimize slow queries
   - Add caching where needed
   - Optimize bundle size

4. **Regular Updates:**
   - Update dependencies monthly
   - Apply security patches
   - Monitor Supabase updates

## Support

For deployment issues:
1. Check Supabase Edge Functions logs
2. Check frontend browser console
3. Review ARCHITECTURE.md
4. Contact Supabase support for platform issues

---

**Deployment complete! Your production-ready VedicTime app is now live.** 🚀
