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
import { KundaliGenerator } from "./components/vedic/KundaliGenerator";
import { ZodiacCompatibility } from "./components/vedic/ZodiacCompatibility";
import { Premium } from "./components/vedic/Premium";
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

  // Render Mobile App (User-facing)
  if (!hasCompletedOnboarding) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      <div className="relative">
        {currentScreen === "dashboard" && (
          <VedicDashboard onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "panchang" && (
          <PanchangDetail onBack={handleBack} />
        )}
        
        {currentScreen === "complete-panchang" && (
          <CompletePanchang onBack={handleBack} />
        )}
        
        {currentScreen === "festival-detail" && (
          <FestivalDetail 
            onBack={handleBack} 
            festival={selectedData}
          />
        )}
        
        {currentScreen === "festival-calendar" && (
          <FestivalCalendar onBack={handleBack} onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "astrology" && (
          <Astrology onBack={handleBack} onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "kundali" && (
          <KundaliGenerator onBack={handleBack} />
        )}
        
        {currentScreen === "compatibility" && (
          <ZodiacCompatibility onBack={handleBack} />
        )}
        
        {currentScreen === "puja-library" && (
          <PujaLibrary onBack={handleBack} onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "puja-shop" && (
          <PujaShop onBack={handleBack} />
        )}
        
        {currentScreen === "profile" && (
          <VedicProfile onBack={handleBack} />
        )}
        
        {currentScreen === "notifications" && (
          <Notifications onBack={handleBack} onNavigate={handleNavigation} />
        )}
        
        {currentScreen === "premium" && (
          <Premium onBack={handleBack} />
        )}

        {/* Bottom Navigation - Only show on main screens */}
        {["dashboard", "complete-panchang", "festival-calendar", "astrology", "puja-library", "puja-shop"].includes(currentScreen) && (
          <VedicBottomNav 
            activeScreen={currentScreen} 
            onNavigate={handleNavigation} 
          />
        )}
      </div>
    </>
  );
}