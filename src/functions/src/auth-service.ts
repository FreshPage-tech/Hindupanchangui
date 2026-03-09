/**
 * Authentication Service (Firebase)
 * Handles user authentication, session management, and token verification
 */

import { auth, firestore, COLLECTIONS, getTimestamp } from './firebase-config';

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Register new user
 */
export async function registerUser(
  email: string,
  password: string,
  userData: {
    name: string;
    language?: string;
    phone?: string;
  }
): Promise<AuthResponse> {
  try {
    // Validate input
    if (!email || !password || !userData.name) {
      return { success: false, error: "Missing required fields" };
    }

    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" };
    }

    // Create user with Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: userData.name,
      phoneNumber: userData.phone,
    });

    // Store additional user data in Firestore
    await firestore.collection(COLLECTIONS.USERS).doc(userRecord.uid).set({
      userId: userRecord.uid,
      email: userRecord.email,
      name: userData.name,
      language: userData.language || 'en',
      phone: userData.phone || '',
      role: 'user',
      subscription: {
        plan: 'free',
        features: ['limited_kundali', 'ads_enabled', 'basic_content'],
      },
      preferences: {
        notifications: true,
        emailUpdates: false,
        theme: 'light',
        defaultCalendar: 'hindu',
      },
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    });

    // Set custom claims for role
    await auth.setCustomUserClaims(userRecord.uid, { role: 'user' });

    return {
      success: true,
      data: {
        userId: userRecord.uid,
        email: userRecord.email,
        name: userData.name,
      }
    };
  } catch (err: any) {
    console.error("Registration error:", err);
    return { success: false, error: err.message || "Registration failed" };
  }
}

/**
 * Verify user token and return user data
 */
export async function verifyToken(token: string): Promise<AuthResponse> {
  try {
    if (!token) {
      return { success: false, error: "No token provided" };
    }

    const decodedToken = await auth.verifyIdToken(token);

    return {
      success: true,
      data: {
        userId: decodedToken.uid,
        email: decodedToken.email,
        role: decodedToken.role || 'user',
      }
    };
  } catch (err: any) {
    console.error("Token verification error:", err);
    return { success: false, error: "Invalid or expired token" };
  }
}

/**
 * Get user by email (for login verification)
 */
export async function getUserByEmail(email: string): Promise<AuthResponse> {
  try {
    const userRecord = await auth.getUserByEmail(email);
    return {
      success: true,
      data: {
        userId: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
      }
    };
  } catch (err: any) {
    console.error("Get user by email error:", err);
    return { success: false, error: "User not found" };
  }
}

/**
 * Delete user (for logout/account deletion)
 */
export async function deleteUserAuth(userId: string): Promise<AuthResponse> {
  try {
    await auth.deleteUser(userId);
    return { success: true, data: { message: "User deleted successfully" } };
  } catch (err: any) {
    console.error("Delete user error:", err);
    return { success: false, error: "Failed to delete user" };
  }
}

/**
 * Create custom token for user
 */
export async function createCustomToken(userId: string): Promise<AuthResponse> {
  try {
    const customToken = await auth.createCustomToken(userId);
    return {
      success: true,
      data: { customToken }
    };
  } catch (err: any) {
    console.error("Create custom token error:", err);
    return { success: false, error: "Failed to create custom token" };
  }
}

/**
 * Update user password
 */
export async function updatePassword(userId: string, newPassword: string): Promise<AuthResponse> {
  try {
    await auth.updateUser(userId, { password: newPassword });
    return { success: true, data: { message: "Password updated successfully" } };
  } catch (err: any) {
    console.error("Update password error:", err);
    return { success: false, error: "Failed to update password" };
  }
}

/**
 * Revoke refresh tokens (logout)
 */
export async function revokeRefreshTokens(userId: string): Promise<AuthResponse> {
  try {
    await auth.revokeRefreshTokens(userId);
    return { success: true, data: { message: "Logged out successfully" } };
  } catch (err: any) {
    console.error("Revoke tokens error:", err);
    return { success: false, error: "Failed to logout" };
  }
}
