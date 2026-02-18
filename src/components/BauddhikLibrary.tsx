import { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, BookOpen, Play, Volume2, FileText, Star, Clock } from "lucide-react";

interface BauddhikLibraryProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function BauddhikLibrary({ onNavigate }: BauddhikLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const audioContent = [
    {
      id: 1,
      title: "Prarthana & Stotra Collection",
      duration: "45 min",
      category: "Prayers",
      author: "Various",
      plays: 1200,
    },
    {
      id: 2,
      title: "Swami Vivekananda's Teachings",
      duration: "2 hrs",
      category: "Philosophy",
      author: "Swami Vivekananda",
      plays: 850,
    },
    {
      id: 3,
      title: "Bhagavad Gita Discourse",
      duration: "1 hr 30 min",
      category: "Scriptures",
      author: "Pandit Rajesh Sharma",
      plays: 2100,
    },
  ];

  const videoContent = [
    {
      id: 1,
      title: "History of RSS",
      duration: "25 min",
      category: "Documentary",
      views: 5400,
      thumbnail: "https://images.unsplash.com/photo-1572945015532-741f8c49a7b2?w=400",
    },
    {
      id: 2,
      title: "Yoga & Physical Training",
      duration: "40 min",
      category: "Training",
      views: 3200,
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    },
    {
      id: 3,
      title: "Cultural Heritage of Bharat",
      duration: "35 min",
      category: "Culture",
      views: 4100,
      thumbnail: "https://images.unsplash.com/photo-1572945015532-741f8c49a7b2?w=400",
    },
  ];

  const textContent = [
    {
      id: 1,
      title: "Bunch of Thoughts",
      author: "M.S. Golwalkar",
      category: "Philosophy",
      pages: 580,
      featured: true,
    },
    {
      id: 2,
      title: "Bauddhik Reader - Part 1",
      author: "RSS Publications",
      category: "Study Material",
      pages: 120,
      featured: false,
    },
    {
      id: 3,
      title: "Organiser Weekly",
      author: "Current Issue",
      category: "News",
      pages: 48,
      featured: true,
    },
    {
      id: 4,
      title: "Indian Culture & Heritage",
      author: "Various Authors",
      category: "Culture",
      pages: 320,
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
        <h1 className="text-white mb-2">Bauddhik Library</h1>
        <p className="text-white/90">Spiritual and cultural knowledge center</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Daily Subhashita Highlight */}
        <Card className="p-4 border-l-4 border-[#C74225] bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">
                Today's Subhashita
              </Badge>
              <p className="text-gray-700 mb-2">
                "आचारः प्रथमो धर्मः"
              </p>
              <p className="text-sm text-gray-600 italic mb-2">
                Good conduct is the first dharma (virtue).
              </p>
              <p className="text-xs text-[#C74225]">— Ancient Sanskrit Wisdom</p>
            </div>
          </div>
        </Card>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>

          {/* Audio Content */}
          <TabsContent value="all" className="space-y-4 mt-4">
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-[#C74225]" />
                Audio Collection
              </h3>
              <div className="space-y-3">
                {audioContent.slice(0, 2).map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#C74225]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Volume2 className="h-6 w-6 text-[#C74225]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 truncate">{item.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.duration}</span>
                          <span>•</span>
                          <span>{item.plays} plays</span>
                        </div>
                      </div>
                      <button className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0">
                        <Play className="h-5 w-5 text-white ml-0.5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <Play className="h-5 w-5 text-[#C74225]" />
                Video Library
              </h3>
              <div className="space-y-3">
                {videoContent.slice(0, 2).map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex gap-3">
                      <div className="w-32 h-24 bg-gray-200 flex-shrink-0 relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 p-3 min-w-0">
                        <h4 className="text-gray-900 truncate mb-1">{item.title}</h4>
                        <Badge className="bg-[#C74225]/10 text-[#C74225] mb-2">
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{item.duration}</span>
                          <span>•</span>
                          <span>{item.views} views</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#C74225]" />
                Reading Material
              </h3>
              <div className="space-y-3">
                {textContent.slice(0, 2).map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-16 bg-[#C74225]/10 rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-[#C74225]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-gray-900">{item.title}</h4>
                          {item.featured && (
                            <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{item.author}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#C74225]/10 text-[#C74225]">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{item.pages} pages</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-3 mt-4">
            {audioContent.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#C74225]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Volume2 className="h-6 w-6 text-[#C74225]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 truncate">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.author}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.plays} plays</span>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0">
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="video" className="space-y-3 mt-4">
            {videoContent.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex gap-3">
                  <div className="w-32 h-24 bg-gray-200 flex-shrink-0 relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 p-3 min-w-0">
                    <h4 className="text-gray-900 truncate mb-1">{item.title}</h4>
                    <Badge className="bg-[#C74225]/10 text-[#C74225] mb-2">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.views} views</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="text" className="space-y-3 mt-4">
            {textContent.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 bg-[#C74225]/10 rounded flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-[#C74225]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-gray-900">{item.title}</h4>
                      {item.featured && (
                        <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 fill-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.author}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#C74225]/10 text-[#C74225]">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{item.pages} pages</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
