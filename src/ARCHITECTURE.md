# VedicTime - Production Microservices Architecture

## Overview

VedicTime has been architected as a **production-ready microservices application** with strict security rules, where the frontend contains ZERO business logic and ALL calculations happen on secure backend services.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  (React + TypeScript - UI ONLY, NO BUSINESS LOGIC)         │
│  - Components                                                │
│  - API Service Layer                                         │
│  - State Management                                          │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS/REST API
                   │ JWT Authentication
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY                              │
│  (Hono Server on Supabase Edge Functions)                   │
│  - Authentication Middleware                                 │
│  - Rate Limiting                                             │
│  - Request Validation                                        │
│  - CORS & Security Headers                                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
       ┌───────────┴───────────┬─────────────┬────────────┐
       ▼                       ▼             ▼            ▼
┌─────────────┐    ┌──────────────┐  ┌────────────┐ ┌──────────┐
│   Auth      │    │    User      │  │  Panchang  │ │ Kundali  │
│  Service    │    │  Service     │  │  Service   │ │ Service  │
│             │    │              │  │            │ │          │
│ - Register  │    │ - Profile    │  │ - Calc     │ │ - Gen    │
│ - Login     │    │ - Subscript. │  │ - Calendar │ │ - Report │
│ - Verify    │    │ - Preferences│  │ - Timings  │ │ - Dashas │
│ - Logout    │    │ - Delete     │  │ - Muhurat  │ │ - Predict│
└─────────────┘    └──────────────┘  └────────────┘ └──────────┘
       │                  │               │              │
       └──────────────────┴───────────────┴──────────────┘
                          │
                          ▼
        ┌──────────────────────────────────────────┐
        │         DATABASE LAYER                    │
        │  (Supabase PostgreSQL + Row Level Sec.)  │
        │  - kv_store_e18c4393 (Key-Value Store)   │
        │  - User Data (Isolated by userId)        │
        │  - Analytics Events                       │
        │  - Kundali Records                        │
        └──────────────────────────────────────────┘
```

## Security Architecture

### 1. Frontend Security
- ✅ **NO Business Logic** - Frontend only renders UI and calls APIs
- ✅ **NO Calculations** - All Panchang, Kundali calculations on backend
- ✅ **NO Direct Database Access** - All data through authenticated APIs
- ✅ **Environment Variables** - No hardcoded secrets
- ✅ **Token Storage** - Secure token management with localStorage

### 2. Backend Security
- ✅ **Authentication Required** - JWT token verification on protected routes
- ✅ **Authorization** - Role-based access control (User, Admin)
- ✅ **Rate Limiting** - Prevent API abuse (100 req/min per user)
- ✅ **Input Validation** - All inputs validated before processing
- ✅ **Error Handling** - Secure error messages (no stack traces exposed)
- ✅ **Audit Logging** - All important actions logged for security

### 3. Database Security
- ✅ **Row Level Security (RLS)** - Users can only access their own data
- ✅ **Service Role Key** - Backend uses service role for full access
- ✅ **Data Isolation** - User data prefixed with userId
- ✅ **Encrypted Storage** - Sensitive data encrypted at rest

## Microservices

### 1. Authentication Service (`auth-service.ts`)
**Purpose:** Handle all authentication and session management

**Endpoints:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/verify` - Verify token validity
- `POST /auth/logout` - Logout user

**Security:**
- Passwords hashed with Supabase Auth
- JWT tokens for session management
- Token expiry and refresh handling
- Email verification (configurable)

### 2. User Management Service (`user-service.ts`)
**Purpose:** Manage user profiles, subscriptions, and preferences

**Endpoints:**
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update profile
- `POST /user/subscription` - Update subscription plan
- `GET /user/premium` - Check premium status
- `PUT /user/preferences` - Update user preferences
- `DELETE /user/account` - Delete user account

**Business Rules:**
- Free users: 3 Kundali limit
- Premium users: Unlimited Kundali
- Subscription validation and expiry checking
- Cascading delete on account removal

### 3. Panchang Service (`panchang-service.ts`)
**Purpose:** Calculate Hindu calendar data and astrological timings

**Endpoints:**
- `GET /panchang/date/:date` - Get Panchang for specific date
- `GET /panchang/range` - Get Panchang for date range (max 31 days)

**Calculations (ALL SERVER-SIDE):**
- Tithi (Lunar day) calculation
- Nakshatra (Constellation) determination
- Yoga and Karana calculation
- Rahu Kaal, Gulika Kaal, Yamaganda timings
- Auspicious Muhurat times
- Calendar conversions (12+ calendar types)

**Rate Limiting:**
- 100 requests per minute per user
- 50 requests per minute for range queries

### 4. Kundali Service (`kundali-service.ts`)
**Purpose:** Generate and manage birth charts (Kundali)

**Endpoints:**
- `POST /kundali` - Create new Kundali
- `GET /kundali` - Get all user Kundalis
- `GET /kundali/:id` - Get specific Kundali
- `DELETE /kundali/:id` - Delete Kundali

**Calculations (ALL SERVER-SIDE):**
- Planetary positions
- House calculations
- Dasha periods
- Predictions and analysis
- Sun sign, Moon sign, Ascendant

**Access Control:**
- Free users: Maximum 3 Kundalis
- Premium users: Unlimited Kundalis
- Users can only access their own Kundalis

### 5. Analytics Service (`analytics-service.ts`)
**Purpose:** Track user behavior and application metrics

**Endpoints:**
- `GET /analytics/global` - Get global analytics (Admin only)
- `GET /analytics/user/:userId` - Get user-specific analytics (Admin only)

**Events Tracked:**
- User registration
- User login
- Profile updates
- Subscription changes
- Panchang views
- Kundali creation/deletion
- Account deletion

## API Integration (Frontend)

### Using the API Service

```typescript
import { AuthAPI, UserAPI, PanchangAPI, KundaliAPI } from './utils/api-service';

// Authentication
const result = await AuthAPI.login({ email, password });
if (result.success) {
  // Token automatically stored
  console.log('Logged in:', result.data);
}

// Get Panchang (NO CALCULATION IN FRONTEND)
const panchang = await PanchangAPI.getForDate('2024-03-09', 'hindu');
console.log('Today's Panchang:', panchang.data);

// Create Kundali (NO CALCULATION IN FRONTEND)
const kundali = await KundaliAPI.create({
  name: 'John Doe',
  dateOfBirth: '1990-01-15',
  timeOfBirth: '10:30',
  placeOfBirth: {
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    latitude: 19.0760,
    longitude: 72.8777
  }
});
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-project.supabase.co/functions/v1/make-server-e18c4393
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ENABLE_SOCIAL_LOGIN=false
VITE_ENABLE_ANALYTICS=true
```

### Backend (Supabase Edge Function)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**IMPORTANT:** 
- ❌ NEVER expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- ✅ Only use `SUPABASE_ANON_KEY` in frontend
- ✅ All sensitive operations use Service Role Key on backend

## Deployment

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy to Vercel/Netlify/Cloudflare Pages
3. Set environment variables in deployment platform

### Backend Deployment
1. Deploy to Supabase Edge Functions (already configured)
2. Set environment variables in Supabase dashboard
3. Functions are automatically scaled and distributed globally

## Data Flow Example: Create Kundali

```
1. User clicks "Generate Kundali" in UI
   └─> Frontend collects birth details (name, DOB, time, place)

2. Frontend calls API
   └─> KundaliAPI.create(data)
   └─> POST /kundali with Bearer token

3. API Gateway validates request
   └─> Check authentication token
   └─> Verify user is authenticated
   └─> Check rate limit

4. Kundali Service processes request
   └─> Check user's premium status
   └─> Verify Kundali limit (3 for free, unlimited for premium)
   └─> Perform complex astronomical calculations
   └─> Calculate planetary positions
   └─> Generate predictions
   └─> Store in database with userId prefix

5. Response sent back to frontend
   └─> Frontend displays Kundali report
   └─> NO calculations done in frontend
   └─> All data comes from secure API
```

## Role-Based Access Control (RBAC)

### User Role
- Access own profile
- Create/view/delete own Kundalis (within limits)
- View Panchang data
- Update own preferences
- Subscribe to premium

### Admin Role
- All User permissions
- View global analytics
- View any user's analytics
- Manage user accounts (future)
- View system health

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| Auth endpoints | 10 req | 1 minute |
| Panchang single date | 100 req | 1 minute |
| Panchang range | 50 req | 1 minute |
| Create Kundali | 10 req | 1 minute |
| Other endpoints | 100 req | 1 minute |

## Premium Features Gate

```typescript
// Backend checks premium status
const hasPremium = await UserService.hasPremiumAccess(userId);

if (!hasPremium) {
  // Check limits
  const existingKundalis = await KundaliService.getUserKundalis(userId);
  if (existingKundalis.data.length >= 3) {
    return { 
      success: false, 
      error: "Upgrade to Premium for unlimited Kundalis" 
    };
  }
}
```

## Security Best Practices Implemented

✅ **Authentication:** JWT-based with Supabase Auth  
✅ **Authorization:** Role-based access control  
✅ **Input Validation:** All inputs validated  
✅ **Rate Limiting:** Prevent API abuse  
✅ **CORS:** Properly configured  
✅ **Error Handling:** Secure error messages  
✅ **Logging:** Comprehensive audit trail  
✅ **No SQL Injection:** Using Supabase ORM  
✅ **No XSS:** React sanitizes by default  
✅ **HTTPS Only:** All API calls over HTTPS  
✅ **Token Security:** Tokens in Authorization header  

## Testing the APIs

```bash
# Register user
curl -X POST https://your-project.supabase.co/functions/v1/make-server-e18c4393/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST https://your-project.supabase.co/functions/v1/make-server-e18c4393/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Panchang (use token from login)
curl -X GET "https://your-project.supabase.co/functions/v1/make-server-e18c4393/panchang/date/2024-03-09?calendarType=hindu" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Production Checklist

- [ ] Set all environment variables
- [ ] Enable Supabase Row Level Security policies
- [ ] Configure rate limiting thresholds
- [ ] Set up monitoring and alerts
- [ ] Enable error tracking (Sentry)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Enable HTTPS only
- [ ] Configure domain and SSL
- [ ] Test all API endpoints
- [ ] Load test critical endpoints
- [ ] Security audit
- [ ] Penetration testing

## Support & Maintenance

For issues or questions:
1. Check API logs in Supabase Edge Functions dashboard
2. Review error messages in frontend console
3. Verify environment variables are set correctly
4. Check authentication token validity
5. Verify rate limits are not exceeded

---

**Built with security, scalability, and best practices in mind.** 🔒⚡🚀
