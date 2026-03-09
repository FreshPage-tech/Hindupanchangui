/**
 * User Management Service (Firebase)
 * Handles user profile, preferences, and subscription management
 */

import { firestore, COLLECTIONS, getTimestamp } from './firebase-config';

export interface UserProfile {
  userId: string;
  email: string;
  name: string;
  phone?: string;
  language: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    timezone?: string;
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark';
    defaultCalendar: string;
  };
  subscription: {
    plan: 'free' | 'premium';
    startDate?: any;
    endDate?: any;
    features: string[];
  };
  role: 'user' | 'admin';
  createdAt: any;
  updatedAt: any;
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
  try {
    const userDoc = await firestore.collection(COLLECTIONS.USERS).doc(userId).get();

    if (!userDoc.exists) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: userDoc.data() as UserProfile };
  } catch (err: any) {
    console.error("Get user profile error:", err);
    return { success: false, error: "Failed to fetch user profile" };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
  try {
    // Prevent changing sensitive fields
    delete (updates as any).userId;
    delete (updates as any).role;
    delete (updates as any).createdAt;

    // Add updated timestamp
    const updateData = {
      ...updates,
      updatedAt: getTimestamp(),
    };

    await firestore.collection(COLLECTIONS.USERS).doc(userId).update(updateData);

    // Get updated profile
    const profile = await getUserProfile(userId);
    return profile;
  } catch (err: any) {
    console.error("Update profile error:", err);
    return { success: false, error: "Failed to update profile" };
  }
}

/**
 * Update subscription
 */
export async function updateSubscription(
  userId: string,
  plan: 'free' | 'premium',
  duration?: number // in days
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const startDate = new Date();
    const endDate = duration ? new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000) : null;

    const subscriptionData = {
      plan,
      startDate: startDate.toISOString(),
      endDate: endDate?.toISOString(),
      features: plan === 'premium' 
        ? ['unlimited_kundali', 'ad_free', 'premium_content', 'offline_access', 'priority_support']
        : ['limited_kundali', 'ads_enabled', 'basic_content'],
    };

    // Update subscription in user profile
    await firestore.collection(COLLECTIONS.USERS).doc(userId).update({
      subscription: subscriptionData,
      updatedAt: getTimestamp(),
    });

    // Log subscription change
    await firestore.collection(COLLECTIONS.SUBSCRIPTIONS).add({
      userId,
      plan,
      startDate: startDate.toISOString(),
      endDate: endDate?.toISOString(),
      timestamp: getTimestamp(),
    });

    return { success: true, data: subscriptionData };
  } catch (err: any) {
    console.error("Update subscription error:", err);
    return { success: false, error: "Failed to update subscription" };
  }
}

/**
 * Check if user has premium access
 */
export async function hasPremiumAccess(userId: string): Promise<boolean> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile.success || !profile.data) {
      return false;
    }

    const subscription = profile.data.subscription;
    if (subscription.plan !== 'premium') {
      return false;
    }

    // Check if subscription is expired
    if (subscription.endDate) {
      const endDate = new Date(subscription.endDate);
      if (endDate < new Date()) {
        // Subscription expired, downgrade to free
        await updateSubscription(userId, 'free');
        return false;
      }
    }

    return true;
  } catch (err: any) {
    console.error("Check premium access error:", err);
    return false;
  }
}

/**
 * Update user preferences
 */
export async function updatePreferences(
  userId: string,
  preferences: Partial<UserProfile['preferences']>
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile.success || !profile.data) {
      return { success: false, error: "User not found" };
    }

    const updatedPreferences = {
      ...profile.data.preferences,
      ...preferences,
    };

    await firestore.collection(COLLECTIONS.USERS).doc(userId).update({
      preferences: updatedPreferences,
      updatedAt: getTimestamp(),
    });

    return { success: true, data: { preferences: updatedPreferences } };
  } catch (err: any) {
    console.error("Update preferences error:", err);
    return { success: false, error: "Failed to update preferences" };
  }
}

/**
 * Delete user account
 */
export async function deleteUserAccount(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete user data from Firestore
    await firestore.collection(COLLECTIONS.USERS).doc(userId).delete();

    // Delete user's Kundalis
    const kundalisSnapshot = await firestore
      .collection(COLLECTIONS.KUNDALIS)
      .where('userId', '==', userId)
      .get();

    const batch = firestore.batch();
    kundalisSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return { success: true };
  } catch (err: any) {
    console.error("Delete account error:", err);
    return { success: false, error: "Failed to delete account" };
  }
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<{ success: boolean; data?: UserProfile[]; error?: string }> {
  try {
    const snapshot = await firestore.collection(COLLECTIONS.USERS).get();
    const users = snapshot.docs.map(doc => doc.data() as UserProfile);
    return { success: true, data: users };
  } catch (err: any) {
    console.error("Get all users error:", err);
    return { success: false, error: "Failed to fetch users" };
  }
}
