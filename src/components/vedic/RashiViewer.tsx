import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ArrowLeft, Star, Heart, Briefcase, DollarSign, Activity, Sparkles, TrendingUp, Calendar, Share2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { RASHI_LOCAL_DATA, RashiData } from "../../utils/rashi-local-data";
import { shareRashi, generateDeepLink } from "../../utils/deep-linking";

interface RashiViewerProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export function RashiViewer({ onNavigate, onBack }: RashiViewerProps) {
  const [allRashi, setAllRashi] = useState<RashiData[]>([]);
  const [selectedRashi, setSelectedRashi] = useState<RashiData | null>(null);
  const [selectedTab, setSelectedTab] = useState("today");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllRashi();
  }, []);

  const loadAllRashi = async () => {
    try {
      setLoading(true);
      // Use local data directly
      setAllRashi(RASHI_LOCAL_DATA);
    } catch (error) {
      console.error("Load Rashi error:", error);
      toast.error("Error loading Zodiac Signs");
    } finally {
      setLoading(false);
    }
  };

  const viewRashiDetails = async (rashiId: string) => {
    try {
      // Find Rashi from local data
      const rashi = RASHI_LOCAL_DATA.find(r => r.id === rashiId);
      
      if (rashi) {
        setSelectedRashi(rashi);
      } else {
        toast.error("Failed to load Rashi details");
      }
    } catch (error) {
      console.error("View Rashi error:", error);
      toast.error("Error loading Rashi details");
    }
  };

  // Grid view of all 12 Rashi
  if (!selectedRashi) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#C74225] via-[#B8391E] to-[#942D17] p-6 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mb-4 rounded-full text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-white text-2xl">All Zodiac Signs</h1>
                <p className="text-white/70 text-sm">12 Rashi</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-3">
              Discover your cosmic path through ancient Vedic wisdom
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground text-sm mt-4">Loading zodiac signs...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allRashi.map((rashi, index) => {
                // Zodiac symbols mapping
                const zodiacSymbols: { [key: string]: string } = {
                  'aries': '♈',
                  'taurus': '♉',
                  'gemini': '♊',
                  'cancer': '♋',
                  'leo': '♌',
                  'virgo': '♍',
                  'libra': '♎',
                  'scorpio': '♏',
                  'sagittarius': '♐',
                  'capricorn': '♑',
                  'aquarius': '♒',
                  'pisces': '♓'
                };
                
                // Element colors
                const elementColors: { [key: string]: { from: string; to: string; bg: string; text: string } } = {
                  'Fire': { from: 'from-red-500/20', to: 'to-orange-500/10', bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400' },
                  'Earth': { from: 'from-green-500/20', to: 'to-emerald-500/10', bg: 'bg-green-500/10', text: 'text-green-600 dark:text-green-400' },
                  'Air': { from: 'from-blue-500/20', to: 'to-cyan-500/10', bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
                  'Water': { from: 'from-purple-500/20', to: 'to-indigo-500/10', bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400' }
                };
                
                const symbol = zodiacSymbols[rashi.id] || '⭐';
                const elementColor = elementColors[rashi.element] || elementColors['Fire'];
                
                return (
                  <Card 
                    key={rashi.id} 
                    className="group overflow-hidden border border-border bg-card cursor-pointer hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    onClick={() => viewRashiDetails(rashi.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${elementColor.from} ${elementColor.to} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    <div className="relative p-4">
                      <div className="flex items-center gap-4">
                        {/* Zodiac Symbol */}
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${elementColor.from} ${elementColor.to} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-4xl">{symbol}</span>
                          {/* Animated ring */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <h3 className="text-foreground font-semibold text-lg">{rashi.name}</h3>
                              <p className="text-sm text-muted-foreground">{rashi.nameHindi}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <Star className="h-5 w-5 text-primary fill-primary group-hover:scale-125 transition-transform duration-300" />
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge variant="secondary" className={`text-xs ${elementColor.bg} ${elementColor.text} border-0`}>
                              {rashi.element}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{rashi.dates}</span>
                          </div>
                          
                          {/* Ruling Planet */}
                          <div className="mt-2 flex items-center gap-2">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span className="text-xs text-muted-foreground">Ruled by {rashi.rulingPlanet}</span>
                          </div>
                        </div>
                        
                        {/* Arrow indicator */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Detail view of selected Rashi
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedRashi(null)}
            className="rounded-full text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              const success = await shareRashi({
                id: selectedRashi.id,
                name: selectedRashi.name,
                nameHindi: selectedRashi.nameHindi,
                prediction: selectedRashi.todayPrediction
              });
              if (success) {
                toast.success("Rashi shared with deep link!");
              }
            }}
            className="rounded-full text-white hover:bg-white/20"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Zodiac Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-4xl">
              {(() => {
                const symbols: { [key: string]: string } = {
                  'aries': '♈', 'taurus': '♉', 'gemini': '♊', 'cancer': '♋',
                  'leo': '♌', 'virgo': '♍', 'libra': '♎', 'scorpio': '♏',
                  'sagittarius': '♐', 'capricorn': '♑', 'aquarius': '♒', 'pisces': '♓'
                };
                return symbols[selectedRashi.id] || '⭐';
              })()}
            </span>
          </div>
          <div>
            <h1 className="text-white mb-1">{selectedRashi.name}</h1>
            <p className="text-white/80">{selectedRashi.nameHindi}</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-xs text-white/70 mb-1">Element</p>
            <p className="text-white text-sm">{selectedRashi.element}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-xs text-white/70 mb-1">Ruling Planet</p>
            <p className="text-white text-sm">{selectedRashi.rulingPlanet}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-xs text-white/70 mb-1">Lucky Color</p>
            <p className="text-white text-sm">{selectedRashi.luckyColors?.[0] || 'N/A'}</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Date Range */}
        <Card className="p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Birth Period</p>
              <p className="text-foreground font-medium">{selectedRashi.dates}</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Weekly</TabsTrigger>
            <TabsTrigger value="month">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4 mt-4">
            {/* Today's Prediction */}
            <Card className="p-4 border-l-4 border-primary">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">Today's Forecast</h3>
                  <Badge className="bg-primary text-primary-foreground flex-shrink-0">
                    <Star className="h-3 w-3 mr-1" />
                    Good
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedRashi.todayPrediction}
                </p>
              </div>
            </Card>

            {/* Life Aspects */}
            <div>
              <h4 className="text-foreground font-medium mb-3">Life Aspects</h4>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <span className="text-sm text-foreground">Love</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                    <Star className="h-3 w-3 text-muted-foreground/30" />
                  </div>
                </Card>

                <Card className="p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                    </div>
                    <span className="text-sm text-foreground">Career</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                </Card>

                <Card className="p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-50 dark:bg-green-950/30 rounded-full flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-sm text-foreground">Finance</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                    {[1, 2].map((i) => (
                      <Star key={`empty-${i}`} className="h-3 w-3 text-muted-foreground/30" />
                    ))}
                  </div>
                </Card>

                <Card className="p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-50 dark:bg-purple-950/30 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-purple-500" />
                    </div>
                    <span className="text-sm text-foreground">Health</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                    <Star className="h-3 w-3 text-muted-foreground/30" />
                  </div>
                </Card>
              </div>
            </div>

            {/* Lucky Elements */}
            <Card className="p-4 bg-muted border border-border">
              <h4 className="text-foreground font-medium mb-3">Today's Lucky Elements</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Number</p>
                  <p className="text-primary font-medium">{selectedRashi.luckyNumbers?.[0] || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Color</p>
                  <p className="text-foreground font-medium">{selectedRashi.luckyColors?.[0] || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Day</p>
                  <p className="text-foreground font-medium">{selectedRashi.luckyDay}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-4 mt-4">
            <Card className="p-4 border-l-4 border-primary">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">Weekly Forecast</h3>
                  <Badge className="bg-primary text-primary-foreground flex-shrink-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Excellent
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedRashi.weeklyPrediction}
                </p>
              </div>
              <div className="space-y-2 text-sm mt-4">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Focus on communication and networking</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Financial opportunities may arise mid-week</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Health and wellness should be prioritized</span>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="month" className="space-y-4 mt-4">
            <Card className="p-4 border-l-4 border-primary">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-foreground font-medium">Monthly Overview</h3>
                  <Badge className="bg-primary text-primary-foreground flex-shrink-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Positive
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedRashi.monthlyPrediction}
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 mt-3">
                <p className="text-xs text-muted-foreground mb-2">Key Dates:</p>
                <div className="space-y-1 text-sm">
                  <p className="text-foreground">5th - 10th: Career opportunities</p>
                  <p className="text-foreground">15th - 20th: Relationship focus</p>
                  <p className="text-foreground">25th - 30th: Financial gains</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Personality Traits */}
        <Card className="p-4 border border-border">
          <h4 className="text-foreground font-medium mb-3">Personality Traits</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {selectedRashi.traits || "Individuals born under this sign are known for their unique qualities, strong determination, and ability to adapt to various situations. They possess natural leadership abilities and creative thinking."}
          </p>
        </Card>
      </div>
    </div>
  );
}