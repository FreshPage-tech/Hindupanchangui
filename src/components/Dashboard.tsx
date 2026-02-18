import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Clock, TrendingUp, Bell, QrCode, HandHeart } from "lucide-react";

interface DashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-white mb-1">Namaste, Swayamsevak</h1>
            <p className="text-white/90">Rajesh Kumar</p>
          </div>
          <button className="p-2 bg-white/20 rounded-full">
            <Bell className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white">28</div>
            <div className="text-white/90 text-sm">Attendance</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white">5</div>
            <div className="text-white/90 text-sm">Events</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white">12</div>
            <div className="text-white/90 text-sm">Seva Hours</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Daily Quote */}
        <Card className="p-4 border-l-4 border-[#C74225] bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white">॥</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः"
              </p>
              <p className="text-xs text-gray-500 italic">
                Truth alone triumphs, not falsehood. Through truth the divine path is spread.
              </p>
              <p className="text-xs text-[#C74225] mt-1">— Mundaka Upanishad</p>
            </div>
          </div>
        </Card>

        {/* Next Shakha */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#C74225]" />
              Next Shakha
            </h3>
            <Badge className="bg-green-100 text-green-700">Today</Badge>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>6:00 AM - 7:00 AM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Nehru Park, Sector 15</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => onNavigate("attendance")}
              className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
            <Button
              onClick={() => onNavigate("shakha")}
              variant="outline"
              className="flex-1 border-[#C74225] text-[#C74225]"
            >
              Details
            </Button>
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3>Upcoming Events</h3>
            <button
              onClick={() => onNavigate("events")}
              className="text-[#FF9933] text-sm"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[#C74225]">05</span>
                <span className="text-[#C74225] text-xs">NOV</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Diwali Utsav</h4>
                <p className="text-sm text-gray-600">Community celebration at Main Ground</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[#C74225]">10</span>
                <span className="text-[#C74225] text-xs">NOV</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Blood Donation Camp</h4>
                <p className="text-sm text-gray-600">Seva Drive at City Hospital</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate("seva")}
            variant="outline"
            className="h-20 flex flex-col gap-2 border-[#C74225] text-[#C74225]"
          >
            <HandHeart className="h-6 w-6" />
            <span>Seva Projects</span>
          </Button>
          <Button
            onClick={() => onNavigate("donate")}
            variant="outline"
            className="h-20 flex flex-col gap-2 border-[#C74225] text-[#C74225]"
          >
            <TrendingUp className="h-6 w-6" />
            <span>Guru Dakshina</span>
          </Button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => onNavigate("attendance")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#C74225] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-[#C74225]/90 transition-colors"
      >
        <QrCode className="h-6 w-6" />
      </button>
    </div>
  );
}
