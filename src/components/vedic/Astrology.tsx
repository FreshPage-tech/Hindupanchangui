import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Star, TrendingUp, Heart, Briefcase, DollarSign, Users, Lock, AlertCircle, Lightbulb, ChevronRight } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AstrologyProps {
  onNavigate: (screen: string) => void;
}

export function Astrology({ onNavigate }: AstrologyProps) {
  const [selectedTab, setSelectedTab] = useState("today");

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-gray-100">
        <h1 className="text-[#2C2C2C] mb-1">Your Horoscope</h1>
        <p className="text-[#6B6B6B]">Personalized Vedic Insights</p>

        {/* Zodiac Sign */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#6B6B6B] mb-1">Your Rashi</div>
              <div className="text-[#2C2C2C]">Vrishabha (Taurus)</div>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100">
              <span className="text-2xl">♉</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Awareness Card - Shani Sade Sati */}
        <Card className="p-4 border border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <Badge className="bg-orange-500 text-white mb-2">Current Phase</Badge>
              <h3 className="text-[#2C2C2C] mb-2">Shani Sade Sati Phase</h3>
              <p className="text-sm text-[#6B6B6B] mb-3">
                This period may bring challenges but also significant growth. Your karma and actions influence the outcome. Embrace patience and discipline.
              </p>
            </div>
          </div>
          <Button
            onClick={() => toast.success("Full article opened")}
            variant="outline"
            className="w-full border-gray-200"
          >
            Read More
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>

        {/* Did You Know? Card */}
        <Card className="p-4 border border-[#C74225]/20 bg-gradient-to-br from-[#C74225]/5 to-white">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">Did You Know?</Badge>
              <p className="text-sm text-[#2C2C2C] mb-1">
                People born under Rohini Nakshatra often have strong creativity and artistic talents.
              </p>
              <button
                onClick={() => onNavigate("premium")}
                className="text-sm text-[#C74225] hover:underline flex items-center gap-1 mt-2"
              >
                Unlock Full Insight
                <Lock className="h-3 w-3" />
              </button>
            </div>
          </div>
        </Card>

        {/* Advanced Tools */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            onClick={() => onNavigate("kundali")}
            className="p-4 border border-gray-100 cursor-pointer hover:border-[#C74225] transition-all"
          >
            <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center mb-3">
              <Star className="h-5 w-5 text-[#C74225]" />
            </div>
            <h4 className="text-[#2C2C2C] mb-1">Kundali</h4>
            <p className="text-xs text-[#6B6B6B]">Generate birth chart</p>
          </Card>

          <Card
            onClick={() => onNavigate("compatibility")}
            className="p-4 border border-gray-100 cursor-pointer hover:border-[#C74225] transition-all"
          >
            <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center mb-3">
              <Heart className="h-5 w-5 text-[#C74225]" />
            </div>
            <h4 className="text-[#2C2C2C] mb-1">Compatibility</h4>
            <p className="text-xs text-[#6B6B6B]">Check relationship</p>
          </Card>
        </div>

        {/* Date Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 mt-4">
            {/* Daily Prediction */}
            <Card className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#2C2C2C]">Today's Prediction</h3>
                <Badge className="bg-[#C74225] text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Favorable
                </Badge>
              </div>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Today brings excellent opportunities for personal growth and spiritual advancement. The planetary alignment 
                favors meditation and introspection. Your creative energies are at their peak.
              </p>
            </Card>

            {/* Life Aspects */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm text-[#2C2C2C]">Love</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-[#C74225] text-[#C74225]" />
                  ))}
                  <Star className="h-3 w-3 text-gray-300" />
                </div>
              </Card>

              <Card className="p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-sm text-[#2C2C2C]">Career</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-[#C74225] text-[#C74225]" />
                  ))}
                </div>
              </Card>

              <Card className="p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-sm text-[#2C2C2C]">Finance</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-[#C74225] text-[#C74225]" />
                  ))}
                  {[1, 2].map((i) => (
                    <Star key={i} className="h-3 w-3 text-gray-300" />
                  ))}
                </div>
              </Card>

              <Card className="p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-500" />
                  </div>
                  <span className="text-sm text-[#2C2C2C]">Social</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-[#C74225] text-[#C74225]" />
                  ))}
                  <Star className="h-3 w-3 text-gray-300" />
                </div>
              </Card>
            </div>

            {/* Lucky Elements */}
            <Card className="p-4 bg-gray-50 border border-gray-100">
              <h4 className="text-[#2C2C2C] mb-3">Lucky Elements</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-[#6B6B6B] mb-1">Color</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm text-[#2C2C2C]">Green</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#6B6B6B] mb-1">Number</div>
                  <div className="text-[#C74225]">6</div>
                </div>
                <div>
                  <div className="text-xs text-[#6B6B6B] mb-1">Time</div>
                  <div className="text-sm text-[#2C2C2C]">2-4 PM</div>
                </div>
              </div>
            </Card>

            {/* Remedies */}
            <Card className="p-4 border border-gray-100">
              <h4 className="text-[#2C2C2C] mb-3">Today's Remedies</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                  <span className="text-[#C74225] mt-0.5">•</span>
                  <span>Chant Hanuman Chalisa in the morning</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                  <span className="text-[#C74225] mt-0.5">•</span>
                  <span>Donate green vegetables to the needy</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                  <span className="text-[#C74225] mt-0.5">•</span>
                  <span>Wear silver jewelry for positive energy</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-4">
            <Card className="p-4 border-l-4 border-[#C74225]">
              <h3 className="text-[#2C2C2C] mb-3">This Week's Overview</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">
                The week ahead shows promising developments in professional matters. Mid-week brings favorable conditions 
                for important meetings and negotiations.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-[#6B6B6B]">Career opportunities expand</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-[#6B6B6B]">Relationships strengthen</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-[#6B6B6B]">Financial stability improves</span>
                </div>
              </div>
            </Card>

            {/* Premium Weekly Content */}
            <Card className="p-4 border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-white">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-[#D4AF37]" />
                <Badge className="bg-[#D4AF37] text-white">Premium</Badge>
              </div>
              <h4 className="text-[#2C2C2C] mb-2">Detailed Weekly Analysis</h4>
              <div className="relative mb-3">
                <p className="text-sm text-[#6B6B6B] blur-sm select-none">
                  Deep insights into career progression, financial planning, relationship dynamics, and health considerations for the week...
                </p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
              </div>
              <Button
                onClick={() => onNavigate("premium")}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
              >
                <Lock className="h-4 w-4 mr-2" />
                Unlock Weekly Report
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4 mt-4">
            <Card className="p-4 border-l-4 border-[#C74225]">
              <h3 className="text-[#2C2C2C] mb-3">Monthly Forecast</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                March 2026 marks a transformative period. Jupiter's transit brings growth opportunities while Saturn 
                teaches important life lessons. Focus on building lasting foundations.
              </p>
            </Card>

            {/* Premium Monthly Content */}
            <Card className="p-4 border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-white">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-[#D4AF37]" />
                <Badge className="bg-[#D4AF37] text-white">Premium</Badge>
              </div>
              <h4 className="text-[#2C2C2C] mb-2">Complete Monthly Guide</h4>
              <div className="relative mb-3">
                <p className="text-sm text-[#6B6B6B] blur-sm select-none">
                  Comprehensive month-by-month breakdown with planetary transits, important dates, career milestones, relationship opportunities...
                </p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
              </div>
              <Button
                onClick={() => onNavigate("premium")}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
              >
                <Lock className="h-4 w-4 mr-2" />
                Unlock Monthly Report
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA to Shop */}
        <Card className="p-4 text-center border border-gray-100">
          <h4 className="text-[#2C2C2C] mb-2">Need Puja Items?</h4>
          <p className="text-sm text-[#6B6B6B] mb-4">
            Get authentic puja samagri for your remedies
          </p>
          <Button
            onClick={() => onNavigate("shop")}
            className="bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            Visit Puja Shop
          </Button>
        </Card>
      </div>
    </div>
  );
}