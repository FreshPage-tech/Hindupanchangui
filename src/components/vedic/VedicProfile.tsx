import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
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
  Languages,
  Lock,
  Smartphone,
  Fingerprint,
  Key,
  ChevronRight,
  CheckCircle,
  Eye,
  EyeOff,
  Camera,
  ChevronDown,
  Check,
  AlertTriangle,
  Trash2,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface VedicProfileProps {
  onBack: () => void;
}

export function VedicProfile({ onBack }: VedicProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [showChangePIN, setShowChangePIN] = useState(false);
  const [showChangePhone, setShowChangePhone] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  
  // Phone change states
  const [phoneChangeStep, setPhoneChangeStep] = useState<"enter" | "verify-old" | "verify-new">("enter");
  const [currentPhone, setCurrentPhone] = useState("+91 9876545678");
  const [newPhone, setNewPhone] = useState("");
  const [oldPhoneOTP, setOldPhoneOTP] = useState("");
  const [newPhoneOTP, setNewPhoneOTP] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  
  // PIN change states
  const [pinChangeStep, setPinChangeStep] = useState<"verify-current" | "enter-new" | "confirm-new">("verify-current");
  const [currentPIN, setCurrentPIN] = useState("");
  const [newPIN, setNewPIN] = useState("");
  const [confirmPIN, setConfirmPIN] = useState("");
  const [showCurrentPIN, setShowCurrentPIN] = useState(false);
  const [showNewPIN, setShowNewPIN] = useState(false);
  const [showConfirmPIN, setShowConfirmPIN] = useState(false);
  
  // PIN Reset states
  const [showResetPIN, setShowResetPIN] = useState(false);
  const [resetPINStep, setResetPINStep] = useState<"send-otp" | "verify-otp" | "enter-new" | "confirm-new">("send-otp");
  const [resetOTP, setResetOTP] = useState("");
  const [resetNewPIN, setResetNewPIN] = useState("");
  const [resetConfirmPIN, setResetConfirmPIN] = useState("");
  const [showResetNewPIN, setShowResetNewPIN] = useState(false);
  const [showResetConfirmPIN, setShowResetConfirmPIN] = useState(false);
  const [resetOtpTimer, setResetOtpTimer] = useState(0);
  
  const [notifications, setNotifications] = useState({
    dailyPanchang: true,
    festivalAlerts: true,
    astrologyUpdates: true,
    muhuratReminders: true,
  });
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("english");
  
  // Language dropdown state
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Account deletion state
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleteConfirmStep, setDeleteConfirmStep] = useState<"warning" | "verify" | "final">("warning");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteOTP, setDeleteOTP] = useState("");
  const [deleteOtpTimer, setDeleteOtpTimer] = useState(0);

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
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "malayalam", label: "മലയാളം (Malayalam)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "odia", label: "ଓଡ଼ିଆ (Odia)" },
    { value: "assamese", label: "অসমীয়া (Assamese)" },
    { value: "urdu", label: "اردو (Urdu)" },
    { value: "konkani", label: "कोंकणी (Konkani)" },
    { value: "sindhi", label: "سنڌي (Sindhi)" },
    { value: "kashmiri", label: "कॉशुर (Kashmiri)" },
    { value: "nepali", label: "नेपाली (Nepali)" },
    { value: "manipuri", label: "মৈতৈলোন্ (Manipuri)" },
    { value: "bodo", label: "बर' (Bodo)" },
    { value: "dogri", label: "डोगरी (Dogri)" },
    { value: "maithili", label: "मैथिली (Maithili)" },
    { value: "santali", label: "ᱥᱟᱱᱛᱟᱲᱤ (Santali)" },
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

  // Load security settings from localStorage
  useEffect(() => {
    const authState = localStorage.getItem("vedictime_auth");
    if (authState) {
      const parsed = JSON.parse(authState);
      setBiometricEnabled(parsed.biometricEnabled || false);
    }
  }, []);

  // OTP Timer countdown
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  // Reset OTP Timer countdown
  useEffect(() => {
    if (resetOtpTimer > 0) {
      const interval = setInterval(() => {
        setResetOtpTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resetOtpTimer]);

  // Delete Account OTP Timer countdown
  useEffect(() => {
    if (deleteOtpTimer > 0) {
      const interval = setInterval(() => {
        setDeleteOtpTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [deleteOtpTimer]);

  // Handle phone change flow
  const handleSendOTPToOldPhone = () => {
    setPhoneChangeStep("verify-old");
    setOtpTimer(30);
    toast.success(`OTP sent to ${currentPhone.replace(/\d(?=\d{4})/g, "*")}`);
  };

  const handleVerifyOldPhoneOTP = () => {
    if (oldPhoneOTP.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }
    // Simulate OTP verification
    toast.success("Old phone number verified!");
    setPhoneChangeStep("verify-new");
    setOldPhoneOTP("");
    setOtpTimer(0);
  };

  const handleSendOTPToNewPhone = () => {
    if (newPhone.length !== 10) {
      toast.error("Please enter valid 10-digit phone number");
      return;
    }
    setOtpTimer(30);
    toast.success(`OTP sent to +91 ${newPhone.replace(/\d(?=\d{4})/g, "*")}`);
  };

  const handleVerifyNewPhoneOTP = () => {
    if (newPhoneOTP.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }
    // Simulate OTP verification and update
    const newPhoneFormatted = `+91 ${newPhone}`;
    setCurrentPhone(newPhoneFormatted);
    toast.success("Phone number updated successfully!", {
      description: `Your new number: ${newPhoneFormatted.replace(/\d(?=\d{4})/g, "*")}`,
      duration: 4000,
    });
    setShowChangePhone(false);
    setPhoneChangeStep("enter");
    setNewPhone("");
    setNewPhoneOTP("");
    setOtpTimer(0);
  };

  const handleCancelPhoneChange = () => {
    setShowChangePhone(false);
    setPhoneChangeStep("enter");
    setNewPhone("");
    setOldPhoneOTP("");
    setNewPhoneOTP("");
    setOtpTimer(0);
  };

  // Handle PIN change flow
  const handleVerifyCurrentPIN = () => {
    if (currentPIN.length !== 6) {
      toast.error("Please enter 6-digit PIN");
      return;
    }
    // Simulate PIN verification (in real app, verify against stored PIN)
    const authState = localStorage.getItem("vedictime_auth");
    if (authState) {
      const parsed = JSON.parse(authState);
      if (parsed.pin && parsed.pin !== currentPIN) {
        toast.error("Incorrect PIN. Please try again.");
        return;
      }
    }
    toast.success("Current PIN verified!");
    setPinChangeStep("enter-new");
    setCurrentPIN("");
  };

  const handleEnterNewPIN = () => {
    if (newPIN.length !== 6) {
      toast.error("Please enter 6-digit PIN");
      return;
    }
    toast.success("New PIN entered. Please confirm.");
    setPinChangeStep("confirm-new");
  };

  const handleConfirmNewPIN = () => {
    if (confirmPIN.length !== 6) {
      toast.error("Please enter 6-digit PIN");
      return;
    }
    if (newPIN !== confirmPIN) {
      toast.error("PINs do not match. Please try again.");
      setConfirmPIN("");
      return;
    }
    // Save new PIN to localStorage
    const authState = localStorage.getItem("vedictime_auth");
    if (authState) {
      const parsed = JSON.parse(authState);
      parsed.pin = newPIN;
      localStorage.setItem("vedictime_auth", JSON.stringify(parsed));
    } else {
      localStorage.setItem("vedictime_auth", JSON.stringify({ pin: newPIN }));
    }
    toast.success("PIN changed successfully!", {
      description: "Your new PIN has been saved securely",
      duration: 4000,
    });
    setShowChangePIN(false);
    setPinChangeStep("verify-current");
    setCurrentPIN("");
    setNewPIN("");
    setConfirmPIN("");
    setShowCurrentPIN(false);
    setShowNewPIN(false);
    setShowConfirmPIN(false);
  };

  const handleCancelPINChange = () => {
    setShowChangePIN(false);
    setPinChangeStep("verify-current");
    setCurrentPIN("");
    setNewPIN("");
    setConfirmPIN("");
    setShowCurrentPIN(false);
    setShowNewPIN(false);
    setShowConfirmPIN(false);
  };

  // Handle PIN Reset flow
  const handleSendResetOTP = () => {
    setResetPINStep("verify-otp");
    setResetOtpTimer(30);
    toast.success(`OTP sent to ${currentPhone.replace(/\d(?=\d{4})/g, "*")}`);
    setResetOTP("");
  };

  const handleVerifyResetOTP = () => {
    if (resetOTP.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }
    toast.success("Phone number verified!");
    setResetPINStep("enter-new");
    setResetOTP("");
  };

  const handleEnterResetNewPIN = () => {
    if (resetNewPIN.length !== 6) {
      toast.error("Please enter 6-digit PIN");
      return;
    }
    toast.success("New PIN entered. Please confirm.");
    setResetPINStep("confirm-new");
  };

  const handleConfirmResetNewPIN = () => {
    if (resetConfirmPIN.length !== 6) {
      toast.error("Please enter 6-digit PIN");
      return;
    }
    if (resetNewPIN !== resetConfirmPIN) {
      toast.error("PINs do not match. Please try again.");
      setResetConfirmPIN("");
      return;
    }
    // Save new PIN to localStorage
    const authState = localStorage.getItem("vedictime_auth");
    if (authState) {
      const parsed = JSON.parse(authState);
      parsed.pin = resetNewPIN;
      localStorage.setItem("vedictime_auth", JSON.stringify(parsed));
    } else {
      localStorage.setItem("vedictime_auth", JSON.stringify({ pin: resetNewPIN }));
    }
    toast.success("PIN reset successfully!", {
      description: "Your new PIN has been saved securely",
      duration: 4000,
    });
    setShowResetPIN(false);
    setResetPINStep("send-otp");
    setResetOTP("");
    setResetNewPIN("");
    setResetConfirmPIN("");
    setShowResetNewPIN(false);
    setShowResetConfirmPIN(false);
    setResetOtpTimer(0);
  };

  const handleCancelPINReset = () => {
    setShowResetPIN(false);
    setResetPINStep("send-otp");
    setResetOTP("");
    setResetNewPIN("");
    setResetConfirmPIN("");
    setShowResetNewPIN(false);
    setShowResetConfirmPIN(false);
    setResetOtpTimer(0);
  };

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        toast.success("Profile photo updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle account deletion flow
  const handleSendDeleteOTP = () => {
    setDeleteConfirmStep("verify");
    setDeleteOtpTimer(30);
    toast.success(`OTP sent to ${currentPhone.replace(/\d(?=\d{4})/g, "*")}`);
    setDeleteOTP("");
  };

  const handleVerifyDeleteOTP = () => {
    if (deleteOTP.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }
    toast.success("Phone number verified!");
    setDeleteConfirmStep("final");
    setDeleteOTP("");
  };

  const handleFinalDeleteAccount = () => {
    if (deleteConfirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }
    
    // Simulate account deletion
    toast.success("Account deleted successfully", {
      description: "All your data has been permanently removed",
      duration: 4000,
    });
    
    // Clear all local storage
    localStorage.removeItem("vedictime_auth");
    
    // Close modal and redirect (in real app, would navigate to login)
    setShowDeleteAccount(false);
    setDeleteConfirmStep("warning");
    setDeleteConfirmText("");
  };

  const handleCancelDeleteAccount = () => {
    setShowDeleteAccount(false);
    setDeleteConfirmStep("warning");
    setDeleteConfirmText("");
    setDeleteOTP("");
    setDeleteOtpTimer(0);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6 rounded-b-3xl">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-4">
          {/* Avatar with Photo Upload */}
          <div className="relative">
            <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center text-[#C74225] shadow-lg overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="h-10 w-10" />
              )}
            </div>
            {/* Camera Icon Overlay */}
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-100 transition-colors"
            >
              <Camera className="h-4 w-4 text-[#C74225]" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
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

        {/* Security Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Security Settings</h3>
          </div>

          <div className="space-y-3">
            {/* Change Phone Number */}
            <button
              onClick={() => {
                setShowChangePhone(true);
                toast.info("Phone number change feature - requires OTP verification");
              }}
              className="w-full flex items-center justify-between p-3 bg-[#FFF8E7] rounded-lg hover:bg-[#FFF8E7]/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-[#C74225]" />
                <div className="text-left">
                  <div className="text-[#2C2C2C]">Phone Number</div>
                  <div className="text-xs text-[#6B6B6B]">+91 ••••••5678</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#6B6B6B]" />
            </button>

            <Separator />

            {/* Change PIN */}
            <button
              onClick={() => {
                setShowChangePIN(true);
                toast.info("PIN change feature - requires current PIN verification");
              }}
              className="w-full flex items-center justify-between p-3 bg-[#FFF8E7] rounded-lg hover:bg-[#FFF8E7]/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-[#C74225]" />
                <div className="text-left">
                  <div className="text-[#2C2C2C]">Change PIN</div>
                  <div className="text-xs text-[#6B6B6B]">Update your 6-digit security PIN</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#6B6B6B]" />
            </button>

            <Separator />

            {/* Biometric Authentication */}
            <div className="flex items-center justify-between p-3 bg-[#FFF8E7] rounded-lg">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-[#C74225]" />
                <div>
                  <div className="text-[#2C2C2C]">Biometric Login</div>
                  <div className="text-xs text-[#6B6B6B]">
                    {biometricEnabled ? "Fingerprint/Face ID enabled" : "Quick login with fingerprint"}
                  </div>
                </div>
              </div>
              <Switch
                checked={biometricEnabled}
                onCheckedChange={(checked) => {
                  setBiometricEnabled(checked);
                  const authState = localStorage.getItem("vedictime_auth");
                  if (authState) {
                    const parsed = JSON.parse(authState);
                    parsed.biometricEnabled = checked;
                    localStorage.setItem("vedictime_auth", JSON.stringify(parsed));
                  }
                  toast.success(
                    checked
                      ? "Biometric login enabled"
                      : "Biometric login disabled"
                  );
                }}
              />
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Your security credentials are encrypted and stored securely on your device
              </p>
            </div>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="h-5 w-5 text-[#C74225]" />
            <h3 className="text-[#2C2C2C]">Language</h3>
          </div>

          {/* Custom Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-[#C74225] transition-colors"
            >
              <span className="text-[#2C2C2C]">
                {languages.find(l => l.value === language)?.label || "Select language"}
              </span>
              <ChevronDown className={`h-5 w-5 text-[#6B6B6B] transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showLanguageDropdown && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowLanguageDropdown(false)}
                />
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => {
                        handleLanguageChange(lang.value);
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full flex items-center justify-between p-3 hover:bg-[#FFF8E7] transition-colors text-left"
                    >
                      <span className="text-[#2C2C2C]">{lang.label}</span>
                      {language === lang.value && (
                        <Check className="h-5 w-5 text-[#C74225]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
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

        {/* Danger Zone */}
        <Card className="p-4 border-2 border-red-200 bg-red-50/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="text-red-900 font-medium">Danger Zone</h3>
          </div>
          
          <p className="text-sm text-red-700 mb-4">
            Permanent actions that cannot be undone
          </p>

          <button
            onClick={() => {
              setShowDeleteAccount(true);
              toast.info("Account deletion requires verification");
            }}
            className="w-full flex items-center justify-between p-4 bg-white border-2 border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-left">
                <div className="text-red-900 font-medium">Delete Account</div>
                <div className="text-xs text-red-600">
                  Permanently delete your account and all data
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-red-600" />
          </button>

          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <p className="font-medium mb-1">Warning: This action is irreversible</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>All your birth details will be deleted</li>
                  <li>Your Kundli and astrology data will be lost</li>
                  <li>Premium subscription will be cancelled</li>
                  <li>All saved pujas and favorites will be removed</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Phone Change Modal */}
      {showChangePhone && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-[#C74225]" />
                </div>
                <div>
                  <h3 className="text-[#2C2C2C] font-medium">Change Phone Number</h3>
                  <p className="text-xs text-[#6B6B6B]">
                    {phoneChangeStep === "enter" && "Step 1: Enter new phone number"}
                    {phoneChangeStep === "verify-old" && "Step 2: Verify current number"}
                    {phoneChangeStep === "verify-new" && "Step 3: Verify new number"}
                  </p>
                </div>
              </div>

              {/* Step 1: Enter New Phone */}
              {phoneChangeStep === "enter" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="newPhone">Current Phone Number</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg text-[#2C2C2C]">
                      {currentPhone.replace(/\d(?=\d{4})/g, "*")}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPhone">New Phone Number</Label>
                    <div className="flex gap-2 mt-1">
                      <div className="px-3 py-2 bg-gray-50 rounded-lg text-[#2C2C2C] border border-gray-200">
                        +91
                      </div>
                      <Input
                        id="newPhone"
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="flex-1"
                        maxLength={10}
                      />
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {newPhone.length}/10 digits
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        We'll send OTP to both your current and new phone numbers for verification
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPhoneChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleSendOTPToOldPhone}
                      disabled={newPhone.length !== 10}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Verify Old Phone OTP */}
              {phoneChangeStep === "verify-old" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-[#C74225]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="h-8 w-8 text-[#C74225]" />
                    </div>
                    <p className="text-sm text-[#6B6B6B]">
                      OTP sent to your current number
                    </p>
                    <p className="text-[#2C2C2C] font-medium mt-1">
                      {currentPhone.replace(/\d(?=\d{4})/g, "*")}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="oldPhoneOTP">Enter 6-Digit OTP</Label>
                    <Input
                      id="oldPhoneOTP"
                      type="text"
                      placeholder="000000"
                      value={oldPhoneOTP}
                      onChange={(e) => setOldPhoneOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="mt-1 text-center text-2xl tracking-widest"
                      maxLength={6}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-[#6B6B6B]">
                        {oldPhoneOTP.length}/6 digits
                      </p>
                      {otpTimer > 0 ? (
                        <p className="text-xs text-[#C74225]">
                          Resend in {otpTimer}s
                        </p>
                      ) : (
                        <button
                          onClick={handleSendOTPToOldPhone}
                          className="text-xs text-[#C74225] hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPhoneChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleVerifyOldPhoneOTP}
                      disabled={oldPhoneOTP.length !== 6}
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Verify New Phone OTP */}
              {phoneChangeStep === "verify-new" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-sm text-[#6B6B6B]">
                      OTP sent to your new number
                    </p>
                    <p className="text-[#2C2C2C] font-medium mt-1">
                      +91 {newPhone.replace(/\d(?=\d{4})/g, "*")}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="newPhoneOTP">Enter 6-Digit OTP</Label>
                    <Input
                      id="newPhoneOTP"
                      type="text"
                      placeholder="000000"
                      value={newPhoneOTP}
                      onChange={(e) => setNewPhoneOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="mt-1 text-center text-2xl tracking-widest"
                      maxLength={6}
                      autoFocus
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-[#6B6B6B]">
                        {newPhoneOTP.length}/6 digits
                      </p>
                      {otpTimer > 0 ? (
                        <p className="text-xs text-[#C74225]">
                          Resend in {otpTimer}s
                        </p>
                      ) : (
                        <button
                          onClick={handleSendOTPToNewPhone}
                          className="text-xs text-[#C74225] hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-green-700">
                        Current number verified successfully. Complete verification of new number to update.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPhoneChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleVerifyNewPhoneOTP}
                      disabled={newPhoneOTP.length !== 6}
                    >
                      Complete Change
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* PIN Change Modal */}
      {showChangePIN && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                  <Key className="h-6 w-6 text-[#C74225]" />
                </div>
                <div>
                  <h3 className="text-[#2C2C2C] font-medium">Change PIN</h3>
                  <p className="text-xs text-[#6B6B6B]">
                    {pinChangeStep === "verify-current" && "Step 1: Verify current PIN"}
                    {pinChangeStep === "enter-new" && "Step 2: Enter new PIN"}
                    {pinChangeStep === "confirm-new" && "Step 3: Confirm new PIN"}
                  </p>
                </div>
              </div>

              {/* Step 1: Verify Current PIN */}
              {pinChangeStep === "verify-current" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPIN">Enter Current PIN</Label>
                    <div className="relative mt-1">
                      <Input
                        id="currentPIN"
                        type={showCurrentPIN ? "text" : "password"}
                        placeholder="000000"
                        value={currentPIN}
                        onChange={(e) => setCurrentPIN(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowCurrentPIN(!showCurrentPIN)}
                      >
                        {showCurrentPIN ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {currentPIN.length}/6 digits
                    </p>
                  </div>

                  {/* Forgot PIN Link */}
                  <button
                    onClick={() => {
                      setShowChangePIN(false);
                      setShowResetPIN(true);
                      setCurrentPIN("");
                      setShowCurrentPIN(false);
                    }}
                    className="w-full text-center text-sm text-[#C74225] hover:underline"
                  >
                    Forgot PIN? Reset with OTP
                  </button>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPINChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleVerifyCurrentPIN}
                      disabled={currentPIN.length !== 6}
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Enter New PIN */}
              {pinChangeStep === "enter-new" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="newPIN">Enter New PIN</Label>
                    <div className="relative mt-1">
                      <Input
                        id="newPIN"
                        type={showNewPIN ? "text" : "password"}
                        placeholder="000000"
                        value={newPIN}
                        onChange={(e) => setNewPIN(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowNewPIN(!showNewPIN)}
                      >
                        {showNewPIN ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {newPIN.length}/6 digits
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPINChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleEnterNewPIN}
                      disabled={newPIN.length !== 6}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm New PIN */}
              {pinChangeStep === "confirm-new" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="confirmPIN">Confirm New PIN</Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPIN"
                        type={showConfirmPIN ? "text" : "password"}
                        placeholder="000000"
                        value={confirmPIN}
                        onChange={(e) => setConfirmPIN(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPIN(!showConfirmPIN)}
                      >
                        {showConfirmPIN ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {confirmPIN.length}/6 digits
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPINChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleConfirmNewPIN}
                      disabled={confirmPIN.length !== 6}
                    >
                      Complete Change
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* PIN Reset Modal */}
      {showResetPIN && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                  <Key className="h-6 w-6 text-[#C74225]" />
                </div>
                <div>
                  <h3 className="text-[#2C2C2C] font-medium">Reset PIN</h3>
                  <p className="text-xs text-[#6B6B6B]">
                    {resetPINStep === "send-otp" && "Step 1: Send OTP"}
                    {resetPINStep === "verify-otp" && "Step 2: Verify OTP"}
                    {resetPINStep === "enter-new" && "Step 3: Enter new PIN"}
                    {resetPINStep === "confirm-new" && "Step 4: Confirm new PIN"}
                  </p>
                </div>
              </div>

              {/* Step 1: Send OTP */}
              {resetPINStep === "send-otp" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-[#C74225]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="h-8 w-8 text-[#C74225]" />
                    </div>
                    <p className="text-sm text-[#6B6B6B]">
                      We'll send an OTP to your registered phone number
                    </p>
                    <p className="text-[#2C2C2C] font-medium mt-2">
                      {currentPhone.replace(/\d(?=\d{4})/g, "*")}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        After OTP verification, you'll be able to set a new 6-digit PIN
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPINReset}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleSendResetOTP}
                    >
                      Send OTP
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Verify OTP */}
              {resetPINStep === "verify-otp" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-[#C74225]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="h-8 w-8 text-[#C74225]" />
                    </div>
                    <p className="text-sm text-[#6B6B6B]">
                      OTP sent to your current number
                    </p>
                    <p className="text-[#2C2C2C] font-medium mt-1">
                      {currentPhone.replace(/\d(?=\d{4})/g, "*")}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="resetOTP">Enter 6-Digit OTP</Label>
                    <Input
                      id="resetOTP"
                      type="text"
                      placeholder="000000"
                      value={resetOTP}
                      onChange={(e) => setResetOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="mt-1 text-center text-2xl tracking-widest"
                      maxLength={6}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-[#6B6B6B]">
                        {resetOTP.length}/6 digits
                      </p>
                      {resetOtpTimer > 0 ? (
                        <p className="text-xs text-[#C74225]">
                          Resend in {resetOtpTimer}s
                        </p>
                      ) : (
                        <button
                          onClick={handleSendResetOTP}
                          className="text-xs text-[#C74225] hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPINReset}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleVerifyResetOTP}
                      disabled={resetOTP.length !== 6}
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Enter New PIN */}
              {resetPINStep === "enter-new" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resetNewPIN">Enter New PIN</Label>
                    <div className="relative mt-1">
                      <Input
                        id="resetNewPIN"
                        type={showResetNewPIN ? "text" : "password"}
                        placeholder="000000"
                        value={resetNewPIN}
                        onChange={(e) => setResetNewPIN(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowResetNewPIN(!showResetNewPIN)}
                      >
                        {showResetNewPIN ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {resetNewPIN.length}/6 digits
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPINReset}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleEnterResetNewPIN}
                      disabled={resetNewPIN.length !== 6}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm New PIN */}
              {resetPINStep === "confirm-new" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resetConfirmPIN">Confirm New PIN</Label>
                    <div className="relative mt-1">
                      <Input
                        id="resetConfirmPIN"
                        type={showResetConfirmPIN ? "text" : "password"}
                        placeholder="000000"
                        value={resetConfirmPIN}
                        onChange={(e) => setResetConfirmPIN(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowResetConfirmPIN(!showResetConfirmPIN)}
                      >
                        {showResetConfirmPIN ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {resetConfirmPIN.length}/6 digits
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelPINReset}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      onClick={handleConfirmResetNewPIN}
                      disabled={resetConfirmPIN.length !== 6}
                    >
                      Complete Change
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-red-900 font-medium">Delete Account</h3>
                  <p className="text-xs text-[#6B6B6B]">
                    {deleteConfirmStep === "warning" && "Step 1: Important warning"}
                    {deleteConfirmStep === "verify" && "Step 2: Verify with OTP"}
                    {deleteConfirmStep === "final" && "Step 3: Final confirmation"}
                  </p>
                </div>
              </div>

              {/* Step 1: Warning */}
              {deleteConfirmStep === "warning" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trash2 className="h-10 w-10 text-red-600" />
                    </div>
                    <h4 className="text-red-900 font-medium mb-2">
                      Are you absolutely sure?
                    </h4>
                    <p className="text-sm text-[#6B6B6B]">
                      This action cannot be undone. This will permanently delete your account.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-red-900 mb-2">
                      What will be deleted:
                    </p>
                    <div className="space-y-2 text-sm text-red-800">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>All your personal and birth details</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>Your complete Kundli and astrology charts</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>Premium subscription and payment history</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>Saved pujas, favorites, and preferences</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>All notification and reminder settings</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">
                        For security, we'll send an OTP to your registered phone number to verify this action
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelDeleteAccount}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      onClick={handleSendDeleteOTP}
                    >
                      Continue to Delete
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Verify OTP */}
              {deleteConfirmStep === "verify" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="h-8 w-8 text-red-600" />
                    </div>
                    <p className="text-sm text-[#6B6B6B]">
                      OTP sent to your phone number
                    </p>
                    <p className="text-[#2C2C2C] font-medium mt-1">
                      {currentPhone.replace(/\d(?=\d{4})/g, "*")}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="deleteOTP">Enter 6-Digit OTP</Label>
                    <Input
                      id="deleteOTP"
                      type="text"
                      placeholder="000000"
                      value={deleteOTP}
                      onChange={(e) => setDeleteOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="mt-1 text-center text-2xl tracking-widest"
                      maxLength={6}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-[#6B6B6B]">
                        {deleteOTP.length}/6 digits
                      </p>
                      {deleteOtpTimer > 0 ? (
                        <p className="text-xs text-red-600">
                          Resend in {deleteOtpTimer}s
                        </p>
                      ) : (
                        <button
                          onClick={handleSendDeleteOTP}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">
                        One more step after this to permanently delete your account
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelDeleteAccount}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      onClick={handleVerifyDeleteOTP}
                      disabled={deleteOTP.length !== 6}
                    >
                      Verify OTP
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Final Confirmation */}
              {deleteConfirmStep === "final" && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-10 w-10 text-red-600" />
                    </div>
                    <h4 className="text-red-900 font-medium mb-2">
                      Final Confirmation
                    </h4>
                    <p className="text-sm text-[#6B6B6B]">
                      This is your last chance to back out. Type <strong>DELETE</strong> to confirm.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="deleteConfirmText">
                      Type <span className="font-mono font-bold text-red-600">DELETE</span> to confirm
                    </Label>
                    <Input
                      id="deleteConfirmText"
                      type="text"
                      placeholder="Type DELETE here"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="mt-1 text-center font-mono font-bold"
                    />
                    <p className="text-xs text-[#6B6B6B] mt-1 text-center">
                      {deleteConfirmText === "DELETE" ? (
                        <span className="text-green-600 font-medium">✓ Confirmed</span>
                      ) : (
                        <span>Type exactly as shown (case sensitive)</span>
                      )}
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                    <div className="flex items-start gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-900 mb-1">
                          ⚠️ Last Warning
                        </p>
                        <p className="text-xs text-red-800">
                          Once you click "Delete My Account", all your data will be permanently erased from our servers within 24 hours. This action is irreversible and cannot be recovered.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCancelDeleteAccount}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Keep My Account
                    </Button>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleFinalDeleteAccount}
                      disabled={deleteConfirmText !== "DELETE"}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete My Account
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}