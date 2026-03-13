import { useState, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PINSetupProps {
  onSetup: (pin: string) => void;
  isReturningUser?: boolean;
  existingPIN?: string;
}

export function PINSetup({ onSetup, isReturningUser = false, existingPIN }: PINSetupProps) {
  const [step, setStep] = useState<"enter" | "confirm">(isReturningUser ? "enter" : "enter");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", "", "", ""]);
  const [showPIN, setShowPIN] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePINChange = (index: number, value: string, isConfirm: boolean = false) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const currentPin = isConfirm ? confirmPin : pin;
    const setCurrentPin = isConfirm ? setConfirmPin : setPin;
    const refs = isConfirm ? confirmInputRefs : inputRefs;

    const newPin = [...currentPin];
    newPin[index] = value;
    setCurrentPin(newPin);

    // Auto-focus next input
    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }

    // Auto-submit or move to confirm
    if (index === 5 && value) {
      const pinValue = newPin.join("");
      if (pinValue.length === 6) {
        if (isReturningUser && !isConfirm) {
          handleVerifyPIN(pinValue);
        } else if (!isReturningUser && !isConfirm) {
          setTimeout(() => {
            setStep("confirm");
            setTimeout(() => confirmInputRefs.current[0]?.focus(), 100);
          }, 200);
        } else if (isConfirm) {
          handleConfirmPIN(pinValue);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>, isConfirm: boolean = false) => {
    const currentPin = isConfirm ? confirmPin : pin;
    const refs = isConfirm ? confirmInputRefs : inputRefs;

    if (e.key === "Backspace" && !currentPin[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleVerifyPIN = (enteredPIN: string) => {
    if (enteredPIN === existingPIN) {
      toast.success("PIN verified successfully!");
      onSetup(enteredPIN);
    } else {
      toast.error("Incorrect PIN. Please try again.");
      setPin(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  };

  const handleConfirmPIN = (enteredConfirmPIN: string) => {
    const enteredPIN = pin.join("");
    
    if (enteredPIN !== enteredConfirmPIN) {
      toast.error("PINs do not match. Please try again.");
      setConfirmPin(["", "", "", "", "", ""]);
      setTimeout(() => confirmInputRefs.current[0]?.focus(), 100);
      return;
    }

    toast.success("PIN created successfully!");
    onSetup(enteredPIN);
  };

  const handleContinue = () => {
    if (isReturningUser) {
      const enteredPIN = pin.join("");
      if (enteredPIN.length !== 6) {
        toast.error("Please enter your 6-digit PIN");
        return;
      }
      handleVerifyPIN(enteredPIN);
    } else if (step === "confirm") {
      const enteredConfirmPIN = confirmPin.join("");
      if (enteredConfirmPIN.length !== 6) {
        toast.error("Please confirm your PIN");
        return;
      }
      handleConfirmPIN(enteredConfirmPIN);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C74225] via-[#B8391E] to-[#942D17] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#C74225] to-[#942D17] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl text-foreground mb-2">
            {isReturningUser
              ? "Enter Your PIN"
              : step === "enter"
              ? "Create Your PIN"
              : "Confirm Your PIN"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isReturningUser
              ? "Enter your 6-digit PIN to continue"
              : step === "enter"
              ? "Create a 6-digit PIN to secure your account"
              : "Re-enter your PIN to confirm"}
          </p>
        </div>

        {/* PIN Input */}
        {(step === "enter" || isReturningUser) && (
          <div className="mb-6">
            <div className="flex gap-2 justify-center mb-4">
              {pin.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type={showPIN ? "tel" : "password"}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePINChange(index, e.target.value, false)}
                  onKeyDown={(e) => handleKeyDown(index, e, false)}
                  className="w-12 h-12 text-center text-lg font-semibold bg-white text-gray-900 border-gray-300"
                />
              ))}
            </div>

            {/* Show/Hide PIN */}
            <div className="flex justify-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPIN(!showPIN)}
                className="text-muted-foreground"
              >
                {showPIN ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide PIN
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show PIN
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Confirm PIN Input */}
        {step === "confirm" && !isReturningUser && (
          <div className="mb-6">
            <div className="flex gap-2 justify-center mb-4">
              {confirmPin.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    if (el) confirmInputRefs.current[index] = el;
                  }}
                  type={showPIN ? "tel" : "password"}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePINChange(index, e.target.value, true)}
                  onKeyDown={(e) => handleKeyDown(index, e, true)}
                  className="w-12 h-12 text-center text-lg font-semibold bg-white text-gray-900 border-gray-300"
                />
              ))}
            </div>

            {/* Show/Hide PIN */}
            <div className="flex justify-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPIN(!showPIN)}
                className="text-muted-foreground"
              >
                {showPIN ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide PIN
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show PIN
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {!isReturningUser && step === "enter" && pin.join("").length === 6 && (
          <Button
            onClick={() => {
              setStep("confirm");
              setTimeout(() => confirmInputRefs.current[0]?.focus(), 100);
            }}
            className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            Continue
          </Button>
        )}

        {(isReturningUser || step === "confirm") && (
          <Button
            onClick={handleContinue}
            disabled={
              isReturningUser
                ? pin.join("").length !== 6
                : confirmPin.join("").length !== 6
            }
            className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            {isReturningUser ? "Unlock" : "Confirm PIN"}
          </Button>
        )}

        {/* Info */}
        <div className="mt-6 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            {isReturningUser
              ? "Forgot your PIN? Contact support to reset"
              : "Remember this PIN. You'll need it to access the app"}
          </p>
        </div>
      </Card>
    </div>
  );
}