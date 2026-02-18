import { useState } from "react";
import { Onboarding } from "./components/vedic/Onboarding";
import { VedicDashboard } from "./components/vedic/VedicDashboard";
import { PanchangDetail } from "./components/vedic/PanchangDetail";
import { CompletePanchang } from "./components/vedic/CompletePanchang";
import { FestivalDetail } from "./components/vedic/FestivalDetail";
import { FestivalCalendar } from "./components/vedic/FestivalCalendar";
import { Astrology } from "./components/vedic/Astrology";
import { PujaShop } from "./components/vedic/PujaShop";
import { PujaLibrary } from "./components/vedic/PujaLibrary";
import { VedicProfile } from "./components/vedic/VedicProfile";
import { Notifications } from "./components/vedic/Notifications";
import { VedicBottomNav } from "./components/vedic/VedicBottomNav";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleNavigation = (screen: string, data?: any) => {
    setCurrentScreen(screen);
    if (data) {
      setSelectedData(data);
    }
  };

  const handleBack = () => {
    setCurrentScreen("dashboard");
    setSelectedData(null);
  };

  if (!hasCompletedOnboarding) {
    return (
      <>
        <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      {/* Main Content Area */}
      <div className="max-w-md mx-auto bg-[#FFF8E7] min-h-screen shadow-xl">
        {currentScreen === "dashboard" && (
          <VedicDashboard onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "panchang" && (
          <PanchangDetail onBack={handleBack} />
        )}
        
        {currentScreen === "completePanchang" && (
          <CompletePanchang onBack={handleBack} />
        )}
        
        {currentScreen === "festivalDetail" && (
          <FestivalDetail onBack={handleBack} onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "calendar" && (
          <FestivalCalendar 
            onBack={handleBack} 
            onViewFestival={(festivalId) => handleNavigation("festivalDetail", { festivalId })}
          />
        )}
        
        {currentScreen === "astrology" && (
          <Astrology onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "shop" && (
          <PujaShop onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "pujaLibrary" && (
          <PujaLibrary onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "profile" && (
          <VedicProfile onBack={handleBack} />
        )}
        
        {currentScreen === "notifications" && (
          <Notifications onBack={handleBack} onNavigate={handleNavigation} />
        )}

        {/* Bottom Navigation */}
        <VedicBottomNav 
          activeScreen={currentScreen} 
          onNavigate={handleNavigation} 
        />
      </div>

      <Toaster />
    </div>
  );
}
