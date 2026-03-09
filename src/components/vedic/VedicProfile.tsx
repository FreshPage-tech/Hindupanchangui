import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Bell, 
  Moon, 
  Globe, 
  Shield,
  Star,
  Edit2,
  LogOut,
  Languages
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface VedicProfileProps {
  onBack: () => void;
}

export function VedicProfile({ onBack }: VedicProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState({
    dailyPanchang: true,
    festivalAlerts: true,
    astrologyUpdates: true,
    muhuratReminders: true,
  });
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("english");

  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    birthDate: "1990-05-15",
    birthTime: "06:30",
    birthPlace: "Varanasi, Uttar Pradesh",
    rashi: "Vrishabha (Taurus)",
    nakshatra: "Rohini",
  });

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिन्दी (Hindi)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "malayalam", label: "മലയാളം (Malayalam)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "sanskrit", label: "संस्कृत (Sanskrit)" },
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Language changed to ${languages.find(l => l.value === value)?.label}`);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6 rounded-b-3xl">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center text-[#C74225] shadow-lg">
            <User className="h-10 w-10" />
          </div>
          <div className="flex-1">
            <h1 className="text-white mb-1">{profile.name}</h1>
            <Badge className="bg-[#FFD700] text-[#2C2C2C]">
              {profile.rashi}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Birth Details Card */}
        <Card className="p-4 border-l-4 border-[#C74225]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#2C2C2C]">Birth Details</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditMode(!editMode)}
              className="border-[#C74225] text-[#C74225]"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {editMode ? "Save" : "Edit"}
            </Button>
          </div>

          {!editMode ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#C74225]" />
                <div>
                  <div className="text-xs text-[#6B6B6B]">Date of Birth</div>
                  <div className="text-[#2C2C2C]">{new Date(profile.birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#C74225]" />
                <div>
                  <div className="text-xs text-[#6B6B6B]">Time of Birth</div>
                  <div className="text-[#2C2C2C]">{profile.birthTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#C74225]" />
                <div>
                  <div className="text-xs text-[#6B6B6B]">Place of Birth</div>
                  <div className="text-[#2C2C2C]">{profile.birthPlace}</div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-[#FFD700]" />
                <div>
                  <div className="text-xs text-[#6B6B6B]">Nakshatra</div>
                  <div className="text-[#2C2C2C]">{profile.nakshatra}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="birthDate">Date of Birth</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="birthTime">Time of Birth</Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={profile.birthTime}
                  onChange={(e) => setProfile({ ...profile, birthTime: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="birthPlace">Place of Birth</Label>
                <Input
                  id="birthPlace"
                  value={profile.birthPlace}
                  onChange={(e) => setProfile({ ...profile, birthPlace: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Notifications Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#2C2C2C]">Daily Panchang</div>
                <div className="text-xs text-[#6B6B6B]">Get daily Panchang updates</div>
              </div>
              <Switch
                checked={notifications.dailyPanchang}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, dailyPanchang: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#2C2C2C]">Festival Alerts</div>
                <div className="text-xs text-[#6B6B6B]">Reminders for upcoming festivals</div>
              </div>
              <Switch
                checked={notifications.festivalAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, festivalAlerts: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#2C2C2C]">Astrology Updates</div>
                <div className="text-xs text-[#6B6B6B]">Daily horoscope predictions</div>
              </div>
              <Switch
                checked={notifications.astrologyUpdates}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, astrologyUpdates: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#2C2C2C]">Muhurat Reminders</div>
                <div className="text-xs text-[#6B6B6B]">Auspicious timing alerts</div>
              </div>
              <Switch
                checked={notifications.muhuratReminders}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, muhuratReminders: checked })
                }
              />
            </div>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">App Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-[#C74225]" />
                <div>
                  <div className="text-[#2C2C2C]">Dark Mode</div>
                  <div className="text-xs text-[#6B6B6B]">Switch to dark theme</div>
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Languages className="h-5 w-5 text-[#C74225]" />
                <div className="text-[#2C2C2C]">Language</div>
              </div>
              <Select
                value={language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Subscription Info */}
        <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-white border border-[#FFD700]/30">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-[#FFD700]" />
            <h4 className="text-[#2C2C2C]">Premium Membership</h4>
          </div>
          <p className="text-sm text-[#6B6B6B] mb-3">
            Upgrade to Premium for personalized remedies, detailed Kundli analysis, and ad-free experience
          </p>
          <Button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2C2C2C] hover:opacity-90">
            Upgrade to Premium
          </Button>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Privacy & Security</h3>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-[#FFF8E7] rounded-lg hover:bg-[#FFF8E7]/70 transition-colors">
              <div className="text-[#2C2C2C]">Privacy Policy</div>
            </button>

            <button className="w-full text-left p-3 bg-[#FFF8E7] rounded-lg hover:bg-[#FFF8E7]/70 transition-colors">
              <div className="text-[#2C2C2C]">Terms of Service</div>
            </button>

            <button className="w-full text-left p-3 bg-[#FFF8E7] rounded-lg hover:bg-[#FFF8E7]/70 transition-colors">
              <div className="text-[#2C2C2C]">Data Backup</div>
            </button>
          </div>
        </Card>

        {/* About App */}
        <Card className="p-4">
          <h4 className="text-[#2C2C2C] mb-2">About VedicTime</h4>
          <div className="text-sm text-[#6B6B6B] space-y-1">
            <p>Version 1.0.0</p>
            <p>© 2025 VedicTime. All rights reserved.</p>
            <p className="pt-2">Your trusted companion for spiritual guidance and Vedic wisdom</p>
          </div>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}