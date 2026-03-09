/**
 * Analytics Service
 * Handles user analytics, tracking, and insights
 */

import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

export interface AnalyticsEvent {
  eventType: string;
  userId?: string;
  timestamp: string;
  data: any;
}

/**
 * Track user event
 */
export async function trackEvent(
  eventType: string,
  userId: string | undefined,
  eventData: any
): Promise<{ success: boolean; error?: string }> {
  try {
    const event: AnalyticsEvent = {
      eventType,
      userId,
      timestamp: new Date().toISOString(),
      data: eventData,
    };

    await supabase
      .from('kv_store_e18c4393')
      .insert({
        key: `analytics:${eventType}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`,
        value: event
      });

    return { success: true };
  } catch (err) {
    console.error("Track event error:", err);
    return { success: false, error: "Failed to track event" };
  }
}

/**
 * Get user activity stats
 */
export async function getUserStats(
  userId: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // Get user's activities
    const { data: activities, error } = await supabase
      .from('kv_store_e18c4393')
      .select('value')
      .like('key', `analytics:%:${userId}%`);

    if (error) {
      console.error("Get user stats error:", error);
      return { success: false, error: "Failed to fetch stats" };
    }

    const events = (activities || []).map(item => item.value as AnalyticsEvent);

    // Calculate stats
    const stats = {
      totalEvents: events.length,
      eventsByType: {} as Record<string, number>,
      lastActive: events.length > 0 ? events[events.length - 1].timestamp : null,
    };

    events.forEach(event => {
      stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;
    });

    return { success: true, data: stats };
  } catch (err) {
    console.error("Get user stats exception:", err);
    return { success: false, error: "Failed to fetch stats" };
  }
}

/**
 * Get global analytics (admin only)
 */
export async function getGlobalAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data: events, error } = await supabase
      .from('kv_store_e18c4393')
      .select('value')
      .like('key', 'analytics:%');

    if (error) {
      console.error("Get global analytics error:", error);
      return { success: false, error: "Failed to fetch analytics" };
    }

    const analytics = (events || []).map(item => item.value as AnalyticsEvent);

    // Calculate global stats
    const stats = {
      totalEvents: analytics.length,
      totalUsers: new Set(analytics.map(e => e.userId).filter(Boolean)).size,
      eventsByType: {} as Record<string, number>,
      eventsPerDay: {} as Record<string, number>,
    };

    analytics.forEach(event => {
      stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;
      
      const day = event.timestamp.split('T')[0];
      stats.eventsPerDay[day] = (stats.eventsPerDay[day] || 0) + 1;
    });

    return { success: true, data: stats };
  } catch (err) {
    console.error("Get global analytics exception:", err);
    return { success: false, error: "Failed to fetch analytics" };
  }
}
