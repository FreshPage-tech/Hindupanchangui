import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ArrowLeft, Heart, Lock, Circle, Star } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ZodiacCompatibilityProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function ZodiacCompatibility({ onBack, onNavigate }: ZodiacCompatibilityProps) {
  const [step, setStep] = useState<"form" | "result">("form");
  const [formData, setFormData] = useState({
    person1Name: "",
    person1BirthDate: "",
    person1BirthTime: "",
    person1BirthPlace: "",
    person2Name: "",
    person2BirthDate: "",
    person2BirthTime: "",
    person2BirthPlace: "",
  });

  const handleCheckCompatibility = () => {
    if (
      !formData.person1Name ||
      !formData.person1BirthDate ||
      !formData.person2Name ||
      !formData.person2BirthDate
    ) {
      toast.error("Please fill required fields for both persons");
      return;
    }
    setStep("result");
    toast.success("Compatibility calculated!");
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
              <h1 className="text-[#2C2C2C]">Zodiac Compatibility</h1>
              <p className="text-sm text-[#6B6B6B]">Check relationship harmony</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Info Card */}
          <Card className="p-4 bg-gradient-to-br from-[#C74225]/5 to-white border border-[#C74225]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5 text-[#C74225]" />
              </div>
              <div>
                <h3 className="text-[#2C2C2C] mb-1">Vedic Compatibility Analysis</h3>
                <p className="text-sm text-[#6B6B6B]">
                  Analyze relationship compatibility based on planetary positions and Nakshatra matching.
                </p>
              </div>
            </div>
          </Card>

          {/* Person 1 Details */}
          <div>
            <h3 className="text-[#2C2C2C] mb-3">Person 1 Details</h3>
            <Card className="p-6 space-y-4 border border-gray-100">
              <div className="space-y-2">
                <Label htmlFor="person1Name" className="text-[#2C2C2C]">Name *</Label>
                <Input
                  id="person1Name"
                  placeholder="Enter name"
                  value={formData.person1Name}
                  onChange={(e) => setFormData({ ...formData, person1Name: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person1BirthDate" className="text-[#2C2C2C]">Birth Date *</Label>
                <Input
                  id="person1BirthDate"
                  type="date"
                  value={formData.person1BirthDate}
                  onChange={(e) => setFormData({ ...formData, person1BirthDate: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person1BirthTime" className="text-[#2C2C2C]">Birth Time (Optional)</Label>
                <Input
                  id="person1BirthTime"
                  type="time"
                  value={formData.person1BirthTime}
                  onChange={(e) => setFormData({ ...formData, person1BirthTime: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person1BirthPlace" className="text-[#2C2C2C]">Birth Place (Optional)</Label>
                <Input
                  id="person1BirthPlace"
                  placeholder="City, Country"
                  value={formData.person1BirthPlace}
                  onChange={(e) => setFormData({ ...formData, person1BirthPlace: e.target.value })}
                  className="border-gray-200"
                />
              </div>
            </Card>
          </div>

          {/* Person 2 Details */}
          <div>
            <h3 className="text-[#2C2C2C] mb-3">Person 2 Details</h3>
            <Card className="p-6 space-y-4 border border-gray-100">
              <div className="space-y-2">
                <Label htmlFor="person2Name" className="text-[#2C2C2C]">Name *</Label>
                <Input
                  id="person2Name"
                  placeholder="Enter name"
                  value={formData.person2Name}
                  onChange={(e) => setFormData({ ...formData, person2Name: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person2BirthDate" className="text-[#2C2C2C]">Birth Date *</Label>
                <Input
                  id="person2BirthDate"
                  type="date"
                  value={formData.person2BirthDate}
                  onChange={(e) => setFormData({ ...formData, person2BirthDate: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person2BirthTime" className="text-[#2C2C2C]">Birth Time (Optional)</Label>
                <Input
                  id="person2BirthTime"
                  type="time"
                  value={formData.person2BirthTime}
                  onChange={(e) => setFormData({ ...formData, person2BirthTime: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person2BirthPlace" className="text-[#2C2C2C]">Birth Place (Optional)</Label>
                <Input
                  id="person2BirthPlace"
                  placeholder="City, Country"
                  value={formData.person2BirthPlace}
                  onChange={(e) => setFormData({ ...formData, person2BirthPlace: e.target.value })}
                  className="border-gray-200"
                />
              </div>
            </Card>
          </div>

          <Button
            onClick={handleCheckCompatibility}
            className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white h-12"
          >
            <Heart className="h-5 w-5 mr-2" />
            Check Compatibility
          </Button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-[#2C2C2C]">Compatibility Report</h1>
            <p className="text-sm text-[#6B6B6B]">
              {formData.person1Name} & {formData.person2Name}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Overall Score */}
        <Card className="p-6 text-center border border-gray-100 bg-gradient-to-br from-[#C74225]/5 to-white">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white border-4 border-[#C74225] mb-4">
            <div>
              <div className="text-4xl text-[#C74225]">78%</div>
              <div className="text-xs text-[#6B6B6B]">Match</div>
            </div>
          </div>
          <h3 className="text-[#2C2C2C] mb-2">Good Compatibility!</h3>
          <p className="text-sm text-[#6B6B6B]">
            Your planetary alignments show positive harmony and strong potential for a lasting relationship.
          </p>
        </Card>

        {/* Free Compatibility Sections */}
        <Card className="p-4 border border-gray-100">
          <Badge className="bg-[#C74225] text-white mb-3">Free Analysis</Badge>
          <h3 className="text-[#2C2C2C] mb-3">Basic Compatibility</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#2C2C2C]">Emotional Connection</span>
                <span className="text-sm text-[#C74225]">85%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#C74225] h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#2C2C2C]">Communication</span>
                <span className="text-sm text-[#C74225]">72%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#C74225] h-2 rounded-full" style={{ width: "72%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#2C2C2C]">Overall Harmony</span>
                <span className="text-sm text-[#C74225]">78%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#C74225] h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Nakshatra Matching (Basic) */}
        <Card className="p-4 border border-gray-100">
          <h3 className="text-[#2C2C2C] mb-3">Nakshatra Analysis</h3>
          <div className="flex items-center justify-between mb-3">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#C74225]/10 rounded-full flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-[#C74225]" />
              </div>
              <p className="text-sm text-[#2C2C2C]">{formData.person1Name}</p>
              <p className="text-xs text-[#6B6B6B]">Rohini</p>
            </div>
            <Heart className="h-6 w-6 text-[#C74225]" />
            <div className="text-center">
              <div className="w-20 h-20 bg-[#C74225]/10 rounded-full flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-[#C74225]" />
              </div>
              <p className="text-sm text-[#2C2C2C]">{formData.person2Name}</p>
              <p className="text-xs text-[#6B6B6B]">Ashwini</p>
            </div>
          </div>
          <p className="text-sm text-[#6B6B6B] text-center">
            Your Nakshatras show natural harmony and mutual understanding.
          </p>
        </Card>

        {/* Strengths */}
        <Card className="p-4 border border-gray-100 bg-green-50/30">
          <h3 className="text-[#2C2C2C] mb-3">Relationship Strengths</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Circle className="h-2 w-2 text-green-600 mt-1.5 fill-current" />
              <p className="text-sm text-[#2C2C2C]">Strong emotional bond and understanding</p>
            </div>
            <div className="flex items-start gap-2">
              <Circle className="h-2 w-2 text-green-600 mt-1.5 fill-current" />
              <p className="text-sm text-[#2C2C2C]">Compatible life goals and values</p>
            </div>
            <div className="flex items-start gap-2">
              <Circle className="h-2 w-2 text-green-600 mt-1.5 fill-current" />
              <p className="text-sm text-[#2C2C2C]">Positive planetary alignment for longevity</p>
            </div>
          </div>
        </Card>

        {/* Premium Content */}
        <Card className="p-4 border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-white">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-5 w-5 text-[#D4AF37]" />
            <Badge className="bg-[#D4AF37] text-white">Premium Content</Badge>
          </div>
          <h3 className="text-[#2C2C2C] mb-3">Unlock Full Compatibility Report</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Marriage Potential Analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Areas of Growth & Challenges</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">36 Guna Milan Detailed Breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Mangal Dosha Analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 text-[#D4AF37] fill-current" />
              <p className="text-sm text-[#6B6B6B] blur-sm select-none">Personalized Relationship Advice</p>
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

        {/* One-time Purchase */}
        <Card className="p-4 border border-gray-100">
          <h3 className="text-[#2C2C2C] mb-2">One-Time Purchase</h3>
          <p className="text-sm text-[#6B6B6B] mb-3">
            Get your complete compatibility report as a PDF
          </p>
          <Button
            onClick={() => toast.success("Payment page coming soon")}
            variant="outline"
            className="w-full border-[#C74225] text-[#C74225] hover:bg-[#C74225]/5"
          >
            Buy Detailed Report - ₹199
          </Button>
        </Card>
      </div>
    </div>
  );
}
