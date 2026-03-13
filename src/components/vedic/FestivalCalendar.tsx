import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Plus, 
  Filter, 
  Download, 
  Search,
  Sparkles,
  CheckCircle,
  Bell,
  Share2,
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface FestivalCalendarProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function FestivalCalendar({ onBack, onNavigate }: FestivalCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [reminders, setReminders] = useState<number[]>([]);

  const festivals = [
    {
      id: 1,
      name: "Diwali - Lakshmi Puja",
      date: "2025-11-02",
      month: "november",
      category: "major",
      muhurat: "7:02 PM - 8:15 PM",
      description: "Festival of lights, worship of Goddess Lakshmi",
      color: "bg-[#FFD700]",
      image: "https://images.unsplash.com/photo-1709098275085-78e09efeaa1a?w=400",
      deity: "Goddess Lakshmi",
      quickTip: "Light diyas and clean your home",
      significance: "Celebrates victory of light over darkness",
      countdown: "2 days"
    },
    {
      id: 2,
      name: "Govardhan Puja",
      date: "2025-11-03",
      month: "november",
      category: "major",
      muhurat: "6:30 AM - 8:45 AM",
      description: "Annakut - worship of Lord Krishna",
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1587374133942-86b5ad95d1ae?w=400",
      deity: "Lord Krishna",
      quickTip: "Prepare 56 food items (Chhappan Bhog)",
      significance: "Celebrate Krishna lifting Govardhan hill",
      countdown: "3 days"
    },
    {
      id: 3,
      name: "Bhai Dooj",
      date: "2025-11-04",
      month: "november",
      category: "major",
      muhurat: "1:15 PM - 3:27 PM",
      description: "Brother-sister bond celebration",
      color: "bg-pink-500",
      image: "https://images.unsplash.com/photo-1609166214994-502d326bafee?w=400",
      deity: "Yama & Yamuna",
      quickTip: "Sisters apply tilak to brothers",
      significance: "Strengthens sibling relationship",
      countdown: "4 days"
    },
    {
      id: 4,
      name: "Chhath Puja (Day 1)",
      date: "2025-11-05",
      month: "november",
      category: "major",
      muhurat: "Full Day",
      description: "Nahaay Khaay - purification ritual",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1604608293644-2f4bef5e7e0c?w=400",
      deity: "Sun God (Surya)",
      quickTip: "Take holy bath in river",
      significance: "Begin 4-day Sun worship",
      countdown: "5 days"
    },
    {
      id: 5,
      name: "Chhath Puja (Day 2)",
      date: "2025-11-06",
      month: "november",
      category: "major",
      muhurat: "Evening",
      description: "Kharna - preparation day",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1604608293644-2f4bef5e7e0c?w=400",
      deity: "Sun God (Surya)",
      quickTip: "Fast throughout the day",
      significance: "Prepare for main rituals",
      countdown: "6 days"
    },
    {
      id: 6,
      name: "Chhath Puja (Day 3)",
      date: "2025-11-07",
      month: "november",
      category: "major",
      muhurat: "Evening Arghya",
      description: "Sandhya Arghya - evening offerings to Sun",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1604608293644-2f4bef5e7e0c?w=400",
      deity: "Sun God (Surya)",
      quickTip: "Offer Arghya at sunset",
      significance: "Evening worship at riverbank",
      countdown: "7 days"
    },
    {
      id: 7,
      name: "Chhath Puja (Day 4)",
      date: "2025-11-08",
      month: "november",
      category: "major",
      muhurat: "6:30 AM - 7:15 AM",
      description: "Usha Arghya - morning offerings to Sun",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1604608293644-2f4bef5e7e0c?w=400",
      deity: "Sun God (Surya)",
      quickTip: "Offer Arghya at sunrise",
      significance: "Complete the sacred vrat",
      countdown: "8 days"
    },
    {
      id: 8,
      name: "Kartik Purnima",
      date: "2025-11-12",
      month: "november",
      category: "major",
      muhurat: "Moonrise - 5:45 PM",
      description: "Full moon holy bath, Tulsi Vivah",
      color: "bg-[#357A38]",
      image: "https://images.unsplash.com/photo-1587374133942-86b5ad95d1ae?w=400",
      deity: "Lord Shiva & Vishnu",
      quickTip: "Take bath in sacred river",
      significance: "Most auspicious full moon",
      countdown: "12 days"
    },
    {
      id: 9,
      name: "Guru Nanak Jayanti",
      date: "2025-11-15",
      month: "november",
      category: "major",
      muhurat: "Full Day",
      description: "Birth anniversary of Guru Nanak Dev Ji",
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1587374133942-86b5ad95d1ae?w=400",
      deity: "Guru Nanak Dev",
      quickTip: "Attend kirtan and langar",
      significance: "Birth of first Sikh Guru",
      countdown: "15 days"
    },
    {
      id: 10,
      name: "Vivah Panchami",
      date: "2025-11-18",
      month: "november",
      category: "moderate",
      muhurat: "Morning",
      description: "Marriage of Lord Rama and Goddess Sita",
      color: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1609166214994-502d326bafee?w=400",
      deity: "Lord Rama & Sita",
      quickTip: "Auspicious for weddings",
      significance: "Celebrate divine marriage",
      countdown: "18 days"
    },
    {
      id: 11,
      name: "Gita Jayanti",
      date: "2025-11-22",
      month: "november",
      category: "moderate",
      muhurat: "Full Day",
      description: "Day Lord Krishna delivered Bhagavad Gita",
      color: "bg-[#C74225]",
      image: "https://images.unsplash.com/photo-1587374133942-86b5ad95d1ae?w=400",
      deity: "Lord Krishna",
      quickTip: "Read Bhagavad Gita",
      significance: "Sacred scripture anniversary",
      countdown: "22 days"
    },
    {
      id: 12,
      name: "Ekadashi",
      date: "2025-11-10",
      month: "november",
      category: "vrat",
      muhurat: "Sunrise to Next Sunrise",
      description: "Fasting day dedicated to Lord Vishnu",
      color: "bg-teal-500",
      image: "https://images.unsplash.com/photo-1587374133942-86b5ad95d1ae?w=400",
      deity: "Lord Vishnu",
      quickTip: "Fast completely or eat only fruits",
      significance: "Purifies mind and body",
      countdown: "10 days"
    },
    {
      id: 13,
      name: "Pradosh Vrat",
      date: "2025-11-14",
      month: "november",
      category: "vrat",
      muhurat: "Evening twilight",
      description: "Worship of Lord Shiva during twilight",
      color: "bg-indigo-500",
      image: "https://images.unsplash.com/photo-1604608293644-2f4bef5e7e0c?w=400",
      deity: "Lord Shiva",
      quickTip: "Worship during sunset time",
      significance: "Removes all sins",
      countdown: "14 days"
    },
  ];

  const upcomingFestivals = festivals.filter(f => new Date(f.date) >= new Date()).slice(0, 10);

  // Filter festivals by month, category, and search
  const filteredFestivals = festivals.filter(festival => {
    const matchesMonth = selectedMonth === "all" || festival.month === selectedMonth;
    const matchesCategory = selectedCategory === "all" || festival.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      festival.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      festival.deity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMonth && matchesCategory && matchesSearch;
  });

  // Handle export calendar
  const handleExportCalendar = () => {
    toast.success("Calendar export initiated!", {
      description: "Downloading .ics file for all Hindu festivals",
      duration: 3000,
    });
    
    // Create ICS file content
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VedicTime//Festival Calendar//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:Hindu Festivals 2025-2026
X-WR-TIMEZONE:Asia/Kolkata
`;

    festivals.forEach(festival => {
      const eventDate = new Date(festival.date);
      const dateStr = eventDate.toISOString().split('T')[0].replace(/-/g, '');
      
      icsContent += `BEGIN:VEVENT
UID:${festival.id}@vedictime.app
DTSTAMP:${dateStr}T000000Z
DTSTART:${dateStr}T000000Z
SUMMARY:${festival.name}
DESCRIPTION:${festival.description}\\\\nMuhurat: ${festival.muhurat}
STATUS:CONFIRMED
END:VEVENT
`;
    });

    icsContent += `END:VCALENDAR`;

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hindu-festivals-2025-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Handle month filter display
  const handleMonthSelection = (month: string) => {
    setSelectedMonth(month.toLowerCase());
    toast.success(`Showing festivals for ${month}`, {
      duration: 2000,
    });
  };

  // Handle reminder toggle
  const handleReminderToggle = (festivalId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (reminders.includes(festivalId)) {
      setReminders(reminders.filter(id => id !== festivalId));
      toast.success("Reminder removed");
    } else {
      setReminders([...reminders, festivalId]);
      toast.success("Reminder set!", {
        icon: '⏰',
      });
    }
  };

  // Handle share
  const handleShare = (festival: any, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Sharing ${festival.name}`, {
      icon: '🔗',
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6 rounded-b-3xl">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white mb-2">Festival Calendar</h1>
        <p className="text-white/90 text-sm">30+ Hindu Festivals & Sacred Events</p>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search festivals, deities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-white/60 hover:text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center bg-gradient-to-br from-[#FFD700]/20 to-white border border-[#FFD700]/30">
            <div className="text-2xl font-bold text-[#C74225] mb-1">13</div>
            <div className="text-xs text-[#6B6B6B]">This Month</div>
          </Card>
          <Card className="p-3 text-center bg-gradient-to-br from-[#357A38]/20 to-white border border-[#357A38]/30">
            <div className="text-2xl font-bold text-[#357A38] mb-1">9</div>
            <div className="text-xs text-[#6B6B6B]">Major Festivals</div>
          </Card>
          <Card className="p-3 text-center bg-gradient-to-br from-[#C74225]/20 to-white border border-[#C74225]/30">
            <div className="text-2xl font-bold text-[#C74225] mb-1">{reminders.length}</div>
            <div className="text-xs text-[#6B6B6B]">Reminders</div>
          </Card>
        </div>

        {/* Export Calendar CTA */}
        <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-white border border-[#FFD700]/30">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-[#2C2C2C] font-medium mb-1">Sync to Your Calendar</h4>
              <p className="text-xs text-[#6B6B6B]">
                Export all festivals to Google, Apple, or Outlook
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-[#C74225] text-[#C74225] hover:bg-[#C74225]/10"
              onClick={handleExportCalendar}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </Card>

        {/* Calendar View Toggle */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="list">📋 List View</TabsTrigger>
            <TabsTrigger value="calendar">📅 Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-3 mt-4">
            {/* Browse by Month */}
            <Card className="p-4 bg-white border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[#2C2C2C] font-medium">Browse by Month</h4>
                {selectedMonth !== "all" && (
                  <button
                    onClick={() => handleMonthSelection("All")}
                    className="text-xs text-[#C74225] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "All", "November", "December", "January",
                  "February", "March", "April",
                  "May", "June", "July"
                ].map((month) => (
                  <button
                    key={month}
                    className={`p-2.5 rounded-lg border transition-all text-sm ${
                      selectedMonth === month.toLowerCase()
                        ? "bg-[#C74225] text-white border-[#C74225] shadow-sm"
                        : "bg-white text-[#2C2C2C] border-gray-200 hover:border-[#C74225] hover:shadow-sm"
                    }`}
                    onClick={() => handleMonthSelection(month)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </Card>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Badge
                className={`cursor-pointer px-3 py-1.5 ${
                  selectedCategory === "all" 
                    ? "bg-[#C74225] text-white border-[#C74225]" 
                    : "bg-white text-[#2C2C2C] border border-gray-300 hover:border-[#C74225]"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                All ({festivals.length})
              </Badge>
              <Badge
                className={`cursor-pointer px-3 py-1.5 ${
                  selectedCategory === "major"
                    ? "bg-[#C74225] text-white border-[#C74225]"
                    : "bg-white text-[#2C2C2C] border border-gray-300 hover:border-[#C74225]"
                }`}
                onClick={() => setSelectedCategory("major")}
              >
                Major Festivals ({festivals.filter(f => f.category === "major").length})
              </Badge>
              <Badge
                className={`cursor-pointer px-3 py-1.5 ${
                  selectedCategory === "vrat"
                    ? "bg-[#C74225] text-white border-[#C74225]"
                    : "bg-white text-[#2C2C2C] border border-gray-300 hover:border-[#C74225]"
                }`}
                onClick={() => setSelectedCategory("vrat")}
              >
                Vrat & Fasting ({festivals.filter(f => f.category === "vrat").length})
              </Badge>
            </div>

            {/* Search Results Count */}
            {searchQuery && (
              <div className="text-sm text-[#6B6B6B] px-1">
                Found {filteredFestivals.length} festival{filteredFestivals.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>
            )}

            {/* Festivals List - Enhanced Cards */}
            <div className="space-y-3">
              {filteredFestivals.length > 0 ? (
                filteredFestivals.map((festival) => (
                  <Card
                    key={festival.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-all border border-gray-100"
                    onClick={() => onNavigate("festival-detail", festival)}
                  >
                    <div className="flex gap-3">
                      {/* Festival Image */}
                      <div className="w-28 h-28 flex-shrink-0 relative">
                        <ImageWithFallback
                          src={festival.image}
                          alt={festival.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-[#C74225] text-white text-xs">
                            {festival.countdown}
                          </Badge>
                        </div>
                        <div className={`absolute bottom-0 left-0 right-0 h-1 ${festival.color}`}></div>
                      </div>

                      {/* Festival Info */}
                      <div className="flex-1 py-2 pr-3">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <h4 className="text-[#2C2C2C] font-medium mb-0.5 line-clamp-1">
                              {festival.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2">
                              <Calendar className="h-3 w-3 text-[#C74225]" />
                              <span>{new Date(festival.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              <span>•</span>
                              <span>{festival.deity}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-[#6B6B6B] mb-2 line-clamp-1">
                          {festival.description}
                        </p>

                        {/* Quick Tips */}
                        <div className="space-y-1 mb-2">
                          <div className="flex items-start gap-1.5 text-xs">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-[#6B6B6B] line-clamp-1">{festival.quickTip}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-xs">
                            <Clock className="h-3 w-3 text-[#C74225] mt-0.5 flex-shrink-0" />
                            <span className="text-[#6B6B6B] line-clamp-1">{festival.muhurat}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={(e) => handleReminderToggle(festival.id, e)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                              reminders.includes(festival.id)
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-[#6B6B6B] border border-gray-200 hover:border-[#C74225]"
                            }`}
                          >
                            <Bell className="h-3 w-3" />
                            {reminders.includes(festival.id) ? "Set" : "Remind"}
                          </button>
                          <button
                            onClick={(e) => handleShare(festival, e)}
                            className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-100 text-[#6B6B6B] border border-gray-200 hover:border-[#C74225] transition-colors"
                          >
                            <Share2 className="h-3 w-3" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <h4 className="text-[#2C2C2C] mb-2">No festivals found</h4>
                  <p className="text-sm text-[#6B6B6B] mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedMonth("all");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <Card className="p-4 bg-white">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-0"
              />
            </Card>

            {/* Events on Selected Date */}
            {date && (
              <div className="mt-4">
                <h4 className="text-[#2C2C2C] mb-3 font-medium">
                  Events on {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h4>
                {festivals
                  .filter(f => {
                    const festDate = new Date(f.date);
                    return (
                      festDate.getDate() === date.getDate() &&
                      festDate.getMonth() === date.getMonth()
                    );
                  })
                  .map((festival) => (
                    <Card
                      key={festival.id}
                      className="p-3 mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                      onClick={() => onNavigate("festival-detail", festival)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${festival.color} rounded-full flex-shrink-0`}></div>
                        <div className="flex-1">
                          <div className="text-[#2C2C2C] font-medium mb-1">{festival.name}</div>
                          <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                            <Clock className="h-3 w-3" />
                            <span>{festival.muhurat}</span>
                          </div>
                        </div>
                        <Badge className="bg-[#C74225] text-white text-xs">
                          {festival.category}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                {festivals.filter(f => {
                  const festDate = new Date(f.date);
                  return (
                    festDate.getDate() === date.getDate() &&
                    festDate.getMonth() === date.getMonth()
                  );
                }).length === 0 && (
                  <Card className="p-6 text-center border border-gray-100">
                    <div className="text-2xl mb-2">📅</div>
                    <p className="text-sm text-[#6B6B6B]">No festivals on this date</p>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Educational Tip */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-white border-l-4 border-purple-500">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-purple-500 mt-0.5" />
            <div>
              <h4 className="text-[#2C2C2C] font-medium mb-1">Festival Tip</h4>
              <p className="text-sm text-[#6B6B6B]">
                Planning ahead? Set reminders for upcoming festivals to prepare puja items, 
                learn mantras, and understand rituals in advance.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
