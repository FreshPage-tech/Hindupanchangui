import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Star, TrendingUp, Heart, Briefcase, DollarSign, Users, Lock, AlertCircle, Lightbulb, ChevronRight, Sparkles } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { RashiViewer } from "./RashiViewer";
import { ArrowLeft } from "lucide-react";

interface AstrologyProps {
  onNavigate: (screen: string) => void;
}

export function Astrology({ onNavigate }: AstrologyProps) {
  const [selectedTab, setSelectedTab] = useState("today");
  const [showRashiViewer, setShowRashiViewer] = useState(false);
  const [showSadeSatiArticle, setShowSadeSatiArticle] = useState(false);

  if (showRashiViewer) {
    return (
      <RashiViewer
        onNavigate={onNavigate}
        onBack={() => setShowRashiViewer(false)}
      />
    );
  }

  if (showSadeSatiArticle) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSadeSatiArticle(false)}
            className="mb-4 rounded-full text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Shani Sade Sati</h1>
              <p className="text-white/80 text-sm">Understanding Saturn's Transit</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-4 space-y-4">
          {/* Current Status */}
          <Card className="p-4 border-l-4 border-orange-500 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-card">
            <Badge className="bg-orange-500 text-white mb-3">Current Phase</Badge>
            <h3 className="text-foreground font-medium mb-2">You are in Sade Sati Period</h3>
            <p className="text-sm text-muted-foreground">
              Based on your birth chart, you are currently experiencing the Shani Sade Sati phase. This is a significant 7.5-year period that occurs when Saturn transits through the 12th, 1st, and 2nd houses from your Moon sign.
            </p>
          </Card>

          {/* What is Sade Sati */}
          <Card className="p-4">
            <h3 className="text-foreground font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              What is Shani Sade Sati?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Sade Sati is a Sanskrit term meaning "seven and a half." It refers to the seven-and-a-half-year period during which Saturn (Shani) transits through three zodiac signs - the sign before your Moon sign, your Moon sign itself, and the sign after your Moon sign.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This period is considered one of the most significant planetary transits in Vedic astrology, known for bringing major life changes, lessons, and transformation.
            </p>
          </Card>

          {/* Three Phases */}
          <Card className="p-4">
            <h3 className="text-foreground font-medium mb-3">The Three Phases</h3>
            <div className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-xs font-medium text-orange-600 dark:text-orange-400">1</div>
                  <h4 className="text-foreground font-medium text-sm">Rising Phase (2.5 years)</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Saturn transits the 12th house from your Moon. This phase may bring expenses, foreign travel, and spiritual awakening. Mental stress may increase.
                </p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-xs font-medium text-orange-600 dark:text-orange-400">2</div>
                  <h4 className="text-foreground font-medium text-sm">Peak Phase (2.5 years)</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Saturn transits directly over your Moon sign. This is the most intense phase, bringing maximum challenges, career changes, and personal transformation.
                </p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-xs font-medium text-orange-600 dark:text-orange-400">3</div>
                  <h4 className="text-foreground font-medium text-sm">Setting Phase (2.5 years)</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Saturn transits the 2nd house from your Moon. This phase brings gradual relief, financial considerations, and family matters to focus.
                </p>
              </div>
            </div>
          </Card>

          {/* Effects */}
          <Card className="p-4">
            <h3 className="text-foreground font-medium mb-3">Common Effects</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-muted-foreground">Career challenges and changes in professional life</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-muted-foreground">Increased responsibilities and burdens</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-muted-foreground">Health issues requiring attention</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-muted-foreground">Delays in important matters</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-muted-foreground">Relationship challenges and conflicts</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-muted-foreground">Financial constraints and unexpected expenses</span>
              </div>
            </div>
          </Card>

          {/* Positive Aspects */}
          <Card className="p-4 border-l-4 border-green-500">
            <h3 className="text-foreground font-medium mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-500" />
              Positive Aspects
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-muted-foreground">Spiritual growth and self-realization</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-muted-foreground">Development of patience and discipline</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-muted-foreground">Life lessons that lead to maturity</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-muted-foreground">Karmic cleansing and resolution</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-muted-foreground">Stronger foundation for future success</span>
              </div>
            </div>
          </Card>

          {/* Remedies */}
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-card">
            <h3 className="text-foreground font-medium mb-3">Recommended Remedies</h3>
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-3">
                <h4 className="text-foreground text-sm font-medium mb-1">Mantra Chanting</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Recite "Om Sham Shanicharaya Namah" 108 times daily, especially on Saturdays.
                </p>
              </div>

              <div className="bg-background rounded-lg p-3">
                <h4 className="text-foreground text-sm font-medium mb-1">Charitable Acts</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Donate black sesame seeds, black clothes, or iron items to the needy on Saturdays.
                </p>
              </div>

              <div className="bg-background rounded-lg p-3">
                <h4 className="text-foreground text-sm font-medium mb-1">Worship & Offerings</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Offer mustard oil lamps to Lord Hanuman and Lord Shani on Saturdays.
                </p>
              </div>

              <div className="bg-background rounded-lg p-3">
                <h4 className="text-foreground text-sm font-medium mb-1">Gemstone</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Wear Blue Sapphire (Neelam) only after consulting an expert astrologer.
                </p>
              </div>

              <div className="bg-background rounded-lg p-3">
                <h4 className="text-foreground text-sm font-medium mb-1">Lifestyle Changes</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Practice patience, help the elderly, serve workers, and maintain discipline.
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="p-4 text-center border border-border">
            <h4 className="text-foreground font-medium mb-2">Need Guidance?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get personalized remedies and consultation for your Sade Sati period
            </p>
            <Button
              onClick={() => {
                setShowSadeSatiArticle(false);
                onNavigate("premium");
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Talk to Astrologer
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card p-6 border-b border-border">
        <h1 className="text-foreground mb-1">Your Horoscope</h1>
        <p className="text-muted-foreground">Personalized Vedic Insights</p>

        {/* Zodiac Sign */}
        <div className="mt-4 bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Your Rashi</div>
              <div className="text-foreground">Vrishabha (Taurus)</div>
            </div>
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
              <span className="text-2xl">♉</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* View All Rashi Card */}
        <Card 
          onClick={() => setShowRashiViewer(true)}
          className="p-4 border border-primary/30 bg-gradient-to-br from-primary/10 to-card cursor-pointer hover:border-primary hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-foreground font-medium mb-1">View All Zodiac Signs</h3>
              <p className="text-sm text-muted-foreground">
                Explore all 12 Rashi with detailed predictions & guidance
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-primary" />
          </div>
        </Card>

        {/* Awareness Card - Shani Sade Sati */}
        <Card className="p-4 border border-orange-200 dark:border-orange-900/30 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-card">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <Badge className="bg-orange-500 text-white mb-2">Current Phase</Badge>
              <h3 className="text-foreground mb-2">Shani Sade Sati Phase</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This period may bring challenges but also significant growth. Your karma and actions influence the outcome. Embrace patience and discipline.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowSadeSatiArticle(true)}
            variant="outline"
            className="w-full border-border"
          >
            Read More
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>

        {/* Did You Know? Card */}
        <Card className="p-4 border border-primary/20 bg-gradient-to-br from-primary/5 to-card">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <Badge className="bg-primary text-primary-foreground mb-2">Did You Know?</Badge>
              <p className="text-sm text-foreground mb-1">
                People born under Rohini Nakshatra often have strong creativity and artistic talents.
              </p>
              <button
                onClick={() => onNavigate("premium")}
                className="text-sm text-primary hover:underline flex items-center gap-1 mt-2"
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
            className="p-4 border border-border cursor-pointer hover:border-primary transition-all"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-foreground mb-1">Kundali</h4>
            <p className="text-xs text-muted-foreground">Generate birth chart</p>
          </Card>

          <Card
            onClick={() => onNavigate("compatibility")}
            className="p-4 border border-border cursor-pointer hover:border-primary transition-all"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-foreground mb-1">Compatibility</h4>
            <p className="text-xs text-muted-foreground">Check relationship</p>
          </Card>
        </div>

        {/* Date Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 mt-4">
            {/* Daily Prediction */}
            <Card className="p-4 border-l-4 border-primary">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground">Today's Prediction</h3>
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Favorable
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Today brings excellent opportunities for personal growth and spiritual advancement. The planetary alignment 
                favors meditation and introspection. Your creative energies are at their peak.
              </p>
            </Card>

            {/* Life Aspects */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
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
                    <Briefcase className="h-4 w-4 text-blue-500 dark:text-blue-400" />
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
                    <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-foreground">Finance</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                  {[1, 2].map((i) => (
                    <Star key={i} className="h-3 w-3 text-muted-foreground/30" />
                  ))}
                </div>
              </Card>

              <Card className="p-3 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-50 dark:bg-purple-950/30 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  </div>
                  <span className="text-sm text-foreground">Social</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                  <Star className="h-3 w-3 text-muted-foreground/30" />
                </div>
              </Card>
            </div>

            {/* Lucky Elements */}
            <Card className="p-4 bg-muted border border-border">
              <h4 className="text-foreground mb-3">Lucky Elements</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Color</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm text-foreground">Green</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Number</div>
                  <div className="text-primary">6</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Time</div>
                  <div className="text-sm text-foreground">2-4 PM</div>
                </div>
              </div>
            </Card>

            {/* Remedies */}
            <Card className="p-4 border border-border">
              <h4 className="text-foreground mb-3">Today's Remedies</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Chant Hanuman Chalisa in the morning</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Donate green vegetables to the needy</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Wear silver jewelry for positive energy</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-4">
            <Card className="p-4 border-l-4 border-primary">
              <h3 className="text-foreground mb-3">This Week's Overview</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                The week ahead shows promising developments in professional matters. Mid-week brings favorable conditions 
                for important meetings and negotiations.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="text-muted-foreground">Career opportunities expand</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
                  <span className="text-muted-foreground">Relationships strengthen</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="text-muted-foreground">Financial stability improves</span>
                </div>
              </div>
            </Card>

            {/* Premium Weekly Content */}
            <Card className="p-4 border border-accent/30 bg-gradient-to-br from-accent/10 to-card">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-accent" />
                <Badge className="bg-accent text-accent-foreground">Premium</Badge>
              </div>
              <h4 className="text-foreground mb-2">Detailed Weekly Analysis</h4>
              <div className="relative mb-3">
                <p className="text-sm text-muted-foreground blur-sm select-none">
                  Deep insights into career progression, financial planning, relationship dynamics, and health considerations for the week...
                </p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
              </div>
              <Button
                onClick={() => onNavigate("premium")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Lock className="h-4 w-4 mr-2" />
                Unlock Weekly Report
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4 mt-4">
            <Card className="p-4 border-l-4 border-primary">
              <h3 className="text-foreground mb-3">Monthly Forecast</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                March 2026 marks a transformative period. Jupiter's transit brings growth opportunities while Saturn 
                teaches important life lessons. Focus on building lasting foundations.
              </p>
            </Card>

            {/* Premium Monthly Content */}
            <Card className="p-4 border border-accent/30 bg-gradient-to-br from-accent/10 to-card">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-accent" />
                <Badge className="bg-accent text-accent-foreground">Premium</Badge>
              </div>
              <h4 className="text-foreground mb-2">Complete Monthly Guide</h4>
              <div className="relative mb-3">
                <p className="text-sm text-muted-foreground blur-sm select-none">
                  Comprehensive month-by-month breakdown with planetary transits, important dates, career milestones, relationship opportunities...
                </p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
              </div>
              <Button
                onClick={() => onNavigate("premium")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Lock className="h-4 w-4 mr-2" />
                Unlock Monthly Report
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA to Shop */}
        <Card className="p-4 text-center border border-border">
          <h4 className="text-foreground mb-2">Need Puja Items?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get authentic puja samagri for your remedies
          </p>
          <Button
            onClick={() => onNavigate("shop")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Visit Puja Shop
          </Button>
        </Card>
      </div>
    </div>
  );
}