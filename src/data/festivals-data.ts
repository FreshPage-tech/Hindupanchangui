export interface Festival {
  id: number;
  name: string;
  date: string; // YYYY-MM-DD format
  month: string;
  category: "major" | "moderate" | "vrat" | "regional";
  muhurat: string;
  description: string;
  color: string;
}

export const festivalsData: Festival[] = [
  // March 2026
  {
    id: 1,
    name: "Maha Shivaratri",
    date: "2026-03-01",
    month: "march",
    category: "major",
    muhurat: "12:00 AM - 1:00 AM",
    description: "Great night of Lord Shiva",
    color: "bg-indigo-600",
  },
  {
    id: 2,
    name: "Holika Dahan",
    date: "2026-03-13",
    month: "march",
    category: "major",
    muhurat: "6:30 PM - 8:45 PM",
    description: "Bonfire ceremony before Holi",
    color: "bg-orange-500",
  },
  {
    id: 3,
    name: "Holi",
    date: "2026-03-14",
    month: "march",
    category: "major",
    muhurat: "Full Day",
    description: "Festival of colors",
    color: "bg-pink-500",
  },
  {
    id: 4,
    name: "Chaitra Navratri Begins",
    date: "2026-03-22",
    month: "march",
    category: "major",
    muhurat: "Full Day",
    description: "Nine nights of Goddess worship",
    color: "bg-[#C74225]",
  },
  {
    id: 5,
    name: "Ram Navami",
    date: "2026-03-30",
    month: "march",
    category: "major",
    muhurat: "11:00 AM - 1:30 PM",
    description: "Birth of Lord Rama",
    color: "bg-blue-600",
  },
  
  // April 2026
  {
    id: 6,
    name: "Hanuman Jayanti",
    date: "2026-04-06",
    month: "april",
    category: "major",
    muhurat: "Morning",
    description: "Birth of Lord Hanuman",
    color: "bg-orange-600",
  },
  {
    id: 7,
    name: "Akshaya Tritiya",
    date: "2026-04-19",
    month: "april",
    category: "major",
    muhurat: "Full Day",
    description: "Auspicious day for new beginnings",
    color: "bg-[#FFD700]",
  },
  
  // May 2026
  {
    id: 8,
    name: "Buddha Purnima",
    date: "2026-05-03",
    month: "may",
    category: "major",
    muhurat: "Full Day",
    description: "Birth of Lord Buddha",
    color: "bg-yellow-500",
  },
  
  // June 2026
  {
    id: 9,
    name: "Vat Savitri Vrat",
    date: "2026-06-01",
    month: "june",
    category: "vrat",
    muhurat: "Morning",
    description: "Married women's fasting for husband's well-being",
    color: "bg-pink-600",
  },
  
  // July 2026
  {
    id: 10,
    name: "Jagannath Rath Yatra",
    date: "2026-07-05",
    month: "july",
    category: "major",
    muhurat: "Morning",
    description: "Chariot festival of Lord Jagannath",
    color: "bg-red-600",
  },
  {
    id: 11,
    name: "Guru Purnima",
    date: "2026-07-18",
    month: "july",
    category: "major",
    muhurat: "Evening",
    description: "Day to honor spiritual teachers",
    color: "bg-purple-600",
  },
  
  // August 2026
  {
    id: 12,
    name: "Nag Panchami",
    date: "2026-08-01",
    month: "august",
    category: "moderate",
    muhurat: "Morning",
    description: "Worship of serpent deities",
    color: "bg-green-600",
  },
  {
    id: 13,
    name: "Raksha Bandhan",
    date: "2026-08-09",
    month: "august",
    category: "major",
    muhurat: "Morning",
    description: "Brother-sister bond celebration",
    color: "bg-pink-500",
  },
  {
    id: 14,
    name: "Krishna Janmashtami",
    date: "2026-08-16",
    month: "august",
    category: "major",
    muhurat: "Midnight",
    description: "Birth of Lord Krishna",
    color: "bg-blue-600",
  },
  
  // September 2026
  {
    id: 15,
    name: "Ganesh Chaturthi",
    date: "2026-09-05",
    month: "september",
    category: "major",
    muhurat: "Morning",
    description: "Birth of Lord Ganesha",
    color: "bg-orange-500",
  },
  {
    id: 16,
    name: "Pitru Paksha Begins",
    date: "2026-09-11",
    month: "september",
    category: "moderate",
    muhurat: "Full Day",
    description: "Fortnight for ancestor worship",
    color: "bg-gray-600",
  },
  
  // October 2026
  {
    id: 17,
    name: "Sharad Navratri Begins",
    date: "2026-10-02",
    month: "october",
    category: "major",
    muhurat: "Full Day",
    description: "Nine nights of Goddess Durga",
    color: "bg-[#C74225]",
  },
  {
    id: 18,
    name: "Durga Ashtami",
    date: "2026-10-09",
    month: "october",
    category: "major",
    muhurat: "Morning",
    description: "Eighth day of Navratri",
    color: "bg-red-600",
  },
  {
    id: 19,
    name: "Dussehra",
    date: "2026-10-11",
    month: "october",
    category: "major",
    muhurat: "Full Day",
    description: "Victory of good over evil",
    color: "bg-blue-600",
  },
  {
    id: 20,
    name: "Karva Chauth",
    date: "2026-10-18",
    month: "october",
    category: "vrat",
    muhurat: "Moonrise",
    description: "Married women's fasting",
    color: "bg-pink-600",
  },
  
  // November 2026
  {
    id: 21,
    name: "Dhanteras",
    date: "2026-10-29",
    month: "october",
    category: "major",
    muhurat: "Evening",
    description: "Day of wealth and prosperity",
    color: "bg-[#FFD700]",
  },
  {
    id: 22,
    name: "Diwali",
    date: "2026-10-31",
    month: "october",
    category: "major",
    muhurat: "7:00 PM - 8:15 PM",
    description: "Festival of lights",
    color: "bg-[#FFD700]",
  },
  {
    id: 23,
    name: "Govardhan Puja",
    date: "2026-11-01",
    month: "november",
    category: "major",
    muhurat: "Morning",
    description: "Worship of Lord Krishna",
    color: "bg-blue-500",
  },
  {
    id: 24,
    name: "Bhai Dooj",
    date: "2026-11-02",
    month: "november",
    category: "major",
    muhurat: "Afternoon",
    description: "Brother-sister bond celebration",
    color: "bg-pink-500",
  },
  {
    id: 25,
    name: "Chhath Puja",
    date: "2026-11-05",
    month: "november",
    category: "major",
    muhurat: "Full Day",
    description: "Sun worship festival",
    color: "bg-orange-500",
  },
  
  // December 2026
  {
    id: 26,
    name: "Vivah Panchami",
    date: "2026-12-06",
    month: "december",
    category: "moderate",
    muhurat: "Morning",
    description: "Marriage of Rama and Sita",
    color: "bg-purple-500",
  },
  {
    id: 27,
    name: "Gita Jayanti",
    date: "2026-12-11",
    month: "december",
    category: "moderate",
    muhurat: "Full Day",
    description: "Day Krishna delivered Bhagavad Gita",
    color: "bg-[#C74225]",
  },
  
  // January 2027
  {
    id: 28,
    name: "Makar Sankranti",
    date: "2027-01-14",
    month: "january",
    category: "major",
    muhurat: "Morning",
    description: "Sun's transition to Capricorn",
    color: "bg-yellow-600",
  },
  
  // February 2027
  {
    id: 29,
    name: "Vasant Panchami",
    date: "2027-02-02",
    month: "february",
    category: "major",
    muhurat: "Morning",
    description: "Worship of Goddess Saraswati",
    color: "bg-yellow-500",
  },
  
  // Weekly Observances
  {
    id: 30,
    name: "Ekadashi",
    date: "2026-03-11",
    month: "march",
    category: "vrat",
    muhurat: "Full Day",
    description: "Fasting day for Lord Vishnu",
    color: "bg-teal-500",
  },
  {
    id: 31,
    name: "Ekadashi",
    date: "2026-03-25",
    month: "march",
    category: "vrat",
    muhurat: "Full Day",
    description: "Fasting day for Lord Vishnu",
    color: "bg-teal-500",
  },
];

// Helper function to get festivals for a specific date
export function getFestivalsForDate(date: Date): Festival[] {
  const dateStr = date.toISOString().split('T')[0];
  return festivalsData.filter(f => f.date === dateStr);
}

// Helper function to get festivals for a specific month
export function getFestivalsForMonth(month: number, year: number): Festival[] {
  return festivalsData.filter(f => {
    const festDate = new Date(f.date);
    return festDate.getMonth() === month && festDate.getFullYear() === year;
  });
}

// Helper function to check if a date has festivals
export function hasFetivals(date: Date): boolean {
  const dateStr = date.toISOString().split('T')[0];
  return festivalsData.some(f => f.date === dateStr);
}
