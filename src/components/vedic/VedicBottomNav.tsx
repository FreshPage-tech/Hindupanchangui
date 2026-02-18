import { Home, Calendar, Star, BookOpen, ShoppingBag } from "lucide-react";

interface VedicBottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function VedicBottomNav({ activeScreen, onNavigate }: VedicBottomNavProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "completePanchang", label: "Panchang", icon: Calendar },
    { id: "astrology", label: "Astrology", icon: Star },
    { id: "pujaLibrary", label: "Puja", icon: BookOpen },
    { id: "shop", label: "Shop", icon: ShoppingBag },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors relative"
            >
              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? "text-[#C74225]" : "text-[#6B6B6B]"
                }`}
              />
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive ? "text-[#C74225]" : "text-[#6B6B6B]"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#C74225] rounded-b-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
