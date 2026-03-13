import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  BookOpen,
  ShoppingBag,
  Users,
  Crown,
  Bell,
  Settings,
  TrendingUp,
  Activity,
  DollarSign,
  UserPlus,
  Lightbulb,
} from "lucide-react";

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const stats = [
    {
      title: "Total Users",
      value: "12,453",
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Premium Subscribers",
      value: "2,891",
      change: "+23% from last month",
      icon: Crown,
      color: "text-[#FFD700]",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Monthly Revenue",
      value: "₹4,52,300",
      change: "+18% from last month",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Sessions",
      value: "3,842",
      change: "Currently online",
      icon: Activity,
      color: "text-[#C74225]",
      bgColor: "bg-orange-50",
    },
  ];

  const managementSections = [
    {
      id: "panchang",
      title: "Panchang Management",
      description: "Manage daily panchang data, timings, and calculations",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "festivals",
      title: "Festival Management",
      description: "Add and edit festivals, pujas, and celebrations",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "content",
      title: "Content Settings",
      description: "Manage Thought of the Day and daily wisdom quotes",
      icon: Lightbulb,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "myth-buster",
      title: "Myth Buster Management",
      description: "Manage daily astrology myths and educational content",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "shloka",
      title: "Today's Shloka",
      description: "Manage daily Sanskrit shlokas with translations",
      icon: BookOpen,
      color: "text-[#C74225]",
      bgColor: "bg-orange-50",
    },
    {
      id: "astrology",
      title: "Astrology Content",
      description: "Manage horoscopes, predictions, and zodiac content",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: "pujas",
      title: "Puja Library",
      description: "Manage puja guides, mantras, and audio content",
      icon: BookOpen,
      color: "text-[#C74225]",
      bgColor: "bg-orange-50",
    },
    {
      id: "shop",
      title: "Shop Management",
      description: "Manage products, inventory, and orders",
      icon: ShoppingBag,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "users",
      title: "User Management",
      description: "View and manage user accounts and profiles",
      icon: Users,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      id: "subscriptions",
      title: "Subscription Plans",
      description: "Manage premium plans, pricing, and features",
      icon: Crown,
      color: "text-[#FFD700]",
      bgColor: "bg-yellow-50",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Send push notifications and alerts to users",
      icon: Bell,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const recentActivity = [
    {
      user: "Admin",
      action: "Updated Mahashivratri festival details",
      time: "5 minutes ago",
    },
    {
      user: "Content Manager",
      action: "Added new daily horoscope for Aries",
      time: "15 minutes ago",
    },
    {
      user: "Admin",
      action: "Created new Puja guide: Lakshmi Puja",
      time: "1 hour ago",
    },
    {
      user: "Shop Manager",
      action: "Added 15 new products to shop",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900">VedicTime Admin Panel</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your entire app from one place
            </p>
          </div>
          <Button className="bg-[#C74225] hover:bg-[#C74225]/90">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl text-gray-900 mt-1">{stat.value}</h3>
                    <p className="text-xs text-green-600 mt-2">{stat.change}</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Management Sections */}
        <div>
          <h2 className="text-lg text-gray-900 mb-4">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {managementSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onNavigate(section.id)}
                >
                  <div className={`${section.bgColor} ${section.color} p-3 rounded-lg w-fit mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-gray-900 mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4 lg:col-span-2">
            <h3 className="text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-[#C74225] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                    {activity.user[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                className="w-full bg-[#C74225] hover:bg-[#C74225]/90"
                onClick={() => onNavigate("festivals")}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Add New Festival
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate("content")}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Manage Thought of Day
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate("panchang")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Update Panchang
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate("notifications")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate("shop")}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}