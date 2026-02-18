import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Calendar, CheckCircle, XCircle, QrCode } from "lucide-react";

interface ShakhaDetailsProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export function ShakhaDetails({ onNavigate, onBack }: ShakhaDetailsProps) {
  const attendanceHistory = [
    { date: "Nov 1, 2025", status: "present", time: "6:05 AM" },
    { date: "Oct 31, 2025", status: "present", time: "6:02 AM" },
    { date: "Oct 30, 2025", status: "absent", time: "-" },
    { date: "Oct 29, 2025", status: "present", time: "6:08 AM" },
    { date: "Oct 28, 2025", status: "present", time: "6:01 AM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white mb-2">Shakha Details</h1>
        <p className="text-white/90">Sector 15 Morning Shakha</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Schedule */}
        <Card className="p-4">
          <h3 className="mb-4">Schedule</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-[#C74225]" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Days</h4>
                <p className="text-gray-600">Monday to Saturday</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-[#C74225]" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Time</h4>
                <p className="text-gray-600">6:00 AM - 7:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-[#C74225]" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Location</h4>
                <p className="text-gray-600 mb-2">Nehru Park, Sector 15, Noida</p>
                <button className="text-[#C74225] text-sm underline">
                  View on Map
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-[#C74225]" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Members</h4>
                <p className="text-gray-600">45 Active Swayamsevaks</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => onNavigate("attendance")}
            className="w-full mt-6 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Mark Today's Attendance
          </Button>
        </Card>

        {/* Attendance Stats */}
        <Card className="p-4">
          <h3 className="mb-4">Your Attendance</h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <div className="text-2xl text-[#C74225] mb-1">28</div>
              <div className="text-gray-600 text-sm">This Month</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center flex-1">
              <div className="text-2xl text-green-600 mb-1">93%</div>
              <div className="text-gray-600 text-sm">Rate</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center flex-1">
              <div className="text-2xl text-blue-600 mb-1">15</div>
              <div className="text-gray-600 text-sm">Streak</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#C74225]/10 to-[#C74225]/5 rounded-lg p-3 border border-[#C74225]/20">
            <p className="text-sm text-gray-700 text-center">
              🔥 Excellent dedication! Keep up the great work!
            </p>
          </div>
        </Card>

        {/* Recent Attendance History */}
        <Card className="p-4">
          <h3 className="mb-4">Recent Attendance</h3>
          
          <div className="space-y-2">
            {attendanceHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {record.status === "present" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <div className="text-gray-900">{record.date}</div>
                    {record.status === "present" && (
                      <div className="text-sm text-gray-600">{record.time}</div>
                    )}
                  </div>
                </div>
                <Badge
                  className={
                    record.status === "present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {record.status === "present" ? "Present" : "Absent"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Shakha Leaders */}
        <Card className="p-4">
          <h3 className="mb-4">Shakha Leaders</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                <span className="text-[#C74225]">SK</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Shri Suresh Karyakarta</h4>
                <p className="text-sm text-gray-600">Mukhya Shikshak</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                <span className="text-[#C74225]">AV</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Shri Anil Verma</h4>
                <p className="text-sm text-gray-600">Sahayak Shikshak</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
