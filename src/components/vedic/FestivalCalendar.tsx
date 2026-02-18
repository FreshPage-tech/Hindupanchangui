import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ArrowLeft, Calendar, Clock, MapPin, Plus, Filter } from "lucide-react";
import { Button } from "../ui/button";

interface FestivalCalendarProps {
  onBack: () => void;
  onViewFestival: (festivalId: number) => void;
}

export function FestivalCalendar({ onBack, onViewFestival }: FestivalCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>("november");

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
    },
  ];

  const upcomingFestivals = festivals.filter(f => new Date(f.date) >= new Date()).slice(0, 10);

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white mb-2">Festival Calendar</h1>
        <p className="text-[#FFD700]">Upcoming Hindu Festivals & Events</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center bg-gradient-to-br from-[#FFD700]/20 to-white">
            <div className="text-2xl text-[#C74225] mb-1">12</div>
            <div className="text-xs text-[#6B6B6B]">This Month</div>
          </Card>
          <Card className="p-3 text-center bg-gradient-to-br from-[#357A38]/20 to-white">
            <div className="text-2xl text-[#357A38] mb-1">8</div>
            <div className="text-xs text-[#6B6B6B]">Major Festivals</div>
          </Card>
          <Card className="p-3 text-center bg-gradient-to-br from-[#C74225]/20 to-white">
            <div className="text-2xl text-[#C74225] mb-1">2</div>
            <div className="text-xs text-[#6B6B6B]">Today</div>
          </Card>
        </div>

        {/* Calendar View Toggle */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-3 mt-4">
            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge className="bg-white text-[#2C2C2C] border border-[#C74225] cursor-pointer">
                All
              </Badge>
              <Badge className="bg-[#FFD700] text-[#2C2C2C] cursor-pointer">
                Major Festivals
              </Badge>
              <Badge className="bg-white text-[#2C2C2C] border border-gray-300 cursor-pointer">
                Vrat & Fasting
              </Badge>
              <Badge className="bg-white text-[#2C2C2C] border border-gray-300 cursor-pointer">
                Regional
              </Badge>
            </div>

            {/* Festivals List */}
            <div className="space-y-3">
              {upcomingFestivals.map((festival) => (
                <Card
                  key={festival.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onViewFestival(festival.id)}
                >
                  <div className={`h-1 ${festival.color}`}></div>
                  <div className="p-4">
                    <div className="flex gap-3">
                      <div className={`w-14 h-14 ${festival.color} rounded-lg flex flex-col items-center justify-center flex-shrink-0 text-white`}>
                        <span className="text-lg">
                          {new Date(festival.date).getDate()}
                        </span>
                        <span className="text-xs">
                          {new Date(festival.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-[#2C2C2C]">{festival.name}</h4>
                          {festival.category === "major" && (
                            <Badge className="bg-[#C74225] text-white text-xs">
                              Major
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#6B6B6B] mb-2">
                          {festival.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                          <Clock className="h-3 w-3" />
                          <span>{festival.muhurat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <Card className="p-4">
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
                <h4 className="text-[#2C2C2C] mb-3">
                  Events on {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
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
                      className="p-3 mb-3 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onViewFestival(festival.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${festival.color} rounded-full`}></div>
                        <div className="flex-1">
                          <div className="text-[#2C2C2C] mb-1">{festival.name}</div>
                          <div className="text-xs text-[#6B6B6B]">{festival.muhurat}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Month Navigation */}
        <Card className="p-4">
          <h4 className="text-[#2C2C2C] mb-3">Browse by Month</h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              "November", "December", "January",
              "February", "March", "April",
              "May", "June", "July"
            ].map((month) => (
              <button
                key={month}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedMonth === month.toLowerCase()
                    ? "bg-[#C74225] text-white border-[#C74225]"
                    : "bg-white text-[#2C2C2C] border-gray-200 hover:border-[#C74225]"
                }`}
                onClick={() => setSelectedMonth(month.toLowerCase())}
              >
                <div className="text-sm">{month}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Add to Personal Calendar */}
        <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-white border border-[#FFD700]/30">
          <div className="flex items-start gap-3">
            <Plus className="h-5 w-5 text-[#C74225] mt-0.5" />
            <div className="flex-1">
              <h4 className="text-[#2C2C2C] mb-2">Sync with Your Calendar</h4>
              <p className="text-sm text-[#6B6B6B] mb-3">
                Export all festivals to Google Calendar, Apple Calendar, or Outlook
              </p>
              <Button
                variant="outline"
                className="border-[#C74225] text-[#C74225]"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Export Calendar
              </Button>
            </div>
          </div>
        </Card>

        {/* Regional Festivals */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[#2C2C2C]">Regional Festivals</h4>
            <button className="text-sm text-[#C74225]">
              <Filter className="h-4 w-4 inline mr-1" />
              Select Region
            </button>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Customize your calendar to show festivals specific to your region (North, South, East, West India)
          </p>
        </Card>
      </div>
    </div>
  );
}
