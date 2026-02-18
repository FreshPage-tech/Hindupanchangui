import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  Bell, 
  Share2, 
  Play,
  BookOpen,
  Sparkles
} from "lucide-react";

interface FestivalDetailProps {
  onBack: () => void;
}

export function FestivalDetail({ onBack }: FestivalDetailProps) {
  const [reminderSet, setReminderSet] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-[#C74225]/10 to-white flex items-center justify-center">
          <div className="text-6xl">🪔</div>
        </div>

        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-[#2C2C2C]" />
        </button>

        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100"
        >
          <Share2 className="h-5 w-5 text-[#2C2C2C]" />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-[#C74225] text-white mb-2">
            Diwali 2025
          </Badge>
          <h1 className="text-[#2C2C2C] mb-2">Lakshmi Puja</h1>
          <div className="flex items-center gap-2 text-[#6B6B6B]">
            <Clock className="h-4 w-4 text-[#C74225]" />
            <span className="text-sm">Muhurat: 7:02 PM - 8:15 PM</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-[#6B6B6B] mb-1">Date</div>
            <div className="text-[#2C2C2C]">Nov 1</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-[#6B6B6B] mb-1">Tithi</div>
            <div className="text-[#2C2C2C]">Amavasya</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xs text-[#6B6B6B] mb-1">Duration</div>
            <div className="text-[#2C2C2C]">73 min</div>
          </div>
        </div>

        {/* Reminder Button */}
        <Button
          onClick={() => setReminderSet(!reminderSet)}
          className={`w-full ${
            reminderSet
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#C74225] hover:bg-[#C74225]/90"
          } text-white`}
        >
          <Bell className="h-4 w-4 mr-2" />
          {reminderSet ? "✓ Reminder Set" : "Set Reminder"}
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="puja">Puja Steps</TabsTrigger>
            <TabsTrigger value="mantras">Mantras</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4 mt-4">
            <Card className="p-4 border border-gray-100">
              <h3 className="text-[#2C2C2C] mb-3">About Lakshmi Puja</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">
                Lakshmi Puja is the main ritual of Diwali. It is performed to welcome Goddess Lakshmi into homes
                for prosperity and good fortune.
              </p>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                This auspicious puja is performed during the Pradosh Kaal, which occurs after sunset. The most
                favorable time is during the Sthir Lagna when Goddess Lakshmi is believed to descend to earth.
              </p>
            </Card>

            <Card className="p-4 border border-gray-100">
              <h4 className="text-[#2C2C2C] mb-3">Significance</h4>
              <ul className="space-y-2 text-sm text-[#6B6B6B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225] mt-1">•</span>
                  <span>Invites prosperity and wealth into the household</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225] mt-1">•</span>
                  <span>Marks the beginning of the Hindu New Year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225] mt-1">•</span>
                  <span>Celebrates victory of light over darkness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225] mt-1">•</span>
                  <span>Cleanses home and mind of negative energies</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="puja" className="space-y-3 mt-4">
            {[
              { step: 1, title: "Clean the Puja Space", desc: "Thoroughly clean the area where puja will be performed" },
              { step: 2, title: "Setup the Altar", desc: "Place idols of Lakshmi and Ganesha, light diyas" },
              { step: 3, title: "Ganesh Puja", desc: "Begin with worship of Lord Ganesha for obstacle removal" },
              { step: 4, title: "Lakshmi Invocation", desc: "Chant Lakshmi mantras and offer flowers, fruits" },
              { step: 5, title: "Aarti", desc: "Perform aarti with camphor and sing devotional songs" },
              { step: 6, title: "Prasad Distribution", desc: "Distribute blessed offerings to family members" },
            ].map((item) => (
              <Card key={item.step} className="p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#C74225] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#2C2C2C] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="mantras" className="space-y-3 mt-4">
            <Card className="p-4 border-l-4 border-[#C74225]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-[#2C2C2C] mb-2">Lakshmi Gayatri Mantra</h4>
                  <p className="text-[#2C2C2C] mb-3 leading-relaxed">
                    ॐ महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि।<br />
                    तन्नो लक्ष्मी प्रचोदयात्॥
                  </p>
                  <p className="text-sm text-[#6B6B6B] italic">
                    Om Mahalakshmyai Cha Vidmahe Vishnu Patnyai Cha Dhimahi.<br />
                    Tanno Lakshmi Prachodayat.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3 border-[#C74225] text-[#C74225]">
                <Play className="h-4 w-4 mr-2" />
                Play Audio
              </Button>
            </Card>

            <Card className="p-4 border-l-4 border-[#C74225]">
              <h4 className="text-[#2C2C2C] mb-2">Lakshmi Beej Mantra</h4>
              <p className="text-[#2C2C2C] mb-3">
                ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद।<br />
                ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः॥
              </p>
              <p className="text-sm text-[#6B6B6B] italic mb-3">
                Om Shreem Hreem Shreem Kamale Kamalaleye Praseed Praseed.<br />
                Om Shreem Hreem Shreem Mahalakshmyai Namah.
              </p>
              <Button variant="outline" className="w-full border-[#C74225] text-[#C74225]">
                <Play className="h-4 w-4 mr-2" />
                Play Audio
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Samagri Needed */}
        <Card className="p-4 border border-gray-100">
          <h4 className="text-[#2C2C2C] mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#C74225]" />
            Puja Samagri Needed
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {["Diyas", "Incense Sticks", "Flowers", "Fruits", "Sweets", "Kumkum", "Turmeric", "Rice"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <Sparkles className="h-3 w-3 text-[#C74225]" />
                <span className="text-[#6B6B6B]">{item}</span>
              </div>
            ))}
          </div>
          <Button 
            className="w-full mt-4 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            Shop Puja Items
          </Button>
        </Card>
      </div>
    </div>
  );
}
