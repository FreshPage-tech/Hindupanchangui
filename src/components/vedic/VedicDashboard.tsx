import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Flame, Sun, Moon, Star, Calendar, Clock, AlertCircle, Sparkles, Bell, User } from "lucide-react";

interface VedicDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function VedicDashboard({ onNavigate }: VedicDashboardProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[#2C2C2C] mb-1">Namaste 🙏</h1>
            <p className="text-[#6B6B6B] text-sm">{today}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("notifications")}
              className="w-10 h-10 rounded-full flex items-center justify-center relative hover:bg-gray-50 transition-colors"
            >
              <Bell className="h-5 w-5 text-[#2C2C2C]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#C74225] rounded-full"></span>
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <User className="h-5 w-5 text-[#2C2C2C]" />
            </button>
          </div>
        </div>

        {/* Today's Panchang Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="h-4 w-4 text-[#C74225]" />
              <span className="text-xs text-[#6B6B6B]">Tithi</span>
            </div>
            <div className="text-[#2C2C2C]">Chaturdashi</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-[#C74225]" />
              <span className="text-xs text-[#6B6B6B]">Nakshatra</span>
            </div>
            <div className="text-[#2C2C2C]">Rohini</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-4 w-4 text-[#C74225]" />
              <span className="text-xs text-[#6B6B6B]">Sunrise</span>
            </div>
            <div className="text-[#2C2C2C]">6:24 AM</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="h-4 w-4 text-[#C74225]" />
              <span className="text-xs text-[#6B6B6B]">Sunset</span>
            </div>
            <div className="text-[#2C2C2C]">5:47 PM</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Today's Special Event */}
        <Card 
          className="overflow-hidden border border-gray-100 cursor-pointer hover:border-[#C74225] transition-all"
          onClick={() => onNavigate("festivalDetail")}
        >
          <div className="h-40 bg-gradient-to-br from-[#C74225]/10 to-white flex items-center justify-center">
            <Flame className="h-16 w-16 text-[#C74225]" />
          </div>
          <div className="p-4">
            <Badge className="bg-[#C74225] text-white mb-2">Today</Badge>
            <h3 className="text-[#2C2C2C] mb-1">Lakshmi Puja</h3>
            <p className="text-sm text-[#6B6B6B] mb-3">
              Diwali 2025 - Main Puja Ritual
            </p>
            <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              <Clock className="h-4 w-4 text-[#C74225]" />
              <span>Muhurat: 7:02 PM - 8:15 PM</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate("completePanchang")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Panchang</span>
          </button>

          <button
            onClick={() => onNavigate("astrology")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Star className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Horoscope</span>
          </button>

          <button
            onClick={() => onNavigate("calendar")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Festivals</span>
          </button>

          <button
            onClick={() => onNavigate("shop")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Flame className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Puja Shop</span>
          </button>
        </div>

        {/* Upcoming Festivals */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#2C2C2C]">Upcoming Festivals</h3>
            <button 
              onClick={() => onNavigate("calendar")}
              className="text-sm text-[#C74225] hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-2">
            {[
              { name: "Kartik Purnima", date: "Nov 15", category: "Vrat" },
              { name: "Guru Nanak Jayanti", date: "Nov 16", category: "Jayanti" },
              { name: "Vivah Panchami", date: "Nov 21", category: "Festival" },
            ].map((festival, index) => (
              <Card 
                key={index}
                className="p-3 cursor-pointer border border-gray-100 hover:border-[#C74225] transition-all"
                onClick={() => onNavigate("festivalDetail")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#2C2C2C] mb-1">{festival.name}</div>
                    <div className="text-sm text-[#6B6B6B]">{festival.date}</div>
                  </div>
                  <Badge variant="outline" className="border-[#C74225] text-[#C74225]">
                    {festival.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Shloka */}
        <Card className="p-4 border-l-4 border-[#C74225] bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">ॐ</span>
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">
                Today's Shloka
              </Badge>
              <p className="text-[#2C2C2C] mb-2">
                "ॐ सह नाववतु । सह नौ भुनक्तु ।"
              </p>
              <p className="text-sm text-[#6B6B6B] italic mb-2">
                May we both be protected. May we both be nourished.
              </p>
              <p className="text-xs text-[#C74225]">— Taittiriya Upanishad</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Muhurat Button */}
      <button
        onClick={() => onNavigate("completePanchang")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#C74225] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-[#C74225]/90 transition-colors"
      >
        <Clock className="h-6 w-6" />
      </button>
    </div>
  );
}
