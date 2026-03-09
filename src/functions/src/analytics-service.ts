/**
 * Analytics Service (Firebase)
 * Handles user analytics, tracking, and insights
 */

import { firestore, COLLECTIONS, getTimestamp } from './firebase-config';

export interface AnalyticsEvent {
  eventType: string;
  userId?: string;
  timestamp: any;
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
    await firestore.collection(COLLECTIONS.ANALYTICS).add({
      eventType,
      userId,
      timestamp: getTimestamp(),
      data: eventData,
    });

    return { success: true };
  } catch (err: any) {
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
    const snapshot = await firestore
      .collection(COLLECTIONS.ANALYTICS)
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .get();

    const events = snapshot.docs.map(doc => doc.data() as AnalyticsEvent);

    // Calculate stats
    const stats = {
      totalEvents: events.length,
      eventsByType: {} as Record<string, number>,
      lastActive: events.length > 0 ? events[0].timestamp : null,
    };

    events.forEach(event => {
      stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;
    });

    return { success: true, data: stats };
  } catch (err: any) {
    console.error("Get user stats error:", err);
    return { success: false, error: "Failed to fetch stats" };
  }
}

/**
 * Get global analytics (admin only)
 */
export async function getGlobalAnalytics(): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const snapshot = await firestore
      .collection(COLLECTIONS.ANALYTICS)
      .orderBy('timestamp', 'desc')
      .limit(10000) // Limit to prevent excessive reads
      .get();

    const events = snapshot.docs.map(doc => doc.data() as AnalyticsEvent);

    // Calculate global stats
    const stats = {
      totalEvents: events.length,
      totalUsers: new Set(events.map(e => e.userId).filter(Boolean)).size,
      eventsByType: {} as Record<string, number>,
      eventsPerDay: {} as Record<string, number>,
    };

    events.forEach(event => {
      stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;
      
      if (event.timestamp && event.timestamp.toDate) {
        const day = event.timestamp.toDate().toISOString().split('T')[0];
        stats.eventsPerDay[day] = (stats.eventsPerDay[day] || 0) + 1;
      }
    });

    return { success: true, data: stats };
  } catch (err: any) {
    console.error("Get global analytics error:", err);
    return { success: false, error: "Failed to fetch analytics" };
  }
}
