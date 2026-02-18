import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  Bell,
  Moon,
  Globe,
  Lock,
  LogOut,
  Edit,
  ChevronRight,
  Heart,
  BookOpen
} from "lucide-react";

interface ProfileProps {
  onBack: () => void;
  onLogout: () => void;
}

export function Profile({ onBack, onLogout }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6 pb-16">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white">Profile</h1>
      </div>

      <div className="px-4 -mt-12 space-y-4">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#C74225] to-[#942D17] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl">RK</span>
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">Rajesh Kumar</h2>
              <Badge className="bg-[#C74225]/10 text-[#C74225] mb-2">
                Swayamsevak
              </Badge>
              <p className="text-sm text-gray-600">Member since Jan 2020</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Edit className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
            <div className="text-center">
              <div className="text-[#C74225] mb-1">93%</div>
              <div className="text-xs text-gray-600">Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-[#C74225] mb-1">28</div>
              <div className="text-xs text-gray-600">Seva Hours</div>
            </div>
            <div className="text-center">
              <div className="text-[#C74225] mb-1">12</div>
              <div className="text-xs text-gray-600">Events</div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-4">
          <h3 className="mb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#C74225]" />
              <div className="flex-1">
                <div className="text-xs text-gray-600 mb-1">Phone</div>
                <div className="text-gray-900">+91 98765 43210</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#C74225]" />
              <div className="flex-1">
                <div className="text-xs text-gray-600 mb-1">Email</div>
                <div className="text-gray-900">rajesh.kumar@email.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#C74225]" />
              <div className="flex-1">
                <div className="text-xs text-gray-600 mb-1">Address</div>
                <div className="text-gray-900">Sector 15, Noida, UP</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#C74225]" />
              <div className="flex-1">
                <div className="text-xs text-gray-600 mb-1">Date of Birth</div>
                <div className="text-gray-900">January 15, 1990</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Shakha Information */}
        <Card className="p-4">
          <h3 className="mb-4">Shakha Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900 mb-1">Sector 15 Morning Shakha</div>
                <div className="text-sm text-gray-600">Your primary shakha</div>
              </div>
              <Badge className="bg-green-100 text-green-700">Active</Badge>
            </div>

            <div className="pt-3 border-t">
              <div className="text-sm text-gray-600 mb-2">Roles & Responsibilities</div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#C74225]/10 text-[#C74225]">
                  Member
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  Volunteer
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4">
          <h3 className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-[#C74225]" />
            Achievements
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Perfect Attendance</h4>
                <p className="text-sm text-gray-600">15 days streak</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-[#C74225]" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Seva Champion</h4>
                <p className="text-sm text-gray-600">Completed 5 seva projects</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#C74225]/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-[#C74225]" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Knowledge Seeker</h4>
                <p className="text-sm text-gray-600">Completed 10 bauddhik sessions</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4">
          <h3 className="mb-4">Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <Label htmlFor="notifications" className="cursor-pointer">Notifications</Label>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-gray-600" />
                <Label htmlFor="dark-mode" className="cursor-pointer">Dark Mode</Label>
              </div>
              <Switch id="dark-mode" />
            </div>

            <button className="flex items-center justify-between w-full py-2">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-gray-600" />
                <span>Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">English</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>

            <button className="flex items-center justify-between w-full py-2">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-600" />
                <span>Privacy & Security</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 py-4">
          <p>संघ Shakha App v1.0.0</p>
          <p className="mt-1">© 2025 Rashtriya Swayamsevak Sangh</p>
        </div>
      </div>
    </div>
  );
}
