import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ArrowLeft, Star, Lock, Download, Circle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface KundaliGeneratorProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function KundaliGenerator({ onBack, onNavigate }: KundaliGeneratorProps) {
  const [step, setStep] = useState<"form" | "result">("form");
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  });

  const handleGenerate = () => {
    if (!formData.name || !formData.birthDate || !formData.birthTime || !formData.birthPlace) {
      toast.error("Please fill all fields");
      return;
    }
    setStep("result");
    toast.success("Kundali generated successfully!");
  };

  if (step === "form") {
    return (
      <div className="min-h-screen bg-white pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-[#2C2C2C]" />
            </button>
            <div>
              <h1 className="text-[#2C2C2C]">Kundali Generator</h1>
              <p className="text-sm text-[#6B6B6B]">Generate your birth chart</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Info Card */}
          <Card className="p-4 bg-gradient-to-br from-[#C74225]/5 to-white border border-[#C74225]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="h-5 w-5 text-[#C74225]" />
              </div>
              <div>
                <h3 className="text-[#2C2C2C] mb-1">Your Vedic Birth Chart</h3>
                <p className="text-sm text-[#6B6B6B]">
                  Enter your birth details to generate a comprehensive Kundali with planetary positions, houses, and life insights.
                </p>
              </div>
            </div>
          </Card>

          {/* Form */}
          <Card className="p-6 space-y-5 border border-gray-100">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#2C2C2C]">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-[#2C2C2C]">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-[#2C2C2C]">Birth Time</Label>
              <Input
                id="birthTime"
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthPlace" className="text-[#2C2C2C]">Birth Place</Label>
              <Input
                id="birthPlace"
                placeholder="City, State, Country"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                className="border-gray-200"
              />
            </div>
          </Card>

          <Button
            onClick={handleGenerate}
            className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white h-12"
          >
            Generate Kundali
          </Button>

          {/* Features List */}
          <Card className="p-4 bg-gray-50 border-0">
            <h3 className="text-[#2C2C2C] mb-3">What you'll get:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Circle className="h-2 w-2 text-[#C74225] mt-1.5 fill-current" />
                <p className="text-sm text-[#6B6B6B]">Detailed birth chart wheel</p>
              </div>
              <div className="flex items-start gap-2">
                <Circle className="h-2 w-2 text-[#C74225] mt-1.5 fill-current" />
                <p className="text-sm text-[#6B6B6B]">Planetary positions in houses</p>
              </div>
              <div className="flex items-start gap-2">
                <Circle className="h-2 w-2 text-[#C74225] mt-1.5 fill-current" />
                <p className="text-sm text-[#6B6B6B]">Basic personality summary (Free)</p>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="h-3 w-3 text-[#D4AF37] mt-1" />
                <p className="text-sm text-[#6B6B6B]">Career guidance (Premium)</p>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="h-3 w-3 text-[#D4AF37] mt-1" />
                <p className="text-sm text-[#6B6B6B]">Marriage analysis (Premium)</p>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="h-3 w-3 text-[#D4AF37] mt-1" />
                <p className="text-sm text-[#6B6B6B]">Life cycle predictions (Premium)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-[#2C2C2C]" />
            </button>
            <div>
              <h1 className="text-[#2C2C2C]">Your Kundali</h1>
              <p className="text-sm text-[#6B6B6B]">{formData.name}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Download feature coming soon")}
            className="border-gray-200"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Birth Chart Wheel */}
        <Card className="p-6 border border-gray-100">
          <h3 className="text-[#2C2C2C] mb-4">Birth Chart</h3>
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            {/* Simple chart representation */}
            <div className="absolute inset-0 border-2 border-[#C74225] rotate-45">
              <div className="absolute inset-0 border border-[#C74225]">
                <div className="absolute top-0 left-0 right-0 bottom-1/2 border-r border-b border-[#C74225] flex items-center justify-center -rotate-45">
                  <span className="text-xs text-[#6B6B6B]">12</span>
                </div>
                <div className="absolute top-0 left-1/2 right-0 bottom-1/2 border-b border-[#C74225] flex items-center justify-center -rotate-45">
                  <span className="text-xs text-[#6B6B6B]">1</span>
                </div>
                <div className="absolute top-1/2 left-1/2 right-0 bottom-0 border-t border-[#C74225] flex items-center justify-center -rotate-45">
                  <span className="text-xs text-[#6B6B6B]">2</span>
                </div>
                <div className="absolute top-1/2 left-0 right-0 bottom-0 border-r border-t border-[#C74225] flex items-center justify-center -rotate-45">
                  <span className="text-xs text-[#6B6B6B]">3</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-[#6B6B6B] mt-4">
            Lagna: Aries • Rashi: Taurus
          </p>
        </Card>

        {/* Planetary Positions */}
        <Card className="p-4 border border-gray-100">
          <h3 className="text-[#2C2C2C] mb-3">Planetary Positions</h3>
          <div className="space-y-2">
            {[
              { planet: "Sun (सूर्य)", position: "Aries 15°", house: "1st House" },
              { planet: "Moon (चंद्र)", position: "Taurus 23°", house: "2nd House" },
              { planet: "Mars (मंगल)", position: "Gemini 8°", house: "3rd House" },
              { planet: "Mercury (बुध)", position: "Aries 20°", house: "1st House" },
              { planet: "Jupiter (गुरु)", position: "Sagittarius 12°", house: "9th House" },
              { planet: "Venus (शुक्र)", position: "Pisces 5°", house: "12th House" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-[#2C2C2C]">{item.planet}</p>
                  <p className="text-xs text-[#6B6B6B]">{item.house}</p>
                </div>
                <p className="text-sm text-[#C74225]">{item.position}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Basic Personality Summary (Free) */}
        <Card className="p-4 border border-gray-100">
          <Badge className="bg-[#C74225] text-white mb-3">Free Analysis</Badge>
          <h3 className="text-[#2C2C2C] mb-2">Basic Personality Summary</h3>
          <p className="text-sm text-[#6B6B6B] mb-3">
            With your Aries Lagna and strong Sun placement, you possess natural leadership qualities and a pioneering spirit. Your Taurus Moon brings stability and a practical approach to emotions.
          </p>
          <p className="text-sm text-[#6B6B6B]">
            Jupiter in the 9th house indicates strong fortune and wisdom. You may find success in teaching, philosophy, or spiritual pursuits.
          </p>
        </Card>

        {/* Premium Content Sections */}
        <Card className="p-4 border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-white">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-5 w-5 text-[#D4AF37]" />
            <Badge className="bg-[#D4AF37] text-white">Premium Content</Badge>
          </div>
          <h3 className="text-[#2C2C2C] mb-3">Unlock Full Kundali Report</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Career & Professional Life Analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Marriage & Relationship Compatibility</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Life Cycle Dasha Predictions</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Dosha Analysis & Remedies</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Health & Wellness Predictions</p>
            </div>
          </div>
          <Button
            onClick={() => onNavigate("premium")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
          >
            <Lock className="h-4 w-4 mr-2" />
            Unlock Full Report
          </Button>
        </Card>

        {/* Micro Purchase Option */}
        <Card className="p-4 border border-gray-100">
          <h3 className="text-[#2C2C2C] mb-2">One-Time Purchase</h3>
          <p className="text-sm text-[#6B6B6B] mb-3">
            Get your complete Kundali report as a downloadable PDF
          </p>
          <Button
            onClick={() => toast.success("Payment page coming soon")}
            variant="outline"
            className="w-full border-[#C74225] text-[#C74225] hover:bg-[#C74225]/5"
          >
            <Download className="h-4 w-4 mr-2" />
            Buy Detailed PDF Report - ₹299
          </Button>
        </Card>
      </div>
    </div>
  );
}
