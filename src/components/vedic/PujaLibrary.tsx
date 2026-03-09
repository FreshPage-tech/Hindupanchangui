import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Search, BookOpen, Play, FileText, Headphones, Video, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface PujaLibraryProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export function PujaLibrary({ onBack, onNavigate }: PujaLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const pujaGuides = [
    {
      id: 1,
      name: "Lakshmi Puja",
      category: "deity",
      deity: "Goddess Lakshmi",
      duration: "45 min",
      difficulty: "Beginner",
      type: "video",
      image: "https://images.unsplash.com/photo-1709098275085-78e09efeaa1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMGRlaXR5JTIwZ29kZGVzcyUyMGxha3NobWl8ZW58MXx8fHwxNzYyMDQyMTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Complete Lakshmi Puja vidhi for Diwali and Friday worship",
    },
    {
      id: 2,
      name: "Ganesh Puja",
      category: "deity",
      deity: "Lord Ganesha",
      duration: "30 min",
      difficulty: "Beginner",
      type: "video",
      image: "https://images.unsplash.com/photo-1761485183056-9b2b914ceb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHB1amElMjBwcmF5ZXIlMjByaXR1YWx8ZW58MXx8fHwxNzYyMDQyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Remove obstacles with proper Ganesh Puja ritual",
    },
    {
      id: 3,
      name: "Satyanarayan Puja",
      category: "ritual",
      deity: "Lord Vishnu",
      duration: "90 min",
      difficulty: "Intermediate",
      type: "text",
      image: "https://images.unsplash.com/photo-1761485183056-9b2b914ceb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHB1amElMjBwcmF5ZXIlMjByaXR1YWx8ZW58MXx8fHwxNzYyMDQyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Complete Satyanarayan Katha and puja procedure",
    },
    {
      id: 4,
      name: "Durga Puja",
      category: "deity",
      deity: "Goddess Durga",
      duration: "60 min",
      difficulty: "Intermediate",
      type: "video",
      image: "https://images.unsplash.com/photo-1709098275085-78e09efeaa1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMGRlaXR5JTIwZ29kZGVzcyUyMGxha3NobWl8ZW58MXx8fHwxNzYyMDQyMTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Navratri Durga Puja with all nine forms",
    },
    {
      id: 5,
      name: "Shiva Abhishekam",
      category: "ritual",
      deity: "Lord Shiva",
      duration: "40 min",
      difficulty: "Beginner",
      type: "video",
      image: "https://images.unsplash.com/photo-1761485183056-9b2b914ceb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHB1amElMjBwcmF5ZXIlMjByaXR1YWx8ZW58MXx8fHwxNzYyMDQyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Sacred bathing ritual for Shiva Lingam",
    },
    {
      id: 6,
      name: "Hanuman Chalisa Path",
      category: "mantra",
      deity: "Lord Hanuman",
      duration: "15 min",
      difficulty: "Beginner",
      type: "audio",
      image: "https://images.unsplash.com/photo-1761485183056-9b2b914ceb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHB1amElMjBwcmF5ZXIlMjByaXR1YWx8ZW58MXx8fHwxNzYyMDQyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Complete Hanuman Chalisa with meaning",
    },
    {
      id: 7,
      name: "Griha Pravesh Puja",
      category: "ritual",
      deity: "Multiple Deities",
      duration: "120 min",
      difficulty: "Advanced",
      type: "text",
      image: "https://images.unsplash.com/photo-1757308530438-4e2340a6475f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGRpeWElMjBsYW1wfGVufDF8fHx8MTc2MjA0MjE3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "House warming ceremony complete procedure",
    },
    {
      id: 8,
      name: "Navgraha Shanti Puja",
      category: "ritual",
      deity: "Nine Planets",
      duration: "90 min",
      difficulty: "Advanced",
      type: "text",
      image: "https://images.unsplash.com/photo-1761485183056-9b2b914ceb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHB1amElMjBwcmF5ZXIlMjByaXR1YWx8ZW58MXx8fHwxNzYyMDQyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Pacify negative planetary effects",
    },
  ];

  const mantras = [
    {
      id: 1,
      name: "Gayatri Mantra",
      duration: "3:45",
      type: "audio",
      category: "Daily",
    },
    {
      id: 2,
      name: "Mahamrityunjaya Mantra",
      duration: "5:20",
      type: "audio",
      category: "Healing",
    },
    {
      id: 3,
      name: "Shri Suktam",
      duration: "12:30",
      type: "audio",
      category: "Prosperity",
    },
    {
      id: 4,
      name: "Vishnu Sahasranamam",
      duration: "45:00",
      type: "audio",
      category: "Daily",
    },
  ];

  const filteredPujas = searchQuery
    ? pujaGuides.filter(
        (puja) =>
          puja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          puja.deity.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pujaGuides;

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6">
        <h1 className="text-white mb-2">Puja Library</h1>
        <p className="text-[#FFD700]">Step-by-step Puja guides & Mantras</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6B6B6B]" />
          <Input
            type="text"
            placeholder="Search puja, deity, or mantra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Badge className="bg-white text-[#2C2C2C] border border-[#C74225] cursor-pointer whitespace-nowrap">
            All
          </Badge>
          <Badge className="bg-white text-[#2C2C2C] border border-gray-300 cursor-pointer whitespace-nowrap">
            Deity Puja
          </Badge>
          <Badge className="bg-white text-[#2C2C2C] border border-gray-300 cursor-pointer whitespace-nowrap">
            Rituals
          </Badge>
          <Badge className="bg-white text-[#2C2C2C] border border-gray-300 cursor-pointer whitespace-nowrap">
            Mantras
          </Badge>
          <Badge className="bg-white text-[#2C2C2C] border border-gray-300 cursor-pointer whitespace-nowrap">
            Beginner
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pujas" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="pujas">Puja Guides</TabsTrigger>
            <TabsTrigger value="mantras">Mantras</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="pujas" className="space-y-3 mt-4">
            {filteredPujas.map((puja) => (
              <Card
                key={puja.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate("festivalDetail")}
              >
                <div className="flex gap-3 p-3">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={puja.image}
                      alt={puja.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
                      {puja.type === "video" ? (
                        <Video className="h-5 w-5 text-white" />
                      ) : puja.type === "audio" ? (
                        <Headphones className="h-5 w-5 text-white" />
                      ) : (
                        <FileText className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-[#2C2C2C]">{puja.name}</h4>
                      <Badge
                        className={`text-xs ${
                          puja.difficulty === "Beginner"
                            ? "bg-[#357A38] text-white"
                            : puja.difficulty === "Intermediate"
                            ? "bg-[#FFD700] text-[#2C2C2C]"
                            : "bg-[#C74225] text-white"
                        }`}
                      >
                        {puja.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6B6B6B] mb-2 line-clamp-2">
                      {puja.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#6B6B6B]">
                      <span>{puja.deity}</span>
                      <span>•</span>
                      <span>{puja.duration}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="mantras" className="space-y-3 mt-4">
            {mantras.map((mantra) => (
              <Card
                key={mantra.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Headphones className="h-6 w-6 text-[#C74225]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#2C2C2C] mb-1">{mantra.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-[#6B6B6B]">
                      <span>{mantra.category}</span>
                      <span>•</span>
                      <span>{mantra.duration}</span>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-white" />
                  </button>
                </div>
              </Card>
            ))}

            {/* Featured Mantra Collection */}
            <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-white border border-[#FFD700]/30">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-[#C74225] mt-0.5" />
                <div>
                  <h4 className="text-[#2C2C2C] mb-2">Premium Mantra Collection</h4>
                  <p className="text-sm text-[#6B6B6B] mb-3">
                    Access 108+ sacred mantras with detailed meanings and pronunciations
                  </p>
                  <Badge className="bg-[#FFD700] text-[#2C2C2C] cursor-pointer">
                    Upgrade to Premium
                  </Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-3">
              {pujaGuides
                .filter((p) => p.type === "video")
                .map((puja) => (
                  <Card
                    key={puja.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-32">
                      <ImageWithFallback
                        src={puja.image}
                        alt={puja.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="h-5 w-5 text-[#C74225] ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-black/50 text-white text-xs">
                          {puja.duration}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-[#2C2C2C] text-sm mb-1 line-clamp-2">
                        {puja.name}
                      </h4>
                      <div className="text-xs text-[#6B6B6B]">{puja.deity}</div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Popular Collections */}
        <div>
          <h3 className="text-[#2C2C2C] mb-3">Popular Collections</h3>
          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-r from-orange-50 to-white border-l-4 border-[#C74225]">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-[#C74225]" />
                <div className="flex-1">
                  <h4 className="text-[#2C2C2C] mb-1">Daily Puja Collection</h4>
                  <p className="text-sm text-[#6B6B6B]">8 essential daily rituals</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-white border-l-4 border-[#FFD700]">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-[#FFD700]" />
                <div className="flex-1">
                  <h4 className="text-[#2C2C2C] mb-1">Festival Specials</h4>
                  <p className="text-sm text-[#6B6B6B]">15 major festival pujas</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-green-50 to-white border-l-4 border-[#357A38]">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-[#357A38]" />
                <div className="flex-1">
                  <h4 className="text-[#2C2C2C] mb-1">Beginner's Guide</h4>
                  <p className="text-sm text-[#6B6B6B]">Start your spiritual journey</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}