/**
 * Local Rashi Data (Fallback)
 * Used when Firebase is not available
 */

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

export const RASHI_LOCAL_DATA: RashiData[] = [
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
      positive: ['Intuitive', 'Emotional', 'Protective', 'Sympathetic', 'Tenacious', 'Imaginative'],
      negative: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure']
    },
    todayPrediction: 'Trust your intuition today. Family matters need attention. Emotional connections deepen. Home is your sanctuary.',
    weeklyPrediction: 'Focus on family and home life. Financial security improves. Creative projects bring emotional satisfaction.',
    monthlyPrediction: 'Emotional growth and family harmony. Career stability. Romance strengthens for committed relationships.',
    careerGuidance: 'Excel in hospitality, healthcare, real estate, and culinary arts. Your nurturing nature is your strength.',
    loveGuidance: 'Open up emotionally. Your protective nature needs expression. Single Cancers may find love through family connections.',
    healthGuidance: 'Focus on digestive system, chest, and breasts. Emotional health affects physical wellbeing. Hydration important.',
    financeGuidance: 'Save for family security. Real estate investments favorable. Avoid emotional spending decisions.',
    luckyDay: 'Monday',
    luckyTime: '2:00 PM - 4:00 PM'
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
    luckyGemstone: 'Ruby, Amber',
    compatibility: {
      best: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      good: ['Leo', 'Aquarius'],
      challenging: ['Taurus', 'Scorpio']
    },
    characteristics: {
      positive: ['Confident', 'Generous', 'Warm-hearted', 'Creative', 'Cheerful', 'Humorous'],
      negative: ['Arrogant', 'Stubborn', 'Self-centered', 'Inflexible', 'Lazy']
    },
    todayPrediction: 'Your charisma shines bright today. Take center stage in important matters. Creative projects flourish.',
    weeklyPrediction: 'Leadership opportunities arise. Social life expands. Romance is in the air. Express your creative talents.',
    monthlyPrediction: 'Career recognition and personal achievements. Love life passionate. Financial growth through creative ventures.',
    careerGuidance: 'Natural leaders in entertainment, politics, management, and creative fields. Your confidence inspires others.',
    loveGuidance: 'Romance and passion are your forte. Be generous with affection. Single Leos attract admirers easily.',
    healthGuidance: 'Focus on heart, spine, and back health. Regular exercise maintains vitality. Avoid excessive pride affecting health.',
    financeGuidance: 'Generous spending needs balance. Invest in quality over quantity. Entertainment ventures may be profitable.',
    luckyDay: 'Sunday',
    luckyTime: '5:00 PM - 6:30 PM'
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
    luckyNumbers: [5, 14, 23, 32, 41, 50, 59],
    luckyColors: ['Green', 'White', 'Grey'],
    luckyGemstone: 'Emerald, Peridot',
    compatibility: {
      best: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      good: ['Virgo', 'Pisces'],
      challenging: ['Gemini', 'Sagittarius']
    },
    characteristics: {
      positive: ['Analytical', 'Practical', 'Loyal', 'Kind', 'Hardworking', 'Meticulous'],
      negative: ['Critical', 'Worrying', 'Overly-cautious', 'Perfectionist', 'Conservative']
    },
    todayPrediction: 'Attention to detail brings success. Organize and plan meticulously. Health routines show positive results.',
    weeklyPrediction: 'Productivity peaks. Workplace recognition comes. Health improvements continue. Service to others brings joy.',
    monthlyPrediction: 'Professional excellence and career growth. Health focus pays off. Practical love connections strengthen.',
    careerGuidance: 'Excel in healthcare, analysis, editing, and service industries. Your perfectionism ensures quality work.',
    loveGuidance: 'Show affection through practical acts of service. Communication is key. Single Virgos attract through competence.',
    healthGuidance: 'Focus on digestive system and intestines. Don\'t overthink health issues. Regular routines maintain wellness.',
    financeGuidance: 'Careful budgeting and planning bring financial security. Practical investments wise. Avoid impulsive purchases.',
    luckyDay: 'Wednesday',
    luckyTime: '10:00 AM - 12:00 PM'
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
    luckyNumbers: [6, 15, 24, 33, 42, 51, 60],
    luckyColors: ['Blue', 'Pink', 'Jade Green'],
    luckyGemstone: 'Diamond, Opal',
    compatibility: {
      best: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      good: ['Libra', 'Aries'],
      challenging: ['Cancer', 'Capricorn']
    },
    characteristics: {
      positive: ['Diplomatic', 'Fair-minded', 'Social', 'Gracious', 'Cooperative', 'Idealistic'],
      negative: ['Indecisive', 'Avoids confrontation', 'Self-pitying', 'Unreliable']
    },
    todayPrediction: 'Balance is key today. Relationships flourish through harmony. Artistic pursuits bring satisfaction.',
    weeklyPrediction: 'Social engagements increase. Partnership opportunities arise. Creative projects gain momentum.',
    monthlyPrediction: 'Relationship harmony and social success. Career partnerships beneficial. Financial balance achieved.',
    careerGuidance: 'Thrive in law, diplomacy, arts, and counseling. Your fairness makes you excellent mediator.',
    loveGuidance: 'Romance and partnership are essential. Seek balance in relationships. Single Libras attract through charm.',
    healthGuidance: 'Focus on kidneys and lower back health. Balance work and rest. Beauty routines enhance wellbeing.',
    financeGuidance: 'Balanced approach to finances needed. Joint ventures favorable. Luxury items tempting - budget wisely.',
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
    luckyColors: ['Deep Red', 'Maroon', 'Black'],
    luckyGemstone: 'Coral, Red Garnet',
    compatibility: {
      best: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      good: ['Scorpio', 'Taurus'],
      challenging: ['Leo', 'Aquarius']
    },
    characteristics: {
      positive: ['Passionate', 'Resourceful', 'Brave', 'Loyal', 'Determined', 'Intuitive'],
      negative: ['Jealous', 'Secretive', 'Obsessive', 'Suspicious', 'Manipulative']
    },
    todayPrediction: 'Transformation is in the air. Deep insights emerge. Trust your powerful intuition. Hidden matters reveal themselves.',
    weeklyPrediction: 'Intensity increases in all areas. Research and investigation favored. Emotional depth strengthens bonds.',
    monthlyPrediction: 'Personal transformation and growth. Career advancement through determination. Passionate romance deepens.',
    careerGuidance: 'Excel in research, investigation, psychology, and surgery. Your intensity drives success.',
    loveGuidance: 'Passion runs deep. Trust and loyalty essential. Single Scorpios attract through mysterious allure.',
    healthGuidance: 'Focus on reproductive system and bladder health. Emotional release important. Detoxification beneficial.',
    financeGuidance: 'Research investments thoroughly. Joint finances need attention. Inheritance matters may arise.',
    luckyDay: 'Tuesday',
    luckyTime: '6:00 PM - 8:00 PM'
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
    luckyColors: ['Purple', 'Blue', 'Red'],
    luckyGemstone: 'Yellow Sapphire, Turquoise',
    compatibility: {
      best: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      good: ['Sagittarius', 'Gemini'],
      challenging: ['Virgo', 'Pisces']
    },
    characteristics: {
      positive: ['Optimistic', 'Freedom-loving', 'Honest', 'Philosophical', 'Enthusiastic', 'Adventurous'],
      negative: ['Tactless', 'Careless', 'Irresponsible', 'Restless', 'Overconfident']
    },
    todayPrediction: 'Adventure calls today. Learning opportunities arise. Expand your horizons. Optimism attracts good fortune.',
    weeklyPrediction: 'Travel and expansion favored. Philosophical insights deepen. Social connections broaden perspectives.',
    monthlyPrediction: 'Growth through adventure and learning. Career opportunities abroad. Romance through shared adventures.',
    careerGuidance: 'Thrive in teaching, travel, philosophy, and publishing. Your optimism inspires teams.',
    loveGuidance: 'Freedom and adventure in relationships. Honesty is crucial. Single Sagittarius attracts through enthusiasm.',
    healthGuidance: 'Focus on liver, hips, and thighs health. Outdoor activities beneficial. Avoid excess indulgence.',
    financeGuidance: 'Optimistic about money but budget needed. Travel investments worthwhile. Education pays off.',
    luckyDay: 'Thursday',
    luckyTime: '1:00 PM - 3:00 PM'
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
    luckyNumbers: [4, 8, 13, 22, 31, 40, 49],
    luckyColors: ['Brown', 'Black', 'Dark Green'],
    luckyGemstone: 'Blue Sapphire, Onyx',
    compatibility: {
      best: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      good: ['Capricorn', 'Cancer'],
      challenging: ['Aries', 'Libra']
    },
    characteristics: {
      positive: ['Responsible', 'Disciplined', 'Self-controlled', 'Ambitious', 'Patient', 'Practical'],
      negative: ['Pessimistic', 'Stubborn', 'Unforgiving', 'Condescending', 'Expecting-worst']
    },
    todayPrediction: 'Discipline brings rewards today. Career matters progress steadily. Patience and perseverance pay off.',
    weeklyPrediction: 'Professional achievements recognized. Long-term goals advance. Structure brings success.',
    monthlyPrediction: 'Career pinnacle reached through hard work. Financial stability strengthens. Committed relationships deepen.',
    careerGuidance: 'Natural in business, management, engineering, and administration. Your discipline ensures success.',
    loveGuidance: 'Loyalty and commitment define relationships. Express feelings despite reserve. Single Capricorns attract through success.',
    healthGuidance: 'Focus on bones, teeth, and knees health. Don\'t neglect self-care for work. Regular checkups important.',
    financeGuidance: 'Excellent financial planning skills. Long-term investments wise. Build wealth steadily and securely.',
    luckyDay: 'Saturday',
    luckyTime: '8:00 AM - 10:00 AM'
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
    luckyNumbers: [4, 8, 13, 17, 22, 26, 31],
    luckyColors: ['Electric Blue', 'Silver', 'Turquoise'],
    luckyGemstone: 'Blue Sapphire, Amethyst',
    compatibility: {
      best: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      good: ['Aquarius', 'Leo'],
      challenging: ['Taurus', 'Scorpio']
    },
    characteristics: {
      positive: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual', 'Friendly'],
      negative: ['Aloof', 'Temperamental', 'Uncompromising', 'Detached', 'Stubborn']
    },
    todayPrediction: 'Innovation and originality shine today. Social causes inspire. Technology brings opportunities.',
    weeklyPrediction: 'Humanitarian efforts rewarded. Friendship networks expand. Unique ideas gain recognition.',
    monthlyPrediction: 'Progressive changes and innovation. Career advancement through originality. Unconventional romance possible.',
    careerGuidance: 'Excel in technology, science, social work, and innovation. Your uniqueness is your strength.',
    loveGuidance: 'Friendship is foundation of love. Independence important. Single Aquarius attracts through intellect.',
    healthGuidance: 'Focus on circulation, ankles, and calves. Mental stimulation important. Group activities beneficial.',
    financeGuidance: 'Innovative investment strategies. Technology sector favorable. Humanitarian causes attract resources.',
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
    luckyColors: ['Sea Green', 'Lavender', 'Purple'],
    luckyGemstone: 'Yellow Sapphire, Aquamarine',
    compatibility: {
      best: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
      good: ['Pisces', 'Virgo'],
      challenging: ['Gemini', 'Sagittarius']
    },
    characteristics: {
      positive: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
      negative: ['Fearful', 'Overly-trusting', 'Sad', 'Victim-mentality', 'Escapist']
    },
    todayPrediction: 'Intuition guides you today. Creative inspiration flows. Compassion opens doors. Spiritual connection deepens.',
    weeklyPrediction: 'Artistic projects flourish. Emotional sensitivity increases. Spiritual growth continues. Help others selflessly.',
    monthlyPrediction: 'Creative and spiritual fulfillment. Career in arts or healing. Deep romantic connections form.',
    careerGuidance: 'Natural in arts, healing, spirituality, and charity. Your compassion touches lives.',
    loveGuidance: 'Romance is dreamy and idealistic. Emotional connection essential. Single Pisces attract through sensitivity.',
    healthGuidance: 'Focus on feet, lymphatic system, and immune system. Emotional health affects physical wellness. Meditation helps.',
    financeGuidance: 'Intuitive investments can pay off. Charitable giving important. Creative ventures financially rewarding.',
    luckyDay: 'Thursday',
    luckyTime: '7:00 AM - 9:00 AM'
  }
];
