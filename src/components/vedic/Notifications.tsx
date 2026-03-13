import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, Bell, Sparkles, Calendar, Star, Clock } from "lucide-react";

interface NotificationsProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function Notifications({ onBack, onNavigate }: NotificationsProps) {
  const notifications = [
    {
      id: 1,
      type: "muhurat",
      title: "Abhijit Muhurat Starting Soon",
      message: "Most auspicious time starts in 30 minutes (11:52 AM - 12:40 PM)",
      time: "30 min ago",
      icon: Clock,
      iconColor: "text-[#FFD700]",
      bgColor: "from-yellow-50 to-white",
      unread: true,
    },
    {
      id: 2,
      type: "festival",
      title: "Tomorrow: Chhath Puja",
      message: "Prepare for the 4-day Sun worship festival. View complete guide.",
      time: "2 hours ago",
      icon: Calendar,
      iconColor: "text-orange-500",
      bgColor: "from-orange-50 to-white",
      unread: true,
    },
    {
      id: 3,
      type: "astrology",
      title: "Your Daily Horoscope",
      message: "Today brings positive energy. Check your personalized predictions.",
      time: "6 hours ago",
      icon: Star,
      iconColor: "text-[#C74225]",
      bgColor: "from-red-50 to-white",
      unread: true,
    },
    {
      id: 4,
      type: "panchang",
      title: "Rahu Kaal Alert",
      message: "Inauspicious period from 12:00 PM - 1:30 PM. Avoid new ventures.",
      time: "8 hours ago",
      icon: Bell,
      iconColor: "text-red-600",
      bgColor: "from-red-50 to-white",
      unread: false,
    },
    {
      id: 5,
      type: "special",
      title: "Today's Shloka",
      message: "ॐ सह नाववतु । सह नौ भुनक्तु - May we both be protected...",
      time: "1 day ago",
      icon: Sparkles,
      iconColor: "text-[#357A38]",
      bgColor: "from-green-50 to-white",
      unread: false,
    },
    {
      id: 6,
      type: "reminder",
      title: "Lakshmi Puja Reminder Set",
      message: "You'll be notified 1 hour before the muhurat (7:02 PM)",
      time: "1 day ago",
      icon: Bell,
      iconColor: "text-[#FFD700]",
      bgColor: "from-yellow-50 to-white",
      unread: false,
    },
    {
      id: 7,
      type: "festival",
      title: "Kartik Purnima Coming Up",
      message: "Full moon holy bath on Nov 12. Mark your calendar.",
      time: "2 days ago",
      icon: Calendar,
      iconColor: "text-blue-500",
      bgColor: "from-blue-50 to-white",
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-1">Notifications</h1>
            <p className="text-[#FFD700] text-sm">Stay updated with spiritual events</p>
          </div>
          <button className="text-sm text-[#FFD700]">
            Mark all read
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Today Section */}
        <div className="text-xs text-[#6B6B6B] mb-2">Today</div>
        {notifications
          .filter((n) => ["30 min ago", "2 hours ago", "6 hours ago", "8 hours ago"].includes(n.time))
          .map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden bg-gradient-to-r ${notification.bgColor}`}
                onClick={() => {
                  if (notification.type === "festival") {
                    onNavigate("festival-detail");
                  } else if (notification.type === "astrology") {
                    onNavigate("astrology");
                  } else if (notification.type === "panchang") {
                    onNavigate("panchang");
                  }
                }}
              >
                {notification.unread && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#C74225] rounded-full"></div>
                )}
                <div className="flex gap-3">
                  <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 ${notification.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#2C2C2C] mb-1">{notification.title}</h4>
                    <p className="text-sm text-[#6B6B6B] mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-[#6B6B6B]">{notification.time}</span>
                  </div>
                </div>
              </Card>
            );
          })}

        {/* Earlier Section */}
        <div className="text-xs text-[#6B6B6B] mb-2 mt-6">Earlier</div>
        {notifications
          .filter((n) => ["1 day ago", "2 days ago"].includes(n.time))
          .map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-r ${notification.bgColor}`}
                onClick={() => {
                  if (notification.type === "festival") {
                    onNavigate("festival-detail");
                  }
                }}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 ${notification.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#2C2C2C] mb-1">{notification.title}</h4>
                    <p className="text-sm text-[#6B6B6B] mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-[#6B6B6B]">{notification.time}</span>
                  </div>
                </div>
              </Card>
            );
          })}

        {/* Empty State for older notifications */}
        <Card className="p-6 text-center bg-white/50">
          <Bell className="h-12 w-12 text-[#6B6B6B]/30 mx-auto mb-3" />
          <p className="text-sm text-[#6B6B6B]">You're all caught up!</p>
          <p className="text-xs text-[#6B6B6B] mt-1">
            We'll notify you about upcoming festivals and auspicious timings
          </p>
        </Card>
      </div>
    </div>
  );
}