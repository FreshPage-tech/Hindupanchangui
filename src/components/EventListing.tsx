import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Calendar, MapPin, Users, Filter } from "lucide-react";

interface EventListingProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function EventListing({ onNavigate }: EventListingProps) {
  const [activeTab, setActiveTab] = useState("all");

  const events = [
    {
      id: 1,
      title: "Diwali Utsav 2025",
      type: "utsav",
      date: "Nov 5, 2025",
      time: "5:00 PM - 9:00 PM",
      location: "Main Ground, Sector 18",
      attendees: 250,
      rsvpStatus: "pending",
      description: "Community Diwali celebration with cultural programs",
      image: "https://images.unsplash.com/photo-1572945015532-741f8c49a7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGV8ZW58MXx8fHwxNzYyMDQwODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Blood Donation Camp",
      type: "seva",
      date: "Nov 10, 2025",
      time: "8:00 AM - 2:00 PM",
      location: "City Hospital",
      attendees: 80,
      rsvpStatus: "confirmed",
      description: "Annual blood donation drive in collaboration with local hospitals",
      image: "https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJ8ZW58MXx8fHwxNzYyMDE0MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "Vijayadashami Celebration",
      type: "utsav",
      date: "Nov 15, 2025",
      time: "6:00 AM - 12:00 PM",
      location: "Regional Office Ground",
      attendees: 500,
      rsvpStatus: "pending",
      description: "Annual Vijayadashami festival with traditional ceremonies",
      image: "https://images.unsplash.com/photo-1572945015532-741f8c49a7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGV8ZW58MXx8fHwxNzYyMDQwODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      title: "Tree Plantation Drive",
      type: "seva",
      date: "Nov 20, 2025",
      time: "6:00 AM - 10:00 AM",
      location: "Green Valley Park",
      attendees: 120,
      rsvpStatus: "pending",
      description: "Plant 1000 trees initiative for environmental conservation",
      image: "https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJ8ZW58MXx8fHwxNzYyMDE0MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      title: "Youth Leadership Camp",
      type: "training",
      date: "Nov 25, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Training Center, Haridwar",
      attendees: 150,
      rsvpStatus: "pending",
      description: "3-day residential camp for young swayamsevaks",
      image: "https://images.unsplash.com/photo-1572945015532-741f8c49a7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGV8ZW58MXx8fHwxNzYyMDQwODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const filteredEvents = activeTab === "all"
    ? events
    : events.filter(e => e.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
        <h1 className="text-white mb-2">Events & Utsavs</h1>
        <p className="text-white/90">Upcoming activities and celebrations</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Tabs Filter */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="utsav">Utsavs</TabsTrigger>
            <TabsTrigger value="seva">Seva</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Event Cards */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border-l-4 border-[#C74225] cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate("eventDetails", event)}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    className={
                      event.type === "utsav"
                        ? "bg-purple-100 text-purple-700"
                        : event.type === "seva"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-[#C74225]" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-[#C74225]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-[#C74225]" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {event.rsvpStatus === "pending" ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("eventDetails", event);
                      }}
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                    >
                      RSVP Now
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("eventDetails", event);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      ✓ Confirmed
                    </Button>
                  )}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("eventDetails", event);
                    }}
                    variant="outline"
                    className="border-[#C74225] text-[#C74225]"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No events in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
