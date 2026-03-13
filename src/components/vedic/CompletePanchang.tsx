import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  ArrowLeft, 
  Calendar, 
  Sun, 
  Moon, 
  Star, 
  Clock, 
  AlertTriangle,
  Info,
  Globe,
  ChevronDown,
  Sparkles,
  Bell,
  BellRing,
  Check
} from "lucide-react";
import { getFestivalsForDate, getFestivalsForMonth, festivalsData } from "../../data/festivals-data";
import { toast } from "sonner";

interface CompletePanchangProps {
  onBack: () => void;
}

// Mock function to calculate Hindu calendar details
function calculateHinduCalendar(date: Date) {
  const day = date.getDate();
  const month = date.getMonth();
  
  const tithis = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"
  ];
  
  const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
    "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
    "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
    "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
    "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", 
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];
  
  const yogas = [
    "Vishkambha", "Preeti", "Ayushman", "Saubhagya", "Shobhana",
    "Atiganda", "Sukarma", "Dhriti", "Shoola", "Ganda",
    "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
    "Siddhi", "Vyatipata", "Variyana", "Parigha", "Shiva",
    "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma",
    "Indra", "Vaidhriti"
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
  
  const vara = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return {
    tithi: tithis[day % 15],
    tithiNumber: (day % 15) + 1,
    paksha: day < 15 ? "Shukla Paksha (Waxing)" : "Krishna Paksha (Waning)",
    nakshatra: nakshatras[day % 27],
    nakshatraLord: getNakshatraLord(day % 27),
    yoga: yogas[day % 27],
    karana: karanas[day % 11],
    vara: vara[date.getDay()],
    varaLord: getVaraLord(date.getDay()),
    maasa: hindiMonths[month],
    ritu: ritus[Math.floor(month / 2)],
    vikramSamvat: 2081 + (month >= 3 ? 1 : 0),
    sakaSamvat: 1946 + (month >= 3 ? 1 : 0),
    sunrise: "6:24 AM",
    sunset: "5:47 PM",
    moonrise: "7:15 PM",
    moonset: "8:30 AM",
    rahuKaal: getRahuKaal(date.getDay()),
    gulikaKaal: getGulikaKaal(date.getDay()),
    yamaganda: getYamaganda(date.getDay()),
    abhijitMuhurat: "11:52 AM - 12:40 PM",
    brahmaMuhurat: "4:40 AM - 5:28 AM",
    durMuhurtam: getDurMuhurtam(),
  };
}

function getNakshatraLord(index: number): string {
  const lords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  return lords[index % 9];
}

function getVaraLord(day: number): string {
  const lords = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  return lords[day];
}

function getRahuKaal(day: number): string {
  const timings = [
    "4:30 PM - 6:00 PM", "7:30 AM - 9:00 AM", "3:00 PM - 4:30 PM", "12:00 PM - 1:30 PM", 
    "1:30 PM - 3:00 PM", "10:30 AM - 12:00 PM", "9:00 AM - 10:30 AM"
  ];
  return timings[day];
}

function getGulikaKaal(day: number): string {
  const timings = [
    "3:00 PM - 4:30 PM", "12:00 PM - 1:30 PM", "10:30 AM - 12:00 PM", "9:00 AM - 10:30 AM",
    "7:30 AM - 9:00 AM", "6:00 AM - 7:30 AM", "4:30 PM - 6:00 PM"
  ];
  return timings[day];
}

function getYamaganda(day: number): string {
  const timings = [
    "12:00 PM - 1:30 PM", "10:30 AM - 12:00 PM", "9:00 AM - 10:30 AM", "7:30 AM - 9:00 AM",
    "6:00 AM - 7:30 AM", "3:00 PM - 4:30 PM", "1:30 PM - 3:00 PM"
  ];
  return timings[day];
}

function getDurMuhurtam(): string {
  const times = ["8:32 AM - 9:20 AM", "10:08 AM - 10:56 AM", "12:32 PM - 1:20 PM"];
  return times[Math.floor(Math.random() * times.length)];
}

// Calculate Choghadiya timings
function calculateChoghadiya(date: Date) {
  const dayOfWeek = date.getDay();
  
  // Choghadiya types with their nature
  const choghadiyaTypes = {
    udveg: { name: "Udveg", nature: "Inauspicious", color: "red" },
    char: { name: "Char", nature: "Good for travel", color: "green" },
    labh: { name: "Labh", nature: "Very Auspicious", color: "green" },
    amrit: { name: "Amrit", nature: "Very Auspicious", color: "green" },
    kaal: { name: "Kaal", nature: "Inauspicious", color: "red" },
    shubh: { name: "Shubh", nature: "Auspicious", color: "green" },
    rog: { name: "Rog", nature: "Inauspicious", color: "red" },
    chal: { name: "Chal", nature: "Average", color: "yellow" }
  };

  // Day Choghadiya sequence for each weekday (starting from Sunday = 0)
  const daySequences = [
    ["udveg", "char", "labh", "amrit", "kaal", "shubh", "rog", "udveg"], // Sunday
    ["amrit", "kaal", "shubh", "rog", "udveg", "char", "labh", "amrit"], // Monday
    ["char", "rog", "kaal", "labh", "udveg", "shubh", "amrit", "char"], // Tuesday
    ["rog", "udveg", "char", "labh", "amrit", "kaal", "shubh", "rog"], // Wednesday
    ["labh", "amrit", "kaal", "shubh", "rog", "udveg", "char", "labh"], // Thursday
    ["shubh", "amrit", "char", "rog", "kaal", "labh", "udveg", "shubh"], // Friday
    ["rog", "kaal", "labh", "udveg", "shubh", "amrit", "char", "rog"], // Saturday
  ];

  // Night Choghadiya sequence (same for all days, rotated)
  const nightSequences = [
    ["shubh", "amrit", "char", "rog", "kaal", "labh", "udveg", "shubh"], // Sunday night
    ["char", "rog", "kaal", "labh", "udveg", "shubh", "amrit", "char"], // Monday night
    ["labh", "udveg", "shubh", "amrit", "char", "rog", "kaal", "labh"], // Tuesday night
    ["amrit", "char", "rog", "kaal", "labh", "udveg", "shubh", "amrit"], // Wednesday night
    ["char", "rog", "kaal", "labh", "udveg", "shubh", "amrit", "char"], // Thursday night
    ["kaal", "labh", "udveg", "shubh", "amrit", "char", "rog", "kaal"], // Friday night
    ["labh", "udveg", "shubh", "amrit", "char", "rog", "kaal", "labh"], // Saturday night
  ];

  // Calculate day period duration (sunrise to sunset divided by 8)
  const dayDuration = 690; // ~11.5 hours in minutes
  const dayPeriod = Math.floor(dayDuration / 8); // ~86 minutes per period
  
  // Calculate night period duration (sunset to next sunrise divided by 8)
  const nightDuration = 750; // ~12.5 hours in minutes
  const nightPeriod = Math.floor(nightDuration / 8); // ~94 minutes per period

  // Starting times
  const sunriseHour = 6;
  const sunriseMinute = 24;
  const sunsetHour = 17;
  const sunsetMinute = 47;

  const dayChoghadiya = [];
  const nightChoghadiya = [];

  // Generate day Choghadiya
  for (let i = 0; i < 8; i++) {
    const startMinutes = sunriseHour * 60 + sunriseMinute + (i * dayPeriod);
    const endMinutes = startMinutes + dayPeriod;
    
    const startHour = Math.floor(startMinutes / 60);
    const startMin = startMinutes % 60;
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;

    const typeKey = daySequences[dayOfWeek][i];
    const type = choghadiyaTypes[typeKey];

    dayChoghadiya.push({
      period: i + 1,
      name: type.name,
      nature: type.nature,
      color: type.color,
      startTime: `${startHour % 12 || 12}:${startMin.toString().padStart(2, '0')} ${startHour >= 12 ? 'PM' : 'AM'}`,
      endTime: `${endHour % 12 || 12}:${endMin.toString().padStart(2, '0')} ${endHour >= 12 ? 'PM' : 'AM'}`,
    });
  }

  // Generate night Choghadiya
  for (let i = 0; i < 8; i++) {
    const startMinutes = sunsetHour * 60 + sunsetMinute + (i * nightPeriod);
    const endMinutes = startMinutes + nightPeriod;
    
    const startHour = Math.floor(startMinutes / 60) % 24;
    const startMin = startMinutes % 60;
    const endHour = Math.floor(endMinutes / 60) % 24;
    const endMin = endMinutes % 60;

    const typeKey = nightSequences[dayOfWeek][i];
    const type = choghadiyaTypes[typeKey];

    nightChoghadiya.push({
      period: i + 1,
      name: type.name,
      nature: type.nature,
      color: type.color,
      startTime: `${startHour % 12 || 12}:${startMin.toString().padStart(2, '0')} ${startHour >= 12 ? 'PM' : 'AM'}`,
      endTime: `${endHour % 12 || 12}:${endMin.toString().padStart(2, '0')} ${endHour >= 12 ? 'PM' : 'AM'}`,
    });
  }

  return { day: dayChoghadiya, night: nightChoghadiya };
}

export function CompletePanchang({ onBack }: CompletePanchangProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarType, setCalendarType] = useState("hindu");
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const panchangData = calculateHinduCalendar(selectedDate);
  const choghadiyaData = calculateChoghadiya(selectedDate);
  
  // Get festivals for current selected date and month
  const selectedDateFestivals = getFestivalsForDate(selectedDate);
  const monthFestivals = getFestivalsForMonth(calendarMonth.getMonth(), calendarMonth.getFullYear());

  // Create festival date modifiers for react-day-picker
  const festivalDates = festivalsData.map(f => new Date(f.date));

  const calendarTypes = [
    { value: "hindu", label: "Hindu Calendar (Vikram Samvat)", icon: "🕉️" },
    { value: "vedic", label: "Vedic Calendar", icon: "📿" },
    { value: "tamil", label: "Tamil Calendar (Tamil Panchangam)", icon: "🛕" },
    { value: "bengali", label: "Bengali Calendar (Bengali San)", icon: "🎭" },
    { value: "gujarati", label: "Gujarati Calendar", icon: "🪔" },
    { value: "kannada", label: "Kannada Calendar", icon: "🌺" },
    { value: "malayalam", label: "Malayalam Calendar (Kollavarsham)", icon: "🥥" },
    { value: "telugu", label: "Telugu Calendar", icon: "🌸" },
    { value: "marathi", label: "Marathi Calendar (Shalivahana Shaka)", icon: "🪷" },
    { value: "oriya", label: "Oriya Calendar", icon: "🏛️" },
    { value: "punjabi", label: "Punjabi Calendar (Nanakshahi)", icon: "⭐" },
    { value: "jain", label: "Jain Calendar (Vira Nirvana Samvat)", icon: "☸️" },
  ];

  const getCalendarInfo = () => {
    const calendarData: Record<string, any> = {
      hindu: {
        name: "Hindu Calendar",
        year: panchangData.vikramSamvat,
        yearLabel: "Vikram Samvat",
        month: panchangData.maasa,
        description: "Traditional Hindu lunisolar calendar"
      },
      vedic: {
        name: "Vedic Calendar",
        year: panchangData.vikramSamvat,
        yearLabel: "Vedic Year",
        month: panchangData.maasa,
        description: "Ancient Vedic astronomical calendar"
      },
      tamil: {
        name: "Tamil Calendar",
        year: panchangData.sakaSamvat + 1942,
        yearLabel: "Tamil Year",
        month: ["Chithirai", "Vaikasi", "Aani", "Aadi", "Aavani", "Purattasi", "Aippasi", "Karthigai", "Margazhi", "Thai", "Maasi", "Panguni"][selectedDate.getMonth()],
        description: "Traditional Tamil solar calendar"
      },
      bengali: {
        name: "Bengali Calendar",
        year: selectedDate.getFullYear() - 593,
        yearLabel: "Bengali San",
        month: ["Boishakh", "Joishtho", "Asharh", "Shravan", "Bhadro", "Ashwin", "Kartik", "Agrohayon", "Poush", "Magh", "Falgun", "Choitro"][selectedDate.getMonth()],
        description: "Bengali solar calendar system"
      },
      gujarati: {
        name: "Gujarati Calendar",
        year: panchangData.vikramSamvat,
        yearLabel: "Vikram Samvat",
        month: panchangData.maasa,
        description: "Gujarati lunisolar calendar"
      },
      kannada: {
        name: "Kannada Calendar",
        year: panchangData.sakaSamvat,
        yearLabel: "Shalivahana Shaka",
        month: panchangData.maasa,
        description: "Traditional Kannada calendar"
      },
      malayalam: {
        name: "Malayalam Calendar",
        year: selectedDate.getFullYear() - 824,
        yearLabel: "Kollavarsham",
        month: ["Chingam", "Kanni", "Thulam", "Vrischikam", "Dhanu", "Makaram", "Kumbham", "Meenam", "Medam", "Edavam", "Midhunam", "Karkidakam"][selectedDate.getMonth()],
        description: "Kerala traditional solar calendar"
      },
      telugu: {
        name: "Telugu Calendar",
        year: panchangData.sakaSamvat,
        yearLabel: "Shalivahana Shaka",
        month: panchangData.maasa,
        description: "Traditional Telugu calendar"
      },
      marathi: {
        name: "Marathi Calendar",
        year: panchangData.sakaSamvat,
        yearLabel: "Shalivahana Shaka",
        month: panchangData.maasa,
        description: "Marathi lunisolar calendar"
      },
      oriya: {
        name: "Oriya Calendar",
        year: panchangData.sakaSamvat,
        yearLabel: "Anka Year",
        month: panchangData.maasa,
        description: "Traditional Odia calendar"
      },
      punjabi: {
        name: "Punjabi Calendar",
        year: selectedDate.getFullYear() - 1469,
        yearLabel: "Nanakshahi",
        month: ["Chet", "Vaisakh", "Jeth", "Harh", "Sawan", "Bhadon", "Assu", "Katak", "Maghar", "Poh", "Magh", "Phagun"][selectedDate.getMonth()],
        description: "Sikh Nanakshahi calendar"
      },
      jain: {
        name: "Jain Calendar",
        year: selectedDate.getFullYear() + 527,
        yearLabel: "Vira Nirvana Samvat",
        month: panchangData.maasa,
        description: "Jain religious calendar"
      },
    };
    return calendarData[calendarType];
  };

  const currentCalendarInfo = getCalendarInfo();

  // Handle reminder functions
  const handleSetReminder = (type: string, title: string, time: string) => {
    toast.success(`Reminder set for ${title}`, {
      description: `You'll be notified at ${time}`,
      duration: 3000,
    });
  };

  const handleSetFestivalReminder = (festivalName: string, date: string, muhurat: string) => {
    toast.success(`Festival reminder set!`, {
      description: `${festivalName} on ${new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at ${muhurat}`,
      duration: 4000,
      icon: <BellRing className="h-4 w-4" />,
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4 hover:opacity-70 transition-opacity">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-white mb-1">Complete Panchang</h1>
        <p className="text-white/90 text-sm">Detailed Multi-Calendar System</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Calendar Type Selector */}
        <Card className="p-4 border-l-4 border-[#C74225] bg-gradient-to-r from-[#C74225]/5 to-white">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Select Calendar System</h3>
          </div>
          <Select value={calendarType} onValueChange={setCalendarType}>
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {calendarTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span className="flex items-center gap-2">
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-[#6B6B6B] mt-2">
            {currentCalendarInfo.description}
          </p>
        </Card>

        {/* Date Picker */}
        <Card className="p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#2C2C2C] flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#C74225]" />
              Select Date
            </h3>
            <Button
              onClick={() => setShowCalendar(!showCalendar)}
              variant="outline"
              size="sm"
            >
              {showCalendar ? "Hide" : "Show"} Calendar
            </Button>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-[#C74225]/5 to-gray-50 rounded-lg border border-[#C74225]/20">
            <div className="text-2xl text-[#C74225] mb-2">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex gap-2 justify-center mt-3">
              <Button 
                onClick={() => setSelectedDate(new Date())}
                variant="outline"
                size="sm"
              >
                Today
              </Button>
              <Button 
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 1);
                  setSelectedDate(newDate);
                }}
                variant="outline"
                size="sm"
              >
                Previous Day
              </Button>
              <Button 
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 1);
                  setSelectedDate(newDate);
                }}
                variant="outline"
                size="sm"
              >
                Next Day
              </Button>
            </div>
          </div>

          {/* Calendar Component */}
          {showCalendar && (
            <div className="mt-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                      }
                    }}
                    onMonthChange={(month) => {
                      setCalendarMonth(month);
                    }}
                    className="rounded-md border"
                    modifiers={{
                      festival: festivalDates,
                    }}
                    modifiersStyles={{
                      festival: {
                        position: 'relative',
                      },
                    }}
                    modifiersClassNames={{
                      festival: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#C74225] after:rounded-full",
                    }}
                  />
                </div>
              </div>

              {/* Legend */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                <div className="flex items-center gap-4 justify-center text-xs text-[#6B6B6B]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#C74225] rounded-full"></div>
                    <span>Festival Day</span>
                  </div>
                </div>
              </div>

              {/* Festivals in Current Month */}
              {monthFestivals.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-[#C74225]" />
                    <h4 className="text-[#2C2C2C]">
                      Festivals in {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h4>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {monthFestivals.map((festival) => (
                      <div
                        key={festival.id}
                        className="bg-white rounded-lg p-3 border border-gray-200 hover:border-[#C74225] transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedDate(new Date(festival.date));
                          setShowCalendar(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 ${festival.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                            <span className="text-sm font-medium">
                              {new Date(festival.date).getDate()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div className="text-sm text-[#2C2C2C] font-medium">{festival.name}</div>
                              {festival.category === "major" && (
                                <Badge className="bg-[#C74225] text-white text-xs ml-2">
                                  Major
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-[#6B6B6B] mb-1">{festival.description}</div>
                            <div className="flex items-center gap-2 text-xs text-[#C74225]">
                              <Clock className="h-3 w-3" />
                              <span>{festival.muhurat}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Festivals on Selected Date */}
              {selectedDateFestivals.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-[#C74225]" />
                    <h4 className="text-[#2C2C2C]">
                      Festivals on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {selectedDateFestivals.map((festival) => (
                      <Card key={festival.id} className="p-3 border-l-4" style={{ borderColor: festival.color.replace('bg-', '').includes('[') ? '#C74225' : '' }}>
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 ${festival.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                            <span className="text-lg font-medium">
                              {new Date(festival.date).getDate()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-[#2C2C2C] font-medium">{festival.name}</div>
                              {festival.category === "major" && (
                                <Badge className="bg-[#C74225] text-white">
                                  Major Festival
                                </Badge>
                              )}
                              {festival.category === "vrat" && (
                                <Badge className="bg-teal-600 text-white">
                                  Vrat
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#6B6B6B] mb-2">{festival.description}</p>
                            <div className="flex items-center gap-2 text-sm text-[#C74225]">
                              <Clock className="h-4 w-4" />
                              <span>Muhurat: {festival.muhurat}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Main Panchang Elements */}
        <Tabs defaultValue="panchangang" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50">
            <TabsTrigger value="panchangang">Panchangang</TabsTrigger>
            <TabsTrigger value="timings">Timings</TabsTrigger>
            <TabsTrigger value="muhurat">Muhurat</TabsTrigger>
          </TabsList>

          {/* Panchangang Tab */}
          <TabsContent value="panchangang" className="space-y-3 mt-4">
            {/* Tithi */}
            <Card className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Moon className="h-5 w-5 text-[#C74225]" />
                    <h4 className="text-[#2C2C2C]">Tithi (Lunar Day)</h4>
                  </div>
                  <div className="text-2xl text-[#C74225] mb-2">{panchangData.tithi}</div>
                  <Badge className="bg-[#C74225] text-white">
                    {panchangData.tithiNumber}/15 - {panchangData.paksha.split(' ')[0]}
                  </Badge>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mt-3">
                <div className="text-sm text-[#6B6B6B] mb-1">Paksha (Lunar Fortnight)</div>
                <div className="text-[#2C2C2C]">{panchangData.paksha}</div>
              </div>
            </Card>

            {/* Nakshatra */}
            <Card className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-5 w-5 text-[#C74225]" />
                    <h4 className="text-[#2C2C2C]">Nakshatra (Constellation)</h4>
                  </div>
                  <div className="text-2xl text-[#C74225] mb-2">{panchangData.nakshatra}</div>
                  <Badge className="bg-[#C74225] text-white">
                    Lord: {panchangData.nakshatraLord}
                  </Badge>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mt-3">
                <div className="text-sm text-[#6B6B6B]">
                  One of the 27 lunar mansions used in Vedic astrology for auspicious timing
                </div>
              </div>
            </Card>

            {/* Vara, Yoga, Karana */}
            <Card className="p-4 border border-gray-100">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[#6B6B6B] mb-1">Vara (Weekday)</div>
                    <div className="text-[#2C2C2C]">{panchangData.vara}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#6B6B6B] mb-1">Ruling Planet</div>
                    <div className="text-[#C74225]">{panchangData.varaLord}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-[#6B6B6B] mb-1">Yoga</div>
                  <div className="text-[#2C2C2C]">{panchangData.yoga}</div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-[#6B6B6B] mb-1">Karana</div>
                  <div className="text-[#2C2C2C]">{panchangData.karana}</div>
                </div>
              </div>
            </Card>

            {/* Month and Season */}
            <Card className="p-4 bg-gray-50 border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#6B6B6B] mb-1">Maasa (Month)</div>
                  <div className="text-[#2C2C2C]">{panchangData.maasa}</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B6B6B] mb-1">Ritu (Season)</div>
                  <div className="text-[#2C2C2C]">{panchangData.ritu}</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Timings Tab */}
          <TabsContent value="timings" className="space-y-3 mt-4">
            {/* Sun & Moon Timings */}
            <Card className="p-4 border border-gray-100">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sun className="h-5 w-5 text-[#C74225]" />
                    <h4 className="text-[#2C2C2C]">Sun Timings</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-[#6B6B6B] mb-1">Sunrise</div>
                      <div className="text-[#C74225]">{panchangData.sunrise}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-[#6B6B6B] mb-1">Sunset</div>
                      <div className="text-[#C74225]">{panchangData.sunset}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Moon className="h-5 w-5 text-[#C74225]" />
                    <h4 className="text-[#2C2C2C]">Moon Timings</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-[#6B6B6B] mb-1">Moonrise</div>
                      <div className="text-[#C74225]">{panchangData.moonrise}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-[#6B6B6B] mb-1">Moonset</div>
                      <div className="text-[#C74225]">{panchangData.moonset}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Inauspicious Timings */}
            <Card className="p-4 border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h4 className="text-[#2C2C2C]">Inauspicious Periods</h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[#2C2C2C] mb-1">Rahu Kaal</div>
                      <div className="text-xs text-[#6B6B6B]">Most inauspicious - avoid new ventures</div>
                    </div>
                    <div className="text-red-600 text-sm">{panchangData.rahuKaal}</div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[#2C2C2C] mb-1">Gulika Kaal</div>
                      <div className="text-xs text-[#6B6B6B]">Son of Saturn - inauspicious</div>
                    </div>
                    <div className="text-red-600 text-sm">{panchangData.gulikaKaal}</div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[#2C2C2C] mb-1">Yamaganda</div>
                      <div className="text-xs text-[#6B6B6B]">Avoid travel and important work</div>
                    </div>
                    <div className="text-red-600 text-sm">{panchangData.yamaganda}</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Muhurat Tab */}
          <TabsContent value="muhurat" className="space-y-3 mt-4">
            <Card className="p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-green-600" />
                <h4 className="text-[#2C2C2C]">Auspicious Muhurat</h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-[#2C2C2C] mb-1">Abhijit Muhurat</div>
                      <div className="text-xs text-[#6B6B6B]">Most auspicious time of the day</div>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      Favorable
                    </Badge>
                  </div>
                  <div className="text-green-600 mb-2">{panchangData.abhijitMuhurat}</div>
                  <Separator className="my-2" />
                  <div className="text-sm text-[#6B6B6B] mb-3">
                    Best for: Weddings, new ventures, travel, important decisions
                  </div>
                  <Button
                    onClick={() => handleSetReminder('muhurat', 'Abhijit Muhurat', panchangData.abhijitMuhurat)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-[#2C2C2C] mb-1">Brahma Muhurat</div>
                      <div className="text-xs text-[#6B6B6B]">Sacred time for meditation</div>
                    </div>
                    <Badge className="bg-[#C74225] text-white">
                      Spiritual
                    </Badge>
                  </div>
                  <div className="text-green-600 mb-2">{panchangData.brahmaMuhurat}</div>
                  <Separator className="my-2" />
                  <div className="text-sm text-[#6B6B6B] mb-3">
                    Best for: Yoga, meditation, spiritual practices, studying
                  </div>
                  <Button
                    onClick={() => handleSetReminder('muhurat', 'Brahma Muhurat', panchangData.brahmaMuhurat)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Choghadiya Section */}
        <Card className="p-4 border-l-4 border-[#C74225]">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Choghadiya (चौघड़िया)</h3>
          </div>
          
          <div className="bg-[#C74225]/5 rounded-lg p-3 mb-4 border border-[#C74225]/20">
            <div className="text-sm text-[#6B6B6B]">
              Choghadiya is a Vedic time period system that divides day and night into 8 periods each. 
              Each period has a specific nature - Auspicious, Inauspicious, or Average for various activities.
            </div>
          </div>

          <Tabs defaultValue="day" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-50">
              <TabsTrigger value="day">
                <Sun className="h-4 w-4 mr-2" />
                Day Choghadiya
              </TabsTrigger>
              <TabsTrigger value="night">
                <Moon className="h-4 w-4 mr-2" />
                Night Choghadiya
              </TabsTrigger>
            </TabsList>

            {/* Day Choghadiya */}
            <TabsContent value="day" className="space-y-2 mt-4">
              <div className="bg-yellow-50 rounded-lg p-3 mb-3 border border-yellow-200">
                <div className="text-sm text-[#2C2C2C] mb-1 flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-600" />
                  Day Choghadiya Period: {panchangData.sunrise} to {panchangData.sunset}
                </div>
                <div className="text-xs text-[#6B6B6B]">
                  Sunrise to Sunset divided into 8 equal periods
                </div>
              </div>

              {choghadiyaData.day.map((period, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-3 border ${
                    period.color === 'green'
                      ? 'bg-green-50 border-green-200'
                      : period.color === 'red'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`${
                            period.color === 'green'
                              ? 'bg-green-600 text-white'
                              : period.color === 'red'
                              ? 'bg-red-600 text-white'
                              : 'bg-yellow-600 text-white'
                          }`}
                        >
                          {period.period}
                        </Badge>
                        <div className={`font-medium ${
                          period.color === 'green'
                            ? 'text-green-700'
                            : period.color === 'red'
                            ? 'text-red-700'
                            : 'text-yellow-700'
                        }`}>
                          {period.name}
                        </div>
                      </div>
                      <div className="text-xs text-[#6B6B6B]">{period.nature}</div>
                    </div>
                    <div className={`text-right text-sm ${
                      period.color === 'green'
                        ? 'text-green-700'
                        : period.color === 'red'
                        ? 'text-red-700'
                        : 'text-yellow-700'
                    }`}>
                      <div>{period.startTime}</div>
                      <div className="text-xs">to</div>
                      <div>{period.endTime}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 rounded-lg p-3 mt-3 border border-gray-200">
                <div className="text-xs text-[#6B6B6B]">
                  <strong>Legend:</strong>
                  <div className="mt-2 space-y-1">
                    <div>🟢 <strong>Labh, Amrit, Shubh, Char:</strong> Auspicious - Good for all activities</div>
                    <div>🔴 <strong>Udveg, Kaal, Rog:</strong> Inauspicious - Avoid new ventures</div>
                    <div>🟡 <strong>Chal:</strong> Average - Moderate for activities</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Night Choghadiya */}
            <TabsContent value="night" className="space-y-2 mt-4">
              <div className="bg-blue-50 rounded-lg p-3 mb-3 border border-blue-200">
                <div className="text-sm text-[#2C2C2C] mb-1 flex items-center gap-2">
                  <Moon className="h-4 w-4 text-blue-600" />
                  Night Choghadiya Period: {panchangData.sunset} to {panchangData.sunrise} (next day)
                </div>
                <div className="text-xs text-[#6B6B6B]">
                  Sunset to next Sunrise divided into 8 equal periods
                </div>
              </div>

              {choghadiyaData.night.map((period, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-3 border ${
                    period.color === 'green'
                      ? 'bg-green-50 border-green-200'
                      : period.color === 'red'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`${
                            period.color === 'green'
                              ? 'bg-green-600 text-white'
                              : period.color === 'red'
                              ? 'bg-red-600 text-white'
                              : 'bg-yellow-600 text-white'
                          }`}
                        >
                          {period.period}
                        </Badge>
                        <div className={`font-medium ${
                          period.color === 'green'
                            ? 'text-green-700'
                            : period.color === 'red'
                            ? 'text-red-700'
                            : 'text-yellow-700'
                        }`}>
                          {period.name}
                        </div>
                      </div>
                      <div className="text-xs text-[#6B6B6B]">{period.nature}</div>
                    </div>
                    <div className={`text-right text-sm ${
                      period.color === 'green'
                        ? 'text-green-700'
                        : period.color === 'red'
                        ? 'text-red-700'
                        : 'text-yellow-700'
                    }`}>
                      <div>{period.startTime}</div>
                      <div className="text-xs">to</div>
                      <div>{period.endTime}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 rounded-lg p-3 mt-3 border border-gray-200">
                <div className="text-xs text-[#6B6B6B]">
                  <strong>Best Uses:</strong>
                  <div className="mt-2 space-y-1">
                    <div>✨ <strong>Amrit/Labh:</strong> Weddings, business deals, important decisions</div>
                    <div>🌟 <strong>Shubh:</strong> Religious ceremonies, new ventures, travel</div>
                    <div>🚶 <strong>Char:</strong> Best for journeys and movement</div>
                    <div>⚠️ <strong>Kaal/Rog/Udveg:</strong> Avoid starting important tasks</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Gregorian vs Selected Calendar Comparison */}
        <Card className="p-4 border-l-4 border-[#C74225]">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Calendar Comparison</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Gregorian Calendar */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-[#6B6B6B] mb-2">Gregorian Calendar</div>
              <div className="text-[#2C2C2C] text-sm mb-1">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="text-xs text-[#6B6B6B]">
                CE {selectedDate.getFullYear()}
              </div>
            </div>

            {/* Selected Regional Calendar */}
            <div className="bg-[#C74225]/5 rounded-lg p-3 border border-[#C74225]/20">
              <div className="text-xs text-[#6B6B6B] mb-2">{currentCalendarInfo.name}</div>
              <div className="text-[#2C2C2C] text-sm mb-1">
                {currentCalendarInfo.month}
              </div>
              <div className="text-xs text-[#6B6B6B]">
                {currentCalendarInfo.yearLabel} {currentCalendarInfo.year}
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs text-[#6B6B6B] mb-1">Vikram Samvat</div>
              <div className="text-[#2C2C2C]">{panchangData.vikramSamvat}</div>
            </div>
            <div>
              <div className="text-xs text-[#6B6B6B] mb-1">Saka Samvat</div>
              <div className="text-[#2C2C2C]">{panchangData.sakaSamvat}</div>
            </div>
            <div>
              <div className="text-xs text-[#6B6B6B] mb-1">Season (Ritu)</div>
              <div className="text-[#2C2C2C]">{panchangData.ritu}</div>
            </div>
            <div>
              <div className="text-xs text-[#6B6B6B] mb-1">Weekday</div>
              <div className="text-[#2C2C2C]">{panchangData.vara}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}