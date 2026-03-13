import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Flame, Sun, Moon, Star, Calendar, Clock, AlertCircle, Sparkles, Bell, User, Share2, CheckCircle, Lock, Play, Lightbulb, BookOpen, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { shareDailyGuidance, shareMuhurat, shareFestival, shareAppInvitation } from "../../utils/deep-linking";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface VedicDashboardProps {
  onNavigate: (screen: string) => void;
}

export function VedicDashboard({ onNavigate }: VedicDashboardProps) {
  const [streakDays, setStreakDays] = useState(7);
  const [ritualDone, setRitualDone] = useState(false);
  const [showMythBuster, setShowMythBuster] = useState(false);

  // Astrology myth buster content - rotates daily
  const mythBusters = [
    {
      id: 1,
      myth: "Astrology is just superstition with no scientific basis",
      fact: "Hindu Astrology (Jyotish Shastra) is a Vedic science with precise mathematical calculations",
      shortTeaser: "Is astrology just superstition?",
      fullExplanation: "Vedic Astrology, known as Jyotish Shastra, is one of the six Vedangas (limbs of the Vedas). It uses precise astronomical calculations based on the positions of planets, stars, and nakshatras. Ancient rishis observed celestial patterns and their correlation with earthly events over thousands of years.\n\nKey Scientific Aspects:\n• Based on mathematical astronomy and precise planetary positions\n• Uses sidereal zodiac aligned with actual star constellations\n• Incorporates lunar mansions (27 Nakshatras) for detailed predictions\n• Considers planetary strengths, aspects, and transits\n• Uses dasha systems for time-period analysis\n\nModern Research:\nStudies have shown correlations between planetary positions and human behavior patterns, though more research is needed. The precision of ancient calculations matches modern astronomy.",
      category: "Basics",
      references: ["Brihat Parashara Hora Shastra", "Jaimini Sutras"]
    },
    {
      id: 2,
      myth: "Your sun sign determines everything about you",
      fact: "Vedic astrology analyzes entire birth chart with 9 planets, 12 houses, and 27 nakshatras",
      shortTeaser: "Does your sun sign tell everything?",
      fullExplanation: "Unlike Western pop astrology that focuses mainly on Sun signs, Vedic astrology (Jyotish) considers your complete birth chart (Kundali) with multiple factors:\n\nKey Components:\n• Ascendant (Lagna) - Most important, changes every 2 hours\n• Moon Sign (Rashi) - Your emotional nature and mind\n• Sun Sign - Your soul and ego\n• 9 Planets (Navagrahas) - Including Rahu & Ketu (lunar nodes)\n• 12 Houses (Bhavas) - Different life areas\n• 27 Nakshatras - Lunar mansions for precise predictions\n• Planetary aspects (Drishti)\n• Planetary strengths (Shadbala)\n• Divisional charts (Vargas) for specific life areas\n\nYour Moon sign is actually considered more important in Vedic astrology than your Sun sign. Two people born on the same day can have completely different charts based on time and location.",
      category: "Chart Analysis",
      references: ["Brihat Jataka", "Saravali"]
    },
    {
      id: 3,
      myth: "Saturn (Shani) is always bad and brings only misfortune",
      fact: "Saturn is the planet of discipline, karma, and spiritual growth - teaches valuable life lessons",
      shortTeaser: "Is Saturn really the 'bad' planet?",
      fullExplanation: "Saturn (Shani Dev) is often misunderstood and feared, but it's actually a great teacher in Vedic astrology.\n\nSaturn's True Nature:\n• Planet of Karma - Delivers results of past actions\n• Teacher of Discipline - Rewards hard work and patience\n• Spiritual Catalyst - Pushes you toward moksha\n• Reality Check - Removes illusions and false hopes\n• Long-term Success - Builds lasting achievements\n\nPositive Saturn Influences:\n• Strong work ethic and responsibility\n• Wisdom through experience\n• Success in politics, law, labor, mining\n• Spiritual maturity and detachment\n• Organizational and leadership skills\n\nWell-placed Saturn:\nWhen favorably positioned, Saturn can grant wealth, authority, longevity, and spiritual wisdom. Many successful people have strong Saturn in their charts.\n\nThe key is to work with Saturn's energy through:\n• Honest hard work\n• Serving the elderly and disadvantaged\n• Patience and perseverance\n• Following dharma (righteous path)",
      category: "Planets",
      references: ["Brihat Parashara Hora Shastra - Saturn Chapter", "Phaladeepika"]
    },
    {
      id: 4,
      myth: "Rahu and Ketu are imaginary points, not real planets",
      fact: "They are astronomical points where eclipses occur - Moon's orbital nodes with profound effects",
      shortTeaser: "Are Rahu & Ketu real or imaginary?",
      fullExplanation: "Rahu and Ketu are the North and South lunar nodes - the points where the Moon's orbit intersects the Earth's orbital plane around the Sun.\n\nAstronomical Reality:\n• Rahu (North Node) - Where Moon crosses ecliptic upward\n• Ketu (South Node) - Where Moon crosses ecliptic downward\n• Solar eclipses occur when New Moon is near these points\n• Lunar eclipses occur when Full Moon is near these points\n• NASA uses these calculations for eclipse predictions\n\nMythological Story:\nThe demon Swarbhanu drank the nectar of immortality. Vishnu beheaded him, creating Rahu (head) and Ketu (tail), who seek revenge by swallowing Sun and Moon during eclipses.\n\nAstrological Significance:\n• Rahu - Material desires, illusions, foreign lands, technology\n• Ketu - Spirituality, moksha, past life karma, detachment\n• Both bring sudden changes and transformation\n• Represent karmic axis in the chart\n\nMahadasha Periods:\nRahu and Ketu dashas (18 and 7 years respectively) are considered highly transformative periods that can bring major life changes.",
      category: "Planets",
      references: ["Brihat Samhita", "Jaimini Sutras", "Uttara Kalamrita"]
    },
    {
      id: 5,
      myth: "Gemstones have no real power, it's just placebo effect",
      fact: "Gemstones are crystalline structures that emit specific frequencies matching planetary vibrations",
      shortTeaser: "Do gemstones really work?",
      fullExplanation: "Vedic astrology recommends gemstones based on the principle that crystals emit electromagnetic frequencies that can interact with our body's energy field.\n\nScientific Basis:\n• Crystals have piezoelectric properties (generate electric charge under pressure)\n• Each gemstone has unique crystalline structure and chemical composition\n• They absorb and emit specific light wavelengths\n• Ancient texts describe color therapy (chromotherapy)\n• Modern technology uses crystals in watches, radios, computers\n\nHow They Work:\n• Ruby (Sun) - Red spectrum, enhances vitality and confidence\n• Pearl (Moon) - White/milky, calms emotions and mind\n• Red Coral (Mars) - Increases energy and courage\n• Emerald (Mercury) - Green spectrum, enhances intellect\n• Yellow Sapphire (Jupiter) - Yellow, brings wisdom and wealth\n• Diamond (Venus) - Colorless, enhances beauty and relationships\n• Blue Sapphire (Saturn) - Blue, disciplines and grounds\n\nImportant Guidelines:\n• Must be natural, not synthetic or treated\n• Minimum weight requirements (3-7 carats typically)\n• Worn touching skin on specific fingers\n• Activated through mantras and rituals\n• Prescribed only after complete chart analysis\n\nCaution: Wrong gemstone can cause adverse effects. Always consult expert astrologer.",
      category: "Remedies",
      references: ["Garuda Purana - Ratna Shastra", "Agni Purana"]
    },
    {
      id: 6,
      myth: "Manglik dosha means you're cursed and can't marry",
      fact: "Mangal dosha is a planetary position that affects compatibility - has many remedies",
      shortTeaser: "Is Manglik Dosha really a curse?",
      fullExplanation: "Manglik or Kuja Dosha occurs when Mars is placed in certain houses (1st, 2nd, 4th, 7th, 8th, or 12th) from Lagna, Moon, or Venus.\n\nWhat It Actually Means:\n• Mars in these houses can create conflicts in marriage\n• Indicates strong-willed, independent personality\n• May cause delays in marriage, not impossibility\n• Affects both men and women equally\n\nCancellation Conditions:\n• If both partners are Manglik\n• Mars in own/exalted sign\n• Benefic aspects on 7th house\n• Strong Jupiter aspects\n• After age 28, effects diminish\n• Many classical exceptions exist\n\nRemedy Options:\n• Kumbh Vivah (ritual before actual marriage)\n• Mars remedies (Hanuman worship, red lentil donation)\n• Fasting on Tuesdays\n• Reciting Mangal mantra\n• Gemstone therapy (red coral)\n\nModern Perspective:\nMany happily married couples have Manglik dosha. It's one factor among many in compatibility analysis. Complete chart matching (Ashtakoot) considers 36 points, not just Manglik status.",
      category: "Marriage",
      references: ["Brihat Parashara Hora Shastra", "Muhurta Chintamani"]
    },
    {
      id: 7,
      myth: "Astrology can predict exact future events with 100% accuracy",
      fact: "Astrology shows tendencies and probabilities - free will and karma also play crucial roles",
      shortTeaser: "Can astrology predict everything?",
      fullExplanation: "While Vedic astrology is highly accurate, it works with probabilities and tendencies, not absolute certainty.\n\nWhat Astrology CAN Do:\n• Show karmic patterns and life themes\n• Indicate favorable and unfavorable periods\n• Reveal strengths and weaknesses\n• Suggest timing for important actions\n• Warn about potential challenges\n• Guide career and relationship choices\n\nWhat Limits Predictions:\n• Free will (Iccha Shakti) - You can modify destiny\n• Karmas of others affecting you\n• Collective karma and world events\n• Spiritual practices changing patterns\n• Birth time accuracy issues\n• Astrologer's skill and intuition level\n\nThree Types of Karma:\n1. Prarabdha - Fixed karma (shown in birth chart)\n2. Kriyamana - Current actions (you create now)\n3. Sanchita - Stored karma (potential future effects)\n\nVedic Wisdom:\n\"The planets don't control you, they reflect your karma. Through right action, devotion, and spiritual practice, you can transcend negative planetary influences.\"\n\nRemedial Measures:\n• Mantras and meditation\n• Charity and service\n• Gemstone therapy\n• Yagyas and pujas\n• Fasting and discipline\n• Devotional practices",
      category: "Philosophy",
      references: ["Brihat Parashara Hora Shastra - Remedies", "Bhagavad Gita on Karma"]
    }
  ];

  // Get today's myth buster (rotate based on day of year)
  const getTodaysMythBuster = () => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return mythBusters[dayOfYear % mythBusters.length];
  };

  const todaysMythBuster = getTodaysMythBuster();

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleShareDailyGuidance = async () => {
    const success = await shareDailyGuidance({
      quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। Do your duty without expecting the fruits.",
      author: "Bhagavad Gita",
      date: today
    });
    
    if (success) {
      toast.success("Spiritual guidance shared with deep link!");
    }
  };

  const handleShareMuhurat = async () => {
    const success = await shareMuhurat({
      name: "Lakshmi Puja Muhurat",
      time: "7:02 PM – 8:12 PM",
      date: today,
      significance: "Most auspicious time for Lakshmi worship"
    });
    
    if (success) {
      toast.success("Muhurat shared with deep link!");
    }
  };

  const handleShareFestival = async () => {
    const success = await shareFestival({
      id: "mahashivratri",
      name: "Mahashivratri",
      date: "March 10, 2026",
      description: "The Great Night of Lord Shiva"
    });
    
    if (success) {
      toast.success("Festival shared with deep link!");
    }
  };

  const handleMarkRitualDone = () => {
    setRitualDone(true);
    setStreakDays(prev => prev + 1);
    toast.success("🎉 Ritual completed! Keep your streak going!");
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Enhanced Header with Gradient Background */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#D4532B] rounded-b-3xl p-6 text-white mb-6">
        {/* Top Row: User Info & Notifications */}
        <div className="flex justify-between items-start mb-6">
          {/* Avatar & User Greeting - Clickable Profile */}
          <button 
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-3 hover:bg-white/10 rounded-2xl pr-4 -ml-1 pl-1 py-1 transition-all group"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-all">
              <span className="text-white font-medium">D</span>
            </div>
            
            {/* User Greeting */}
            <div className="text-left">
              <h1 className="text-white text-lg font-normal mb-0.5">
                नमस्ते, Devotee 🙏
              </h1>
              <p className="text-white/90 text-sm">{today}</p>
            </div>
          </button>
          
          {/* Notification Icon Only */}
          <button
            onClick={() => onNavigate("notifications")}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative hover:bg-white/20 transition-colors"
          >
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute top-1 right-1 w-5 h-5 bg-[#FB2C36] rounded-full flex items-center justify-center text-xs font-medium">
              3
            </span>
          </button>
        </div>

        {/* Daily Thought Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-6">
          <p className="text-white/90 text-xs mb-3 uppercase tracking-wide">Thought of the Day</p>
          
          {/* Sanskrit Text */}
          <p className="text-white text-base font-normal italic mb-3 leading-relaxed">
            वसुधैव कुटुम्बकम्
          </p>
          
          {/* English Translation */}
          <p className="text-white/80 text-sm leading-relaxed mb-2">
            The world is one family
          </p>
          
          {/* Source */}
          <p className="text-white/60 text-xs">
            — Maha Upanishad
          </p>
        </div>

        {/* Today's Panchang Summary - Now in Gradient */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Tithi</span>
            </div>
            <div className="text-white font-medium">Chaturdashi</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Nakshatra</span>
            </div>
            <div className="text-white font-medium">Rohini</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Sunrise</span>
            </div>
            <div className="text-white font-medium">6:24 AM</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="h-4 w-4 text-[#FFD700]" />
              <span className="text-xs text-white/80">Sunset</span>
            </div>
            <div className="text-white font-medium">5:47 PM</div>
          </div>
        </div>
      </div>

      {/* Main Content - White Background */}
      <div className="px-6 space-y-4">
        {/* Today's Muhurat Card with Buttons */}
        <Card className="p-4 border border-gray-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">Today's Muhurat</Badge>
              <h3 className="text-[#2C2C2C] mb-1">Lakshmi Puja Muhurat</h3>
              <p className="text-sm text-[#6B6B6B]">7:02 PM – 8:12 PM</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleShareMuhurat}
              className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Muhurat
            </Button>
          </div>
        </Card>

        {/* Daily Spiritual Guidance Card (Shareable) */}
        <Card className="p-4 border border-gray-100 bg-gradient-to-br from-[#C74225]/5 to-white">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">Daily Guidance</Badge>
              <p className="text-[#2C2C2C] italic mb-2">
                "Act with patience today. Saturn rewards discipline and mindful effort."
              </p>
              <p className="text-xs text-[#6B6B6B]">Based on your planetary transits</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleShareDailyGuidance}
              className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share with Friends
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-200"
              onClick={() => toast.success("Guidance saved")}
            >
              Save
            </Button>
          </div>
        </Card>

        {/* Daily Ritual Card with Habit Builder */}
        <Card className={`p-4 border ${ritualDone ? 'border-green-200 bg-green-50/30' : 'border-gray-100'}`}>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Flame className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-[#C74225] text-white">Today's Ritual</Badge>
                {streakDays > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-[#C74225] font-medium">{streakDays}</span>
                    <span className="text-[#6B6B6B]">day streak 🔥</span>
                  </div>
                )}
              </div>
              {ritualDone ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>✨ You completed today's ritual!</span>
                </div>
              ) : (
                <>
                  <p className="text-[#2C2C2C] mb-2">
                    Light a diya before sunset and chant the Gayatri Mantra 3 times.
                  </p>
                  <p className="text-xs text-[#6B6B6B]">This practice brings peace and prosperity</p>
                </>
              )}
            </div>
          </div>
          {!ritualDone && (
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-white border border-gray-200 text-[#2C2C2C] hover:bg-gray-50"
                onClick={() => onNavigate("puja-library")}
              >
                <Play className="h-4 w-4 mr-2" />
                Play Mantra
              </Button>
              <Button 
                onClick={handleMarkRitualDone}
                className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
              >
                Mark Done
              </Button>
            </div>
          )}
        </Card>

        {/* Astrology Myth Buster - Educational Feature */}
        <Card className="p-4 border border-blue-200 bg-gradient-to-br from-blue-50/50 to-white cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
          onClick={() => setShowMythBuster(true)}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-600 text-white">Myth Buster</Badge>
                <Badge variant="outline" className="border-[#C74225] text-[#C74225] text-xs">
                  {todaysMythBuster.category}
                </Badge>
              </div>
              <h3 className="text-[#2C2C2C] mb-2 font-medium">
                {todaysMythBuster.shortTeaser}
              </h3>
              
              {/* Myth vs Fact Preview */}
              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2">
                  <div className="w-12 h-5 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-red-700">MYTH</span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] line-clamp-1 flex-1">
                    {todaysMythBuster.myth}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-12 h-5 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-green-700">FACT</span>
                  </div>
                  <p className="text-sm text-[#2C2C2C] line-clamp-1 flex-1">
                    {todaysMythBuster.fact}
                  </p>
                </div>
              </div>

              <p className="text-xs text-blue-600 italic">
                Learn the authentic Vedic science behind astrology
              </p>
            </div>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Read Full Explanation
          </Button>
        </Card>

        {/* Festival Countdown Card */}
        <Card className="p-4 border border-gray-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-[#C74225]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#2C2C2C] mb-1">Mahashivratri in 4 Days</h3>
              <p className="text-sm text-[#6B6B6B]">March 10, 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleShareFestival}
              className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Festival
            </Button>
          </div>
        </Card>

        {/* Premium Astrology Insight Card */}
        <Card className="p-4 border border-[#C74225]/30 bg-gradient-to-br from-[#D4AF37]/10 to-white relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Badge className="bg-[#D4AF37] text-white">Premium</Badge>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#2C2C2C] mb-2">Your Weekly Insight</h3>
              <p className="text-sm text-[#2C2C2C] mb-2">
                "A positive shift in Jupiter may bring opportunities in relationships..."
              </p>
              <div className="relative">
                <div className="blur-sm select-none text-sm text-[#6B6B6B]">
                  This week focuses on career growth and financial stability. Your planetary...
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => onNavigate("premium")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
          >
            <Lock className="h-4 w-4 mr-2" />
            Unlock Full Insight
          </Button>
        </Card>

        {/* Today's Special Event */}
        <Card 
          className="overflow-hidden border border-gray-100 cursor-pointer hover:border-[#C74225] transition-all"
          onClick={() => onNavigate("festival-detail")}
        >
          <div className="h-40 bg-gradient-to-br from-[#C74225]/10 to-white flex items-center justify-center">
            <Flame className="h-16 w-16 text-[#C74225]" />
          </div>
          <div className="p-4">
            <Badge className="bg-[#C74225] text-white mb-2">Today</Badge>
            <h3 className="text-[#2C2C2C] mb-1">Lakshmi Puja</h3>
            <p className="text-sm text-[#6B6B6B] mb-3">
              Diwali 2025 - Main Puja Ritual
            </p>
            <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              <Clock className="h-4 w-4 text-[#C74225]" />
              <span>Muhurat: 7:02 PM - 8:15 PM</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate("complete-panchang")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Panchang</span>
          </button>

          <button
            onClick={() => onNavigate("astrology")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Star className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Horoscope</span>
          </button>

          <button
            onClick={() => onNavigate("festival-calendar")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Festivals</span>
          </button>

          <button
            onClick={() => onNavigate("puja-shop")}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#C74225] transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Flame className="h-5 w-5 text-[#C74225]" />
            </div>
            <span className="text-xs text-[#2C2C2C] text-center">Puja Shop</span>
          </button>
        </div>

        {/* Upcoming Festivals */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#2C2C2C]">Upcoming Festivals</h3>
            <button 
              onClick={() => onNavigate("festival-calendar")}
              className="text-sm text-[#C74225] hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { 
                name: "Kartik Purnima", 
                date: "Nov 15", 
                countdown: "3 days", 
                category: "Vrat",
                image: "https://images.unsplash.com/photo-1604608293644-2f4bef5e7e0c?w=400",
                deity: "Lord Shiva",
                quickTip: "Fast from sunrise to moonrise",
                significance: "Take holy bath in sacred rivers"
              },
              { 
                name: "Guru Nanak Jayanti", 
                date: "Nov 16", 
                countdown: "4 days",
                category: "Jayanti",
                image: "https://images.unsplash.com/photo-1587374133942-86b5ad95d1ae?w=400",
                deity: "Guru Nanak Dev",
                quickTip: "Attend kirtan & langar",
                significance: "Birth anniversary celebration"
              },
              { 
                name: "Vivah Panchami", 
                date: "Nov 21", 
                countdown: "9 days",
                category: "Festival",
                image: "https://images.unsplash.com/photo-1609166214994-502d326bafee?w=400",
                deity: "Lord Rama & Sita",
                quickTip: "Auspicious for weddings",
                significance: "Celebrate divine marriage"
              },
            ].map((festival, index) => (
              <Card 
                key={index}
                className="overflow-hidden cursor-pointer border border-gray-100 hover:border-[#C74225] hover:shadow-md transition-all"
                onClick={() => onNavigate("festival-detail")}
              >
                <div className="flex gap-3">
                  {/* Festival Image */}
                  <div className="w-24 h-24 flex-shrink-0 relative">
                    <ImageWithFallback
                      src={festival.image}
                      alt={festival.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-[#C74225] text-white text-xs">
                        {festival.countdown}
                      </Badge>
                    </div>
                  </div>

                  {/* Festival Info */}
                  <div className="flex-1 py-2 pr-3">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-[#2C2C2C] font-medium">{festival.name}</h4>
                      <Badge variant="outline" className="border-[#C74225] text-[#C74225] text-xs">
                        {festival.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2">
                      <Calendar className="h-3 w-3 text-[#C74225]" />
                      <span>{festival.date}</span>
                      <span>•</span>
                      <span>{festival.deity}</span>
                    </div>

                    {/* Quick Tips */}
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-[#6B6B6B]">{festival.quickTip}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-xs">
                        <Sparkles className="h-3 w-3 text-[#FFD700] mt-0.5 flex-shrink-0" />
                        <span className="text-[#6B6B6B]">{festival.significance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA to explore more */}
          <Card 
            className="mt-3 p-4 bg-gradient-to-r from-[#C74225]/5 to-white border border-[#C74225]/20 cursor-pointer hover:border-[#C74225] transition-all"
            onClick={() => onNavigate("festival-calendar")}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[#2C2C2C] font-medium mb-1">Explore 30+ Festivals</h4>
                <p className="text-sm text-[#6B6B6B]">Complete guide with rituals, mantras & more</p>
              </div>
              <div className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Shloka */}
        <Card className="p-4 border-l-4 border-[#C74225] bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">ॐ</span>
            </div>
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">
                Today's Shloka
              </Badge>
              <p className="text-[#2C2C2C] mb-2">
                "ॐ सह नाववतु । सह नौ भुनक्तु ।"
              </p>
              <p className="text-sm text-[#6B6B6B] italic mb-2">
                May we both be protected. May we both be nourished.
              </p>
              <p className="text-xs text-[#C74225]">— Taittiriya Upanishad</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Muhurat Button */}
      <button
        onClick={() => onNavigate("complete-panchang")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#C74225] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-[#C74225]/90 transition-colors"
      >
        <Clock className="h-6 w-6" />
      </button>

      {/* Myth Buster Modal */}
      {showMythBuster && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-[#2C2C2C] font-medium">Astrology Myth Buster</h2>
                  <Badge className="bg-blue-600 text-white text-xs mt-1">
                    {todaysMythBuster.category}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => setShowMythBuster(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="h-5 w-5 text-[#6B6B6B]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Question */}
              <div>
                <h3 className="text-lg text-[#2C2C2C] font-medium mb-4">
                  {todaysMythBuster.shortTeaser}
                </h3>
              </div>

              {/* Myth Section */}
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 bg-red-100 rounded-full">
                    <span className="text-sm font-medium text-red-700">❌ MYTH</span>
                  </div>
                </div>
                <p className="text-[#2C2C2C]">
                  {todaysMythBuster.myth}
                </p>
              </div>

              {/* Fact Section */}
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <span className="text-sm font-medium text-green-700">✅ FACT</span>
                  </div>
                </div>
                <p className="text-[#2C2C2C] font-medium">
                  {todaysMythBuster.fact}
                </p>
              </div>

              {/* Detailed Explanation */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-[#C74225]" />
                  <h4 className="text-[#2C2C2C] font-medium">Detailed Explanation</h4>
                </div>
                <div className="prose prose-sm max-w-none">
                  {todaysMythBuster.fullExplanation.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    if (paragraph.startsWith('•')) {
                      return (
                        <div key={index} className="flex items-start gap-2 ml-4 mb-2">
                          <CheckCircle className="h-4 w-4 text-[#C74225] mt-1 flex-shrink-0" />
                          <p className="text-[#6B6B6B] text-sm">{paragraph.substring(1).trim()}</p>
                        </div>
                      );
                    }
                    if (paragraph.includes(':') && paragraph.length < 50) {
                      return (
                        <h5 key={index} className="text-[#2C2C2C] font-medium mt-4 mb-2">
                          {paragraph}
                        </h5>
                      );
                    }
                    if (paragraph.match(/^\d+\./)) {
                      return (
                        <div key={index} className="flex items-start gap-2 ml-4 mb-2">
                          <Star className="h-4 w-4 text-[#FFD700] mt-1 flex-shrink-0" />
                          <p className="text-[#6B6B6B] text-sm">{paragraph}</p>
                        </div>
                      );
                    }
                    return (
                      <p key={index} className="text-[#6B6B6B] mb-3 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* References */}
              {todaysMythBuster.references && todaysMythBuster.references.length > 0 && (
                <div className="p-4 bg-[#FFF8E7] border border-[#C74225]/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-[#C74225]" />
                    <span className="text-sm font-medium text-[#2C2C2C]">Vedic References:</span>
                  </div>
                  <div className="space-y-1">
                    {todaysMythBuster.references.map((ref, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-[#C74225]">•</span>
                        <span className="text-sm text-[#6B6B6B] italic">{ref}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    navigator.share?.({
                      title: `Astrology Myth Buster: ${todaysMythBuster.shortTeaser}`,
                      text: `MYTH: ${todaysMythBuster.myth}\n\nFACT: ${todaysMythBuster.fact}\n\nLearn more on VedicTime app!`,
                    }).catch(() => {
                      toast.success("Content copied to clipboard!");
                    });
                  }}
                  className="flex-1 bg-white border border-gray-200 text-[#2C2C2C] hover:bg-gray-50"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Knowledge
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Saved to your learning history!");
                    setShowMythBuster(false);
                  }}
                  className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Got It!
                </Button>
              </div>

              {/* Educational Note */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 text-center italic">
                  💡 A new myth buster appears every day. Keep learning to understand authentic Vedic astrology!
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}