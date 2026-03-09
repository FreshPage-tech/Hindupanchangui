import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, Check, Crown, Sparkles, Star, Zap } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PremiumProps {
  onBack: () => void;
}

export function Premium({ onBack }: PremiumProps) {
  const handleStartTrial = () => {
    toast.success("7-day free trial started! Enjoy premium features.");
  };

  const handleSubscribe = (plan: string) => {
    toast.success(`${plan} subscription selected. Payment page coming soon.`);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#D4AF37]/20 to-white border-b border-gray-100 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#2C2C2C]" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-[#D4AF37]" />
              <h1 className="text-[#2C2C2C]">VedicTime Premium</h1>
            </div>
            <p className="text-sm text-[#6B6B6B]">Unlock your spiritual journey</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Hero Section */}
        <Card className="p-6 text-center border-0 bg-gradient-to-br from-[#D4AF37]/10 to-white">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-[#2C2C2C] text-2xl mb-2">Upgrade to Premium</h2>
          <p className="text-[#6B6B6B] mb-4">
            Get deeper astrological insights, personalized predictions, and ad-free experience
          </p>
          <Badge className="bg-[#C74225] text-white">
            7-Day Free Trial
          </Badge>
        </Card>

        {/* Premium Features */}
        <div>
          <h3 className="text-[#2C2C2C] mb-3 px-2">Premium Features</h3>
          <div className="space-y-2">
            {[
              {
                icon: Star,
                title: "Detailed Astrology Predictions",
                description: "Get in-depth weekly and monthly horoscope insights",
              },
              {
                icon: Sparkles,
                title: "Full Kundali Analysis",
                description: "Complete birth chart with career, marriage, and life predictions",
              },
              {
                icon: Zap,
                title: "Compatibility Reports",
                description: "Detailed relationship analysis with 36 Guna Milan",
              },
              {
                icon: Check,
                title: "Advanced Muhurat Alerts",
                description: "Personalized auspicious time notifications",
              },
              {
                icon: Star,
                title: "Ad-Free Experience",
                description: "Enjoy VedicTime without any interruptions",
              },
              {
                icon: Sparkles,
                title: "Priority Support",
                description: "Get help from our astrology experts",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#2C2C2C] mb-1">{feature.title}</h4>
                    <p className="text-sm text-[#6B6B6B]">{feature.description}</p>
                  </div>
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <h3 className="text-[#2C2C2C] mb-3 px-2">Choose Your Plan</h3>
          
          {/* Yearly Plan (Recommended) */}
          <Card className="p-6 border-2 border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-white relative mb-3">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-[#C74225] text-white">Most Popular</Badge>
            </div>
            <div className="text-center mb-4">
              <h4 className="text-[#2C2C2C] text-lg mb-2">Yearly Plan</h4>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-4xl text-[#D4AF37]">₹999</span>
                <span className="text-[#6B6B6B]">/year</span>
              </div>
              <p className="text-sm text-green-600">Save 50% • Just ₹83/month</p>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                <Check className="h-4 w-4 text-green-600" />
                <span>All premium features included</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                <Check className="h-4 w-4 text-green-600" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                <Check className="h-4 w-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <Button
              onClick={handleStartTrial}
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white h-12"
            >
              Start Free Trial
            </Button>
          </Card>

          {/* Monthly Plan */}
          <Card className="p-6 border border-gray-100">
            <div className="text-center mb-4">
              <h4 className="text-[#2C2C2C] text-lg mb-2">Monthly Plan</h4>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-3xl text-[#2C2C2C]">₹199</span>
                <span className="text-[#6B6B6B]">/month</span>
              </div>
              <p className="text-sm text-[#6B6B6B]">Billed monthly</p>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                <Check className="h-4 w-4 text-green-600" />
                <span>All premium features included</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                <Check className="h-4 w-4 text-green-600" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                <Check className="h-4 w-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <Button
              onClick={() => handleSubscribe("Monthly")}
              variant="outline"
              className="w-full border-gray-200 h-12"
            >
              Choose Monthly
            </Button>
          </Card>
        </div>

        {/* One-Time Purchases */}
        <div>
          <h3 className="text-[#2C2C2C] mb-3 px-2">One-Time Purchases</h3>
          <div className="space-y-2">
            <Card className="p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[#2C2C2C] mb-1">Detailed Kundali PDF</h4>
                  <p className="text-sm text-[#6B6B6B]">Complete birth chart report</p>
                </div>
                <Button
                  onClick={() => toast.success("Payment page coming soon")}
                  size="sm"
                  variant="outline"
                  className="border-[#C74225] text-[#C74225]"
                >
                  ₹299
                </Button>
              </div>
            </Card>

            <Card className="p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[#2C2C2C] mb-1">Compatibility Report</h4>
                  <p className="text-sm text-[#6B6B6B]">Relationship analysis PDF</p>
                </div>
                <Button
                  onClick={() => toast.success("Payment page coming soon")}
                  size="sm"
                  variant="outline"
                  className="border-[#C74225] text-[#C74225]"
                >
                  ₹199
                </Button>
              </div>
            </Card>

            <Card className="p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[#2C2C2C] mb-1">Yearly Horoscope</h4>
                  <p className="text-sm text-[#6B6B6B]">Full year predictions</p>
                </div>
                <Button
                  onClick={() => toast.success("Payment page coming soon")}
                  size="sm"
                  variant="outline"
                  className="border-[#C74225] text-[#C74225]"
                >
                  ₹499
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <Card className="p-4 bg-gray-50 border-0">
          <div className="text-center space-y-2">
            <p className="text-sm text-[#6B6B6B]">
              ✓ Trusted by 1M+ users
            </p>
            <p className="text-sm text-[#6B6B6B]">
              ✓ Secure payment processing
            </p>
            <p className="text-sm text-[#6B6B6B]">
              ✓ Cancel subscription anytime
            </p>
          </div>
        </Card>

        {/* Terms */}
        <div className="text-center text-xs text-[#6B6B6B] px-4">
          By subscribing, you agree to our Terms of Service and Privacy Policy. Your subscription will automatically renew unless cancelled before the renewal date.
        </div>
      </div>
    </div>
  );
}
