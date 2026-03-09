/**
 * Firebase Cloud Functions - Main Entry Point
 * VedicTime Microservices API Gateway
 */

import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { auth } from './firebase-config';

// Import microservices
import * as AuthService from './auth-service';
import * as UserService from './user-service';
import * as PanchangService from './panchang-service';
import * as KundaliService from './kundali-service';
import * as AnalyticsService from './analytics-service';

const app = express();

// Enable CORS
app.use(cors({ origin: true }));

// Parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    query: req.query,
    body: req.body,
  });
  next();
});

// ============================================
// MIDDLEWARE: Authentication
// ============================================
async function authMiddleware(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split('Bearer ')[1];
    const verification = await AuthService.verifyToken(token);

    if (!verification.success) {
      return res.status(401).json({ success: false, error: "Unauthorized: Invalid token" });
    }

    // Attach user data to request
    req.userId = verification.data?.userId;
    req.userRole = verification.data?.role;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
}

// ============================================
// MIDDLEWARE: Admin Only
// ============================================
function adminMiddleware(req: any, res: any, next: any) {
  const role = req.userRole;
  
  if (role !== 'admin') {
    return res.status(403).json({ success: false, error: "Forbidden: Admin access required" });
  }
  
  next();
}

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Register new user
app.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name, language, phone } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const result = await AuthService.registerUser(email, password, { name, language, phone });
    
    // Track registration event
    if (result.success) {
      await AnalyticsService.trackEvent('user_registered', result.data?.userId, { email, name });
    }

    return res.status(result.success ? 201 : 400).json(result);
  } catch (error: any) {
    console.error("Registration endpoint error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Login user - Firebase handles this on client side
// This endpoint is for custom token generation if needed
app.post("/auth/custom-token", async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ success: false, error: "Missing userId" });
    }

    const result = await AuthService.createCustomToken(userId);
    return res.json(result);
  } catch (error: any) {
    console.error("Custom token error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Verify token
app.get("/auth/verify", authMiddleware, async (req: any, res) => {
  const userId = req.userId;
  const profile = await UserService.getUserProfile(userId);
  
  return res.json({
    success: true,
    data: {
      userId,
      profile: profile.data
    }
  });
});

// Logout (revoke refresh tokens)
app.post("/auth/logout", authMiddleware, async (req: any, res) => {
  const userId = req.userId;
  const result = await AuthService.revokeRefreshTokens(userId);
  return res.json(result);
});

// ============================================
// USER MANAGEMENT ROUTES
// ============================================

// Get user profile
app.get("/user/profile", authMiddleware, async (req: any, res) => {
  const userId = req.userId;
  const result = await UserService.getUserProfile(userId);
  return res.status(result.success ? 200 : 404).json(result);
});

// Update user profile
app.put("/user/profile", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const updates = req.body;
    
    const result = await UserService.updateUserProfile(userId, updates);
    
    if (result.success) {
      await AnalyticsService.trackEvent('profile_updated', userId, updates);
    }
    
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Update subscription
app.post("/user/subscription", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const { plan, duration } = req.body;
    
    if (!['free', 'premium'].includes(plan)) {
      return res.status(400).json({ success: false, error: "Invalid plan" });
    }
    
    const result = await UserService.updateSubscription(userId, plan, duration);
    
    if (result.success) {
      await AnalyticsService.trackEvent('subscription_changed', userId, { plan, duration });
    }
    
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Update subscription error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Check premium access
app.get("/user/premium", authMiddleware, async (req: any, res) => {
  const userId = req.userId;
  const hasPremium = await UserService.hasPremiumAccess(userId);
  return res.json({ success: true, data: { hasPremium } });
});

// Update preferences
app.put("/user/preferences", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const preferences = req.body;
    const result = await UserService.updatePreferences(userId, preferences);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Update preferences error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Delete account
app.delete("/user/account", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    
    // Track deletion before deleting
    await AnalyticsService.trackEvent('account_deleted', userId, {});
    
    // Delete from Firestore
    const result = await UserService.deleteUserAccount(userId);
    
    // Delete from Auth
    if (result.success) {
      await AuthService.deleteUserAuth(userId);
    }
    
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Delete account error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ============================================
// PANCHANG ROUTES
// ============================================

// Get Panchang for specific date
app.get("/panchang/date/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const calendarType = (req.query.calendarType as string) || 'hindu';
    const userId = (req as any).userId; // Optional
    
    const result = await PanchangService.getPanchangForDate(date, calendarType, userId);
    
    if (result.success && userId) {
      await AnalyticsService.trackEvent('panchang_viewed', userId, { date, calendarType });
    }
    
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Get Panchang error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get Panchang for date range
app.get("/panchang/range", async (req, res) => {
  try {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const calendarType = (req.query.calendarType as string) || 'hindu';
    
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, error: "Missing date range parameters" });
    }
    
    const result = await PanchangService.getPanchangRange(startDate, endDate, calendarType);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Get Panchang range error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ============================================
// KUNDALI ROUTES
// ============================================

// Create new Kundali
app.post("/kundali", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const data = req.body;
    
    // Check premium access
    const hasPremium = await UserService.hasPremiumAccess(userId);
    
    const result = await KundaliService.createKundali(userId, data, hasPremium);
    
    if (result.success) {
      await AnalyticsService.trackEvent('kundali_created', userId, { name: data.name });
    }
    
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error: any) {
    console.error("Create Kundali error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get user's Kundalis
app.get("/kundali", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const result = await KundaliService.getUserKundalis(userId);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Get Kundalis error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get specific Kundali
app.get("/kundali/:id", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const kundaliId = req.params.id;
    const result = await KundaliService.getKundali(userId, kundaliId);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error: any) {
    console.error("Get Kundali error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Delete Kundali
app.delete("/kundali/:id", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const kundaliId = req.params.id;
    
    const result = await KundaliService.deleteKundali(userId, kundaliId);
    
    if (result.success) {
      await AnalyticsService.trackEvent('kundali_deleted', userId, { kundaliId });
    }
    
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Delete Kundali error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ============================================
// ANALYTICS ROUTES (ADMIN ONLY)
// ============================================

// Get global analytics
app.get("/analytics/global", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await AnalyticsService.getGlobalAnalytics();
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Get global analytics error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get user analytics
app.get("/analytics/user/:userId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await AnalyticsService.getUserStats(userId);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error("Get user analytics error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ============================================
// HEALTH CHECK
// ============================================
app.get("/health", (req, res) => {
  return res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================
// 404 Handler
// ============================================
app.use((req, res) => {
  return res.status(404).json({ success: false, error: "Route not found" });
});

// ============================================
// Error Handler
// ============================================
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Server error:", err);
  return res.status(500).json({ success: false, error: "Internal server error" });
});

// Export Cloud Function
export const api = functions.https.onRequest(app);
