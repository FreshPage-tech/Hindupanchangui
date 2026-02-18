import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Bell, Pin, Calendar, AlertCircle, Info, Megaphone } from "lucide-react";

interface AnnouncementsProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function Announcements({ onNavigate }: AnnouncementsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const announcements = [
    {
      id: 1,
      title: "Shakha Timings Change - November 2025",
      message: "Starting November 15th, morning shakha timings will be 6:30 AM to 7:30 AM due to winter season. Please make note of this change.",
      type: "shakha",
      priority: "high",
      pinned: true,
      date: "Nov 1, 2025",
      time: "9:00 AM",
      author: "Mukhya Shikshak",
      readStatus: false,
    },
    {
      id: 2,
      title: "Regional Meeting - All Coordinators",
      message: "Monthly coordination meeting scheduled for November 8th at Regional Office. All shakha coordinators are requested to attend.",
      type: "region",
      priority: "medium",
      pinned: true,
      date: "Oct 31, 2025",
      time: "3:30 PM",
      author: "Regional Coordinator",
      readStatus: false,
    },
    {
      id: 3,
      title: "Diwali Utsav - Volunteer Registration Open",
      message: "We need volunteers for the upcoming Diwali celebration. Please register if you can help with decoration, food arrangements, or cultural programs.",
      type: "shakha",
      priority: "medium",
      pinned: false,
      date: "Oct 30, 2025",
      time: "11:00 AM",
      author: "Event Committee",
      readStatus: true,
    },
    {
      id: 4,
      title: "Blood Donation Camp Update",
      message: "Great response! We have crossed 50 registrations for the blood donation camp. Target is 100 donors. Keep spreading the word.",
      type: "shakha",
      priority: "low",
      pinned: false,
      date: "Oct 29, 2025",
      time: "5:15 PM",
      author: "Seva Committee",
      readStatus: true,
    },
    {
      id: 5,
      title: "Important: Identity Card Distribution",
      message: "New identity cards will be distributed during this weekend's shakha. Please ensure your attendance to collect your card.",
      type: "shakha",
      priority: "high",
      pinned: false,
      date: "Oct 28, 2025",
      time: "2:00 PM",
      author: "Admin Office",
      readStatus: false,
    },
    {
      id: 6,
      title: "Regional Sports Tournament Announcement",
      message: "Annual sports tournament will be held in December. Interested participants can register with their respective shakha coordinators.",
      type: "region",
      priority: "medium",
      pinned: false,
      date: "Oct 27, 2025",
      time: "10:30 AM",
      author: "Sports Committee",
      readStatus: true,
    },
    {
      id: 7,
      title: "Library Books Available for Borrowing",
      message: "New collection of books on Indian culture and history now available. Visit the library during shakha hours to borrow.",
      type: "shakha",
      priority: "low",
      pinned: false,
      date: "Oct 26, 2025",
      time: "4:00 PM",
      author: "Library Committee",
      readStatus: true,
    },
  ];

  const filteredAnnouncements = activeTab === "all"
    ? announcements
    : announcements.filter(a => a.type === activeTab);

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4" />;
      case "medium":
        return <Info className="h-4 w-4" />;
      default:
        return <Megaphone className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white">Announcements</h1>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">3</span>
          </div>
        </div>
        <p className="text-white/90">Stay updated with latest news</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="shakha">Shakha</TabsTrigger>
            <TabsTrigger value="region">Regional</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Pin className="h-4 w-4 text-[#C74225]" />
              <span>Pinned</span>
            </div>
            
            {pinnedAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className={`p-4 border-l-4 border-[#C74225] ${
                  !announcement.readStatus ? "bg-orange-50" : ""
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <Pin className="h-5 w-5 text-[#C74225] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-gray-900 flex-1">{announcement.title}</h4>
                      {!announcement.readStatus && (
                        <div className="w-2 h-2 bg-[#C74225] rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {getPriorityIcon(announcement.priority)}
                        <span className="ml-1">{announcement.priority}</span>
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-700">
                        {announcement.type}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      {announcement.message}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{announcement.author}</span>
                      <span>{announcement.date} • {announcement.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Regular Announcements */}
        <div className="space-y-3">
          {pinnedAnnouncements.length > 0 && regularAnnouncements.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-6">
              <Bell className="h-4 w-4 text-[#C74225]" />
              <span>Recent</span>
            </div>
          )}
          
          {regularAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`p-4 ${
                !announcement.readStatus
                  ? "border-l-4 border-[#C74225] bg-orange-50"
                  : "border-l-4 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <Bell className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  !announcement.readStatus ? "text-[#C74225]" : "text-gray-400"
                }`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-gray-900 flex-1">{announcement.title}</h4>
                    {!announcement.readStatus && (
                      <div className="w-2 h-2 bg-[#C74225] rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {getPriorityIcon(announcement.priority)}
                      <span className="ml-1">{announcement.priority}</span>
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-700">
                      {announcement.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    {announcement.message}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{announcement.author}</span>
                    <span>{announcement.date} • {announcement.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No announcements in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
