import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Smartphone, Clock, Bell } from "lucide-react";

interface WidgetInfoProps {
  onBack: () => void;
}

export function WidgetInfo({ onBack }: WidgetInfoProps) {
  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C74225] to-[#942D17] text-white p-6">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white mb-2">Home Screen Widget</h1>
        <p className="text-[#FFD700]">Quick access to daily Panchang</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Widget Preview */}
        <Card className="p-6 bg-gradient-to-br from-[#C74225] to-[#942D17] text-white">
          <div className="text-center mb-4">
            <div className="text-[#FFD700] text-sm mb-1">VedicTime Widget</div>
            <h2 className="text-white mb-3">Today's Panchang</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs text-white/80 mb-1">Tithi</div>
              <div className="text-white text-sm">Chaturdashi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs text-white/80 mb-1">Nakshatra</div>
              <div className="text-white text-sm">Rohini</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs text-white/80 mb-1">Sunrise</div>
              <div className="text-white text-sm">6:24 AM</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs text-white/80 mb-1">Sunset</div>
              <div className="text-white text-sm">5:47 PM</div>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-[#FFD700]">
            Tap to open VedicTime
          </div>
        </Card>

        {/* How to Add Widget */}
        <Card className="p-4">
          <h3 className="text-[#2C2C2C] mb-4">How to Add Widget</h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                1
              </div>
              <div>
                <h4 className="text-[#2C2C2C] mb-1">Long press on home screen</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Touch and hold an empty area on your home screen
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                2
              </div>
              <div>
                <h4 className="text-[#2C2C2C] mb-1">Tap the + button or Widgets</h4>
                <p className="text-sm text-[#6B6B6B]">
                  In the top-left corner or look for widget option
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                3
              </div>
              <div>
                <h4 className="text-[#2C2C2C] mb-1">Search for VedicTime</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Find VedicTime in the widget list
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                4
              </div>
              <div>
                <h4 className="text-[#2C2C2C] mb-1">Choose widget size</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Select small, medium, or large size
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#C74225] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                5
              </div>
              <div>
                <h4 className="text-[#2C2C2C] mb-1">Add widget to home screen</h4>
                <p className="text-sm text-[#6B6B6B]">
                  Drag and drop the widget to your preferred location
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Widget Features */}
        <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-white border border-[#FFD700]/30">
          <h4 className="text-[#2C2C2C] mb-3">Widget Features</h4>
          <ul className="space-y-2 text-sm text-[#6B6B6B]">
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-[#C74225] mt-0.5 flex-shrink-0" />
              <span>Live updates of Tithi, Nakshatra, and timings</span>
            </li>
            <li className="flex items-start gap-2">
              <Bell className="h-4 w-4 text-[#C74225] mt-0.5 flex-shrink-0" />
              <span>Quick glance at today's auspicious times</span>
            </li>
            <li className="flex items-start gap-2">
              <Smartphone className="h-4 w-4 text-[#C74225] mt-0.5 flex-shrink-0" />
              <span>One-tap access to full app</span>
            </li>
          </ul>
        </Card>

        {/* Platform Specific Instructions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-2">🍎</div>
            <h4 className="text-[#2C2C2C] mb-1">iOS</h4>
            <p className="text-xs text-[#6B6B6B]">
              Available for iOS 14+
            </p>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="text-[#2C2C2C] mb-1">Android</h4>
            <p className="text-xs text-[#6B6B6B]">
              Available for Android 8+
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
