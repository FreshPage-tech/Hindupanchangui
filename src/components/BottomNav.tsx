import { Home, Calendar, Heart, BookOpen, User } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "shakha", label: "Shakha", icon: Calendar },
    { id: "events", label: "Events", icon: Calendar },
    { id: "seva", label: "Seva", icon: Heart },
    { id: "library", label: "Library", icon: BookOpen },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-[#C74225]" : "text-gray-500"
                }`}
              />
              <span
                className={`text-xs mt-1 ${
                  isActive ? "text-[#C74225]" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
