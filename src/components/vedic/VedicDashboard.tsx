import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Flame, Sun, Moon, Star, Calendar, Clock, AlertCircle, Sparkles, Bell, User, Share2, CheckCircle, Lock, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface VedicDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function VedicDashboard({ onNavigate }: VedicDashboardProps) {
  const [ritualCompleted, setRitualCompleted] = useState(false);
  const [streakDays, setStreakDays] = useState(7);
  const [muhuratReminderSet, setMuhuratReminderSet] = useState(false);
  const [festivalReminderSet, setFestivalReminderSet] = useState(false);
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleShareDailyGuidance = () => {
    toast.success("Spiritual guidance shared!");
  };

  const handleMarkRitualDone = () => {
    setRitualCompleted(true);
    setStreakDays(prev => prev + 1);
    toast.success("🎉 Ritual completed! Keep your streak going!");
  };

  const handleSetMuhuratReminder = () => {
    setMuhuratReminderSet(true);
    toast.success("🔔 Reminder set for Lakshmi Puja Muhurat at 7:02 PM");
  };

  const handleSetFestivalReminder = () => {
    setFestivalReminderSet(true);
    toast.success("🔔 Reminder set for Mahashivratri on March 10");
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Enhanced Header with Gradient Background */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#D4532B] rounded-b-3xl p-6 text-white mb-6">
        {/* Top Row: User Info & Notifications */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
              <span className="text-white font-medium">D</span>
            </div>
            
            {/* User Greeting */}
            <div>
              <h1 className="text-white text-lg font-normal mb-0.5">
                नमस्ते, Devotee 🙏
              </h1>
              <p className="text-white/90 text-sm">{today}</p>
            </div>
          </div>
          
          {/* Notification & Profile Icons */}
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate("notifications")}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative hover:bg-white/20 transition-colors"
            >
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute top-1 right-1 w-5 h-5 bg-[#FB2C36] rounded-full flex items-center justify-center text-xs font-medium">
                3
              </span>
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <User className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Daily Thought Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-6">
          <p className="text-white/90 text-xs mb-3 uppercase tracking-wide">Thought of the Day</p>
          
          {/* Sanskrit Text */}
          <p className="text-white text-base font-normal italic mb-3 leading-relaxed">
            वसुधैव कुटुम्बकम्
          </p>
          
          {/* English Translation */}
          <p className="text-white/80 text-sm leading-relaxed mb-2">
            The world is one family
          </p>
          
          {/* Source */}
          <p className="text-white/60 text-xs">
            — Maha Upanishad
          </p>
        </div>

        {/* Today's Panchang Summary - Now in Gradient */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Tithi</span>
            </div>
            <div className="text-white font-medium">Chaturdashi</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Nakshatra</span>
            </div>
            <div className="text-white font-medium">Rohini</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Sunrise</span>
            </div>
            <div className="text-white font-medium">6:24 AM</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Sunset</span>
            </div>
            <div className="text-white font-medium">5:47 PM</div>
          </div>
        </div>
      </div>

      {/* Main Content - White Background */}
      <div className="px-6 space-y-4">
        {/* Today's Muhurat Card with Buttons */}
        <Card className="p-4 border border-gray-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">Today's Muhurat</Badge>
              <h3 className="text-[#2C2C2C] mb-1">Lakshmi Puja Muhurat</h3>
              <p className="text-sm text-[#6B6B6B]">7:02 PM – 8:12 PM</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSetMuhuratReminder}
              disabled={muhuratReminderSet}
              className={`flex-1 ${
                muhuratReminderSet
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-[#C74225] hover:bg-[#C74225]/90"
              } text-white`}
            >
              {muhuratReminderSet ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Reminder Set
                </>
              ) : (
                "Set Reminder"
              )}
            </Button>
            <Button 
              onClick={() => toast.success("Muhurat details shared")}
              variant="outline" 
              className="border-gray-200"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Daily Spiritual Guidance Card (Shareable) */}
        <Card className="p-4 border border-gray-100 bg-gradient-to-br from-[#C74225]/5 to-white">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">Daily Guidance</Badge>
              <p className="text-[#2C2C2C] italic mb-2">
                "Act with patience today. Saturn rewards discipline and mindful effort."
              </p>
              <p className="text-xs text-[#6B6B6B]">Based on your planetary transits</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleShareDailyGuidance}
              className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share with Friends
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-200"
              onClick={() => toast.success("Guidance saved")}
            >
              Save
            </Button>
          </div>
        </Card>

        {/* Daily Ritual Card with Habit Builder */}
        <Card className={`p-4 border ${ritualCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-100'}`}>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Flame className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-[#C74225] text-white">Today's Ritual</Badge>
                {streakDays > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-[#C74225] font-medium">{streakDays}</span>
                    <span className="text-[#6B6B6B]">day streak 🔥</span>
                  </div>
                )}
              </div>
              {ritualCompleted ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>✨ You completed today's ritual!</span>
                </div>
              ) : (
                <>
                  <p className="text-[#2C2C2C] mb-2">
                    Light a diya before sunset and chant the Gayatri Mantra 3 times.
                  </p>
                  <p className="text-xs text-[#6B6B6B]">This practice brings peace and prosperity</p>
                </>
              )}
            </div>
          </div>
          {!ritualCompleted && (
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-white border border-gray-200 text-[#2C2C2C] hover:bg-gray-50"
                onClick={() => onNavigate("pujaLibrary")}
              >
                <Play className="h-4 w-4 mr-2" />
                Play Mantra
              </Button>
              <Button 
                onClick={handleMarkRitualDone}
                className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
              >
                Mark Done
              </Button>
            </div>
          )}
        </Card>

        {/* Festival Countdown Card */}
        <Card className="p-4 border border-gray-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#2C2C2C] mb-1">Mahashivratri in 4 Days</h3>
              <p className="text-sm text-[#6B6B6B]">March 10, 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSetFestivalReminder}
              disabled={festivalReminderSet}
              className={`flex-1 ${
                festivalReminderSet
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-[#C74225] hover:bg-[#C74225]/90"
              } text-white`}
            >
              {festivalReminderSet ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Reminder Set
                </>
              ) : (
                "Set Reminder"
              )}
            </Button>
            <Button 
              onClick={() => toast.success("Festival shared with family")}
              variant="outline" 
              className="flex-1 border-gray-200"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </Card>

        {/* Premium Astrology Insight Card */}
        <Card className="p-4 border border-[#C74225]/30 bg-gradient-to-br from-[#D4AF37]/10 to-white relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Badge className="bg-[#D4AF37] text-white">Premium</Badge>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#2C2C2C] mb-2">Your Weekly Insight</h3>
              <p className="text-sm text-[#2C2C2C] mb-2">
                "A positive shift in Jupiter may bring opportunities in relationships..."
              </p>
              <div className="relative">
                <div className="blur-sm select-none text-sm text-[#6B6B6B]">
                  This week focuses on career growth and financial stability. Your planetary...
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => onNavigate("premium")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
          >
            <Lock className="h-4 w-4 mr-2" />
            Unlock Full Insight
          </Button>
        </Card>

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
            onClick={() => onNavigate("complete-panchang")}
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
        onClick={() => onNavigate("complete-panchang")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#C74225] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-[#C74225]/90 transition-colors"
      >
        <Clock className="h-6 w-6" />
      </button>
    </div>
  );
}