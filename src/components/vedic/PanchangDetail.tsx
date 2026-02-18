import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ArrowLeft, Sun, Moon, Star, Clock, AlertTriangle, Info } from "lucide-react";
import { Badge } from "../ui/badge";

interface PanchangDetailProps {
  onBack: () => void;
}

export function PanchangDetail({ onBack }: PanchangDetailProps) {
  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white mb-2">Today's Panchang</h1>
        <p className="text-[#FFD700]">November 2, 2025 • Saturday</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Sun & Moon Timings */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-white">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="h-5 w-5 text-orange-500" />
              <h4 className="text-[#2C2C2C]">Sunrise</h4>
            </div>
            <div className="text-2xl text-[#C74225]">6:24 AM</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="h-5 w-5 text-blue-500" />
              <h4 className="text-[#2C2C2C]">Sunset</h4>
            </div>
            <div className="text-2xl text-[#C74225]">5:47 PM</div>
          </Card>
        </div>

        {/* Tabs for different elements */}
        <Tabs defaultValue="tithi" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="tithi">Tithi</TabsTrigger>
            <TabsTrigger value="nakshatra">Nakshatra</TabsTrigger>
            <TabsTrigger value="yoga">Yoga</TabsTrigger>
          </TabsList>

          <TabsContent value="tithi" className="space-y-3 mt-4">
            <Card className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[#2C2C2C] mb-1">Chaturdashi</h3>
                  <Badge className="bg-[#357A38] text-white">
                    14th Lunar Day
                  </Badge>
                </div>
                <Moon className="h-8 w-8 text-[#C74225]" />
              </div>
              <p className="text-sm text-[#6B6B6B] mb-3">
                Chaturdashi is the 14th lunar day in the Hindu calendar. It is considered highly auspicious for worship and spiritual practices.
              </p>
              <div className="bg-[#FFF8E7] rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#6B6B6B]">Starts</span>
                  <span className="text-[#2C2C2C]">Nov 2, 4:23 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B6B6B]">Ends</span>
                  <span className="text-[#2C2C2C]">Nov 3, 3:45 AM</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-white">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#C74225] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[#2C2C2C] mb-2">Significance</h4>
                  <ul className="text-sm text-[#6B6B6B] space-y-1 list-disc list-inside">
                    <li>Ideal for Shiva worship</li>
                    <li>Good for fasting and spiritual practices</li>
                    <li>Avoid mundane activities</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nakshatra" className="space-y-3 mt-4">
            <Card className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[#2C2C2C] mb-1">Rohini</h3>
                  <Badge className="bg-[#357A38] text-white">
                    4th Nakshatra
                  </Badge>
                </div>
                <Star className="h-8 w-8 text-[#FFD700]" />
              </div>
              <p className="text-sm text-[#6B6B6B] mb-3">
                Rohini is ruled by the Moon and symbolizes growth, fertility, and abundance. It is one of the most auspicious nakshatras.
              </p>
              <div className="bg-[#FFF8E7] rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#6B6B6B]">Deity</span>
                  <span className="text-[#2C2C2C]">Lord Brahma</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#6B6B6B]">Symbol</span>
                  <span className="text-[#2C2C2C]">Ox Cart</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B6B6B]">Element</span>
                  <span className="text-[#2C2C2C]">Earth</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-white">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#C74225] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[#2C2C2C] mb-2">Favorable For</h4>
                  <ul className="text-sm text-[#6B6B6B] space-y-1 list-disc list-inside">
                    <li>Marriage ceremonies</li>
                    <li>Business ventures</li>
                    <li>Purchasing property</li>
                    <li>Travel and relocation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="yoga" className="space-y-3 mt-4">
            <Card className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[#2C2C2C] mb-1">Siddha Yoga</h3>
                  <Badge className="bg-[#357A38] text-white">
                    Auspicious
                  </Badge>
                </div>
                <Star className="h-8 w-8 text-[#357A38]" />
              </div>
              <p className="text-sm text-[#6B6B6B] mb-3">
                Siddha Yoga is one of the most auspicious yogas. Activities started during this time are likely to be successful.
              </p>
              <div className="bg-[#FFF8E7] rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B6B6B]">Duration</span>
                  <span className="text-[#2C2C2C]">Full Day</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Inauspicious Timings */}
        <Card className="p-4 border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-[#2C2C2C] mb-3">Inauspicious Periods</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-sm text-[#2C2C2C]">Rahu Kaal</span>
                  <span className="text-sm text-red-600">12:00 PM - 1:30 PM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-sm text-[#2C2C2C]">Gulika Kaal</span>
                  <span className="text-sm text-red-600">9:00 AM - 10:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Auspicious Timings */}
        <Card className="p-4 border-l-4 border-[#357A38] bg-gradient-to-r from-green-50 to-white">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#357A38] mt-0.5" />
            <div className="flex-1">
              <h4 className="text-[#2C2C2C] mb-3">Auspicious Muhurat</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-sm text-[#2C2C2C]">Abhijit Muhurat</span>
                  <span className="text-sm text-[#357A38]">11:52 AM - 12:40 PM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-sm text-[#2C2C2C]">Brahma Muhurat</span>
                  <span className="text-sm text-[#357A38]">4:40 AM - 5:28 AM</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
