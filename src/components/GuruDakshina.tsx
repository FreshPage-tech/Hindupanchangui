import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle, Download, Share2 } from "lucide-react";

interface GuruDakshinaProps {
  onBack: () => void;
}

export function GuruDakshina({ onBack }: GuruDakshinaProps) {
  const [step, setStep] = useState<"select" | "amount" | "payment" | "success">("select");
  const [category, setCategory] = useState<string>("general");
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [upiId, setUpiId] = useState<string>("");

  const categories = [
    {
      id: "general",
      title: "General Contribution",
      description: "Support overall activities and operations",
      icon: "🙏",
    },
    {
      id: "seva",
      title: "Seva Projects",
      description: "Fund community service initiatives",
      icon: "❤️",
    },
    {
      id: "utsav",
      title: "Utsav & Events",
      description: "Support cultural celebrations",
      icon: "🎉",
    },
    {
      id: "education",
      title: "Education Fund",
      description: "Support educational programs",
      icon: "📚",
    },
  ];

  const suggestedAmounts = ["100", "500", "1000", "2000", "5000"];

  const handleDonate = () => {
    if (step === "select") {
      setStep("amount");
    } else if (step === "amount") {
      setStep("payment");
    } else if (step === "payment") {
      setTimeout(() => {
        setStep("success");
      }, 1500);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
          <button onClick={onBack} className="mb-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-white">Guru Dakshina</h1>
        </div>

        <div className="p-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <h2 className="text-gray-900 mb-2 text-center">
              Contribution Successful!
            </h2>

            <p className="text-gray-600 text-center mb-6">
              Thank you for your generous support
            </p>

            <Card className="w-full max-w-sm p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-3xl text-[#C74225] mb-2">₹{amount}</div>
                <Badge className="bg-[#C74225]/10 text-[#C74225]">
                  {categories.find(c => c.id === category)?.title}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="text-gray-900">TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-900">Nov 1, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="text-gray-900">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="text-gray-900">UPI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="text-green-600">Success</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-3 w-full max-w-sm mb-4">
              <Button
                variant="outline"
                className="flex-1 border-[#C74225] text-[#C74225]"
              >
                <Download className="h-4 w-4 mr-2" />
                Receipt
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#C74225] text-[#C74225]"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Button
              onClick={onBack}
              className="w-full max-w-sm bg-[#C74225] hover:bg-[#C74225]/90 text-white"
            >
              Back to Home
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                🙏 Your contribution helps us serve better
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white mb-2">Guru Dakshina</h1>
        <p className="text-white/90">Support our noble cause</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === "select" ? "bg-[#C74225] text-white" : "bg-green-600 text-white"
          }`}>
            {step !== "select" ? "✓" : "1"}
          </div>
          <div className="w-12 h-1 bg-gray-300"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === "amount" ? "bg-[#C74225] text-white" : step === "payment" || step === "success" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
          }`}>
            {step === "payment" || step === "success" ? "✓" : "2"}
          </div>
          <div className="w-12 h-1 bg-gray-300"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === "payment" ? "bg-[#C74225] text-white" : "bg-gray-300 text-gray-600"
          }`}>
            3
          </div>
        </div>

        {/* Step 1: Select Category */}
        {step === "select" && (
          <>
            <h3 className="mb-3">Select Contribution Type</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <Card
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    category === cat.id
                      ? "border-[#C74225] border-2 bg-orange-50"
                      : "border-gray-200 hover:border-[#C74225]/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{cat.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{cat.title}</h4>
                      <p className="text-sm text-gray-600">{cat.description}</p>
                    </div>
                    {category === cat.id && (
                      <CheckCircle className="h-5 w-5 text-[#C74225] flex-shrink-0" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Enter Amount */}
        {step === "amount" && (
          <>
            <Card className="p-4 bg-orange-50 border-[#C74225]">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Contributing to</p>
                <h3 className="text-[#C74225]">
                  {categories.find(c => c.id === category)?.title}
                </h3>
              </div>
            </Card>

            <div className="space-y-3">
              <Label>Select or Enter Amount</Label>
              <div className="grid grid-cols-3 gap-2">
                {suggestedAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      amount === amt
                        ? "border-[#C74225] bg-orange-50 text-[#C74225]"
                        : "border-gray-200 text-gray-700 hover:border-[#C74225]/50"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </>
        )}

        {/* Step 3: Payment Method */}
        {step === "payment" && (
          <>
            <Card className="p-4 bg-orange-50 border-[#C74225]">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Amount to Pay</p>
                  <div className="text-2xl text-[#C74225]">₹{amount}</div>
                </div>
                <Badge className="bg-[#C74225]/10 text-[#C74225]">
                  {categories.find(c => c.id === category)?.title}
                </Badge>
              </div>
            </Card>

            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <Card className={`p-4 cursor-pointer ${paymentMethod === "upi" ? "border-[#C74225] border-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Smartphone className="h-5 w-5 text-[#C74225]" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI</Label>
                  </div>
                </Card>

                <Card className={`p-4 cursor-pointer ${paymentMethod === "card" ? "border-[#C74225] border-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-[#C74225]" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">Credit/Debit Card</Label>
                  </div>
                </Card>

                <Card className={`p-4 cursor-pointer ${paymentMethod === "netbanking" ? "border-[#C74225] border-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Building2 className="h-5 w-5 text-[#C74225]" />
                    <Label htmlFor="netbanking" className="flex-1 cursor-pointer">Net Banking</Label>
                  </div>
                </Card>
              </RadioGroup>

              {paymentMethod === "upi" && (
                <div className="space-y-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {step !== "select" && (
            <Button
              onClick={() => setStep(step === "amount" ? "select" : "amount")}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleDonate}
            disabled={
              (step === "amount" && !amount) ||
              (step === "payment" && paymentMethod === "upi" && !upiId)
            }
            className="flex-1 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
          >
            {step === "payment" ? "Pay Now" : "Continue"}
          </Button>
        </div>

        {/* Info Note */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Your contribution is valuable and helps us continue our service to society. Tax exemption certificate will be provided for donations above ₹500.
          </p>
        </Card>
      </div>
    </div>
  );
}
