import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from "./kv_store.tsx";

// Import microservices
import * as AuthService from "./auth-service.ts";
import * as UserService from "./user-service.ts";
import * as PanchangService from "./panchang-service.ts";
import * as KundaliService from "./kundali-service.ts";
import * as AnalyticsService from "./analytics-service.ts";

const app = new Hono();

// Supabase client for auth verification
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============================================
// MIDDLEWARE: Authentication
// ============================================
async function authMiddleware(c: any, next: any) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, error: "Unauthorized: No token provided" }, 401);
  }

  const token = authHeader.split(' ')[1];
  const verification = await AuthService.verifyToken(token);

  if (!verification.success) {
    return c.json({ success: false, error: "Unauthorized: Invalid token" }, 401);
  }

  // Attach user data to context
  c.set('userId', verification.data?.userId);
  c.set('userRole', verification.data?.role);
  
  await next();
}

// ============================================
// MIDDLEWARE: Admin Only
// ============================================
async function adminMiddleware(c: any, next: any) {
  const role = c.get('userRole');
  
  if (role !== 'admin') {
    return c.json({ success: false, error: "Forbidden: Admin access required" }, 403);
  }
  
  await next();
}

// ============================================
// MIDDLEWARE: Rate Limiting (Simple)
// ============================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimitMiddleware(limit: number, windowMs: number) {
  return async (c: any, next: any) => {
    const userId = c.get('userId') || c.req.header('X-Forwarded-For') || 'anonymous';
    const now = Date.now();
    
    const userLimit = rateLimitMap.get(userId);
    
    if (!userLimit || now > userLimit.resetTime) {
      rateLimitMap.set(userId, { count: 1, resetTime: now + windowMs });
    } else if (userLimit.count >= limit) {
      return c.json({ success: false, error: "Rate limit exceeded" }, 429);
    } else {
      userLimit.count++;
    }
    
    await next();
  };
}

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Register new user
app.post("/make-server-e18c4393/auth/register", async (c) => {
  try {
    const { email, password, name, language, phone } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const result = await AuthService.registerUser(email, password, { name, language, phone });
    
    // Track registration event
    if (result.success) {
      await AnalyticsService.trackEvent('user_registered', result.data?.userId, { email, name });
    }

    return c.json(result, result.success ? 201 : 400);
  } catch (err) {
    console.error("Registration endpoint error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Login user
app.post("/make-server-e18c4393/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ success: false, error: "Missing email or password" }, 400);
    }

    const result = await AuthService.loginUser(email, password);
    
    // Track login event
    if (result.success) {
      await AnalyticsService.trackEvent('user_login', result.data?.user?.id, { email });
    }

    return c.json(result, result.success ? 200 : 401);
  } catch (err) {
    console.error("Login endpoint error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Verify token
app.get("/make-server-e18c4393/auth/verify", authMiddleware, async (c) => {
  const userId = c.get('userId');
  const profile = await UserService.getUserProfile(userId);
  
  return c.json({
    success: true,
    data: {
      userId,
      profile: profile.data
    }
  });
});

// Logout
app.post("/make-server-e18c4393/auth/logout", authMiddleware, async (c) => {
  const token = c.req.header('Authorization')?.split(' ')[1] || '';
  const result = await AuthService.logoutUser(token);
  return c.json(result);
});

// ============================================
// USER MANAGEMENT ROUTES
// ============================================

// Get user profile
app.get("/make-server-e18c4393/user/profile", authMiddleware, async (c) => {
  const userId = c.get('userId');
  const result = await UserService.getUserProfile(userId);
  return c.json(result, result.success ? 200 : 404);
});

// Update user profile
app.put("/make-server-e18c4393/user/profile", authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const updates = await c.req.json();
    
    // Prevent changing sensitive fields
    delete updates.userId;
    delete updates.role;
    delete updates.subscription;
    
    const result = await UserService.updateUserProfile(userId, updates);
    
    if (result.success) {
      await AnalyticsService.trackEvent('profile_updated', userId, updates);
    }
    
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Update profile error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Update subscription
app.post("/make-server-e18c4393/user/subscription", authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const { plan, duration } = await c.req.json();
    
    if (!['free', 'premium'].includes(plan)) {
      return c.json({ success: false, error: "Invalid plan" }, 400);
    }
    
    const result = await UserService.updateSubscription(userId, plan, duration);
    
    if (result.success) {
      await AnalyticsService.trackEvent('subscription_changed', userId, { plan, duration });
    }
    
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Update subscription error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Check premium access
app.get("/make-server-e18c4393/user/premium", authMiddleware, async (c) => {
  const userId = c.get('userId');
  const hasPremium = await UserService.hasPremiumAccess(userId);
  return c.json({ success: true, data: { hasPremium } });
});

// Update preferences
app.put("/make-server-e18c4393/user/preferences", authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const preferences = await c.req.json();
    const result = await UserService.updatePreferences(userId, preferences);
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Update preferences error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Delete account
app.delete("/make-server-e18c4393/user/account", authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    
    // Track deletion before deleting
    await AnalyticsService.trackEvent('account_deleted', userId, {});
    
    const result = await UserService.deleteUserAccount(userId);
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Delete account error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// ============================================
// PANCHANG ROUTES
// ============================================

// Get Panchang for specific date
app.get("/make-server-e18c4393/panchang/date/:date", rateLimitMiddleware(100, 60000), async (c) => {
  try {
    const date = c.req.param('date');
    const calendarType = c.req.query('calendarType') || 'hindu';
    const userId = c.get('userId'); // Optional - may be undefined if not authenticated
    
    const result = await PanchangService.getPanchangForDate(date, calendarType, userId);
    
    if (result.success && userId) {
      await AnalyticsService.trackEvent('panchang_viewed', userId, { date, calendarType });
    }
    
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Get Panchang error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Get Panchang for date range
app.get("/make-server-e18c4393/panchang/range", rateLimitMiddleware(50, 60000), async (c) => {
  try {
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');
    const calendarType = c.req.query('calendarType') || 'hindu';
    
    if (!startDate || !endDate) {
      return c.json({ success: false, error: "Missing date range parameters" }, 400);
    }
    
    const result = await PanchangService.getPanchangRange(startDate, endDate, calendarType);
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Get Panchang range error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// ============================================
// KUNDALI ROUTES
// ============================================

// Create new Kundali
app.post("/make-server-e18c4393/kundali", authMiddleware, rateLimitMiddleware(10, 60000), async (c) => {
  try {
    const userId = c.get('userId');
    const data = await c.req.json();
    
    // Check premium access
    const hasPremium = await UserService.hasPremiumAccess(userId);
    
    const result = await KundaliService.createKundali(userId, data, hasPremium);
    
    if (result.success) {
      await AnalyticsService.trackEvent('kundali_created', userId, { name: data.name });
    }
    
    return c.json(result, result.success ? 201 : 400);
  } catch (err) {
    console.error("Create Kundali error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Get user's Kundalis
app.get("/make-server-e18c4393/kundali", authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const result = await KundaliService.getUserKundalis(userId);
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Get Kundalis error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Get specific Kundali
app.get("/make-server-e18c4393/kundali/:id", authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const kundaliId = c.req.param('id');
    const result = await KundaliService.getKundali(userId, kundaliId);
    return c.json(result, result.success ? 200 : 404);
  } catch (err) {
    console.error("Get Kundali error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Delete Kundali
app.delete("/make-server-e18c4393/kundali/:id", authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const kundaliId = c.req.param('id');
    
    const result = await KundaliService.deleteKundali(userId, kundaliId);
    
    if (result.success) {
      await AnalyticsService.trackEvent('kundali_deleted', userId, { kundaliId });
    }
    
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Delete Kundali error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// ============================================
// ANALYTICS ROUTES (ADMIN ONLY)
// ============================================

// Get global analytics
app.get("/make-server-e18c4393/analytics/global", authMiddleware, adminMiddleware, async (c) => {
  try {
    const result = await AnalyticsService.getGlobalAnalytics();
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Get global analytics error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// Get user analytics
app.get("/make-server-e18c4393/analytics/user/:userId", authMiddleware, adminMiddleware, async (c) => {
  try {
    const userId = c.req.param('userId');
    const result = await AnalyticsService.getUserStats(userId);
    return c.json(result, result.success ? 200 : 400);
  } catch (err) {
    console.error("Get user analytics error:", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// ============================================
// HEALTH CHECK
// ============================================
app.get("/make-server-e18c4393/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================
// 404 Handler
// ============================================
app.notFound((c) => {
  return c.json({ success: false, error: "Route not found" }, 404);
});

// ============================================
// Error Handler
// ============================================
app.onError((err, c) => {
  console.error("Server error:", err);
  return c.json({ success: false, error: "Internal server error" }, 500);
});

Deno.serve(app.fetch);
