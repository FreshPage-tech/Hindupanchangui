import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Fingerprint, Check } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface BiometricSetupProps {
  onComplete: (enabled: boolean) => void;
  onSkip: () => void;
}

export function BiometricSetup({ onComplete, onSkip }: BiometricSetupProps) {
  const [isEnabling, setIsEnabling] = useState(false);

  const handleEnableBiometric = () => {
    setIsEnabling(true);

    // Simulate biometric authentication
    setTimeout(() => {
      setIsEnabling(false);
      toast.success("Biometric authentication enabled!");
      onComplete(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C74225] via-[#B8391E] to-[#942D17] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#C74225] to-[#942D17] rounded-full flex items-center justify-center mx-auto mb-4">
            <Fingerprint className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl text-foreground mb-2">
            Enable Biometric Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Use your fingerprint or face ID for quick and secure access
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm text-foreground font-medium">Quick Access</h3>
              <p className="text-xs text-muted-foreground">
                Login instantly without entering PIN
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm text-foreground font-medium">Enhanced Security</h3>
              <p className="text-xs text-muted-foreground">
                Your biometric data never leaves your device
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm text-foreground font-medium">Convenient</h3>
              <p className="text-xs text-muted-foreground">
                No need to remember or type your PIN
              </p>
            </div>
          </div>
        </div>

        {/* Enable Button */}
        <Button
          onClick={handleEnableBiometric}
          disabled={isEnabling}
          className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white mb-3"
        >
          {isEnabling ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enabling...
            </>
          ) : (
            <>
              <Fingerprint className="h-4 w-4 mr-2" />
              Enable Biometric Login
            </>
          )}
        </Button>

        {/* Skip Button */}
        <Button
          onClick={onSkip}
          variant="ghost"
          className="w-full"
        >
          Skip for Now
        </Button>

        {/* Info */}
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/30 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-400 text-center">
            You can enable or disable biometric login anytime from your profile settings
          </p>
        </div>
      </Card>
    </div>
  );
}
