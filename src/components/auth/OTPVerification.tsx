import { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowLeft, Smartphone, Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface OTPVerificationProps {
  onVerified: (phoneNumber: string) => void;
}

export function OTPVerification({ onVerified }: OTPVerificationProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setCountdown(30);
      toast.success("OTP sent to +91 " + phoneNumber);
      // Focus first OTP input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, 1000);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits entered
    if (index === 5 && value) {
      const otpValue = newOtp.join("");
      if (otpValue.length === 6) {
        handleVerifyOTP(otpValue);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join("");
    
    if (otpToVerify.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    setIsLoading(true);

    // Simulate API verification (Demo: any 6 digits work)
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Phone number verified successfully!");
      onVerified(phoneNumber);
    }, 1000);
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    
    setOtp(["", "", "", "", "", ""]);
    setCountdown(30);
    toast.success("OTP resent successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C74225] via-[#B8391E] to-[#942D17] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#C74225] to-[#942D17] rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl text-foreground mb-2">
            {step === "phone" ? "Verify Phone Number" : "Enter OTP"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === "phone"
              ? "We'll send you a verification code"
              : `Code sent to +91 ${phoneNumber}`}
          </p>
        </div>

        {step === "phone" ? (
          <>
            {/* Phone Number Input */}
            <div className="mb-6">
              <label className="block text-sm text-foreground mb-2">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="w-16 bg-muted rounded-lg flex items-center justify-center text-foreground">
                  +91
                </div>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }}
                  className="flex-1 bg-white text-gray-900 border-gray-300"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Send OTP Button */}
            <Button
              onClick={handleSendOTP}
              disabled={phoneNumber.length !== 10 || isLoading}
              className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("phone")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Change Number
            </Button>

            {/* OTP Input */}
            <div className="mb-6">
              <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold bg-white text-gray-900 border-gray-300"
                  />
                ))}
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend OTP in {countdown}s
                  </p>
                ) : (
                  <Button
                    variant="link"
                    onClick={handleResendOTP}
                    className="text-[#C74225]"
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={() => handleVerifyOTP()}
              disabled={otp.join("").length !== 6 || isLoading}
              className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>Your data is secure and encrypted</span>
          </div>
        </div>
      </Card>
    </div>
  );
}