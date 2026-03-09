/**
 * User Management Service
 * Handles user profile, preferences, and subscription management
 */

import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

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
    startDate?: string;
    endDate?: string;
    features: string[];
  };
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('kv_store_e18c4393')
      .select('value')
      .eq('key', `user:${userId}`)
      .single();

    if (error || !data) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: data.value as UserProfile };
  } catch (err) {
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
    // Get current profile
    const currentProfile = await getUserProfile(userId);
    if (!currentProfile.success || !currentProfile.data) {
      return { success: false, error: "User not found" };
    }

    // Merge updates
    const updatedProfile = {
      ...currentProfile.data,
      ...updates,
      userId, // Ensure userId cannot be changed
      updatedAt: new Date().toISOString(),
    };

    // Save to database
    const { error } = await supabase
      .from('kv_store_e18c4393')
      .update({ value: updatedProfile })
      .eq('key', `user:${userId}`);

    if (error) {
      console.error("Update profile error:", error);
      return { success: false, error: "Failed to update profile" };
    }

    return { success: true, data: updatedProfile };
  } catch (err) {
    console.error("Update profile exception:", err);
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
    const profile = await getUserProfile(userId);
    if (!profile.success || !profile.data) {
      return { success: false, error: "User not found" };
    }

    const startDate = new Date();
    const endDate = duration ? new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000) : undefined;

    const subscriptionData = {
      plan,
      startDate: startDate.toISOString(),
      endDate: endDate?.toISOString(),
      features: plan === 'premium' 
        ? ['unlimited_kundali', 'ad_free', 'premium_content', 'offline_access', 'priority_support']
        : ['limited_kundali', 'ads_enabled', 'basic_content'],
    };

    // Update subscription in user profile
    const updated = await updateUserProfile(userId, {
      subscription: subscriptionData,
    });

    if (!updated.success) {
      return { success: false, error: "Failed to update subscription" };
    }

    // Log subscription change
    await supabase
      .from('kv_store_e18c4393')
      .insert({
        key: `subscription_log:${userId}:${Date.now()}`,
        value: {
          userId,
          plan,
          startDate: startDate.toISOString(),
          endDate: endDate?.toISOString(),
          timestamp: new Date().toISOString(),
        }
      });

    return { success: true, data: subscriptionData };
  } catch (err) {
    console.error("Update subscription exception:", err);
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
  } catch (err) {
    console.error("Check premium access exception:", err);
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

    const updated = await updateUserProfile(userId, {
      preferences: updatedPreferences,
    });

    return updated;
  } catch (err) {
    console.error("Update preferences exception:", err);
    return { success: false, error: "Failed to update preferences" };
  }
}

/**
 * Delete user account
 */
export async function deleteUserAccount(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete user from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    if (authError) {
      console.error("Delete auth user error:", authError);
      return { success: false, error: "Failed to delete user account" };
    }

    // Delete user data
    const { error: dataError } = await supabase
      .from('kv_store_e18c4393')
      .delete()
      .eq('key', `user:${userId}`);

    if (dataError) {
      console.error("Delete user data error:", dataError);
    }

    // Delete user-related data (kundali, favorites, etc.)
    await supabase
      .from('kv_store_e18c4393')
      .delete()
      .like('key', `kundali:${userId}:%`);

    await supabase
      .from('kv_store_e18c4393')
      .delete()
      .like('key', `favorite:${userId}:%`);

    return { success: true };
  } catch (err) {
    console.error("Delete account exception:", err);
    return { success: false, error: "Failed to delete account" };
  }
}
