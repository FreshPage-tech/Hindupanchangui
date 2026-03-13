import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  Bell,
  Share2,
  Play,
  BookOpen,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Utensils,
  Shirt,
  Video,
  Music,
  Info,
  AlertCircle,
  Heart,
  Calendar,
  Star
} from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { shareFestival } from "../../utils/deep-linking";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface FestivalDetailProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  festivalId?: string;
  festival?: any;
}

export function FestivalDetail({ onBack, onNavigate, festivalId = "mahashivratri", festival }: FestivalDetailProps) {
  const [reminderSet, setReminderSet] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleShare = async () => {
    const success = await shareFestival({
      id: festivalId,
      name: "Ugadi",
      date: "Sep 20, 2022 10:20 AM",
      description: "The festival of new beginnings celebrated across South India"
    });
    
    if (success) {
      toast.success("Festival shared with deep link!");
    } else {
      toast.error("Failed to share");
    }
  };

  const handleSetReminder = () => {
    setReminderSet(!reminderSet);
    if (!reminderSet) {
      toast.success("Reminder set for Ugadi", {
        icon: '⏰',
      });
    } else {
      toast.info("Reminder removed");
    }
  };

  const handlePlayAudio = (mantraName: string) => {
    setPlayingAudio(mantraName);
    toast.success(`Now playing: ${mantraName}`, {
      icon: '🎵',
    });
  };

  const handlePlayVideo = (videoTitle: string) => {
    toast.success(`Opening video: ${videoTitle}`, {
      icon: '🎥',
    });
  };

  const quickInfoCards = [
    {
      id: "what-is",
      title: "What is Diwali ?",
      icon: "📖",
      image: "https://images.unsplash.com/photo-1709098275085-78e09efeaa1a?w=400",
      type: "info"
    },
    {
      id: "prefer-food",
      title: "Prefer Food To Eat",
      icon: "🍲",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
      type: "food-good"
    },
    {
      id: "avoid-food",
      title: "Food To Avoid During Fast",
      icon: "🚫",
      image: "https://images.unsplash.com/photo-1603046891726-36bfd957e19a?w=400",
      type: "food-bad"
    },
    {
      id: "avoid-general",
      title: "Food To Avoid During Fast",
      icon: "⚠️",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400",
      type: "avoid"
    }
  ];

  const actionCards = [
    {
      title: "Pooja",
      icon: "🪔",
      color: "from-orange-100 to-orange-50",
      action: () => setExpandedSection(expandedSection === "pooja" ? null : "pooja")
    },
    {
      title: "Bhajan Aarti",
      icon: "🎵",
      color: "from-yellow-100 to-yellow-50",
      action: () => handlePlayAudio("Lakshmi Aarti")
    },
    {
      title: "Mantra Jaap",
      icon: "📿",
      color: "from-red-100 to-red-50",
      action: () => setExpandedSection(expandedSection === "mantra" ? null : "mantra")
    },
    {
      title: "Quiz",
      icon: "❓",
      color: "from-purple-100 to-purple-50",
      action: () => toast.info("Quiz coming soon!")
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-4 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center"
        >
          <ArrowLeft className="h-5 w-5 text-[#2C2C2C]" />
        </button>
        
        <h1 className="text-[#D8553A] text-[29px] font-bold" style={{ fontFamily: "'Samarkan', cursive" }}>
          Ugadi
        </h1>

        <div className="flex items-center gap-3">
          <button className="w-6 h-6 flex items-center justify-center">
            <Star className="h-5 w-5 text-[#2C2C2C]" />
          </button>
          <button onClick={handleSetReminder} className="w-6 h-6 flex items-center justify-center">
            <Bell className={`h-5 w-5 ${reminderSet ? 'text-[#C74225] fill-[#C74225]' : 'text-[#2C2C2C]'}`} />
          </button>
          <button onClick={handleShare} className="w-6 h-6 flex items-center justify-center">
            <Share2 className="h-5 w-5 text-[#2C2C2C]" />
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Festival Hero Image */}
        <div className="relative w-full aspect-square rounded-[20px] overflow-hidden border border-gray-200 shadow-sm">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1709098275085-78e09efeaa1a?w=800"
            alt="Ugadi Festival"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Date and Time Info */}
        <div className="bg-[rgba(255,255,255,0.5)] border border-gray-200 rounded-[20px] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#7D7D7D] text-sm">Chal - Neutral</p>
              <p className="text-[#090A0A] font-semibold">Sep 20, 2022 10:20 AM</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <Clock className="h-6 w-6 text-[#2C2C2C]" />
            </div>
          </div>
        </div>

        {/* Reminder Section */}
        {reminderSet && (
          <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-[20px] p-4 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[#090A0A] font-semibold text-sm">Reminder Set</p>
                  <p className="text-[#6B6B6B] text-xs">You'll be notified on Sep 20, 2022 at 9:00 AM</p>
                </div>
              </div>
              <button
                onClick={handleSetReminder}
                className="text-red-500 text-xs font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Set Reminder Card - When not set */}
        {!reminderSet && (
          <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-[20px] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-[#C74225]" />
                </div>
                <div>
                  <p className="text-[#090A0A] font-semibold text-sm">Don't Miss This Festival</p>
                  <p className="text-[#6B6B6B] text-xs">Set a reminder to prepare in advance</p>
                </div>
              </div>
              <Button
                onClick={handleSetReminder}
                size="sm"
                className="bg-[#C74225] hover:bg-[#C74225]/90 text-white"
              >
                Set Reminder
              </Button>
            </div>
          </div>
        )}

        {/* Quick Info Cards */}
        <div className="space-y-3">
          {quickInfoCards.map((card) => (
            <div
              key={card.id}
              className="bg-[rgba(255,255,255,0.5)] border border-gray-200 rounded-[20px] p-3 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedSection(expandedSection === card.id ? null : card.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-[71px] h-[60px] rounded-[10px] overflow-hidden shadow-[0px_4px_10px_5px_rgba(216,85,58,0.15)] flex-shrink-0">
                  <ImageWithFallback
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#263238] font-bold flex-1">{card.title}</p>
                <div className="flex-shrink-0">
                  <svg width="21" height="17" viewBox="0 0 21 17" fill="none">
                    <path d="M0 0L10.5 17L21 0H0Z" fill="#D8553A" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedSection === card.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {card.type === "info" && (
                    <div className="space-y-3">
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        Lakshmi Puja is the main ritual of Diwali. It is performed to welcome Goddess Lakshmi into homes
                        for prosperity and good fortune. This auspicious puja is performed during the Pradosh Kaal.
                      </p>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-[#2C2C2C]">Spiritual Significance:</h5>
                        <ul className="space-y-1.5 text-sm text-[#6B6B6B]">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#357A38] mt-0.5 flex-shrink-0" />
                            <span>Invites prosperity and wealth into the household</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#357A38] mt-0.5 flex-shrink-0" />
                            <span>Marks the beginning of the Hindu New Year</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#357A38] mt-0.5 flex-shrink-0" />
                            <span>Celebrates victory of light over darkness</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {card.type === "food-good" && (
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-[#2C2C2C] flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#357A38]" />
                        Recommended Foods (Sattvic Diet)
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {["Milk & Ghee", "Fresh Fruits", "Sweet Dishes", "Dry Fruits", "Kheer (Rice Pudding)", "Coconut", "Panchamrit", "Ladoo"].map((food) => (
                          <div key={food} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                            <span className="text-[#357A38]">✓</span>
                            <span>{food}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.type === "food-bad" && (
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-[#2C2C2C] flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Foods to Avoid
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {["Non-Veg Food", "Onion & Garlic", "Alcohol", "Eggs", "Tamasic Foods", "Processed Items", "Stale Food", "Spicy Foods"].map((food) => (
                          <div key={food} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                            <span className="text-red-500">✗</span>
                            <span>{food}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 mt-3">
                        <p className="text-xs text-[#6B6B6B] flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#C74225] flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Important:</strong> Fasting on Diwali is recommended. If fasting, consume only fruits,
                            milk, and light foods. Break the fast after puja with prasad.
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  {card.type === "avoid" && (
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-[#2C2C2C] flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        What to Avoid (Don'ts)
                      </h5>
                      <ul className="space-y-2 text-sm text-[#6B6B6B]">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✗</span>
                          <span>Don't keep the house dirty or cluttered</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✗</span>
                          <span>Avoid gambling or excessive spending</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✗</span>
                          <span>Don't consume alcohol or non-vegetarian food</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✗</span>
                          <span>Avoid negative thoughts, anger, or arguments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">✗</span>
                          <span>Don't perform puja during Rahu Kaal</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {actionCards.map((card, idx) => (
            <Card
              key={idx}
              className={`h-[149px] bg-gradient-to-br ${card.color} border border-gray-200 shadow-[0px_2px_15px_-4px_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3`}
              onClick={card.action}
            >
              <div className="text-5xl">{card.icon}</div>
              <p className="text-[#090A0A] font-bold text-center">{card.title}</p>
            </Card>
          ))}
        </div>

        {/* Expanded Pooja Section */}
        {expandedSection === "pooja" && (
          <Card className="p-4 bg-gradient-to-r from-orange-50 to-white border-l-4 border-[#C74225] animate-in slide-in-from-top-2">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="h-5 w-5 text-[#C74225]" />
              <h3 className="text-[#2C2C2C] font-bold">Complete Puja Procedure</h3>
            </div>
            <div className="space-y-3">
              {[
                { step: 1, title: "Clean the Puja Space", desc: "Thoroughly clean the area where puja will be performed", time: "5 min" },
                { step: 2, title: "Setup the Altar", desc: "Place idols of Lakshmi and Ganesha on a clean cloth", time: "10 min" },
                { step: 3, title: "Ganesh Puja", desc: "Begin with worship of Lord Ganesha for obstacle removal", time: "10 min" },
                { step: 4, title: "Lakshmi Invocation", desc: "Chant Lakshmi mantras 108 times", time: "20 min" },
                { step: 5, title: "Aarti & Prayers", desc: "Perform aarti with camphor and sing devotional songs", time: "10 min" },
                { step: 6, title: "Prasad Distribution", desc: "Distribute blessed offerings to all family members", time: "5 min" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-100">
                  <div className="w-7 h-7 bg-[#C74225] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-[#2C2C2C] font-medium text-sm">{item.title}</h4>
                      <Badge className="bg-[#FFD700] text-[#2C2C2C] text-xs">{item.time}</Badge>
                    </div>
                    <p className="text-xs text-[#6B6B6B]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <h4 className="text-[#2C2C2C] font-bold text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#C74225]" />
                Essential Puja Samagri (Items)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Lakshmi Idol",
                  "Diyas",
                  "Incense",
                  "Flowers",
                  "Fruits",
                  "Kumkum",
                  "Turmeric",
                  "Rice",
                  "Betel Leaves",
                  "Camphor",
                  "Ghee",
                  "Coconut"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <Sparkles className="h-3 w-3 text-[#C74225] flex-shrink-0" />
                    <span className="text-[#6B6B6B]">{item}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => onNavigate("puja-shop")}
                className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white mt-3"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Buy Complete Puja Kit - ₹499
              </Button>
            </div>
          </Card>
        )}

        {/* Expanded Mantra Section */}
        {expandedSection === "mantra" && (
          <Card className="p-4 bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500 animate-in slide-in-from-top-2">
            <div className="flex items-start gap-3 mb-3">
              <Music className="h-5 w-5 text-red-500" />
              <h3 className="text-[#2C2C2C] font-bold">Sacred Mantras</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-red-100">
                <h4 className="text-[#2C2C2C] font-medium mb-2 text-sm">Lakshmi Gayatri Mantra</h4>
                <Badge className="bg-[#357A38] text-white text-xs mb-2">Chant 108 times</Badge>
                <p className="text-[#2C2C2C] mb-2 leading-relaxed text-sm">
                  ॐ महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि।<br />
                  तन्नो लक्ष्मी प्रचोदयात्॥
                </p>
                <p className="text-xs text-[#6B6B6B] italic mb-3">
                  Om Mahalakshmyai Cha Vidmahe Vishnu Patnyai Cha Dhimahi.<br />
                  Tanno Lakshmi Prachodayat.
                </p>
                <Button 
                  onClick={() => handlePlayAudio("Lakshmi Gayatri Mantra")}
                  className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white text-sm"
                  size="sm"
                >
                  <Play className="h-3 w-3 mr-2" />
                  Play Audio
                </Button>
              </div>

              <div className="p-3 bg-white rounded-lg border border-red-100">
                <h4 className="text-[#2C2C2C] font-medium mb-2 text-sm">Lakshmi Beej Mantra</h4>
                <Badge className="bg-[#FFD700] text-[#2C2C2C] text-xs mb-2">Most Powerful</Badge>
                <p className="text-[#2C2C2C] mb-2 text-sm">
                  ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद।<br />
                  ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः॥
                </p>
                <p className="text-xs text-[#6B6B6B] italic mb-3">
                  Om Shreem Hreem Shreem Kamale Kamalaleye Praseed Praseed.<br />
                  Om Shreem Hreem Shreem Mahalakshmyai Namah.
                </p>
                <Button 
                  onClick={() => handlePlayAudio("Lakshmi Beej Mantra")}
                  className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#2C2C2C] text-sm"
                  size="sm"
                >
                  <Play className="h-3 w-3 mr-2" />
                  Play Audio
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Video Tutorial Section */}
        <div className="relative w-full h-[200px] rounded-[20px] overflow-hidden mt-6">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1761485183056-9b2b914ceb40?w=800"
            alt="Puja Tutorial Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={() => handlePlayVideo("Complete Lakshmi Puja Tutorial")}
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Play className="h-8 w-8 text-[#C74225] ml-1" />
            </button>
          </div>
        </div>

        {/* Article Section */}
        <Card className="p-4 bg-white border border-gray-100">
          <div className="flex items-start gap-3 mb-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              alt="Author"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="text-[#2C2C2C] font-bold">Christi-on Stomka</h4>
              <p className="text-xs text-[#6B6B6B]">Hindu Mythology Instructor</p>
            </div>
            <button className="text-[#C74225] text-sm font-medium">
              Follow
            </button>
          </div>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Lift on your stomach and place your hands flat on the floor with your palms above your ankles and pretty near your head and pull your forehead. This position helps comfortable, you can do a little steeper by lifting your calves off the bed too.
          </p>
          <p className="text-sm text-[#6B6B6B] leading-relaxed mt-3">
            Hold the stretch for 30-50 seconds and when you're ready, gently lower back down.
          </p>
        </Card>

        {/* Clothing Guide */}
        <Card className="p-4 bg-gradient-to-r from-yellow-50 to-white border-l-4 border-[#FFD700]">
          <div className="flex items-start gap-3 mb-3">
            <Shirt className="h-5 w-5 text-[#FFD700]" />
            <h4 className="text-[#2C2C2C] font-bold">Traditional Attire & Colors</h4>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium text-[#2C2C2C] mb-2">👗 For Women</h5>
              <ul className="space-y-1.5 text-sm text-[#6B6B6B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225]">•</span>
                  <span>Saree (red, yellow, or golden colors)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225]">•</span>
                  <span>Traditional jewelry and mehendi</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h5 className="text-sm font-medium text-[#2C2C2C] mb-2">👔 For Men</h5>
              <ul className="space-y-1.5 text-sm text-[#6B6B6B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225]">•</span>
                  <span>Kurta Pajama or Dhoti-Kurta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C74225]">•</span>
                  <span>Apply tilak (sacred mark)</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <h5 className="text-sm font-medium text-[#2C2C2C] mb-2">🎨 Auspicious Colors</h5>
              <div className="flex gap-2 flex-wrap">
                {[
                  { color: "bg-red-500", name: "Red" },
                  { color: "bg-yellow-400", name: "Yellow" },
                  { color: "bg-orange-500", name: "Orange" },
                  { color: "bg-pink-400", name: "Pink" },
                  { color: "bg-amber-500", name: "Golden" }
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200">
                    <div className={`w-3 h-3 ${item.color} rounded-full border border-gray-300`}></div>
                    <span className="text-xs text-[#6B6B6B]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* What to Do Section */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-white border-l-4 border-[#357A38]">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle className="h-5 w-5 text-[#357A38]" />
            <h4 className="text-[#2C2C2C] font-bold">What to Do (Dos)</h4>
          </div>
          <ul className="space-y-2 text-sm text-[#6B6B6B]">
            <li className="flex items-start gap-2">
              <span className="text-[#357A38] font-bold">✓</span>
              <span>Wake up early and take a purifying bath before sunrise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#357A38] font-bold">✓</span>
              <span>Clean and decorate your home with rangoli and flowers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#357A38] font-bold">✓</span>
              <span>Light diyas in every corner of the house</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#357A38] font-bold">✓</span>
              <span>Keep doors and windows open to invite Goddess Lakshmi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#357A38] font-bold">✓</span>
              <span>Chant Lakshmi mantras 108 times for maximum blessings</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Floating Audio Player */}
      {playingAudio && (
        <AudioPlayer
          title={playingAudio}
          subtitle="Festival Audio"
          onClose={() => setPlayingAudio(null)}
          mini
        />
      )}
    </div>
  );
}