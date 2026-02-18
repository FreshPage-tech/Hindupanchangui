import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle, Upload, Share2 } from "lucide-react";

interface EventDetailsProps {
  onBack: () => void;
  event: any;
}

export function EventDetails({ onBack, event }: EventDetailsProps) {
  const [rsvpStatus, setRsvpStatus] = useState(event?.rsvpStatus || "pending");
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Image */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img
            src={event?.image || "https://images.unsplash.com/photo-1572945015532-741f8c49a7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGV8ZW58MXx8fHwxNzYyMDQwODIzfDA&ixlib=rb-4.1.0&q=80&w=1080"}
            alt={event?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="h-5 w-5 text-gray-900" />
        </button>

        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Share2 className="h-5 w-5 text-gray-900" />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <Badge
            className={
              event?.type === "utsav"
                ? "bg-purple-100 text-purple-700 mb-2"
                : event?.type === "seva"
                ? "bg-green-100 text-green-700 mb-2"
                : "bg-blue-100 text-blue-700 mb-2"
            }
          >
            {event?.type?.charAt(0).toUpperCase() + event?.type?.slice(1)}
          </Badge>
          <h1 className="text-white">{event?.title || "Event Details"}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Event Info Card */}
        <Card className="p-4 border-l-4 border-[#C74225]">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-[#C74225] mt-1 flex-shrink-0" />
              <div>
                <div className="text-gray-900">{event?.date}</div>
                <div className="text-sm text-gray-600">{event?.time}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#C74225] mt-1 flex-shrink-0" />
              <div>
                <div className="text-gray-900">{event?.location}</div>
                <button className="text-sm text-[#C74225] underline">
                  View on Map
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-[#C74225] mt-1 flex-shrink-0" />
              <div>
                <div className="text-gray-900">{event?.attendees} people registered</div>
                <div className="text-sm text-gray-600">Join them!</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-4">
          <h3 className="mb-3">About This Event</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {event?.description}
          </p>
          <p className="text-gray-700 leading-relaxed">
            Join us for this meaningful gathering where we come together to celebrate our cultural heritage and strengthen community bonds. All swayamsevaks and their families are warmly invited to participate in this special occasion.
          </p>
        </Card>

        {/* Organizers */}
        <Card className="p-4">
          <h3 className="mb-4">Event Coordinators</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                <span className="text-[#C74225]">RK</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Shri Rajesh Kumar</h4>
                <p className="text-sm text-gray-600">Event Coordinator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                <span className="text-[#C74225]">PS</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Shri Pradeep Sharma</h4>
                <p className="text-sm text-gray-600">Logistics Head</p>
              </div>
            </div>
          </div>
        </Card>

        {/* What to Bring */}
        <Card className="p-4">
          <h3 className="mb-3">What to Bring</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Traditional attire recommended</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Water bottle and personal essentials</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Enthusiasm and positive energy</span>
            </li>
          </ul>
        </Card>

        {/* Photo Upload Section (Post Event) */}
        {showUpload && (
          <Card className="p-4">
            <h3 className="mb-3">Share Event Photos</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Upload event photos</p>
              <Button variant="outline" className="border-[#C74225] text-[#C74225]">
                Choose Files
              </Button>
            </div>
          </Card>
        )}

        {/* RSVP Button */}
        <div className="sticky bottom-20 pt-4">
          {rsvpStatus === "pending" ? (
            <Button
              onClick={() => setRsvpStatus("confirmed")}
              className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Confirm Attendance
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                disabled
                className="w-full bg-green-600 text-white cursor-not-allowed"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                ✓ You're Registered!
              </Button>
              <Button
                onClick={() => setRsvpStatus("pending")}
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-50"
              >
                Cancel Registration
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
