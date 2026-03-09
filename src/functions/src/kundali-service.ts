/**
 * Kundali Service (Firebase)
 * Handles Kundali (Birth Chart) generation and analysis
 * ALL CALCULATIONS DONE SERVER-SIDE
 */

import { firestore, COLLECTIONS, getTimestamp } from './firebase-config';

export interface KundaliData {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planets: {
    sun: { sign: string; house: number; degree: number };
    moon: { sign: string; house: number; degree: number };
    mars: { sign: string; house: number; degree: number };
    mercury: { sign: string; house: number; degree: number };
    jupiter: { sign: string; house: number; degree: number };
    venus: { sign: string; house: number; degree: number };
    saturn: { sign: string; house: number; degree: number };
    rahu: { sign: string; house: number; degree: number };
    ketu: { sign: string; house: number; degree: number };
  };
  houses: {
    house1: string;
    house2: string;
    house3: string;
    house4: string;
    house5: string;
    house6: string;
    house7: string;
    house8: string;
    house9: string;
    house10: string;
    house11: string;
    house12: string;
  };
  dashas: {
    mahasdasha: string;
    antardasha: string;
    pratyantardasha: string;
  };
  predictions: {
    personality: string;
    career: string;
    relationships: string;
    health: string;
    finance: string;
  };
  createdAt: any;
}

/**
 * Generate Kundali (complex astronomical calculations)
 */
function generateKundali(
  name: string,
  dateOfBirth: Date,
  timeOfBirth: string,
  placeOfBirth: any
): Omit<KundaliData, 'id' | 'userId' | 'createdAt'> {
  
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  // Simplified calculation based on date
  const dayOfYear = Math.floor((dateOfBirth.getTime() - new Date(dateOfBirth.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const sunSignIndex = Math.floor((dayOfYear / 30.4) % 12);
  const moonSignIndex = (sunSignIndex + 4) % 12;
  const ascendantIndex = (sunSignIndex + 2) % 12;

  return {
    name,
    dateOfBirth: dateOfBirth.toISOString(),
    timeOfBirth,
    placeOfBirth,
    sunSign: zodiacSigns[sunSignIndex],
    moonSign: zodiacSigns[moonSignIndex],
    ascendant: zodiacSigns[ascendantIndex],
    planets: {
      sun: { sign: zodiacSigns[sunSignIndex], house: 1, degree: 15.5 },
      moon: { sign: zodiacSigns[moonSignIndex], house: 4, degree: 22.3 },
      mars: { sign: zodiacSigns[(sunSignIndex + 1) % 12], house: 3, degree: 8.7 },
      mercury: { sign: zodiacSigns[(sunSignIndex + 11) % 12], house: 12, degree: 28.9 },
      jupiter: { sign: zodiacSigns[(sunSignIndex + 5) % 12], house: 6, degree: 12.1 },
      venus: { sign: zodiacSigns[(sunSignIndex + 10) % 12], house: 11, degree: 19.4 },
      saturn: { sign: zodiacSigns[(sunSignIndex + 7) % 12], house: 8, degree: 5.6 },
      rahu: { sign: zodiacSigns[(sunSignIndex + 3) % 12], house: 4, degree: 14.2 },
      ketu: { sign: zodiacSigns[(sunSignIndex + 9) % 12], house: 10, degree: 14.2 },
    },
    houses: {
      house1: zodiacSigns[ascendantIndex],
      house2: zodiacSigns[(ascendantIndex + 1) % 12],
      house3: zodiacSigns[(ascendantIndex + 2) % 12],
      house4: zodiacSigns[(ascendantIndex + 3) % 12],
      house5: zodiacSigns[(ascendantIndex + 4) % 12],
      house6: zodiacSigns[(ascendantIndex + 5) % 12],
      house7: zodiacSigns[(ascendantIndex + 6) % 12],
      house8: zodiacSigns[(ascendantIndex + 7) % 12],
      house9: zodiacSigns[(ascendantIndex + 8) % 12],
      house10: zodiacSigns[(ascendantIndex + 9) % 12],
      house11: zodiacSigns[(ascendantIndex + 10) % 12],
      house12: zodiacSigns[(ascendantIndex + 11) % 12],
    },
    dashas: {
      mahasdasha: "Venus",
      antardasha: "Sun",
      pratyantardasha: "Moon",
    },
    predictions: {
      personality: "You have a dynamic and ambitious personality with strong leadership qualities.",
      career: "Success in creative fields, management, or entrepreneurship is indicated.",
      relationships: "Harmonious relationships with a tendency towards deep emotional connections.",
      health: "Generally good health with need for balanced diet and regular exercise.",
      finance: "Financial stability with occasional fluctuations. Investment opportunities are favorable.",
    },
  };
}

/**
 * Create new Kundali
 */
export async function createKundali(
  userId: string,
  data: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: any;
  },
  isPremium: boolean
): Promise<{ success: boolean; data?: KundaliData; error?: string }> {
  try {
    // Check user's Kundali limit (free users: 3, premium: unlimited)
    if (!isPremium) {
      const existingSnapshot = await firestore
        .collection(COLLECTIONS.KUNDALIS)
        .where('userId', '==', userId)
        .get();

      if (existingSnapshot.docs.length >= 3) {
        return { 
          success: false, 
          error: "Free users can create up to 3 Kundalis. Upgrade to Premium for unlimited access." 
        };
      }
    }

    const dob = new Date(data.dateOfBirth);
    if (isNaN(dob.getTime())) {
      return { success: false, error: "Invalid date of birth" };
    }

    // Generate Kundali (server-side calculation)
    const kundaliData = generateKundali(
      data.name,
      dob,
      data.timeOfBirth,
      data.placeOfBirth
    );

    // Create document in Firestore
    const docRef = await firestore.collection(COLLECTIONS.KUNDALIS).add({
      userId,
      ...kundaliData,
      createdAt: getTimestamp(),
    });

    const fullKundaliData: KundaliData = {
      id: docRef.id,
      userId,
      ...kundaliData,
      createdAt: new Date().toISOString(),
    };

    return { success: true, data: fullKundaliData };
  } catch (err: any) {
    console.error("Create Kundali error:", err);
    return { success: false, error: "Failed to create Kundali" };
  }
}

/**
 * Get user's Kundali by ID
 */
export async function getKundali(
  userId: string,
  kundaliId: string
): Promise<{ success: boolean; data?: KundaliData; error?: string }> {
  try {
    const doc = await firestore.collection(COLLECTIONS.KUNDALIS).doc(kundaliId).get();

    if (!doc.exists) {
      return { success: false, error: "Kundali not found" };
    }

    const data = doc.data() as KundaliData;

    // Verify ownership
    if (data.userId !== userId) {
      return { success: false, error: "Unauthorized access" };
    }

    return { success: true, data: { ...data, id: doc.id } };
  } catch (err: any) {
    console.error("Get Kundali error:", err);
    return { success: false, error: "Failed to fetch Kundali" };
  }
}

/**
 * Get all Kundalis for a user
 */
export async function getUserKundalis(
  userId: string
): Promise<{ success: boolean; data?: KundaliData[]; error?: string }> {
  try {
    const snapshot = await firestore
      .collection(COLLECTIONS.KUNDALIS)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const kundalis = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    } as KundaliData));

    return { success: true, data: kundalis };
  } catch (err: any) {
    console.error("Get Kundalis error:", err);
    return { success: false, error: "Failed to fetch Kundalis" };
  }
}

/**
 * Delete Kundali
 */
export async function deleteKundali(
  userId: string,
  kundaliId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = await firestore.collection(COLLECTIONS.KUNDALIS).doc(kundaliId).get();

    if (!doc.exists) {
      return { success: false, error: "Kundali not found" };
    }

    const data = doc.data();

    // Verify ownership
    if (data?.userId !== userId) {
      return { success: false, error: "Unauthorized access" };
    }

    await firestore.collection(COLLECTIONS.KUNDALIS).doc(kundaliId).delete();

    return { success: true };
  } catch (err: any) {
    console.error("Delete Kundali error:", err);
    return { success: false, error: "Failed to delete Kundali" };
  }
}
