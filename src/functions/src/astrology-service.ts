/**
 * Astrology/Rashi Service (Firebase)
 * Handles Rashi (Zodiac Sign) information and predictions
 * ALL BUSINESS LOGIC HAPPENS HERE - NOT IN FRONTEND
 */

import { firestore, COLLECTIONS, getTimestamp } from './firebase-config';

export interface RashiData {
  id: string;
  name: string;
  nameHindi: string;
  element: string;
  quality: string;
  rulingPlanet: string;
  symbol: string;
  dates: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyGemstone: string;
  compatibility: {
    best: string[];
    good: string[];
    challenging: string[];
  };
  characteristics: {
    positive: string[];
    negative: string[];
  };
  todayPrediction: string;
  weeklyPrediction: string;
  monthlyPrediction: string;
  careerGuidance: string;
  loveGuidance: string;
  healthGuidance: string;
  financeGuidance: string;
  luckyDay: string;
  luckyTime: string;
}

// Complete Rashi data with detailed information
const RASHI_DATABASE: RashiData[] = [
  {
    id: 'aries',
    name: 'Aries',
    nameHindi: 'मेष (Mesh)',
    element: 'Fire',
    quality: 'Cardinal',
    rulingPlanet: 'Mars',
    symbol: '♈',
    dates: 'March 21 - April 19',
    luckyNumbers: [1, 9, 19, 28, 37, 46, 55],
    luckyColors: ['Red', 'Scarlet', 'Crimson'],
    luckyGemstone: 'Ruby, Coral',
    compatibility: {
      best: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      good: ['Aries', 'Libra'],
      challenging: ['Cancer', 'Capricorn']
    },
    characteristics: {
      positive: ['Courageous', 'Energetic', 'Confident', 'Enthusiastic', 'Dynamic', 'Quick-witted'],
      negative: ['Impatient', 'Aggressive', 'Impulsive', 'Short-tempered', 'Selfish']
    },
    todayPrediction: 'Today brings new opportunities for leadership. Your natural confidence will shine through in important meetings. Stay focused on your goals.',
    weeklyPrediction: 'This week favors career advancement and new beginnings. Financial opportunities may arise. Maintain balance between work and personal life.',
    monthlyPrediction: 'A transformative month ahead with significant career progress. Romance blooms for singles. Health requires attention - maintain regular exercise.',
    careerGuidance: 'Your leadership qualities make you excellent in management, entrepreneurship, and military fields. Take initiative in new projects.',
    loveGuidance: 'Be patient with your partner. Your passionate nature needs balance. Single Aries may meet someone special through work connections.',
    healthGuidance: 'Focus on head, face, and brain health. Regular exercise helps channel your abundant energy. Avoid stress-related headaches.',
    financeGuidance: 'Good financial prospects this period. Invest wisely but avoid impulsive spending. Real estate investments may be favorable.',
    luckyDay: 'Tuesday',
    luckyTime: '6:00 AM - 7:30 AM'
  },
  {
    id: 'taurus',
    name: 'Taurus',
    nameHindi: 'वृषभ (Vrishabha)',
    element: 'Earth',
    quality: 'Fixed',
    rulingPlanet: 'Venus',
    symbol: '♉',
    dates: 'April 20 - May 20',
    luckyNumbers: [2, 6, 15, 24, 33, 42, 51],
    luckyColors: ['Pink', 'Green', 'White'],
    luckyGemstone: 'Diamond, Emerald',
    compatibility: {
      best: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      good: ['Taurus', 'Scorpio'],
      challenging: ['Leo', 'Aquarius']
    },
    characteristics: {
      positive: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable'],
      negative: ['Stubborn', 'Possessive', 'Uncompromising', 'Materialistic']
    },
    todayPrediction: 'Financial stability is in focus today. Your practical approach helps solve complex problems. Artistic pursuits bring joy.',
    weeklyPrediction: 'A productive week for financial planning and investments. Relationships deepen. Home improvements bring satisfaction.',
    monthlyPrediction: 'Financial growth and material comfort increase. Love life flourishes. Health improves with proper diet and routine.',
    careerGuidance: 'Excel in banking, arts, fashion, and agriculture. Your patience and persistence lead to long-term success.',
    loveGuidance: 'Express your feelings openly. Your loyal nature creates strong bonds. Plan romantic gestures to strengthen relationships.',
    healthGuidance: 'Pay attention to throat, neck, and thyroid health. Enjoy food but maintain moderation. Regular walks beneficial.',
    financeGuidance: 'Excellent time for long-term investments. Real estate and luxury items may appreciate. Save for future security.',
    luckyDay: 'Friday',
    luckyTime: '12:00 PM - 2:00 PM'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    nameHindi: 'मिथुन (Mithun)',
    element: 'Air',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    symbol: '♊',
    dates: 'May 21 - June 20',
    luckyNumbers: [3, 5, 12, 14, 23, 32, 41],
    luckyColors: ['Yellow', 'Light Green', 'Orange'],
    luckyGemstone: 'Emerald, Aquamarine',
    compatibility: {
      best: ['Libra', 'Aquarius', 'Aries', 'Leo'],
      good: ['Gemini', 'Sagittarius'],
      challenging: ['Virgo', 'Pisces']
    },
    characteristics: {
      positive: ['Adaptable', 'Curious', 'Witty', 'Communicative', 'Intellectual', 'Youthful'],
      negative: ['Inconsistent', 'Superficial', 'Indecisive', 'Nervous', 'Restless']
    },
    todayPrediction: 'Communication is your strength today. Network and connect with people. Learning something new brings excitement.',
    weeklyPrediction: 'Social interactions increase. Multiple projects keep you busy. Short trips may be planned. Stay organized.',
    monthlyPrediction: 'Intellectual growth and social expansion. Career opportunities through networking. Love life becomes interesting.',
    careerGuidance: 'Thrive in journalism, teaching, sales, and communication fields. Your versatility opens multiple career paths.',
    loveGuidance: 'Keep conversations flowing. Mental connection is important. Single Geminis attract attention through their wit.',
    healthGuidance: 'Focus on respiratory system, hands, and arms. Mental health important - avoid overthinking. Yoga helps.',
    financeGuidance: 'Multiple income sources possible. Avoid spreading resources too thin. Invest in education and communication tools.',
    luckyDay: 'Wednesday',
    luckyTime: '9:00 AM - 11:00 AM'
  },
  {
    id: 'cancer',
    name: 'Cancer',
    nameHindi: 'कर्क (Karka)',
    element: 'Water',
    quality: 'Cardinal',
    rulingPlanet: 'Moon',
    symbol: '♋',
    dates: 'June 21 - July 22',
    luckyNumbers: [2, 7, 11, 16, 20, 25, 34],
    luckyColors: ['White', 'Silver', 'Pale Blue'],
    luckyGemstone: 'Pearl, Moonstone',
    compatibility: {
      best: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      good: ['Cancer', 'Capricorn'],
      challenging: ['Aries', 'Libra']
    },
    characteristics: {
      positive: ['Intuitive', 'Emotional', 'Protective', 'Sympathetic', 'Nurturing', 'Creative'],
      negative: ['Moody', 'Oversensitive', 'Pessimistic', 'Suspicious', 'Manipulative']
    },
    todayPrediction: 'Home and family matters take priority. Trust your intuition in decision-making. Emotional connections deepen.',
    weeklyPrediction: 'Focus on domestic comfort and security. Financial planning important. Nurture close relationships.',
    monthlyPrediction: 'Family celebrations and home improvements. Career stability. Emotional well-being improves through self-care.',
    careerGuidance: 'Excel in hospitality, nursing, real estate, and counseling. Your caring nature creates success in service fields.',
    loveGuidance: 'Express your deep feelings. Create cozy moments with loved ones. Your nurturing brings emotional security.',
    healthGuidance: 'Pay attention to stomach, chest, and breasts. Emotional health affects physical wellness. Balanced diet essential.',
    financeGuidance: 'Focus on savings and property investments. Family finances improve. Avoid emotional spending decisions.',
    luckyDay: 'Monday',
    luckyTime: '2:00 PM - 3:30 PM'
  },
  {
    id: 'leo',
    name: 'Leo',
    nameHindi: 'सिंह (Simha)',
    element: 'Fire',
    quality: 'Fixed',
    rulingPlanet: 'Sun',
    symbol: '♌',
    dates: 'July 23 - August 22',
    luckyNumbers: [1, 4, 10, 13, 19, 22, 31],
    luckyColors: ['Gold', 'Orange', 'Yellow'],
    luckyGemstone: 'Ruby, Peridot',
    compatibility: {
      best: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      good: ['Leo', 'Aquarius'],
      challenging: ['Taurus', 'Scorpio']
    },
    characteristics: {
      positive: ['Generous', 'Warm-hearted', 'Creative', 'Enthusiastic', 'Faithful', 'Loving'],
      negative: ['Arrogant', 'Stubborn', 'Self-centered', 'Inflexible', 'Lazy']
    },
    todayPrediction: 'Your natural charisma attracts positive attention. Creative projects flourish. Leadership opportunities arise.',
    weeklyPrediction: 'Recognition for your efforts comes this week. Social life active. Romance blooms. Enjoy the spotlight.',
    monthlyPrediction: 'Career advancement and public recognition. Creative pursuits successful. Love life passionate and exciting.',
    careerGuidance: 'Natural leaders in entertainment, politics, management, and creative fields. Your confidence inspires others.',
    loveGuidance: 'Your generous heart attracts admirers. Show vulnerability to deepen bonds. Grand romantic gestures appreciated.',
    healthGuidance: 'Focus on heart, spine, and upper back. Regular exercise maintains vitality. Avoid stress on cardiovascular system.',
    financeGuidance: 'Generous nature needs balance with savings. Luxury investments may appeal. Business ventures show promise.',
    luckyDay: 'Sunday',
    luckyTime: '5:00 AM - 6:30 AM'
  },
  {
    id: 'virgo',
    name: 'Virgo',
    nameHindi: 'कन्या (Kanya)',
    element: 'Earth',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    symbol: '♍',
    dates: 'August 23 - September 22',
    luckyNumbers: [5, 14, 23, 32, 41, 50],
    luckyColors: ['Green', 'Brown', 'Beige'],
    luckyGemstone: 'Emerald, Jade',
    compatibility: {
      best: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      good: ['Virgo', 'Pisces'],
      challenging: ['Gemini', 'Sagittarius']
    },
    characteristics: {
      positive: ['Analytical', 'Practical', 'Diligent', 'Reliable', 'Modest', 'Intelligent'],
      negative: ['Overcritical', 'Perfectionist', 'Worry-prone', 'Uptight', 'Conservative']
    },
    todayPrediction: 'Your attention to detail proves valuable. Organize and plan efficiently. Health improvements through routine.',
    weeklyPrediction: 'Productivity peaks this week. Work projects progress smoothly. Health and wellness in focus. Time to declutter.',
    monthlyPrediction: 'Professional recognition for quality work. Health regimen shows results. Relationships benefit from practical approach.',
    careerGuidance: 'Excel in healthcare, accounting, editing, and research. Your perfectionism creates excellence in technical fields.',
    loveGuidance: 'Show affection through acts of service. Relax perfectionist tendencies. Practical love builds lasting relationships.',
    healthGuidance: 'Pay attention to digestive system and intestines. Healthy diet crucial. Avoid overthinking causing stress.',
    financeGuidance: 'Careful budgeting and planning lead to security. Good time for health-related investments. Save systematically.',
    luckyDay: 'Wednesday',
    luckyTime: '11:00 AM - 1:00 PM'
  },
  {
    id: 'libra',
    name: 'Libra',
    nameHindi: 'तुला (Tula)',
    element: 'Air',
    quality: 'Cardinal',
    rulingPlanet: 'Venus',
    symbol: '♎',
    dates: 'September 23 - October 22',
    luckyNumbers: [6, 15, 24, 33, 42, 51],
    luckyColors: ['Pink', 'Blue', 'Pastel Shades'],
    luckyGemstone: 'Opal, Diamond',
    compatibility: {
      best: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      good: ['Libra', 'Aries'],
      challenging: ['Cancer', 'Capricorn']
    },
    characteristics: {
      positive: ['Diplomatic', 'Gracious', 'Fair-minded', 'Social', 'Cooperative', 'Peaceful'],
      negative: ['Indecisive', 'Self-pitying', 'Avoids confrontation', 'Carries grudges']
    },
    todayPrediction: 'Balance and harmony are priorities. Social connections bring opportunities. Artistic endeavors favored.',
    weeklyPrediction: 'Relationships flourish this week. Business partnerships promising. Aesthetic improvements to surroundings.',
    monthlyPrediction: 'Love and partnerships in focus. Career collaborations successful. Financial balance through partnership.',
    careerGuidance: 'Thrive in law, diplomacy, design, and counseling. Your fairness creates success in mediation and negotiation.',
    loveGuidance: 'Romantic and charming, you attract easily. Seek balance in give and take. Commitment brings happiness.',
    healthGuidance: 'Focus on kidneys, lower back, and bladder. Balance in lifestyle important. Beautiful environments aid wellness.',
    financeGuidance: 'Partnership ventures profitable. Investments in art and beauty may yield returns. Share financial decisions.',
    luckyDay: 'Friday',
    luckyTime: '3:00 PM - 5:00 PM'
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    nameHindi: 'वृश्चिक (Vrishchika)',
    element: 'Water',
    quality: 'Fixed',
    rulingPlanet: 'Mars & Pluto',
    symbol: '♏',
    dates: 'October 23 - November 21',
    luckyNumbers: [8, 11, 18, 22, 27, 36, 45],
    luckyColors: ['Red', 'Maroon', 'Black'],
    luckyGemstone: 'Coral, Red Garnet',
    compatibility: {
      best: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      good: ['Scorpio', 'Taurus'],
      challenging: ['Leo', 'Aquarius']
    },
    characteristics: {
      positive: ['Passionate', 'Resourceful', 'Brave', 'Stubborn', 'Loyal', 'Ambitious'],
      negative: ['Jealous', 'Secretive', 'Resentful', 'Manipulative', 'Obsessive']
    },
    todayPrediction: 'Intense focus brings breakthroughs. Trust your instincts. Transformation and regeneration themes emerge.',
    weeklyPrediction: 'Deep emotional connections form. Research and investigation favor you. Financial gains through strategy.',
    monthlyPrediction: 'Powerful transformations in life. Career advances through determination. Intimate relationships deepen.',
    careerGuidance: 'Excel in psychology, surgery, research, and detective work. Your intensity creates success in transformative fields.',
    loveGuidance: 'Deep, passionate connections essential. Loyalty paramount. Trust issues need addressing. Magnetic attraction strong.',
    healthGuidance: 'Focus on reproductive organs and elimination systems. Emotional release important for health. Detoxification beneficial.',
    financeGuidance: 'Strategic investments pay off. Joint finances and inheritances favorable. Real estate and insurance sectors good.',
    luckyDay: 'Tuesday',
    luckyTime: '12:00 PM - 2:00 PM'
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    nameHindi: 'धनु (Dhanu)',
    element: 'Fire',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter',
    symbol: '♐',
    dates: 'November 22 - December 21',
    luckyNumbers: [3, 9, 12, 21, 30, 39, 48],
    luckyColors: ['Purple', 'Blue', 'Turquoise'],
    luckyGemstone: 'Yellow Sapphire, Topaz',
    compatibility: {
      best: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      good: ['Sagittarius', 'Gemini'],
      challenging: ['Virgo', 'Pisces']
    },
    characteristics: {
      positive: ['Optimistic', 'Freedom-loving', 'Honest', 'Philosophical', 'Adventurous', 'Enthusiastic'],
      negative: ['Careless', 'Tactless', 'Irresponsible', 'Restless', 'Overconfident']
    },
    todayPrediction: 'Adventure calls today. Learning opportunities arise. Your optimism is contagious. Expand your horizons.',
    weeklyPrediction: 'Travel or educational pursuits featured. New perspectives gained. Social circle expands. Freedom important.',
    monthlyPrediction: 'Growth through travel and education. Career opportunities abroad possible. Philosophical insights deepen.',
    careerGuidance: 'Thrive in teaching, travel, publishing, and philosophy. Your enthusiasm creates success in exploration fields.',
    loveGuidance: 'Need freedom in relationships. Honest communication essential. Adventure together strengthens bonds.',
    healthGuidance: 'Focus on hips, thighs, and liver. Active lifestyle suits you. Avoid overindulgence. Outdoor activities beneficial.',
    financeGuidance: 'Lucky with investments but need discipline. Travel expenses high. International ventures promising.',
    luckyDay: 'Thursday',
    luckyTime: '9:00 AM - 11:00 AM'
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    nameHindi: 'मकर (Makara)',
    element: 'Earth',
    quality: 'Cardinal',
    rulingPlanet: 'Saturn',
    symbol: '♑',
    dates: 'December 22 - January 19',
    luckyNumbers: [8, 10, 17, 26, 35, 44],
    luckyColors: ['Brown', 'Black', 'Grey'],
    luckyGemstone: 'Blue Sapphire, Amethyst',
    compatibility: {
      best: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      good: ['Capricorn', 'Cancer'],
      challenging: ['Aries', 'Libra']
    },
    characteristics: {
      positive: ['Responsible', 'Disciplined', 'Ambitious', 'Patient', 'Cautious', 'Humorous'],
      negative: ['Know-it-all', 'Unforgiving', 'Condescending', 'Pessimistic', 'Stubborn']
    },
    todayPrediction: 'Hard work pays off today. Structure and discipline lead to success. Authority figures supportive.',
    weeklyPrediction: 'Career advancement opportunities. Long-term planning favored. Recognition for persistence. Build foundations.',
    monthlyPrediction: 'Professional achievements and status elevation. Financial security increases. Relationships mature.',
    careerGuidance: 'Excel in management, government, engineering, and architecture. Your ambition creates lasting success.',
    loveGuidance: 'Loyalty and commitment paramount. Show softer side more. Traditional approach to relationships works.',
    healthGuidance: 'Focus on bones, joints, knees, and teeth. Aging gracefully through discipline. Regular checkups important.',
    financeGuidance: 'Long-term investments and real estate favorable. Patient accumulation of wealth. Conservative approach wise.',
    luckyDay: 'Saturday',
    luckyTime: '6:00 PM - 8:00 PM'
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    nameHindi: 'कुंभ (Kumbha)',
    element: 'Air',
    quality: 'Fixed',
    rulingPlanet: 'Saturn & Uranus',
    symbol: '♒',
    dates: 'January 20 - February 18',
    luckyNumbers: [4, 8, 13, 17, 22, 26],
    luckyColors: ['Electric Blue', 'Silver', 'Aqua'],
    luckyGemstone: 'Blue Sapphire, Amethyst',
    compatibility: {
      best: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      good: ['Aquarius', 'Leo'],
      challenging: ['Taurus', 'Scorpio']
    },
    characteristics: {
      positive: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual', 'Friendly'],
      negative: ['Detached', 'Aloof', 'Unpredictable', 'Stubborn', 'Contrary']
    },
    todayPrediction: 'Innovation and originality shine. Technology helps solve problems. Social causes call to you.',
    weeklyPrediction: 'Networking brings opportunities. Group activities rewarding. Freedom to express individuality important.',
    monthlyPrediction: 'Innovative projects take off. Friendships deepen. Humanitarian efforts bring fulfillment.',
    careerGuidance: 'Thrive in technology, science, humanitarian work, and aviation. Your originality creates breakthrough innovations.',
    loveGuidance: 'Need intellectual connection and friendship first. Independent yet loyal. Unconventional relationships work.',
    healthGuidance: 'Focus on ankles, circulatory system, and calves. Mental stimulation important. Alternative therapies beneficial.',
    financeGuidance: 'Technology investments promising. Group ventures favorable. Unexpected gains possible. Stay unconventional.',
    luckyDay: 'Saturday',
    luckyTime: '4:00 PM - 6:00 PM'
  },
  {
    id: 'pisces',
    name: 'Pisces',
    nameHindi: 'मीन (Meena)',
    element: 'Water',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter & Neptune',
    symbol: '♓',
    dates: 'February 19 - March 20',
    luckyNumbers: [3, 7, 12, 16, 21, 25, 30],
    luckyColors: ['Sea Green', 'Purple', 'Violet'],
    luckyGemstone: 'Yellow Sapphire, Aquamarine',
    compatibility: {
      best: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
      good: ['Pisces', 'Virgo'],
      challenging: ['Gemini', 'Sagittarius']
    },
    characteristics: {
      positive: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
      negative: ['Escapist', 'Overly trusting', 'Sad', 'Desire to escape reality', 'Victim mentality']
    },
    todayPrediction: 'Intuition guides you strongly. Creative and spiritual pursuits fulfilling. Compassion opens doors.',
    weeklyPrediction: 'Artistic expression flows naturally. Spiritual growth emphasized. Help others through empathy.',
    monthlyPrediction: 'Dreams manifest into reality. Healing abilities strengthen. Love deepens through emotional connection.',
    careerGuidance: 'Excel in arts, healing, music, and charitable work. Your empathy creates success in caregiving fields.',
    loveGuidance: 'Deeply romantic and devoted. Need emotional security. Spiritual connection important in relationships.',
    healthGuidance: 'Focus on feet, lymphatic system, and immune system. Emotional health affects physical wellness. Meditation helps.',
    financeGuidance: 'Intuitive investments can pay off. Charitable giving important. Creative ventures financially rewarding.',
    luckyDay: 'Thursday',
    luckyTime: '7:00 AM - 9:00 AM'
  }
];

/**
 * Get all Rashi (Zodiac Signs)
 */
export async function getAllRashi(): Promise<{ success: boolean; data?: RashiData[]; error?: string }> {
  try {
    return { success: true, data: RASHI_DATABASE };
  } catch (err: any) {
    console.error("Get all Rashi error:", err);
    return { success: false, error: "Failed to fetch Rashi data" };
  }
}

/**
 * Get specific Rashi by ID
 */
export async function getRashiById(rashiId: string): Promise<{ success: boolean; data?: RashiData; error?: string }> {
  try {
    const rashi = RASHI_DATABASE.find(r => r.id === rashiId.toLowerCase());
    
    if (!rashi) {
      return { success: false, error: "Rashi not found" };
    }

    return { success: true, data: rashi };
  } catch (err: any) {
    console.error("Get Rashi by ID error:", err);
    return { success: false, error: "Failed to fetch Rashi data" };
  }
}

/**
 * Get Rashi by birth date
 */
export async function getRashiByDate(birthDate: string): Promise<{ success: boolean; data?: RashiData; error?: string }> {
  try {
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      return { success: false, error: "Invalid date format" };
    }

    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    // Determine Rashi based on date
    let rashiId = '';
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) rashiId = 'aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) rashiId = 'taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) rashiId = 'gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) rashiId = 'cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) rashiId = 'leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) rashiId = 'virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) rashiId = 'libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) rashiId = 'scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) rashiId = 'sagittarius';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) rashiId = 'capricorn';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) rashiId = 'aquarius';
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) rashiId = 'pisces';

    return getRashiById(rashiId);
  } catch (err: any) {
    console.error("Get Rashi by date error:", err);
    return { success: false, error: "Failed to determine Rashi" };
  }
}

/**
 * Get Rashi compatibility
 */
export async function getRashiCompatibility(
  rashi1: string,
  rashi2: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const rashiData1 = RASHI_DATABASE.find(r => r.id === rashi1.toLowerCase());
    const rashiData2 = RASHI_DATABASE.find(r => r.id === rashi2.toLowerCase());

    if (!rashiData1 || !rashiData2) {
      return { success: false, error: "Invalid Rashi IDs" };
    }

    let compatibilityLevel = 'Moderate';
    let compatibilityScore = 50;
    let description = '';

    if (rashiData1.compatibility.best.includes(rashiData2.name)) {
      compatibilityLevel = 'Excellent';
      compatibilityScore = 90;
      description = `${rashiData1.name} and ${rashiData2.name} make an excellent match! Your energies complement each other beautifully.`;
    } else if (rashiData1.compatibility.good.includes(rashiData2.name)) {
      compatibilityLevel = 'Good';
      compatibilityScore = 70;
      description = `${rashiData1.name} and ${rashiData2.name} have good compatibility. With understanding, this can be a strong relationship.`;
    } else if (rashiData1.compatibility.challenging.includes(rashiData2.name)) {
      compatibilityLevel = 'Challenging';
      compatibilityScore = 40;
      description = `${rashiData1.name} and ${rashiData2.name} may face challenges. Extra effort and communication are needed.`;
    } else {
      description = `${rashiData1.name} and ${rashiData2.name} have moderate compatibility. Balance and compromise are key.`;
    }

    return {
      success: true,
      data: {
        rashi1: rashiData1.name,
        rashi2: rashiData2.name,
        compatibilityLevel,
        compatibilityScore,
        description,
        element1: rashiData1.element,
        element2: rashiData2.element,
        rulingPlanet1: rashiData1.rulingPlanet,
        rulingPlanet2: rashiData2.rulingPlanet
      }
    };
  } catch (err: any) {
    console.error("Get compatibility error:", err);
    return { success: false, error: "Failed to calculate compatibility" };
  }
}

/**
 * Track Rashi view (analytics)
 */
export async function trackRashiView(rashiId: string, userId?: string): Promise<void> {
  try {
    if (userId) {
      await firestore.collection(COLLECTIONS.ANALYTICS).add({
        eventType: 'rashi_viewed',
        userId,
        rashiId,
        timestamp: getTimestamp(),
      });
    }
  } catch (err) {
    console.error("Track Rashi view error:", err);
  }
}
