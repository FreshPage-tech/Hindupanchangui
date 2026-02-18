import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Sun, 
  Moon, 
  Star, 
  Clock, 
  AlertTriangle,
  Info,
  Globe
} from "lucide-react";

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

function getDurMuhurtam(): string[] {
  return ["10:24 AM - 11:12 AM", "3:36 PM - 4:24 PM"];
}

export function CompletePanchang({ onBack }: CompletePanchangProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const panchangData = calculateHinduCalendar(selectedDate);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-gray-100">
        <button onClick={onBack} className="mb-4 hover:opacity-70 transition-opacity">
          <ArrowLeft className="h-6 w-6 text-[#2C2C2C]" />
        </button>
        <h1 className="text-[#2C2C2C] mb-1">Complete Panchang</h1>
        <p className="text-[#6B6B6B]">Detailed Hindu Calendar Calculator</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Calendar Date Selector */}
        <Card className="p-4 border border-gray-100">
          <h3 className="text-[#2C2C2C] mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#C74225]" />
            Select Date
          </h3>
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border-0"
          />
        </Card>

        {/* Gregorian vs Hindu Calendar Comparison */}
        <Card className="p-4 border-l-4 border-[#C74225]">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Calendar Comparison</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Gregorian Calendar */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-[#6B6B6B] mb-2">Gregorian Calendar</div>
              <div className="text-[#2C2C2C] mb-1">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-sm text-[#6B6B6B]">
                CE {selectedDate.getFullYear()}
              </div>
            </div>

            {/* Hindu Calendar */}
            <div className="bg-[#C74225]/5 rounded-lg p-3 border border-[#C74225]/20">
              <div className="text-xs text-[#6B6B6B] mb-2">Hindu Calendar</div>
              <div className="text-[#2C2C2C] mb-1">
                {panchangData.tithi}, {panchangData.maasa}
              </div>
              <div className="text-sm text-[#6B6B6B]">
                Vikram Samvat {panchangData.vikramSamvat}
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs text-[#6B6B6B] mb-1">Saka Samvat</div>
              <div className="text-[#2C2C2C]">{panchangData.sakaSamvat}</div>
            </div>
            <div>
              <div className="text-xs text-[#6B6B6B] mb-1">Season</div>
              <div className="text-[#2C2C2C]">{panchangData.ritu}</div>
            </div>
          </div>
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
                  <div className="text-sm text-[#6B6B6B]">
                    Best for: Weddings, new ventures, travel, important decisions
                  </div>
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
                  <div className="text-sm text-[#6B6B6B]">
                    Best for: Yoga, meditation, spiritual practices, studying
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
