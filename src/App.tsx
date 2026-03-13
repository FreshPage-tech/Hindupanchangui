import { useState, useEffect } from "react";
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
import { OTPVerification } from "./components/auth/OTPVerification";
import { PINSetup } from "./components/auth/PINSetup";
import { BiometricSetup } from "./components/auth/BiometricSetup";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [authState, setAuthState] = useState<{
    phoneVerified: boolean;
    pinSetup: boolean;
    biometricEnabled: boolean;
    phoneNumber: string;
    pin: string;
    isAuthenticated: boolean;
  }>({
    phoneVerified: false,
    pinSetup: false,
    biometricEnabled: false,
    phoneNumber: "",
    pin: "",
    isAuthenticated: false,
  });
  
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [selectedData, setSelectedData] = useState<any>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuthState = localStorage.getItem("vedictime_auth");
    if (savedAuthState) {
      const parsedState = JSON.parse(savedAuthState);
      setAuthState({ ...parsedState, isAuthenticated: false });
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (authState.phoneVerified || authState.pinSetup) {
      localStorage.setItem("vedictime_auth", JSON.stringify(authState));
    }
  }, [authState]);

  const handlePhoneVerified = (phoneNumber: string) => {
    setAuthState({ ...authState, phoneVerified: true, phoneNumber });
  };

  const handlePINSetup = (pin: string) => {
    setAuthState({
      ...authState,
      pinSetup: true,
      pin,
      isAuthenticated: true,
    });
  };

  const handleBiometricComplete = (enabled: boolean) => {
    setAuthState({ ...authState, biometricEnabled: enabled });
  };

  const handleBiometricSkip = () => {
    setAuthState({ ...authState, biometricEnabled: false });
  };

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

  // Authentication Flow
  // Returning user with PIN setup
  if (authState.pinSetup && !authState.isAuthenticated) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <PINSetup
          onSetup={handlePINSetup}
          isReturningUser={true}
          existingPIN={authState.pin}
        />
      </>
    );
  }

  // New user - Phone verification
  if (!authState.phoneVerified) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <OTPVerification onVerified={handlePhoneVerified} />
      </>
    );
  }

  // New user - PIN setup
  if (!authState.pinSetup) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <PINSetup onSetup={handlePINSetup} />
      </>
    );
  }

  // New user - Biometric setup (only shown once)
  if (!authState.biometricEnabled && !localStorage.getItem("vedictime_biometric_setup_shown")) {
    localStorage.setItem("vedictime_biometric_setup_shown", "true");
    return (
      <>
        <Toaster position="top-center" richColors />
        <BiometricSetup
          onComplete={handleBiometricComplete}
          onSkip={handleBiometricSkip}
        />
      </>
    );
  }

  // Onboarding
  if (!hasCompletedOnboarding) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />
      </>
    );
  }

  // Render Mobile App (User-facing)
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
            onNavigate={handleNavigation}
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