/**
 * Firebase Configuration
 * Initialize Firebase Admin SDK for backend services
 */

import * as admin from 'firebase-admin';

// Initialize Firebase Admin (use service account in production)
if (!admin.apps.length) {
  // In Cloud Functions, credentials are automatically provided
  // For local development, set GOOGLE_APPLICATION_CREDENTIALS environment variable
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export const storage = admin.storage();

// Firestore collections
export const COLLECTIONS = {
  USERS: 'users',
  KUNDALIS: 'kundalis',
  PANCHANG_CACHE: 'panchang_cache',
  ANALYTICS: 'analytics',
  SUBSCRIPTIONS: 'subscriptions',
};

// Helper function to get user document reference
export function getUserDoc(userId: string) {
  return firestore.collection(COLLECTIONS.USERS).doc(userId);
}

// Helper function to get Firestore timestamp
export function getTimestamp() {
  return admin.firestore.FieldValue.serverTimestamp();
}

export default admin;
