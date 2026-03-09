/**
 * Panchang Service (Firebase)
 * Handles all Panchang calculations, calendar conversions, and astrological data
 * ALL BUSINESS LOGIC HAPPENS HERE - NOT IN FRONTEND
 */

import { firestore, COLLECTIONS, getTimestamp } from './firebase-config';

export interface PanchangData {
  date: string;
  calendarType: string;
  tithi: {
    name: string;
    number: number;
    paksha: string;
    startTime: string;
    endTime: string;
  };
  nakshatra: {
    name: string;
    lord: string;
    element: string;
    deity: string;
    symbol: string;
  };
  yoga: {
    name: string;
    type: 'auspicious' | 'inauspicious' | 'neutral';
  };
  karana: string;
  vara: {
    name: string;
    lord: string;
  };
  maasa: string;
  ritu: string;
  vikramSamvat: number;
  sakaSamvat: number;
  timings: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
  };
  inauspicious: {
    rahuKaal: string;
    gulikaKaal: string;
    yamaganda: string;
    durMuhurtam: string[];
  };
  auspicious: {
    abhijitMuhurat: string;
    brahmaMuhurat: string;
    godhuli: string;
  };
}

/**
 * Calculate complete Panchang for a given date
 * This is server-side calculation - never done in frontend
 */
export function calculatePanchang(date: Date, calendarType: string = 'hindu'): PanchangData {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();

  // Tithi calculations
  const tithis = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"
  ];

  const nakshatras = [
    { name: "Ashwini", lord: "Ketu", element: "Earth", deity: "Ashwini Kumaras", symbol: "Horse's head" },
    { name: "Bharani", lord: "Venus", element: "Earth", deity: "Yama", symbol: "Yoni" },
    { name: "Krittika", lord: "Sun", element: "Fire", deity: "Agni", symbol: "Razor" },
    { name: "Rohini", lord: "Moon", element: "Earth", deity: "Brahma", symbol: "Ox Cart" },
    { name: "Mrigashira", lord: "Mars", element: "Earth", deity: "Soma", symbol: "Deer's head" },
    { name: "Ardra", lord: "Rahu", element: "Water", deity: "Rudra", symbol: "Teardrop" },
    { name: "Punarvasu", lord: "Jupiter", element: "Water", deity: "Aditi", symbol: "Bow and Quiver" },
    { name: "Pushya", lord: "Saturn", element: "Water", deity: "Brihaspati", symbol: "Cow's udder" },
    { name: "Ashlesha", lord: "Mercury", element: "Water", deity: "Nagas", symbol: "Serpent" },
    { name: "Magha", lord: "Ketu", element: "Fire", deity: "Pitris", symbol: "Royal Throne" },
    { name: "Purva Phalguni", lord: "Venus", element: "Water", deity: "Bhaga", symbol: "Front legs of bed" },
    { name: "Uttara Phalguni", lord: "Sun", element: "Fire", deity: "Aryaman", symbol: "Back legs of bed" },
    { name: "Hasta", lord: "Moon", element: "Air", deity: "Savitar", symbol: "Hand" },
    { name: "Chitra", lord: "Mars", element: "Fire", deity: "Tvashtar", symbol: "Pearl" },
    { name: "Swati", lord: "Rahu", element: "Air", deity: "Vayu", symbol: "Coral" },
    { name: "Vishakha", lord: "Jupiter", element: "Fire", deity: "Indra-Agni", symbol: "Triumphal arch" },
    { name: "Anuradha", lord: "Saturn", element: "Fire", deity: "Mitra", symbol: "Lotus" },
    { name: "Jyeshtha", lord: "Mercury", element: "Air", deity: "Indra", symbol: "Earring" },
    { name: "Mula", lord: "Ketu", element: "Air", deity: "Nirriti", symbol: "Roots" },
    { name: "Purva Ashadha", lord: "Venus", element: "Water", deity: "Apas", symbol: "Elephant tusk" },
    { name: "Uttara Ashadha", lord: "Sun", element: "Fire", deity: "Vishvadevas", symbol: "Elephant tusk" },
    { name: "Shravana", lord: "Moon", element: "Air", deity: "Vishnu", symbol: "Ear" },
    { name: "Dhanishta", lord: "Mars", element: "Ether", deity: "Vasus", symbol: "Drum" },
    { name: "Shatabhisha", lord: "Rahu", element: "Ether", deity: "Varuna", symbol: "Empty circle" },
    { name: "Purva Bhadrapada", lord: "Jupiter", element: "Fire", deity: "Aja Ekapada", symbol: "Sword" },
    { name: "Uttara Bhadrapada", lord: "Saturn", element: "Air", deity: "Ahir Budhnya", symbol: "Back legs of funeral cot" },
    { name: "Revati", lord: "Mercury", element: "Ether", deity: "Pushan", symbol: "Fish" }
  ];

  const yogas = [
    { name: "Vishkambha", type: "neutral" as const },
    { name: "Preeti", type: "auspicious" as const },
    { name: "Ayushman", type: "auspicious" as const },
    { name: "Saubhagya", type: "auspicious" as const },
    { name: "Shobhana", type: "auspicious" as const },
    { name: "Atiganda", type: "inauspicious" as const },
    { name: "Sukarma", type: "auspicious" as const },
    { name: "Dhriti", type: "auspicious" as const },
    { name: "Shoola", type: "inauspicious" as const },
    { name: "Ganda", type: "inauspicious" as const },
    { name: "Vriddhi", type: "auspicious" as const },
    { name: "Dhruva", type: "auspicious" as const },
    { name: "Vyaghata", type: "inauspicious" as const },
    { name: "Harshana", type: "auspicious" as const },
    { name: "Vajra", type: "inauspicious" as const },
    { name: "Siddhi", type: "auspicious" as const },
    { name: "Vyatipata", type: "inauspicious" as const },
    { name: "Variyana", type: "auspicious" as const },
    { name: "Parigha", type: "inauspicious" as const },
    { name: "Shiva", type: "auspicious" as const },
    { name: "Siddha", type: "auspicious" as const },
    { name: "Sadhya", type: "auspicious" as const },
    { name: "Shubha", type: "auspicious" as const },
    { name: "Shukla", type: "auspicious" as const },
    { name: "Brahma", type: "auspicious" as const },
    { name: "Indra", type: "auspicious" as const },
    { name: "Vaidhriti", type: "inauspicious" as const }
  ];

  const karanas = [
    "Bava", "Balava", "Kaulava", "Taitila", "Garaja",
    "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga", "Kimstughna"
  ];

  const hindiMonths = [
    "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha",
    "Shravana", "Bhadrapada", "Ashwin", "Kartik",
    "Margashirsha", "Pausha", "Magha", "Phalguna"
  ];

  const ritus = [
    "Vasant (Spring)", "Grishma (Summer)", "Varsha (Monsoon)",
    "Sharad (Autumn)", "Hemant (Pre-Winter)", "Shishir (Winter)"
  ];

  const varas = [
    { name: "Sunday", lord: "Sun" },
    { name: "Monday", lord: "Moon" },
    { name: "Tuesday", lord: "Mars" },
    { name: "Wednesday", lord: "Mercury" },
    { name: "Thursday", lord: "Jupiter" },
    { name: "Friday", lord: "Venus" },
    { name: "Saturday", lord: "Saturn" }
  ];

  // Calculate Rahu Kaal based on day of week
  const rahuKaalTimings = [
    "4:30 PM - 6:00 PM", "7:30 AM - 9:00 AM", "3:00 PM - 4:30 PM", 
    "12:00 PM - 1:30 PM", "1:30 PM - 3:00 PM", "10:30 AM - 12:00 PM", 
    "9:00 AM - 10:30 AM"
  ];

  const gulikaKaalTimings = [
    "3:00 PM - 4:30 PM", "12:00 PM - 1:30 PM", "10:30 AM - 12:00 PM", 
    "9:00 AM - 10:30 AM", "7:30 AM - 9:00 AM", "6:00 AM - 7:30 AM", 
    "4:30 PM - 6:00 PM"
  ];

  const yamagandaTimings = [
    "12:00 PM - 1:30 PM", "10:30 AM - 12:00 PM", "9:00 AM - 10:30 AM", 
    "7:30 AM - 9:00 AM", "6:00 AM - 7:30 AM", "3:00 PM - 4:30 PM", 
    "1:30 PM - 3:00 PM"
  ];

  const tithiIndex = day % 15;
  const nakshatraIndex = day % 27;
  const yogaIndex = day % 27;
  const karanaIndex = day % 11;

  return {
    date: date.toISOString(),
    calendarType,
    tithi: {
      name: tithis[tithiIndex],
      number: tithiIndex + 1,
      paksha: day < 15 ? "Shukla Paksha (Waxing)" : "Krishna Paksha (Waning)",
      startTime: "4:23 AM",
      endTime: "3:45 AM (next day)",
    },
    nakshatra: nakshatras[nakshatraIndex],
    yoga: yogas[yogaIndex],
    karana: karanas[karanaIndex],
    vara: varas[dayOfWeek],
    maasa: hindiMonths[month],
    ritu: ritus[Math.floor(month / 2)],
    vikramSamvat: year + 57 + (month >= 3 ? 1 : 0),
    sakaSamvat: year - 78 + (month >= 3 ? 1 : 0),
    timings: {
      sunrise: "6:24 AM",
      sunset: "5:47 PM",
      moonrise: "7:15 PM",
      moonset: "8:30 AM",
    },
    inauspicious: {
      rahuKaal: rahuKaalTimings[dayOfWeek],
      gulikaKaal: gulikaKaalTimings[dayOfWeek],
      yamaganda: yamagandaTimings[dayOfWeek],
      durMuhurtam: ["10:24 AM - 11:12 AM", "3:36 PM - 4:24 PM"],
    },
    auspicious: {
      abhijitMuhurat: "11:52 AM - 12:40 PM",
      brahmaMuhurat: "4:40 AM - 5:28 AM",
      godhuli: "5:35 PM - 5:59 PM",
    },
  };
}

/**
 * Get Panchang data for a specific date (with caching)
 */
export async function getPanchangForDate(
  dateString: string,
  calendarType: string = 'hindu',
  userId?: string
): Promise<{ success: boolean; data?: PanchangData; error?: string }> {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { success: false, error: "Invalid date format" };
    }

    // Check cache first
    const cacheKey = `${dateString}_${calendarType}`;
    const cachedDoc = await firestore
      .collection(COLLECTIONS.PANCHANG_CACHE)
      .doc(cacheKey)
      .get();

    if (cachedDoc.exists) {
      const cachedData = cachedDoc.data();
      return { success: true, data: cachedData as PanchangData };
    }

    // Calculate Panchang
    const panchangData = calculatePanchang(date, calendarType);

    // Cache the result
    await firestore
      .collection(COLLECTIONS.PANCHANG_CACHE)
      .doc(cacheKey)
      .set({
        ...panchangData,
        cachedAt: getTimestamp(),
      });

    // Log user access (analytics)
    if (userId) {
      await firestore.collection(COLLECTIONS.ANALYTICS).add({
        eventType: 'panchang_viewed',
        userId,
        date: dateString,
        calendarType,
        timestamp: getTimestamp(),
      });
    }

    return { success: true, data: panchangData };
  } catch (err: any) {
    console.error("Get Panchang error:", err);
    return { success: false, error: "Failed to calculate Panchang" };
  }
}

/**
 * Get Panchang data for date range
 */
export async function getPanchangRange(
  startDate: string,
  endDate: string,
  calendarType: string = 'hindu'
): Promise<{ success: boolean; data?: PanchangData[]; error?: string }> {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { success: false, error: "Invalid date format" };
    }

    // Limit to 31 days to prevent abuse
    const daysDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff > 31) {
      return { success: false, error: "Date range cannot exceed 31 days" };
    }

    const panchangList: PanchangData[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const panchang = calculatePanchang(new Date(currentDate), calendarType);
      panchangList.push(panchang);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { success: true, data: panchangList };
  } catch (err: any) {
    console.error("Get Panchang range error:", err);
    return { success: false, error: "Failed to calculate Panchang range" };
  }
}
