import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Flame } from "lucide-react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setStep("otp");
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#C74225] via-[#C74225]/80 to-[#942D17]">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Flame className="h-10 w-10 text-[#C74225]" />
          </div>
          <h1 className="text-white text-center mb-2">संघ Shakha</h1>
          <p className="text-white/90 text-center">
            सेवा • समर्पण • संगठन
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-center mb-2">Welcome</h2>
                <p className="text-gray-600 text-center">
                  Enter your mobile number to continue
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 border border-gray-300 rounded-lg bg-gray-50">
                    <span className="text-gray-700">+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="flex-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={phone.length !== 10}
                className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
              >
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-center mb-2">Verify OTP</h2>
                <p className="text-gray-600 text-center">
                  Enter the 6-digit code sent to +91 {phone}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="text-center tracking-widest"
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full bg-[#C74225] hover:bg-[#C74225]/90 text-white"
              >
                Verify & Login
              </Button>

              <button
                onClick={() => setStep("phone")}
                className="w-full text-gray-600 text-center"
              >
                Change Number
              </button>
            </div>
          )}
        </div>

        <p className="text-white text-center mt-6 text-sm">
          Powered by Rashtriya Swayamsevak Sangh
        </p>
      </div>
    </div>
  );
}
