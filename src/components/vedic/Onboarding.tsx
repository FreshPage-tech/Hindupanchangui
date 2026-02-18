import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Flame, Globe, User, MapPin, Calendar } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<"language" | "profile">("language");
  const [language, setLanguage] = useState("english");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  const languages = [
    { id: "english", label: "English", native: "English" },
    { id: "hindi", label: "Hindi", native: "हिंदी" },
    { id: "tamil", label: "Tamil", native: "தமிழ்" },
    { id: "telugu", label: "Telugu", native: "తెలుగు" },
    { id: "marathi", label: "Marathi", native: "मराठी" },
    { id: "bengali", label: "Bengali", native: "বাংলা" },
  ];

  const handleLanguageSelect = () => {
    setStep("profile");
  };

  const handleComplete = () => {
    onComplete();
  };

  if (step === "language") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-[#C74225] rounded-full flex items-center justify-center mx-auto mb-6">
            <Flame className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-[#2C2C2C] mb-2">VedicTime</h1>
          <p className="text-[#6B6B6B]">Your Daily Spiritual Companion</p>
          <div className="mt-4 text-[#C74225] text-sm">
            ॐ
          </div>
        </div>

        {/* Language Selection */}
        <Card className="w-full max-w-md p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-[#C74225]" />
            <h2 className="text-[#2C2C2C]">Select Your Language</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  language === lang.id
                    ? "border-[#C74225] bg-[#C74225]/5"
                    : "border-gray-100 bg-white hover:border-[#C74225]/30"
                }`}
              >
                <div className="text-[#2C2C2C] mb-1">{lang.label}</div>
                <div className="text-sm text-[#6B6B6B]">{lang.native}</div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleLanguageSelect}
            className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            Continue
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C74225] via-[#C74225]/90 to-[#942D17] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-6 w-6 text-[#C74225]" />
          <h2 className="text-[#2C2C2C]">Create Your Profile</h2>
        </div>

        <p className="text-[#6B6B6B] text-sm mb-6">
          Enter your birth details for personalized astrology insights and accurate panchang
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="birthTime">Time of Birth</Label>
            <Input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="birthPlace">Place of Birth</Label>
            <Input
              id="birthPlace"
              placeholder="City, State"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleComplete}
            variant="outline"
            className="flex-1"
          >
            Skip for Now
          </Button>
          <Button
            onClick={handleComplete}
            disabled={!name || !birthDate}
            className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            Get Started
          </Button>
        </div>

        <p className="text-xs text-[#6B6B6B] text-center mt-4">
          Your data is secure and private. You can update this anytime in settings.
        </p>
      </Card>
    </div>
  );
}
